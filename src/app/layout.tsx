import LightRipples from "@/components/base/LightRipples";
import SplashScreen from "@/components/core/SplashScreen";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { MiniContextProvider } from "@/context/miniContext";

const inter = Montserrat({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "InFuse Wallet",
  description:
    "A secured multichain MPC wallet. simply create a seedless and recoverable wallet account.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased relative`}>
        <SplashScreen />
        <LightRipples className="inset-0 right-10 h-full w-full -z-10" />

        <header>
          <Navbar />
        </header>
        <MiniContextProvider>{children}</MiniContextProvider>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
