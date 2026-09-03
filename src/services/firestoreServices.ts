import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  writeBatch,
  query,
  orderBy,
  setDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { ServiceCategory, ServiceSubcategory, PackageOffer, ServiceItem, Language, OrderSubmission } from '../types';
import { getServiceCategories } from '../data/services';

export interface FirestoreServiceDoc {
  id: string;
  name: string;
  price: number;
  currency: string;
  description?: string;
  categoryId: string;
  categoryTitle?: string;
  subcategoryId: string;
  subcategoryTitle?: string;
  type: 'item' | 'package';
  tier?: 'starter' | 'standard' | 'pro';
  tierLabel?: string;
  period?: string;
  features?: string[];
  order: number;
  unitNote?: string;
  isAi?: boolean;
  popular?: boolean;
}

export interface FirestoreCategoryDoc {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  order: number;
  bubbleColor: {
    bg: string;
    text: string;
    border: string;
    glow: string;
    lightBg: string;
    gradient: string;
  };
  subcategories: {
    id: string;
    code: string;
    title: string;
    isMonthly?: boolean;
    isTurnkey?: boolean;
    order?: number;
  }[];
}

/**
 * Seeds initial categories and services data from local data files into Firestore
 */
export async function seedInitialDataToFirestore(lang: Language = 'ua'): Promise<{ count: number; error?: string }> {
  try {
    const initialCategories = getServiceCategories(lang);
    const batch = writeBatch(db);
    let totalItems = 0;

    initialCategories.forEach((cat, catIdx) => {
      const catRef = doc(db, 'categories', cat.id);
      const categoryData: FirestoreCategoryDoc = {
        id: cat.id,
        title: cat.title,
        iconName: cat.iconName,
        shortDesc: cat.shortDesc,
        order: (catIdx + 1) * 10,
        bubbleColor: cat.bubbleColor,
        subcategories: cat.subcategories.map((sub, sIdx) => ({
          id: sub.id,
          code: sub.code,
          title: sub.title,
          isMonthly: (sub as any).isMonthly || sub.packageType === 'monthly',
          isTurnkey: (sub as any).isTurnkey || sub.packageType === 'one-time',
          order: (sIdx + 1) * 10,
        })),
      };
      batch.set(catRef, categoryData, { merge: true });
      totalItems++;

      let itemOrderInCat = 1;

      cat.subcategories.forEach((sub) => {
        // Save packages as service documents
        if (sub.packages && sub.packages.length > 0) {
          sub.packages.forEach((pkg) => {
            const servRef = doc(db, 'services', pkg.id);
            const servData: FirestoreServiceDoc = {
              id: pkg.id,
              name: `${sub.title} - ${pkg.tierLabel}`,
              price: pkg.price,
              currency: pkg.currency || '€',
              categoryId: cat.id,
              categoryTitle: cat.title,
              subcategoryId: sub.id,
              subcategoryTitle: sub.title,
              type: 'package',
              tier: pkg.tier,
              tierLabel: pkg.tierLabel,
              period: pkg.period || '',
              features: pkg.features || [],
              order: itemOrderInCat * 10,
            };
            batch.set(servRef, servData, { merge: true });
            totalItems++;
            itemOrderInCat++;
          });
        }

        // Save individual items as service documents
        if (sub.items && sub.items.length > 0) {
          sub.items.forEach((item) => {
            const servRef = doc(db, 'services', item.id);
            const servData: FirestoreServiceDoc = {
              id: item.id,
              name: item.name,
              price: item.price,
              currency: item.currency || '€',
              description: item.description || '',
              unitNote: item.unitNote || '',
              categoryId: cat.id,
              categoryTitle: cat.title,
              subcategoryId: sub.id,
              subcategoryTitle: sub.title,
              type: 'item',
              isAi: !!item.isAi,
              popular: !!item.popular,
              order: itemOrderInCat * 10,
            };
            batch.set(servRef, servData, { merge: true });
            totalItems++;
            itemOrderInCat++;
          });
        }
      });
    });

    await batch.commit();
    return { count: totalItems };
  } catch (err: any) {
    console.error('Seed Firestore error:', err);
    return { count: 0, error: err.message || 'Помилка імпорту' };
  }
}

/**
 * Subscribes to real-time updates of categories and services in Firestore
 */
