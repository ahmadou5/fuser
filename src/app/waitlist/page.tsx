'use client';

import WaitlistForm from '@/components/core/waitlist/WaitlistForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br py-20 from-[#0D2B4B] to-[#071625] grid items-center">
      <WaitlistForm />
    </div>
  );
}
