'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToastStore } from '@/store/toastStore';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const addToast = useToastStore((s) => s.addToast);

  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage?.url ?? '',
      quantity: 1,
    });
    addToast(`"${product.name}" added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    addToast(
      isInWishlist ? 'Removed from wishlist' : `"${product.name}" saved to wishlist`,
      isInWishlist ? 'info' : 'success'
    );
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      style={{
        display: 'block',
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--border-soft)',
        boxShadow: 'var(--shadow-card)',
        transition: 'all 0.25s ease',
        position: 'relative',
      }}
      className="group hover:shadow-lg hover:-translate-y-1"
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--bg-base)' }}>
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
            className="group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Badges */}
        <div style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {product.isSale && discountPercent && (
            <span style={{ background: '#ef4444', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '100px' }}>
              -{discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span style={{ background: 'var(--brand-primary)', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '100px' }}>
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span style={{ background: 'var(--brand-dark)', color: 'white', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '100px', letterSpacing: '0.04em' }}>
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute', top: '0.6rem', right: '0.6rem',
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'white', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            transition: 'all 0.2s',
          }}
          className="hover:scale-110"
        >
          <Heart
            size={15}
            fill={isInWishlist ? 'var(--brand-primary)' : 'none'}
            stroke={isInWishlist ? 'var(--brand-primary)' : '#7a6e70'}
          />
        </button>

        {/* Quick add overlay on hover */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(43,34,37,0.9), transparent)',
            padding: '2rem 0.75rem 0.75rem',
            transform: 'translateY(100%)',
            transition: 'transform 0.25s ease',
          }}
          className="group-hover:translate-y-0"
        >
          <button
            onClick={handleAddToCart}
            style={{
              width: '100%', background: 'var(--brand-primary)', color: 'white',
              border: 'none', borderRadius: '6px', padding: '0.5rem',
              fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
            }}
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '0.875rem' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <CategoryIcon categoryId={product.categoryId} size={13} style={{ color: 'var(--brand-primary)' }} />
          <span>{product.category.name}</span>
        </p>
        <h3
          style={{
            fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)',
            lineHeight: 1.3, marginBottom: '0.4rem',
            overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1" style={{ marginBottom: '0.5rem' }}>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? '#c9a84c' : 'none'}
                stroke={i < Math.floor(product.rating) ? '#c9a84c' : '#d1d5db'}
              />
            ))}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span style={{ color: 'var(--brand-primary-dark)', fontWeight: 700, fontSize: '1rem' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>USD</span>
        </div>

        {/* Mobile add to cart */}
        <button
          onClick={handleAddToCart}
          style={{
            marginTop: '0.75rem', width: '100%',
            background: 'var(--brand-primary)', color: 'white',
            border: 'none', borderRadius: '6px', padding: '0.55rem',
            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
          className="sm:hidden"
        >
          <ShoppingCart size={14} /> Add to Cart
        </button>
      </div>
    </Link>
  );
}
