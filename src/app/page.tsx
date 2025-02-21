'use client';

import FAQ from '@/components/core/home/Faq';
import Features from '@/components/core/home/Features';
import Hero from '@/components/core/home/Hero';
import Reviews from '@/components/core/home/Reviews';

export default function Home() {
  return (
    <main className="pt-20 overflow-x-hidden">
      <Hero />
      <Features />
      <Reviews />
      <FAQ />
    </main>
  );
}
