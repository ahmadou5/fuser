'use client';

import LightRipplesImg from '@/assets/light-ripples.svg';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

interface LightRipplesProps {
  className?: string;
}

const LightRipples: React.FC<LightRipplesProps> = ({ className }) => {
  const pathname = usePathname();
  if (pathname !== '/') return null;

  return (
    <div
      className={cn(className, 'absolute -z-10 pointer-events-none')}
      aria-hidden
    >
      <Image
        src={LightRipplesImg}
        width={1440}
        height={3807}
        alt=""
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
};

export default LightRipples;
