import { OrderSubmission } from '../types';

const STORAGE_ORDERS_KEY = 'service_calc_orders_v1';
const STORAGE_CONFIG_KEY = 'service_calc_sheets_config_v1';
const STORAGE_TOKEN_KEY = 'service_calc_google_token_v1';
const STORAGE_ADMIN_PIN_KEY = 'service_calc_admin_pin_v1';
const STORAGE_ADMIN_SESSION_KEY = 'service_calc_admin_session_v1';

export const DEFAULT_ADMIN_PIN = '2026';
export const GOOGLE_OAUTH_CLIENT_ID = '823978215664-44pqdtjtsn15jm4qkaahh4lqlsc7ptq1.apps.googleusercontent.com';

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

// Ready-to-copy Google Apps Script Code
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `// Google Apps Script для автоматичного запису заявок у Google Таблицю
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Заявки') || ss.getActiveSheet();
    
    // Створюємо заголовки, якщо аркуш порожній
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Дата заявки", "Ім'я", "Контактний телефон", "Пошта",
        "Блоки", "Пункти (Обрані послуги)", "Ціна кожного пункту",
        "Сума (€)", "Додаткові примітки"
      ]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#e6f4ea");
      sheet.setFrozenRows(1);
    }
    
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.date || new Date().toLocaleString(),
      data.clientName || '',
      data.phone || '',
      data.email || '',
      data.blocks || '',
      data.itemsText || '',
      data.priceBreakdown || '',
      (data.totalAmount || 0) + ' €',
      data.notes || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok', success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

/* =========================================================================
 * Admin PIN & Security Management
 * ========================================================================= */

export function getAdminPin(): string {
  try {
    return localStorage.getItem(STORAGE_ADMIN_PIN_KEY) || DEFAULT_ADMIN_PIN;
  } catch {
    return DEFAULT_ADMIN_PIN;
  }
}

export function setAdminPin(newPin: string): boolean {
  if (!newPin || newPin.trim().length < 4) return false;
  try {
    localStorage.setItem(STORAGE_ADMIN_PIN_KEY, newPin.trim());
    return true;
  } catch {
    return false;
  }
}

export function isAdminUnlocked(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_ADMIN_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function unlockAdmin(pin: string): { success: boolean; error?: string } {
  const currentPin = getAdminPin();
  if (pin.trim() === currentPin) {
    try {
      sessionStorage.setItem(STORAGE_ADMIN_SESSION_KEY, 'true');
    } catch {
      // ignore
    }
    return { success: true };
  }
  return { success: false, error: 'Невірний PIN-код адміністратора' };
}

export function lockAdmin(): void {
  try {
    sessionStorage.removeItem(STORAGE_ADMIN_SESSION_KEY);
  } catch {
    // ignore
  }
}

/* =========================================================================
 * Orders Storage Management
 * ========================================================================= */

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

export function updateStoredOrderStatus(
  orderId: string,
  status: OrderSubmission['status'],
  sheetUrl?: string
): void {
  try {
    const current = getStoredOrders();
    const updated = current.map((o) =>
      o.id === orderId ? { ...o, status, sheetUrl: sheetUrl || o.sheetUrl } : o
    );
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error updating order:', e);
  }
}

export function clearStoredOrders(): void {
  try {
    localStorage.removeItem(STORAGE_ORDERS_KEY);
  } catch (e) {
    console.error('Error clearing orders:', e);
  }
}

/* =========================================================================
 * Google OAuth Token & Config Management
 * ========================================================================= */

export function getStoredToken(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_TOKEN_KEY) || localStorage.getItem(STORAGE_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null): void {
  try {
    if (token) {
      sessionStorage.setItem(STORAGE_TOKEN_KEY, token);
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(STORAGE_TOKEN_KEY);
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    }
  } catch {
    // ignore
  }
}

export function getStoredSheetsConfig(): {
  spreadsheetId?: string;
  sheetUrl?: string;
  webhookUrl?: string;
} {
  try {
    const raw = localStorage.getItem(STORAGE_CONFIG_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSheetsConfig(config: {
  spreadsheetId?: string;
  sheetUrl?: string;
  webhookUrl?: string;
}): void {
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
 * Initiates Google Identity Services (GSI) OAuth Token request popup
 */
export function requestGoogleOAuthToken(
  onSuccess: (token: string) => void,
  onError: (error: string) => void
): void {
  const google = (window as any).google;
  if (!google?.accounts?.oauth2) {
    onError('Google Identity Services бібліотека ще завантажується. Спробуйте через 2 секунди.');
    return;
  }

  try {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file',
      callback: (response: any) => {
        if (response.error) {
          onError(response.error_description || response.error);
          return;
        }
        if (response.access_token) {
          setStoredToken(response.access_token);
          onSuccess(response.access_token);
        } else {
          onError('Не отримано access_token від Google.');
        }
      },
      error_callback: (err: any) => {
        onError(err?.message || 'Помилка авторизації Google.');
      },
    });

    tokenClient.requestAccessToken({ prompt: 'consent' });
  } catch (err: any) {
    onError(err?.message || 'Не вдалося відкрити вікно авторизації Google');
  }
}

/**
 * Creates or validates the "Заявки" spreadsheet in user's Google Drive via REST API
 */
export async function getOrCreateSpreadsheet(
  accessToken: string
): Promise<{ id: string; url: string }> {
  const existingConfig = getStoredSheetsConfig();
  if (existingConfig.spreadsheetId && existingConfig.sheetUrl) {
    try {
      const checkRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${existingConfig.spreadsheetId}?fields=spreadsheetId,properties.title`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (checkRes.ok) {
        return { id: existingConfig.spreadsheetId, url: existingConfig.sheetUrl };
      }
    } catch {
      // Continue to create or recreate
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
    throw new Error(
      errData?.error?.message || `Failed to create spreadsheet (${createRes.status})`
    );
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

  saveSheetsConfig({
    spreadsheetId,
    sheetUrl,
    webhookUrl: existingConfig.webhookUrl,
  });

  return { id: spreadsheetId, url: sheetUrl };
}

