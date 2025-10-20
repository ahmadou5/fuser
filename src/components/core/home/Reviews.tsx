"use client";

import { BadgeCheck } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { reviews } from "@/utils/itemList";
import InfiniteReviewsScroller from "@/components/ui/reviewScroller";
import { useMediaQuery } from "@/hook/useMediaQuery";

const allReviews = [
  {
    id: 1,
    component: <ReviewCard {...reviews[0]} />,
  },
  {
    id: 2,
    component: <ReviewCard {...reviews[1]} />,
  },
  {
    id: 3,
    component: <ReviewCard {...reviews[2]} />,
  },
];

const extendedReveiew = [
  ...allReviews,
  ...allReviews,
  ...allReviews,
  ...allReviews,
  ...allReviews,
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
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  return (
    <div
      className={`py-5 px-4 w-[290px] h-[170px] lg:p-6 lg:w-[600px] lg:h-[190px] ml-4 mr-4 rounded-xl bg-[#1A1B1E]/0 border border-primary/50 backdrop-blur-sm
      before:absolute before:inset-0 before:rounded-xl before:pointer-events-none
      before:bg-gradient-to-b before:from-transparent before:to-transparent
      before:border before:border-[#00A3FF]/10 before:shadow-[0_0_25px_rgba(0,163,255,0.1)]`}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={name}
            width={isMobile ? 26 : 48}
            height={isMobile ? 26 : 48}
            className="rounded-full"
          />
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-medium lg:text-base text-xs">{name}</h3>
              {verified && (
                <BadgeCheck className="lg:w-4 lg:h-4 h-3 w-3 text-[#00A3FF]" />
              )}
            </div>
            <p className="text-gray-400 lg:text-sm text-xs">{handle}</p>
          </div>
        </div>
        <p className="text-gray-300 lg:text-base text-xs whitespace-pre-line">
          {content}
        </p>
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
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#0A7EA4]">
            Reviews
          </h2>
          <div className="inline-block px-4 py-2 rounded-lg border border-primary/20 bg-[#1A1B1E]/60 backdrop-blur-sm ">
            <p className="text-gray-400 lg:text-sm text-xs">
              What people are saying about InFuse wallet.
            </p>
          </div>
        </motion.div>

        <InfiniteReviewsScroller reviews={extendedReveiew} />
      </div>
    </section>
  );
}
