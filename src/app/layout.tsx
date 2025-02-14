import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const mont = Montserrat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={` ${mont.variable} antialiased`}>{children}</body>
    </html>
  );
}
