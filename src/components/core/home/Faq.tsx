"use client";

import BottomBlueLine from "@/assets/bottom-blue-line.svg";
import { CustomAccordion } from "@/components/ui/custom-accordion";
import * as motion from "motion/react-client";
import Image from "next/image";
import { faqs } from "@/utils/itemList";

export default function FAQ() {
  return (
    <section className="relative py-20 lg:py-28" id="faq">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-[#0A7EA4] max-w-lg">
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
            viewport={{ once: false }}
          >
            <CustomAccordion items={faqs} />
          </motion.div>
        </div>
      </div>

      <div
        className={`absolute hidden lg:block lg:left-0 lg:top-[18rem] w-fit h-fit -z-10`}
      >
        <Image src={BottomBlueLine} alt="Bottom Blue Line" />
      </div>
    </section>
  );
}
