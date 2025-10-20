"use client";

import WhiteLogo from "@/assets/logo.svg";
import BlueLogo from "@/assets/footer-logo.svg";
//import { Button } from "@/components/ui/button";
//import { Link as CustomLink } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
//import { ThemeToggle } from "../ui/themeToggle";
import { useThemeStore } from "@/store/themeStore";
import { ThemeToggle } from "../ui/themeToggle";

const navLinks = [
  { href: "/#community", label: "Community" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/download", label: "Download" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { themeMode } = useThemeStore();

  const Logo = themeMode === "dark" ? WhiteLogo : BlueLogo;
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-200",
        scrolled
          ? "lg:bg-black/50 bg-black/50 lg:backdrop-blur-md backdrop-blur-md"
          : "lg:bg-transparent backdrop-blur-md bg-black/50"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            <Image src={Logo} height={230} width={89} alt="logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-300 transition-colors font-medium hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex lg:flex">
              <ThemeToggle />
            </div>
          </div>

          <button
            className="rounded-lg p-2 text-gray-300 hover:bg-white/5 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <div className="flex flex-col w-auto gap-4 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
