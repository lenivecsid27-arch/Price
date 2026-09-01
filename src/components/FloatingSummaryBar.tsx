import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { SelectedPackage, SelectedItem, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface FloatingSummaryBarProps {
  selectedPackages: SelectedPackage[];
  selectedItems: SelectedItem[];
  totalSum: number;
  language: Language;
  onOpenOrderModal: () => void;
  onRemovePackage: (packageId: string) => void;
  onRemoveItem: (itemId: string) => void;
  onClearAll: () => void;
}

export const FloatingSummaryBar: React.FC<FloatingSummaryBarProps> = ({
  selectedPackages,
  selectedItems,
  totalSum,
  language,
  onOpenOrderModal,
  onRemovePackage,
  onRemoveItem,
  onClearAll,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = TRANSLATIONS[language];

  const totalPositions = selectedPackages.length + selectedItems.length;

  if (totalPositions === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        {/* Expanded Details Bubble Drawer */}
        {isExpanded && (
          <div className="mb-2 p-4 sm:p-5 rounded-3xl backdrop-blur-2xl bg-white/90 border border-white/80 shadow-2xl shadow-indigo-900/10 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/60 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                <h4 className="text-sm font-bold text-slate-900">
                  {t.selectedItemsSummary} ({totalPositions})
                </h4>
              </div>
              <button
                onClick={onClearAll}
                className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50/70 hover:bg-rose-100/80 px-2.5 py-1 rounded-xl transition-all border border-rose-200/60 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> {t.clearAll}
              </button>
            </div>

            {/* List of items */}
            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 text-xs">
              {/* Packages */}
              {(selectedPackages || []).map((pkg) => (
                <div
                  key={pkg.packageId}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-violet-950">
                        📦 {pkg.subcategoryTitle}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-md text-[10px] font-bold bg-violet-100/90 text-violet-800 border border-violet-200/70">
                        {pkg.tierLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">{pkg.categoryTitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-violet-900 font-mono">
                      €{pkg.price} {pkg.period || ''}
                    </span>
                    <button
                      onClick={() => onRemovePackage(pkg.packageId)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
                      title={t.removeFromCalc}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Individual items */}
              {(selectedItems || []).map((item) => (
                <div
                  key={item.itemId}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-xs"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-slate-600">
                      {item.categoryTitle} • {item.subcategoryTitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-indigo-700 font-mono">
                      {item.quantity > 1 ? `${item.quantity} × €${item.price} = ` : ''}€{item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.itemId)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
                      title={t.removeFromCalc}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Floating Bubble Pill Bar */}
        <div className="relative rounded-3xl backdrop-blur-2xl bg-slate-900/85 text-white p-2.5 sm:p-3 sm:px-5 shadow-2xl shadow-indigo-950/20 border border-white/25 flex items-center justify-between gap-3">
          {/* Left: Cart Info + Toggle Breakdown */}
          <button
            id="floating-expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2.5 text-left group hover:opacity-95 transition-opacity cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 shrink-0 border border-white/20">
              <ShoppingBag className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-200">
                  {totalPositions} {t.selectedServicesCount}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-[11px] text-indigo-300 flex items-center gap-0.5 group-hover:underline">
                  {isExpanded ? t.collapseDetails : t.viewDetails}
                  {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-slate-300">{t.totalSum}:</span>
                <span className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                  €{totalSum}
                </span>
              </div>
            </div>
          </button>

          {/* Right: Submit Order Button */}
          <div className="flex items-center gap-2">
            <button
              id="floating-submit-order-btn"
              onClick={onOpenOrderModal}
              className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-white/20"
            >
              <span>{t.checkoutButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
