import LightRipplesImg from '@/assets/light-ripples.svg';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface LightRipplesProps {
  className?: string;
}

const LightRipples: React.FC<LightRipplesProps> = ({ className }) => {
  return (
    <div className={cn('absolute h-max w-max -z-10', className)}>
      <Image
        src={LightRipplesImg}
        width={1435}
        height={1435}
        alt=""
        className="w-[1435px] h-[1435px]"
      />
    </div>
  );
};

export default LightRipples;
