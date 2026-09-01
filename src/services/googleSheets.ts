import { OrderSubmission } from '../types';

const STORAGE_ORDERS_KEY = 'service_calc_orders_v1';
const STORAGE_CONFIG_KEY = 'service_calc_sheets_config_v1';
const STORAGE_TOKEN_KEY = 'service_calc_google_token_v1';

export const SPREADSHEET_HEADERS = [
  'Дата заявки',
  'Ім\'я',
  'Контактний телефон',
  'Пошта',
  'Блоки',
  'Пункти (Обрані послуги)',
  'Ціна кожного пункту',
  'Сума (€)',
  'Додаткові примітки',
];

export function getStoredOrders(): OrderSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading stored orders:', e);
    return [];
  }
}

export function saveOrderToStorage(order: OrderSubmission): void {
  try {
    const current = getStoredOrders();
    const updated = [order, ...current.filter((o) => o.id !== order.id)];
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving order to local storage:', e);
  }
}

export function updateStoredOrderStatus(orderId: string, status: OrderSubmission['status'], sheetUrl?: string): void {
  try {
    const current = getStoredOrders();
    const updated = current.map((o) => (o.id === orderId ? { ...o, status, sheetUrl: sheetUrl || o.sheetUrl } : o));
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating order:', e);
  }
}

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null): void {
  if (token) {
    localStorage.setItem(STORAGE_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  }
}

export function getStoredSheetsConfig(): { spreadsheetId?: string; sheetUrl?: string; webhookUrl?: string } {
  try {
    const raw = localStorage.getItem(STORAGE_CONFIG_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSheetsConfig(config: { spreadsheetId?: string; sheetUrl?: string; webhookUrl?: string }): void {
  localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
}

/**
 * Format order into Google Sheets row array
 */
export function formatOrderToSheetRow(order: OrderSubmission): (string | number)[] {
  return [
    order.date,
    order.clientName,
    order.phone,
    order.email,
    order.blocks,
    order.itemsText,
    order.priceBreakdown,
    `${order.totalAmount} €`,
    order.notes || '—',
  ];
}

/**
 * Creates or finds the "Заявки" spreadsheet in user's Google Drive via REST API
 */
export async function getOrCreateSpreadsheet(accessToken: string): Promise<{ id: string; url: string }> {
  const existingConfig = getStoredSheetsConfig();
  if (existingConfig.spreadsheetId && existingConfig.sheetUrl) {
    // Validate if still accessible
    try {
      const checkRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${existingConfig.spreadsheetId}?fields=spreadsheetId`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (checkRes.ok) {
        return { id: existingConfig.spreadsheetId, url: existingConfig.sheetUrl };
      }
    } catch {
      // Create new below
    }
  }

  // Create a new Spreadsheet titled "Заявки на послуги (Калькулятор)"
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'Заявки на послуги (Калькулятор)',
      },
      sheets: [
        {
          properties: {
            title: 'Заявки',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to create spreadsheet (${createRes.status})`);
  }

  const data = await createRes.json();
  const spreadsheetId = data.spreadsheetId;
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // Write header row with stylish formatting
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Заявки!A1:I1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [SPREADSHEET_HEADERS],
      }),
    }
  );

  saveSheetsConfig({ spreadsheetId, sheetUrl });
  return { id: spreadsheetId, url: sheetUrl };
}

/**
 * Appends an order row to the Google Spreadsheet
 */
export async function appendOrderToGoogleSheet(
  order: OrderSubmission,
  accessToken?: string
): Promise<{ success: boolean; sheetUrl?: string; error?: string }> {
  // If webhook is configured
  const config = getStoredSheetsConfig();
  if (config.webhookUrl) {
    try {
      const res = await fetch(config.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (res.ok) {
        updateStoredOrderStatus(order.id, 'synced_sheets', config.sheetUrl);
        return { success: true, sheetUrl: config.sheetUrl };
      }
    } catch (err: any) {
      console.warn('Webhook sync error:', err);
    }
  }

  const token = accessToken || getStoredToken();
  if (!token) {
    return {
      success: false,
      error: 'Google OAuth токен відсутній. Будь ласка, авторизуйтесь через Google акаунт.',
    };
  }

  try {
    const sheetInfo = await getOrCreateSpreadsheet(token);
    const rowData = formatOrderToSheetRow(order);

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetInfo.id}/values/Заявки!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowData],
        }),
      }
    );

    if (!appendRes.ok) {
      const err = await appendRes.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Append failed (${appendRes.status})`);
    }

    updateStoredOrderStatus(order.id, 'synced_sheets', sheetInfo.url);
    return { success: true, sheetUrl: sheetInfo.url };
  } catch (err: any) {
    console.error('Error appending to Google Sheet:', err);
    updateStoredOrderStatus(order.id, 'failed_sync');
    return { success: false, error: err.message || 'Не вдалося додати рядок у Google Таблицю' };
  }
}

/**
 * Generate CSV text and trigger instant download
 */
export function downloadOrdersAsCSV(orders: OrderSubmission[]): void {
  const escapeCsv = (str: string | number) => {
    const text = String(str).replace(/"/g, '""');
    return `"${text}"`;
  };

  const rows = [
    SPREADSHEET_HEADERS.map(escapeCsv).join(','),
    ...orders.map((o) => formatOrderToSheetRow(o).map(escapeCsv).join(',')),
  ];

  const blob = new Blob(['\uFEFF' + rows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Заявки_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
