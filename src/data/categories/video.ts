import { ServiceCategory, Language } from '../../types';

export const getVideoCategory = (lang: Language): ServiceCategory => {
  const content = {
    ua: {
      title: 'Відеовиробництво та монтаж',
      shortDesc: 'Монтаж Reels/TikTok, динамічні субтитри, саунд-дизайн, AI-генерація відео',
      sub1Title: 'Монтаж коротких відео (Reels / Shorts / TikTok)',
      sub1Desc: 'Динамічний монтаж, хуки, кольорокорекція, трендові переходи та звукові ефекти',
      tierStarter: 'Пакет 5 відео',
      tierStandard: 'Пакет 10 відео (Рекомендовано)',
      tierPro: 'Пакет 20 відео (Повний контент)',
      sub2Title: 'Сценарії та режисура для Reels/TikTok',
      sub2Desc: 'Розробка чіпляючих сценаріїв із першими 3 секундами, які утримують увагу',
    },
    en: {
      title: 'Video Production & Editing',
      shortDesc: 'Reels/TikTok editing, dynamic subtitles, sound design, AI video generation',
      sub1Title: 'Short-Form Video Editing (Reels / Shorts / TikTok)',
      sub1Desc: 'Dynamic pacing, strong hooks, color grading, trend transitions & sound FX',
      tierStarter: 'Pack of 5 Videos',
      tierStandard: 'Pack of 10 Videos (Recommended)',
      tierPro: 'Pack of 20 Videos (Full Monthly Content)',
      sub2Title: 'Scripts & Directing for Reels/TikTok',
      sub2Desc: 'Viral scripts with high-retention 3-second opening hooks and clear CTAs',
    },
    nl: {
      title: 'Videoproductie & Montage',
      shortDesc: 'Reels/TikTok montage, dynamische ondertitels, sound design & AI-video',
      sub1Title: 'Korte Video Montage (Reels / Shorts / TikTok)',
      sub1Desc: 'Dynamische montage, sterke hooks, kleurcorrectie, effecten en audio',
      tierStarter: 'Pakket van 5 video’s',
      tierStandard: 'Pakket van 10 video’s (Aanbevolen)',
      tierPro: 'Pakket van 20 video’s (Maandcontent)',
      sub2Title: 'Scripts & Regie voor Reels/TikTok',
      sub2Desc: 'Virale scripts met krachtige 3-seconden hooks en duidelijke oproepen tot actie',
    },
    ru: {
      title: 'Видеопроизводство и монтаж',
      shortDesc: 'Монтаж Reels/TikTok, динамические субтитры, саунд-дизайн, AI-видео',
      sub1Title: 'Монтаж коротких видео (Reels / Shorts / TikTok)',
      sub1Desc: 'Динамичный монтаж, хуки, цветокоррекция, трендовые переходы и саунд-дизайн',
      tierStarter: 'Пакет 5 видео',
      tierStandard: 'Пакет 10 видео (Рекомендовано)',
      tierPro: 'Пакет 20 видео (Полный контент)',
      sub2Title: 'Сценарии и режиссура для Reels/TikTok',
      sub2Desc: 'Разработка цепляющих сценариев с хуками первых 3 секунд и CTA',
    },
  }[lang];

  return {
    id: 'video-production',
    title: content.title,
    iconName: 'Video',
    shortDesc: content.shortDesc,
    bubbleColor: {
      bg: 'bg-rose-500',
      text: 'text-rose-600 dark:text-rose-400',
      border: 'border-rose-200',
      glow: 'shadow-rose-500/20',
      lightBg: 'bg-rose-50/80',
      gradient: 'from-rose-500/10 via-pink-500/5 to-red-500/10',
    },
    subcategories: [
      {
        id: 'video-editing',
        code: '7.1',
        title: content.sub1Title,
        description: content.sub1Desc,
        hasPackages: true,
        packageType: 'one-time',
        packages: [
          {
            id: 'vid-4.1-starter',
            tier: 'starter',
            tierLabel: content.tierStarter,
            price: 100,
            currency: '€',
            features: lang === 'en' ? [
              '5 edited Reels/Shorts up to 60 seconds each',
              'Dynamic animated captions / subtitles (Alex Hormozi style)',
              'Basic sound design & background music mix',
              '1 revision round per video',
            ] : lang === 'nl' ? [
              '5 gemonteerde Reels/Shorts tot 60 seconden per stuk',
              'Dynamische geanimeerde ondertitels',
              'Basis sound design & achtergrondmuziek',
              '1 correctieronde per video',
            ] : lang === 'ru' ? [
              '5 смонтированных Reels/Shorts до 60 секунд каждый',
              'Динамичные анимированные субтитры',
              'Базовый саунд-дизайн и фоновая музыка',
              '1 круг правок на каждое видео',
            ] : [
              '5 змонтованих Reels/Shorts до 60 секунд кожен',
              'Динамічні анімовані субтитри (стиль Alex Hormozi)',
              'Базовий саунд-дизайн та фонова музика',
              '1 коло правок на кожне відео',
            ],
          },
          {
            id: 'vid-4.1-standard',
            tier: 'standard',
            tierLabel: content.tierStandard,
            price: 180,
            currency: '€',
            recommended: true,
            features: lang === 'en' ? [
              '10 edited Reels/Shorts with advanced motion graphics',
              'B-roll footage inserts, zoom-ins & SFX audio accents',
              'Color grading & voice audio mastering (denoise/compression)',
              'Click-worthy cover thumbnails for Instagram feed',
            ] : lang === 'nl' ? [
              '10 gemonteerde Reels/Shorts met motion graphics',
              'B-roll beelden, zooms en audio accents',
              'Kleurcorrectie & stemverbetering',
              'Pakkende covers voor Instagram feed',
            ] : lang === 'ru' ? [
              '10 смонтированных Reels/Shorts с моушн-графикой',
              'Вставки перебивок (B-roll), зумы и аудио-акценты',
              'Цветокоррекция и мастеринг голоса',
              'Кликабельные обложки для сетки профиля',
            ] : [
              '10 змонтованих Reels/Shorts із моушн-графікою',
              'Вставки перебивок (B-roll), зуми та аудіо-акценти',
              'Кольорокорекція та мастеринг голосу (шумозаглушення)',
              'Клікабельні обкладинки для сітки профілю',
            ],
          },
          {
            id: 'vid-4.1-pro',
            tier: 'pro',
            tierLabel: content.tierPro,
            price: 320,
            currency: '€',
            features: lang === 'en' ? [
              '20 edited Reels/Shorts (complete monthly video pool)',
              'High-end 2D motion graphics, 3D elements & AI visual B-roll',
              'Custom sound design scoring for viral retention',
              'Priority 48-hour delivery SLA',
            ] : lang === 'nl' ? [
              '20 gemonteerde Reels/Shorts (maandelijkse videopool)',
              'Geavanceerde 2D motion graphics & AI visual B-roll',
              'Aangepast sound design voor maximale kijkduur',
              'Prioriteit 48-uurs levering',
            ] : lang === 'ru' ? [
              '20 смонтированных Reels/Shorts (полный месячный пул)',
              'Сложная 2D моушн-графика и AI видео-перебивки',
              'Индивидуальный саунд-дизайн для максимального удержания',
              'Приоритетная сдача в течение 48 часов',
            ] : [
              '20 змонтованих Reels/Shorts (повний місячний пул)',
              'Складна 2D моушн-графіка та AI відео-перебивки',
              'Індивідуальний саунд-дизайн для максимального утримання',
              'Пріоритетна здача протягом 48 годин',
            ],
          },
        ],
        items: [
          { id: 'vid-it-1', name: lang === 'en' ? 'Single Reels/TikTok video editing (up to 60 sec)' : lang === 'nl' ? 'Enkele Reels/TikTok videomontage (tot 60s)' : lang === 'ru' ? 'Монтаж 1 видео Reels/TikTok (до 60 сек)' : 'Монтаж 1 відео Reels/TikTok (до 60 сек)', price: 25, currency: '€', popular: true },
          { id: 'vid-it-2', name: lang === 'en' ? 'Pack of 5 viral scripts with 3-second opening hooks' : lang === 'nl' ? 'Pakket van 5 virale scripts met hooks' : lang === 'ru' ? 'Пакет из 5 вирусных сценариев с хуками' : 'Пакет із 5 вірусних сценаріїв із хуками перших 3 секунд', price: 40, currency: '€' },
          { id: 'vid-it-3', name: lang === 'en' ? 'AI Voiceover synthesis & audio restoration' : lang === 'nl' ? 'AI Voiceover synthese & audiocorrrectie' : lang === 'ru' ? 'Синтез закадрового голоса AI и очистка звука' : 'Синтез закадрового голосу AI та очищення звуку', price: 20, currency: '€', isAi: true },
        ],
      },
      {
        id: 'video-scripts',
        code: '7.2',
        title: content.sub2Title,
        description: content.sub2Desc,
        hasPackages: false,
        items: [
          { id: 'vid-scr-1', name: lang === 'en' ? '1 viral script with hook, body points, and CTA' : lang === 'nl' ? '1 viraal script met hook, inhoud en CTA' : lang === 'ru' ? '1 сценарий с хуком, тезисами и CTA' : '1 детальний сценарій із хуком, тезами та CTA', price: 10, currency: '€' },
          { id: 'vid-scr-2', name: lang === 'en' ? 'Pack of 10 structured video scripts' : lang === 'nl' ? 'Pakket van 10 gestructureerde videoscripts' : lang === 'ru' ? 'Пакет из 10 структурированных сценариев' : 'Пакет із 10 структурованих сценаріїв для відео', price: 70, currency: '€', popular: true },
        ],
      },
    ],
  };
};
