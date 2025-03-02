'use client';

import AllBlockChainInOnePlaceImg from '@/assets/all-blockchain-in-one-place.svg';
import Coin from '@/assets/coin.svg';
import Line from '@/assets/line.svg';
import { Link } from '@/components/ui/link';
import { Stats, features } from '@/utils/itemList';
import { Shield } from 'lucide-react';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Shield;
  title: string;
  description: string;
}) {
  const coins = [
    { top: '15%', left: '-20px', size: 'big', rotateOffset: 0 },
    { top: '8%', left: '5%', size: 'small', rotateOffset: 45 },
    { top: '50%', right: '-20px', size: 'big', rotateOffset: 90 },
    { top: '65%', right: '3%', size: 'small', rotateOffset: 135 },
  ];

  return (
    <div className="group perspective-[1000px] relative flex flex-col items-center p-8 rounded-2xl backdrop-blur-sm bg-[#044B7D] border border-[#0E99FE]/30 hover:border-[#00A3FF] focus:border-[#00A3FF] bg-opacity-50 hover:bg-opacity-100 hover:translate-y-[-10px] hover:border-2 focus:bg-opacity-100 transition-all cursor-pointer duration-500">
      {/* Floating coins */}
      <div className="absolute inset-0 pointer-events-none">
        {coins.map((coin, i) => (
          <motion.div
            key={i}
            className={`absolute opacity-0 group-hover:opacity-100`}
            style={{
              top: coin.top,
              left: coin.left,
              right: coin.right,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: [coin.rotateOffset, coin.rotateOffset + 360],
              rotateY: [0, 360],
              rotateZ: [0, 180],
              z: [0, 50, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          >
            <Image
              src={Coin}
              alt="Coin"
              width={coin.size === 'big' ? 40 : 20}
              height={coin.size === 'big' ? 40 : 20}
              className="drop-shadow-[0_0_15px_rgba(0,163,255,0.3)]"
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full bg-[#00A3FF]/20">
          <Icon className="w-6 h-6 text-[#00A3FF]" />
        </div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <p className="text-gray-400 text-sm mb-6">{description}</p>
        <Link
          href="/#about"
          className="opacity-50 group-hover:opacity-100 transition-opacity"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}

function StatItem({ title, subtitle }: { title: string; subtitle: string }) {
  const isNumber = !isNaN(Number(title));
  const animatedValue = useCountUp(isNumber ? Number(title) : 0);

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[90%] rounded-lg bg-gradient-to-b from-[#00A3FF] to-[#00A3FF]/30" />
      <div className="pl-4 py-2">
        <h3 className="text-xl lg:text-2xl font-bold">
          {isNumber ? animatedValue : title}
        </h3>
        <p className="text-xs lg:text-base text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Features() {
  const [waitlistValue, setWaitlistValue] = useState(0);

  useEffect(() => {
    const getValue = async () => {
      try {
        const response = await fetch('/api/waitlist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (!response.ok) {
          setWaitlistValue(0);
        } else setWaitlistValue(data.count);
      } catch (err) {
        console.error(err instanceof Error ? err.message : err);
      }
    };
    getValue();
  }, []);

  return (
    <section className="relative py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
        className="p-5 mb-16 bg-white/5 backdrop-blur-sm border-b border-primary"
      >
        <div className="grid md:grid-cols-3 gap-0 container mx-auto">
          <StatItem
            title={waitlistValue?.toString()}
            subtitle={'Members Waitlisted'}
          />
          {Stats &&
            Stats.map((item, i) => (
              <StatItem key={i} title={item.title} subtitle={item.subtitle} />
            ))}
        </div>
      </motion.div>

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#00A3FF]">
            Key Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            InFuse is more than just a wallet - it&apos;s a comprehensive
            platform with features that are tailored to the needs of users.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 mb-20 max-w-[70rem] mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        <div
          className="relative grid lg:grid-cols-2 gap-12 items-center"
          id="about"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            <Image
              src={AllBlockChainInOnePlaceImg}
              alt="InFuse Wallet Mobile App"
              width={500}
              height={600}
              className="w-full h-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#00A3FF]">
              All Blockchain In One Place
            </h2>
            <p className="text-gray-400">
              InFuse Wallet integrates support for multiple blockchain networks,
              allowing users to manage a diverse range of cryptocurrencies and
              digital assets from a single interface. Instead of needing
              separate wallets for different blockchains (e.g., Ethereum, Soon,
              Solana, or Polygon), InFuse wallet consolidates them into one
              platform. Users can store, send, receive, and interact with assets
              across various chains, as well as access decentralized
              applications (dApps) and interact with smart contracts between
              different tools. This simplifies the user experience, saves time,
              and provides a unified solution for managing a multi-chain crypto
              portfolio.
            </p>
          </motion.div>
        </div>
      </div>

      <Image
        src={Line}
        alt=""
        width={500}
        height={600}
        className="absolute right-0 left-0 bottom-0 lg:bottom-20 w-full h-auto"
      />
    </section>
  );
}
