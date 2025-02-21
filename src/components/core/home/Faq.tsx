'use client';

import { CustomAccordion } from '@/components/ui/custom-accordion';
import * as motion from 'motion/react-client';

const faqs = [
  {
    question: 'What is InFuse Wallet?',
    answer:
      'InFuse Wallet is a multi-chain cryptocurrency wallet that allows users to securely store, manage, and interact with various digital assets and decentralized applications (dApps) across multiple blockchain networks in one place.',
  },
  {
    question: 'How secure is InFuse Wallet?',
    answer:
      'InFuse Wallet employs advanced security measures including MPC technology, multi-factor authentication, and social recovery features to ensure the highest level of protection for your digital assets.',
  },
  {
    question: 'What does "multi-chain support" mean?',
    answer:
      'Multi-chain support means you can manage cryptocurrencies from different blockchain networks (like Ethereum, Solana, and others) all within a single wallet interface, eliminating the need for multiple separate wallets.',
  },
];

export default function FAQ() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-[#00A3FF] max-w-lg">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-lg lg:text-xl">
              Explore our FAQs to learn more about InFuse Wallet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CustomAccordion items={faqs} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
