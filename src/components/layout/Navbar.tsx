'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  Gift,
  ChevronDown,
  Globe,
  Package,
  MessageCircle,
  Sparkles,
  TrendingUp,
  LogOut,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { categories } from '@/data/products';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

const popularSearches = [
  'Red Roses',
  'Chocolate Truffle Cake',
  'Luxury Hamper',
  'Belgian Chocolates',
  'Personalized Mug',
  'Orchid Bouquet',
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const catMenuRef = useRef<HTMLDivElement>(null);

  const cartItems = useCartStore((s) => s.items);
  const wishlistProductIds = useWishlistStore((s) => s.productIds);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );
  const cartTotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );
  const wishlistCount = wishlistProductIds.length;

  const displayCartCount = mounted ? cartCount : 0;
  const displayCartTotal = mounted ? cartTotal.toFixed(2) : '0.00';
  const displayWishlistCount = mounted ? wishlistCount : 0;
  const isUserAuthenticated = mounted && isAuthenticated;

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (catMenuRef.current && !catMenuRef.current.contains(target)) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
    setSearchFocused(false);
    setUserMenuOpen(false);
    setCategoriesDropdownOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
      setMobileSearchOpen(false);
    }
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    router.push(`/products?search=${encodeURIComponent(term)}`);
    setSearchFocused(false);
    setMobileSearchOpen(false);
  };

  return (
    <div className="w-full z-50 sticky top-0">
      {/* 1. Top Announcement Bar */}
      <div
        style={{
          background: 'var(--brand-dark)',
          color: '#ffffff',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
        className="text-xs py-2 px-3 sm:px-6 font-medium transition-all"
      >
        <div className="section-container flex items-center justify-between gap-2 flex-wrap">
          {/* Left: Free worldwide shipping */}
          <div className="flex items-center gap-2 text-rose-100">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Globe size={13} style={{ color: 'var(--brand-primary-light)' }} />
              Worldwide Delivery Available
            </span>
            <span className="hidden md:inline text-rose-300/40">•</span>
            <span className="hidden md:inline text-rose-200/90">
              Free delivery on gift hampers over $75 USD
            </span>
          </div>

          {/* Right: Quick Links & WhatsApp Concierge */}
          <div className="flex items-center gap-4 text-xs ml-auto">
            <Link
              href="/account/orders"
              className="hidden sm:inline-flex items-center gap-1.5 text-rose-100 hover:text-white transition-colors"
            >
              <Package size={13} style={{ color: 'var(--brand-primary-light)' }} />
              <span>Track Orders</span>
            </Link>

            <span className="hidden sm:inline text-rose-300/40">|</span>

            <a
              href="https://wa.me/919167261683?text=Hi%2C%20I%20would%20like%20assistance%20with%20an%20international%20gift%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#25D366] hover:underline"
              title="Chat with International Gift Concierge"
            >
              <MessageCircle size={13} />
              <span>WhatsApp Concierge</span>
            </a>

            <span className="hidden lg:inline text-rose-300/40">|</span>

            <span className="hidden lg:inline-flex items-center gap-1 text-rose-200/80">
              <ShieldCheck size={13} style={{ color: 'var(--brand-primary)' }} />
              <span>100% Guaranteed Freshness</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Row */}
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid var(--border-soft)',
          boxShadow: scrolled
            ? '0 4px 20px rgba(43, 34, 37, 0.08)'
            : '0 2px 8px rgba(232, 114, 137, 0.04)',
          transition: 'all 0.25s ease',
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-20 gap-3 md:gap-6">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 -ml-2 rounded-lg text-gray-700 hover:bg-rose-50 hover:text-[var(--brand-primary)] transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #e87289 0%, #d65d75 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(232, 114, 137, 0.28)',
                  transition: 'transform 0.2s ease',
                }}
                className="group-hover:scale-105"
              >
                <Gift size={22} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col">
                <span
                  style={{
                    fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif',
                    color: 'var(--brand-dark)',
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  Gift<span style={{ color: 'var(--brand-primary)' }}>Across</span>World
                </span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  International Gifting
                </span>
              </div>
            </Link>

            {/* Center: Desktop Prominent Search Bar */}
            <div
              ref={searchContainerRef}
              className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-6 relative"
            >
              <form
                onSubmit={handleSearchSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  background: '#ffffff',
                  border: searchFocused
                    ? '1.5px solid var(--brand-primary)'
                    : '1.5px solid var(--border-primary)',
                  borderRadius: '10px',
                  boxShadow: searchFocused
                    ? '0 0 0 3px rgba(232, 114, 137, 0.14)'
                    : 'none',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden',
                }}
              >
                <div className="pl-3.5 pr-2 text-gray-400 flex items-center justify-center">
                  <Search size={18} style={{ color: searchFocused ? 'var(--brand-primary)' : 'var(--text-muted)' }} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search flowers, cakes, hampers, chocolates..."
                  className="w-full py-2.5 text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 mr-1 text-gray-400 hover:text-gray-600 rounded-full"
                  >
                    <X size={15} />
                  </button>
                )}
                <button
                  type="submit"
                  style={{
                    background: 'var(--brand-primary)',
                    color: 'white',
                    padding: '0 1.25rem',
                    height: '42px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="hover:bg-[var(--brand-primary-dark)]"
                >
                  Search
                </button>
              </form>

              {/* Live Search Quick Suggestions Dropdown */}
              {searchFocused && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '0.5rem',
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid var(--border-soft)',
                    boxShadow: '0 12px 32px rgba(43, 34, 37, 0.12)',
                    padding: '1rem',
                    zIndex: 100,
                  }}
                >
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Popular Gift Searches
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleQuickSearch(term)}
                        className="text-xs px-3 py-1.5 rounded-full bg-rose-50 text-[var(--brand-dark)] hover:bg-[var(--brand-primary)] hover:text-white transition-all font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex items-center justify-between text-xs text-gray-500">
                    <span>Looking for international catalog?</span>
                    <Link
                      href="/products"
                      onClick={() => setSearchFocused(false)}
                      className="text-[var(--brand-primary)] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Browse All Gifts <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Action Icons & Badges */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile Search Trigger Icon */}
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                aria-label="Toggle mobile search bar"
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-rose-50 hover:text-[var(--brand-primary)] transition-colors"
              >
                <Search size={22} />
              </button>

              {/* Track Orders Link (Desktop) */}
              <Link
                href="/account/orders"
                title="Track your orders"
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-rose-50 hover:text-[var(--brand-primary)] transition-colors"
              >
                <Package size={20} style={{ color: 'var(--brand-primary)' }} />
                <div className="flex flex-col text-left">
                  <span className="text-[11px] text-gray-400 leading-tight">My Orders</span>
                  <span className="text-xs font-semibold text-gray-800 leading-tight">Tracking</span>
                </div>
              </Link>

              {/* Wishlist Icon with Count Badge */}
              <Link
                href="/wishlist"
                aria-label={`Saved Wishlist with ${displayWishlistCount} items`}
                title="View Wishlist"
                className="relative flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-lg text-gray-700 hover:bg-rose-50 hover:text-[var(--brand-primary)] transition-colors"
              >
                <div className="relative">
                  <Heart size={21} style={{ color: displayWishlistCount > 0 ? 'var(--brand-primary)' : 'currentColor' }} />
                  {displayWishlistCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-8px',
                        background: 'var(--brand-primary)',
                        color: 'white',
                        borderRadius: '999px',
                        minWidth: '17px',
                        height: '17px',
                        fontSize: '10px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 4px',
                        boxShadow: '0 2px 6px rgba(232, 114, 137, 0.4)',
                      }}
                    >
                      {displayWishlistCount}
                    </span>
                  )}
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-[11px] text-gray-400 leading-tight">Favorites</span>
                  <span className="text-xs font-semibold text-gray-800 leading-tight">Wishlist</span>
                </div>
              </Link>

              {/* Shopping Cart Pill Button with Count & Price */}
              <Link
                href="/cart"
                aria-label={`Shopping Cart with ${displayCartCount} items`}
                style={{
                  background: displayCartCount > 0 ? 'var(--brand-primary-pale)' : 'transparent',
                  border: '1.5px solid var(--border-primary)',
                  borderRadius: '10px',
                  padding: '0.45rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                }}
                className="hover:border-[var(--brand-primary)] hover:shadow-sm"
              >
                <div className="relative">
                  <ShoppingCart size={20} style={{ color: 'var(--brand-primary)' }} />
                  {displayCartCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-10px',
                        background: 'var(--brand-primary)',
                        color: 'white',
                        borderRadius: '999px',
                        minWidth: '17px',
                        height: '17px',
                        fontSize: '10px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 4px',
                      }}
                    >
                      {displayCartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[11px] text-gray-400 leading-tight">Cart</span>
                  <span className="text-xs font-bold text-[var(--brand-dark)] leading-tight">
                    ${displayCartTotal}
                  </span>
                </div>
              </Link>

              {/* User Account Button with Dropdown */}
              <div ref={userMenuRef} className="relative">
                {isUserAuthenticated ? (
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    style={{
                      background: 'white',
                      border: '1.5px solid var(--border-soft)',
                      borderRadius: '10px',
                      padding: '0.45rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    className="hover:border-[var(--brand-primary)]"
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--brand-primary)',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold text-gray-800">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    style={{
                      background: 'var(--brand-primary)',
                      color: 'white',
                      borderRadius: '8px',
                      padding: '0.55rem 1rem',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      textDecoration: 'none',
                      transition: 'background-color 0.15s ease',
                    }}
                    className="hover:bg-[var(--brand-primary-dark)]"
                  >
                    <User size={16} />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                )}

                {/* Authenticated User Menu Dropdown */}
                {isAuthenticated && userMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '0.5rem',
                      background: 'white',
                      border: '1px solid var(--border-soft)',
                      borderRadius: '12px',
                      boxShadow: '0 12px 30px rgba(43, 34, 37, 0.12)',
                      padding: '0.5rem',
                      minWidth: '200px',
                      zIndex: 200,
                    }}
                  >
                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-rose-50 hover:text-[var(--brand-primary)]"
                    >
                      <User size={15} /> Dashboard
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-rose-50 hover:text-[var(--brand-primary)]"
                    >
                      <Package size={15} /> My Orders & Tracking
                    </Link>
                    <Link
                      href="/account/addresses"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-rose-50 hover:text-[var(--brand-primary)]"
                    >
                      <MapPin size={15} /> Saved Addresses
                    </Link>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 text-left"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Expandable Bar */}
          {mobileSearchOpen && (
            <div className="md:hidden pb-3 pt-1 border-t border-rose-100">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search flowers, cakes, gifts..."
                    autoFocus
                    className="w-full px-3 py-2 pl-9 text-sm rounded-lg border border-[var(--border-primary)] outline-none focus:border-[var(--brand-primary)]"
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--brand-primary)] text-white text-xs font-semibold rounded-lg hover:bg-[var(--brand-primary-dark)]"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* 3. Sub-Navigation Category Bar (Below Main Header) */}
        <div
          style={{
            background: '#ffffff',
            borderTop: '1px solid var(--border-soft)',
            borderBottom: '2px solid var(--border-soft)',
          }}
          className="hidden md:block"
        >
          <div className="section-container">
            <nav className="flex items-center justify-between text-xs font-semibold tracking-wide text-[var(--text-secondary)]">
              {/* All Categories Dropdown Mega Trigger */}
              <div ref={catMenuRef} className="relative">
                <button
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    background: categoriesDropdownOpen ? 'var(--brand-primary-pale)' : 'transparent',
                    color: categoriesDropdownOpen ? 'var(--brand-primary)' : 'var(--brand-dark)',
                    borderRight: '1px solid var(--border-soft)',
                    borderLeft: 'none',
                    borderTop: 'none',
                    borderBottom: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                  className="hover:text-[var(--brand-primary)] transition-colors"
                >
                  <Menu size={16} style={{ color: 'var(--brand-primary)' }} />
                  <span>ALL CATEGORIES</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Categories Dropdown Panel */}
                {categoriesDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: '2px',
                      background: 'white',
                      border: '1px solid var(--border-soft)',
                      borderRadius: '0 0 12px 12px',
                      boxShadow: '0 14px 35px rgba(43, 34, 37, 0.12)',
                      padding: '0.75rem',
                      minWidth: '260px',
                      zIndex: 150,
                    }}
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.id}`}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-rose-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <CategoryIcon categoryId={cat.id} size={17} style={{ color: 'var(--brand-primary)' }} />
                          <span className="text-xs font-semibold text-gray-800 group-hover:text-[var(--brand-primary)]">
                            {cat.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                          {cat.productCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Individual Category Direct Links */}
              <div className="flex items-center gap-1 lg:gap-2 py-1 overflow-x-auto no-scrollbar">
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md transition-colors ${
                    pathname === '/'
                      ? 'text-[var(--brand-primary)] font-bold'
                      : 'hover:text-[var(--brand-primary)]'
                  }`}
                >
                  HOME
                </Link>

                <Link
                  href="/products"
                  className={`px-3 py-2 rounded-md transition-colors ${
                    pathname === '/products'
                      ? 'text-[var(--brand-primary)] font-bold'
                      : 'hover:text-[var(--brand-primary)]'
                  }`}
                >
                  ALL GIFTS
                </Link>

                {categories.slice(0, 5).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:text-[var(--brand-primary)] transition-colors whitespace-nowrap"
                  >
                    <CategoryIcon categoryId={cat.id} size={14} style={{ color: 'var(--brand-primary)' }} />
                    <span>{cat.name.toUpperCase()}</span>
                  </Link>
                ))}

                <Link
                  href="/products?featured=true"
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-[var(--brand-primary-dark)] hover:text-[var(--brand-primary)] transition-colors font-bold whitespace-nowrap"
                >
                  <TrendingUp size={14} />
                  <span>BESTSELLERS</span>
                </Link>
              </div>

              {/* Express International Delivery Tag */}
              <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold pl-3 border-l border-rose-100">
                <Clock size={13} />
                <span>Same-Day & Express Dispatch</span>
              </div>
            </nav>
          </div>
        </div>

        {/* 4. Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: '#ffffff',
              borderTop: '1px solid var(--border-soft)',
              padding: '1.25rem 1.5rem 2rem',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
            }}
            className="lg:hidden"
          >
            {/* User Greeting & Status Banner */}
            <div
              style={{
                background: 'var(--bg-base)',
                borderRadius: '10px',
                padding: '1rem',
                border: '1px solid var(--border-soft)',
                marginBottom: '1.25rem',
              }}
            >
              {isUserAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--brand-primary)',
                        color: 'white',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{user?.name}</p>
                      <p className="text-[11px] text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="text-xs text-rose-600 font-semibold hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Welcome to GiftAcrossWorld</p>
                    <p className="text-[11px] text-gray-500">Sign in to track orders & save gifts</p>
                  </div>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 bg-[var(--brand-primary)] text-white text-xs font-semibold rounded-lg"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Main Links */}
            <nav className="flex flex-col gap-1 mb-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-800 hover:bg-rose-50"
              >
                <span>Home</span>
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-800 hover:bg-rose-50"
              >
                <span>All Gifts Collection</span>
              </Link>
              <Link
                href="/products?featured=true"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[var(--brand-primary-dark)] hover:bg-rose-50"
              >
                <TrendingUp size={16} />
                <span>Bestsellers</span>
              </Link>
              <Link
                href="/account/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-800 hover:bg-rose-50"
              >
                <Package size={16} style={{ color: 'var(--brand-primary)' }} />
                <span>Track My Orders</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-800 hover:bg-rose-50"
              >
                <div className="flex items-center gap-3">
                  <Heart size={16} style={{ color: 'var(--brand-primary)' }} />
                  <span>Saved Wishlist</span>
                </div>
                {displayWishlistCount > 0 && (
                  <span className="text-xs font-bold bg-rose-100 text-[var(--brand-primary-dark)] px-2 py-0.5 rounded-full">
                    {displayWishlistCount}
                  </span>
                )}
              </Link>
            </nav>

            {/* Shop Categories Accordion / List */}
            <div className="border-t border-rose-100 pt-3 mb-4">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
                Categories
              </p>
              <div className="flex flex-col gap-1">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/products?category=${c.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-rose-50"
                  >
                    <div className="flex items-center gap-2.5">
                      <CategoryIcon categoryId={c.id} size={16} style={{ color: 'var(--brand-primary)' }} />
                      <span>{c.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">({c.productCount})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Customer Care in Mobile Menu */}
            <div className="border-t border-rose-100 pt-3">
              <a
                href="https://wa.me/919167261683"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg mb-2"
              >
                <MessageCircle size={15} /> WhatsApp International Concierge
              </a>
              <p className="text-center text-[11px] text-gray-400">
                Delivery to 150+ countries worldwide
              </p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
