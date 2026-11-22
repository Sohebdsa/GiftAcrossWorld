'use client';

import { useToastStore } from '@/store/toastStore';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const iconMap = {
  success: <CheckCircle size={18} style={{ color: '#4ade80' }} />,
  error: <AlertCircle size={18} style={{ color: '#f87171' }} />,
  warning: <AlertCircle size={18} style={{ color: '#facc15' }} />,
  info: <Info size={18} style={{ color: '#60a5fa' }} />,
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '380px',
        width: 'calc(100vw - 3rem)',
      }}
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            background: 'var(--brand-dark)',
            color: 'white',
            padding: '0.875rem 1rem',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-dark)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            animation: 'slideInRight 0.3s ease',
            borderLeft: `3px solid ${toast.type === 'success' ? '#4ade80' : toast.type === 'error' ? '#f87171' : toast.type === 'warning' ? '#facc15' : '#60a5fa'}`,
          }}
        >
          <span style={{ marginTop: '1px', flexShrink: 0 }}>{iconMap[toast.type]}</span>
          <p style={{ flex: 1, fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '2px', flexShrink: 0 }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
