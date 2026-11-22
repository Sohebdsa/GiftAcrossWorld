'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { Gift, Eye, EyeOff, Mail } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

export default function AuthPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const router = useRouter();
  const { login, register: registerUser } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  const loginForm = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  const onLogin = async (data: LoginData) => {
    setLoading(true);
    const result = await login(data.email, data.password);
    setLoading(false);
    if (result.success) {
      addToast('Welcome back!');
      router.push('/account');
    } else {
      addToast(result.error ?? 'Login failed', 'error');
    }
  };

  const onRegister = async (data: RegisterData) => {
    setLoading(true);
    const result = await registerUser(data.name, data.email, data.password);
    setLoading(false);
    if (result.success) {
      addToast('Account created! Welcome to GiftAcrossWorld.');
      router.push('/account');
    } else {
      addToast(result.error ?? 'Registration failed', 'error');
    }
  };

  const inputStyle = { width: '100%', padding: '0.8rem 1rem', border: '1.5px solid var(--border-primary)', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: 'white', color: 'var(--text-primary)' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' };
  const errorStyle = { fontSize: '0.78rem', color: '#ef4444', marginTop: '0.3rem' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <Gift size={28} style={{ color: 'var(--brand-primary)' }} />
            <span style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--brand-dark)' }}>
              Gift<span style={{ color: 'var(--brand-primary)' }}>Across</span>World
            </span>
          </Link>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-soft)', padding: '2.5rem', boxShadow: 'var(--shadow-card)' }}>
          {/* Tabs */}
          {mode !== 'forgot' && (
            <div style={{ display: 'flex', borderRadius: '10px', background: 'var(--bg-base)', padding: '4px', marginBottom: '2rem' }}>
              {(['login', 'register'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                    background: mode === m ? 'white' : 'transparent',
                    color: mode === m ? 'var(--brand-dark)' : 'var(--text-muted)',
                    boxShadow: mode === m ? 'var(--shadow-card)' : 'none',
                    transition: 'all 0.2s',
                    textTransform: 'capitalize',
                  }}
                >
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>
          )}

          {/* Login */}
          {mode === 'login' && (
            <form onSubmit={loginForm.handleSubmit(onLogin)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--brand-dark)', marginBottom: '0.25rem' }}>Welcome back</h2>
              <div>
                <label style={labelStyle} htmlFor="login-email">Email</label>
                <input id="login-email" type="email" {...loginForm.register('email')} style={inputStyle} placeholder="your@email.com" />
                {loginForm.formState.errors.email && <p style={errorStyle}>{loginForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <label style={labelStyle} htmlFor="login-password">Password</label>
                <div style={{ position: 'relative' }}>
                  <input id="login-password" type={showPwd ? 'text' : 'password'} {...loginForm.register('password')} style={{ ...inputStyle, paddingRight: '2.5rem' }} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {loginForm.formState.errors.password && <p style={errorStyle}>{loginForm.formState.errors.password.message}</p>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setMode('forgot')} style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                  Forgot password?
                </button>
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? 'var(--text-muted)' : 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'wait' : 'pointer', transition: 'all 0.2s' }}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Demo: demo@giftacrossworld.com / Demo@1234
              </p>
            </form>
          )}

          {/* Register */}
          {mode === 'register' && (
            <form onSubmit={registerForm.handleSubmit(onRegister)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--brand-dark)', marginBottom: '0.25rem' }}>Create your account</h2>
              <div>
                <label style={labelStyle} htmlFor="reg-name">Full Name</label>
                <input id="reg-name" {...registerForm.register('name')} style={inputStyle} placeholder="Your full name" />
                {registerForm.formState.errors.name && <p style={errorStyle}>{registerForm.formState.errors.name.message}</p>}
              </div>
              <div>
                <label style={labelStyle} htmlFor="reg-email">Email</label>
                <input id="reg-email" type="email" {...registerForm.register('email')} style={inputStyle} placeholder="your@email.com" />
                {registerForm.formState.errors.email && <p style={errorStyle}>{registerForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <label style={labelStyle} htmlFor="reg-password">Password</label>
                <input id="reg-password" type={showPwd ? 'text' : 'password'} {...registerForm.register('password')} style={inputStyle} placeholder="Min. 6 characters" />
                {registerForm.formState.errors.password && <p style={errorStyle}>{registerForm.formState.errors.password.message}</p>}
              </div>
              <div>
                <label style={labelStyle} htmlFor="reg-confirm">Confirm Password</label>
                <input id="reg-confirm" type={showPwd ? 'text' : 'password'} {...registerForm.register('confirmPassword')} style={inputStyle} placeholder="Repeat password" />
                {registerForm.formState.errors.confirmPassword && <p style={errorStyle}>{registerForm.formState.errors.confirmPassword.message}</p>}
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <input type="checkbox" onChange={() => setShowPwd(!showPwd)} style={{ accentColor: 'var(--brand-primary)' }} /> Show passwords
              </label>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? 'var(--text-muted)' : 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'wait' : 'pointer' }}>
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Forgot password */}
          {mode === 'forgot' && (
            <div>
              <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                ← Back to login
              </button>
              <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--brand-dark)', marginBottom: '0.5rem' }}>Reset Password</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Enter your email and we'll send you a link to reset your password.
              </p>
              {forgotSent ? (
                <div style={{ padding: '1rem', background: 'var(--brand-primary-pale)', borderRadius: '8px', color: 'var(--brand-primary-dark)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} />
                  <span>Reset link sent! Check your email inbox.</span>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setForgotSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle} htmlFor="forgot-email">Email</label>
                    <input id="forgot-email" type="email" required style={inputStyle} placeholder="your@email.com" />
                  </div>
                  <button type="submit" style={{ width: '100%', padding: '0.9rem', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
                    Send Reset Link
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
