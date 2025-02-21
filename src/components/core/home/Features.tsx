'use client';

import AllBlockChainInOnePlaceImg from '@/assets/all-blockchain-in-one-place.svg';
import Coin from '@/assets/coin.svg';
import { Button } from '@/components/ui/button';
import { LinkIcon, Lock, Shield } from 'lucide-react';
import * as motion from 'motion/react-client';
import Image from 'next/image';

const features = [
  {
    icon: Shield,
    title: 'Social Recovery',
    description:
      'Leveraging advanced and secured cryptography feature (MPC) for secured wallet.',
    variant: 'dark' as const,
  },
  {
    icon: LinkIcon,
    title: 'Multi-chain Support',
    description:
      'InFuse Wallet lets users manage multiple cryptocurrencies across different blockchains in one place.',
    variant: 'blue' as const,
  },
  {
    icon: Lock,
    title: 'Security',
    description:
      'Leveraging advanced and secured cryptography feature (MPC) for secured wallet.',
    variant: 'dark' as const,
  },
];

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
    <div className="group perspective-[1000px] relative flex flex-col items-center p-8 rounded-2xl backdrop-blur-sm bg-[#044B7D] border border-[#0E99FE]/30 bg-opacity-50 hover:bg-opacity-100 hover:translate-y-[-8px] hover:scale-105 focus:bg-opacity-100 transition-all cursor-pointer">
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
        <Button className="opacity-50 group-hover:opacity-100 transition-opacity">
          Learn more
        </Button>
      </div>
    </div>
  );
}

function StatItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[60%] bg-[#00A3FF]" />
      <div className="pl-4 py-2 bg-[#1A1B1E]/40 backdrop-blur-sm rounded-r-lg">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-3 gap-0 mb-16">
          <StatItem title="200+" subtitle="Network address" />
          <StatItem title="Email" subtitle="Recovery support" />
          <StatItem title="Multi-chain" subtitle="Support" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
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
              viewport={{ once: true }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
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
            viewport={{ once: true }}
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
    </section>
  );
}
