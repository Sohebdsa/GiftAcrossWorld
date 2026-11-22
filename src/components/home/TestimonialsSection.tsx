import { testimonials } from '@/data/products';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section style={{ padding: '4rem 0', background: 'var(--brand-primary-pale)' }}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '0.5rem' }}>
            Customer Stories
          </p>
          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--brand-dark)' }}>
            Gifting Moments That Matter
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                background: 'white',
                borderRadius: '14px',
                padding: '1.5rem',
                border: '1px solid var(--border-soft)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Quote size={24} style={{ color: 'var(--brand-primary)', opacity: 0.3 }} />

              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < t.rating ? '#c9a84c' : 'none'}
                    stroke={i < t.rating ? '#c9a84c' : '#d1d5db'}
                  />
                ))}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>
                "{t.comment}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</p>
                  <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{t.countryFlag}</p>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                  {new Date(t.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
