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
} from 'lucide-react';
import { OrderSubmission, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { downloadOrdersAsCSV } from '../services/googleSheets';

interface AdminOrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderSubmission[];
  onClearOrders: () => void;
  sheetUrl?: string;
  language: Language;
}

export const AdminOrdersDrawer: React.FC<AdminOrdersDrawerProps> = ({
  isOpen,
  onClose,
  orders,
  onClearOrders,
  sheetUrl,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const filteredOrders = (orders || []).filter(
    (o) =>
      o.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.blocks?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyOrder = (order: OrderSubmission) => {
    const text = `${t.orderNumber} #${order.id.slice(-6).toUpperCase()}\n` +
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl border-l border-white/80 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-slate-900/80 backdrop-blur-xl text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">{t.ordersHistoryTitle}</h3>
              <p className="text-xs text-slate-400">
                {orders.length} {t.ordersCountLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {orders.length > 0 && (
              <button
                onClick={() => downloadOrdersAsCSV(orders)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold transition-all cursor-pointer"
                title="Download CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
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
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-4 border-b border-white/60 bg-white/40 backdrop-blur-sm flex items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchInOrders}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-white/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs text-slate-900 bg-white/70 backdrop-blur-sm outline-hidden shadow-xs"
            />
          </div>

          {orders.length > 0 && (
            <button
              onClick={onClearOrders}
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
              <div className="w-12 h-12 rounded-2xl bg-white/50 border border-white/70 text-slate-400 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">{t.noOrdersFound}</p>
              <p className="text-xs text-slate-500 mt-1">
                {t.selectServicesHint}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs hover:bg-white/80 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-600">
                      #{order.id.slice(-6).toUpperCase()}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {order.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-indigo-700 font-mono">
                      €{order.totalAmount}
                    </span>
                    <button
                      onClick={() => handleCopyOrder(order)}
                      className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs text-slate-700 bg-white/50 p-2.5 rounded-xl border border-white/70">
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
                <div className="text-[11px] text-slate-800 bg-violet-50/60 p-2.5 rounded-xl border border-violet-100/80 leading-relaxed">
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
