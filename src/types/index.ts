// ============================================================
// GiftAcrossWorld — Core TypeScript Types
// ============================================================

// Product & Catalogue
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: ProductImage[];
  category: Category;
  categoryId: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  deliveryCountries: string[];
  variants?: ProductVariant[];
  specifications?: ProductSpec[];
  reviews?: Review[];
  relatedProducts?: string[]; // product IDs
  occasion?: string[];
  createdAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: VariantOption[];
}

export interface VariantOption {
  id: string;
  value: string;
  label: string;
  priceModifier?: number;
  inStock: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  emoji?: string;
  iconName?: string;
  image?: string;
  productCount?: number;
  featured?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  country?: string;
}

// Cart
export interface CartItem {
  id: string; // unique cart item id
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants?: Record<string, string>; // variantId -> optionId
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  discount?: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
  currency: string;
}

// Wishlist
export interface WishlistItem {
  productId: string;
  addedAt: string;
}

// User & Auth
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  label: string; // "Home", "Office", etc.
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// Orders
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  couponCode?: string;
  timeline: OrderTimeline[];
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedVariants?: Record<string, string>;
}

export interface OrderTimeline {
  status: OrderStatus;
  label: string;
  timestamp: string;
  completed: boolean;
}

// Checkout
export interface CheckoutFormData {
  // Customer info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Address
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  // Shipping
  shippingMethod: 'standard' | 'express' | 'overnight';
  // Payment
  paymentMethod: 'card' | 'paypal' | 'cod';
  // Other
  giftMessage?: string;
  saveAddress?: boolean;
}

// Filters & Sorting
export interface ProductFilters {
  category?: string;
  country?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  inStock?: boolean;
  occasion?: string;
  search?: string;
}

export type SortOption = 'default' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'name-az';

// Coupon
export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  expiresAt?: string;
}

// Shipping
export interface ShippingMethod {
  id: 'standard' | 'express' | 'overnight';
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

// Newsletter
export interface NewsletterSignup {
  email: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  country: string;
  countryFlag: string;
  date: string;
}

// API Response shapes
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Country/delivery
export interface DeliveryCountry {
  code: string;
  name: string;
  flag: string;
}
