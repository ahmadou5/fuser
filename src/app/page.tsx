"use client";

import WhatsNew from "@/components/core/home/BlogList";
import Build from "@/components/core/home/BuildingWith";
import Community from "@/components/core/home/Community";
import FAQ from "@/components/core/home/Faq";
import Features from "@/components/core/home/Features";
import Hero from "@/components/core/home/Hero";
import Reviews from "@/components/core/home/Reviews";

export default function Home() {
  return (
    <main className="pt-20 overflow-x-hidden">
      <Hero />
      <Features />
      <Build />
      <Reviews />
      <WhatsNew />
      <Community />
      <FAQ />
    </main>
  );
}
