import SplashScreen from '@/components/core/SplashScreen';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const inter = Montserrat({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'InFuse Wallet',
  description:
    'A secured multichain MPC wallet. simply create a seedless and recoverable wallet account.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SplashScreen />
        <header>
          <Navbar />
        </header>

        {children}

        <Footer />
      </body>
    </html>
  );
}
