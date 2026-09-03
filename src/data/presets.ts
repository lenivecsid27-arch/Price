import { PresetBundle, Language } from '../types';

export const getPopularPresets = (lang: Language): PresetBundle[] => {
  const presets: Record<Language, PresetBundle[]> = {
    ua: [
      {
        id: 'preset-turnkey-launch',
        name: '🚀 Щомісячний ріст (SMM + Відеопродакшн)',
        badge: 'Топ 1 вибір',
        description: 'Готовий комплекс: Повне ведення соцмережі + 10 Reels/Shorts + Ком\'юніті-менеджмент',
        targetCategory: 'complex',
        icon: 'Boxes',
        packageSelections: [
          { subcategoryId: 'complex-turnkey', packageId: 'cpx-0.1-standard' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-ai-automation',
        name: '🤖 AI-Автоматизація & Лідогенерація',
        badge: 'AI Тренд',
        description: 'AI Sales Асистент + n8n/Make автоматизація + База знань',
        targetCategory: 'automation',
        icon: 'Cpu',
        packageSelections: [
          { subcategoryId: 'auto-make-n8n', packageId: 'aut-make-middle' },
          { subcategoryId: 'auto-ai-bot', packageId: 'aut-bot-middle' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-comics-brand',
        name: '🎨 AI-Комікс під ключ + Концепт персонажа',
        badge: 'Креатив',
        description: 'Міні-комікс під ключ (пакет 3–5 стор.) Standard + Розробка концепту персонажа Standard',
        targetCategory: 'comics',
        icon: 'Palette',
        packageSelections: [
          { subcategoryId: 'comics-turnkey-pack', packageId: 'com-turnkey-standard' },
          { subcategoryId: 'comics-character-concept', packageId: 'com-char-standard' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-course-mentoring',
        name: '🎓 Архітектура курсу + Методологія під ключ',
        badge: 'Навчання',
        description: 'Повна програма курсу Standard + Детальна методологія уроків + Домашні завдання',
        targetCategory: 'courses',
        icon: 'GraduationCap',
        packageSelections: [
          { subcategoryId: 'course-methodology', packageId: 'crs-methodology-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'course-methodology', itemId: 'crs-mth-3', quantity: 1 },
        ],
      },
      {
        id: 'preset-smm-reels',
        name: '📱 SMM Прокачка + 10 Монтажів Reels',
        badge: 'Популярно',
        description: 'SMM Standard + Пакет із 10 професійно змонтованих Reels з динамічними субтитрами',
        targetCategory: 'smm',
        icon: 'Share2',
        packageSelections: [
          { subcategoryId: 'smm-management', packageId: 'smm-1.1-standard' },
          { subcategoryId: 'video-editing', packageId: 'vid-4.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'smm-ai-avatar', itemId: 'smm-ai-2', quantity: 1 },
        ],
      },
    ],
    en: [
      {
        id: 'preset-turnkey-launch',
        name: '🚀 Monthly Growth (SMM + Video Production)',
        badge: '#1 Best Seller',
        description: 'All-in-One: Full SMM Management + 10 Reels/Shorts Turnkey + Community Management',
        targetCategory: 'complex',
        icon: 'Boxes',
        packageSelections: [
          { subcategoryId: 'complex-turnkey', packageId: 'cpx-0.1-standard' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-ai-automation',
        name: '🤖 AI Automation & Autonomous Lead-Gen',
        badge: 'AI Trend',
        description: 'AI Sales Assistant + n8n/Make Workflows + Knowledge Base RAG',
        targetCategory: 'automation',
        icon: 'Cpu',
        packageSelections: [
          { subcategoryId: 'auto-make-n8n', packageId: 'aut-make-middle' },
          { subcategoryId: 'auto-ai-bot', packageId: 'aut-bot-middle' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-comics-brand',
        name: '🎨 AI Comic Turnkey + Character Concept',
        badge: 'Creative Art',
        description: 'Turnkey Mini-Comic (3–5 pages) Standard + Character Concept Design Standard',
        targetCategory: 'comics',
        icon: 'Palette',
        packageSelections: [
          { subcategoryId: 'comics-turnkey-pack', packageId: 'com-turnkey-standard' },
          { subcategoryId: 'comics-character-concept', packageId: 'com-char-standard' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-course-mentoring',
        name: '🎓 Course Architecture & Methodology',
        badge: 'Education',
        description: 'Complete course curriculum Standard + In-depth lesson methodology + Homework assignments',
        targetCategory: 'courses',
        icon: 'GraduationCap',
        packageSelections: [
          { subcategoryId: 'course-methodology', packageId: 'crs-methodology-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'course-methodology', itemId: 'crs-mth-3', quantity: 1 },
        ],
      },
      {
        id: 'preset-smm-reels',
        name: '📱 SMM Growth + 10 Edited Reels Pack',
        badge: 'Social Media',
        description: 'SMM Standard + 10 High-Retention Edited Reels with dynamic captions',
        targetCategory: 'smm',
        icon: 'Share2',
        packageSelections: [
          { subcategoryId: 'smm-management', packageId: 'smm-1.1-standard' },
          { subcategoryId: 'video-editing', packageId: 'vid-4.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'smm-ai-avatar', itemId: 'smm-ai-2', quantity: 1 },
        ],
      },
    ],
    nl: [
      {
        id: 'preset-turnkey-launch',
        name: '🚀 Maandelijkse Groei (SMM + Videoproductie)',
        badge: 'Topkeuze',
        description: 'All-in-One: Volledig SMM-beheer + 10 Reels/Shorts Turnkey + Community Management',
        targetCategory: 'complex',
        icon: 'Boxes',
        packageSelections: [
          { subcategoryId: 'complex-turnkey', packageId: 'cpx-0.1-standard' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-ai-automation',
        name: '🤖 AI Automatisering & Leadgeneratie',
        badge: 'AI Trend',
        description: 'AI Sales Assistent + n8n/Make Flow + Kennisbank RAG',
        targetCategory: 'automation',
        icon: 'Cpu',
        packageSelections: [
          { subcategoryId: 'auto-make-n8n', packageId: 'aut-make-middle' },
          { subcategoryId: 'auto-ai-bot', packageId: 'aut-bot-middle' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-comics-brand',
        name: '🎨 AI Strip Turnkey + Karakterconcept',
        badge: 'Creatief',
        description: 'Turnkey Mini-Strip (3–5 pagina\'s) Standard + Karakterconcept Ontwikkeling Standard',
        targetCategory: 'comics',
        icon: 'Palette',
        packageSelections: [
          { subcategoryId: 'comics-turnkey-pack', packageId: 'com-turnkey-standard' },
          { subcategoryId: 'comics-character-concept', packageId: 'com-char-standard' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-course-mentoring',
        name: '🎓 Cursus Architectuur & Methodologie',
        badge: 'Opleiding',
        description: 'Volledig cursusprogramma Standard + Gedetailleerde lesmethodologie + Praktijkopdrachten',
        targetCategory: 'courses',
        icon: 'GraduationCap',
        packageSelections: [
          { subcategoryId: 'course-methodology', packageId: 'crs-methodology-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'course-methodology', itemId: 'crs-mth-3', quantity: 1 },
        ],
      },
      {
        id: 'preset-smm-reels',
        name: '📱 SMM Groei + 10 Gemonteerde Reels',
        badge: 'Populaire combi',
        description: 'SMM Standard + 10 professioneel gemonteerde Reels met ondertitels',
        targetCategory: 'smm',
        icon: 'Share2',
        packageSelections: [
          { subcategoryId: 'smm-management', packageId: 'smm-1.1-standard' },
          { subcategoryId: 'video-editing', packageId: 'vid-4.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'smm-ai-avatar', itemId: 'smm-ai-2', quantity: 1 },
        ],
      },
    ],
    ru: [
      {
        id: 'preset-turnkey-launch',
        name: '🚀 Ежемесячный рост (SMM + Видеопродакшн)',
        badge: 'Выбор №1',
        description: 'Готовый комплекс: Полное ведение соцсети + 10 Reels/Shorts + Комьюнити-менеджмент',
        targetCategory: 'complex',
        icon: 'Boxes',
        packageSelections: [
          { subcategoryId: 'complex-turnkey', packageId: 'cpx-0.1-standard' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-ai-automation',
        name: '🤖 AI-Автоматизация & Лидогенерация',
        badge: 'AI Тренд',
        description: 'AI Sales Ассистент + n8n/Make автоматизация + База знаний RAG',
        targetCategory: 'automation',
        icon: 'Cpu',
        packageSelections: [
          { subcategoryId: 'auto-make-n8n', packageId: 'aut-make-middle' },
          { subcategoryId: 'auto-ai-bot', packageId: 'aut-bot-middle' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-comics-brand',
        name: '🎨 AI-Комикс под ключ + Концепт персонажа',
        badge: 'Креатив',
        description: 'Мини-комикс под ключ (пакет 3–5 стр.) Standard + Разработка концепта персонажа Standard',
        targetCategory: 'comics',
        icon: 'Palette',
        packageSelections: [
          { subcategoryId: 'comics-turnkey-pack', packageId: 'com-turnkey-standard' },
          { subcategoryId: 'comics-character-concept', packageId: 'com-char-standard' },
        ],
        itemSelections: [],
      },
      {
        id: 'preset-course-mentoring',
        name: '🎓 Архитектура курса + Методология',
        badge: 'Обучение',
        description: 'Полная программа курса Standard + Детальная методология уроков + Домашние задания',
        targetCategory: 'courses',
        icon: 'GraduationCap',
        packageSelections: [
          { subcategoryId: 'course-methodology', packageId: 'crs-methodology-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'course-methodology', itemId: 'crs-mth-3', quantity: 1 },
        ],
      },
      {
        id: 'preset-smm-reels',
        name: '📱 SMM Прокачка + 10 Монтажей Reels',
        badge: 'Популярно',
        description: 'SMM Standard + Пакет из 10 профессионально смонтированных Reels с субтитрами',
        targetCategory: 'smm',
        icon: 'Share2',
        packageSelections: [
          { subcategoryId: 'smm-management', packageId: 'smm-1.1-standard' },
          { subcategoryId: 'video-editing', packageId: 'vid-4.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'smm-ai-avatar', itemId: 'smm-ai-2', quantity: 1 },
        ],
      },
    ],
  };

  return presets[lang] || presets['ua'];
};
