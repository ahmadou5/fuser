"use client";
import { Link as CustomLink } from "@/components/ui/link";
import * as motion from "motion/react-client";
import Image from "next/image";
import { communities } from "@/utils/itemList";

function CommunityCard({
  name,
  url,
  iconPath,
}: {
  name: string;
  url: string;
  iconPath: string;
}) {
  return (
    <div
      className="relative p-6 rounded-xl bg-[#1A1B1E]/40 border border-[#00A3FF]/10 backdrop-blur-sm
      before:absolute before:inset-0 before:rounded-xl before:pointer-events-none
      before:bg-gradient-to-b before:from-transparent before:to-transparent
      before:border before:border-[#00A3FF]/10 before:shadow-[0_0_25px_rgba(0,163,255,0.1)]"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-medium text-4xl">{`InFuse ${name}`}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-2 mt-2 ">
              {`${
                name === "X"
                  ? "Follow our official X handle to stay up to date with the latest update about InFuse wallet. Learn about the initiatives and more."
                  : "Join our Discord community to connect with fellow users, get support, and stay updated on the latest news and updates about InFuse Wallet."
              }
                
              `}
            </p>
          </div>
        </div>
        <div className="flex justify-between py-2 px-0">
          <CustomLink
            shine
            href={url}
            size="lg"
            className="lg:mt-auto"
            variant="outline"
          >{`${name === "X" ? "Follow" : "Join"} ${
            name === "X" ? "Us" : "Our"
          } ${name === "X" ? "on" : ""} ${name}`}</CustomLink>
          <Image
            src={iconPath || "/placeholder.svg"}
            alt={name}
            width={48}
            height={48}
            className="items-end lg:w-[100px] lg:h-[80px]"
          />
        </div>
      </div>
    </div>
  );
}

export default function Community() {
  return (
    <section id="community" className="py-20 lg:py-28">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#0A7EA4]">
            Join Our Community
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {communities.map((community, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <CommunityCard {...community} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
