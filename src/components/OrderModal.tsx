import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { SelectedPackage, SelectedItem, OrderSubmission, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackages: SelectedPackage[];
  selectedItems: SelectedItem[];
  totalSum: number;
  language: Language;
  onSubmitOrder: (orderData: Omit<OrderSubmission, 'id' | 'status'>) => Promise<void>;
  isSubmitting: boolean;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedPackages,
  selectedItems,
  totalSum,
  language,
  onSubmitOrder,
  isSubmitting,
}) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('+380');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  // Build unique blocks (categories)
  const uniqueBlocks = Array.from(
    new Set([
      ...selectedPackages.map((p) => p.categoryTitle),
      ...selectedItems.map((i) => i.categoryTitle),
    ])
  ).join(', ');

  // Build items text (list of package titles and service items)
  const itemsList: string[] = [
    ...selectedPackages.map(
      (p) => `[${t.packageLabel}] ${p.subcategoryTitle} (${p.tierLabel})`
    ),
    ...selectedItems.map(
      (i) => (i.quantity > 1 ? `${i.name} (x${i.quantity})` : i.name)
    ),
  ];
  const itemsText = itemsList.join('; ');

  // Build price breakdown text
  const pricesList: string[] = [
    ...selectedPackages.map(
      (p) => `${p.subcategoryTitle} (${p.tierLabel}): €${p.price}${p.period || ''}`
    ),
    ...selectedItems.map((i) =>
      i.quantity > 1
        ? `${i.name}: ${i.quantity} × €${i.price} = €${i.price * i.quantity}`
        : `${i.name}: €${i.price}`
    ),
  ];
  const priceBreakdown = pricesList.join(' | ');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!clientName.trim()) {
      setErrorMessage(t.validationNameRequired);
      return;
    }

    // Validate international phone format
    const phoneTrimmed = phone.trim();
    if (!phoneTrimmed || !/^\+[\d\s\-()]{9,18}$/.test(phoneTrimmed)) {
      setErrorMessage(t.validationPhoneRequired);
      return;
    }

    // Validate email
    const emailTrimmed = email.trim();
    if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setErrorMessage(t.validationEmailRequired);
      return;
    }

    // Format local date
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    try {
      await onSubmitOrder({
        date: formattedDate,
        clientName: clientName.trim(),
        phone: phoneTrimmed,
        email: emailTrimmed,
        blocks: uniqueBlocks,
        itemsText,
        priceBreakdown,
        totalAmount: totalSum,
        currency: '€',
        notes: notes.trim(),
      });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error submitting order');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-indigo-950/20 border border-white/80 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-violet-600/90 via-indigo-600/90 to-pink-600/90 backdrop-blur-xl text-white flex items-center justify-between shrink-0 border-b border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs border border-white/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight">{t.orderModalTitle}</h3>
              <p className="text-xs text-indigo-100">{t.orderModalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Order Items Preview Card */}
          <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 p-4 shadow-xs">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/60 mb-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                {t.orderComposition} ({selectedPackages.length + selectedItems.length} {t.selectedServicesCount})
              </span>
              <span className="text-base font-extrabold text-indigo-700 font-mono">
                {t.totalSum}: €{totalSum}
              </span>
            </div>

            {/* List of items summary */}
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {selectedPackages.map((pkg) => (
                <div key={pkg.packageId} className="flex justify-between items-start gap-2 py-0.5">
                  <span className="font-semibold text-slate-800">
                    📦 {pkg.subcategoryTitle} ({pkg.tierLabel})
                  </span>
                  <span className="font-bold text-violet-800 font-mono shrink-0">
                    €{pkg.price} {pkg.period || ''}
                  </span>
                </div>
              ))}
              {selectedItems.map((item) => (
                <div key={item.itemId} className="flex justify-between items-start gap-2 py-0.5">
                  <span className="text-slate-700">
                    • {item.name} {item.quantity > 1 ? `(×${item.quantity})` : ''}
                  </span>
                  <span className="font-semibold text-slate-800 font-mono shrink-0">
                    €{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Blocks category summary */}
            <div className="mt-3 pt-2.5 border-t border-white/60 text-[11px] text-slate-600">
              <span className="font-semibold text-slate-800">{t.serviceBlocks}:</span> {uniqueBlocks}
            </div>
          </div>

          {/* Form */}
          <form id="order-submit-form" onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 backdrop-blur-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Client Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.clientNameLabel} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder={t.clientNamePlaceholder}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 transition-all outline-hidden shadow-xs"
                />
              </div>
            </div>

            {/* Phone in International Format */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {t.phoneLabel} <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500 font-medium">{t.phoneHint}</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 font-mono transition-all outline-hidden shadow-xs"
                />
              </div>
              {/* Quick international code helpers */}
              <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto text-[10px]">
                <span className="text-slate-500 font-medium">{t.quickCode}:</span>
                {[
                  { label: '🇺🇦 UA (+380)', prefix: '+380' },
                  { label: '🇳🇱 NL (+31)', prefix: '+31' },
                  { label: '🇵🇱 PL (+48)', prefix: '+48' },
                  { label: '🇩🇪 DE (+49)', prefix: '+49' },
                  { label: '🇬🇧 UK (+44)', prefix: '+44' },
                  { label: '🇺🇸 US (+1)', prefix: '+1' },
                ].map((country) => (
                  <button
                    key={country.prefix}
                    type="button"
                    onClick={() => setPhone(country.prefix)}
                    className="px-2 py-0.5 rounded-lg bg-white/60 hover:bg-white border border-white/70 text-slate-700 transition-colors shadow-xs cursor-pointer"
                  >
                    {country.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.emailLabel} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 transition-all outline-hidden shadow-xs"
                />
              </div>
            </div>

            {/* Project Notes & Links */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.notesLabel}
              </label>
              <textarea
                rows={2}
                placeholder={t.notesPlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900 transition-all outline-hidden resize-none shadow-xs"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/60">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-2xl border border-white/80 bg-white/40 hover:bg-white/80 text-xs sm:text-sm font-semibold text-slate-700 transition-all shadow-xs cursor-pointer"
              >
                {t.cancelButton}
              </button>
              <button
                id="modal-submit-order-btn"
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer border border-white/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.submittingOrder}</span>
                  </>
                ) : (
                  <>
                    <span>{t.submitOrderButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
