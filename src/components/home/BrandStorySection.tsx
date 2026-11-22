import { Globe, Truck, Shield, Heart } from 'lucide-react';

export function BrandStorySection() {
  const values = [
    {
      icon: Globe,
      title: 'Worldwide Delivery',
      desc: 'We deliver to 7+ countries including USA, UK, Canada, Australia, Germany, New Zealand & Malaysia.',
    },
    {
      icon: Truck,
      title: 'Fast & Reliable',
      desc: 'From standard to next-day delivery — we ensure your gift arrives on time, every time.',
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      desc: 'Every product is carefully selected and quality-checked before it reaches your loved ones.',
    },
    {
      icon: Heart,
      title: 'Made With Love',
      desc: 'We pour genuine care into every order. Your joy is our greatest reward.',
    },
  ];

  return (
    <section style={{ padding: '4rem 0', background: 'white' }}>
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Story text */}
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '0.75rem' }}>
              Our Story
            </p>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--brand-dark)', marginBottom: '1.25rem', lineHeight: 1.3 }}>
              Why GiftAcrossWorld?
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Distance should never stop love. We started GiftAcrossWorld with a simple belief — every special person deserves to feel remembered, no matter where they are in the world.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem' }}>
              From Mumbai to London, from Delhi to Toronto — we bridge the miles between you and your loved ones with thoughtfully curated gifts, delivered with the warmth they deserve.
            </p>
          </div>

          {/* Values grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: '1.25rem',
                  background: 'var(--bg-base)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-soft)',
                }}
              >
                <div
                  style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'var(--brand-primary-pale)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}
                >
                  <Icon size={18} style={{ color: 'var(--brand-primary)' }} />
                </div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
