import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

export function BestsellersSection() {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section style={{ padding: '4rem 0', background: 'white' }}>
      <div className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <TrendingUp size={14} /> Top Sellers
            </p>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--brand-dark)' }}>
              Most Loved Gifts
            </h2>
          </div>
          <Link
            href="/products?bestseller=true"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.9rem' }}
            className="hover:gap-2 transition-all"
          >
            See all bestsellers <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
