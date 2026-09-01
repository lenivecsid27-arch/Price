import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Download,
  KeyRound,
  Code2,
  Sparkles,
  Lock,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  getStoredSheetsConfig,
  saveSheetsConfig,
  SPREADSHEET_HEADERS,
  getStoredOrders,
  syncAllOrdersToGoogleSheet,
  downloadOrdersAsCSV,
  requestGoogleOAuthToken,
  getOrCreateSpreadsheet,
  GOOGLE_APPS_SCRIPT_TEMPLATE,
  getAdminPin,
  setAdminPin,
} from '../services/googleSheets';

interface GoogleSheetsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSheetsConnected: boolean;
  onConnectionChange: (connected: boolean, sheetUrl?: string) => void;
  language: Language;
}

export const GoogleSheetsConfigModal: React.FC<GoogleSheetsConfigModalProps> = ({
  isOpen,
  onClose,
  isSheetsConnected,
  onConnectionChange,
  language,
}) => {
  const currentConfig = getStoredSheetsConfig();
  const [spreadsheetId, setSpreadsheetId] = useState(currentConfig.spreadsheetId || '');
  const [sheetUrl, setSheetUrl] = useState(currentConfig.sheetUrl || '');
  const [webhookUrl, setWebhookUrl] = useState(currentConfig.webhookUrl || '');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [copiedHeaders, setCopiedHeaders] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [activeTab, setActiveTab] = useState<'oauth' | 'webhook' | 'security'>('oauth');

  // Change PIN state
  const [newPin, setNewPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState('');

  const t = TRANSLATIONS[language];
  const orders = getStoredOrders();
  const syncedOrdersCount = orders.filter((o) => o.status === 'synced_sheets').length;

  if (!isOpen) return null;

  const handleSaveConfig = () => {
    saveSheetsConfig({
      spreadsheetId: spreadsheetId.trim(),
      sheetUrl:
        sheetUrl.trim() ||
        (spreadsheetId.trim()
          ? `https://docs.google.com/spreadsheets/d/${spreadsheetId.trim()}/edit`
          : ''),
      webhookUrl: webhookUrl.trim(),
    });
    const connected = Boolean(spreadsheetId.trim() || webhookUrl.trim());
    onConnectionChange(connected, sheetUrl.trim());
    setStatusMessage({ type: 'success', text: t.googleSheetsSettingsSaved });
  };

  const handleGoogleOAuthConnect = () => {
    setIsAuthorizing(true);
    setStatusMessage({ type: 'info', text: 'Відкриваємо вікно авторизації Google...' });

    requestGoogleOAuthToken(
      async (token) => {
        try {
          setStatusMessage({ type: 'info', text: 'Створюємо Google Таблицю «Заявки» у вашому Google Drive...' });
          const sheetInfo = await getOrCreateSpreadsheet(token);
          setSpreadsheetId(sheetInfo.id);
          setSheetUrl(sheetInfo.url);
          onConnectionChange(true, sheetInfo.url);

          // Now auto-sync all existing orders
          setStatusMessage({ type: 'info', text: 'Синхронізуємо існуючі заявки у створену таблицю...' });
          const syncRes = await syncAllOrdersToGoogleSheet(token);

          setIsAuthorizing(false);
          setStatusMessage({
            type: 'success',
            text: `Успішно підключено! Записано у Google Таблицю: ${syncRes.synced} із ${syncRes.total} заявок.`,
          });
        } catch (err: any) {
          setIsAuthorizing(false);
          setStatusMessage({
            type: 'error',
            text: err.message || 'Помилка під час створення Google Таблиці.',
          });
        }
      },
      (err) => {
        setIsAuthorizing(false);
        setStatusMessage({ type: 'error', text: err });
      }
    );
  };

  const handleSyncAllOrders = async () => {
    if (orders.length === 0) {
      setStatusMessage({ type: 'info', text: t.noOrdersFound });
      return;
    }

    setIsSyncing(true);
    setStatusMessage({ type: 'info', text: `${t.syncOrders} (${orders.length})...` });

    const syncRes = await syncAllOrdersToGoogleSheet();
    setIsSyncing(false);

    if (syncRes.synced > 0) {
      if (syncRes.sheetUrl) {
        setSheetUrl(syncRes.sheetUrl);
        onConnectionChange(true, syncRes.sheetUrl);
      }
      setStatusMessage({
        type: 'success',
        text: `${t.googleSheetsSyncSuccess}: ${syncRes.synced}/${syncRes.total} заявок синхронізовано!`,
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: syncRes.error || 'Не вдалося синхронізувати. Перевірте Google авторизацію або Webhook.',
      });
    }
  };

  const handleCopyHeaders = () => {
    navigator.clipboard.writeText(SPREADSHEET_HEADERS.join('\t'));
    setCopiedHeaders(true);
    setTimeout(() => setCopiedHeaders(false), 2000);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      setPinChangeMsg('PIN-код повинен містити мінімум 4 символи');
      return;
    }
    const success = setAdminPin(newPin.trim());
    if (success) {
      setPinChangeMsg('PIN-код адміністратора успішно змінено!');
      setNewPin('');
    } else {
      setPinChangeMsg('Помилка збереження PIN-коду');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between shrink-0 border-b border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs border border-white/30">
              <FileSpreadsheet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {t.googleSheetsModalTitle}
              </h3>
              <p className="text-xs text-emerald-100">
                Синхронізовано у таблицю: <span className="font-bold underline">{syncedOrdersCount} із {orders.length}</span> заявок
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-100 bg-slate-50/80 px-6 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('oauth')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'oauth'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Клік Google Drive</span>
          </button>
          <button
            onClick={() => setActiveTab('webhook')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'webhook'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Google Apps Script / Webhook</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Безпека & PIN</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {statusMessage && (
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 shadow-xs animate-in fade-in duration-200 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : statusMessage.type === 'error'
                  ? 'bg-rose-50 border border-rose-200 text-rose-900'
                  : 'bg-blue-50 border border-blue-200 text-blue-900'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span className="leading-relaxed font-medium">{statusMessage.text}</span>
            </div>
          )}

          {/* TAB 1: 1-Click Google OAuth & Drive */}
          {activeTab === 'oauth' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <h4 className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> Швидке підключення Google Таблиці
                  </h4>
                  <p className="text-[11px] text-emerald-800 mt-1 leading-relaxed max-w-md">
                    Натисніть кнопку, щоб авторизуватися через Google. Додаток автоматично створить у вашому Google Диску таблицю «Заявки на послуги (Калькулятор)» та перенесе всі заявки.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleOAuthConnect}
                  disabled={isAuthorizing}
                  className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAuthorizing ? 'animate-spin' : ''}`} />
                  <span>{isAuthorizing ? 'Авторизація...' : 'Підключити Google акаунт'}</span>
                </button>
              </div>

              {/* Active Sheet Banner */}
              {sheetUrl && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t.activeGoogleSheet}
                    </span>
                    <p className="text-[11px] text-slate-600 mt-0.5 truncate font-mono">
                      {sheetUrl}
                    </p>
                  </div>
                  <a
                    href={sheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>{t.openSheet}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Spreadsheet URL manual link */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.googleSheetsUrlOrId}
                </label>
                <input
                  type="text"
                  placeholder="https://docs.google.com/spreadsheets/d/YOUR_ID/edit"
                  value={sheetUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSheetUrl(val);
                    const match = val.match(/\/d\/([a-zA-Z0-9-_]+)/);
                    if (match) setSpreadsheetId(match[1]);
                  }}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs text-slate-900 transition-all font-mono outline-hidden shadow-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Google Apps Script Webhook */}
          {activeTab === 'webhook' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-indigo-600" /> Готовий скрипт для Google Apps Script (безкоштовно)
                  </h4>
                  <button
                    type="button"
                    onClick={handleCopyScript}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedScript ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Скопійовано!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Скопіювати код
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  1. Відкрийте вашу Google Таблицю → <strong>Розширення (Extensions)</strong> → <strong>Apps Script</strong>.<br />
                  2. Вставте скопійований код нижче та натисніть <strong>Розгорнути (Deploy)</strong> → <strong>Нове розгортання</strong> як веб-додаток (доступ: <em>Будь-хто / Anyone</em>).<br />
                  3. Вставте отриманий Webhook URL у поле нижче.
                </p>
                <div className="max-h-32 overflow-y-auto p-2.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-[10px] leading-relaxed select-all">
                  {GOOGLE_APPS_SCRIPT_TEMPLATE}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Webhook URL (Google Apps Script / Make / n8n / Zapier)
                </label>
                <input
                  type="text"
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs text-slate-900 transition-all font-mono outline-hidden shadow-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Security & PIN Management */}
          {activeTab === 'security' && (
            <form onSubmit={handleUpdatePin} className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-indigo-600" /> Зміна PIN-коду адміністратора
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Поточний PIN за замовчуванням: <strong className="font-mono">{getAdminPin()}</strong>. Ви можете встановити власний PIN для захисту заявок та конфігурації.
                </p>
              </div>

              {pinChangeMsg && (
                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs">
                  {pinChangeMsg}
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="password"
                  maxLength={8}
                  placeholder="Новий PIN (4-8 цифр)"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  className="w-48 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-900 outline-hidden focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Зберегти новий PIN
                </button>
              </div>
            </form>
          )}

          {/* Columns Structure info */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-slate-800">
                {t.tableColumnsRequired} (9 колонок):
              </span>
              <button
                type="button"
                onClick={handleCopyHeaders}
                className="text-[11px] font-semibold text-indigo-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedHeaders ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" /> {t.copiedToClipboard}
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> {t.copyHeaders}
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SPREADSHEET_HEADERS.map((h, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-800 shadow-xs"
                >
                  {i + 1}. {h}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSyncAllOrders}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-700 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Синхронізувати всі {orders.length} заявок</span>
              </button>

              <button
                type="button"
                onClick={() => downloadOrdersAsCSV(getStoredOrders())}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadCsv}</span>
              </button>
            </div>

            <button
              id="save-sheets-config-btn"
              type="button"
              onClick={handleSaveConfig}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              {t.saveSettings}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
