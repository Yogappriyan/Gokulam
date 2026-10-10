export type Language = 'en' | 'ta';

export interface ColorVariant {
  name: string;
  nameTa: string;
  hex: string;
  image?: string;
}

export interface SizeVariant {
  name: string;
  inStock: boolean;
  stockCount: number;
}

export interface Product {
  id: string;
  name: string;
  nameTa: string;
  sku: string;
  category: string;
  categoryTa: string;
  subcategory: string;
  fabric: string;
  price: number;
  salePrice?: number;
  stock: number;
  gstRate?: string;
  hsn?: string;
  images: string[];
  colorVariants: ColorVariant[];
  sizeVariants: SizeVariant[];
  occasion?: string[];
  isBlouseStitchingAvailable?: boolean;
  isFeatured?: boolean;
  isPublished: boolean;
  dimensions?: string;
  description: string;
  descriptionTa: string;
  rating?: number;
  reviewsCount?: number;
}

export interface BlouseMeasurements {
  bust: string;
  length: string;
  waist: string;
  sleeveLength: string;
  sleeveType: string;
  frontNeck: string;
  backNeck: string;
  notes: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: ColorVariant;
  selectedSize?: string;
  quantity: number;
  blouseStitching?: BlouseMeasurements;
}

export type OrderStatus =
  | 'New'
  | 'Confirmed'
  | 'Stitching'
  | 'Ready'
  | 'Out for Delivery'
  | 'Completed'
  | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;
  pincode?: string;
  deliveryType: 'pickup' | 'delivery';
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  whatsappSent: boolean;
  notes?: string;
  createdAt: string;
}

export interface StitchingJob {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  sareeTitle: string;
  measurements: BlouseMeasurements;
  status: 'Received' | 'Cutting' | 'Stitching' | 'Quality Check' | 'Ready' | 'Delivered';
  dueDate: string;
  tailorAssigned: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent?: number;
  flatDiscount?: number;
  minOrder: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  expiryDate: string;
}

export interface BannerCampaign {
  id: string;
  title: string;
  titleTa: string;
  subtitle: string;
  subtitleTa: string;
  badge: string;
  badgeTa: string;
  targetDate: string;
  isActive: boolean;
  discountTag: string;
}

export type UserRole = 'ADMIN' | 'STAFF';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
