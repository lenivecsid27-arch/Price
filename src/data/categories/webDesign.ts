import { ServiceCategory, Language } from '../../types';

export const getWebDesignCategory = (lang: Language): ServiceCategory => {
  const content = {
    ua: {
      title: 'Веб-дизайн та розробка',
      shortDesc: 'Лендинги під ключ, дизайн у Figma, сайти на Framer/Webflow/Tilda, UI/UX',
      sub1Title: 'Розробка конверсійних лендингів та сайтів під ключ',
      sub1Desc: 'Адаптивний дизайн, висока швидкість завантаження, SEO-структура та форми',
      tierStarter: 'Нижня (Сквіз / Одноекранник)',
      tierStandard: 'Середня (Лендинг 4–6 блоків)',
      tierPro: 'Верхня (Pro Лендинг 8–10 блоків)',
      sub2Title: 'Дизайн у Figma (UI/UX без верстки)',
      sub2Desc: 'Прототипування, дизайн-система, адаптивні сітки для десктопу та мобільних',
    },
    en: {
      title: 'Web Design & Development',
      shortDesc: 'Turnkey landing pages, Figma UI/UX, Framer/Webflow sites, speed & SEO optimization',
      sub1Title: 'Turnkey High-Converting Landing Pages & Websites',
      sub1Desc: 'Responsive layout, lightning-fast load speed, SEO structure & integrated forms',
      tierStarter: 'Starter (1-Screen Squeeze Page)',
      tierStandard: 'Standard (4–6 Section Landing Page)',
      tierPro: 'Pro (8–10 Section Full Landing Page)',
      sub2Title: 'Figma UI/UX Design (Design Only)',
      sub2Desc: 'Wireframing, design systems, mobile & desktop adaptive visual layouts',
    },
    nl: {
      title: 'Webdesign & Ontwikkeling',
      shortDesc: 'Conversiegerichte landingspagina’s, Figma UI/UX, Framer/Webflow websites',
      sub1Title: 'Turnkey Landingspagina’s & Websites',
      sub1Desc: 'Responsief ontwerp, hoge laadsnelheid, SEO-structuur en formulieren',
      tierStarter: 'Starter (1-Scherm Squeeze Page)',
      tierStandard: 'Standard (4–6 Secties Landingspagina)',
      tierPro: 'Pro (8–10 Secties Volledige Pagina)',
      sub2Title: 'Figma UI/UX Design (Alleen Ontwerp)',
      sub2Desc: 'Wireframing, designsysteem, mobiel en desktop responsief ontwerp',
    },
    ru: {
      title: 'Веб-дизайн и разработка',
      shortDesc: 'Лендинги под ключ, дизайн в Figma, сайты на Framer/Webflow, UI/UX',
      sub1Title: 'Разработка конверсионных лендингов и сайтов под ключ',
      sub1Desc: 'Адаптивный дизайн, быстрая загрузка, SEO-структура и интеграции',
      tierStarter: 'Нижняя (Сквиз / Одноэкранник)',
      tierStandard: 'Средняя (Лендинг 4–6 блоков)',
      tierPro: 'Верхняя (Pro Лендинг 8–10 блоков)',
      sub2Title: 'Дизайн в Figma (UI/UX без верстки)',
      sub2Desc: 'Прототипирование, дизайн-система, адаптивные сетки для desktop и mobile',
    },
  }[lang];

  return {
    id: 'web-design',
    title: content.title,
    iconName: 'Layout',
    shortDesc: content.shortDesc,
    bubbleColor: {
      bg: 'bg-blue-500',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200',
      glow: 'shadow-blue-500/20',
      lightBg: 'bg-blue-50/80',
      gradient: 'from-blue-500/10 via-indigo-500/5 to-cyan-500/10',
    },
    subcategories: [
      {
        id: 'web-landing',
        code: '6.1',
        title: content.sub1Title,
        description: content.sub1Desc,
        hasPackages: true,
        packageType: 'one-time',
        packages: [
          {
            id: 'web-3.1-starter',
            tier: 'starter',
            tierLabel: content.tierStarter,
            price: 150,
            currency: '€',
            features: lang === 'en' ? [
              '1-screen lead capture squeeze page or Taplink PRO',
              'Strong headline + CTA button + form',
              'Direct connection to Telegram & Google Sheets',
            ] : lang === 'nl' ? [
              '1-scherm lead capture squeeze page of Taplink PRO',
              'Sterke headline + CTA knop + formulier',
              'Directe koppeling naar Telegram & Google Sheets',
            ] : lang === 'ru' ? [
              '1-экранный лендинг захвата контактов или Taplink PRO',
              'Сильный заголовок + кнопка CTA + форма',
              'Прямое подключение к Telegram и Google Таблицам',
            ] : [
              '1-екранний лендинг захоплення контактів або Taplink PRO',
              'Сильний заголовок + кнопка CTA + форма',
              'Пряме підключення до Telegram та Google Таблиць',
            ],
          },
          {
            id: 'web-3.1-standard',
            tier: 'standard',
            tierLabel: content.tierStandard,
            price: 350,
            currency: '€',
            recommended: true,
            features: lang === 'en' ? [
              '4–6 block landing page (Hero, Services, Pricing, Reviews, FAQ, Form)',
              'Responsive mobile, tablet & desktop versions',
              'Copywriting assistance with high-converting triggers',
              'Analytics setup (Google Analytics 4 & Meta Pixel)',
            ] : lang === 'nl' ? [
              '4–6 blokken landingspagina (Hero, Diensten, Prijzen, Reviews, FAQ, Formulier)',
              'Volledig responsief voor mobiel, tablet & desktop',
              'Conversiegerichte tekstondersteuning',
              'Google Analytics 4 & Meta Pixel installatie',
            ] : lang === 'ru' ? [
              'Лендинг на 4–6 блоков (Главный, Услуги, Цены, Отзывы, FAQ, Форма)',
              'Полная адаптивность под смартфоны и планшеты',
              'Копирайтинг и продающие смыслы',
              'Подключение Google Analytics 4 и Meta Pixel',
            ] : [
              'Лендинг на 4–6 блоків (Головний, Послуги, Ціни, Відгуки, FAQ, Форма)',
              'Повна адаптивність під смартфони та планшети',
              'Копірайтинг та продаючі сенси',
              'Підключення Google Analytics 4 та Meta Pixel',
            ],
          },
          {
            id: 'web-3.1-pro',
            tier: 'pro',
            tierLabel: content.tierPro,
            price: 650,
            currency: '€',
            features: lang === 'en' ? [
              'Full 8–10 block landing with custom interactive animations',
              'Online payments setup (Stripe/PayPal/Apple Pay)',
              'CRM automatic lead synchronization & auto-replies',
              'Basic SEO on-page optimization (speed, tags, schema)',
            ] : lang === 'nl' ? [
              '8–10 blokken landingspagina met interactieve animaties',
              'Online betalingen koppeling (Stripe/PayPal/iDeal/Apple Pay)',
              'CRM automatische leadkoppeling & auto-replies',
              'Basis SEO on-page optimalisatie (snelheid, tags)',
            ] : lang === 'ru' ? [
              'Лендинг 8–10 блоков с интерактивными анимациями',
              'Подключение онлайн-оплат (Stripe/PayPal/Apple Pay)',
              'Интеграция с CRM и автоматические уведомления',
              'Базовая SEO-оптимизация и ускорение загрузки',
            ] : [
              'Лендинг 8–10 блоків з інтерактивними анімаціями',
              'Підключення онлайн-оплат (Stripe/PayPal/Apple Pay)',
              'Інтеграція з CRM та автоматичні сповіщення',
              'Базова SEO-оптимізація та прискорення завантаження',
            ],
          },
        ],
        items: [
          { id: 'web-it-1', name: lang === 'en' ? 'Domain connection, SSL certificate & DNS setup' : lang === 'nl' ? 'Domeinkoppeling, SSL & DNS setup' : lang === 'ru' ? 'Подключение домена, SSL-сертификата и DNS' : 'Підключення домену, SSL-сертифіката та налаштування DNS', price: 30, currency: '€' },
          { id: 'web-it-2', name: lang === 'en' ? 'Payment system integration (Stripe / Apple Pay)' : lang === 'nl' ? 'Betaalsysteem integratie (Stripe / iDeal / Apple Pay)' : lang === 'ru' ? 'Интеграция платежной системы (Stripe / Apple Pay)' : 'Інтеграція платіжної системи (Stripe / Apple Pay)', price: 80, currency: '€', popular: true },
          { id: 'web-it-3', name: lang === 'en' ? 'Custom lead form with CRM & Google Sheets webhook' : lang === 'nl' ? 'Aangepast formulier met CRM & Sheets koppeling' : lang === 'ru' ? 'Кастомная форма захвата с передачей в CRM и Sheets' : 'Кастомна форма захоплення з передачею даних у CRM та Sheets', price: 50, currency: '€' },
        ],
      },
      {
        id: 'web-figma',
        code: '6.2',
        title: content.sub2Title,
        description: content.sub2Desc,
        hasPackages: false,
        items: [
          { id: 'web-figma-1', name: lang === 'en' ? 'UI/UX Wireframing & interactive prototype' : lang === 'nl' ? 'UI/UX Wireframing & interactief prototype' : lang === 'ru' ? 'Прототипирование и интерактивный прототип' : 'Прототипування та інтерактивний клікабельний прототип', price: 100, currency: '€' },
          { id: 'web-figma-2', name: lang === 'en' ? 'Complete Figma UI/UX Design of Landing Page (Desktop + Mobile)' : lang === 'nl' ? 'Volledig Figma UI/UX Design (Desktop + Mobiel)' : lang === 'ru' ? 'Полный UI/UX дизайн лендинга в Figma (Desktop + Mobile)' : 'Повний UI/UX дизайн лендингу у Figma (Desktop + Mobile)', price: 200, currency: '€', popular: true },
          { id: 'web-figma-3', name: lang === 'en' ? 'Creation of UI Kit / Design System (typography, buttons, cards)' : lang === 'nl' ? 'UI Kit / Design Systeem creatie' : lang === 'ru' ? 'Создание UI Kit / дизайн-системы элементов' : 'Створення UI Kit / дизайн-системи компонентів', price: 80, currency: '€' },
        ],
      },
    ],
  };
};
