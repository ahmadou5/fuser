"use client";
import React from "react";
import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import { BlogPostDetail, mockBlogPost } from "@/utils/itemList";
import { useMediaQuery } from "@/hook/useMediaQuery";
import { useRouter } from "next/navigation";

interface WhatsNewProps {
  items?: BlogPostDetail[];
  onLearnMore?: (itemId: string | number) => void;
}

// Component
const WhatsNew: React.FC<WhatsNewProps> = ({ items = mockBlogPost }) => {
  const router = useRouter();
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);

  // Get the last 4 items (most recent)
  const recentItems = items.slice(-4).reverse();

  return (
    <div className="flex h-auto ml-auto mr-auto w-full ">
      {/* Vertical accent line */}

      <div className="container mr-auto ml-auto px-4 lg:px-8 py-16">
        <div className="max-w-[99%] ml-auto mr-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#0A7EA4] text-center">
              What&apos;s News
            </h2>
            <div className="inline-block px-4 py-2 mb-8 rounded-lg border border-primary/20 bg-[#1A1B1E]/60 backdrop-blur-sm ">
              <p className="text-gray-400 lg:text-sm text-xs">
                Get latest update from our blog.
              </p>
            </div>
          </motion.div>
          {/* News Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="space-y-8"
          >
            {recentItems.map((item) => (
              <div
                key={item.id}
                className="flex border border-primary/15 rounded-xl py-4 px-3 items-start backdrop-blur-xl justify-between gap-8 group"
              >
                {/* Content */}
                <div className="flex-1 py-2 px-2 ">
                  <p className="text-gray-300 lg:text-base text-base font-medium">
                    {item.title}
                  </p>
                </div>

                {/* Button */}
                <Button
                  shine
                  onClick={() => router.push(`/blog#${item?.id}`)}
                  size={isMobile ? "sm" : "lg"}
                  variant="default"
                  className="mt-auto lg:mb-0"
                >{`Learn more`}</Button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
