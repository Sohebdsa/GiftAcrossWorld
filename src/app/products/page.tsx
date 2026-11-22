import { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductsClient } from '@/components/product/ProductsClient';

export const metadata: Metadata = {
  title: 'All Gifts',
  description: 'Browse our full range of flowers, cakes, chocolates, hampers and personalized gifts. Filter by category, price, and delivery country.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading gifts...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
