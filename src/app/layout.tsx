import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

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
      <body className={` ${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
