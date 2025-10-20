"use client";

import LightRipplesImg from "@/assets/light-r.svg";
import DarkRipplesImg from "@/assets/dark-r.svg";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/themeStore";
import Image from "next/image";
//import { usePathname } from "next/navigation";
import React from "react";

interface LightRipplesProps {
  className?: string;
}

const LightRipples: React.FC<LightRipplesProps> = ({ className }) => {
  const { themeMode } = useThemeStore();
  const RippleImage = themeMode === "dark" ? DarkRipplesImg : LightRipplesImg;
  //const pathname = usePathname();
  //if (pathname !== "/") return null;

  return (
    <div
      className={cn(className, "absolute -z-10 pointer-events-none")}
      aria-hidden
    >
      <Image
        src={RippleImage}
        width={1940}
        height={3907}
        alt=""
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
};

export default LightRipples;
