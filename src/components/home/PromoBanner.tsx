import Link from 'next/link';
import { Gift, Zap } from 'lucide-react';

export function PromoBanner() {
  return (
    <section style={{ padding: '0 0 0' }}>
      <div className="section-container" style={{ padding: '0 1.5rem 2.5rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, var(--brand-dark) 0%, #3d2730 50%, #2b2225 100%)',
            borderRadius: '16px',
            padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative */}
          <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '200px', height: '200px', background: 'var(--brand-primary)', opacity: 0.07, borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-50px', left: '30%', width: '300px', height: '300px', background: 'var(--brand-primary)', opacity: 0.05, borderRadius: '50%' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
            <div className="flex items-center gap-2">
              <Zap size={16} style={{ color: 'var(--brand-primary-light)' }} fill="currentColor" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-primary-light)' }}>
                Limited Time Offer
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), serif',
                color: 'white',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Use Code <span style={{ color: 'var(--brand-primary)' }}>GIFT10</span> for{' '}
              <span style={{ color: 'var(--brand-primary)' }}>10% Off</span> Your First Order
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', maxWidth: '500px', lineHeight: 1.6 }}>
              Send a thoughtful gift today. Minimum order $30. Valid for all categories including flowers, cakes, chocolates and hampers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3" style={{ position: 'relative' }}>
            <Link
              href="/products"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--brand-primary)', color: 'white',
                padding: '0.85rem 1.75rem', borderRadius: '8px',
                fontWeight: 700, fontSize: '0.95rem',
                transition: 'all 0.2s',
              }}
              className="hover:bg-[var(--brand-primary-dark)] hover:-translate-y-0.5"
            >
              <Gift size={16} /> Shop Now
            </Link>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center',
                border: '1.5px dashed rgba(255,255,255,0.25)',
                borderRadius: '8px', padding: '0.85rem 1.5rem',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <span style={{ color: 'white', fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'monospace', fontSize: '1rem' }}>
                GIFT10
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
