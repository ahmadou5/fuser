'use client';

import HarriProfileImage from '@/assets/harri-profile-image.svg';
import YukiProfileImage from '@/assets/yuki-profile-image.svg';
import { BadgeCheck } from 'lucide-react';
import * as motion from 'motion/react-client';
import Image from 'next/image';

const reviews = [
  {
    avatar: YukiProfileImage,
    name: 'Yuki @SOON Mainnet is LIVE',
    handle: '@frosmian88',
    content:
      'Just finishing talking with @4hmmadou_5 and really like the idea of first TG main app wallet. @InFuseWallet is already deployed to @soon_rwn devnet. Encouraging everyone to check this out.',
  },
  {
    avatar: HarriProfileImage,
    name: 'Harri',
    handle: '@Harri_obi',
    content:
      'Two @SuperteamNFG projects (@InFuseWallet and @evexprotocol) got a win in the Light Protocol ZK Compression Hackathon. That makes it 5 internal wins in the Solana Radar Hackathon sidetrack 🔥',
    verified: true,
  },
];

function ReviewCard({
  avatar,
  name,
  handle,
  content,
  verified = false,
}: {
  avatar: string;
  name: string;
  handle: string;
  content: string;
  verified?: boolean;
}) {
  return (
    <div
      className="relative p-6 rounded-xl bg-[#1A1B1E]/40 border border-[#00A3FF]/10 backdrop-blur-sm
      before:absolute before:inset-0 before:rounded-xl before:pointer-events-none
      before:bg-gradient-to-b before:from-transparent before:to-transparent
      before:border before:border-[#00A3FF]/10 before:shadow-[0_0_25px_rgba(0,163,255,0.1)]"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={avatar || '/placeholder.svg'}
            alt={name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-medium">{name}</h3>
              {verified && <BadgeCheck className="w-4 h-4 text-[#00A3FF]" />}
            </div>
            <p className="text-gray-400 text-sm">{handle}</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#00A3FF]">
            Reviews
          </h2>
          <div className="inline-block px-4 py-2 rounded-lg bg-[#1A1B1E]/60 backdrop-blur-sm">
            <p className="text-gray-400 text-sm">
              What people are saying about InFuse wallet.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
