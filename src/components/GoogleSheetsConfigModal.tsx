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
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  getStoredSheetsConfig,
  saveSheetsConfig,
  SPREADSHEET_HEADERS,
  getStoredOrders,
  appendOrderToGoogleSheet,
  downloadOrdersAsCSV,
} from '../services/googleSheets';

interface GoogleSheetsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSheetsConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
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
  const [copiedHeaders, setCopiedHeaders] = useState(false);

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleSaveConfig = () => {
    saveSheetsConfig({
      spreadsheetId: spreadsheetId.trim(),
      sheetUrl: sheetUrl.trim() || (spreadsheetId.trim() ? `https://docs.google.com/spreadsheets/d/${spreadsheetId.trim()}/edit` : ''),
      webhookUrl: webhookUrl.trim(),
    });
    onConnectionChange(Boolean(spreadsheetId.trim() || webhookUrl.trim()));
    setStatusMessage({ type: 'success', text: t.googleSheetsSettingsSaved });
  };

  const handleCopyHeaders = () => {
    navigator.clipboard.writeText(SPREADSHEET_HEADERS.join('\t'));
    setCopiedHeaders(true);
    setTimeout(() => setCopiedHeaders(false), 2000);
  };

  const handleSyncAllOrders = async () => {
    const orders = getStoredOrders();
    if (orders.length === 0) {
      setStatusMessage({ type: 'info', text: t.noOrdersFound });
      return;
    }

    setIsSyncing(true);
    setStatusMessage({ type: 'info', text: `${t.syncOrders} (${orders.length})...` });

    let successCount = 0;
    for (const order of orders) {
      const res = await appendOrderToGoogleSheet(order);
      if (res.success) successCount++;
    }

    setIsSyncing(false);
    setStatusMessage({
      type: 'success',
      text: `${t.googleSheetsSyncSuccess}: ${successCount}/${orders.length}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-emerald-950/20 border border-white/80 overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-xl text-white flex items-center justify-between shrink-0 border-b border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs border border-white/30">
              <FileSpreadsheet className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">
                {t.googleSheetsModalTitle}
              </h3>
              <p className="text-xs text-emerald-100">
                {t.googleSheetsModalSubtitle}
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

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {statusMessage && (
            <div
              className={`p-3 rounded-2xl text-xs flex items-center gap-2 backdrop-blur-sm shadow-xs ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-800'
                  : statusMessage.type === 'error'
                  ? 'bg-rose-50/80 border border-rose-200 text-rose-800'
                  : 'bg-blue-50/80 border border-blue-200 text-blue-800'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Active Sheet Link if available */}
          {sheetUrl && (
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 flex items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t.activeGoogleSheet}
                </span>
                <p className="text-[11px] text-emerald-800 mt-0.5 truncate max-w-xs font-mono">
                  {sheetUrl}
                </p>
              </div>
              <a
                href={sheetUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs border border-emerald-400/30"
              >
                <span>{t.openSheet}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Columns Structure info */}
          <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 p-4 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-slate-800">
                {t.tableColumnsRequired}:
              </span>
              <button
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
                  className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-white/80 border border-white text-slate-800 shadow-xs"
                >
                  {i + 1}. {h}
                </span>
              ))}
            </div>
          </div>

          {/* Direct Spreadsheet URL / ID Field */}
          <div className="space-y-3">
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
                className="w-full px-3.5 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs text-slate-900 transition-all font-mono outline-hidden shadow-xs"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                {t.googleSheetsInputHint}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.webhookUrlOptional}
              </label>
              <input
                type="text"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs text-slate-900 transition-all font-mono outline-hidden shadow-xs"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/60">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSyncAllOrders}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 hover:bg-white border border-white/80 text-slate-800 text-xs font-semibold transition-all disabled:opacity-50 shadow-xs cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-600' : ''}`} />
                <span>{t.syncOrders}</span>
              </button>

              <button
                type="button"
                onClick={() => downloadOrdersAsCSV(getStoredOrders())}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 hover:bg-white border border-white/80 text-slate-800 text-xs font-semibold transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadCsv}</span>
              </button>
            </div>

            <button
              id="save-sheets-config-btn"
              type="button"
              onClick={handleSaveConfig}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all border border-emerald-400/30 cursor-pointer"
            >
              {t.saveSettings}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
