'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2, Gift } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { products } from '@/data/products';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

export default function WishlistPage() {
  const { productIds, removeFromWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  const wishlistProducts = products.filter((p) => productIds.includes(p.id));

  const handleMoveToCart = (product: (typeof products)[0]) => {
    addItem({ productId: product.id, name: product.name, price: product.price, image: product.images[0]?.url ?? '', quantity: 1 });
    removeFromWishlist(product.id);
    addToast(`"${product.name}" moved to cart`);
  };

  const handleRemove = (product: (typeof products)[0]) => {
    removeFromWishlist(product.id);
    addToast(`"${product.name}" removed from wishlist`, 'info');
  };

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="section-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Heart size={24} style={{ color: 'var(--brand-primary)' }} />
          <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--brand-dark)' }}>
            My Wishlist ({wishlistProducts.length})
          </h1>
        </div>

        {wishlistProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
            <Heart size={56} style={{ color: 'var(--border-primary)', margin: '0 auto 1.25rem' }} />
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.6rem', color: 'var(--brand-dark)', marginBottom: '0.75rem' }}>
              Your wishlist is empty
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '360px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Save your favourite gifts by clicking the heart icon on any product.
            </p>
            <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--brand-primary)', color: 'white', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 700 }}>
              <Gift size={18} /> Discover Gifts
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  style={{ background: 'white', borderRadius: '14px', border: '1px solid var(--border-soft)', overflow: 'hidden', boxShadow: 'var(--shadow-card)', transition: 'box-shadow 0.2s' }}
                  className="hover:shadow-md"
                >
                  <Link href={`/products/${product.slug}`} style={{ display: 'block', aspectRatio: '4/3', position: 'relative', overflow: 'hidden', background: 'var(--bg-base)' }}>
                    <Image src={product.images[0]?.url ?? ''} alt={product.images[0]?.alt ?? product.name} fill style={{ objectFit: 'cover', transition: 'transform 0.3s' }} className="hover:scale-105" sizes="(max-width: 640px) 50vw, 33vw" />
                  </Link>
                  <div style={{ padding: '1rem' }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CategoryIcon categoryId={product.categoryId} size={13} />
                      <span>{product.category.name}</span>
                    </p>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      <Link href={`/products/${product.slug}`} className="hover:text-[var(--brand-primary)]">{product.name}</Link>
                    </h3>
                    <p style={{ color: 'var(--brand-primary-dark)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.875rem' }}>
                      ${product.price.toFixed(2)} <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 400 }}>USD</span>
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleMoveToCart(product)}
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.65rem', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '7px', fontWeight: 600, fontSize: '0.825rem', cursor: 'pointer', transition: 'all 0.2s' }}
                        className="hover:bg-[var(--brand-primary-dark)]"
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemove(product)}
                        aria-label="Remove from wishlist"
                        style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', border: '1.5px solid var(--border-soft)', borderRadius: '7px', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.15s' }}
                        className="hover:border-red-300 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
              <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-primary)', fontWeight: 600, fontSize: '0.9rem' }}
                className="hover:underline">
                Continue Shopping →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
