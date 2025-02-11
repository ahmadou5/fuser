import Hero from '@/components/core/home/Hero';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0D2B4B] to-[#071625]">
      <Navbar />
      <div className="pt-20">
        <Hero />
      </div>
    </main>
  );
}