export function subscribeToFirestoreServices(
  lang: Language,
  onData: (categories: ServiceCategory[], rawServices: FirestoreServiceDoc[], rawCategories: FirestoreCategoryDoc[]) => void,
  onError?: (error: any) => void
): () => void {
  const fallbackCategories = getServiceCategories(lang);

  let currentCategories: FirestoreCategoryDoc[] = [];
  let currentServices: FirestoreServiceDoc[] = [];

  const updateCombinedData = () => {
    if (currentCategories.length === 0 && currentServices.length === 0) {
      // Use fallback static data
      onData(fallbackCategories, [], []);
      return;
    }

    // Build categories structure from Firestore data, matching canonical fallback order
    const fallbackOrderMap = new Map<string, number>(fallbackCategories.map((c, i) => [c.id, i]));
    const sortedCategories = [...currentCategories].sort(
      (a, b) => (fallbackOrderMap.get(a.id) ?? (a.order || 0)) - (fallbackOrderMap.get(b.id) ?? (b.order || 0))
    );

    const resultCategories: ServiceCategory[] = sortedCategories.map((catDoc) => {
      // Find fallback category for rich metadata if missing
      const fbCat = fallbackCategories.find((c) => c.id === catDoc.id);

      const rawSubcats = catDoc.subcategories || [];
      const validSubcats = fbCat
        ? rawSubcats.filter((subInfo) => fbCat.subcategories.some((fbs) => fbs.id === subInfo.id))
        : rawSubcats;

      const subcategories: ServiceSubcategory[] = (validSubcats.length > 0 ? validSubcats : fbCat?.subcategories || []).map((subInfo) => {
        const fbSub = fbCat?.subcategories.find((s) => s.id === subInfo.id);

        // Find services for this subcategory
        const matchingServices = currentServices
          .filter((s) => s.subcategoryId === subInfo.id || (s.categoryId === catDoc.id && !s.subcategoryId))
          .sort((a, b) => (a.order || 0) - (b.order || 0));

        const packages: PackageOffer[] = matchingServices
          .filter((s) => s.type === 'package')
          .map((s) => ({
            id: s.id,
            tier: s.tier || 'standard',
            tierLabel: s.tierLabel || s.name,
            price: Number(s.price) || 0,
            currency: s.currency || '€',
            period: s.period,
            features: s.features || [],
          }));

        const items: ServiceItem[] = matchingServices
          .filter((s) => s.type === 'item')
          .map((s) => ({
            id: s.id,
            name: s.name,
            price: Number(s.price) || 0,
            currency: s.currency || '€',
            unitNote: s.unitNote,
            description: s.description,
            isAi: s.isAi,
            popular: s.popular,
          }));

        const isComplex = catDoc.id === 'complex';

        return {
          id: subInfo.id,
          code: subInfo.code || fbSub?.code || '1.1',
          title: subInfo.title || fbSub?.title || '',
          hasPackages: (packages.length > 0) || (fbSub?.packages && fbSub.packages.length > 0),
          packageType: subInfo.isMonthly ? 'monthly' : (fbSub?.packageType || 'one-time'),
          isMonthly: isComplex ? false : (subInfo.isMonthly ?? fbSub?.isMonthly),
          isTurnkey: isComplex ? true : (subInfo.isTurnkey ?? fbSub?.isTurnkey),
          packages: packages.length > 0 ? packages : fbSub?.packages,
          items: isComplex ? [] : (items.length > 0 ? items : fbSub?.items || []),
        } as ServiceSubcategory;
      });

      return {
        id: catDoc.id,
        title: fbCat?.title || catDoc.title || catDoc.id,
        iconName: catDoc.iconName || fbCat?.iconName || 'Folder',
        shortDesc: fbCat?.shortDesc || catDoc.shortDesc || '',
        bubbleColor: catDoc.bubbleColor || fbCat?.bubbleColor || {
          bg: 'bg-indigo-500',
          text: 'text-indigo-600',
          border: 'border-indigo-200',
          glow: 'rgba(99, 102, 241, 0.3)',
          lightBg: 'bg-indigo-50/50',
          gradient: 'from-indigo-500 to-violet-600',
        },
        subcategories: subcategories.length > 0 ? subcategories : fbCat?.subcategories || [],
      };
    });

    onData(resultCategories, currentServices, currentCategories);
  };

  // Subscriptions to both collections
  const unsubCategories = onSnapshot(
    collection(db, 'categories'),
    (snap) => {
      currentCategories = snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreCategoryDoc));
      updateCombinedData();
    },
    (err) => {
      console.warn('Firestore categories listener:', err);
      if (onError) onError(err);
    }
  );

  const unsubServices = onSnapshot(
    collection(db, 'services'),
    (snap) => {
      currentServices = snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreServiceDoc));
      updateCombinedData();
    },
    (err) => {
      console.warn('Firestore services listener:', err);
      if (onError) onError(err);
    }
  );

  return () => {
    unsubCategories();
    unsubServices();
  };
}

/**
 * Updates a service item in Firestore (uses setDoc with merge to create if missing)
 */
export async function updateServiceItem(
  serviceId: string,
  updates: Partial<FirestoreServiceDoc>
): Promise<{ success: boolean; error?: string }> {
  try {
    const ref = doc(db, 'services', serviceId);
    await setDoc(ref, updates, { merge: true });
    return { success: true };
  } catch (err: any) {
    console.error('Update service error:', err);
    return { success: false, error: err.message || 'Помилка оновлення' };
  }
}

