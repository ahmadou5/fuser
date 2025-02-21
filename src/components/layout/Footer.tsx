import FooterLogo from "@/assets/footer-logo.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Socials } from "@/utils/itemList";
export default function Footer() {
  return (
    <footer className="relative">
      <div
        className="absolute top-0 right-0 w-full h-[2px] bg-white/5"
        aria-hidden
      >
        <div className="w-[80%] h-full rounded-md bg-primary/70" />
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={FooterLogo}
                alt="InFuse Wallet"
                width={100}
                height={100}
              />
            </Link>
            <p className="text-sm text-gray-400">
              Copyright ©{new Date().getFullYear()} InFuse Wallet
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-start md:items-center gap-2 lg:gap-4">
            <h3 className="text-sm font-medium">Socials</h3>
            <div className="flex items-center gap-3">
              {Socials &&
                Socials.map((item, i) => (
                  <Link key={i} href={item.url} aria-label={item.alt}>
                    <Image
                      src={item.iconPath}
                      alt={item.alt}
                      width={28}
                      height={28}
                      className="h-10 w-10"
                    />
                  </Link>
                ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start md:items-end gap-2 lg:gap-4">
            <h3 className="text-sm font-medium">Contact us</h3>
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-sm text-gray-400">Still have questions?</p>
              <Button
                variant="default"
                className="bg-[#00A3FF] hover:bg-[#00A3FF]/90 text-sm"
              >
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
