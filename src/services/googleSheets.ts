import { OrderSubmission } from '../types';

/**
 * Sends order submission directly to the Google Apps Script Web App Webhook.
 * No personal data is stored in the browser's localStorage or exposed in client-side storage.
 */
export async function submitOrder(
  order: OrderSubmission
): Promise<{ success: boolean; error?: string }> {
  try {
    const webhookUrl = import.meta.env.VITE_ORDERS_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('Webhook URL не налаштовано');
    }

    // Google Apps Script accepts POST payloads.
    // Using 'text/plain;charset=utf-8' prevents CORS preflight OPTIONS blocking by browser
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      throw new Error(`Помилка вебхука: ${res.status}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error('Order submit error:', err);
    return {
      success: false,
      error: err.message || 'Не вдалося відправити заявку',
    };
  }
}
