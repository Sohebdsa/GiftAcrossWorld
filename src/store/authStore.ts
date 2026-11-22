'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, Address } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, data: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

// Simulated user database (in-memory, not production)
const mockUsers: Array<{ id: string; name: string; email: string; password: string }> = [
  { id: 'u001', name: 'Demo User', email: 'demo@giftacrossworld.com', password: 'Demo@1234' },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 800)); // simulate API delay
        const found = mockUsers.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!found) {
          return { success: false, error: 'Invalid email or password.' };
        }
        const user: User = {
          id: found.id,
          name: found.name,
          email: found.email,
          addresses: [],
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true });
        return { success: true };
      },

      register: async (name, email, password) => {
        await new Promise((r) => setTimeout(r, 800));
        const exists = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          return { success: false, error: 'An account with this email already exists.' };
        }
        const id = `u_${Date.now()}`;
        mockUsers.push({ id, name, email, password });
        const user: User = {
          id,
          name,
          email,
          addresses: [],
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true });
        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        const { user } = get();
        if (!user) return;
        set({ user: { ...user, ...data } });
      },

      addAddress: (address) => {
        const { user } = get();
        if (!user) return;
        const newAddress: Address = { ...address, id: `addr_${Date.now()}` };
        const addresses = address.isDefault
          ? [...user.addresses.map((a) => ({ ...a, isDefault: false })), newAddress]
          : [...user.addresses, newAddress];
        set({ user: { ...user, addresses } });
      },

      updateAddress: (id, data) => {
        const { user } = get();
        if (!user) return;
        set({
          user: {
            ...user,
            addresses: user.addresses.map((a) => (a.id === id ? { ...a, ...data } : a)),
          },
        });
      },

      removeAddress: (id) => {
        const { user } = get();
        if (!user) return;
        set({ user: { ...user, addresses: user.addresses.filter((a) => a.id !== id) } });
      },

      setDefaultAddress: (id) => {
        const { user } = get();
        if (!user) return;
        set({
          user: {
            ...user,
            addresses: user.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
          },
        });
      },
    }),
    {
      name: 'jaw_auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
