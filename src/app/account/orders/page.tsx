'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { sampleOrders } from '@/data/products';
import { Package, ArrowLeft, MapPin, CreditCard, ChevronDown, ChevronUp, Clock, Truck, CheckCircle2, Phone } from 'lucide-react';

const statusColors: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: '#fef3c7', color: '#d97706', label: 'Pending' },
  confirmed: { bg: '#dbeafe', color: '#2563eb', label: 'Confirmed' },
  processing: { bg: '#ede9fe', color: '#7c3aed', label: 'Processing' },
  shipped: { bg: '#d1fae5', color: '#059669', label: 'Shipped' },
  delivered: { bg: '#dcfce7', color: '#16a34a', label: 'Delivered' },
  cancelled: { bg: '#fee2e2', color: '#dc2626', label: 'Cancelled' },
};

export default function OrdersPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(sampleOrders[0]?.id || null);

  useEffect(() => {
    if (!isAuthenticated) router.replace('/auth/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="section-container" style={{ maxWidth: '900px' }}>
        <Link
          href="/account"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}
          className="hover:text-[var(--brand-primary)]"
        >
          <ArrowLeft size={16} /> My Account
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Package size={26} style={{ color: 'var(--brand-primary)' }} />
            <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--brand-dark)' }}>
              My Orders & Tracking
            </h1>
          </div>
          <Link
            href="/products"
            style={{
              padding: '0.65rem 1.25rem',
              background: 'white',
              border: '1.5px solid var(--border-primary)',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--brand-primary)',
              textDecoration: 'none',
            }}
            className="hover:bg-[var(--brand-primary-pale)]"
          >
            + Send Another Gift
          </Link>
        </div>

        {sampleOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1.5rem', background: 'white', borderRadius: '16px', border: '1px solid var(--border-soft)' }}>
            <Package size={56} style={{ color: 'var(--border-primary)', margin: '0 auto 1.25rem' }} />
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', color: 'var(--brand-dark)', marginBottom: '0.75rem' }}>No orders yet</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your order history and live parcel tracking will appear here.</p>
            <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--brand-primary)', color: 'white', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 700 }}>
              Shop Gifts
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {sampleOrders.map((order) => {
              const statusMeta = statusColors[order.status] ?? statusColors.pending;
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid var(--border-soft)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  {/* Order summary bar */}
                  <div
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.25rem 1.5rem',
                      borderBottom: isExpanded ? '1px solid var(--border-soft)' : 'none',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      cursor: 'pointer',
                      background: isExpanded ? '#fffafb' : 'white',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Order Number</p>
                      <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                        {order.orderNumber}
                      </p>
                    </div>

                    <div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Placed Date</p>
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Total Amount</p>
                      <p style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--brand-primary-dark)' }}>
                        ${order.total.toFixed(2)} USD
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          padding: '0.35rem 0.9rem',
                          borderRadius: '100px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          background: statusMeta.bg,
                          color: statusMeta.color,
                        }}
                      >
                        {statusMeta.label}
                      </span>
                      {isExpanded ? <ChevronUp size={20} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />}
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <div>
                      {/* Products list */}
                      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-soft)' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                          Items in this shipment ({order.items.length})
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {order.items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={64}
                                height={64}
                                style={{ borderRadius: '10px', objectFit: 'cover', border: '1px solid var(--border-soft)', flexShrink: 0 }}
                              />
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                  {item.name}
                                </p>
                                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                                  Quantity: <strong>{item.quantity}</strong> · ${item.price.toFixed(2)} each
                                </p>
                              </div>
                              <span style={{ fontWeight: 700, color: 'var(--brand-primary-dark)', fontSize: '1rem' }}>
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Address & Payment details */}
                      <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', borderBottom: '1px solid var(--border-soft)', background: '#fdfbfa' }}>
                        <div>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                            <MapPin size={15} style={{ color: 'var(--brand-primary)' }} /> Delivery Address
                          </h4>
                          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{order.shippingAddress.fullName}</p>
                          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {order.shippingAddress.line1}
                          </p>
                          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                          </p>
                          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            {order.shippingAddress.country}
                          </p>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Phone size={13} /> {order.shippingAddress.phone}
                          </p>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                            <CreditCard size={15} style={{ color: 'var(--brand-primary)' }} /> Payment & Billing
                          </h4>
                          <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>Payment Method:</span>
                              <strong style={{ textTransform: 'capitalize' }}>{order.paymentMethod}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>Subtotal:</span>
                              <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>Shipping:</span>
                              <span>${order.shipping.toFixed(2)}</span>
                            </div>
                            {order.discount > 0 && (
                              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                                <span>Discount ({order.couponCode}):</span>
                                <span>-${order.discount.toFixed(2)}</span>
                              </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: 'var(--brand-dark)', paddingTop: '0.4rem', borderTop: '1px solid var(--border-soft)' }}>
                              <span>Total Paid:</span>
                              <span>${order.total.toFixed(2)} USD</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Live Tracking Timeline */}
                      <div style={{ padding: '1.5rem', background: 'var(--bg-base)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Truck size={16} style={{ color: 'var(--brand-primary)' }} /> Shipment Progress
                          </span>
                          {order.estimatedDelivery && (
                            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', background: 'white', padding: '0.25rem 0.75rem', borderRadius: '100px', border: '1px solid var(--border-soft)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                              <Truck size={14} style={{ color: 'var(--brand-primary)' }} /> Estimated Arrival: <strong>{new Date(order.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</strong>
                            </span>
                          )}
                        </div>

                        {/* Interactive timeline step bar */}
                        <div style={{ display: 'flex', gap: '0', overflowX: 'auto', padding: '0.5rem 0 1rem' }}>
                          {order.timeline.map((step, i) => (
                            <div key={step.status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '90px', position: 'relative' }}>
                              {i < order.timeline.length - 1 && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '14px',
                                    left: '50%',
                                    right: '-50%',
                                    height: '3px',
                                    background: order.timeline[i + 1]?.completed ? 'var(--brand-primary)' : 'var(--border-primary)',
                                    zIndex: 0,
                                  }}
                                />
                              )}
                              <div
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  background: step.completed ? 'var(--brand-primary)' : 'white',
                                  border: `2px solid ${step.completed ? 'var(--brand-primary)' : 'var(--border-primary)'}`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  zIndex: 1,
                                  flexShrink: 0,
                                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                                }}
                              >
                                {step.completed ? (
                                  <CheckCircle2 size={16} style={{ color: 'white' }} />
                                ) : (
                                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-primary)' }} />
                                )}
                              </div>
                              <p
                                style={{
                                  fontSize: '0.75rem',
                                  textAlign: 'center',
                                  marginTop: '0.5rem',
                                  color: step.completed ? 'var(--brand-primary-dark)' : 'var(--text-muted)',
                                  fontWeight: step.completed ? 700 : 400,
                                  lineHeight: 1.3,
                                }}
                              >
                                {step.label}
                              </p>
                              {step.timestamp && (
                                <span style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', marginTop: '0.15rem' }}>
                                  {new Date(step.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
