import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  LogOut,
  Search,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Layers,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Copy,
  Check,
  Download,
  Filter,
  RefreshCw,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Inbox,
  User,
  Sparkles,
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {
  subscribeToFirestoreOrders,
  updateOrderStatusInFirestore,
  deleteOrderFromFirestore,
  saveOrderToFirestore,
} from '../services/firestoreServices';
import { OrderSubmission, Language } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

type OrderStatusFilter = 'all' | 'new' | 'in_progress' | 'completed' | 'canceled';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const [orders, setOrders] = useState<OrderSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Subscribe to real-time orders in Firestore
  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    const unsubscribe = subscribeToFirestoreOrders(
      (data) => {
        setOrders(data);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching orders:', err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen]);

  // Statistics Calculations
  const stats = useMemo(() => {
    const total = orders.length;
    const newCount = orders.filter((o) => (o.status as string) === 'new' || !o.status).length;
    const inProgressCount = orders.filter((o) => o.status === 'in_progress').length;
    const completedCount = orders.filter((o) => o.status === 'completed').length;
    const totalSum = orders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
    const avgCheck = total > 0 ? Math.round(totalSum / total) : 0;

    return { total, newCount, inProgressCount, completedCount, totalSum, avgCheck };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Filter by status
      if (statusFilter === 'new' && order.status !== 'new' && order.status) return false;
      if (statusFilter === 'in_progress' && order.status !== 'in_progress') return false;
      if (statusFilter === 'completed' && order.status !== 'completed') return false;
      if (statusFilter === 'canceled' && order.status !== 'canceled') return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesClient = (order.clientName || '').toLowerCase().includes(q);
        const matchesPhone = (order.phone || '').toLowerCase().includes(q);
        const matchesEmail = (order.email || '').toLowerCase().includes(q);
        const matchesItems = (order.itemsText || '').toLowerCase().includes(q);
        const matchesNotes = (order.notes || '').toLowerCase().includes(q);
        const matchesId = (order.id || '').toLowerCase().includes(q);
        return matchesClient || matchesPhone || matchesEmail || matchesItems || matchesNotes || matchesId;
      }

      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const res = await updateOrderStatusInFirestore(orderId, newStatus);
    if (res.success) {
      setStatusMessage({ type: 'success', text: 'Статус заявки оновлено!' });
      setTimeout(() => setStatusMessage(null), 2500);
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Помилка оновлення статусу' });
    }
  };

  const handleDelete = async (orderId: string, clientName: string) => {
    if (!window.confirm(`Ви дійсно хочете видалити заявку від "${clientName}"?`)) {
      return;
    }
    const res = await deleteOrderFromFirestore(orderId);
    if (res.success) {
      setStatusMessage({ type: 'success', text: 'Заявку видалено.' });
      setTimeout(() => setStatusMessage(null), 2500);
    } else {
      setStatusMessage({ type: 'error', text: res.error || 'Помилка видалення' });
    }
  };

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(identifier);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyFullOrderSummary = (order: OrderSubmission) => {
    const summary = `📋 ЗАЯВКА #${order.id}
👤 Клієнт: ${order.clientName}
📞 Телефон: ${order.phone}
✉️ Email: ${order.email}
📅 Дата: ${order.date}
💰 Сума: €${order.totalAmount}
📦 Послуги:
${order.itemsText.split('; ').map((item) => `  • ${item}`).join('\n')}
${order.notes ? `\n📝 Коментар клієнта: ${order.notes}` : ''}`;

    navigator.clipboard.writeText(summary);
    setCopiedOrderId(order.id);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = ['ID', 'Дата', 'Клієнт', 'Телефон', 'Email', 'Сума (€)', 'Статус', 'Категорії', 'Послуги', 'Коментар'];
    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${o.date}"`,
      `"${(o.clientName || '').replace(/"/g, '""')}"`,
      `"${(o.phone || '').replace(/"/g, '""')}"`,
      `"${(o.email || '').replace(/"/g, '""')}"`,
      `"${o.totalAmount}"`,
      `"${o.status}"`,
      `"${(o.blocks || '').replace(/"/g, '""')}"`,
      `"${(o.itemsText || '').replace(/"/g, '""')}"`,
      `"${(o.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateTestOrder = async () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const testOrder: OrderSubmission = {
      id: `ord_${Date.now()}_test`,
      date: formattedDate,
      clientName: 'Олена Ковальчук (Тест)',
      phone: '+380671234567',
      email: 'olena.test@example.com',
      blocks: 'Комплексні рішення, Розробка сайтів',
      itemsText: '[Пакет] Інтернет-магазин під ключ (Pro); Налаштування аналітики GA4; SEO оптимізація',
      priceBreakdown: 'Інтернет-магазин під ключ (Pro): €1400 | GA4: €150 | SEO: €250',
      totalAmount: 1800,
      currency: '€',
      notes: 'Потрібно запустити магазин одягу до кінця місяця. Прошу зв’язатися у Telegram.',
      status: 'new',
    };

    await saveOrderToFirestore(testOrder);
    setStatusMessage({ type: 'success', text: 'Створено тестову заявку для демонстрації!' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl h-[95vh] sm:h-[90vh] bg-slate-50/95 backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl shadow-indigo-950/30 border border-white/80 overflow-hidden flex flex-col mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold tracking-tight">Вхідні заявки клієнтів</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live CRM
                </span>
              </div>
              <p className="text-xs text-indigo-200 truncate max-w-xs sm:max-w-md">
                Кабінет адміністратора: <span className="font-semibold text-white">{auth.currentUser?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={orders.length === 0}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-40"
              title="Експорт усіх заявок у CSV файл"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Експорт у Excel/CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-500/20 hover:text-rose-200 border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
              title="Вийти з кабінету"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Вийти</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 bg-white/70 border-b border-slate-200/80 shrink-0">
          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Inbox className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Всього заявок</span>
              <span className="text-lg font-extrabold text-slate-900 font-mono">{stats.total}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Нові заявки</span>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold text-rose-600 font-mono">{stats.newCount}</span>
                {stats.newCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-700 animate-pulse">
                    Потребують уваги
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">В роботі</span>
              <span className="text-lg font-extrabold text-amber-700 font-mono">{stats.inProgressCount}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Сума заявок</span>
              <span className="text-lg font-extrabold text-emerald-700 font-mono">€{stats.totalSum.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action & Filter Toolbar */}
        <div className="p-4 bg-slate-100/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Всі ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter('new')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'new'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${stats.newCount > 0 ? 'bg-rose-500 animate-ping' : 'bg-rose-400'}`}></span>
              Нові ({stats.newCount})
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                statusFilter === 'in_progress'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              В роботі ({stats.inProgressCount})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                statusFilter === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Виконані ({stats.completedCount})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Пошук клієнта, телефону, пошти чи послуги..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-xs"
            />
          </div>
        </div>

        {/* Status Notification Banner */}
        {statusMessage && (
          <div
            className={`px-4 py-2.5 text-xs flex items-center gap-2 shrink-0 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-b border-rose-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}

        {/* Orders List Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {isLoading ? (
            <div className="text-center py-20">
              <RefreshCw className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-2" />
              <p className="text-xs text-slate-500">Завантаження заявок з бази даних...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-slate-300 max-w-lg mx-auto my-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-3 text-indigo-600">
                <Inbox className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Заявок ще немає</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Коли відвідувачі сайту заповнюватимуть форму розрахунку в калькуляторі, нові заявки миттєво з'являтимуться тут у реальному часі.
              </p>
              <button
                onClick={handleCreateTestOrder}
                className="mt-5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 inline-flex items-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Створити тестову заявку для перевірки
              </button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              За вашим пошуковим фільтром заявок не знайдено
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isNew = (order.status as string) === 'new' || !order.status;
              const isInProgress = order.status === 'in_progress';
              const isCompleted = order.status === 'completed';
              const isCanceled = order.status === 'canceled';

              return (
                <div
                  key={order.id}
                  className={`rounded-2xl border transition-all overflow-hidden bg-white ${
                    isNew
                      ? 'border-rose-300 ring-2 ring-rose-500/10 shadow-md'
                      : 'border-slate-200/90 hover:border-indigo-200 shadow-xs'
                  }`}
                >
                  {/* Order Card Top Bar */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
                        {order.clientName ? order.clientName.charAt(0).toUpperCase() : 'К'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                            {order.clientName}
                          </h4>
                          {isNew && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200 animate-pulse">
                              НОВА
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{order.date || 'Дата не вказана'}</span>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono text-[11px] text-slate-400">ID: {order.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Select & Total Sum */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-slate-500 block font-medium">Сума заявки</span>
                        <span className="text-lg sm:text-xl font-extrabold text-indigo-700 font-mono">
                          €{order.totalAmount}
                        </span>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={order.status || 'new'}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer focus:outline-hidden transition-all ${
                          isNew
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : isInProgress
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="new">🔴 Нова заявка</option>
                        <option value="in_progress">🟡 В роботі</option>
                        <option value="completed">🟢 Виконано</option>
                        <option value="canceled">⚪ Скасовано</option>
                      </select>
                    </div>
                  </div>

                  {/* Client Contacts Bar */}
                  <div className="px-4 sm:px-5 py-3 bg-indigo-50/30 border-b border-slate-100 flex flex-wrap items-center gap-4 text-xs">
                    {/* Phone */}
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${order.phone.replace(/\s+/g, '')}`}
                        className="flex items-center gap-1.5 font-bold text-indigo-700 hover:text-indigo-900 bg-white px-2.5 py-1 rounded-lg border border-indigo-100 shadow-2xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{order.phone}</span>
                      </a>
                      <button
                        onClick={() => copyToClipboard(order.phone, `phone-${order.id}`)}
                        className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                        title="Скопіювати телефон"
                      >
                        {copiedField === `phone-${order.id}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${order.email}`}
                        className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{order.email}</span>
                      </a>
                      <button
                        onClick={() => copyToClipboard(order.email, `email-${order.id}`)}
                        className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                        title="Скопіювати email"
                      >
                        {copiedField === `email-${order.id}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Quick WhatsApp / Telegram */}
                    <div className="flex items-center gap-1.5 ml-auto">
                      <a
                        href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={`https://t.me/+${order.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Telegram</span>
                      </a>
                    </div>
                  </div>

                  {/* Order Details Body */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {/* Chosen items list */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Обрані послуги та пакети
                      </span>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1 text-xs">
                        {order.itemsText.split('; ').map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-slate-800">
                            <span className="text-indigo-500 font-bold shrink-0">•</span>
                            <span className="font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed price breakdown if available */}
                    {order.priceBreakdown && (
                      <div className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-700">Калькуляція: </span>
                        {order.priceBreakdown}
                      </div>
                    )}

                    {/* Notes from client */}
                    {order.notes && (
                      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs">
                        <span className="font-bold text-amber-900 block mb-0.5">
                          📝 Коментар / побажання клієнта:
                        </span>
                        <p className="text-amber-950 whitespace-pre-wrap">{order.notes}</p>
                      </div>
                    )}

                    {/* Blocks categories involved */}
                    {order.blocks && (
                      <div className="text-[11px] text-slate-500 pt-1">
                        <span className="font-bold text-slate-700">Напрямки: </span>
                        {order.blocks}
                      </div>
                    )}
                  </div>

                  {/* Order Card Footer Action Buttons */}
                  <div className="px-4 sm:px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                    <button
                      onClick={() => copyFullOrderSummary(order)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-semibold transition-colors shadow-2xs cursor-pointer"
                    >
                      {copiedOrderId === order.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Скопійовано!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Скопіювати текст заявки</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(order.id, order.clientName)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 text-xs font-semibold transition-colors cursor-pointer"
                      title="Видалити заявку"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Видалити</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
