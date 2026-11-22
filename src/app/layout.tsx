import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'GiftAcrossWorld — Send Thoughtful Gifts Worldwide',
    template: '%s | GiftAcrossWorld',
  },
  description:
    'Send flowers, cakes, chocolates, hampers and personalized gifts to loved ones across the globe. Fast delivery to USA, UK, Canada, Australia, Germany, Malaysia & more.',
  keywords: ['gifts', 'flowers', 'international delivery', 'online gifts', 'send gifts abroad'],
  authors: [{ name: 'GiftAcrossWorld' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://giftacrossworld.com',
    siteName: 'GiftAcrossWorld',
    title: 'GiftAcrossWorld — Send Thoughtful Gifts Worldwide',
    description: 'Send flowers, cakes, chocolates & personalized gifts to loved ones worldwide.',
    images: [{ url: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?w=1200&auto=format&fit=crop&q=80', width: 1200, height: 630, alt: 'GiftAcrossWorld' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GiftAcrossWorld — Send Thoughtful Gifts Worldwide',
    description: 'Send flowers, cakes, chocolates & personalized gifts to loved ones worldwide.',
  },
  robots: { index: true, follow: true },
};

export function generateViewport() {
  return { themeColor: '#e87289' };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body style={{ fontFamily: 'var(--font-dm-sans), DM Sans, system-ui, sans-serif' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
