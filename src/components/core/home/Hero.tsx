"use client";

import BottomBlueLine from "@/assets/bottom-blue-line.svg";
import HeroBg from "@/assets/hero-bg.svg";
import TopBlueLine from "@/assets/top-blue-line.svg";
import QRButton from "@/components/ui/QRButton";
import { Download } from "lucide-react";

import Toaster from "@/components/ui/Toaster";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useState } from "react";

export default function Hero() {
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  return (
    <section className="relative py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative max-w-xl">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Your Asset <span className="text-primary">Guardian</span> Angel
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              A secured Multi-SVM{" "}
              <span className="text-primary font-bold">MPC</span> wallet. simply
              create a seedless and recoverable non-custodial wallet
            </p>
            <div className="flex flex-wrap gap-4">
              <QRButton
                qrCodeUrl="https://expo.dev/artifacts/eas/4ikPpWWaXKPUpkiUnL8erU.apk"
                shine={true}
                buttonText="Download App"
                downloadLinks={[
                  {
                    label: "Download APK",
                    url: "https://expo.dev/artifacts/eas/4ikPpWWaXKPUpkiUnL8erU.apk",
                    icon: <Download />,
                  },
                ]}
              />
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
      <Toaster
        setIsToastOpen={setIsToastOpen}
        isToastOpen={isToastOpen}
        content="Coming Soon!"
      />

      <div className="absolute hidden lg:block lg:top-[20%] lg:left-0 w-fit h-fit  -z-10">
        <Image src={TopBlueLine} alt="Top Blue Line" />
      </div>
      <div
        className={`absolute hidden lg:block lg:left-0 lg:bottom-[20%] w-fit h-fit -z-10`}
      >
        <Image src={BottomBlueLine} alt="Bottom Blue Line" />
      </div>
    </section>
  );
}
