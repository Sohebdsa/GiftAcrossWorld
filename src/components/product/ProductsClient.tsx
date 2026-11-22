'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories, deliveryCountries } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown, X, Gift } from 'lucide-react';
import type { ProductFilters, SortOption } from '@/types';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name-az', label: 'Name: A–Z' },
];

export function ProductsClient() {
  const searchParams = useSearchParams();
  const initCategory = searchParams.get('category') ?? '';
  const initCountry = searchParams.get('country') ?? '';
  const initSearch = searchParams.get('search') ?? '';

  const [filters, setFilters] = useState<ProductFilters>({
    category: initCategory,
    country: initCountry,
    search: initSearch,
    priceMin: undefined,
    priceMax: undefined,
    inStock: undefined,
  });

  useEffect(() => {
    const category = searchParams.get('category') ?? '';
    const country = searchParams.get('country') ?? '';
    const search = searchParams.get('search') ?? '';
    setFilters((prev) => ({
      ...prev,
      category: category || undefined,
      country: country || undefined,
      search: search || undefined,
    }));
    setPage(1);
  }, [searchParams]);
  const [sort, setSort] = useState<SortOption>('default');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const filtered = useMemo(() => {
    let list = [...products];

    if (filters.category) list = list.filter((p) => p.categoryId === filters.category);
    if (filters.country) list = list.filter((p) => p.deliveryCountries.includes(filters.country!));
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)));
    }
    if (filters.priceMin !== undefined) list = list.filter((p) => p.price >= filters.priceMin!);
    if (filters.priceMax !== undefined) list = list.filter((p) => p.price <= filters.priceMax!);
    if (filters.inStock) list = list.filter((p) => p.inStock);

    switch (sort) {
      case 'price-low': list.sort((a, b) => a.price - b.price); break;
      case 'price-high': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'newest': list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'name-az': list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return list;
  }, [filters, sort]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const setFilter = (key: keyof ProductFilters, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const activeFilterCount = [
    filters.category, filters.country, filters.search,
    filters.priceMin, filters.priceMax, filters.inStock,
  ].filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Page header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-soft)', padding: '2rem 0' }}>
        <div className="section-container">
          <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--brand-dark)', marginBottom: '0.5rem' }}>
            {filters.category ? categories.find((c) => c.id === filters.category)?.name ?? 'All Gifts' : filters.search ? `Results for "${filters.search}"` : 'All Gifts'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {filtered.length} gift{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="section-container" style={{ padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Sidebar filters — desktop */}
          <aside
            style={{
              width: '240px', flexShrink: 0,
              display: sidebarOpen ? 'block' : 'none',
              position: 'fixed', inset: '0', zIndex: 200, background: 'white', overflowY: 'auto', padding: '1.5rem',
            }}
            className="lg:!block lg:!relative lg:!inset-auto lg:!z-auto lg:!bg-transparent lg:!p-0 lg:!overflow-visible"
          >
            {/* Mobile sidebar header */}
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Filters</span>
              <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border-soft)', padding: '1.25rem' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Filter size={16} /> Filters
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    style={{ fontSize: '0.775rem', color: 'var(--brand-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Category
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <input type="radio" name="cat" value="" checked={!filters.category} onChange={() => setFilter('category', '')} style={{ accentColor: 'var(--brand-primary)' }} />
                    All Categories
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <input type="radio" name="cat" value={cat.id} checked={filters.category === cat.id} onChange={() => setFilter('category', cat.id)} style={{ accentColor: 'var(--brand-primary)' }} />
                      <CategoryIcon categoryId={cat.id} size={14} style={{ color: 'var(--brand-primary)' }} />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery country */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Deliver To
                </h4>
                <select
                  value={filters.country ?? ''}
                  onChange={(e) => setFilter('country', e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', border: '1.5px solid var(--border-primary)', borderRadius: '8px', fontSize: '0.875rem', background: 'white', color: 'var(--text-primary)', outline: 'none' }}
                >
                  {deliveryCountries.map((c) => (
                    <option key={c.code} value={c.code === 'all' ? '' : c.code}>
                      {c.code === 'all' ? 'All Destinations' : `[${c.code.toUpperCase()}] ${c.name}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price range */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Price Range (USD)
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input type="number" placeholder="Min" min="0" value={filters.priceMin ?? ''}
                    onChange={(e) => setFilter('priceMin', e.target.value ? Number(e.target.value) : undefined)}
                    style={{ width: '80px', padding: '0.5rem', border: '1.5px solid var(--border-primary)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
                  />
                  <span style={{ color: 'var(--text-muted)' }}>–</span>
                  <input type="number" placeholder="Max" min="0" value={filters.priceMax ?? ''}
                    onChange={(e) => setFilter('priceMax', e.target.value ? Number(e.target.value) : undefined)}
                    style={{ width: '80px', padding: '0.5rem', border: '1.5px solid var(--border-primary)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }}
                  />
                </div>
              </div>

              {/* In stock */}
              <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={!!filters.inStock} onChange={(e) => setFilter('inStock', e.target.checked || undefined)} style={{ accentColor: 'var(--brand-primary)', width: '16px', height: '16px' }} />
                In stock only
              </label>
            </div>
          </aside>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 199 }}
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2"
                style={{ padding: '0.6rem 1rem', background: 'white', border: '1.5px solid var(--border-primary)', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <SlidersHorizontal size={16} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>

              {/* Search */}
              <input
                type="search"
                placeholder="Search gifts..."
                value={filters.search ?? ''}
                onChange={(e) => setFilter('search', e.target.value)}
                style={{ flex: 1, minWidth: '160px', maxWidth: '300px', padding: '0.6rem 1rem', border: '1.5px solid var(--border-primary)', borderRadius: '8px', fontSize: '0.875rem', outline: 'none', background: 'white' }}
              />

              {/* Sort */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value as SortOption); setPage(1); }}
                  style={{ padding: '0.6rem 0.75rem', border: '1.5px solid var(--border-primary)', borderRadius: '8px', fontSize: '0.875rem', background: 'white', color: 'var(--text-secondary)', outline: 'none', cursor: 'pointer' }}
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category filter pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setFilter('category', '')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.45rem 1rem', borderRadius: '100px', fontSize: '0.825rem', fontWeight: 600,
                  border: '1.5px solid',
                  borderColor: !filters.category ? 'var(--brand-primary)' : 'var(--border-primary)',
                  background: !filters.category ? 'var(--brand-primary)' : 'white',
                  color: !filters.category ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                }}
              >
                <Gift size={14} /> All Gifts
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter('category', cat.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.45rem 1rem', borderRadius: '100px', fontSize: '0.825rem', fontWeight: 600,
                    border: '1.5px solid',
                    borderColor: filters.category === cat.id ? 'var(--brand-primary)' : 'var(--border-primary)',
                    background: filters.category === cat.id ? 'var(--brand-primary)' : 'white',
                    color: filters.category === cat.id ? 'white' : 'var(--text-secondary)',
                    cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                >
                  <CategoryIcon categoryId={cat.id} size={14} />
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Grid */}
            {paged.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'white', borderRadius: '16px', border: '1px solid var(--border-soft)' }}>
                <Gift size={48} style={{ color: 'var(--border-primary)', margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.4rem', color: 'var(--brand-dark)', marginBottom: '0.75rem' }}>No gifts found</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Try adjusting your filters or search term.</p>
                <button onClick={clearFilters} style={{ padding: '0.75rem 1.5rem', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {paged.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1.5px solid var(--border-primary)', background: 'white', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, fontSize: '0.875rem' }}
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    style={{
                      padding: '0.5rem 0.875rem', borderRadius: '8px', border: '1.5px solid',
                      borderColor: p === page ? 'var(--brand-primary)' : 'var(--border-primary)',
                      background: p === page ? 'var(--brand-primary)' : 'white',
                      color: p === page ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer', fontWeight: p === page ? 700 : 400, fontSize: '0.875rem',
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1.5px solid var(--border-primary)', background: 'white', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.4 : 1, fontSize: '0.875rem' }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
