'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart, ShoppingCart, Star, ChevronLeft, ChevronRight, Truck,
  Shield, RotateCcw, Share2, Minus, Plus, CheckCircle, MessageSquare, Calendar, MapPin
} from 'lucide-react';
import type { Product, Review } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useToastStore } from '@/store/toastStore';
import { ProductCard } from './ProductCard';
import { products, deliveryCountries } from '@/data/products';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedCountry, setSelectedCountry] = useState(product.deliveryCountries[0] || 'usa');

  // Reviews state
  const initialReviews: Review[] = [
    {
      id: 'r1',
      author: 'Sophia Evans',
      rating: 5,
      title: 'Stunning quality and perfect delivery',
      comment: 'Ordered this for my sister overseas and it arrived on time and in immaculate condition! The packaging felt truly luxurious.',
      date: '2026-10-18',
      verified: true,
      country: 'UK',
    },
    {
      id: 'r2',
      author: 'Marcus Chen',
      rating: 5,
      title: 'Exceeded all expectations',
      comment: 'The scent and presentation were top tier. Gifting across countries used to be a headache until I found GiftAcrossWorld.',
      date: '2026-09-24',
      verified: true,
      country: 'Australia',
    },
    {
      id: 'r3',
      author: 'Aarav Sharma',
      rating: 4,
      title: 'Great product, wonderful surprise',
      comment: 'Loved the personal touch and gift card included. Delivery was smooth. Highly recommend!',
      date: '2026-08-30',
      verified: true,
      country: 'USA',
    },
  ];

  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || initialReviews);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewCountry, setReviewCountry] = useState('USA');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const addToast = useToastStore((s) => s.addToast);

  const related = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Calculate estimated delivery
  const deliveryDays = selectedCountry === 'usa' ? 2 : selectedCountry === 'uk' ? 3 : 4;
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + deliveryDays);
  const dateFormatted = estimatedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url ?? '',
      quantity,
      selectedVariants,
    });
    addToast(`"${product.name}" added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/cart';
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    const newRev: Review = {
      id: `rev_${Date.now()}`,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || 'Wonderful Gift',
      comment: reviewComment.trim(),
      date: new Date().toISOString().split('T')[0],
      verified: true,
      country: reviewCountry,
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowReviewForm(false);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    addToast('Thank you for your review!');
  };

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      <div className="section-container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[var(--brand-primary)]">All Gifts</Link>
          <span>/</span>
          <Link href={`/products?category=${product.categoryId}`} className="hover:text-[var(--brand-primary)]">
            {product.category.name}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
        </nav>

        {/* Product top section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          {/* Image gallery */}
          <div>
            <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '14px', overflow: 'hidden', background: 'white', marginBottom: '0.75rem', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-card)' }}>
              <Image
                src={product.images[selectedImage]?.url ?? product.images[0]?.url}
                alt={product.images[selectedImage]?.alt ?? product.name}
                fill
                priority
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length)}
                    aria-label="Previous image"
                    style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setSelectedImage((i) => (i + 1) % product.images.length)}
                    aria-label="Next image"
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                    style={{ width: '68px', height: '68px', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${i === selectedImage ? 'var(--brand-primary)' : 'var(--border-soft)'}`, cursor: 'pointer', background: 'white', flexShrink: 0, padding: 0 }}
                  >
                    <Image src={img.url} alt={img.alt} width={68} height={68} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CategoryIcon categoryId={product.categoryId} size={15} />
              <span>{product.category.name}</span>
            </p>

            <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'var(--brand-dark)', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#c9a84c' : 'none'} stroke={i < Math.floor(product.rating) ? '#c9a84c' : '#d1d5db'} />
                ))}
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{product.rating}</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>({reviewsList.length} verified reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--brand-primary-dark)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.15rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discountPercent && (
                <span style={{ background: '#ef4444', color: 'white', fontSize: '0.78rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '100px' }}>
                  Save {discountPercent}%
                </span>
              )}
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>USD</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {product.shortDescription}
            </p>

            {/* Estimated Delivery Calculator */}
            <div style={{ padding: '1rem', background: 'white', borderRadius: '10px', border: '1.5px solid var(--border-soft)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Truck size={16} style={{ color: 'var(--brand-primary)' }} /> Delivery Destination:
                </span>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '6px',
                    fontSize: '0.825rem',
                    background: 'white',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {deliveryCountries.slice(1).map((c) => (
                    <option key={c.code} value={c.code}>[{c.code.toUpperCase()}] {c.name}</option>
                  ))}
                </select>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} style={{ color: '#16a34a' }} />
                Estimated Arrival: <strong>{dateFormatted}</strong>
              </p>
            </div>

            {/* Variants */}
            {product.variants?.map((variant) => (
              <div key={variant.id} style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>{variant.name}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {variant.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.id]: opt.id }))}
                      disabled={!opt.inStock}
                      style={{
                        padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600,
                        border: `2px solid ${selectedVariants[variant.id] === opt.id ? 'var(--brand-primary)' : 'var(--border-primary)'}`,
                        background: selectedVariants[variant.id] === opt.id ? 'var(--brand-primary-pale)' : 'white',
                        color: selectedVariants[variant.id] === opt.id ? 'var(--brand-primary-dark)' : 'var(--text-secondary)',
                        cursor: opt.inStock ? 'pointer' : 'not-allowed',
                        opacity: opt.inStock ? 1 : 0.4,
                        transition: 'all 0.15s',
                      }}
                    >
                      {opt.label}
                      {opt.priceModifier && opt.priceModifier !== 0 && (
                        <span style={{ fontSize: '0.75rem', marginLeft: '0.3rem' }}>
                          ({opt.priceModifier > 0 ? '+' : ''}${opt.priceModifier.toFixed(0)})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>Quantity</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-primary)', borderRadius: '8px', overflow: 'hidden', background: 'white' }}>
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" style={{ width: '40px', height: '40px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ width: '44px', textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity" style={{ width: '40px', height: '40px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={14} />
                  </button>
                </div>
                {product.stockCount && (
                  <span style={{ fontSize: '0.8rem', color: product.stockCount < 10 ? '#ef4444' : 'var(--text-muted)' }}>
                    {product.stockCount < 10 ? `Only ${product.stockCount} left!` : 'In stock'}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button
                onClick={handleAddToCart}
                style={{ flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem 1.5rem', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
                className="hover:bg-[var(--brand-primary-dark)]"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                style={{ flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem 1.5rem', background: 'var(--brand-dark)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
                className="hover:opacity-90"
              >
                Buy Now
              </button>
              <button
                onClick={() => { toggleWishlist(product.id); addToast(isInWishlist ? 'Removed from wishlist' : 'Saved to wishlist', 'success'); }}
                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${isInWishlist ? 'var(--brand-primary)' : 'var(--border-primary)'}`, borderRadius: '8px', background: isInWishlist ? 'var(--brand-primary-pale)' : 'white', cursor: 'pointer', transition: 'all 0.15s' }}
              >
                <Heart size={18} fill={isInWishlist ? 'var(--brand-primary)' : 'none'} stroke={isInWishlist ? 'var(--brand-primary)' : 'var(--text-muted)'} />
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-soft)' }}>
              {[
                { icon: Truck, text: 'International Express Shipping' },
                { icon: Shield, text: '100% Quality Guaranteed' },
                { icon: RotateCcw, text: 'Hassle-Free Support' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <Icon size={15} style={{ color: 'var(--brand-primary)' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product description + specs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--brand-dark)', marginBottom: '1rem' }}>Product Description</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>{product.description}</p>
          </div>

          {product.specifications && product.specifications.length > 0 && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-card)' }}>
              <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--brand-dark)', marginBottom: '1rem' }}>Specifications & Details</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {product.specifications.map((spec) => (
                    <tr key={spec.label} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                      <td style={{ padding: '0.75rem 0', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', width: '45%' }}>{spec.label}</td>
                      <td style={{ padding: '0.75rem 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Customer Reviews Section */}
        <div style={{ background: 'white', borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 3rem)', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-card)', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', color: 'var(--brand-dark)', marginBottom: '0.25rem' }}>
                Customer Reviews
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#c9a84c' : 'none'} stroke={i < Math.floor(product.rating) ? '#c9a84c' : '#d1d5db'} />
                  ))}
                </div>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{product.rating} out of 5</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({reviewsList.length} reviews)</span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                background: showReviewForm ? 'var(--bg-base)' : 'var(--brand-primary)',
                color: showReviewForm ? 'var(--text-primary)' : 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              <MessageSquare size={16} /> {showReviewForm ? 'Close Form' : 'Write a Review'}
            </button>
          </div>

          {/* Review submission form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} style={{ background: 'var(--bg-base)', borderRadius: '14px', padding: '1.5rem', marginBottom: '2.5rem', border: '1px solid var(--border-soft)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-dark)', marginBottom: '1rem' }}>
                Share Your Experience
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Your Name *</label>
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="e.g. Rachel Green"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1.5px solid var(--border-primary)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', background: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Your Country</label>
                  <input
                    type="text"
                    value={reviewCountry}
                    onChange={(e) => setReviewCountry(e.target.value)}
                    placeholder="e.g. Canada"
                    style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1.5px solid var(--border-primary)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', background: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1.5px solid var(--border-primary)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', background: 'white', cursor: 'pointer' }}
                  >
                    <option value={5}>5 Stars - Outstanding Quality</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Below expectations</option>
                    <option value={1}>1 Star - Disappointed</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Headline (Optional)</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="Sum up your review in a few words"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1.5px solid var(--border-primary)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', background: 'white' }}
                />
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Review Details *</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell others what you loved about this gift..."
                  style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1.5px solid var(--border-primary)', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', background: 'white', resize: 'vertical' }}
                />
              </div>
              <button
                type="submit"
                style={{ padding: '0.75rem 1.75rem', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}
              >
                Submit Review
              </button>
            </form>
          )}

          {/* Reviews list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {reviewsList.map((rev) => (
              <div key={rev.id} style={{ borderBottom: '1px solid var(--border-soft)', paddingBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{rev.author}</span>
                    {rev.verified && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#16a34a', fontSize: '0.75rem', fontWeight: 600 }}>
                        <CheckCircle size={12} /> Verified Buyer
                      </span>
                    )}
                    {rev.country && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={12} /> {rev.country}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                    {new Date(rev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} fill={i < rev.rating ? '#c9a84c' : 'none'} stroke={i < rev.rating ? '#c9a84c' : '#d1d5db'} />
                    ))}
                  </div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--brand-dark)' }}>{rev.title}</strong>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--brand-dark)', marginBottom: '1.5rem' }}>
              More Gifts You May Love
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
