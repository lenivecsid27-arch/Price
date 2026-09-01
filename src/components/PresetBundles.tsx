import React from 'react';
import {
  Boxes,
  Cpu,
  Palette,
  GraduationCap,
  Share2,
  Sparkles,
  Rocket,
  Target,
  Zap,
  Check,
  LucideIcon,
} from 'lucide-react';
import { PresetBundle, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface PresetBundlesProps {
  presets: PresetBundle[];
  language: Language;
  onApplyPreset: (preset: PresetBundle) => void;
  activePresetId: string | null;
}

const PRESET_ICONS: Record<string, LucideIcon> = {
  Boxes,
  Cpu,
  Palette,
  GraduationCap,
  Share2,
  Sparkles,
  Rocket,
  Target,
};

export const PresetBundles: React.FC<PresetBundlesProps> = ({
  presets,
  language,
  onApplyPreset,
  activePresetId,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="w-full bg-white/40 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-white/60 shadow-xs shadow-indigo-500/5 mb-6">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/80 text-indigo-700 flex items-center justify-center border border-white/80 shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            {t.presetSectionTitle}
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          {t.presetSectionSubtitle}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {(presets || []).map((preset) => {
          const isSelected = activePresetId === preset.id;
          const IconComponent = PRESET_ICONS[preset.icon] || Sparkles;

          return (
            <button
              key={preset.id}
              id={`preset-btn-${preset.id}`}
              onClick={() => onApplyPreset(preset)}
              className={`group text-left p-3 rounded-2xl transition-all duration-200 border flex flex-col justify-between relative overflow-hidden backdrop-blur-md ${
                isSelected
                  ? 'bg-white/90 border-indigo-400 shadow-md shadow-indigo-500/10 ring-2 ring-indigo-500/20'
                  : 'bg-white/45 hover:bg-white/75 border-white/60 hover:border-white shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <IconComponent className="w-4 h-4 text-indigo-600" />
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/80 text-indigo-800 border border-white/80 shadow-xs">
                      {preset.badge}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                  {preset.name}
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/50 flex items-center justify-between text-[11px] font-semibold text-indigo-600">
                <span>{isSelected ? t.selectedLabel : t.applyCombo}</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
