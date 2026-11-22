'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?w=1600&auto=format&fit=crop&q=80',
    tag: 'Make Someone\'s Day',
    headline: 'Send Joy Across the World',
    sub: 'Thoughtful gifts delivered to your loved ones — wherever they are.',
    cta: { label: 'Shop All Gifts', href: '/products' },
    ctaSecondary: { label: 'View Bestsellers', href: '/products?featured=true' },
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1487530811015-780780169959?w=1600&auto=format&fit=crop&q=80',
    tag: 'Fresh Blooms',
    headline: 'Flowers That Speak the Heart',
    sub: 'Hand-picked arrangements, delivered fresh to 7+ countries.',
    cta: { label: 'Shop Flowers', href: '/products?category=flowers' },
    ctaSecondary: { label: 'All Categories', href: '/products' },
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1600&auto=format&fit=crop&q=80',
    tag: 'Personalized Gifts',
    headline: 'Gifts as Unique as They Are',
    sub: 'Custom, engraved, and heartfelt gifts crafted just for them.',
    cta: { label: 'Personalize Now', href: '/products?category=personalized' },
    ctaSecondary: { label: 'Gift Hampers', href: '/products?category=hampers' },
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'clamp(400px, 70vh, 680px)',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label="Hero carousel"
    >
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.9s ease',
            zIndex: 0,
          }}
        >
          <Image
            src={s.image}
            alt={s.headline}
            fill
            priority={i === 0}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="100vw"
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(43,34,37,0.82) 0%, rgba(43,34,37,0.45) 55%, rgba(0,0,0,0.1) 100%)',
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '4rem 1.5rem',
          maxWidth: '680px',
        }}
      >
        <div
          key={current}
          style={{ animation: 'heroFadeUp 0.7s ease forwards' }}
        >
          <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
            <Gift size={16} style={{ color: 'var(--brand-primary-light)' }} />
            <span style={{ color: 'var(--brand-primary-light)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {slide.tag}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-playfair), Playfair Display, serif',
              color: 'white',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            {slide.headline}
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', marginBottom: '2rem', maxWidth: '460px', lineHeight: 1.6 }}>
            {slide.sub}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={slide.cta.href}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--brand-primary)', color: 'white',
                padding: '0.85rem 1.75rem', borderRadius: '8px',
                fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em',
                transition: 'all 0.2s',
              }}
              className="hover:bg-[var(--brand-primary-dark)] hover:-translate-y-0.5 hover:shadow-lg"
            >
              {slide.cta.label}
            </Link>
            <Link
              href={slide.ctaSecondary.href}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.12)', color: 'white',
                padding: '0.85rem 1.75rem', borderRadius: '8px',
                fontWeight: 600, fontSize: '0.95rem',
                border: '1.5px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s',
              }}
              className="hover:bg-white/20"
            >
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', gap: '0.5rem' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? '24px' : '8px', height: '8px',
              borderRadius: '100px', border: 'none', cursor: 'pointer',
              background: i === current ? 'var(--brand-primary)' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        style={{
          position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
          zIndex: 2, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
          width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'white', backdropFilter: 'blur(8px)',
          transition: 'background 0.2s',
        }}
        className="hover:bg-white/25"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        style={{
          position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
          zIndex: 2, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
          width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'white', backdropFilter: 'blur(8px)',
          transition: 'background 0.2s',
        }}
        className="hover:bg-white/25"
      >
        <ChevronRight size={20} />
      </button>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
