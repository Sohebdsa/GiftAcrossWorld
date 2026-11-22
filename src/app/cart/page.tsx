'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Tag, X, Truck, ShoppingCart, Lock } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { shippingMethods } from '@/data/products';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, applyCoupon, removeCoupon, couponCode, couponError, couponSuccess, shippingMethodId, setShippingMethod, getSummary } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);
  const [couponInput, setCouponInput] = useState('');
  const summary = getSummary();

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    addToast(`"${name}" removed from cart`, 'info');
  };

  const handleApplyCoupon = () => {
    applyCoupon(couponInput);
    setCouponInput('');
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center', background: 'var(--bg-base)' }}>
        <ShoppingCart size={64} style={{ color: 'var(--border-primary)', margin: '0 auto 1.25rem' }} />
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.75rem', color: 'var(--brand-dark)', marginBottom: '0.75rem' }}>Your cart is empty</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '360px', lineHeight: 1.6 }}>
          Looks like you haven't added any gifts yet. Explore our collection and find something special.
        </p>
        <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--brand-primary)', color: 'white', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 700 }}>
          <ShoppingBag size={18} /> Shop Gifts
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="section-container">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }} className="hover:text-[var(--brand-primary)]">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--brand-dark)', marginBottom: '2rem' }}>
          Shopping Cart ({summary.itemCount} item{summary.itemCount !== 1 ? 's' : ''})
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Cart items */}
          <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-soft)', overflow: 'hidden' }}>
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', gap: '1rem', padding: '1.25rem 1.5rem',
                    borderBottom: idx < items.length - 1 ? '1px solid var(--border-soft)' : 'none',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-soft)' }}>
                    <Image src={item.image} alt={item.name} width={80} height={80} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--brand-primary-dark)', marginBottom: '0.6rem' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-primary)', borderRadius: '6px', overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '32px', height: '32px', background: 'var(--bg-base)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                          <Minus size={12} />
                        </button>
                        <span style={{ width: '36px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '32px', height: '32px', background: 'var(--bg-base)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => handleRemove(item.id, item.name)} aria-label="Remove item" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', padding: '0.25rem' }} className="hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary sidebar */}
          <div style={{ position: 'sticky', top: '100px' }}>
            {/* Shipping method */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-soft)', padding: '1.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                <Truck size={16} style={{ color: 'var(--brand-primary)' }} /> Shipping Method
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {shippingMethods.map((m) => (
                  <label key={m.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', border: `1.5px solid ${shippingMethodId === m.id ? 'var(--brand-primary)' : 'var(--border-soft)'}`, borderRadius: '8px', background: shippingMethodId === m.id ? 'var(--brand-primary-pale)' : 'white', transition: 'all 0.15s' }}>
                    <input type="radio" name="shipping" value={m.id} checked={shippingMethodId === m.id} onChange={() => setShippingMethod(m.id)} style={{ accentColor: 'var(--brand-primary)', marginTop: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--brand-primary-dark)' }}>${m.price.toFixed(2)}</span>
                      </div>
                      <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{m.estimatedDays}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-soft)', padding: '1.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                <Tag size={16} style={{ color: 'var(--brand-primary)' }} /> Coupon Code
              </h3>
              {couponCode ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--brand-primary-pale)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--brand-primary-dark)', fontFamily: 'monospace', fontSize: '1rem' }}>{couponCode}</span>
                    {couponSuccess && <p style={{ fontSize: '0.78rem', color: 'var(--accent-sage)', marginTop: '0.2rem' }}>{couponSuccess}</p>}
                  </div>
                  <button onClick={removeCoupon} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand-primary)' }}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    style={{ flex: 1, padding: '0.6rem 0.875rem', border: '1.5px solid var(--border-primary)', borderRadius: '8px', fontSize: '0.875rem', outline: 'none', letterSpacing: '0.05em', fontFamily: 'monospace' }}
                  />
                  <button onClick={handleApplyCoupon} style={{ padding: '0.6rem 1rem', background: 'var(--brand-dark)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    Apply
                  </button>
                </div>
              )}
              {couponError && <p style={{ fontSize: '0.78rem', color: '#ef4444', marginTop: '0.5rem' }}>{couponError}</p>}
            </div>

            {/* Order summary */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-soft)', padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span><span>${summary.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>Shipping</span><span>${summary.shipping.toFixed(2)}</span>
                </div>
                {summary.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#16a34a' }}>
                    <span>Discount</span><span>-${summary.discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div style={{ height: '1px', background: 'var(--border-soft)', margin: '1rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', color: 'var(--brand-dark)', marginBottom: '1.25rem' }}>
                <span>Total</span><span>${summary.total.toFixed(2)} USD</span>
              </div>
              <Link
                href="/checkout"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: 'var(--brand-primary)', color: 'white', padding: '1rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s' }}
                className="hover:bg-[var(--brand-primary-dark)]"
              >
                Proceed to Checkout →
              </Link>
              <p style={{ textAlign: 'center', fontSize: '0.775rem', color: 'var(--text-subtle)', marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                <Lock size={13} style={{ color: 'var(--brand-primary)' }} />
                <span>Secure checkout · SSL encrypted</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
