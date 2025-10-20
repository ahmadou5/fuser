"use client";
import st from "@/assets/st.svg";
import solana from "@/assets/solana.svg";
import sonic from "@/assets/sonic.svg";
import soon from "@/assets/soon.svg";
import bnbsvm from "@/assets/bnbsvm.svg";
import Stng from "@/assets/superteam.svg";
import lit from "@/assets/lit-logo-white.svg";
import jup from "@/assets/jup.png";
import beach from "@/assets/beach.svg";
import * as motion from "motion/react-client";
import Image from "next/image";
import LogoScroller from "@/components/ui/scroller";
import { useMediaQuery } from "@/hook/useMediaQuery";

// --- Individual SVG Icon Components ---
// This makes the main component cleaner and the icons reusable.
const Solana = () => {
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  return (
    <div className=" py-6 flex items-center justify-center">
      <Image
        src={solana || "/placeholder.svg"}
        alt={"Solana Logo"}
        width={isMobile ? 45 : 90}
        height={isMobile ? 45 : 90}
        className="items-end"
      />
      <div
        className={`${
          isMobile ? "text-base" : "text-4xl"
        } ml-4 mr-4 font-pbold text-gray-400`}
      >
        Solana
      </div>
    </div>
  );
};

const St = () => {
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  return (
    <div className=" py-6 flex items-center justify-center">
      <Image
        src={st || "/placeholder.svg"}
        alt={"Superteam Logo"}
        width={isMobile ? 45 : 90}
        height={isMobile ? 45 : 90}
        className="items-end"
      />
      <div
        className={`${
          isMobile ? "text-base" : "text-4xl"
        } ml-4 mr-4 font-pbold text-gray-400`}
      >
        Superteam
      </div>
    </div>
  );
};

const Soon = () => {
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  return (
    <div className=" py-6 flex items-center justify-center">
      <Image
        src={soon || "/placeholder.svg"}
        alt={"Soon Logo"}
        width={isMobile ? 45 : 90}
        height={isMobile ? 45 : 90}
        className="items-end"
      />
      <div
        className={`${
          isMobile ? "text-base" : "text-4xl"
        } ml-4 mr-4 font-pbold text-gray-400`}
      >
        Soon
      </div>
    </div>
  );
};

const Sonic = () => {
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  return (
    <div className=" py-6 flex items-center justify-center">
      <Image
        src={sonic || "/placeholder.svg"}
        alt={"Sonic Logo"}
        width={isMobile ? 45 : 90}
        height={isMobile ? 45 : 90}
        className="items-end"
      />
      <div
        className={`${
          isMobile ? "text-base" : "text-4xl"
        } ml-4 mr-4 font-pbold text-gray-400`}
      >
        Sonic SVM
      </div>
    </div>
  );
};

const Bnbsvm = () => {
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  return (
    <div className=" py-6 flex items-center justify-center">
      <Image
        src={bnbsvm || "/placeholder.svg"}
        alt={"BNB Logo"}
        width={isMobile ? 45 : 90}
        height={isMobile ? 45 : 90}
        className="items-end"
      />
      <div
        className={`${
          isMobile ? "text-base" : "text-4xl"
        } ml-4 mr-4 font-pbold text-gray-400`}
      >
        SVM BNB
      </div>
    </div>
  );
};

const Jup = () => {
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  return (
    <div className=" py-6 flex items-center justify-center">
      <Image
        src={jup || "/placeholder.svg"}
        alt={"Jupiter Logo"}
        width={isMobile ? 45 : 90}
        height={isMobile ? 45 : 90}
        className="items-end"
      />
      <div
        className={`${
          isMobile ? "text-base" : "text-4xl"
        } ml-4 mr-4 font-pbold text-gray-400`}
      >
        Jupiter
      </div>
    </div>
  );
};

const StNg = () => {
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  return (
    <div className=" py-6 flex items-center justify-center">
      <Image
        src={Stng || "/placeholder.svg"}
        alt={"SuperteamNg Logo"}
        width={isMobile ? 45 : 90}
        height={isMobile ? 45 : 90}
        className="items-end"
      />
      <div
        className={`${
          isMobile ? "text-base" : "text-4xl"
        } ml-4 mr-4 font-pbold text-gray-400`}
      >
        SuperteamNg
      </div>
    </div>
  );
};

const Lit = () => {
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  return (
    <div className=" py-6 flex items-center justify-center">
      <Image
        src={lit || "/placeholder.svg"}
        alt={"SuperteamNg Logo"}
        width={isMobile ? 45 : 90}
        height={isMobile ? 45 : 90}
        className="items-end"
      />
      <div
        className={`${
          isMobile ? "text-base" : "text-4xl"
        } ml-4 mr-4 font-pbold text-gray-400`}
      >
        Lit Protocol
      </div>
    </div>
  );
};

const Beach = () => {
  const mobileBreakpoint = 768;
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
  return (
    <div className=" py-6 flex items-center justify-center">
      <Image
        src={beach || "/placeholder.svg"}
        alt={"beach Logo"}
        width={isMobile ? 45 : 90}
        height={isMobile ? 45 : 90}
        className="items-end"
      />
      <div
        className={`${
          isMobile ? "text-base" : "text-4xl"
        } ml-4 mr-4 font-pbold text-gray-400`}
      >
        Solana Beach
      </div>
    </div>
  );
};

// --- Data Array for Logos ---
// Add or remove logos here to dynamically update the scroller.
const logos = [
  { id: 1, component: <Solana /> },
  { id: 2, component: <Soon /> },
  { id: 3, component: <Bnbsvm /> },
  { id: 4, component: <Sonic /> },
  { id: 5, component: <St /> },
  { id: 7, component: <StNg /> },
  { id: 8, component: <Jup /> },
  { id: 9, component: <Beach /> },
  { id: 10, component: <Lit /> },
  // Add more logos as needed
];

// Duplicate logos for a seamless loop effect
const extendedLogos = [...logos, ...logos, ...logos];
// --- Main Logo Scroller Component ---

export default function Build() {
  return (
    <section className="py-12 lg:py-28 mt-12">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="text-center mb-5"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-5 text-[#0A7EA4]">
            Our partners
          </h2>
          <div className="inline-block px-4 py-2 mb-8 rounded-lg border border-primary/20 bg-[#1A1B1E]/60 backdrop-blur-sm ">
            <p className="text-gray-400 lg:text-sm text-xs">
              Who we are Building with.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="flex"
        >
          <LogoScroller logos={extendedLogos} />
        </motion.div>
      </div>
    </section>
  );
}
