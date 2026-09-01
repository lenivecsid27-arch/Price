import { Language } from '../types';

export interface Translations {
  appName: string;
  appSubheader: string;
  appBadge: string;
  heroBadge: string;
  heroTag: string;
  heroTitle: string;
  heroDesc: string;
  presetSectionTitle: string;
  presetSectionSubtitle: string;
  serviceDirections: string;
  categoriesHeader: string;
  categoriesSummaryPill: string;
  categoriesBadge: string;
  searchPlaceholder: (categoryTitle: string) => string;
  searchPlaceholderPrefix: string;
  allPositions: string;
  onlyPackages: string;
  onlyItems: string;
  filterAll: string;
  filterPackages: string;
  filterItems: string;
  sectionLabel: string;
  nothingFound: string;
  tryChangingFilter: string;
  noResultsTitle: string;
  noResultsDesc: string;
  packageOffers: string;
  packageOffersHeading: string;
  monthlySupport: string;
  turnkeyOneTime: string;
  monthlyServiceNote: string;
  turnkeyServiceNote: string;
  orIndividualItems: string;
  orIndividualSelection: string;
  optimalChoiceBadge: string;
  inOrderBadge: string;
  monthlyServiceDetail: string;
  oneTimeServiceDetail: string;
  whatIsIncluded: string;
  removeFromCalc: string;
  addPackageToCalc: string;
  addItemToCalc: string;
  aiBadge: string;
  topBadge: string;
  unitPriceCalc: string;
  floatingPositions: string;
  floatingPositionSingular: string;
  floatingPositionPlural: string;
  floatingTotal: string;
  floatingExpand: string;
  floatingCollapse: string;
  floatingOrderBtn: string;
  clearAll: string;
  orderComposition: string;
  serviceBlocks: string;
  orderModalTitle: string;
  orderModalSubtitle: string;
  clientNameLabel: string;
  clientNamePlaceholder: string;
  clientPhoneLabel: string;
  clientPhoneHint: string;
  quickCode: string;
  quickCodeLabel: string;
  phoneLabel: string;
  phoneHint: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  clientEmailLabel: string;
  clientEmailPlaceholder: string;
  projectNotesLabel: string;
  projectNotesPlaceholder: string;
  sheetsAutoSyncActive: string;
  sheetsAutoSyncLocal: string;
  googleSheetsConnectedMsg: string;
  googleSheetsNotConnectedMsg: string;
  cancelBtn: string;
  cancelButton: string;
  submitOrderBtn: string;
  submitOrderButton: string;
  submittingText: string;
  submittingOrder: string;
  errorRequiredFields: string;
  errorInvalidPhone: string;
  validationNameRequired: string;
  validationPhoneRequired: string;
  validationEmailRequired: string;
  successTitle: string;
  successDesc: string;
  successModalTitle: string;
  successModalSubtitle: string;
  orderNumber: string;
  orderNumberLabel: string;
  orderTotalLabel: string;
  orderSheetsStatusLabel: string;
  orderSheetsSynced: string;
  googleSheetsStatusTitle: string;
  googleSheetsSyncSuccess: string;
  viewInGoogleSheets: string;
  viewInGoogleSheetsBtn: string;
  copyReportBtn: string;
  copyReportSummary: string;
  copiedReportBtn: string;
  copiedToClipboard: string;
  newCalculationBtn: string;
  createNewCalc: string;
  sheetsConfigTitle: string;
  sheetsConfigSubtitle: string;
  activeSheetLabel: string;
  activeGoogleSheet: string;
  openBtn: string;
  openSheet: string;
  columnsRequirementsLabel: string;
  tableColumnsRequired: string;
  copyColumnsBtn: string;
  copyHeaders: string;
  copiedColumnsBtn: string;
  googleSheetsUrlLabel: string;
  googleSheetsUrlOrId: string;
  googleSheetsUrlHint: string;
  googleSheetsInputHint: string;
  webhookUrlLabel: string;
  webhookUrlOptional: string;
  syncOrders: string;
  syncOrdersBtn: string;
  downloadCsv: string;
  downloadCsvBtn: string;
  saveSettings: string;
  saveSettingsBtn: string;
  googleSheetsSettingsSaved: string;
  noOrdersFound: string;
  ordersHistoryTitle: string;
  ordersHistoryCount: string;
  ordersCountLabel: string;
  ordersHistoryEmptyTitle: string;
  ordersHistoryEmptyDesc: string;
  selectServicesHint: string;
  searchOrdersPlaceholder: string;
  searchInOrders: string;
  clearHistory: string;
  clearHistoryBtn: string;
  copyOrderSummaryBtn: string;
  copiedShort: string;
  languageSelectLabel: string;
  selectedLabel: string;
  applyCombo: string;
  googleSheetsStatusConnected: string;
  googleSheetsStatusConfigure: string;
  ordersHistoryBtn: string;
  clearSelectionBtn: string;
  selectedItemsSummary: string;
  selectedServicesCount: string;
  collapseDetails: string;
  viewDetails: string;
  totalSum: string;
  checkoutButton: string;
  packageLabel: string;
  dateLabel: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ua: {
    appName: 'Калькулятор Послуг',
    appSubheader: 'Комплексні пакети, курси, автоматизація, комікси, SMM, маркетинг, веб та відео',
    appBadge: 'Пакетні та поштучні послуги',
    heroBadge: 'Гнучкий калькулятор вартості послуг',
    heroTag: 'Гнучкий калькулятор вартості послуг',
    heroTitle: 'Обирайте готові пакети або комбінуйте поштучні послуги',
    heroDesc: 'Обирайте готові комплексні пакети під ключ, практичні курси, автоматизацію бізнес-процесів, комерційні комікси, SMM або веб-розробку. Калькулятор миттєво порахує кошторис та збереже заявку у Google Таблицю «Заявки».',
    presetSectionTitle: 'Популярні комбо-пропозиції в 1 клік',
    presetSectionSubtitle: "Швидкий вибір готових зв'язок",
    serviceDirections: 'Напрямки послуг',
    categoriesHeader: 'Напрямки послуг',
    categoriesSummaryPill: '8 напрямків • Комплекс • Курси • Автоматизація • Комікси • SMM • Маркетинг • Веб • Відео',
    categoriesBadge: '8 напрямків • Комплекс • Курси • Автоматизація • Комікси • SMM • Маркетинг • Веб • Відео',
    searchPlaceholder: (cat: string) => `Пошук у розділі «${cat}»...`,
    searchPlaceholderPrefix: 'Пошук у розділі',
    allPositions: 'Усі позиції',
    onlyPackages: '📦 Тільки пакети',
    onlyItems: 'Поштучно',
    filterAll: 'Усі позиції',
    filterPackages: '📦 Тільки пакети',
    filterItems: 'Поштучно',
    sectionLabel: 'Розділ',
    nothingFound: 'Нічого не знайдено за запитом',
    tryChangingFilter: 'Спробуйте змінити пошуковий запит або скинути фільтри',
    noResultsTitle: 'Нічого не знайдено за запитом',
    noResultsDesc: 'Спробуйте змінити пошуковий запит або скинути фільтри',
    packageOffers: 'Пакетні пропозиції',
    packageOffersHeading: 'Пакетні пропозиції',
    monthlySupport: 'Щомісячний супровід',
    turnkeyOneTime: 'Повний комплекс під ключ',
    monthlyServiceNote: 'Щомісячний супровід',
    turnkeyServiceNote: 'Повний комплекс під ключ',
    orIndividualItems: 'Або поштучний вибір окремих елементів',
    orIndividualSelection: 'Або поштучний вибір окремих елементів',
    optimalChoiceBadge: 'Оптимальний вибір',
    inOrderBadge: 'У заявці',
    monthlyServiceDetail: 'Щомісячне комплексне обслуговування',
    oneTimeServiceDetail: 'Фіксована разова вартість',
    whatIsIncluded: 'Що входить у пакет:',
    removeFromCalc: 'Прибрати з розрахунку',
    addPackageToCalc: 'Додати пакет у розрахунок',
    addItemToCalc: 'Додати',
    aiBadge: 'AI',
    topBadge: 'Топ',
    unitPriceCalc: 'поз.',
    floatingPositions: 'послуг',
    floatingPositionSingular: 'послуга',
    floatingPositionPlural: 'послуги',
    floatingTotal: 'Разом:',
    floatingExpand: 'Деталі',
    floatingCollapse: 'Згорнути',
    floatingOrderBtn: 'Оформити заявку',
    clearAll: 'Очистити все',
    orderComposition: 'Склад заявки',
    serviceBlocks: 'Блоки послуг:',
    orderModalTitle: 'Оформлення заявки',
    orderModalSubtitle: 'Перевірте позиції та вкажіть контактні дані для зв’язку',
    clientNameLabel: "Ім'я або назва компанії",
    clientNamePlaceholder: "Ваше ім'я або назва компанії",
    clientPhoneLabel: 'Контактний телефон у міжнародному форматі',
    clientPhoneHint: 'з кодом країни',
    quickCode: 'Швидкий код:',
    quickCodeLabel: 'Швидкий код:',
    phoneLabel: 'Контактний телефон',
    phoneHint: 'у міжнародному форматі',
    phonePlaceholder: '+380 97 123 45 67',
    emailLabel: 'Email для зв’язку та комерційної пропозиції',
    emailPlaceholder: 'your.email@example.com',
    notesLabel: 'Коментар або побажання до замовлення',
    notesPlaceholder: 'Опишіть ваші цілі, нішу або прикріпіть посилання...',
    clientEmailLabel: 'Email (для надсилання комерційної пропозиції / рахунку)',
    clientEmailPlaceholder: 'your.email@example.com',
    projectNotesLabel: 'Коментар або побажання до замовлення (необов’язково)',
    projectNotesPlaceholder: 'Опишіть ваші цілі, нішу або прикріпіть посилання...',
    sheetsAutoSyncActive: 'Дані автоматично будуть внесені в підключену Google Таблицю «Заявки»',
    sheetsAutoSyncLocal: 'Заявка збережеться локально та додасться у таблицю при налаштуванні',
    googleSheetsConnectedMsg: 'Дані автоматично будуть внесені в підключену Google Таблицю «Заявки»',
    googleSheetsNotConnectedMsg: 'Заявка збережеться локально та додасться у таблицю при налаштуванні',
    cancelBtn: 'Скасувати',
    cancelButton: 'Скасувати',
    submitOrderBtn: 'Надіслати заявку',
    submitOrderButton: 'Надіслати заявку',
    submittingText: 'Запис у Google Таблицю...',
    submittingOrder: 'Запис у Google Таблицю...',
    errorRequiredFields: "Будь ласка, заповніть ім'я, телефон та email",
    errorInvalidPhone: 'Будь ласка, введіть коректний номер телефону (наприклад: +380971234567)',
    validationNameRequired: "Будь ласка, вкажіть ваше ім'я або назву компанії",
    validationPhoneRequired: 'Введіть коректний телефон у міжнародному форматі (наприклад +380971234567)',
    validationEmailRequired: 'Введіть коректну електронну пошту (email)',
    successTitle: 'Заявку успішно оформлено!',
    successDesc: 'Дякуємо! Наш менеджер зв’яжеться з вами протягом робочого дня для обговорення деталей.',
    successModalTitle: 'Заявку успішно оформлено!',
    successModalSubtitle: 'Дякуємо! Наш менеджер зв’яжеться з вами найближчим часом.',
    orderNumber: 'Номер заявки:',
    orderNumberLabel: 'Номер заявки:',
    orderTotalLabel: 'Сума замовлення:',
    orderSheetsStatusLabel: 'Статус таблиці:',
    orderSheetsSynced: 'Записано у Google Таблицю',
    googleSheetsStatusTitle: 'Статус Google Таблиці:',
    googleSheetsSyncSuccess: 'Записано у Google Таблицю «Заявки»',
    viewInGoogleSheets: 'Переглянути в Google Таблиці',
    viewInGoogleSheetsBtn: 'Переглянути в Google Таблиці «Заявки»',
    copyReportBtn: 'Скопіювати короткий звіт для Telegram/Email',
    copyReportSummary: 'Скопіювати звіт',
    copiedReportBtn: 'Скопійовано в буфер!',
    copiedToClipboard: 'Скопійовано в буфер!',
    newCalculationBtn: 'Створити новий розрахунок',
    createNewCalc: 'Створити новий розрахунок',
    sheetsConfigTitle: 'Підключення Google Таблиці «Заявки»',
    sheetsConfigSubtitle: 'Автоматична синхронізація замовлень із вашою Google Таблицею',
    activeSheetLabel: 'Активна Google Таблиця',
    activeGoogleSheet: 'Активна Google Таблиця',
    openBtn: 'Відкрити',
    openSheet: 'Відкрити таблицю',
    columnsRequirementsLabel: 'Колонки таблиці «Заявки» (відповідають вашим вимогам):',
    tableColumnsRequired: 'Колонки таблиці «Заявки»',
    copyColumnsBtn: 'Скопіювати заголовки',
    copyHeaders: 'Копіювати заголовки',
    copiedColumnsBtn: 'Заголовки скопійовано!',
    googleSheetsUrlLabel: 'Посилання на Google Таблицю (або ID таблиці):',
    googleSheetsUrlOrId: 'Посилання або ID вашої Google Таблиці',
    googleSheetsUrlHint: 'Вставте посилання на таблицю. Нові заявки будуть додаватись у кінець аркуша «Заявки».',
    googleSheetsInputHint: 'Вставте посилання на таблицю. Нові заявки будуть додаватись у кінець аркуша «Заявки».',
    webhookUrlLabel: 'URL вебхука Google Apps Script (опціонально для прямого запису):',
    webhookUrlOptional: 'Або Webhook / Google Apps Script URL (опціонально)',
    syncOrders: 'Синхронізувати заявки',
    syncOrdersBtn: 'Синхронізувати заявки',
    downloadCsv: 'Завантажити CSV',
    downloadCsvBtn: 'Завантажити CSV',
    saveSettings: 'Зберегти налаштування',
    saveSettingsBtn: 'Зберегти налаштування',
    googleSheetsSettingsSaved: 'Налаштування Google Таблиці успішно збережено!',
    noOrdersFound: 'Немає збережених заявок',
    ordersHistoryTitle: 'Історія та реєстр заявок',
    ordersHistoryCount: 'заявок у системі',
    ordersCountLabel: 'заявок у системі',
    ordersHistoryEmptyTitle: 'Заявок ще немає',
    ordersHistoryEmptyDesc: 'Оберіть послуги в калькуляторі та натисніть «Оформити заявку».',
    selectServicesHint: 'Оберіть послуги в калькуляторі та натисніть «Оформити заявку».',
    searchOrdersPlaceholder: "Пошук за ім'ям, телефоном або послугою...",
    searchInOrders: "Пошук за ім'ям, телефоном або послугою...",
    clearHistory: 'Очистити історію',
    clearHistoryBtn: 'Очистити історію',
    copyOrderSummaryBtn: 'Скопіювати звіт',
    copiedShort: 'Скопійовано',
    languageSelectLabel: 'Мова',
    selectedLabel: 'Обрано',
    applyCombo: 'Застосувати комбо',
    googleSheetsStatusConnected: 'Підключено',
    googleSheetsStatusConfigure: 'Налаштувати',
    ordersHistoryBtn: 'Історія заявок',
    clearSelectionBtn: 'Очистити',
    selectedItemsSummary: 'Обрані позиції',
    selectedServicesCount: 'послуг обрано',
    collapseDetails: 'Згорнути',
    viewDetails: 'Деталі',
    totalSum: 'Разом',
    checkoutButton: 'Оформити заявку',
    packageLabel: 'ПАКЕТ',
    dateLabel: 'Дата',
  },
  en: {
    appName: 'Service Price Calculator',
    appSubheader: 'All-in-One Packages, Courses, Automation, Comics, SMM, Marketing, Web & Video',
    appBadge: 'Packages & Modular Services',
    heroBadge: 'Flexible Agency Service Calculator',
    heroTag: 'Flexible Agency Service Calculator',
    heroTitle: 'Select turnkey packages or customize modular individual services',
    heroDesc: 'Choose comprehensive turnkey packages, masterclasses & courses, business automation pipelines, commercial comics, SMM, or web development. Instant calculation with auto-sync to your Google Sheets "Orders" tab.',
    presetSectionTitle: 'Popular 1-Click Preset Combos',
    presetSectionSubtitle: 'Quick bundles tailored for business growth',
    serviceDirections: 'Service Categories',
    categoriesHeader: 'Service Categories',
    categoriesSummaryPill: '8 Categories • Turnkey • Courses • Automation • Comics • SMM • Marketing • Web • Video',
    categoriesBadge: '8 Categories • Turnkey • Courses • Automation • Comics • SMM • Marketing • Web • Video',
    searchPlaceholder: (cat: string) => `Search in "${cat}"...`,
    searchPlaceholderPrefix: 'Search in section',
    allPositions: 'All Positions',
    onlyPackages: '📦 Packages Only',
    onlyItems: 'Modular Items',
    filterAll: 'All Positions',
    filterPackages: '📦 Packages Only',
    filterItems: 'Modular Items',
    sectionLabel: 'Category',
    nothingFound: 'No results found for your query',
    tryChangingFilter: 'Try adjusting your search query or reset active filters',
    noResultsTitle: 'No results found for your query',
    noResultsDesc: 'Try adjusting your search query or reset active filters',
    packageOffers: 'Package Offers',
    packageOffersHeading: 'Package Offers',
    monthlySupport: 'Monthly Retainer',
    turnkeyOneTime: 'Full Turnkey Package',
    monthlyServiceNote: 'Monthly Retainer',
    turnkeyServiceNote: 'Full Turnkey Package',
    orIndividualItems: 'Or pick individual modular services',
    orIndividualSelection: 'Or pick individual modular services',
    optimalChoiceBadge: 'Recommended',
    inOrderBadge: 'In Order',
    monthlyServiceDetail: 'Monthly comprehensive retainer',
    oneTimeServiceDetail: 'Fixed one-time price',
    whatIsIncluded: 'Package includes:',
    removeFromCalc: 'Remove from estimate',
    addPackageToCalc: 'Add package to estimate',
    addItemToCalc: 'Add',
    aiBadge: 'AI',
    topBadge: 'Top',
    unitPriceCalc: 'pos.',
    floatingPositions: 'services',
    floatingPositionSingular: 'service',
    floatingPositionPlural: 'services',
    floatingTotal: 'Total:',
    floatingExpand: 'Details',
    floatingCollapse: 'Collapse',
    floatingOrderBtn: 'Place Order',
    clearAll: 'Clear all',
    orderComposition: 'Order Breakdown',
    serviceBlocks: 'Service Blocks:',
    orderModalTitle: 'Complete Order Submission',
    orderModalSubtitle: 'Review your chosen positions and enter your contact details',
    clientNameLabel: 'Full Name or Company Name',
    clientNamePlaceholder: 'Your name or organization',
    clientPhoneLabel: 'Contact Phone Number (International format)',
    clientPhoneHint: 'with country code',
    quickCode: 'Quick prefix:',
    quickCodeLabel: 'Quick prefix:',
    phoneLabel: 'Contact Phone Number',
    phoneHint: 'international format with country code',
    phonePlaceholder: '+1 555 123 4567',
    emailLabel: 'Email Address (for official quote & invoice)',
    emailPlaceholder: 'your.email@example.com',
    notesLabel: 'Project Notes or Special Requirements',
    notesPlaceholder: 'Describe your goals, business niche, or attach reference links...',
    clientEmailLabel: 'Email Address (for official quote & invoice)',
    clientEmailPlaceholder: 'your.email@example.com',
    projectNotesLabel: 'Project Notes or Special Requirements (optional)',
    projectNotesPlaceholder: 'Describe your goals, business niche, or attach reference links...',
    sheetsAutoSyncActive: 'Data will be automatically synced to connected Google Sheet "Orders"',
    sheetsAutoSyncLocal: 'Order will be stored locally and synced when Google Sheets is configured',
    googleSheetsConnectedMsg: 'Data will be automatically synced to connected Google Sheet "Orders"',
    googleSheetsNotConnectedMsg: 'Order will be stored locally and synced when Google Sheets is configured',
    cancelBtn: 'Cancel',
    cancelButton: 'Cancel',
    submitOrderBtn: 'Submit Order Request',
    submitOrderButton: 'Submit Order Request',
    submittingText: 'Syncing to Google Sheets...',
    submittingOrder: 'Syncing to Google Sheets...',
    errorRequiredFields: 'Please fill in name, phone number, and email address',
    errorInvalidPhone: 'Please enter a valid international phone number (e.g. +31612345678 or +380971234567)',
    validationNameRequired: 'Please enter your full name or company name',
    validationPhoneRequired: 'Please enter a valid phone number in international format (+...)',
    validationEmailRequired: 'Please enter a valid email address',
    successTitle: 'Order Successfully Submitted!',
    successDesc: 'Thank you! Our manager will contact you within 1 business day to confirm details.',
    successModalTitle: 'Order Successfully Submitted!',
    successModalSubtitle: 'Thank you! Our manager will contact you shortly.',
    orderNumber: 'Order ID:',
    orderNumberLabel: 'Order ID:',
    orderTotalLabel: 'Total Amount:',
    orderSheetsStatusLabel: 'Sheet Status:',
    orderSheetsSynced: 'Saved to Google Sheets',
    googleSheetsStatusTitle: 'Google Sheets Status:',
    googleSheetsSyncSuccess: 'Synced to Google Sheet "Orders"',
    viewInGoogleSheets: 'View in Google Sheets',
    viewInGoogleSheetsBtn: 'View in Google Sheets "Orders"',
    copyReportBtn: 'Copy short summary for Telegram/Email',
    copyReportSummary: 'Copy summary',
    copiedReportBtn: 'Copied to clipboard!',
    copiedToClipboard: 'Copied to clipboard!',
    newCalculationBtn: 'Create new calculation',
    createNewCalc: 'Create new calculation',
    sheetsConfigTitle: 'Connect Google Sheets "Orders"',
    sheetsConfigSubtitle: 'Automatic background synchronization of all client inquiries',
    activeSheetLabel: 'Active Google Sheet',
    activeGoogleSheet: 'Active Google Sheet',
    openBtn: 'Open',
    openSheet: 'Open Spreadsheet',
    columnsRequirementsLabel: 'Google Sheet "Orders" Columns Structure:',
    tableColumnsRequired: 'Google Sheet "Orders" Columns Structure',
    copyColumnsBtn: 'Copy Column Headers',
    copyHeaders: 'Copy Headers',
    copiedColumnsBtn: 'Headers copied!',
    googleSheetsUrlLabel: 'Google Spreadsheet URL (or Sheet ID):',
    googleSheetsUrlOrId: 'Google Spreadsheet URL or ID',
    googleSheetsUrlHint: 'Paste your spreadsheet URL. New orders will automatically append to "Orders" worksheet.',
    googleSheetsInputHint: 'Paste your spreadsheet URL. New orders will automatically append to "Orders" worksheet.',
    webhookUrlLabel: 'Google Apps Script Webhook URL (optional for direct POST):',
    webhookUrlOptional: 'Or Webhook / Google Apps Script URL (optional)',
    syncOrders: 'Sync Orders',
    syncOrdersBtn: 'Sync Orders',
    downloadCsv: 'Download CSV',
    downloadCsvBtn: 'Download CSV',
    saveSettings: 'Save Settings',
    saveSettingsBtn: 'Save Settings',
    googleSheetsSettingsSaved: 'Google Sheets settings saved successfully!',
    noOrdersFound: 'No saved orders found',
    ordersHistoryTitle: 'Orders Registry & History',
    ordersHistoryCount: 'orders in database',
    ordersCountLabel: 'orders in system',
    ordersHistoryEmptyTitle: 'No orders submitted yet',
    ordersHistoryEmptyDesc: 'Select services in calculator and click "Place Order".',
    selectServicesHint: 'Select services in calculator and click "Place Order".',
    searchOrdersPlaceholder: 'Search by client name, phone, or service...',
    searchInOrders: 'Search by client name, phone, or service...',
    clearHistory: 'Clear History',
    clearHistoryBtn: 'Clear History',
    copyOrderSummaryBtn: 'Copy summary',
    copiedShort: 'Copied',
    languageSelectLabel: 'Language',
    selectedLabel: 'Selected',
    applyCombo: 'Apply Combo',
    googleSheetsStatusConnected: 'Connected',
    googleSheetsStatusConfigure: 'Configure',
    ordersHistoryBtn: 'Orders History',
    clearSelectionBtn: 'Clear',
    selectedItemsSummary: 'Selected positions',
    selectedServicesCount: 'services selected',
    collapseDetails: 'Collapse',
    viewDetails: 'Details',
    totalSum: 'Total',
    checkoutButton: 'Place Order',
    packageLabel: 'PACKAGE',
    dateLabel: 'Date',
  },
  nl: {
    appName: 'Diensten Prijscalculator',
    appSubheader: 'All-in-One Pakketten, Cursussen, Automatisering, Strips, SMM, Marketing, Web & Video',
    appBadge: 'Pakketten & Modulaire Diensten',
    heroBadge: 'Flexibele Bureau Prijscalculator',
    heroTag: 'Flexibele Bureau Prijscalculator',
    heroTitle: 'Kies complete turnkey pakketten of combineer losse diensten',
    heroDesc: 'Kies complete all-in-one pakketten, cursussen en trainingen, slimme bedrijfsprocesautomatisering, commerciële strips, SMM of webontwikkeling. Directe berekening met automatische export naar Google Spreadsheets "Bestellingen".',
    presetSectionTitle: 'Populaire 1-Klik Bundels',
    presetSectionSubtitle: 'Snelle kant-en-klare combinaties voor groei',
    serviceDirections: 'Dienstcategorieën',
    categoriesHeader: 'Dienstcategorieën',
    categoriesSummaryPill: '8 Categorieën • Totaalpakketten • Cursussen • Automatisering • Strips • SMM • Marketing • Web • Video',
    categoriesBadge: '8 Categorieën • Totaalpakketten • Cursussen • Automatisering • Strips • SMM • Marketing • Web • Video',
    searchPlaceholder: (cat: string) => `Zoeken in «${cat}»...`,
    searchPlaceholderPrefix: 'Zoeken in categorie',
    allPositions: 'Alle posities',
    onlyPackages: '📦 Alleen pakketten',
    onlyItems: 'Modulaire diensten',
    filterAll: 'Alle posities',
    filterPackages: '📦 Alleen pakketten',
    filterItems: 'Modulaire diensten',
    sectionLabel: 'Categorie',
    nothingFound: 'Geen resultaten gevonden',
    tryChangingFilter: 'Probeer een andere zoekopdracht of wis de actieve filters',
    noResultsTitle: 'Geen resultaten gevonden',
    noResultsDesc: 'Probeer een andere zoekopdracht of wis de actieve filters',
    packageOffers: 'Pakketaanbiedingen',
    packageOffersHeading: 'Pakketaanbiedingen',
    monthlySupport: 'Maandelijks beheer',
    turnkeyOneTime: 'Compleet turnkey project',
    monthlyServiceNote: 'Maandelijks beheer',
    turnkeyServiceNote: 'Compleet turnkey project',
    orIndividualItems: 'Of kies individuele modulaire diensten',
    orIndividualSelection: 'Of kies individuele modulaire diensten',
    optimalChoiceBadge: 'Aanbevolen',
    inOrderBadge: 'In aanvraag',
    monthlyServiceDetail: 'Maandelijks doorlopend beheer',
    oneTimeServiceDetail: 'Vaste eenmalige projectprijs',
    whatIsIncluded: 'Inbegrepen in pakket:',
    removeFromCalc: 'Verwijder uit berekening',
    addPackageToCalc: 'Pakket toevoegen',
    addItemToCalc: 'Toevoegen',
    aiBadge: 'AI',
    topBadge: 'Top',
    unitPriceCalc: 'pos.',
    floatingPositions: 'diensten',
    floatingPositionSingular: 'dienst',
    floatingPositionPlural: 'diensten',
    floatingTotal: 'Totaal:',
    floatingExpand: 'Details',
    floatingCollapse: 'Inklappen',
    floatingOrderBtn: 'Aanvraag afronden',
    clearAll: 'Alles wissen',
    orderComposition: 'Overzicht aanvraag',
    serviceBlocks: 'Dienstblokken:',
    orderModalTitle: 'Aanvraag afronden',
    orderModalSubtitle: 'Controleer uw geselecteerde diensten en vul uw contactgegevens in',
    clientNameLabel: 'Naam of Bedrijfsnaam',
    clientNamePlaceholder: 'Uw naam of bedrijfsnaam',
    clientPhoneLabel: 'Telefoonnummer (internationaal formaat)',
    clientPhoneHint: 'met landcode',
    quickCode: 'Snelle landcode:',
    quickCodeLabel: 'Snelle landcode:',
    phoneLabel: 'Telefoonnummer',
    phoneHint: 'in internationaal formaat (+...)',
    phonePlaceholder: '+31 6 12345678',
    emailLabel: 'E-mailadres (voor offerte en facturatie)',
    emailPlaceholder: 'uw.email@voorbeeld.nl',
    notesLabel: 'Opmerkingen of specifieke wensen (optioneel)',
    notesPlaceholder: 'Beschrijf uw doelen, branche of voeg links toe...',
    clientEmailLabel: 'E-mailadres (voor offerte en facturatie)',
    clientEmailPlaceholder: 'uw.email@voorbeeld.nl',
    projectNotesLabel: 'Opmerkingen of specifieke wensen (optioneel)',
    projectNotesPlaceholder: 'Beschrijf uw doelen, branche of voeg links toe...',
    sheetsAutoSyncActive: 'Gegevens worden automatisch opgeslagen in Google Spreadsheet "Bestellingen"',
    sheetsAutoSyncLocal: 'Aanvraag wordt lokaal bewaard en gesynchroniseerd zodra Google Sheets is gekoppeld',
    googleSheetsConnectedMsg: 'Gegevens worden automatisch opgeslagen in Google Spreadsheet "Bestellingen"',
    googleSheetsNotConnectedMsg: 'Aanvraag wordt lokaal bewaard en gesynchroniseerd zodra Google Sheets is gekoppeld',
    cancelBtn: 'Annuleren',
    cancelButton: 'Annuleren',
    submitOrderBtn: 'Aanvraag verzenden',
    submitOrderButton: 'Aanvraag verzenden',
    submittingText: 'Opslaan in Google Spreadsheets...',
    submittingOrder: 'Opslaan in Google Spreadsheets...',
    errorRequiredFields: 'Vul alstublieft naam, telefoonnummer en e-mailadres in',
    errorInvalidPhone: 'Voer een geldig internationaal telefoonnummer in (bijv. +31612345678)',
    validationNameRequired: 'Vul alstublieft uw naam of bedrijfsnaam in',
    validationPhoneRequired: 'Voer een geldig internationaal telefoonnummer in (+...)',
    validationEmailRequired: 'Voer een geldig e-mailadres in',
    successTitle: 'Aanvraag succesvol verzonden!',
    successDesc: 'Bedankt! Onze adviseur neemt binnen 1 werkdag contact met u op om de details te bespreken.',
    successModalTitle: 'Aanvraag succesvol verzonden!',
    successModalSubtitle: 'Bedankt! Onze adviseur neemt zo snel mogelijk contact met u op.',
    orderNumber: 'Bestelnummer:',
    orderNumberLabel: 'Bestelnummer:',
    orderTotalLabel: 'Totaalbedrag:',
    orderSheetsStatusLabel: 'Spreadsheet status:',
    orderSheetsSynced: 'Opgeslagen in Google Spreadsheets',
    googleSheetsStatusTitle: 'Google Spreadsheets status:',
    googleSheetsSyncSuccess: 'Opgeslagen in Google Spreadsheet "Bestellingen"',
    viewInGoogleSheets: 'Bekijk in Google Spreadsheet',
    viewInGoogleSheetsBtn: 'Bekijk in Google Spreadsheet "Bestellingen"',
    copyReportBtn: 'Kopieer overzicht voor Telegram/E-mail',
    copyReportSummary: 'Kopieer overzicht',
    copiedReportBtn: 'Gekopieerd naar klembord!',
    copiedToClipboard: 'Gekopieerd naar klembord!',
    newCalculationBtn: 'Nieuwe berekening maken',
    createNewCalc: 'Nieuwe berekening maken',
    sheetsConfigTitle: 'Koppeling Google Spreadsheets "Bestellingen"',
    sheetsConfigSubtitle: 'Automatische synchronisatie van aanvragen naar uw Google Spreadsheet',
    activeSheetLabel: 'Actieve Google Spreadsheet',
    activeGoogleSheet: 'Actieve Google Spreadsheet',
    openBtn: 'Openen',
    openSheet: 'Spreadsheet openen',
    columnsRequirementsLabel: 'Kolommenstructuur Google Spreadsheet "Bestellingen":',
    tableColumnsRequired: 'Kolommenstructuur Google Spreadsheet',
    copyColumnsBtn: 'Kopieer kolomtitels',
    copyHeaders: 'Kopieer kolomtitels',
    copiedColumnsBtn: 'Kolomtitels gekopieerd!',
    googleSheetsUrlLabel: 'Google Spreadsheet URL (of Sheet ID):',
    googleSheetsUrlOrId: 'Google Spreadsheet URL of ID',
    googleSheetsUrlHint: 'Plak de URL van uw spreadsheet. Nieuwe aanvragen worden onderaan toegevoegd.',
    googleSheetsInputHint: 'Plak de URL van uw spreadsheet. Nieuwe aanvragen worden onderaan toegevoegd.',
    webhookUrlLabel: 'Google Apps Script Webhook URL (optioneel voor directe POST):',
    webhookUrlOptional: 'Of Webhook / Google Apps Script URL (optioneel)',
    syncOrders: 'Bestellingen synchroniseren',
    syncOrdersBtn: 'Bestellingen synchroniseren',
    downloadCsv: 'CSV downloaden',
    downloadCsvBtn: 'CSV downloaden',
    saveSettings: 'Instellingen opslaan',
    saveSettingsBtn: 'Instellingen opslaan',
    googleSheetsSettingsSaved: 'Instellingen succesvol opgeslagen!',
    noOrdersFound: 'Geen opgeslagen aanvragen gevonden',
    ordersHistoryTitle: 'Overzicht & Historie Aanvragen',
    ordersHistoryCount: 'aanvragen in database',
    ordersCountLabel: 'aanvragen in systeem',
    ordersHistoryEmptyTitle: 'Nog geen aanvragen aanwezig',
    ordersHistoryEmptyDesc: 'Selecteer diensten in de calculator en klik op "Aanvraag afronden".',
    selectServicesHint: 'Selecteer diensten in de calculator en klik op "Aanvraag afronden".',
    searchOrdersPlaceholder: 'Zoek op naam, telefoon of dienst...',
    searchInOrders: 'Zoek op naam, telefoon of dienst...',
    clearHistory: 'Historie wissen',
    clearHistoryBtn: 'Historie wissen',
    copyOrderSummaryBtn: 'Kopieer overzicht',
    copiedShort: 'Gekopieerd',
    languageSelectLabel: 'Taal',
    selectedLabel: 'Gekozen',
    applyCombo: 'Bundel toepassen',
    googleSheetsStatusConnected: 'Verbonden',
    googleSheetsStatusConfigure: 'Instellen',
    ordersHistoryBtn: 'Aanvragenhistorie',
    clearSelectionBtn: 'Wissen',
    selectedItemsSummary: 'Geselecteerde posities',
    selectedServicesCount: 'diensten gekozen',
    collapseDetails: 'Inklappen',
    viewDetails: 'Details',
    totalSum: 'Totaal',
    checkoutButton: 'Aanvraag afronden',
    packageLabel: 'PAKKET',
    dateLabel: 'Datum',
  },
  ru: {
    appName: 'Калькулятор Услуг',
    appSubheader: 'Комплексные пакеты, курсы, автоматизация, комиксы, SMM, маркетинг, веб и видео',
    appBadge: 'Пакетные и поштучные услуги',
    heroBadge: 'Гибкий калькулятор стоимости услуг',
    heroTag: 'Гибкий калькулятор стоимости услуг',
    heroTitle: 'Выбирайте готовые пакеты или комбинируйте поштучные услуги',
    heroDesc: 'Выбирайте комплексные пакеты под ключ, курсы и тренинги, автоматизацию бизнес-процессов, коммерческие комиксы, SMM или веб-разработку. Мгновенный расчет с автоматической выгрузкой в Google Таблицу «Заявки».',
    presetSectionTitle: 'Популярные комбо-предложения в 1 клик',
    presetSectionSubtitle: 'Быстрый выбор готовых связок',
    serviceDirections: 'Направления услуг',
    categoriesHeader: 'Направления услуг',
    categoriesSummaryPill: '8 направлений • Комплекс • Курсы • Автоматизация • Комиксы • SMM • Маркетинг • Веб • Видео',
    categoriesBadge: '8 направлений • Комплекс • Курсы • Автоматизация • Комиксы • SMM • Маркетинг • Веб • Видео',
    searchPlaceholder: (cat: string) => `Поиск в разделе «${cat}»...`,
    searchPlaceholderPrefix: 'Поиск в разделе',
    allPositions: 'Все позиции',
    onlyPackages: '📦 Только пакеты',
    onlyItems: 'Поштучно',
    filterAll: 'Все позиции',
    filterPackages: '📦 Только пакеты',
    filterItems: 'Поштучно',
    sectionLabel: 'Раздел',
    nothingFound: 'Ничего не найдено по запросу',
    tryChangingFilter: 'Попробуйте изменить поисковый запрос или сбросить фильтры',
    noResultsTitle: 'Ничего не найдено по запросу',
    noResultsDesc: 'Попробуйте изменить поисковый запрос или сбросить фильтры',
    packageOffers: 'Пакетные предложения',
    packageOffersHeading: 'Пакетные предложения',
    monthlySupport: 'Ежемесячное сопровождение',
    turnkeyOneTime: 'Полный комплекс под ключ',
    monthlyServiceNote: 'Ежемесячное сопровождение',
    turnkeyServiceNote: 'Полный комплекс под ключ',
    orIndividualItems: 'Или поштучный выбор отдельных элементов',
    orIndividualSelection: 'Или поштучный выбор отдельных элементов',
    optimalChoiceBadge: 'Оптимальный выбор',
    inOrderBadge: 'В заявке',
    monthlyServiceDetail: 'Ежемесячное комплексное обслуживание',
    oneTimeServiceDetail: 'Фиксированная разовая стоимость',
    whatIsIncluded: 'Что входит в пакет:',
    removeFromCalc: 'Убрать из расчета',
    addPackageToCalc: 'Добавить пакет в расчет',
    addItemToCalc: 'Добавить',
    aiBadge: 'AI',
    topBadge: 'Топ',
    unitPriceCalc: 'поз.',
    floatingPositions: 'услуг',
    floatingPositionSingular: 'услуга',
    floatingPositionPlural: 'услуги',
    floatingTotal: 'Итого:',
    floatingExpand: 'Детали',
    floatingCollapse: 'Свернуть',
    floatingOrderBtn: 'Оформить заявку',
    clearAll: 'Очистить все',
    orderComposition: 'Состав заявки',
    serviceBlocks: 'Блоки услуг:',
    orderModalTitle: 'Оформление заявки',
    orderModalSubtitle: 'Проверьте позиции и укажите контактные данные для связи',
    clientNameLabel: 'Имя или название компании',
    clientNamePlaceholder: 'Ваше имя или название компании',
    clientPhoneLabel: 'Контактный телефон в международном формате',
    clientPhoneHint: 'с кодом страны',
    quickCode: 'Быстрый код:',
    quickCodeLabel: 'Быстрый код:',
    phoneLabel: 'Контактный телефон',
    phoneHint: 'в международном формате',
    phonePlaceholder: '+380 97 123 45 67',
    emailLabel: 'Email для связи и коммерческого предложения',
    emailPlaceholder: 'your.email@example.com',
    notesLabel: 'Комментарий или пожелания к заказу',
    notesPlaceholder: 'Опишите ваши цели, нишу или прикрепите ссылки...',
    clientEmailLabel: 'Email (для отправки коммерческого предложения / счета)',
    clientEmailPlaceholder: 'your.email@example.com',
    projectNotesLabel: 'Комментарий или пожелания к заказу (необязательно)',
    projectNotesPlaceholder: 'Опишите ваши цели, нишу или прикрепите ссылки...',
    sheetsAutoSyncActive: 'Данные автоматически будут внесены в подключенную Google Таблицу «Заявки»',
    sheetsAutoSyncLocal: 'Заявка сохранится локально и добавится в таблицу при настройке',
    googleSheetsConnectedMsg: 'Данные автоматически будут внесены в подключенную Google Таблицу «Заявки»',
    googleSheetsNotConnectedMsg: 'Заявка сохранится локально и добавится в таблицу при настройке',
    cancelBtn: 'Отмена',
    cancelButton: 'Отмена',
    submitOrderBtn: 'Отправить заявку',
    submitOrderButton: 'Отправить заявку',
    submittingText: 'Запись в Google Таблицу...',
    submittingOrder: 'Запись в Google Таблицу...',
    errorRequiredFields: 'Пожалуйста, заполните имя, телефон и email',
    errorInvalidPhone: 'Пожалуйста, введите корректный номер телефона (например: +380971234567)',
    validationNameRequired: 'Пожалуйста, укажите ваше имя или название компании',
    validationPhoneRequired: 'Введите корректный номер телефона в международном формате (+...)',
    validationEmailRequired: 'Введите корректный адрес электронной почты (email)',
    successTitle: 'Заявка успешно оформлена!',
    successDesc: 'Спасибо! Наш менеджер свяжется с вами в течение рабочего дня для обсуждения деталей.',
    successModalTitle: 'Заявка успешно оформлена!',
    successModalSubtitle: 'Спасибо! Наш менеджер свяжется с вами в ближайшее время.',
    orderNumber: 'Номер заявки:',
    orderNumberLabel: 'Номер заявки:',
    orderTotalLabel: 'Сумма заказа:',
    orderSheetsStatusLabel: 'Статус таблицы:',
    orderSheetsSynced: 'Записано в Google Таблицу',
    googleSheetsStatusTitle: 'Статус Google Таблицы:',
    googleSheetsSyncSuccess: 'Записано в Google Таблицу «Заявки»',
    viewInGoogleSheets: 'Посмотреть в Google Таблице',
    viewInGoogleSheetsBtn: 'Посмотреть в Google Таблице «Заявки»',
    copyReportBtn: 'Скопировать короткий отчет для Telegram/Email',
    copyReportSummary: 'Скопировать отчет',
    copiedReportBtn: 'Скопировано в буфер!',
    copiedToClipboard: 'Скопировано в буфер!',
    newCalculationBtn: 'Создать новый расчет',
    createNewCalc: 'Создать новый расчет',
    sheetsConfigTitle: 'Подключение Google Таблицы «Заявки»',
    sheetsConfigSubtitle: 'Автоматическая синхронизация заказов с вашей Google Таблицей',
    activeSheetLabel: 'Активная Google Таблица',
    activeGoogleSheet: 'Активная Google Таблица',
    openBtn: 'Открыть',
    openSheet: 'Открыть таблицу',
    columnsRequirementsLabel: 'Колонки таблицы «Заявки» (соответствуют вашим требованиям):',
    tableColumnsRequired: 'Колонки таблицы «Заявки»',
    copyColumnsBtn: 'Скопировать заголовки',
    copyHeaders: 'Копировать заголовки',
    copiedColumnsBtn: 'Заголовки скопированы!',
    googleSheetsUrlLabel: 'Ссылка на Google Таблицу (или ID таблицы):',
    googleSheetsUrlOrId: 'Ссылка или ID вашей Google Таблицы',
    googleSheetsUrlHint: 'Вставьте ссылку на таблицу. Новые заявки будут добавляться в конец листа «Заявки».',
    googleSheetsInputHint: 'Вставьте ссылку на таблицу. Новые заявки будут добавляться в конец листа «Заявки».',
    webhookUrlLabel: 'URL вебхука Google Apps Script (опционально для прямой записи):',
    webhookUrlOptional: 'Или Webhook / Google Apps Script URL (опционально)',
    syncOrders: 'Синхронизировать заявки',
    syncOrdersBtn: 'Синхронизировать заявки',
    downloadCsv: 'Скачать CSV',
    downloadCsvBtn: 'Скачать CSV',
    saveSettings: 'Сохранить настройки',
    saveSettingsBtn: 'Сохранить настройки',
    googleSheetsSettingsSaved: 'Настройки Google Таблицы успешно сохранены!',
    noOrdersFound: 'Нет сохраненных заявок',
    ordersHistoryTitle: 'История и реестр заявок',
    ordersHistoryCount: 'заявок в системе',
    ordersCountLabel: 'заявок в системе',
    ordersHistoryEmptyTitle: 'Заявок еще нет',
    ordersHistoryEmptyDesc: 'Выберите услуги в калькуляторе и нажмите «Оформить заявку».',
    selectServicesHint: 'Выберите услуги в калькуляторе и нажмите «Оформить заявку».',
    searchOrdersPlaceholder: 'Поиск по имени, телефону или услуге...',
    searchInOrders: 'Поиск по имени, телефону или услуге...',
    clearHistory: 'Очистить историю',
    clearHistoryBtn: 'Очистить историю',
    copyOrderSummaryBtn: 'Скопировать отчет',
    copiedShort: 'Скопировано',
    languageSelectLabel: 'Язык',
    selectedLabel: 'Выбрано',
    applyCombo: 'Применить комбо',
    googleSheetsStatusConnected: 'Подключено',
    googleSheetsStatusConfigure: 'Настроить',
    ordersHistoryBtn: 'История заявок',
    clearSelectionBtn: 'Очистить',
    selectedItemsSummary: 'Выбранные позиции',
    selectedServicesCount: 'услуг выбрано',
    collapseDetails: 'Свернуть',
    viewDetails: 'Детали',
    totalSum: 'Итого',
    checkoutButton: 'Оформить заявку',
    packageLabel: 'ПАКЕТ',
    dateLabel: 'Дата',
  },
};
