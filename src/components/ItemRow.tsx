import React from 'react';
import { Plus, Minus, Check, Bot, Star } from 'lucide-react';
import { ServiceItem, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface ItemRowProps {
  item: ServiceItem;
  subcategoryId: string;
  subcategoryTitle: string;
  categoryTitle: string;
  quantity: number;
  language: Language;
  onUpdateQuantity: (
    item: ServiceItem,
    subcategoryId: string,
    subcategoryTitle: string,
    categoryTitle: string,
    quantity: number
  ) => void;
}

export const ItemRow: React.FC<ItemRowProps> = ({
  item,
  subcategoryId,
  subcategoryTitle,
  categoryTitle,
  quantity,
  language,
  onUpdateQuantity,
}) => {
  const t = TRANSLATIONS[language];
  const isSelected = quantity > 0;

  const handleToggle = () => {
    onUpdateQuantity(
      item,
      subcategoryId,
      subcategoryTitle,
      categoryTitle,
      isSelected ? 0 : 1
    );
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateQuantity(
      item,
      subcategoryId,
      subcategoryTitle,
      categoryTitle,
      quantity + 1
    );
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 0) {
      onUpdateQuantity(
        item,
        subcategoryId,
        subcategoryTitle,
        categoryTitle,
        quantity - 1
      );
    }
  };

  return (
    <div
      id={`item-row-${item.id}`}
      onClick={handleToggle}
      className={`group relative flex items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer backdrop-blur-md border ${
        isSelected
          ? 'bg-white/80 border-indigo-300 shadow-sm shadow-indigo-500/10 ring-1 ring-indigo-400/30'
          : 'bg-white/40 hover:bg-white/65 border-white/60 hover:border-white shadow-xs'
      }`}
    >
      {/* Left: Checkbox + Name + Badges */}
      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
        {/* Bubble checkbox */}
        <div
          className={`shrink-0 w-6 h-6 rounded-xl flex items-center justify-center transition-all duration-200 border mt-0.5 sm:mt-0 ${
            isSelected
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
              : 'border-white/80 bg-white/60 group-hover:border-indigo-400 backdrop-blur-xs'
          }`}
        >
          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>

        {/* Item Title & tags */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-xs sm:text-sm font-semibold transition-colors ${
                isSelected ? 'text-indigo-950 font-bold' : 'text-slate-800 group-hover:text-slate-950'
              }`}
            >
              {item.name}
            </span>

            {item.isAi && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100/80 text-violet-800 border border-violet-200/80 shadow-xs backdrop-blur-xs">
                <Bot className="w-3 h-3 text-violet-600" /> {t.aiBadge}
              </span>
            )}

            {item.popular && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/80 text-amber-900 border border-amber-200/80 shadow-xs backdrop-blur-xs">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> {t.topBadge}
              </span>
            )}
          </div>

          {item.unitNote && (
            <p className="text-[11px] text-slate-600 mt-0.5">{item.unitNote}</p>
          )}
        </div>
      </div>

      {/* Right: Stepper (if selected) + Price Tag */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
        {/* Quantity Stepper if selected */}
        {isSelected ? (
          <div className="flex items-center gap-1 bg-white/70 backdrop-blur-md rounded-xl border border-white/80 p-0.5 shadow-xs">
            <button
              id={`item-dec-${item.id}`}
              onClick={handleDecrement}
              aria-label="Decrease quantity"
              className="w-6 h-6 rounded-lg bg-white/80 hover:bg-rose-50 hover:text-rose-600 text-slate-700 flex items-center justify-center transition-colors shadow-xs"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center text-xs font-bold text-slate-900 font-mono">
              {quantity}
            </span>
            <button
              id={`item-inc-${item.id}`}
              onClick={handleIncrement}
              aria-label="Increase quantity"
              className="w-6 h-6 rounded-lg bg-white/80 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 flex items-center justify-center transition-colors shadow-xs"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleToggle}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold text-indigo-700 bg-white/60 hover:bg-white/90 border border-white/80 backdrop-blur-xs transition-all shadow-xs"
          >
            <Plus className="w-3 h-3" /> {t.addItemToCalc}
          </button>
        )}

        {/* Price Bubble */}
        <div className="text-right">
          <span
            className={`text-sm sm:text-base font-extrabold font-mono ${
              isSelected ? 'text-indigo-700' : 'text-slate-900'
            }`}
          >
            €{isSelected ? item.price * quantity : item.price}
          </span>
          {isSelected && quantity > 1 && (
            <p className="text-[10px] text-slate-500 font-mono font-medium">
              {quantity} × €{item.price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
