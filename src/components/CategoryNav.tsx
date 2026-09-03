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
              className={`group relative shrink-0 w-[200px] h-[100px] px-2.5 py-2 rounded-2xl text-sm font-medium transition-all duration-200 select-none backdrop-blur-md flex flex-col items-center justify-center text-center gap-2 cursor-pointer bg-[#ebdef7] ${
                isActive
                  ? 'text-slate-900 shadow-md shadow-purple-500/15 border-2 border-indigo-500/80 ring-2 ring-indigo-500/20'
                  : 'hover:bg-[#ebdef7]/90 text-slate-800 border border-purple-200/80 shadow-xs'
              }`}
            >
              {/* Category Icon with glowing bubble backdrop */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/30'
                    : 'bg-white/70 text-slate-600 group-hover:text-indigo-600 border border-white/80'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Title */}
              <span className="font-semibold text-xs leading-tight line-clamp-2 px-1">
                {category.title}
              </span>

              {/* Selected counter pill if any */}
              {count > 0 && (
                <span
                  className={`absolute top-2 right-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold transition-transform group-hover:scale-105 ${
                    isActive
                      ? 'bg-indigo-100/90 text-indigo-800 border border-indigo-200/60 shadow-xs'
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
