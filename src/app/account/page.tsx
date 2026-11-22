'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Package, MapPin, Heart, LogOut, ChevronRight } from 'lucide-react';

export default function AccountPage() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace('/auth/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const menuItems = [
    { icon: Package, label: 'My Orders', href: '/account/orders', desc: 'Track and manage your orders' },
    { icon: MapPin, label: 'Addresses', href: '/account/addresses', desc: 'Manage delivery addresses' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist', desc: 'Your saved gifts' },
  ];

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="section-container" style={{ maxWidth: '800px' }}>
        {/* Profile header */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-soft)', padding: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--brand-primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={32} style={{ color: 'var(--brand-primary)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.4rem', color: 'var(--brand-dark)', marginBottom: '0.25rem' }}>{user.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{user.email}</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.3rem' }}>
              Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', border: '1.5px solid var(--border-primary)', borderRadius: '8px', background: 'white', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.15s' }}
            className="hover:border-red-300 hover:text-red-500"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Menu items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {menuItems.map(({ icon: Icon, label, href, desc }) => (
            <Link
              key={href}
              href={href}
              style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border-soft)', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', transition: 'all 0.2s', textDecoration: 'none' }}
              className="hover:border-[var(--brand-primary)] hover:shadow-md"
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--brand-primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{label}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{desc}</p>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--text-subtle)' }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
