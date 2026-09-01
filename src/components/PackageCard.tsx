import React from 'react';
import { Check, Sparkles, Plus } from 'lucide-react';
import { PackageOffer, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface PackageCardProps {
  pkg: PackageOffer;
  subcategoryId: string;
  subcategoryTitle: string;
  categoryTitle: string;
  isSelected: boolean;
  language: Language;
  onToggle: (pkg: PackageOffer, subcategoryId: string, subcategoryTitle: string, categoryTitle: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  subcategoryId,
  subcategoryTitle,
  categoryTitle,
  isSelected,
  language,
  onToggle,
}) => {
  const t = TRANSLATIONS[language];
  const isStandard = pkg.tier === 'standard';
  const isPro = pkg.tier === 'pro';

  // Bubble color themes based on tier
  const tierTheme = isPro
    ? {
        badgeBg: 'bg-violet-100/80 text-violet-900 border-violet-200/80 backdrop-blur-sm',
        activeBorder: 'border-violet-500 ring-violet-500/20',
        btnBg: 'bg-violet-600 hover:bg-violet-700 text-white shadow-xs',
        priceColor: 'text-violet-800',
        glow: 'shadow-violet-500/10',
      }
    : isStandard
    ? {
        badgeBg: 'bg-indigo-100/80 text-indigo-900 border-indigo-200/80 backdrop-blur-sm',
        activeBorder: 'border-indigo-500 ring-indigo-500/20',
        btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs',
        priceColor: 'text-indigo-800',
        glow: 'shadow-indigo-500/10',
      }
    : {
        badgeBg: 'bg-white/70 text-slate-800 border-white/80 backdrop-blur-sm',
        activeBorder: 'border-slate-400 ring-slate-400/20',
        btnBg: 'bg-slate-800 hover:bg-slate-900 text-white shadow-xs',
        priceColor: 'text-slate-900',
        glow: 'shadow-slate-500/10',
      };

  return (
    <div
      id={`pkg-card-${pkg.id}`}
      className={`relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-200 backdrop-blur-xl border ${
        isSelected
          ? `bg-white/80 ${tierTheme.activeBorder} shadow-lg ${tierTheme.glow} ring-2`
          : 'bg-white/40 hover:bg-white/65 border-white/60 hover:border-white shadow-xs'
      }`}
    >
      {/* Recommended Pill Badge */}
      {pkg.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20 uppercase tracking-wide">
            <Sparkles className="w-3 h-3" /> {t.optimalChoiceBadge}
          </span>
        </div>
      )}

      <div>
        {/* Tier Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${tierTheme.badgeBg}`}
          >
            {pkg.tierLabel}
          </span>
          {isSelected && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200/80 backdrop-blur-xs">
              <Check className="w-3 h-3" /> {t.inOrderBadge}
            </span>
          )}
        </div>

        {/* Price display */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${tierTheme.priceColor} font-mono`}>
              €{pkg.price}
            </span>
            {pkg.period && <span className="text-sm font-semibold text-slate-600">{pkg.period}</span>}
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            {pkg.period ? t.monthlyServiceDetail : t.oneTimeServiceDetail}
          </p>
        </div>

        {/* Inclusions / Features List */}
        <div className="space-y-2.5 my-4 border-t border-white/40 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t.whatIsIncluded}</p>
          <ul className="space-y-2 text-xs text-slate-700 leading-relaxed font-medium">
            {(pkg.features || []).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-800 flex items-center justify-center mt-0.5 border border-emerald-300/50">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Select / Deselect Action Button */}
      <div className="pt-4 border-t border-white/40 mt-2">
        <button
          id={`pkg-btn-${pkg.id}`}
          onClick={() => onToggle(pkg, subcategoryId, subcategoryTitle, categoryTitle)}
          className={`w-full py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs ${
            isSelected
              ? 'bg-rose-100/80 hover:bg-rose-200/80 text-rose-800 border border-rose-200/80 backdrop-blur-md'
              : `${tierTheme.btnBg}`
          }`}
        >
          {isSelected ? (
            <>{t.removeFromCalc}</>
          ) : (
            <>
              <Plus className="w-4 h-4" /> {t.addPackageToCalc}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
