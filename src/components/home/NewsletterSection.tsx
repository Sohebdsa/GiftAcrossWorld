'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section style={{ padding: '4rem 0', background: 'var(--bg-base)' }}>
      <div className="section-container">
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            border: '1px solid var(--border-soft)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            style={{
              width: '56px', height: '56px', background: 'var(--brand-primary-pale)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <Mail size={24} style={{ color: 'var(--brand-primary)' }} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--brand-dark)', marginBottom: '0.75rem' }}>
            Get Gift Ideas in Your Inbox
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem', maxWidth: '460px', margin: '0 auto 1.75rem' }}>
            Subscribe for exclusive deals, seasonal gift guides, and 15% off your next order.
          </p>

          {submitted ? (
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--brand-primary-pale)', color: 'var(--brand-primary-dark)',
                padding: '1rem 2rem', borderRadius: '8px', fontWeight: 600,
              }}
            >
              <CheckCircle2 size={18} className="text-[var(--brand-primary)]" />
              <span>You're subscribed! Check your inbox for 15% off.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', maxWidth: '460px', margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                aria-label="Email address"
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '0.85rem 1rem',
                  border: '1.5px solid var(--border-primary)',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'var(--brand-primary)', color: 'white',
                  padding: '0.85rem 1.5rem', borderRadius: '8px',
                  border: 'none', fontWeight: 700, fontSize: '0.95rem',
                  cursor: loading ? 'wait' : 'pointer',
                  opacity: loading ? 0.8 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {loading ? 'Subscribing...' : (<>Subscribe <ArrowRight size={16} /></>)}
              </button>
            </form>
          )}

          <p style={{ fontSize: '0.775rem', color: 'var(--text-subtle)', marginTop: '0.875rem' }}>
            No spam. Unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
