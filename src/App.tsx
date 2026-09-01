import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Search,
  Zap,
} from 'lucide-react';
import { getServiceCategories } from './data/services';
import { getPopularPresets } from './data/presets';
import {
  SelectedPackage,
  SelectedItem,
  PackageOffer,
  ServiceItem,
  OrderSubmission,
  Language,
  PresetBundle,
} from './types';
import { TRANSLATIONS } from './i18n/translations';
import {
  getStoredOrders,
  saveOrderToStorage,
  getStoredSheetsConfig,
  appendOrderToGoogleSheet,
  isAdminUnlocked,
} from './services/googleSheets';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { PresetBundles } from './components/PresetBundles';
import { PackageCard } from './components/PackageCard';
import { ItemRow } from './components/ItemRow';
import { FloatingSummaryBar } from './components/FloatingSummaryBar';
import { OrderModal } from './components/OrderModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { GoogleSheetsConfigModal } from './components/GoogleSheetsConfigModal';
import { AdminOrdersDrawer } from './components/AdminOrdersDrawer';
import { AdminAuthModal } from './components/AdminAuthModal';

export default function App() {
  // Localization State (Default UA)
  const [language, setLanguage] = useState<Language>('ua');
  const t = TRANSLATIONS[language];

  // Dynamic Localized Categories (with 'complex' on the forefront)
  const categories = useMemo(() => getServiceCategories(language), [language]);
  const popularPresets = useMemo(() => getPopularPresets(language), [language]);

  // Navigation & Filter State (Default 'complex' on the forefront)
  const [activeCategoryId, setActiveCategoryId] = useState<string>('complex');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewFilter, setViewFilter] = useState<'all' | 'packages' | 'items'>('all');
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  // Cart / Calculation State
  const [selectedPackages, setSelectedPackages] = useState<SelectedPackage[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // Modals & Drawers State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState<boolean>(false);
  const [isOrdersDrawerOpen, setIsOrdersDrawerOpen] = useState<boolean>(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [adminAuthTarget, setAdminAuthTarget] = useState<'orders' | 'sheets'>('orders');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Persistence & Synced Data
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<OrderSubmission | null>(null);
  const [ordersHistory, setOrdersHistory] = useState<OrderSubmission[]>([]);
  const [isSheetsConnected, setIsSheetsConnected] = useState<boolean>(false);
  const [activeSheetUrl, setActiveSheetUrl] = useState<string>('');

  // Initial load
  useEffect(() => {
    const orders = getStoredOrders();
    setOrdersHistory(orders);
    const config = getStoredSheetsConfig();
    setIsSheetsConnected(Boolean(config.spreadsheetId || config.webhookUrl));
    setActiveSheetUrl(config.sheetUrl || '');
  }, []);

  const refreshOrders = () => {
    const orders = getStoredOrders();
    setOrdersHistory(orders);
    const config = getStoredSheetsConfig();
    setIsSheetsConnected(Boolean(config.spreadsheetId || config.webhookUrl));
    setActiveSheetUrl(config.sheetUrl || '');
  };

  // Open Handlers with Security PIN Check
  const handleOpenOrders = () => {
    if (isAdminUnlocked()) {
      setIsOrdersDrawerOpen(true);
    } else {
      setAdminAuthTarget('orders');
      setIsAdminAuthModalOpen(true);
    }
  };

  const handleOpenSheetsConfig = () => {
    if (isAdminUnlocked()) {
      setIsSheetsModalOpen(true);
    } else {
      setAdminAuthTarget('sheets');
      setIsAdminAuthModalOpen(true);
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminAuthModalOpen(false);
    if (adminAuthTarget === 'orders') {
      setIsOrdersDrawerOpen(true);
    } else {
      setIsSheetsModalOpen(true);
    }
  };

  // Total price calculation
  const totalSum = useMemo(() => {
    const packagesTotal = selectedPackages.reduce((acc, p) => acc + p.price, 0);
    const itemsTotal = selectedItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    return packagesTotal + itemsTotal;
  }, [selectedPackages, selectedItems]);

  const totalPositionsCount = selectedPackages.length + selectedItems.length;

  // Selected counts and sums by Category for badge display
  const { countsByCategory, sumsByCategory } = useMemo(() => {
    const counts: Record<string, number> = {};
    const sums: Record<string, number> = {};

    categories.forEach((cat) => {
      counts[cat.id] = 0;
      sums[cat.id] = 0;
    });

    selectedPackages.forEach((pkg) => {
      const cat = categories.find((c) =>
        c.subcategories.some((s) => s.id === pkg.subcategoryId)
      );
      if (cat) {
        counts[cat.id] = (counts[cat.id] || 0) + 1;
        sums[cat.id] = (sums[cat.id] || 0) + pkg.price;
      }
    });

    selectedItems.forEach((item) => {
      const cat = categories.find((c) =>
        c.subcategories.some((s) => s.id === item.subcategoryId)
      );
      if (cat) {
        counts[cat.id] = (counts[cat.id] || 0) + item.quantity;
        sums[cat.id] = (sums[cat.id] || 0) + item.price * item.quantity;
      }
    });

    return { countsByCategory: counts, sumsByCategory: sums };
  }, [categories, selectedPackages, selectedItems]);

  // Package Toggle Handler
  const handleTogglePackage = (
    pkg: PackageOffer,
    subcategoryId: string,
    subcategoryTitle: string,
    categoryTitle: string
  ) => {
    setActivePresetId(null);
    setSelectedPackages((prev) => {
      const isAlreadySelected = prev.some((p) => p.packageId === pkg.id);
      if (isAlreadySelected) {
        return prev.filter((p) => p.packageId !== pkg.id);
      } else {
        // If there is already a package from this same subcategory, replace it with the new tier
        const filtered = prev.filter((p) => p.subcategoryId !== subcategoryId);
        return [
          ...filtered,
          {
            subcategoryId,
            subcategoryTitle,
            categoryTitle,
            packageId: pkg.id,
            tier: pkg.tier,
            tierLabel: pkg.tierLabel,
            price: pkg.price,
            period: pkg.period,
            features: pkg.features,
          },
        ];
      }
    });
  };

  // Item Quantity Stepper Handler
  const handleUpdateItemQuantity = (
    item: ServiceItem,
    subcategoryId: string,
    subcategoryTitle: string,
    categoryTitle: string,
    quantity: number
  ) => {
    setActivePresetId(null);
    setSelectedItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((i) => i.itemId !== item.id);
      }
      const exists = prev.some((i) => i.itemId === item.id);
      if (exists) {
        return prev.map((i) => (i.itemId === item.id ? { ...i, quantity } : i));
      } else {
        return [
          ...prev,
          {
            itemId: item.id,
            subcategoryId,
            subcategoryTitle,
            categoryTitle,
            name: item.name,
            price: item.price,
            quantity,
          },
        ];
      }
    });
  };

  // Remove Handlers
  const handleRemovePackage = (packageId: string) => {
    setSelectedPackages((prev) => prev.filter((p) => p.packageId !== packageId));
  };

  const handleRemoveItem = (itemId: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.itemId !== itemId));
  };

  const handleClearAll = () => {
    setSelectedPackages([]);
    setSelectedItems([]);
    setActivePresetId(null);
  };

  // Apply Popular Preset Combo
  const handleApplyPreset = (preset: PresetBundle) => {
    if (activePresetId === preset.id) {
      handleClearAll();
      return;
    }

    handleClearAll();
    setActivePresetId(preset.id);
    setActiveCategoryId(preset.targetCategory);

    // Apply packages
    const newPackages: SelectedPackage[] = [];
    preset.packageSelections.forEach((sel) => {
      for (const cat of categories) {
        const sub = cat.subcategories.find((s) => s.id === sel.subcategoryId);
        if (sub && sub.packages) {
          const pkg = sub.packages.find((p) => p.id === sel.packageId);
          if (pkg) {
            newPackages.push({
              subcategoryId: sub.id,
              subcategoryTitle: sub.title,
              categoryTitle: cat.title,
              packageId: pkg.id,
              tier: pkg.tier,
              tierLabel: pkg.tierLabel,
              price: pkg.price,
              period: pkg.period,
              features: pkg.features,
            });
          }
        }
      }
    });

    // Apply items
    const newItems: SelectedItem[] = [];
    preset.itemSelections.forEach((sel) => {
      for (const cat of categories) {
        const sub = cat.subcategories.find((s) => s.id === sel.subcategoryId);
        if (sub) {
          const item = sub.items.find((i) => i.id === sel.itemId);
          if (item) {
            newItems.push({
              itemId: item.id,
              subcategoryId: sub.id,
              subcategoryTitle: sub.title,
              categoryTitle: cat.title,
              name: item.name,
              price: item.price,
              quantity: sel.quantity,
            });
          }
        }
      }
    });

    setSelectedPackages(newPackages);
    setSelectedItems(newItems);
  };

  // Order Submission Handler
  const handleOrderSubmit = async (orderData: Omit<OrderSubmission, 'id' | 'status'>) => {
    setIsSubmitting(true);
    const newOrder: OrderSubmission = {
      ...orderData,
      id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      status: 'new',
    };

    // Save to local storage first
    saveOrderToStorage(newOrder);
    refreshOrders();

    // Try Google Sheets append
    try {
      const sheetsRes = await appendOrderToGoogleSheet(newOrder);
      if (sheetsRes.success && sheetsRes.sheetUrl) {
        newOrder.sheetUrl = sheetsRes.sheetUrl;
        newOrder.status = 'synced_sheets';
        setActiveSheetUrl(sheetsRes.sheetUrl);
        setIsSheetsConnected(true);
        refreshOrders();
      }
    } catch (e) {
      console.warn('Google Sheets sync deferred:', e);
    }

    setLastSubmittedOrder(newOrder);
    setIsSubmitting(false);
    setIsOrderModalOpen(false);
    setIsSuccessModalOpen(true);

    // Fire celebratory confetti bubbles!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
    });
  };

  // Filtered categories and subcategories based on search and view mode
  const activeCategory = useMemo(() => {
    return categories.find((c) => c.id === activeCategoryId) || categories[0];
  }, [categories, activeCategoryId]);

  const filteredSubcategories = useMemo(() => {
    if (!activeCategory || !activeCategory.subcategories) {
      return [];
    }
    let list = activeCategory.subcategories;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list
        .map((sub) => {
          const matchedPackages = (sub.packages || []).filter(
            (p) =>
              p.tierLabel.toLowerCase().includes(q) ||
              (p.features || []).some((f) => f.toLowerCase().includes(q))
          );
          const matchedItems = (sub.items || []).filter(
            (i) =>
              i.name.toLowerCase().includes(q) ||
              (i.description && i.description.toLowerCase().includes(q))
          );
          const subTitleMatched = sub.title.toLowerCase().includes(q);

          if (subTitleMatched || matchedPackages.length > 0 || matchedItems.length > 0) {
            return {
              ...sub,
              packages: subTitleMatched ? sub.packages || [] : matchedPackages,
              items: subTitleMatched ? sub.items || [] : matchedItems,
            };
          }
          return null;
        })
        .filter(Boolean) as typeof list;
    }

    return list;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 font-sans relative overflow-x-hidden pb-32">
      {/* Decorative frosted ambient orbs */}
      <div className="fixed top-12 left-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed top-1/2 left-1/3 w-64 h-64 bg-indigo-300/30 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed top-1/4 right-1/4 w-72 h-72 bg-purple-300/25 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="relative z-10">
        {/* Top Header */}
        <Header
          language={language}
          onLanguageChange={setLanguage}
          onOpenOrders={handleOpenOrders}
          onOpenSheetsConfig={handleOpenSheetsConfig}
          onReset={handleClearAll}
          ordersCount={ordersHistory.length}
          isSheetsConnected={isSheetsConnected}
          selectedCount={totalPositionsCount}
          totalSum={totalSum}
        />

        {/* Main Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
          {/* Frosted Hero Glass Banner */}
          <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-white/50 backdrop-blur-xl border border-white/80 shadow-lg shadow-indigo-500/5 text-slate-800">
            {/* Ambient inner soft glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-pink-300/30 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/70 backdrop-blur-md mb-3 border border-white/80 shadow-xs text-indigo-900">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t.heroBadge}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {t.heroTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
                {t.heroDesc}
              </p>
            </div>
          </div>

          {/* Popular Preset Combos */}
          <PresetBundles
            presets={popularPresets}
            language={language}
            onApplyPreset={handleApplyPreset}
            activePresetId={activePresetId}
          />

          {/* Category Navigation Pills */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-widest font-bold text-slate-500">
                {t.serviceDirections}
              </h3>
              <div className="bg-white/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 text-xs font-medium text-slate-600 shadow-xs">
                {t.categoriesSummaryPill}
              </div>
            </div>

            <CategoryNav
              categories={categories}
              activeCategoryId={activeCategoryId}
              onSelectCategory={setActiveCategoryId}
              selectedCountsByCategory={countsByCategory}
              selectedSumsByCategory={sumsByCategory}
              language={language}
            />
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white/50 backdrop-blur-xl border border-white/70 shadow-xs">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder(activeCategory.title)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/60 backdrop-blur-md border border-white/70 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 outline-hidden transition-all shadow-xs"
              />
            </div>

            {/* View Filter Pills */}
            <div className="flex items-center gap-1 bg-white/40 backdrop-blur-md p-1 rounded-xl border border-white/60 self-stretch sm:self-auto shrink-0 text-xs shadow-xs">
              <button
                onClick={() => setViewFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs border border-white/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                {t.allPositions}
              </button>
              <button
                onClick={() => setViewFilter('packages')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewFilter === 'packages'
                    ? 'bg-white text-slate-900 shadow-xs border border-white/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                {t.onlyPackages}
              </button>
              <button
                onClick={() => setViewFilter('items')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewFilter === 'items'
                    ? 'bg-white text-slate-900 shadow-xs border border-white/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                {t.onlyItems}
              </button>
            </div>
          </div>

          {/* Active Category Header */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                {t.sectionLabel}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-600 font-medium">{activeCategory.shortDesc}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeCategory.title}
            </h3>
          </div>

          {/* Subcategories Container */}
          <div className="space-y-8">
            {filteredSubcategories.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-white/80 border border-white flex items-center justify-center mx-auto mb-3 shadow-xs text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">{t.noResultsTitle}</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">{t.noResultsDesc}</p>
              </div>
            ) : (
              filteredSubcategories.map((subcat) => {
                const hasPackages = subcat.packages && subcat.packages.length > 0;
                const hasItems = subcat.items && subcat.items.length > 0;

                const showPackages =
                  (viewFilter === 'all' || viewFilter === 'packages') && hasPackages;
                const showItems =
                  (viewFilter === 'all' || viewFilter === 'items') && hasItems;

                const hasPackagesToShow = showPackages && (subcat.packages || []).length > 0;
                const hasItemsToShow = showItems && (subcat.items || []).length > 0;

                if (!hasPackagesToShow && !hasItemsToShow) return null;

                return (
                  <section
                    key={subcat.id}
                    id={`subcat-${subcat.id}`}
                    className="p-5 sm:p-7 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/80 shadow-md shadow-indigo-500/5 space-y-6"
                  >
                    {/* Subcategory title */}
                    <div className="border-b border-white/60 pb-3.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                          <span>{subcat.title}</span>
                          {subcat.isMonthly && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs">
                              {t.monthlySupport}
                            </span>
                          )}
                          {subcat.isTurnkey && (
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                              {t.turnkeyOneTime}
                            </span>
                          )}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {subcat.isMonthly ? t.monthlyServiceNote : t.turnkeyServiceNote}
                        </span>
                      </div>
                    </div>

                    {/* Packages Section */}
                    {hasPackagesToShow && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                            {t.packageOffersHeading}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {subcat.isMonthly ? t.monthlyServiceDetail : t.oneTimeServiceDetail}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {(subcat.packages || []).map((pkg) => {
                            const isSelected = selectedPackages.some(
                              (p) => p.packageId === pkg.id
                            );
                            return (
                              <PackageCard
                                key={pkg.id}
                                pkg={pkg}
                                isSelected={isSelected}
                                onToggle={() =>
                                  handleTogglePackage(
                                    pkg,
                                    subcat.id,
                                    subcat.title,
                                    activeCategory.title
                                  )
                                }
                                language={language}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Individual Items Section */}
                    {hasItemsToShow && (
                      <div className="space-y-3">
                        {hasPackagesToShow && (
                          <div className="flex items-center gap-3 pt-2">
                            <div className="h-px bg-white/50 flex-1"></div>
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-white/60 backdrop-blur-md border border-white/70 px-3 py-1 rounded-full shadow-xs">
                              {t.orIndividualItems}
                            </span>
                            <div className="h-px bg-white/50 flex-1"></div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {(subcat.items || []).map((item) => {
                            const selected = selectedItems.find((i) => i.itemId === item.id);
                            const quantity = selected ? selected.quantity : 0;
                            return (
                              <ItemRow
                                key={item.id}
                                item={item}
                                subcategoryId={subcat.id}
                                subcategoryTitle={subcat.title}
                                categoryTitle={activeCategory.title}
                                quantity={quantity}
                                onUpdateQuantity={handleUpdateItemQuantity}
                                language={language}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </section>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* Floating Summary Bubble Bar */}
      <FloatingSummaryBar
        selectedPackages={selectedPackages}
        selectedItems={selectedItems}
        totalSum={totalSum}
        language={language}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onRemovePackage={handleRemovePackage}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
      />

      {/* Order Modal Form */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedPackages={selectedPackages}
        selectedItems={selectedItems}
        totalSum={totalSum}
        language={language}
        onSubmitOrder={handleOrderSubmit}
        isSubmitting={isSubmitting}
        isSheetsConnected={isSheetsConnected}
      />

      {/* Order Success Celebratory Modal */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          handleClearAll();
        }}
        order={lastSubmittedOrder}
        language={language}
        onOpenSheets={() => {
          if (activeSheetUrl) {
            window.open(activeSheetUrl, '_blank');
          } else {
            handleOpenSheetsConfig();
          }
        }}
      />

      {/* Google Sheets Config & Sync Modal */}
      <GoogleSheetsConfigModal
        isOpen={isSheetsModalOpen}
        onClose={() => {
          setIsSheetsModalOpen(false);
          refreshOrders();
        }}
        isSheetsConnected={isSheetsConnected}
        onConnectionChange={(connected, sheetUrl) => {
          setIsSheetsConnected(connected);
          if (sheetUrl) setActiveSheetUrl(sheetUrl);
          refreshOrders();
        }}
        language={language}
      />

      {/* Admin Orders History Drawer */}
      <AdminOrdersDrawer
        isOpen={isOrdersDrawerOpen}
        onClose={() => {
          setIsOrdersDrawerOpen(false);
          refreshOrders();
        }}
        orders={ordersHistory}
        onRefreshOrders={refreshOrders}
        language={language}
        sheetUrl={activeSheetUrl}
      />

      {/* Admin Security PIN Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={handleAdminAuthSuccess}
        language={language}
      />
    </div>
  );
}
