import { ServiceCategory, Language } from '../../types';

export const getSmmCategory = (lang: Language): ServiceCategory => {
  const content = {
    ua: {
      title: 'SMM та AI аватари',
      shortDesc: 'Ведення соцмереж, контент-стратегія, упаковка та AI-аватари',
      sub1Title: 'Комплексне ведення соцмережі (Instagram+FB / TikTok / LinkedIn)',
      sub1Desc: "Регулярний контент, сторіз, ком'юніті-менеджмент та звітність",
      tierStarter: 'Starter',
      tierStandard: 'Standard',
      tierPro: 'Maximum',
      sub2Title: 'Розробка SMM та контент-стратегії (разово)',
      sub2Desc: 'Аналіз ЦА, рубрикатори, Tone of Voice, мудборди та CJM',
      sub3Title: 'Аудит, оптимізація та упаковка профілю під ключ',
      sub3Desc: 'Конверсійна шапка, мультипосилання, дизайн Highlights та закріплені пости',
      sub4Title: 'Створення та кастомізація AI-аватара',
      sub4Desc: 'Генерація реалістичних аватарів, клонування голосу, ліпсінк та налаштування міміки',
    },
    en: {
      title: 'SMM & Social Media Management',
      shortDesc: 'Social media management, content strategy, profile packaging & AI avatars',
      sub1Title: 'Full Social Media Management (Instagram+FB / TikTok / LinkedIn)',
      sub1Desc: 'Regular content, interactive stories, community moderation & analytics',
      tierStarter: 'Starter',
      tierStandard: 'Standard',
      tierPro: 'Maximum',
      sub2Title: 'SMM & Content Strategy Development (one-time)',
      sub2Desc: 'Audience analysis, content pillars, Tone of Voice, moodboards & CJM',
      sub3Title: 'Turnkey Profile Audit, Optimization & Packaging',
      sub3Desc: 'High-converting Bio, smart link-in-bio, Highlights design & pinned posts',
      sub4Title: 'Custom AI Avatar Creation & Voice Cloning',
      sub4Desc: 'Photorealistic avatars, voice cloning, lipsync & facial expression tuning',
    },
    nl: {
      title: 'SMM & Social Media Beheer',
      shortDesc: 'Social media beheer, contentstrategie, profielinrichting & AI-avatars',
      sub1Title: 'Volledig Social Media Beheer (Instagram+FB / TikTok / LinkedIn)',
      sub1Desc: 'Regelmatige content, stories, communitybeheer en maandelijkse rapportages',
      tierStarter: 'Starter',
      tierStandard: 'Standard',
      tierPro: 'Maximum',
      sub2Title: 'SMM & Contentstrategie Ontwikkeling (eenmalig)',
      sub2Desc: 'Doelgroepanalyse, contentrubrieken, Tone of Voice, moodboards & CJM',
      sub3Title: 'Turnkey Profielaudit, Optimalisatie & Inrichting',
      sub3Desc: 'Conversiegerichte Bio, Linktree/Taplink, Highlights-ontwerp & vastgezette posts',
      sub4Title: 'Aangepaste AI-Avatar Creatie & Stemklonen',
      sub4Desc: 'Realistische avatars, stemklonen, lipsync en gezichtsuitdrukkingen',
    },
    ru: {
      title: 'SMM и AI аватары',
      shortDesc: 'Ведение соцсетей, контент-стратегия, упаковка и AI-аватары',
      sub1Title: 'Комплексное ведение соцсетей (Instagram+FB / TikTok / LinkedIn)',
      sub1Desc: 'Регулярный контент, сторис, комьюнити-менеджмент и отчетность',
      tierStarter: 'Starter',
      tierStandard: 'Standard',
      tierPro: 'Maximum',
      sub2Title: 'Разработка SMM и контент-стратегии (разово)',
      sub2Desc: 'Анализ ЦА, рубрикаторы, Tone of Voice, мудборды и CJM',
      sub3Title: 'Аудит, оптимизация и упаковка профиля под ключ',
      sub3Desc: 'Конверсионная шапка, мультиссылка, дизайн Highlights и закрепленные посты',
      sub4Title: 'Создание и кастомизация AI-аватара',
      sub4Desc: 'Генерация реалистичных аватаров, клонирование голоса, липсинк и мимика',
    },
  }[lang];

  const period = lang === 'en' ? '/ mo' : lang === 'nl' ? '/ mnd' : '/ міс';

  return {
    id: 'smm',
    title: content.title,
    iconName: 'Share2',
    shortDesc: content.shortDesc,
    bubbleColor: {
      bg: 'bg-violet-500',
      text: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-200',
      glow: 'shadow-violet-500/20',
      lightBg: 'bg-violet-50/80',
      gradient: 'from-violet-500/10 via-purple-500/5 to-pink-500/10',
    },
    subcategories: [
      {
        id: 'smm-management',
        code: '4.1',
        title: content.sub1Title,
        description: content.sub1Desc,
        hasPackages: true,
        packageType: 'monthly',
        packages: [
          {
            id: 'smm-1.1-starter',
            tier: 'starter',
            tierLabel: content.tierStarter,
            price: 350,
            currency: '€',
            period,
            features: lang === 'en' ? [
              '8–10 posts per month (copy + ready templates or client photos)',
              '15–20 basic Stories per month (reposts, polls, announcements)',
              'Scheduled posting via content planner',
              'Basic replies to standard comments',
            ] : lang === 'nl' ? [
              '8–10 posts per maand (tekst + templates of foto\'s van klant)',
              '15–20 basis Stories per maand (reposts, polls, aankondigingen)',
              'Gepland plaatsen volgens vast schema',
              'Basisreacties op opmerkingen onder posts',
            ] : lang === 'ru' ? [
              '8–10 постов в месяц (текст + готовые шаблоны или фото клиента)',
              '15–20 базовых Stories в месяц (репосты, опросы, анонсы)',
              'Базовый постинг по согласованному графику',
              'Ответы на простые комментарии под публикациями',
            ] : [
              '8–10 постів на місяць (текст + готові шаблони або фото клієнта)',
              '15–20 базових Stories на місяць (репости, опитування, анонси)',
              'Базовий постінг за узгодженим графіком',
              'Відповіді на прості коментарі під публікаціями',
            ],
          },
          {
            id: 'smm-1.1-standard',
            tier: 'standard',
            tierLabel: content.tierStandard,
            price: 550,
            currency: '€',
            period,
            recommended: true,
            features: lang === 'en' ? [
              'Monthly content plan with structured rubrics (expert, engaging, sales)',
              '12–16 publications per month (carousels, static posts, AI graphics)',
              '30–40 interactive storytelling Stories with engagement stickers',
              'Community management: moderation & Direct handling per script',
              'Hashtag & geotargeting research',
              'Monthly performance report (reach, engagement, follower growth)',
            ] : lang === 'nl' ? [
              'Maandelijks contentplan met themarubrieken',
              '12–16 publicaties per maand (carrousels, static posts, AI visual)',
              '30–40 interactieve Stories met storytelling',
              'Community management: moderatie & Direct reacties via script',
              'Hashtag- & geotargeting optimalisatie',
              'Maandelijks analyserapport (bereik, interacties, volgers)',
            ] : lang === 'ru' ? [
              'Ежемесячный контент-план с рубрикатором (экспертный/вовлекающий)',
              '12–16 публикаций в месяц (карусели, статика, AI-визуал)',
              '30–40 Stories в месяц с сюжетными линиями и интерактивами',
              'Комьюнити-менеджмент: модерация и Direct по скрипту',
              'Подбор целевых хештегов и геолокаций',
              'Ежемесячный отчет (охваты, ER, рост подписчиков)',
            ] : [
              'Щомісячний контент-план із рубрикатором (корисний/експертний/залучаючий)',
              '12–16 публікацій на місяць (каруселі, статичні пости, AI-візуал)',
              '30–40 Stories на місяць із сюжетними лініями та інтерактивними стікерами',
              'Ком\'юніті-менеджмент: модерація коментарів, обробка Direct за скриптом',
              'Підбір цільових хештегів та геолокацій',
              'Базовий звіт раз на місяць (підписники, охоплення, взаємодії)',
            ],
          },
          {
            id: 'smm-1.1-pro',
            tier: 'pro',
            tierLabel: content.tierPro,
            price: 850,
            currency: '€',
            period,
            features: lang === 'en' ? [
              'Complete content grid: 16–20 items (posts, carousels, Reels/Shorts editing)',
              'Daily storytelling Stories with sales funnel warm-ups',
              'Active audience engagement & spam filtering',
              'Collaboration & cross-promotion outreach',
              'Advanced analytics report: Engagement Rate (ER), rubric audit, strategy tuning',
            ] : lang === 'nl' ? [
              'Volledig contentrooster: 16–20 items (posts, carrousels, Reels montage)',
              'Dagelijkse Stories met verkoopfunnels',
              'Actieve moderatie en betrokkenheid van doelgroep',
              'Samenwerkingen en kruispromotie',
              'Geavanceerd analyserapport met strategische bijsturing',
            ] : lang === 'ru' ? [
              'Полная контент-сетка: 16–20 единиц (посты, карусели, монтаж Reels/Shorts)',
              'Ежедневные продуманные Stories (прогревы, воронки)',
              'Активная модерация и вовлечение аудитории',
              'Организация взаимного пиара и коллабораций',
              'Расширенный отчет с ER и ежемесячной корректировкой стратегии',
            ] : [
              'Повна контент-сітка: 16–20 одиниць контенту (пости, каруселі, монтаж Reels/Shorts)',
              'Щоденні продумані Stories (прогріви, робота із запереченнями)',
              'Активна модерація та залучення аудиторії, робота зі спамом',
              'Організація взаємного піару / колаборацій з іншими сторінками',
              'Розширений звіт: Engagement Rate (ER), ефективність рубрик, корекція стратегії',
            ],
          },
        ],
        items: [
          { id: 'smm-item-1', name: lang === 'en' ? 'Creation of 8–10 basic posts per month (copy + ready templates)' : lang === 'nl' ? 'Creatie van 8–10 basisposts per maand (tekst + templates)' : lang === 'ru' ? 'Создание 8–10 базовых постов в месяц (текст + готовые шаблоны)' : 'Створення 8–10 базових постів на місяць (текст + готові шаблони)', price: 150, currency: '€' },
          { id: 'smm-item-2', name: lang === 'en' ? 'Creation of 12–16 custom / AI visual posts & carousels' : lang === 'nl' ? 'Creatie van 12–16 custom / AI visual posts & carrousels' : lang === 'ru' ? 'Создание 12–16 постов с кастомным / AI-визуалом и каруселями' : 'Створення 12–16 постів із кастомним / AI-візуалом та каруселями', price: 250, currency: '€', popular: true },
          { id: 'smm-item-3', name: lang === 'en' ? 'Creation of 16–20 full content items (posts + carousels + reels)' : lang === 'nl' ? 'Creatie van 16–20 complete content items (posts + reels)' : lang === 'ru' ? 'Создание 16–20 единиц комплексного контента (посты + карусели + рилс)' : 'Створення 16–20 одиниць комплексного контенту (пости + каруселі + рилс)', price: 350, currency: '€' },
          { id: 'smm-item-4', name: lang === 'en' ? 'Creation and publishing of 15–20 basic Stories per month' : lang === 'nl' ? 'Creatie en plaatsing van 15–20 basis Stories per maand' : lang === 'ru' ? 'Создание и публикация 15–20 базовых Stories в месяц' : 'Створення та публікація 15–20 базових Stories на місяць', price: 80, currency: '€' },
          { id: 'smm-item-5', name: lang === 'en' ? 'Creation and publishing of 30–40 storytelling Stories' : lang === 'nl' ? 'Creatie en plaatsing van 30–40 storytelling Stories' : lang === 'ru' ? 'Создание и публикация 30–40 сюжетных Stories (storytelling)' : 'Створення та публікація 30–40 сюжетних Stories (storytelling)', price: 140, currency: '€' },
          { id: 'smm-item-6', name: lang === 'en' ? 'Daily Stories with sales warmups (60+ Stories/mo)' : lang === 'nl' ? 'Dagelijkse Stories met verkoopfunnels (60+ per maand)' : lang === 'ru' ? 'Ежедневное ведение Stories с прогревами и воронками (60+ Stories/мес)' : 'Щоденне ведення Stories із прогрівами та воронками (60+ Stories/міс)', price: 220, currency: '€' },
          { id: 'smm-item-7', name: lang === 'en' ? 'Scheduled publishing via planner (delayed posting)' : lang === 'nl' ? 'Inplannen en publiceren volgens schema' : lang === 'ru' ? 'Базовый постинг по графику (отложенный постинг)' : 'Базовий постінг за графіком (відкладений монтаж/постинг)', price: 60, currency: '€' },
          { id: 'smm-item-8', name: lang === 'en' ? 'Standard comment responses under posts' : lang === 'nl' ? 'Basisreacties op opmerkingen onder posts' : lang === 'ru' ? 'Базовые ответы на простые комментарии под постами' : 'Базові відповіді на прості коментарі під постами', price: 60, currency: '€' },
          { id: 'smm-item-9', name: lang === 'en' ? 'Full community management (Direct per script + moderation)' : lang === 'nl' ? 'Volledig community management (Direct + moderatie)' : lang === 'ru' ? 'Полноценный комьюнити-менеджмент (модерация + Direct по скрипту)' : 'Повноцінний ком\'юніті-менеджмент (модерація + Direct за скриптом)', price: 120, currency: '€' },
          { id: 'smm-item-10', name: lang === 'en' ? 'Monthly content plan with structured rubrics and topics' : lang === 'nl' ? 'Maandelijks contentplan met thema\'s en rubrieken' : lang === 'ru' ? 'Ежемесячный контент-план с темами и рубрикатором' : 'Щомісячний контент-план із темами та рубрикатором', price: 80, currency: '€' },
          { id: 'smm-item-11', name: lang === 'en' ? 'Target hashtag and geotag research, algorithm tuning' : lang === 'nl' ? 'Doelgerichte hashtag- en geotagonderzoek' : lang === 'ru' ? 'Подбор целевых хештегов, геоточек и работа с алгоритмами' : 'Підбір цільових хештегів, геоточок та робота з алгоритмами', price: 40, currency: '€' },
          { id: 'smm-item-12', name: lang === 'en' ? 'Organization of 2–3 collaborations / cross-promotions' : lang === 'nl' ? 'Organisatie van 2–3 samenwerkingen / kruispromoties' : lang === 'ru' ? 'Организация 2–3 коллабораций / взаимного пиара' : 'Організація 2–3 колаборацій / взаємного піару', price: 80, currency: '€' },
          { id: 'smm-item-13', name: lang === 'en' ? 'Basic monthly analytics report (reach, followers)' : lang === 'nl' ? 'Maandelijks basisrapport over bereik en volgers' : lang === 'ru' ? 'Базовый ежемесячный отчет по охватам и подписчикам' : 'Базовий щомісячний звіт за охопленнями та підписниками', price: 40, currency: '€' },
          { id: 'smm-item-14', name: lang === 'en' ? 'Advanced monthly report with ER & strategy tuning' : lang === 'nl' ? 'Uitgebreid maandrapport met ER & strategische bijsturing' : lang === 'ru' ? 'Расширенный ежемесячный отчет с ER и коррекцией стратегии' : 'Розширений щомісячний звіт з ER та корекцією стратегії', price: 90, currency: '€' },
        ],
      },
      {
        id: 'smm-strategy',
        code: '4.2',
        title: content.sub2Title,
        description: content.sub2Desc,
        hasPackages: true,
        packageType: 'one-time',
        packages: [
          {
            id: 'smm-1.2-starter',
            tier: 'starter',
            tierLabel: content.tierStarter,
            price: 100,
            currency: '€',
            features: lang === 'en' ? [
              'Target audience description (1–2 core profiles)',
              '4–5 main content pillars for feed and Stories',
              'Visual references and aesthetic moodboard',
            ] : lang === 'nl' ? [
              'Doelgroepbeschrijving (1–2 profielen)',
              '4–5 hoofdthema\'s voor feed en Stories',
              'Visuele referenties en moodboard',
            ] : lang === 'ru' ? [
              'Описание целевой аудитории (1–2 базовых портрета)',
              '4–5 основных рубрик для ленты и Stories',
              'Примеры визуального референса для аккаунта',
            ] : [
              'Опис цільової аудиторії (1–2 загальні портрети)',
              '4–5 основних рубрик для стрічки та Stories',
              'Приклади візуального референсу для акаунту',
            ],
          },
          {
            id: 'smm-1.2-standard',
            tier: 'standard',
            tierLabel: content.tierStandard,
            price: 220,
            currency: '€',
            recommended: true,
            features: lang === 'en' ? [
              'Audience segmentation (pain points, desires, buying triggers)',
              'Tone of Voice and communication guidelines',
              'Detailed 1-month content matrix for posts, Reels, and Stories',
              'Visual concept: color scheme, typography pairing, moodboard',
            ] : lang === 'nl' ? [
              'Doelgroepsegmentatie (pijnpunten, koopmotieven)',
              'Unieke Tone of Voice & communicatierichtlijnen',
              'Gedetailleerd contentmatrix voor 1 maand vooruit',
              'Visueel concept: kleurenpalet, typografie, moodboard',
            ] : lang === 'ru' ? [
              'Сегментация ЦА (боли, потребности, триггеры покупок)',
              'Разработка Tone of Voice и правил коммуникации',
              'Рубрикатор с темами для постов, Reels и Stories на 1 месяц вперед',
              'Визуальная концепция: палитра, шрифты, moodboard',
            ] : [
              'Сегментація ЦА (болі, потреби, тригери прийняття рішень)',
              'Розробка унікального Tone of Voice та комунікаційних правил',
              'Детальний рубрикатор із темами для постів, Reels та Stories на 1 місяць наперед',
              'Візуальна концепція: кольорова палітра, шрифтова пара, moodboard',
            ],
          },
          {
            id: 'smm-1.2-pro',
            tier: 'pro',
            tierLabel: content.tierPro,
            price: 400,
            currency: '€',
            features: lang === 'en' ? [
              'Deep audit of current profile + 3–5 competitor profiles',
              'Social Media Customer Journey Map (CJM)',
              'Lead generation funnel via Highlights, Bio, and lead-magnets',
              'Ready 30-day content plan + 5 video scripts with hooks',
              'Figma/Canva template kit handed over to client',
            ] : lang === 'nl' ? [
              'Diepgaande audit van eigen profiel en 3–5 concurrenten',
              'Customer Journey Map (CJM) op sociale media',
              'Lead funnel via Highlights, Bio en lead-magnets',
              'Kant-en-klaar 30-dagen contentplan + 5 videoscripts',
              'Figma/Canva templateset overgedragen aan klant',
            ] : lang === 'ru' ? [
              'Глубокий аудит текущего профиля и 3–5 конкурентов',
              'CJM (Customer Journey Map) в соцсетях',
              'Воронка прогрева через Highlights, Bio и лид-магниты',
              'Готовый контент-план на 30 дней со сценариями первых 5 видео',
              'Гайдлайн по оформлению и шаблоны Figma/Canva клиенту',
            ] : [
              'Глибокий аудит поточного профілю та 3–5 конкурентів',
              'CJM (Customer Journey Map) у соцмережах',
              'Воронка прогріву через Highlights, Bio та лід-магніти',
              'Готовий контент-план на 30 днів із тезами і сценаріями для перших 5 відео',
              'Гайдлайн з оформлення та шаблони у Figma/Canva, передані клієнту',
            ],
          },
        ],
        items: [
          { id: 'smm-strat-1', name: lang === 'en' ? 'Target audience profile development (1–2 segments)' : lang === 'nl' ? 'Doelgroepprofiel ontwikkeling (1–2 segmenten)' : lang === 'ru' ? 'Составление базового портрета ЦА (1–2 сегмента)' : 'Складання базового портрета ЦА (1–2 сегменти)', price: 40, currency: '€' },
          { id: 'smm-strat-2', name: lang === 'en' ? 'Deep audience segmentation & trigger/pain analysis' : lang === 'nl' ? 'Diepe doelgroepsegmentatie & triggeranalyse' : lang === 'ru' ? 'Глубокая сегментация ЦА с анализом триггеров и болей' : 'Глибока сегментація ЦА з аналізом тригерів та болей', price: 90, currency: '€' },
          { id: 'smm-strat-3', name: lang === 'en' ? 'Basic content rubric framework (4–5 directions)' : lang === 'nl' ? 'Basis rubriekenoverzicht (4–5 categorieën)' : lang === 'ru' ? 'Составление базового рубрикатора (4–5 направлений)' : 'Складання базового рубрикатора (4–5 напрямків)', price: 40, currency: '€' },
          { id: 'smm-strat-4', name: lang === 'en' ? 'Detailed monthly rubric plan for posts, Stories & Reels' : lang === 'nl' ? 'Gedetailleerd maandoverzicht voor posts, stories & reels' : lang === 'ru' ? 'Разработка детального рубрикатора на месяц под посты, сторис и рилс' : 'Розробка детального рубрикатора на місяць під пости, сторіз і рилс', price: 80, currency: '€' },
          { id: 'smm-strat-5', name: lang === 'en' ? 'Tone of Voice guideline development' : lang === 'nl' ? 'Tone of Voice gids ontwikkeling' : lang === 'ru' ? 'Разработка гайда Tone of Voice' : 'Розробка гайду Tone of Voice', price: 60, currency: '€' },
          { id: 'smm-strat-6', name: lang === 'en' ? 'Visual moodboard creation (colors, fonts, references)' : lang === 'nl' ? 'Visueel moodboard (kleuren, lettertypen, referenties)' : lang === 'ru' ? 'Создание визуального мудборда (цвета, шрифты, референсы)' : 'Створення візуального мудборду (кольори, шрифти, референси)', price: 50, currency: '€' },
          { id: 'smm-strat-7', name: lang === 'en' ? 'Ready post templates pack in Figma/Canva (6 templates)' : lang === 'nl' ? 'Figma/Canva templateset voor posts (6 stuks)' : lang === 'ru' ? 'Создание набора готовых шаблонов для постов в Figma/Canva (6 шт)' : 'Створення набору готових шаблонів для постів у Figma/Canva (6 шт)', price: 90, currency: '€' },
          { id: 'smm-strat-8', name: lang === 'en' ? 'Pre-strategy account and 3–5 competitor deep audit' : lang === 'nl' ? 'Account- en concurrentieaudit (3–5 concurrenten)' : lang === 'ru' ? 'Аудит аккаунта и 3–5 конкурентов перед построением стратегии' : 'Аудит акаунту та 3–5 конкурентів перед побудовою стратегії', price: 100, currency: '€', popular: true },
          { id: 'smm-strat-9', name: lang === 'en' ? 'Customer Journey Map (CJM) development' : lang === 'nl' ? 'Customer Journey Map (CJM) ontwikkeling' : lang === 'ru' ? 'Разработка Customer Journey Map' : 'Розробка Customer Journey Map', price: 90, currency: '€' },
          { id: 'smm-strat-10', name: lang === 'en' ? 'Funnel engineering via Bio, Highlights & Lead-Magnet' : lang === 'nl' ? 'Funnelontwerp via Bio, Highlights & Lead-Magnet' : lang === 'ru' ? 'Проектирование воронки через Bio, Highlights и лид-магнит' : 'Проєктування воронки через Bio, Highlights та лід-магніт', price: 80, currency: '€' },
          { id: 'smm-strat-11', name: lang === 'en' ? 'Writing 5 detailed video scripts for strategy launch' : lang === 'nl' ? 'Schrijven van 5 gedetailleerde videoscripts voor lancering' : lang === 'ru' ? 'Написание 5 детальных сценариев для видео под запуск стратегии' : 'Написання 5 детальних сценаріїв для відео під запуск стратегії', price: 70, currency: '€' },
        ],
      },
      {
        id: 'smm-audit-pack',
        code: '4.3',
        title: content.sub3Title,
        description: content.sub3Desc,
        hasPackages: true,
        packageType: 'one-time',
        packages: [
          {
            id: 'smm-1.3-starter',
            tier: 'starter',
            tierLabel: content.tierStarter,
            price: 60,
            currency: '€',
            features: lang === 'en' ? [
              'Clear and high-converting Bio formulation (Bio + SEO name)',
              'Basic smart link-in-bio (Linktree or Bento)',
              'Avatar graphic refresh & retouch',
            ] : lang === 'nl' ? [
              'Duidelijke en conversiegerichte Bio tekst (Bio + SEO naam)',
              'Basis smart link (Linktree of Bento)',
              'Avatar grafische update',
            ] : lang === 'ru' ? [
              'Составление понятной и конверсионной шапки Bio + SEO имя',
              'Добавление базовой мультиссылки (Linktree или Bento)',
              'Обновление и базовая обработка аватара',
            ] : [
              'Складання чіткої та зрозумілої шапки профілю (Bio)',
              'Додавання базового мультипосилання (Linktree або аналог)',
              'Оновлення аватара',
            ],
          },
          {
            id: 'smm-1.3-standard',
            tier: 'standard',
            tierLabel: content.tierStandard,
            price: 130,
            currency: '€',
            recommended: true,
            features: lang === 'en' ? [
              'SEO searchable name optimization',
              'Structure and custom cover icons for 5–6 Highlights',
              'Full multi-link landing (Taplink/Beacons/Bento) with services flow',
            ] : lang === 'nl' ? [
              'SEO zoeknaam optimalisatie',
              'Structuur en iconen voor 5–6 Highlights',
              'Uitgebreide Taplink/Beacons pagina met diensten en contactknoppen',
            ] : lang === 'ru' ? [
              'Оптимизация поискового имени (SEO-ключевые слова)',
              'Структура и дизайн иконок для 5–6 закрепленных Stories (Highlights)',
              'Мультиссылка (Taplink/Beacons/Bento) с переходами на контакты и услуги',
            ] : [
              'Оптимізація пошукового імені (SEO-ключові слова для пошуку)',
              'Структура та дизайн іконок для 5–6 закріплених Stories (Highlights)',
              'Мультипосилання (Taplink/Beacons/Bento) з переходами на контакти й послуги',
            ],
          },
          {
            id: 'smm-1.3-pro',
            tier: 'pro',
            tierLabel: content.tierPro,
            price: 250,
            currency: '€',
            features: lang === 'en' ? [
              'Complete profile conversion architecture',
              'Copywriting & design of 3 pinned guide posts',
              'Direct keyword auto-replies & Lead-Magnet delivery (ManyChat)',
              'Full text & visual design for 5 Highlights',
            ] : lang === 'nl' ? [
              'Volledige conversiestructuur van profiel',
              'Ontwerp van 3 vastgezette posts (Introductie, Aanbod, Reviews)',
              'Direct keyword auto-antwoorden (ManyChat / Meta)',
              'Volledige invulling van 5 Highlights (tekst + grafisch)',
            ] : lang === 'ru' ? [
              'Полная архитектура профиля под высокую конверсию',
              'Дизайн 3 закрепленных постов (знакомство, оффер, кейсы/отзывы)',
              'Автоответы в Direct по ключевым словам (ManyChat / Meta)',
              'Полная упаковка Highlights с наполнением (тексты + дизайн карточек)',
            ] : [
              'Повна архітектура профілю під конверсію',
              'Дизайн 3 закріплених постів (знайомство, оффер, кейси/відгуки)',
              'Автовідповіді у Direct на ключові слова (ManyChat / Meta)',
              'Повна упаковка Highlights із наповненням (тексти + верстка карток)',
            ],
          },
        ],
        items: [
          { id: 'smm-pack-1', name: lang === 'en' ? 'Converting Bio + SEO Name optimization' : lang === 'nl' ? 'Conversie Bio + SEO naam optimalisatie' : lang === 'ru' ? 'Разработка конверсионной шапки профиля (Bio + SEO-имя)' : 'Розробка конверсійної шапки профілю (Bio + SEO-ім\'я)', price: 30, currency: '€' },
          { id: 'smm-pack-2', name: lang === 'en' ? 'Profile Avatar creation & basic retouching' : lang === 'nl' ? 'Avatar creatie & basis bewerking' : lang === 'ru' ? 'Создание и базовая обработка аватара' : 'Створення та базова обробка аватара', price: 20, currency: '€' },
          { id: 'smm-pack-3', name: lang === 'en' ? 'Simple link-in-bio setup (Linktree/Bento)' : lang === 'nl' ? 'Eenvoudige link-in-bio setup (Linktree/Bento)' : lang === 'ru' ? 'Настройка простой мультиссылки (Linktree/Bento)' : 'Налаштування простого мультипосилання (Linktree/Bento)', price: 25, currency: '€' },
          { id: 'smm-pack-4', name: lang === 'en' ? 'Full Taplink/Beacons service multi-landing' : lang === 'nl' ? 'Complete Taplink/Beacons landingspagina' : lang === 'ru' ? 'Сборка полноценной мультиссылки с услугами (Taplink/Beacons)' : 'Збірка повноцінного мультипосилання з послугами (Taplink/Beacons)', price: 60, currency: '€', popular: true },
          { id: 'smm-pack-5', name: lang === 'en' ? 'Highlights cover icons design (5–6 icons)' : lang === 'nl' ? 'Highlights cover iconen design (5–6 stuks)' : lang === 'ru' ? 'Дизайн набора обложек для Highlights (5–6 иконок)' : 'Дизайн набору обкладинок для Highlights (5–6 іконок)', price: 35, currency: '€' },
          { id: 'smm-pack-6', name: lang === 'en' ? 'Complete copy & graphics content for 5 Highlights' : lang === 'nl' ? 'Volledige tekst- en beeldvulling voor 5 Highlights' : lang === 'ru' ? 'Полное текстовое и графическое наполнение карточек для 5 Highlights' : 'Повне текстове та графічне наповнення карток для 5 Highlights', price: 80, currency: '€' },
          { id: 'smm-pack-7', name: lang === 'en' ? 'Copywriting & design of 3 pinned guide posts' : lang === 'nl' ? 'Tekst en design van 3 vastgezette gids-posts' : lang === 'ru' ? 'Написание и дизайн 3 закрепленных постов-навигаторов' : 'Написання та дизайн 3 закріплених постів-навігаторів', price: 80, currency: '€' },
          { id: 'smm-pack-8', name: lang === 'en' ? 'Direct auto-replies setup (Meta Business Suite)' : lang === 'nl' ? 'Direct auto-antwoorden instellen (Meta Business Suite)' : lang === 'ru' ? 'Базовая настройка автоответов в Direct (Meta Business Suite)' : 'Базове налаштування автовідповідей у Direct (Meta Business Suite)', price: 30, currency: '€' },
          { id: 'smm-pack-9', name: lang === 'en' ? 'Auto-funnel with Lead-Magnet by keyword (ManyChat)' : lang === 'nl' ? 'Auto-funnel met Lead-Magnet op trefwoord (ManyChat)' : lang === 'ru' ? 'Настройка автоворонки с выдачей лид-магнита по кодовому слову (ManyChat)' : 'Налаштування автоворонки з видачею лід-магніту за кодовим словом (ManyChat)', price: 70, currency: '€' },
        ],
      },
      {
        id: 'smm-ai-avatar',
        code: '4.4',
        title: content.sub4Title,
        description: content.sub4Desc,
        hasPackages: true,
        packageType: 'one-time',
        packages: [
          {
            id: 'smm-1.4-starter',
            tier: 'starter',
            tierLabel: content.tierStarter,
            price: 50,
            currency: '€',
            features: lang === 'en' ? [
              'Ready avatar from service template (HeyGen/D-ID)',
              'Standard synthesized voice without cloning',
              '1 basic visual setup without extra customization',
            ] : lang === 'nl' ? [
              'Kant-en-klare avatar uit template (HeyGen/D-ID)',
              'Standaard synthetische stem zonder klonen',
              '1 basis visuele opstelling',
            ] : lang === 'ru' ? [
              'Готовый аватар по шаблону сервиса (HeyGen/D-ID)',
              'Стандартный синтезированный голос без клонирования',
              '1 базовый визуальный вариант без кастомизации',
            ] : [
              'Готовий аватар за шаблоном сервісу (HeyGen/D-ID), стандартні риси',
              'Стандартний синтезований голос без клонування',
              '1 базовий візуальний варіант без додаткової кастомізації пози/фону',
            ],
          },
          {
            id: 'smm-1.4-standard',
            tier: 'standard',
            tierLabel: content.tierStandard,
            price: 85,
            currency: '€',
            recommended: true,
            features: lang === 'en' ? [
              'Custom avatar generated from client photos/video (high resemblance)',
              'Client voice cloning (ElevenLabs) for natural human sound',
              '2–3 image/background/angle options to choose from',
            ] : lang === 'nl' ? [
              'Aangepaste avatar op basis van foto/video van klant',
              'Stemklonen via ElevenLabs voor natuurlijk geluid',
              '2–3 outfits en achtergronden naar keuze',
            ] : lang === 'ru' ? [
              'Кастомный аватар по фото/видео клиента (высокое сходство)',
              'Клонирование голоса клиента (ElevenLabs)',
              '2–3 варианта образа (одежда/фон/ракурс)',
            ] : [
              'Кастомний аватар, згенерований за фото/відео клієнта (максимальна схожість)',
              'Клонування голосу клієнта (ElevenLabs) для природнішого звучання',
              '2–3 варіанти образу (одяг/фон/ракурс) на вибір',
            ],
          },
          {
            id: 'smm-1.4-pro',
            tier: 'pro',
            tierLabel: content.tierPro,
            price: 120,
            currency: '€',
            features: lang === 'en' ? [
              'Fine-tuning of facial expressions, gestures & intonations for scripts',
              'Multiple outfits for different content types (Reels, Stories, Long video)',
              'Multi-language/accent testing if required',
            ] : lang === 'nl' ? [
              'Fijnafstemming van mimiek, gebaren en intonatie per script',
              'Meerdere outfits voor verschillende videoformaten',
              'Meertalige stemtests indien gewenst',
            ] : lang === 'ru' ? [
              'Тонкая настройка мимики, жестов и интонаций под сценарии',
              'Несколько полных образов для разных форматов контента',
              'Тестирование нескольких языков/акцентов при необходимости',
            ] : [
              'Тонке налаштування міміки, жестикуляції та інтонацій під конкретні сценарії',
              'Кілька повних образів для різних форматів контенту (Reels, Stories, довге відео)',
              'Тестування кількох мов/акцентів голосової доріжки за потреби',
            ],
          },
        ],
        items: [
          {
            id: 'smm-ai-1',
            name: lang === 'en'
              ? 'Video generation on static background with auto-subtitles (ready text)'
              : lang === 'nl'
              ? 'Videogeneratie op statische achtergrond met automatische ondertiteling (kant-en-klare tekst)'
              : lang === 'ru'
              ? 'Генерация видео на статичном фоне с автосубтитрами (по готовому тексту)'
              : 'Генерація відео на статичному фоні з автосубтитрами (за готовим текстом)',
            price: 25,
            currency: '€',
            isAi: true,
          },
          {
            id: 'smm-ai-2',
            name: lang === 'en'
              ? 'Avatar video: hook adaptation, lip-sync, dynamic subtitles, music, B-roll'
              : lang === 'nl'
              ? 'Video met avatar: hook-aanpassing, lip-sync, dynamische ondertitels, muziek, B-roll'
              : lang === 'ru'
              ? 'Видео с аватаром: адаптация хука, lip-sync, динамические субтитры, музыка, B-roll'
              : 'Відео з аватаром: адаптація хука, lip-sync, динамічні субтитри, музика, B-roll',
            price: 40,
            currency: '€',
            isAi: true,
            popular: true,
          },
          {
            id: 'smm-ai-3',
            name: lang === 'en'
              ? '10-video Pack (Starter) — ready scripts, basic subtitles'
              : lang === 'nl'
              ? 'Pakket van 10 video\'s (Starter) — kant-en-klare scripts, basisondertiteling'
              : lang === 'ru'
              ? 'Пакет 10 роликов (Starter) — готовые сценарии, базовые титры'
              : 'Пакет 10 роликів (Starter) — готові сценарії, базові титри',
            price: 220,
            currency: '€',
            isAi: true,
          },
          {
            id: 'smm-ai-4',
            name: lang === 'en'
              ? '10-video Pack (Standard) — turnkey, dynamic editing, trending music'
              : lang === 'nl'
              ? 'Pakket van 10 video\'s (Standard) — turnkey, dynamische montage, trending muziek'
              : lang === 'ru'
              ? 'Пакет 10 роликов (Standard) — под ключ, динамический монтаж, трендовая музыка'
              : 'Пакет 10 роликів (Standard) — під ключ, динамічний монтаж, трендова музика',
            price: 350,
            currency: '€',
            isAi: true,
          },
          {
            id: 'smm-ai-5',
            name: lang === 'en'
              ? '10-video Pack (Pro) — full turnkey cycle: content plan, editing, sound design'
              : lang === 'nl'
              ? 'Pakket van 10 video\'s (Pro) — volledige cyclus: contentplan, montage, sound design'
              : lang === 'ru'
              ? 'Пакет 10 роликов (Pro) — полный цикл под ключ: контент-план, монтаж, саунд-дизайн'
              : 'Пакет 10 роликів (Pro) — повний цикл під ключ: контент-план, монтаж, саунд-дизайн',
            price: 550,
            currency: '€',
            isAi: true,
          },
          {
            id: 'smm-ai-6',
            name: lang === 'en'
              ? 'Scriptwriting for avatar video (hooks, visual sequence)'
              : lang === 'nl'
              ? 'Script schrijven voor avatarvideo (hooks, visuele elementen)'
              : lang === 'ru'
              ? 'Написание сценария для ролика с аватаром (хуки, визуальный ряд)'
              : 'Написання сценарію для ролика з аватаром (хуки, візуальний ряд)',
            price: 40,
            currency: '€',
            isAi: true,
          },
          {
            id: 'smm-ai-7',
            name: lang === 'en'
              ? 'Professional sound design (SFX, transitions, accents)'
              : lang === 'nl'
              ? 'Professioneel sound design (SFX, overgangen, accenten)'
              : lang === 'ru'
              ? 'Профессиональный саунд-дизайн (SFX, переходы, акценты)'
              : 'Професійний саунд-дизайн (SFX, переходи, акценти)',
            price: 15,
            currency: '€',
            isAi: true,
          },
        ],
      },
    ],
  };
};
