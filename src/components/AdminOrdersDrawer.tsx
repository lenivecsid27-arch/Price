import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Download,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Search,
  Layers,
  Phone,
  Mail,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { OrderSubmission, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  downloadOrdersAsCSV,
  clearStoredOrders,
  syncAllOrdersToGoogleSheet,
  lockAdmin,
} from '../services/googleSheets';

interface AdminOrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderSubmission[];
  onRefreshOrders: () => void;
  sheetUrl?: string;
  language: Language;
}

export const AdminOrdersDrawer: React.FC<AdminOrdersDrawerProps> = ({
  isOpen,
  onClose,
  orders,
  onRefreshOrders,
  sheetUrl,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const filteredOrders = (orders || []).filter(
    (o) =>
      o.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.blocks?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const syncedCount = (orders || []).filter((o) => o.status === 'synced_sheets').length;

  const handleCopyOrder = (order: OrderSubmission) => {
    const text =
      `${t.orderNumber} #${order.id.slice(-6).toUpperCase()}\n` +
      `${t.dateLabel}: ${order.date}\n` +
      `${t.clientNameLabel}: ${order.clientName}\n` +
      `${t.phoneLabel}: ${order.phone}\n` +
      `${t.emailLabel}: ${order.email}\n` +
      `${t.serviceBlocks}: ${order.blocks}\n` +
      `${t.unitPriceCalc}: ${order.itemsText}\n` +
      `Breakdown: ${order.priceBreakdown}\n` +
      `${t.totalSum}: €${order.totalAmount}\n` +
      (order.notes ? `${t.notesLabel}: ${order.notes}\n` : '');

    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearAll = () => {
    if (window.confirm('Ви дійсно бажаєте очистити історію всіх замовлень?')) {
      clearStoredOrders();
      onRefreshOrders();
    }
  };

  const handleSyncAll = async () => {
    setIsSyncing(true);
    setSyncStatusMsg(null);
    const res = await syncAllOrdersToGoogleSheet();
    setIsSyncing(false);
    onRefreshOrders();
    setSyncStatusMsg(`Синхронізовано: ${res.synced} із ${res.total} заявок`);
    setTimeout(() => setSyncStatusMsg(null), 4000);
  };

  const handleLock = () => {
    lockAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border-l border-white/80 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">{t.ordersHistoryTitle}</h3>
              <p className="text-xs text-slate-400">
                Всього заявок: {orders.length} | У Google Таблиці: <strong className="text-emerald-400">{syncedCount}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {orders.length > 0 && (
              <>
                <button
                  onClick={handleSyncAll}
                  disabled={isSyncing}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
                  title="Синхронізувати з Google Таблицею"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Синхронізувати</span>
                </button>

                <button
                  onClick={() => downloadOrdersAsCSV(orders)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold transition-all cursor-pointer"
                  title="Download CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CSV</span>
                </button>
              </>
            )}

            {sheetUrl && (
              <a
                href={sheetUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-xs border border-emerald-400/30"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.openSheet}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <button
              onClick={handleLock}
              title="Заблокувати адмін-панель"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sync Status Banner */}
        {syncStatusMsg && (
          <div className="px-4 py-2 bg-emerald-50 text-emerald-800 text-xs font-semibold border-b border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{syncStatusMsg}</span>
          </div>
        )}

        {/* Search & Actions Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchInOrders}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs text-slate-900 bg-white outline-hidden shadow-xs"
            />
          </div>

          {orders.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 transition-colors px-2 py-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.clearHistory}</span>
            </button>
          )}
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">{t.noOrdersFound}</p>
              <p className="text-xs text-slate-500 mt-1">{t.selectServicesHint}</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-indigo-200 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700">
                      #{order.id.slice(-6).toUpperCase()}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {order.date}
                    </span>

                    {/* Sync Status Badge */}
                    {order.status === 'synced_sheets' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> У таблиці
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" /> Очікує синхронізації
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-indigo-700 font-mono">
                      €{order.totalAmount}
                    </span>
                    <button
                      onClick={() => handleCopyOrder(order)}
                      className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      title={t.copyReportSummary}
                    >
                      {copiedId === order.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Client info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1 font-semibold text-slate-900 truncate">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{order.clientName}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-slate-600 truncate">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a href={`tel:${order.phone}`} className="hover:underline">
                      {order.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a href={`mailto:${order.email}`} className="hover:underline">
                      {order.email}
                    </a>
                  </div>
                </div>

                {/* Blocks */}
                <div className="text-[11px] text-slate-700">
                  <span className="font-bold text-slate-900">{t.serviceBlocks}:</span> {order.blocks}
                </div>

                {/* Items & Prices */}
                <div className="text-[11px] text-slate-800 bg-violet-50/70 p-2.5 rounded-xl border border-violet-100 leading-relaxed">
                  <p className="font-bold text-violet-950 mb-0.5">{t.unitPriceCalc}:</p>
                  <p className="line-clamp-3 text-slate-700">{order.priceBreakdown}</p>
                </div>

                {order.notes && (
                  <div className="text-[11px] text-slate-600 italic">
                    💬 {order.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
