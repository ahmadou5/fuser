import TgIcon from "@/assets/icons/tg-icon.svg";
import XIcon from "@/assets/icons/x-icon.svg";
import { Shield, Key, CloudDownloadIcon } from "lucide-react";
import HarriProfileImage from "@/assets/harri-profile-image.svg";
import YukiProfileImage from "@/assets/yuki-profile-image.svg";
interface socialItem {
  name: string;
  url: string;
  iconPath: string;
  alt: string;
}

interface Reviews {
  avatar: string;
  name: string;
  handle: string;
  content: string;
  verified: boolean;
}

export const Socials: socialItem[] = [
  {
    name: "X",
    url: "https://x.com/infusewallet",
    iconPath: XIcon,
    alt: "𝕏",
  },
  {
    name: "TG",
    url: "https://t.me/infusewallet",
    iconPath: TgIcon,
    alt: "Telegram",
  },
  {
    name: "Discord",
    url: "https://discord.gg/3ve2KAvj",
    iconPath: TgIcon,
    alt: "discord",
  },
];

export const features = [
  {
    icon: Key,
    title: "Seedless Wallet",
    description:
      "Create a wallet that is secured by accounts you already have, you won't have to worry about seed phrases.",
    variant: "dark" as const,
  },
  {
    icon: CloudDownloadIcon,
    title: "Social Recovery",
    description:
      "Easily recover your non-custodial wallet using your phone number or email account.",
    variant: "dark" as const,
  },
  {
    icon: Shield,
    title: "Security",
    description:
      "Experience the most secured programmable MPC wallet, Leveraging advanced and secured cryptography.",
    variant: "dark" as const,
  },
  //  {
  //    icon: LinkIcon,
  //    title: "Multi-chain Support",
  //    description:
  //      "Manage Your assets across multiple blockchain network from a single interface.",
  //    variant: "blue" as const,
  //  },
];

export const Stats = [
  {
    title: "3",
    subtitle: "Active Networks",
  },

  {
    title: "Multi-chain",
    subtitle: "support",
  },
];

export const reviews: Reviews[] = [
  {
    avatar: YukiProfileImage,
    name: "Yuki @SOON Mainnet is LIVE",
    handle: "@frosmian88",
    content:
      "Just finishing talking with @4hmmadou_5 and i really like the idea of first TG mini app wallet. @InFuseWallet is already deployed to @soon_svm devnet. Encouraging everyone to check this out.",
    verified: true,
  },
  {
    avatar: HarriProfileImage,
    name: "Harri",
    handle: "@Harri_obi",
    content:
      "Two @SuperteamNG projects (@InFuseWallet and @verxioprotocol) got a win in the Light Protocol ZK Compression Hackathon. That makes it 5 internal wins in the Solana Radar Hackathon sidetrack 🔥",
    verified: true,
  },
  {
    avatar: HarriProfileImage,
    name: "Harri",
    handle: "@Harri_obi",
    content: "Joined. Love the Interface.",
    verified: true,
  },
];

export const faqs = [
  {
    question: "What is InFuse Wallet?",
    answer:
      "InFuse Wallet is a multi-chain cryptocurrency wallet that allows users to securely store, manage, and interact with various digital assets and decentralized applications (dApps) across multiple blockchain networks in one place.",
  },
  {
    question: "How secure is InFuse Wallet?",
    answer:
      "InFuse Wallet employs advanced security measures including MPC technology, multi-factor authentication, and social recovery features to ensure the highest level of protection for your digital assets.",
  },
  {
    question: "What is MPC?",
    answer:
      "InFuse Wallet employs advanced security measures including MPC technology, multi-factor authentication, and social recovery features to ensure the highest level of protection for your digital assets.",
  },
  {
    question: 'What does "multi-chain support" mean?',
    answer:
      "Multi-chain support means you can manage cryptocurrencies from different blockchain networks (like Ethereum, Solana, and others) all within a single wallet interface, eliminating the need for multiple separate wallets.",
  },
];
