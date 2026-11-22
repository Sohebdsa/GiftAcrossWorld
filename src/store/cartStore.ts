'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, CartSummary } from '@/types';
import { coupons, shippingMethods } from '@/data/products';

interface CartStore {
  items: CartItem[];
  couponCode: string;
  discount: number;
  shippingMethodId: 'standard' | 'express' | 'overnight';
  couponError: string;
  couponSuccess: string;

  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  setShippingMethod: (id: 'standard' | 'express' | 'overnight') => void;
  getSummary: () => CartSummary;
  getItemCount: () => number;
  isInCart: (productId: string) => boolean;
}

function generateId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      discount: 0,
      shippingMethodId: 'standard',
      couponError: '',
      couponSuccess: '',

      addItem: (item) => {
        const { items } = get();
        // Check if same product + same variants already in cart
        const existingIndex = items.findIndex(
          (i) =>
            i.productId === item.productId &&
            JSON.stringify(i.selectedVariants) === JSON.stringify(item.selectedVariants)
        );

        if (existingIndex >= 0) {
          // Increment quantity
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + item.quantity,
          };
          set({ items: updated });
        } else {
          set({ items: [...items, { ...item, id: generateId() }] });
        }
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => {
        set({ items: [], couponCode: '', discount: 0, couponError: '', couponSuccess: '' });
      },

      applyCoupon: (code) => {
        const normalizedCode = code.trim().toUpperCase();
        const coupon = coupons.find((c) => c.code === normalizedCode);

        if (!coupon) {
          set({ couponError: 'Invalid coupon code. Please try again.', couponSuccess: '' });
          return false;
        }

        const { getSummary } = get();
        const summary = getSummary();

        if (coupon.minOrderAmount && summary.subtotal < coupon.minOrderAmount) {
          set({
            couponError: `This coupon requires a minimum order of $${coupon.minOrderAmount.toFixed(2)}.`,
            couponSuccess: '',
          });
          return false;
        }

        let discountAmount = 0;
        if (coupon.type === 'percentage') {
          discountAmount = summary.subtotal * (coupon.value / 100);
          if (coupon.maxDiscount) {
            discountAmount = Math.min(discountAmount, coupon.maxDiscount);
          }
        } else {
          discountAmount = coupon.value;
        }

        set({
          couponCode: normalizedCode,
          discount: discountAmount,
          couponError: '',
          couponSuccess: `Coupon applied! You saved $${discountAmount.toFixed(2)}.`,
        });
        return true;
      },

      removeCoupon: () => {
        set({ couponCode: '', discount: 0, couponError: '', couponSuccess: '' });
      },

      setShippingMethod: (id) => {
        set({ shippingMethodId: id });
      },

      getSummary: (): CartSummary => {
        const { items, discount, shippingMethodId } = get();
        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingMethod = shippingMethods.find((m) => m.id === shippingMethodId);
        const shipping = items.length > 0 ? (shippingMethod?.price ?? 4.99) : 0;
        const total = Math.max(0, subtotal + shipping - discount);
        const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

        return { subtotal, shipping, discount, total, itemCount, currency: 'USD' };
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      isInCart: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },
    }),
    {
      name: 'jaw_cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
