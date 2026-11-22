'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { Gift, Sparkles, ShoppingCart, ArrowRight, Heart, Home, Briefcase, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

const recipientOptions = [
  { id: 'partner', label: 'Partner / Spouse', icon: Heart },
  { id: 'parent', label: 'Parents / Family', icon: Home },
  { id: 'friend', label: 'Best Friend', icon: Sparkles },
  { id: 'colleague', label: 'Colleague / Client', icon: Briefcase },
];

const budgetOptions = [
  { id: 'under-40', label: 'Under $40', max: 40, min: 0 },
  { id: '40-60', label: '$40 – $60', min: 40, max: 60 },
  { id: 'over-60', label: '$60 & Above', min: 60, max: 999 },
];

export function GiftRecommendationSection() {
  const [recipient, setRecipient] = useState('partner');
  const [budget, setBudget] = useState('40-60');

  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  // Filter recommendations based on selection
  const budgetObj = budgetOptions.find((b) => b.id === budget) || budgetOptions[1];
  const recommendations = products
    .filter((p) => p.price >= budgetObj.min && p.price <= budgetObj.max)
    .slice(0, 3);

  // Fallback if none match
  const displayProducts = recommendations.length > 0 ? recommendations : products.slice(0, 3);

  const handleQuickAdd = (product: (typeof products)[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || '',
      quantity: 1,
    });
    addToast(`"${product.name}" added to cart`);
  };

  return (
    <section style={{ padding: '4.5rem 0', background: 'white' }}>
      <div className="section-container">
        <div
          style={{
            background: 'linear-gradient(135deg, #fff0f3 0%, #ffffff 60%, #fce8ed 100%)',
            borderRadius: '24px',
            border: '2px solid var(--border-soft)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--brand-primary)',
                fontSize: '0.825rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              <Sparkles size={16} /> Interactive Assistant
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                color: 'var(--brand-dark)',
                marginBottom: '0.75rem',
              }}
            >
              Find the Perfect Gift in Seconds
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', maxWidth: '480px', margin: '0 auto' }}>
              Select who you're surprising and your target budget — we'll tailor the best recommendations instantly.
            </p>
          </div>

          {/* Interactive Selectors */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              maxWidth: '720px',
              margin: '0 auto 3rem',
            }}
          >
            {/* Recipient */}
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '0.65rem', textAlign: 'center' }}>
                1. Who are you gifting?
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
                {recipientOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setRecipient(opt.id)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: `2px solid ${recipient === opt.id ? 'var(--brand-primary)' : 'var(--border-primary)'}`,
                        background: recipient === opt.id ? 'var(--brand-primary)' : 'white',
                        color: recipient === opt.id ? 'white' : 'var(--text-secondary)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease',
                        boxShadow: recipient === opt.id ? '0 4px 12px rgba(232, 114, 137, 0.25)' : 'none',
                      }}
                    >
                      <Icon size={16} />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '0.65rem', textAlign: 'center' }}>
                2. Target Budget (USD)
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {budgetOptions.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBudget(b.id)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: `2px solid ${budget === b.id ? 'var(--brand-primary)' : 'var(--border-primary)'}`,
                      background: budget === b.id ? 'var(--brand-primary)' : 'white',
                      color: budget === b.id ? 'white' : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: budget === b.id ? '0 4px 12px rgba(232, 114, 137, 0.25)' : 'none',
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1.25rem',
                color: 'var(--brand-dark)',
                marginBottom: '1.25rem',
                textAlign: 'center',
              }}
            >
              Recommended For Your Selection:
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {displayProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    background: 'white',
                    borderRadius: '14px',
                    border: '1px solid var(--border-soft)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.25s',
                  }}
                  className="hover:shadow-lg hover:-translate-y-1"
                >
                  <Link href={`/products/${product.slug}`} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', display: 'block', background: 'var(--bg-base)' }}>
                    <Image
                      src={product.images[0]?.url || ''}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <CategoryIcon categoryId={product.categoryId} size={13} /> {product.category.name}
                      </p>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                        <Link href={`/products/${product.slug}`} className="hover:text-[var(--brand-primary)]">
                          {product.name}
                        </Link>
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                        {product.shortDescription}
                      </p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-primary-dark)' }}>
                          ${product.price.toFixed(2)} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>USD</span>
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Check size={12} strokeWidth={2.5} /> Express Available
                        </span>
                      </div>

                      <button
                        onClick={() => handleQuickAdd(product)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          padding: '0.7rem',
                          background: 'var(--brand-primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        className="hover:bg-[var(--brand-primary-dark)]"
                      >
                        <ShoppingCart size={15} /> Quick Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer link */}
          <div style={{ textAlign: 'center' }}>
            <Link
              href="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--brand-dark)',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}
              className="hover:text-[var(--brand-primary)]"
            >
              Browse entire catalogue ({products.length} gifts) <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
