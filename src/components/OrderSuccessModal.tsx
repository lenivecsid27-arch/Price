import React, { useState } from 'react';
import {
  CheckCircle2,
  FileSpreadsheet,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { OrderSubmission, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderSubmission | null;
  onOpenSheets: () => void;
  language: Language;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  order,
  onOpenSheets,
  language,
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[language];

  if (!isOpen || !order) return null;

  const handleCopySummary = () => {
    const text = `📋 ${t.appName.toUpperCase()} - ${t.orderModalTitle}\n` +
      `📅 ${t.dateLabel}: ${order.date}\n` +
      `👤 ${t.clientNameLabel}: ${order.clientName}\n` +
      `📞 ${t.phoneLabel}: ${order.phone}\n` +
      `✉️ ${t.emailLabel}: ${order.email}\n` +
      `📦 ${t.serviceBlocks}: ${order.blocks}\n` +
      `✨ ${t.unitPriceCalc}: ${order.itemsText}\n` +
      `💰 Breakdown: ${order.priceBreakdown}\n` +
      `💵 ${t.totalSum.toUpperCase()}: €${order.totalAmount}\n` +
      (order.notes ? `📝 ${t.notesLabel}: ${order.notes}\n` : '');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-indigo-950/20 border border-white/80 overflow-hidden flex flex-col my-auto text-center p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Celebration Bubble Icon */}
        <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500/80 to-teal-400/80 p-0.5 shadow-xl shadow-emerald-500/20 flex items-center justify-center mb-4 backdrop-blur-md border border-white/40">
          <div className="w-full h-full bg-emerald-500/90 rounded-[22px] flex items-center justify-center text-white backdrop-blur-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {t.successModalTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
          {t.successModalSubtitle} <span className="font-semibold text-slate-900">{order.clientName}</span>.
        </p>

        {/* Order Details Card */}
        <div className="mt-5 text-left rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 p-4 text-xs space-y-2 shadow-xs">
          <div className="flex justify-between items-center pb-2 border-b border-white/60">
            <span className="text-slate-500 font-medium">{t.orderNumber}:</span>
            <span className="font-mono font-bold text-slate-800">#{order.id.slice(-6).toUpperCase()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">{t.totalSum}:</span>
            <span className="text-base font-extrabold text-indigo-700 font-mono">
              €{order.totalAmount}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">{t.googleSheetsStatusTitle}:</span>
            <span className="font-semibold text-emerald-800 flex items-center gap-1 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200/80">
              <Check className="w-3 h-3" /> {t.googleSheetsSyncSuccess}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2.5">
          <button
            id="success-open-sheets-btn"
            onClick={onOpenSheets}
            className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all border border-emerald-400/30 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{t.viewInGoogleSheets}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopySummary}
            className="w-full py-2.5 px-4 rounded-2xl bg-white/70 hover:bg-white text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-white/80 shadow-xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{t.copiedToClipboard}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>{t.copyReportSummary}</span>
              </>
            )}
          </button>

          <button
            id="success-close-btn"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-2xl text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            {t.createNewCalc}
          </button>
        </div>
      </div>
    </div>
  );
};
