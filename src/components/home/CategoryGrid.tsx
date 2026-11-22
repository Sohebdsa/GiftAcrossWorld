import Link from 'next/link';
import { categories } from '@/data/products';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

export function CategoryGrid() {
  return (
    <section style={{ background: 'white', padding: '4rem 0' }}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '0.5rem' }}>
            Browse by Category
          </p>
          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--brand-dark)', marginBottom: '0.75rem' }}>
            What Are You Looking For?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '460px', margin: '0 auto' }}>
            Explore our curated selection of gifts for every occasion and recipient.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1rem',
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '1.25rem 1rem',
                background: 'var(--bg-base)',
                borderRadius: '12px',
                border: '1.5px solid var(--border-soft)',
                transition: 'all 0.2s ease',
                textAlign: 'center',
                gap: '0.75rem',
              }}
              className="group hover:border-[var(--brand-primary)] hover:shadow-md hover:-translate-y-1"
            >
              <div
                style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'transform 0.2s',
                  border: '1px solid var(--border-soft)',
                }}
                className="group-hover:scale-110"
              >
                <CategoryIcon categoryId={cat.id} size={28} style={{ color: 'var(--brand-primary)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {cat.name}
                </h3>
                {cat.productCount && (
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {cat.productCount} gifts
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
