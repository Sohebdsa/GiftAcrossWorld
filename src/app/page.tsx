import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { DeliveryCountriesBar } from '@/components/home/DeliveryCountriesBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BestsellersSection } from '@/components/home/BestsellersSection';
import { OccasionsSection } from '@/components/home/OccasionsSection';
import { GiftRecommendationSection } from '@/components/home/GiftRecommendationSection';
import { PromoBanner } from '@/components/home/PromoBanner';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export const metadata: Metadata = {
  title: 'GiftAcrossWorld — Send Thoughtful Gifts Worldwide',
  description: 'Send flowers, cakes, chocolates, hampers and personalized gifts to loved ones across the globe. Fast delivery to USA, UK, Canada, Australia & more.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DeliveryCountriesBar />
      <CategoryGrid />
      <FeaturedProducts />
      <OccasionsSection />
      <PromoBanner />
      <BestsellersSection />
      <GiftRecommendationSection />
      <TestimonialsSection />
      <BrandStorySection />
      <NewsletterSection />
    </>
  );
}
