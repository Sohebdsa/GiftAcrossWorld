import Link from 'next/link';
import { Gift, Mail, Phone, MessageCircle } from 'lucide-react';
import { categories } from '@/data/products';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterXIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer style={{ background: 'var(--brand-dark)', color: 'white' }}>
      {/* Top section */}
      <div className="section-container" style={{ padding: '3.5rem 1.5rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
          {/* Brand & Corporate Details */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Gift size={24} style={{ color: 'var(--brand-primary)' }} />
              <span style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.25rem', fontWeight: 700 }}>
                Gift<span style={{ color: 'var(--brand-primary)' }}>Across</span>World
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: '#e5d7da', lineHeight: 1.6, marginBottom: '0.5rem', fontWeight: 500 }}>
              A flagship brand of <strong style={{ color: 'white' }}>R. Gifting</strong>.
            </p>
            <p style={{ fontSize: '0.825rem', color: '#a8979a', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Spreading happiness, one thoughtful gift at a time. Delivering love, emotion, and celebrations across international borders.
            </p>
            <div className="flex gap-3">
              {[
                { icon: InstagramIcon, label: 'Instagram', href: '#' },
                { icon: FacebookIcon, label: 'Facebook', href: '#' },
                { icon: TwitterXIcon, label: 'Twitter / X', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#c9b8bb', transition: 'all 0.2s',
                  }}
                  className="hover:!bg-[var(--brand-primary)] hover:!text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories with Lucide SVG Icons */}
          <div>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '1rem' }}>
              Shop By Category
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.id}`}
                    style={{ fontSize: '0.875rem', color: '#c9b8bb', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                    className="hover:text-white transition-colors"
                  >
                    <CategoryIcon categoryId={cat.id} size={15} style={{ color: 'var(--brand-primary)' }} />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '1rem' }}>
              Customer Navigation
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { label: 'All Gifts Collection', href: '/products' },
                { label: 'Bestseller Gifts', href: '/products?featured=true' },
                { label: 'My Account Dashboard', href: '/account' },
                { label: 'Track My Orders', href: '/account/orders' },
                { label: 'Saved Wishlist', href: '/wishlist' },
                { label: 'Shopping Cart', href: '/cart' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: '0.875rem', color: '#c9b8bb' }}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support & Corporate Information */}
          <div>
            <h3 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '1rem' }}>
              Customer Support
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <a
                  href="https://wa.me/919167261683?text=Hi%2C%20I%20need%20help%20with%20my%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  style={{ fontSize: '0.875rem', color: '#25D366', fontWeight: 600 }}
                >
                  <MessageCircle size={15} /> WhatsApp Support
                </a>
              </li>
              <li>
                <a
                  href="tel:+917045561683"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  style={{ fontSize: '0.875rem', color: '#c9b8bb' }}
                >
                  <Phone size={15} /> +91 7045561683
                </a>
              </li>
              <li>
                <a
                  href="tel:+919167261683"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  style={{ fontSize: '0.875rem', color: '#c9b8bb' }}
                >
                  <Phone size={15} /> +91 9167261683
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@giftacrossworld.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  style={{ fontSize: '0.875rem', color: '#c9b8bb' }}
                >
                  <Mail size={15} /> support@giftacrossworld.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar with legal & corporate declaration */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem 1.5rem', background: '#231b1e' }}>
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: '0.8rem', color: '#9e8c90' }}>
            © 2026 <strong>R. Gifting</strong>. All rights reserved. | GiftAcrossWorld™
          </p>
          <div className="flex gap-4 flex-wrap">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy', 'Refund Policy'].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: '0.775rem', color: '#8a7679' }}
                className="hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
