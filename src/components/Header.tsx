import React from 'react';
import { Sparkles, FileSpreadsheet, RotateCcw, ListOrdered, CheckCircle2, ShieldAlert, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenOrders: () => void;
  onOpenSheetsConfig: () => void;
  onReset: () => void;
  ordersCount: number;
  isSheetsConnected: boolean;
  selectedCount: number;
  totalSum: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenOrders,
  onOpenSheetsConfig,
  onReset,
  ordersCount,
  isSheetsConnected,
  selectedCount,
  totalSum,
}) => {
  const t = TRANSLATIONS[language];

  const languages: { code: Language; label: string; flag: string; nativeName: string }[] = [
    { code: 'ua', label: 'UA', flag: '🇺🇦', nativeName: 'Українська' },
    { code: 'en', label: 'EN', flag: '🇬🇧', nativeName: 'English' },
    { code: 'nl', label: 'NL', flag: '🇳🇱', nativeName: 'Nederlands' },
    { code: 'ru', label: 'RU', flag: '🌐', nativeName: 'Русский' },
  ];

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/60 border-b border-white/50 shadow-xs shadow-indigo-500/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-violet-600/80 via-indigo-500/80 to-pink-500/80 p-0.5 shadow-md shadow-indigo-500/10 flex items-center justify-center backdrop-blur-md">
            <div className="w-full h-full bg-white/80 rounded-[14px] flex items-center justify-center backdrop-blur-md border border-white/80">
              <Sparkles className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2 font-display">
                {t.appName}
              </h1>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50/90 backdrop-blur-md text-indigo-700 border border-indigo-200/60 shadow-xs">
                {t.appBadge}
              </span>
            </div>
            <p className="text-xs text-slate-600 hidden md:block font-medium">
              {t.appSubheader}
            </p>
          </div>
        </div>

        {/* Action Controls & Badges */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Language Switcher */}
          <div className="flex items-center bg-white/70 backdrop-blur-md rounded-full p-1 border border-white/80 shadow-xs">
            <div className="flex items-center gap-0.5">
              {languages.map((item) => (
                <button
                  key={item.code}
                  id={`lang-btn-${item.code}`}
                  onClick={() => onLanguageChange(item.code)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold transition-all ${
                    language === item.code
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                  title={item.nativeName}
                >
                  <span className="text-xs leading-none">{item.flag}</span>
                  <span className="text-[11px] font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Google Sheets Sync Badge */}
          <button
            id="header-sheets-btn"
            onClick={onOpenSheetsConfig}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs backdrop-blur-md border ${
              isSheetsConnected
                ? 'bg-emerald-500/15 text-emerald-900 border-emerald-300/60 hover:bg-emerald-500/25'
                : 'bg-amber-500/15 text-amber-900 border-amber-300/60 hover:bg-amber-500/25'
            }`}
            title={t.sheetsConfigTitle}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 shrink-0 text-emerald-700" />
            <span className="hidden md:inline">Google:</span>
            {isSheetsConnected ? (
              <span className="flex items-center gap-1 font-semibold text-emerald-800">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {t.googleSheetsStatusConnected}
              </span>
            ) : (
              <span className="flex items-center gap-1 font-semibold text-amber-800">
                <ShieldAlert className="w-3 h-3 text-amber-600" /> {t.googleSheetsStatusConfigure}
              </span>
            )}
          </button>

          {/* Orders History Drawer Button */}
          <button
            id="header-orders-history-btn"
            onClick={onOpenOrders}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/70 hover:bg-white/90 backdrop-blur-md text-slate-800 border border-white/80 transition-all shadow-xs"
          >
            <ListOrdered className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">{t.ordersHistoryBtn}</span>
            {ordersCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-xs">
                {ordersCount}
              </span>
            )}
          </button>

          {/* Reset button if something selected */}
          {selectedCount > 0 && (
            <button
              id="header-reset-btn"
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-rose-700 bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200/60 backdrop-blur-md transition-all shadow-xs"
              title={t.clearSelectionBtn}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.clearSelectionBtn}</span>
            </button>
          )}

          {/* Live Mini Badge */}
          {selectedCount > 0 && (
            <div className="hidden lg:flex items-center gap-1.5 pl-2.5 border-l border-slate-200">
              <span className="text-xs font-medium text-slate-600">{selectedCount} {t.unitPriceCalc}:</span>
              <span className="text-sm font-bold text-indigo-700 font-mono">€{totalSum}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
