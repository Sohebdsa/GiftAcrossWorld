import { deliveryCountries } from '@/data/products';
import Link from 'next/link';
import { Globe, MapPin } from 'lucide-react';

export function DeliveryCountriesBar() {
  return (
    <div
      style={{
        background: 'white',
        borderBottom: '1px solid var(--border-soft)',
        padding: '0.875rem 0',
        overflowX: 'auto',
      }}
    >
      <div className="section-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap', marginRight: '0.25rem', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Globe size={14} style={{ color: 'var(--brand-primary)' }} /> Deliver to:
          </span>
          {deliveryCountries.slice(1).map((country) => (
            <Link
              key={country.code}
              href={`/products?country=${country.code}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.4rem 0.95rem',
                borderRadius: '100px',
                fontSize: '0.8rem', fontWeight: 600,
                whiteSpace: 'nowrap',
                background: 'var(--bg-base)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-soft)',
                transition: 'all 0.15s',
              }}
              className="hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary-pale)]"
            >
              <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 5px', borderRadius: '4px', background: 'var(--brand-primary-pale)', color: 'var(--brand-primary-dark)' }}>
                {country.code.toUpperCase()}
              </span>
              <span>{country.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