/**
 * Appends an order row to the Google Spreadsheet or Webhook
 */
export async function appendOrderToGoogleSheet(
  order: OrderSubmission,
  accessToken?: string
): Promise<{ success: boolean; sheetUrl?: string; error?: string }> {
  const config = getStoredSheetsConfig();

  // 1. Try Webhook if configured
  if (config.webhookUrl) {
    try {
      // Google Apps Script Webhooks: post with text/plain body to avoid CORS preflight failures
      await fetch(config.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(order),
        mode: 'no-cors',
      });

      const sheetUrl = config.sheetUrl || 'https://docs.google.com/spreadsheets';
      updateStoredOrderStatus(order.id, 'synced_sheets', sheetUrl);
      return { success: true, sheetUrl };
    } catch (err: any) {
      console.warn('Webhook sync attempt failed:', err);
    }
  }

  // 2. Try Google OAuth Access Token
  const token = accessToken || getStoredToken();
  if (!token) {
    return {
      success: false,
      error: 'Google OAuth токен або Webhook не підключено.',
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
    return {
      success: false,
      error: err.message || 'Не вдалося додати рядок у Google Таблицю',
    };
  }
}

/**
 * Synchronize all stored orders to Google Sheets
 */
export async function syncAllOrdersToGoogleSheet(
  accessToken?: string
): Promise<{ total: number; synced: number; failed: number; sheetUrl?: string; error?: string }> {
  const orders = getStoredOrders();
  if (orders.length === 0) {
    return { total: 0, synced: 0, failed: 0 };
  }

  let syncedCount = 0;
  let failedCount = 0;
  let lastSheetUrl: string | undefined = undefined;
  let lastError: string | undefined = undefined;

  for (const order of orders) {
    const res = await appendOrderToGoogleSheet(order, accessToken);
    if (res.success) {
      syncedCount++;
      if (res.sheetUrl) lastSheetUrl = res.sheetUrl;
    } else {
      failedCount++;
      lastError = res.error;
    }
  }

  return {
    total: orders.length,
    synced: syncedCount,
    failed: failedCount,
    sheetUrl: lastSheetUrl,
    error: lastError,
  };
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

  const blob = new Blob(['\uFEFF' + rows.join('\r\n')], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `Заявки_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
