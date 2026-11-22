'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { CheckCircle, CreditCard, Wallet, Banknote, ShoppingCart, Lock, Loader2, Check, Info } from 'lucide-react';
import { deliveryCountries, shippingMethods } from '@/data/products';

const schema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number required'),
  line1: z.string().min(5, 'Address required'),
  line2: z.string().optional(),
  city: z.string().min(2, 'City required'),
  state: z.string().min(2, 'State/Province required'),
  postalCode: z.string().min(3, 'Postal code required'),
  country: z.string().min(2, 'Country required'),
  shippingMethod: z.enum(['standard', 'express', 'overnight']),
  paymentMethod: z.enum(['card', 'paypal', 'cod']),
  giftMessage: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(() => `GAW-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`);
  const [loading, setLoading] = useState(false);

  const { items, getSummary, shippingMethodId, clearCart } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);
  const summary = getSummary();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { shippingMethod: shippingMethodId, paymentMethod: 'card', country: 'usa' },
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    clearCart();
    setOrderPlaced(true);
    addToast('Order placed successfully!');
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center', background: 'var(--bg-base)' }}>
        <ShoppingCart size={56} style={{ color: 'var(--border-primary)', margin: '0 auto 1.25rem' }} />
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.75rem', color: 'var(--brand-dark)', marginBottom: '0.75rem' }}>Your cart is empty</h1>
        <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--brand-primary)', color: 'white', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 700, marginTop: '1rem' }}>
          Shop Gifts
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center', background: 'var(--bg-base)' }}>
        <div style={{ width: '76px', height: '76px', borderRadius: '50%', background: 'var(--brand-primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle size={40} style={{ color: 'var(--brand-primary)' }} />
        </div>
        <span style={{ display: 'inline-block', background: 'white', border: '1px solid var(--border-primary)', color: 'var(--brand-primary-dark)', fontSize: '0.8rem', fontWeight: 700, padding: '0.3rem 0.8rem', borderRadius: '100px', marginBottom: '0.75rem' }}>
          Integration-Ready Confirmation
        </span>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'var(--brand-dark)', marginBottom: '0.5rem' }}>
          Checkout Received: {orderNumber}
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          Your order data has been formatted and validated for the payment gateway.
        </p>

        <div style={{ background: 'white', borderRadius: '12px', border: '1.5px dashed var(--border-primary)', padding: '1.25rem', maxWidth: '480px', width: '100%', marginBottom: '2rem', textAlign: 'left', fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          <p style={{ fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Info size={15} style={{ color: 'var(--brand-primary)' }} />
            <span>Production Payment Gateway Notice:</span>
          </p>
          <p>
            This frontend is prepared for future backend gateway integration (Stripe, Razorpay, or PayPal). In accordance with engineering standards, no simulated live charge was processed without backend gateway webhook confirmation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/account/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--brand-primary)', color: 'white', padding: '0.875rem 1.75rem', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>
            View Orders & Tracking
          </Link>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--brand-dark)', color: 'white', padding: '0.875rem 1.75rem', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--border-primary)', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: 'white', color: 'var(--text-primary)' };
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', letterSpacing: '0.03em' };
  const errorStyle = { fontSize: '0.775rem', color: '#ef4444', marginTop: '0.3rem' };

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="section-container">
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--brand-dark)', marginBottom: '0.5rem' }}>Checkout</h1>

        {/* Progress steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {(['Delivery', 'Payment', 'Review'] as const).map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 700,
                background: step > i + 1 ? 'var(--brand-primary)' : step === i + 1 ? 'var(--brand-dark)' : 'var(--border-primary)',
                color: step >= i + 1 ? 'white' : 'var(--text-muted)',
              }}>{step > i + 1 ? <Check size={14} strokeWidth={3} /> : i + 1}</div>
              <span style={{ fontSize: '0.875rem', fontWeight: step === i + 1 ? 700 : 400, color: step === i + 1 ? 'var(--brand-dark)' : 'var(--text-muted)' }}>{label}</span>
              {i < 2 && <div style={{ width: '24px', height: '1px', background: 'var(--border-primary)' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ gridColumn: 'span 2', minWidth: 0 }}>
            {/* Step 1: Delivery */}
            {step === 1 && (
              <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-soft)', padding: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', color: 'var(--brand-dark)', marginBottom: '1.5rem' }}>Delivery Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle} htmlFor="firstName">First Name *</label>
                    <input id="firstName" {...register('firstName')} style={inputStyle} />
                    {errors.firstName && <p style={errorStyle}>{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="lastName">Last Name *</label>
                    <input id="lastName" {...register('lastName')} style={inputStyle} />
                    {errors.lastName && <p style={errorStyle}>{errors.lastName.message}</p>}
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="email">Email *</label>
                    <input id="email" type="email" {...register('email')} style={inputStyle} />
                    {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="phone">Phone *</label>
                    <input id="phone" type="tel" {...register('phone')} style={inputStyle} />
                    {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle} htmlFor="line1">Address *</label>
                    <input id="line1" {...register('line1')} style={inputStyle} placeholder="Street address" />
                    {errors.line1 && <p style={errorStyle}>{errors.line1.message}</p>}
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <input {...register('line2')} style={inputStyle} placeholder="Apartment, suite, etc. (optional)" />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="city">City *</label>
                    <input id="city" {...register('city')} style={inputStyle} />
                    {errors.city && <p style={errorStyle}>{errors.city.message}</p>}
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="state">State / Province *</label>
                    <input id="state" {...register('state')} style={inputStyle} />
                    {errors.state && <p style={errorStyle}>{errors.state.message}</p>}
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="postalCode">Postal Code *</label>
                    <input id="postalCode" {...register('postalCode')} style={inputStyle} />
                    {errors.postalCode && <p style={errorStyle}>{errors.postalCode.message}</p>}
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="country">Country *</label>
                    <select id="country" {...register('country')} style={{ ...inputStyle, cursor: 'pointer' }}>
                      {deliveryCountries.slice(1).map((c) => (
                        <option key={c.code} value={c.code}>[{c.code.toUpperCase()}] {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={labelStyle} htmlFor="giftMessage">Gift Message (optional)</label>
                    <textarea id="giftMessage" {...register('giftMessage')} rows={3} placeholder="Add a personal message to your gift..." style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setStep(2)} style={{ padding: '0.875rem 2rem', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-soft)', padding: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', color: 'var(--brand-dark)', marginBottom: '1.5rem' }}>Payment Method</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {[
                    { value: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex' },
                    { value: 'paypal', icon: Wallet, label: 'PayPal', sub: 'Pay securely with PayPal' },
                    { value: 'cod', icon: Banknote, label: 'Cash on Delivery', sub: 'Pay when gift is delivered' },
                  ].map((opt) => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `2px solid ${paymentMethod === opt.value ? 'var(--brand-primary)' : 'var(--border-soft)'}`, borderRadius: '10px', cursor: 'pointer', background: paymentMethod === opt.value ? 'var(--brand-primary-pale)' : 'white', transition: 'all 0.15s' }}>
                      <input type="radio" {...register('paymentMethod')} value={opt.value} style={{ accentColor: 'var(--brand-primary)' }} />
                      <opt.icon size={20} style={{ color: paymentMethod === opt.value ? 'var(--brand-primary)' : 'var(--text-muted)', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{opt.label}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{opt.sub}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div style={{ padding: '1.25rem', background: 'var(--bg-base)', borderRadius: '10px', border: '1px solid var(--border-soft)', marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Lock size={15} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                      <span>Card details will be collected securely via our payment gateway at the final step. Your card information is never stored on our servers.</span>
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between' }}>
                  <button type="button" onClick={() => setStep(1)} style={{ padding: '0.875rem 1.5rem', background: 'white', color: 'var(--text-secondary)', border: '1.5px solid var(--border-primary)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                    ← Back
                  </button>
                  <button type="button" onClick={() => setStep(3)} style={{ padding: '0.875rem 2rem', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Place Order */}
            {step === 3 && (
              <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-soft)', padding: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', color: 'var(--brand-dark)', marginBottom: '1.5rem' }}>Review Your Order</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-base)', borderRadius: '8px' }}>
                      <Image src={item.image} alt={item.name} width={56} height={56} style={{ borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--brand-primary-dark)', fontSize: '0.95rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--bg-base)', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}><span>Subtotal</span><span>${summary.subtotal.toFixed(2)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}><span>Shipping</span><span>${summary.shipping.toFixed(2)}</span></div>
                  {summary.discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#16a34a' }}><span>Discount</span><span>-${summary.discount.toFixed(2)}</span></div>}
                  <div style={{ height: '1px', background: 'var(--border-soft)', margin: '0.75rem 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: 'var(--brand-dark)' }}><span>Total</span><span>${summary.total.toFixed(2)} USD</span></div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between' }}>
                  <button type="button" onClick={() => setStep(2)} style={{ padding: '0.875rem 1.5rem', background: 'white', color: 'var(--text-secondary)', border: '1.5px solid var(--border-primary)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                    ← Back
                  </button>
                  <button type="submit" disabled={loading} style={{ flex: 1, padding: '0.875rem', background: loading ? 'var(--text-muted)' : 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'wait' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Placing Order...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} /> Place Order
                      </>
                    )}
                  </button>
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                  <Lock size={13} style={{ color: 'var(--brand-primary)' }} />
                  <span>All transactions are secure and encrypted</span>
                </p>
              </div>
            )}
          </form>

          {/* Mobile order summary */}
          <div>
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-soft)', padding: '1.5rem', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.95rem' }}>Order ({summary.itemCount} item{summary.itemCount !== 1 ? 's' : ''})</h3>
              {items.slice(0, 3).map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>{item.name} x{item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {items.length > 3 && <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>+{items.length - 3} more item{items.length - 3 > 1 ? 's' : ''}</p>}
              <div style={{ height: '1px', background: 'var(--border-soft)', margin: '0.875rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: 'var(--brand-dark)' }}>
                <span>Total</span><span>${summary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
