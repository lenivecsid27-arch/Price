import { ServiceCategory, PresetBundle, Language } from '../types';
import { getComplexCategory } from './categories/complex';
import { getCoursesCategory } from './categories/courses';
import { getAutomationCategory } from './categories/automation';
import { getComicsCategory } from './categories/comics';
import { getSmmCategory } from './categories/smm';
import { getMarketingCategory } from './categories/marketing';
import { getWebDesignCategory } from './categories/webDesign';
import { getVideoCategory } from './categories/video';
import { getPopularPresets } from './presets';

export const getServiceCategories = (lang: Language = 'ua'): ServiceCategory[] => {
  return [
    getComplexCategory(lang),    // 1. Комплексні пакети (НА ПЕРШИЙ ПЛАН)
    getCoursesCategory(lang),     // 2. Курси
    getAutomationCategory(lang),  // 3. Автоматизація
    getComicsCategory(lang),      // 4. Комікси
    getSmmCategory(lang),         // 5. SMM
    getMarketingCategory(lang),   // 6. Маркетинг
    getWebDesignCategory(lang),   // 7. Веб-дизайн
    getVideoCategory(lang),       // 8. Відеовиробництво
  ];
};

export { getPopularPresets };

// Default fallback export for initial load
export const SERVICE_CATEGORIES = getServiceCategories('ua');
export const POPULAR_PRESETS = getPopularPresets('ua');