/**
 * Updates a category document in Firestore (uses setDoc with merge to create if missing)
 */
export async function updateCategory(
  categoryId: string,
  updates: Partial<FirestoreCategoryDoc>
): Promise<{ success: boolean; error?: string }> {
  try {
    const ref = doc(db, 'categories', categoryId);
    await setDoc(ref, updates, { merge: true });
    return { success: true };
  } catch (err: any) {
    console.error('Update category error:', err);
    return { success: false, error: err.message || 'Помилка оновлення' };
  }
}

/**
 * Batch reorders category documents with new order values
 */
export async function reorderCategoriesBatch(
  orderedItems: { id: string; order: number }[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const batch = writeBatch(db);
    orderedItems.forEach((item) => {
      const ref = doc(db, 'categories', item.id);
      batch.set(ref, { order: item.order }, { merge: true });
    });
    await batch.commit();
    return { success: true };
  } catch (err: any) {
    console.error('Batch reorder categories error:', err);
    return { success: false, error: err.message || 'Помилка оновлення порядку категорій' };
  }
}

/**
 * Batch reorders service documents with new order values
 */
export async function reorderServicesBatch(
  orderedItems: { id: string; order: number }[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const batch = writeBatch(db);
    orderedItems.forEach((item) => {
      const ref = doc(db, 'services', item.id);
      batch.set(ref, { order: item.order }, { merge: true });
    });
    await batch.commit();
    return { success: true };
  } catch (err: any) {
    console.error('Batch reorder error:', err);
    return { success: false, error: err.message || 'Помилка оновлення порядку' };
  }
}

/**
 * Creates or overwrites a single service document
 */
export async function saveNewServiceItem(
  service: FirestoreServiceDoc
): Promise<{ success: boolean; error?: string }> {
  try {
    const ref = doc(db, 'services', service.id);
    await setDoc(ref, service, { merge: true });
    return { success: true };
  } catch (err: any) {
    console.error('Save service error:', err);
    return { success: false, error: err.message || 'Помилка збереження' };
  }
}

/**
 * Deletes a service document from Firestore
 */
export async function deleteServiceItem(
  serviceId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const ref = doc(db, 'services', serviceId);
    await deleteDoc(ref);
    return { success: true };
  } catch (err: any) {
    console.error('Delete service error:', err);
    return { success: false, error: err.message || 'Помилка видалення' };
  }
}

/**
 * Saves a submitted customer order to Firestore in the 'orders' collection
 */
export async function saveOrderToFirestore(
  order: OrderSubmission
): Promise<{ success: boolean; error?: string }> {
  try {
    const orderDocRef = doc(db, 'orders', order.id);
    await setDoc(orderDocRef, {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err: any) {
    console.error('Error saving order to Firestore:', err);
    return { success: false, error: err.message || 'Помилка збереження заявки у Firestore' };
  }
}

/**
 * Real-time subscription to orders in Firestore
 */
export function subscribeToFirestoreOrders(
  onData: (orders: OrderSubmission[]) => void,
  onError?: (err: any) => void
): () => void {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef);

  return onSnapshot(
    q,
    (snap) => {
      const list: OrderSubmission[] = snap.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          date: data.date || '',
          clientName: data.clientName || 'Клієнт',
          phone: data.phone || '',
          email: data.email || '',
          blocks: data.blocks || '',
          itemsText: data.itemsText || '',
          priceBreakdown: data.priceBreakdown || '',
          totalAmount: Number(data.totalAmount) || 0,
          currency: data.currency || '€',
          notes: data.notes || '',
          status: (data.status as any) || 'new',
        };
      });

      // Sort by date or id descending
      list.sort((a, b) => {
        if (a.date && b.date) {
          return b.date.localeCompare(a.date);
        }
        return b.id.localeCompare(a.id);
      });

      onData(list);
    },
    (err) => {
      console.error('Orders snapshot error:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Updates an order status in Firestore (e.g. 'new', 'in_progress', 'completed', 'canceled')
 */
export async function updateOrderStatusInFirestore(
  orderId: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const ref = doc(db, 'orders', orderId);
    await updateDoc(ref, {
      status,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err: any) {
    console.error('Error updating order status:', err);
    return { success: false, error: err.message || 'Помилка оновлення статусу заявки' };
  }
}

/**
 * Deletes an order from Firestore
 */
export async function deleteOrderFromFirestore(
  orderId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const ref = doc(db, 'orders', orderId);
    await deleteDoc(ref);
    return { success: true };
  } catch (err: any) {
    console.error('Error deleting order:', err);
    return { success: false, error: err.message || 'Помилка видалення заявки' };
  }
}

