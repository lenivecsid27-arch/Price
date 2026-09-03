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
    getComplexCategory(lang),    // 1. Комплексні пакети під ключ
    getSmmCategory(lang),        // 2. SMM та AI аватари
    getMarketingCategory(lang),  // 3. Маркетинг, стратегія та аналітика
    getCoursesCategory(lang),    // 4. Продюсування онлайн курсів
    getWebDesignCategory(lang),  // 5. Веб-дизайн та розробка
    getVideoCategory(lang),      // 6. Відеовиробництво та монтаж
    getAutomationCategory(lang), // 7. Автоматизація
    getComicsCategory(lang),     // 8. Комікси та ілюстрації
  ];
};

export { getPopularPresets };

// Default fallback export for initial load
export const SERVICE_CATEGORIES = getServiceCategories('ua');
export const POPULAR_PRESETS = getPopularPresets('ua');
