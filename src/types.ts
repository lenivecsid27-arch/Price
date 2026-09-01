export type Language = 'ua' | 'en' | 'nl' | 'ru';

export type TierLevel = 'starter' | 'standard' | 'pro';

export interface PackageOffer {
  id: string;
  tier: TierLevel;
  tierLabel: string;
  price: number;
  currency: string;
  period?: string; // e.g. '/ міс', '/ mo', '/ mnd', '/ мес' or 'разово'
  features: string[];
  recommended?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  unitNote?: string;
  description?: string;
  isAi?: boolean;
  popular?: boolean;
}

export interface ServiceSubcategory {
  id: string;
  code: string; // e.g. "0.1", "1.1", "5.1"
  title: string;
  description?: string;
  hasPackages: boolean;
  packageType?: 'monthly' | 'one-time';
  packages?: PackageOffer[];
  items: ServiceItem[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  bubbleColor: {
    bg: string;
    text: string;
    border: string;
    glow: string;
    lightBg: string;
    gradient: string;
  };
  subcategories: ServiceSubcategory[];
}

export interface PresetBundle {
  id: string;
  name: string;
  badge: string;
  description: string;
  targetCategory: string;
  icon: string;
  packageSelections: {
    subcategoryId: string;
    packageId: string;
  }[];
  itemSelections: {
    subcategoryId: string;
    itemId: string;
    quantity: number;
  }[];
}

export interface SelectedPackage {
  subcategoryId: string;
  subcategoryTitle: string;
  categoryTitle: string;
  packageId: string;
  tier: TierLevel;
  tierLabel: string;
  price: number;
  period?: string;
  features: string[];
}

export interface SelectedItem {
  itemId: string;
  subcategoryId: string;
  subcategoryTitle: string;
  categoryTitle: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderSubmission {
  id: string;
  date: string; // ISO or formatted
  clientName: string;
  phone: string;
  email: string;
  blocks: string; // comma-separated blocks
  itemsText: string; // all chosen items
  priceBreakdown: string; // breakdown of individual prices
  totalAmount: number;
  currency: string;
  notes?: string;
  status: 'new' | 'in_progress' | 'synced_sheets' | 'failed_sync';
  sheetRowIndex?: number;
  sheetUrl?: string;
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  spreadsheetName: string;
  sheetUrl: string;
  autoSync: boolean;
  lastSyncTime?: string;
  userEmail?: string;
}
