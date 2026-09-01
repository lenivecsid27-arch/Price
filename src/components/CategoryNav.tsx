import React from 'react';
import {
  Boxes,
  GraduationCap,
  Cpu,
  Palette,
  Share2,
  TrendingUp,
  Layout,
  Video,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { ServiceCategory } from '../types';

interface CategoryNavProps {
  categories: ServiceCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  selectedCountsByCategory: Record<string, number>;
  selectedSumsByCategory: Record<string, number>;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Boxes,
  GraduationCap,
  Cpu,
  Palette,
  Share2,
  TrendingUp,
  Layout,
  Video,
  Sparkles,
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  selectedCountsByCategory,
  selectedSumsByCategory,
}) => {
  return (
    <div className="w-full">
      {/* Category Pills Navigation with horizontal scroll on mobile */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar py-1">
        {(categories || []).map((category) => {
          const isActive = category.id === activeCategoryId;
          const Icon = ICON_MAP[category.iconName] || Sparkles;
          const count = selectedCountsByCategory[category.id] || 0;
          const sum = selectedSumsByCategory[category.id] || 0;

          return (
            <button
              key={category.id}
              id={`cat-nav-${category.id}`}
              onClick={() => onSelectCategory(category.id)}
              className={`group relative shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 select-none backdrop-blur-md ${
                isActive
                  ? 'bg-white/80 text-slate-900 shadow-md shadow-indigo-500/10 border border-white ring-2 ring-indigo-500/20'
                  : 'bg-white/40 hover:bg-white/65 text-slate-700 border border-white/60 shadow-xs'
              }`}
            >
              {/* Category Icon with glowing bubble backdrop */}
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/30'
                    : 'bg-white/70 text-slate-600 group-hover:text-indigo-600 border border-white/80'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Title */}
              <span className="font-semibold">{category.title}</span>

              {/* Selected counter pill if any */}
              {count > 0 && (
                <span
                  className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold transition-transform group-hover:scale-105 ${
                    isActive
                      ? 'bg-indigo-100/90 text-indigo-800 border border-indigo-200/60'
                      : 'bg-indigo-600 text-white shadow-xs'
                  }`}
                >
                  {count} {sum > 0 ? `(€${sum})` : ''}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
