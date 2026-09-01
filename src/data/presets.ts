import { PresetBundle, Language } from '../types';

export const getPopularPresets = (lang: Language): PresetBundle[] => {
  const presets: Record<Language, PresetBundle[]> = {
    ua: [
      {
        id: 'preset-turnkey-launch',
        name: '🚀 Комплексний Бізнес-Прорив «Під ключ»',
        badge: 'Топ 1 вибір',
        description: 'Готовий комплекс: SMM Standard + Таргет Meta Ads + Чат-бот + AI-аватар з голосом',
        targetCategory: 'complex',
        icon: 'Boxes',
        packageSelections: [
          { subcategoryId: 'complex-turnkey', packageId: 'cpx-0.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'complex-turnkey', itemId: 'cpx-item-4', quantity: 1 },
        ],
      },
      {
        id: 'preset-ai-automation',
        name: '🤖 AI-Автоматизація & Лідогенерація',
        badge: 'AI Тренд',
        description: 'AI Sales Асистент + n8n/Make автоматизація + AI-аватар для Reels',
        targetCategory: 'automation',
        icon: 'Cpu',
        packageSelections: [
          { subcategoryId: 'auto-workflows', packageId: 'aut-2.1-standard' },
          { subcategoryId: 'auto-ai-agents', packageId: 'aut-ai-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'auto-workflows', itemId: 'aut-it-1', quantity: 1 },
        ],
      },
      {
        id: 'preset-comics-brand',
        name: '🎨 Брендовий Комікс-Стрип & Стікери',
        badge: 'Креатив',
        description: 'Серія з 4 брендових коміксів для соцмереж + Набір із 20 стікерів та маскот',
        targetCategory: 'comics',
        icon: 'Palette',
        packageSelections: [
          { subcategoryId: 'comics-strips', packageId: 'com-3.1-standard' },
          { subcategoryId: 'comics-merch', packageId: 'com-merch-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'comics-strips', itemId: 'com-it-1', quantity: 1 },
        ],
      },
      {
        id: 'preset-course-mentoring',
        name: '🎓 Практичний курс з ментором 1-на-1',
        badge: 'Навчання',
        description: 'Курс із куратором + Персональна ментор-сесія 60 хв + 100 готових AI-промптів',
        targetCategory: 'courses',
        icon: 'GraduationCap',
        packageSelections: [
          { subcategoryId: 'courses-practical', packageId: 'crs-1.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'courses-practical', itemId: 'crs-item-2', quantity: 1 },
          { subcategoryId: 'courses-practical', itemId: 'crs-item-4', quantity: 1 },
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
        name: '🚀 Turnkey Business Breakthrough Bundle',
        badge: '#1 Best Seller',
        description: 'All-in-One: SMM Standard + Meta Ads + ManyChat Funnel + Custom AI Avatar',
        targetCategory: 'complex',
        icon: 'Boxes',
        packageSelections: [
          { subcategoryId: 'complex-turnkey', packageId: 'cpx-0.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'complex-turnkey', itemId: 'cpx-item-4', quantity: 1 },
        ],
      },
      {
        id: 'preset-ai-automation',
        name: '🤖 AI Automation & Autonomous Lead-Gen',
        badge: 'AI Trend',
        description: 'AI Sales Assistant + n8n/Make Workflows + AI Video Avatar',
        targetCategory: 'automation',
        icon: 'Cpu',
        packageSelections: [
          { subcategoryId: 'auto-workflows', packageId: 'aut-2.1-standard' },
          { subcategoryId: 'auto-ai-agents', packageId: 'aut-ai-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'auto-workflows', itemId: 'aut-it-1', quantity: 1 },
        ],
      },
      {
        id: 'preset-comics-brand',
        name: '🎨 Branded Webcomic & Sticker Pack',
        badge: 'Creative Art',
        description: '4 Branded Comic Strips for Socials + 20 Telegram Stickers & Mascot',
        targetCategory: 'comics',
        icon: 'Palette',
        packageSelections: [
          { subcategoryId: 'comics-strips', packageId: 'com-3.1-standard' },
          { subcategoryId: 'comics-merch', packageId: 'com-merch-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'comics-strips', itemId: 'com-it-1', quantity: 1 },
        ],
      },
      {
        id: 'preset-course-mentoring',
        name: '🎓 Practical Masterclass + 1-on-1 Mentorship',
        badge: 'Education',
        description: 'Full course with mentor review + 60 min private session + 100 AI prompts',
        targetCategory: 'courses',
        icon: 'GraduationCap',
        packageSelections: [
          { subcategoryId: 'courses-practical', packageId: 'crs-1.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'courses-practical', itemId: 'crs-item-2', quantity: 1 },
          { subcategoryId: 'courses-practical', itemId: 'crs-item-4', quantity: 1 },
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
        name: '🚀 Turnkey Business Breakthrough Pakket',
        badge: 'Topkeuze',
        description: 'All-in-One: SMM Standard + Meta Ads + ManyChat Funnel + Aangepaste AI Avatar',
        targetCategory: 'complex',
        icon: 'Boxes',
        packageSelections: [
          { subcategoryId: 'complex-turnkey', packageId: 'cpx-0.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'complex-turnkey', itemId: 'cpx-item-4', quantity: 1 },
        ],
      },
      {
        id: 'preset-ai-automation',
        name: '🤖 AI Automatisering & Leadgeneratie',
        badge: 'AI Trend',
        description: 'AI Sales Assistent + n8n/Make Flow + Aangepaste AI Video Avatar',
        targetCategory: 'automation',
        icon: 'Cpu',
        packageSelections: [
          { subcategoryId: 'auto-workflows', packageId: 'aut-2.1-standard' },
          { subcategoryId: 'auto-ai-agents', packageId: 'aut-ai-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'auto-workflows', itemId: 'aut-it-1', quantity: 1 },
        ],
      },
      {
        id: 'preset-comics-brand',
        name: '🎨 Merkstrip & Stickerpakket Bundel',
        badge: 'Creatief',
        description: '4 Merkstrips voor social media + 20 Telegram stickers & mascotte',
        targetCategory: 'comics',
        icon: 'Palette',
        packageSelections: [
          { subcategoryId: 'comics-strips', packageId: 'com-3.1-standard' },
          { subcategoryId: 'comics-merch', packageId: 'com-merch-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'comics-strips', itemId: 'com-it-1', quantity: 1 },
        ],
      },
      {
        id: 'preset-course-mentoring',
        name: '🎓 Praktijkcursus + 1-op-1 Begeleiding',
        badge: 'Opleiding',
        description: 'Cursus met mentor + 60 min privé consult + 100 AI prompt templates',
        targetCategory: 'courses',
        icon: 'GraduationCap',
        packageSelections: [
          { subcategoryId: 'courses-practical', packageId: 'crs-1.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'courses-practical', itemId: 'crs-item-2', quantity: 1 },
          { subcategoryId: 'courses-practical', itemId: 'crs-item-4', quantity: 1 },
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
        name: '🚀 Комплексный Бизнес-Прорыв «Под ключ»',
        badge: 'Выбор №1',
        description: 'Готовый комплекс: SMM Standard + Таргет Meta Ads + Чат-бот + AI-аватар с голосом',
        targetCategory: 'complex',
        icon: 'Boxes',
        packageSelections: [
          { subcategoryId: 'complex-turnkey', packageId: 'cpx-0.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'complex-turnkey', itemId: 'cpx-item-4', quantity: 1 },
        ],
      },
      {
        id: 'preset-ai-automation',
        name: '🤖 AI-Автоматизация & Лидогенерация',
        badge: 'AI Тренд',
        description: 'AI Sales Ассистент + n8n/Make автоматизация + AI-аватар для Reels',
        targetCategory: 'automation',
        icon: 'Cpu',
        packageSelections: [
          { subcategoryId: 'auto-workflows', packageId: 'aut-2.1-standard' },
          { subcategoryId: 'auto-ai-agents', packageId: 'aut-ai-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'auto-workflows', itemId: 'aut-it-1', quantity: 1 },
        ],
      },
      {
        id: 'preset-comics-brand',
        name: '🎨 Брендовый Комикс-Стрип & Стикеры',
        badge: 'Креатив',
        description: 'Серия из 4 брендовых комиксов для соцсетей + Набор из 20 стикеров и маскот',
        targetCategory: 'comics',
        icon: 'Palette',
        packageSelections: [
          { subcategoryId: 'comics-strips', packageId: 'com-3.1-standard' },
          { subcategoryId: 'comics-merch', packageId: 'com-merch-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'comics-strips', itemId: 'com-it-1', quantity: 1 },
        ],
      },
      {
        id: 'preset-course-mentoring',
        name: '🎓 Практический курс с ментором 1-на-1',
        badge: 'Обучение',
        description: 'Курс с куратором + Персональная ментор-сессия 60 мин + 100 готовых AI-промптов',
        targetCategory: 'courses',
        icon: 'GraduationCap',
        packageSelections: [
          { subcategoryId: 'courses-practical', packageId: 'crs-1.1-standard' },
        ],
        itemSelections: [
          { subcategoryId: 'courses-practical', itemId: 'crs-item-2', quantity: 1 },
          { subcategoryId: 'courses-practical', itemId: 'crs-item-4', quantity: 1 },
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
