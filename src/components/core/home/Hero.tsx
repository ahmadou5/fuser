import HeroBg from "@/assets/hero-bg.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-24 min-h-[calc(100vh-4rem)] grid items-center gap-12 lg:grid-cols-2">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold  tracking-tight text-white sm:text-6xl">
          Your Asset <span className="text-[#0095FF]">Guardian</span> Angel
        </h1>
        <p className="max-w-xl font-medium text-lg text-gray-300">
          A secured multichain MPC wallet. simply create a seedless and
          recoverable wallet account.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            size="lg"
            className="bg-[#0095FF] font-regular text-white hover:bg-[#0095FF]/90"
          >
            Join The Waitlist
          </Button>
        </div>
      </div>
      <div className="w-full lg:mx-0 ">
        <div className="relative mt-9 h-[390px] ">
          <Image
            src={HeroBg}
            alt="Mobile app interface"
            className="object-contain h-auto w-auto absolute top-[50%] lg:mb-1 mb-20 lg:left-[25%] transform translate-y-[-50%]"
            height={640}
            width={320}
          />
        </div>
      </div>
    </div>
  );
}
