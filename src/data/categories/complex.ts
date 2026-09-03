import { ServiceCategory, Language } from '../../types';

export const getComplexCategory = (lang: Language): ServiceCategory => {
  const content = {
    ua: {
      title: 'Комплексні пакети під ключ',
      shortDesc: 'Готові рішення для швидкого запуску, масштабування та упакування бізнесу під ключ',
      sub1Title: 'Готові комплекси «Під ключ» для бізнесу та експертів',
      sub1Desc: 'Збалансовані пакети, які поєднують стратегію, упаковку, трафік та продажі',
      tierStarter: 'Швидкий старт для експерта / бізнесу',
      tierStandard: 'Щомісячний ріст (SMM + Відеопродакшн)',
      tierPro: 'Запуск воронки під ключ',
    },
    en: {
      title: 'All-in-One Turnkey Packages',
      shortDesc: 'Turnkey ready-made solutions for rapid launch, scaling, and business packaging',
      sub1Title: 'Turnkey Packages for Businesses & Experts',
      sub1Desc: 'Balanced packages combining strategy, packaging, traffic, and sales',
      tierStarter: 'Quick Start for Expert / Business',
      tierStandard: 'Monthly Growth (SMM + Video Production)',
      tierPro: 'Turnkey Funnel Launch',
    },
    nl: {
      title: 'All-in-One Totaalpakketten',
      shortDesc: 'Kant-en-klare turnkey oplossingen voor snelle lancering, schaalvergroting en groei',
      sub1Title: 'Turnkey Pakketten voor Bedrijven & Experts',
      sub1Desc: 'Gebalanceerde pakketten van strategie, branding, traffic en verkoop',
      tierStarter: 'Snelle Start voor Expert / Bedrijf',
      tierStandard: 'Maandelijkse Groei (SMM + Videoproductie)',
      tierPro: 'Turnkey Funnel Lancering',
    },
    ru: {
      title: 'Комплексные пакеты «Под ключ»',
      shortDesc: 'Готовые решения для быстрого запуска, масштабирования и упаковки бизнеса под ключ',
      sub1Title: 'Готовые комплексы «Под ключ» для бизнеса и экспертов',
      sub1Desc: 'Сбалансированные пакеты, объединяющие стратегию, упаковку, трафик и продажи',
      tierStarter: 'Быстрый старт для эксперта / бизнеса',
      tierStandard: 'Ежемесячный рост (SMM + Видеопродакшн)',
      tierPro: 'Запуск воронки под ключ',
    },
  }[lang];

  return {
    id: 'complex',
    title: content.title,
    iconName: 'Boxes',
    shortDesc: content.shortDesc,
    bubbleColor: {
      bg: 'bg-indigo-500',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-200',
      glow: 'shadow-indigo-500/20',
      lightBg: 'bg-indigo-50/80',
      gradient: 'from-indigo-500/10 via-purple-500/5 to-pink-500/10',
    },
    subcategories: [
      {
        id: 'complex-turnkey',
        code: '0.1',
        title: content.sub1Title,
        description: content.sub1Desc,
        hasPackages: true,
        packageType: 'one-time',
        isTurnkey: true,
        isMonthly: false,
        packages: [
          {
            id: 'cpx-0.1-starter',
            tier: 'starter',
            tierLabel: content.tierStarter,
            price: 590,
            currency: '€',
            features: lang === 'en' ? [
              'Targeted ads setup (Meta Ads Manager)',
              'Profile visual revamp & Bio conversion optimization',
              '5 detailed video scripts with strong hooks',
            ] : lang === 'nl' ? [
              'Basisconfiguratie gerichte Meta advertenties',
              'Profieloptimalisatie & conversie bio',
              '5 gedetailleerde videoscripts met sterke hooks',
            ] : lang === 'ru' ? [
              'Базовая настройка таргетированной рекламы Meta',
              'Упаковка профиля и конверсионное Bio',
              '5 детальных сценариев для Reels с хуками',
            ] : [
              'Базове налаштування таргетованої реклами Meta Ads',
              'Упаковка профілю та конверсійна шапка Bio',
              '5 детальних сценаріїв для Reels із сильними хуками',
            ],
          },
          {
            id: 'cpx-0.1-standard',
            tier: 'standard',
            tierLabel: content.tierStandard,
            price: 850,
            currency: '€',
            period: lang === 'en' ? '/ mo' : lang === 'nl' ? '/ mnd' : '/ міс',
            recommended: true,
            features: lang === 'en' ? [
              'Full management of 1 social network (content plan, 12 posts/carousels, daily Stories).',
              'Turnkey editing of 10 Reels/Shorts with sound design and scripts.',
              'Community management and monthly analytical report.',
            ] : lang === 'nl' ? [
              'Volledig beheer van 1 sociaal netwerk (contentplan, 12 posts/carrousels, dagelijkse Stories).',
              'Turnkey montage van 10 Reels/Shorts inclusief sound design en scripts.',
              'Community management en maandelijks analyserapport.',
            ] : lang === 'ru' ? [
              'Полное ведение 1 соцсети (контент-план, 12 постов/каруселей, ежедневные Stories).',
              'Монтаж 10 Reels/Shorts под ключ с саунд-дизайном и сценариями.',
              'Комьюнити-менеджмент и ежемесячный аналитический отчет.',
            ] : [
              'Повне ведення 1 соцмережі (контент-план, 12 постів/каруселей, щоденні Stories).',
              'Монтаж 10 Reels/Shorts під ключ із саунд-дизайном та сценаріями.',
              'Ком\'юніті-менеджмент та щомісячний аналітичний звіт.',
            ],
          },
          {
            id: 'cpx-0.1-pro',
            tier: 'pro',
            tierLabel: content.tierPro,
            price: 1400,
            currency: '€',
            features: lang === 'en' ? [
              'Multi-section landing page (6–8 blocks) with Stripe/PayPal payments and CRM integration.',
              '5-email automated email sequence (copywriting + responsive layout + automation).',
              'Advertising material pack: 10 banners + 3 video creatives.',
              'Analytics setup (Meta Pixel, GA4, GTM) and full system testing.',
            ] : lang === 'nl' ? [
              'Landingspagina met meerdere secties (6–8 blokken) inclusief Stripe/PayPal en CRM.',
              'Geautomatiseerde e-mailreeks van 5 e-mails (copywriting + responsive design + automatisering).',
              'Advertentiepakket: 10 banners + 3 videocreatives.',
              'Analytics configuratie (Meta Pixel, GA4, GTM) en volledige systeemtest.',
            ] : lang === 'ru' ? [
              'Многосекционный лендинг (6–8 блоков) с интеграцией оплат Stripe/PayPal и CRM.',
              'Email-цепочка из 5 писем (написание + адаптивная верстка + автоматизация).',
              'Комплект рекламных материалов: 10 баннеров + 3 видеокреатива.',
              'Настройка аналитики (Meta Pixel, GA4, GTM) и полное тестирование системы.',
            ] : [
              'Багатосекційний лендинг (6–8 блоків) з інтеграцією оплат Stripe/PayPal та CRM.',
              'Email-ланцюжок із 5 листів (написання + адаптивна верстка + автоматизація).',
              'Комплект рекламних матеріалів: 10 банерів + 3 відеокреативи.',
              'Налаштування аналітики (Meta Pixel, GA4, GTM) та повне тестування системи.',
            ],
          },
        ],
        items: [],
      },
    ],
  };
};
