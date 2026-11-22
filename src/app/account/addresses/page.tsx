'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Plus, Trash2, Edit3, ArrowLeft, Check, Star, Phone } from 'lucide-react';
import { deliveryCountries } from '@/data/products';
import type { Address } from '@/types';

const addressSchema = z.object({
  label: z.string().min(1, 'Label required (e.g., Home, Office)'),
  fullName: z.string().min(2, 'Full recipient name required'),
  phone: z.string().min(7, 'Valid phone number required'),
  line1: z.string().min(5, 'Address line required'),
  line2: z.string().optional(),
  city: z.string().min(2, 'City required'),
  state: z.string().min(2, 'State / Province required'),
  postalCode: z.string().min(3, 'Postal code required'),
  country: z.string().min(2, 'Country required'),
  isDefault: z.boolean(),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function AddressesPage() {
  const router = useRouter();
  const { user, isAuthenticated, addAddress, removeAddress, setDefaultAddress, updateAddress } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: 'Home',
      country: 'usa',
      isDefault: false,
    },
  });

  if (!isAuthenticated || !user) {
    if (typeof window !== 'undefined') router.replace('/auth/login');
    return null;
  }

  const startEdit = (addr: Address) => {
    setEditingId(addr.id);
    setIsAdding(true);
    setValue('label', addr.label);
    setValue('fullName', addr.fullName);
    setValue('phone', addr.phone);
    setValue('line1', addr.line1);
    setValue('line2', addr.line2 || '');
    setValue('city', addr.city);
    setValue('state', addr.state);
    setValue('postalCode', addr.postalCode);
    setValue('country', addr.country);
    setValue('isDefault', addr.isDefault);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    reset();
  };

  const onSubmit = (data: AddressFormData) => {
    if (editingId) {
      updateAddress(editingId, data);
      addToast('Address updated successfully.');
    } else {
      addAddress({
        ...data,
        isDefault: user.addresses.length === 0 ? true : data.isDefault,
      });
      addToast('New delivery address added successfully.');
    }
    cancelForm();
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1.5px solid var(--border-primary)',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    background: 'white',
    color: 'var(--text-primary)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--text-secondary)',
    marginBottom: '0.4rem',
  };

  const errorStyle = { fontSize: '0.78rem', color: '#ef4444', marginTop: '0.3rem' };

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="section-container" style={{ maxWidth: '840px' }}>
        <Link
          href="/account"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
          }}
          className="hover:text-[var(--brand-primary)]"
        >
          <ArrowLeft size={16} /> My Account
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MapPin size={26} style={{ color: 'var(--brand-primary)' }} />
            <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--brand-dark)' }}>
              Address Book
            </h1>
          </div>
          {!isAdding && (
            <button
              onClick={() => { setIsAdding(true); setEditingId(null); reset(); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                background: 'var(--brand-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              className="hover:bg-[var(--brand-primary-dark)]"
            >
              <Plus size={16} /> Add New Address
            </button>
          )}
        </div>

        {/* Address Form (Add / Edit) */}
        {isAdding && (
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid var(--border-soft)',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.25rem', color: 'var(--brand-dark)', marginBottom: '1.5rem' }}>
              {editingId ? 'Edit Address' : 'Add New Delivery Address'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle} htmlFor="addr-label">Address Nickname (e.g. Home, Office, Mom)</label>
                <input id="addr-label" {...register('label')} style={inputStyle} placeholder="Home" />
                {errors.label && <p style={errorStyle}>{errors.label.message}</p>}
              </div>

              <div>
                <label style={labelStyle} htmlFor="addr-name">Recipient Full Name *</label>
                <input id="addr-name" {...register('fullName')} style={inputStyle} placeholder="Jane Doe" />
                {errors.fullName && <p style={errorStyle}>{errors.fullName.message}</p>}
              </div>

              <div>
                <label style={labelStyle} htmlFor="addr-phone">Phone Number *</label>
                <input id="addr-phone" type="tel" {...register('phone')} style={inputStyle} placeholder="+1 555-0199" />
                {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
              </div>

              <div>
                <label style={labelStyle} htmlFor="addr-country">Country *</label>
                <select id="addr-country" {...register('country')} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {deliveryCountries.slice(1).map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle} htmlFor="addr-line1">Street Address *</label>
                <input id="addr-line1" {...register('line1')} style={inputStyle} placeholder="Apartment, suite, building, street" />
                {errors.line1 && <p style={errorStyle}>{errors.line1.message}</p>}
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle} htmlFor="addr-line2">Address Line 2 (Optional)</label>
                <input id="addr-line2" {...register('line2')} style={inputStyle} placeholder="Floor, landmark, etc." />
              </div>

              <div>
                <label style={labelStyle} htmlFor="addr-city">City *</label>
                <input id="addr-city" {...register('city')} style={inputStyle} />
                {errors.city && <p style={errorStyle}>{errors.city.message}</p>}
              </div>

              <div>
                <label style={labelStyle} htmlFor="addr-state">State / Province / Region *</label>
                <input id="addr-state" {...register('state')} style={inputStyle} />
                {errors.state && <p style={errorStyle}>{errors.state.message}</p>}
              </div>

              <div>
                <label style={labelStyle} htmlFor="addr-zip">Postal / Zip Code *</label>
                <input id="addr-zip" {...register('postalCode')} style={inputStyle} />
                {errors.postalCode && <p style={errorStyle}>{errors.postalCode.message}</p>}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  <input type="checkbox" {...register('isDefault')} style={{ width: '16px', height: '16px', accentColor: 'var(--brand-primary)' }} />
                  Set as default shipping address
                </label>
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={cancelForm}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'white',
                    color: 'var(--text-secondary)',
                    border: '1.5px solid var(--border-primary)',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 2rem',
                    background: 'var(--brand-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {editingId ? 'Save Changes' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Saved Addresses List */}
        {user.addresses.length === 0 && !isAdding ? (
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid var(--border-soft)',
              padding: '4rem 2rem',
              textAlign: 'center',
            }}
          >
            <MapPin size={48} style={{ color: 'var(--border-primary)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: 'var(--brand-dark)', marginBottom: '0.5rem' }}>
              No addresses saved yet
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Add your recipient addresses so checkout is lightning fast.
            </p>
            <button
              onClick={() => setIsAdding(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                background: 'var(--brand-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Plus size={16} /> Add First Address
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {user.addresses.map((addr) => (
              <div
                key={addr.id}
                style={{
                  background: 'white',
                  borderRadius: '14px',
                  border: `2px solid ${addr.isDefault ? 'var(--brand-primary)' : 'var(--border-soft)'}`,
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-card)',
                  position: 'relative',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--brand-dark)' }}>
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: 'var(--brand-primary-pale)',
                          color: 'var(--brand-primary-dark)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.6rem',
                          borderRadius: '100px',
                        }}
                      >
                        <Star size={12} fill="currentColor" /> Default
                      </span>
                    )}
                  </div>

                  <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {addr.fullName}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.25rem' }}>
                    {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                    {addr.city}, {addr.state} {addr.postalCode}, <strong style={{ textTransform: 'uppercase' }}>{addr.country}</strong>
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Phone size={13} /> {addr.phone}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-soft)' }}>
                  {!addr.isDefault ? (
                    <button
                      onClick={() => { setDefaultAddress(addr.id); addToast('Default address updated!'); }}
                      style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Make Default
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Primary delivery address</span>
                  )}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => startEdit(addr)}
                      style={{ padding: '0.4rem 0.6rem', background: 'var(--bg-base)', border: '1px solid var(--border-soft)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-secondary)' }}
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => { removeAddress(addr.id); addToast('Address removed', 'info'); }}
                      style={{ padding: '0.4rem 0.6rem', background: 'var(--bg-base)', border: '1px solid var(--border-soft)', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
