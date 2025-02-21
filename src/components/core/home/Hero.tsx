"use client";

import HeroBg from "@/assets/hero-bg.svg";
import { Link } from "@/components/ui/link";
import * as motion from "motion/react-client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Your Asset <span className="text-primary">Guardian</span> Angel
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              A secured multichain{" "}
              <span className="text-primary font-bold">MPC</span> wallet. simply
              create a seedless and recoverable non-custodial wallet
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#" size="lg" shine>
                {" "}
                {/* TODO: Update download link */}
                Download App
              </Link>
              <Link href="/waitlist" size="lg" variant="outline" shine>
                Join The Waitlist
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <Image
              src={HeroBg}
              alt="InFuse Wallet App Interface"
              width={600}
              height={400}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
