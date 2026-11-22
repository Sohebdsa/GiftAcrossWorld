import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';

const occasions = [
  {
    id: 'birthday',
    title: 'Birthday Celebrations',
    subtitle: 'Make their day unforgettable',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    tag: 'Most Popular',
    filter: 'birthday',
    accentColor: '#e87289',
  },
  {
    id: 'anniversary',
    title: 'Anniversary & Romance',
    subtitle: 'Celebrate your shared milestones',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80',
    tag: 'Heartfelt',
    filter: 'anniversary',
    accentColor: '#d65d75',
  },
  {
    id: 'celebration',
    title: 'Milestones & Congrats',
    subtitle: 'Graduations, promotions & new beginnings',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80',
    tag: 'Special Moments',
    filter: 'celebration',
    accentColor: '#c9a84c',
  },
  {
    id: 'thank-you',
    title: 'Thank You & Appreciation',
    subtitle: 'Express sincere gratitude across borders',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
    tag: 'Thoughtful',
    filter: 'thank-you',
    accentColor: '#7a9e82',
  },
];

export function OccasionsSection() {
  return (
    <section style={{ padding: '4.5rem 0', background: 'var(--bg-base)' }}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--brand-primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            <Sparkles size={16} /> Curated Collections
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--brand-dark)',
              marginBottom: '0.75rem',
            }}
          >
            Gifts for Every Occasion
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            Find the perfect expression of love, appreciation, or celebration, tailored for life's most meaningful moments.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {occasions.map((occ) => (
            <Link
              key={occ.id}
              href={`/products?search=${occ.filter}`}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '3/4',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.75rem',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-card)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="group hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Background image */}
              <Image
                src={occ.image}
                alt={occ.title}
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                className="group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(43, 34, 37, 0.92) 0%, rgba(43, 34, 37, 0.45) 50%, rgba(43, 34, 37, 0.15) 100%)',
                  zIndex: 1,
                }}
              />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2, color: 'white' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '100px',
                    marginBottom: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {occ.tag}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    marginBottom: '0.35rem',
                    lineHeight: 1.25,
                  }}
                >
                  {occ.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: 1.4,
                    marginBottom: '1rem',
                  }}
                >
                  {occ.subtitle}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--brand-primary-light)',
                    transition: 'gap 0.2s',
                  }}
                  className="group-hover:gap-2"
                >
                  Explore Collection <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
