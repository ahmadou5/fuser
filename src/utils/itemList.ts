import TgIcon from "@/assets/icons/tg-icon.svg";
import XIcon from "@/assets/icons/x-icon.svg";
import X from "@/assets/icons/x.svg";
import Discord from "@/assets/icons/discord.svg";
import { Shield, Key, CloudDownloadIcon } from "lucide-react";
import HarriProfileImage from "@/assets/harri.svg";
import YukiProfileImage from "@/assets/yuki-profile-image.svg";
import Sign from "@/assets/sign.svg";
import Stake from "@/assets/stake.svg";
import Hodl from "@/assets/tokens.svg";
import Swap from "@/assets/swap.svg";
import Send from "@/assets/send.svg";
import NFT from "@/assets/nft.svg";
import AppLogo from "@/assets/splash.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
interface socialItem {
  name: string;
  url: string;
  iconPath: string;
  alt: string;
}

interface NewsItem {
  id: number;
  title: string;
  description: string;
}
interface Feature {
  iconUrl: string;
  title: string;
  description: string;
  isLeft?: boolean;
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
    title: 4,
    subtitle: "Active SVM Networks",
  },

  {
    title: "Multi-SVM",
    subtitle: "support",
  },
];

export const reviews: Reviews[] = [
  {
    avatar: YukiProfileImage,
    name: "Yuki @SOON Mainnet is LIVE",
    handle: "@frosmian88",
    content:
      "Just finishing talking with @4hmadou_5 and i really like the idea of first TG mini app wallet. @InFuseWallet is already deployed to @soon_svm devnet. Encouraging everyone to check this out.",
    verified: true,
  },
  {
    avatar: HarriProfileImage,
    name: "Harri | Solana Summit Africa",
    handle: "@Harri_obi",
    content:
      "Two @SuperteamNG projects (@InFuseWallet and @verxioprotocol) got a win in the Light Protocol ZK Compression Hackathon. That makes it 5 internal wins in the Solana Radar Hackathon sidetrack 🔥",
    verified: true,
  },
  {
    avatar: HarriProfileImage,
    name: "Harri | Solana Summit Africa",
    handle: "@Harri_obi",
    content: "Joined. Love the Interface.",
    verified: true,
  },
];

export const faqs = [
  {
    question: "What is InFuse Wallet?",
    answer:
      "InFuse Wallet is a multi-SVM crypto-assets wallet that allows users to securely store, manage, and interact with various digital assets and decentralized applications (dApps) across multiple Solana virtual Machine (SVM) based blockchain networks in one place.",
  },
  {
    question: "How secure is InFuse Wallet?",
    answer:
      "InFuse Wallet employs advanced security measures including MPC technology, multi-factor authentication, and social recovery features to ensure the highest level of protection for your digital assets.",
  },

  {
    question: 'What does "multi-SVM support" mean?',
    answer:
      "Multi-SVM support means you can manage cryptocurrencies across multiple Solana Virtual Machine (SVM) based blockchain networks (like Solana, Sonic and others) all within a single wallet interface, eliminating the need for multiple separate wallets.",
  },
];

export const communities = [
  {
    name: "X",
    url: "https://x.com/infusewallet",
    iconPath: X,
  },
  {
    name: "Discord",
    url: "https://discord.gg/3ve2KAvj",
    iconPath: Discord,
  },
];

// Default data
export const News: NewsItem[] = [
  {
    id: 1,
    title: "Feature Update",
    description:
      "InFuse Wallet V.0.0.9 is out, you can test it and use it now.",
  },
  {
    id: 2,
    title: "Solana Stablecoin Summit",
    description:
      "inFuse team will be live at Solana Stablecoin Summit Africa, in Nigeria Abuja on 3rd November come join us.",
  },
];

export const AppFeatures: Feature[] = [
  {
    iconUrl: Sign,
    title: "Frictionless onboarding.",
    description:
      "Set up your wallet using account that you already own. Web3 simplified, even your granny can use it.",
    isLeft: true,
  },
  {
    iconUrl: Hodl,
    title: "Hodl assets.",
    description:
      "Hodl and store any solana asset securely, with total control of your funds (Self-custodial).",
    isLeft: false,
  },
  {
    iconUrl: Swap,
    title: "Swap tokens.",
    description: "Swap any token on solana, with faster speed and lower fees.",
    isLeft: true,
  },
  {
    iconUrl: Send,
    title: "Send and receive.",
    description:
      "Send and also receive crypto transfer from a friend with confidence, just spend it limitless",
    isLeft: false,
  },
  {
    iconUrl: NFT,
    title: "Store Collectibles.",
    description:
      "Discover, store and buy collectibles all from your inFuse wallet.",
    isLeft: true,
  },

  {
    iconUrl: Stake,
    title: "Stake and earn rewards.",
    description:
      "Delegate your SOL to trusted validators directly from your wallet and start earning rewards.",
    isLeft: false,
  },
];

// Types
export interface BlogPostDetail {
  id: string;
  title: string;
  excerpt: string;
  content: BlogContent[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  coverImage: string;
  featured?: boolean;
}

interface BlogContent {
  type: "text" | "heading" | "list" | "image" | "video" | "quote";
  content: string | string[];
  level?: number;
  caption?: string;
}

// Mock Data
export const mockBlogPost: BlogPostDetail[] = [
  {
    id: "0",
    title: "Introducing InFuse Wallet Mobile App V1.0.0",
    excerpt:
      "We are excited to announce the launch of InFuse Wallet Mobile App V1.0.0, bringing a new era of secure and user-friendly crypto asset management to your fingertips.",
    author: {
      name: "Ahmad Auwal",
      role: "Co Founder & CTO",
      avatar:
        "https://pbs.twimg.com/profile_images/1906892426616172544/P-pKy-yF_400x400.jpg",
    },
    category: "Announcements",
    tags: ["Announcements", "Product Update", "News"],
    date: "Oct 18, 2025",
    readTime: "4 min read",
    difficulty: "Beginner",
    coverImage:
      "https://images.unsplash.com/photo-1508385082359-f2f2d6b5e3f3?w=1200&h=600&fit=crop",
    content: [
      {
        type: "text",
        content:
          "We are excited to announce the launch of InFuse Wallet Mobile App V1.0.0, bringing a new era of user-friendly crypto asset management to your fingertips.",
      },
      {
        type: "text",
        content:
          "With this release, we have focused on enhancing the user experience, and expanding our multi-SVM support to provide a seamless and reliable wallet solution for the whole solana users.",
      },
      {
        type: "text",
        content: "",
      },
    ],
    featured: true,
  },
];

interface AppData {
  type?: string;
  name: string;
  developer: string;
  icon: string | StaticImport;
  rating: number;
  reviewCount: string;
  downloads: string;
  size: string;
  ageRating: string;
  description: string;
  shortDescription: string;
  screenshots: string[];
  features: string[];
  categories: string[];
  downloadLink: string;
  lastUpdated: string;
  version: string;
  whatsNew: string;
}

export const appData: AppData = {
  type: "Beta",
  name: "InFuse Wallet",
  developer: "InFuse Wallet Inc.",
  icon: AppLogo,
  rating: 4.5,
  reviewCount: "14K",
  downloads: "10K+",
  size: "201 MB",
  ageRating: "13+",
  description:
    "Create a secure solana wallet with your email account, Hodl, store assets &  up to 18% p.a. on savings. InFuse Wallet offers seamless digital banking experience with no hidden fees, instant transfers, and best-in-class savings rates.",
  shortDescription: "Fast account opening, instant alerts & high savings rates",
  screenshots: ["1", "2", "3", "4", "5"],
  features: [
    "Easiest way to onboard to solana",
    "Borderless unlimited spending",
    "Solana wallet with just your email",
    "Internet capital market at your fingertips",
  ],
  categories: ["#1 top free in finance", "Crypto"],
  downloadLink: "https://expo.dev/artifacts/eas/uA88mAw6H1eHU2ip6pXjZp.apk",
  lastUpdated: "Oct 15, 2025",
  version: "1.0.0",
  whatsNew:
    "Nothing much to see here. Just squashing those pesky bugs and keeping your experience smooth as usual. See you!",
};

export const versions: AppData[] = [
  {
    name: "InFuse Wallet",
    developer: "InFuse Wallet Inc.",
    icon: AppLogo,
    rating: 4.5,
    reviewCount: "14K",
    downloads: "10K+",
    size: "201 MB",
    ageRating: "13+",
    description:
      "Open a bank account fast, get instant alerts & earn up to 18% p.a. on savings. Moniepoint Personal Banking offers seamless digital banking experience with no hidden fees, instant transfers, and best-in-class savings rates.",
    shortDescription:
      "Fast account opening, instant alerts & high savings rates",
    screenshots: ["1", "2", "3", "4", "5"],
    features: [
      "Easiest way to onboard to solana",
      "Borderless unlimited spending",
      "Solana wallet with just your email",
      "Internet capital market at your fingertips",
    ],
    categories: ["#1 top free in finance", "Crypto", "Wallet"],
    downloadLink: "https://expo.dev/artifacts/eas/uA88mAw6H1eHU2ip6pXjZp.apk",
    lastUpdated: "Oct 15, 2025",
    version: "1.0.0",
    whatsNew:
      "Nothing much to see here. Just squashing those pesky bugs and keeping your experience smooth as usual. See you!",
  },
];

export const disturb: BlogPostDetail[] = [
  {
    id: "1",
    title: "Introducing Phantom Perps",
    excerpt:
      "We're launching support for perpetual futures (perps) to help democratize access to some of crypto's most liquid and popular markets.",
    author: {
      name: "Femi Awomosu",
      role: "Senior Product Manager",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    category: "News",
    tags: ["DeFi", "News"],
    date: "Jul 8, 2025",
    readTime: "5 min read",
    difficulty: "Intermediate",
    coverImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop",
    content: [
      {
        type: "text",
        content:
          "We're launching support for perpetual futures (perps) to help democratize access to some of crypto's most liquid and popular markets.",
      },
      {
        type: "text",
        content:
          "Most perps platforms today are designed for pros with complex trading features, which can be hard to navigate for beginners. But with Phantom's intuitive, mobile-first design, you can easily open, close, and manage positions directly within your wallet. No extra apps, no confusing interfaces, and no compromises on speed, control, or performance.",
      },
      {
        type: "text",
        content:
          "Learn more about how we're making perps simple—so anyone can trade like pro.",
      },
      {
        type: "video",
        content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        type: "heading",
        content: "Why use perps?",
        level: 2,
      },
      {
        type: "text",
        content:
          "With perpetual contracts, you're not just trading tokens, you're betting on what you think will happen next. Unlike traditional futures, perps have no expiration date—you can hold them as long as you want.",
      },
      {
        type: "text",
        content: "With perps, you can:",
      },
      {
        type: "list",
        content: [
          "Speculate: Bet on the future price movements of tokens without having to own the underlying token.",
          "Go short: Think the price of an asset is going down? With perps you can short an asset unlike in spot trading, which only allows traders to go long.",
          "Use leverage: Control larger positions with less upfront capital, allowing you to amplify potential gains (or losses).",
          "Hedge your bets: If you hold a token in spot, and believe it might see a short-term price decline, you can open a short position to offset potential losses.",
        ],
      },
      {
        type: "heading",
        content: "Why trade perps in Phantom?",
        level: 2,
      },
      {
        type: "text",
        content: "Here's everything to love:",
      },
      {
        type: "list",
        content: [
          "100+ markets: Go long or short on the biggest tokens, like BTC, SOL, and ETH, as well as the hottest memes like PEPE, FARTCOIN, and DOGE.",
          "One wallet for everything: No need for multiple apps. Open, close, and manage your positions directly in Phantom's Home tab, right alongside your tokens and collectibles.",
          "Perps in your pocket: Trade anywhere, anytime. Go long or short in just a few taps—no need for a desktop computer and clunky trading interfaces.",
          "Stay in control: Automate your exit strategy with stop loss and take profit, and stay informed on your positions with real-time alerts.",
          "Powered by Hyperliquid: Benefit from Hyperliquid's deep liquidity, speedy transaction settlement, and proven reliability.",
        ],
      },
      {
        type: "heading",
        content: "Getting started",
        level: 2,
      },
      {
        type: "text",
        content: "You can get started with perps in just a few taps.",
      },
      {
        type: "heading",
        content: "Fund your perps balance",
        level: 3,
      },
      {
        type: "text",
        content:
          "Before you open a position, you'll need to fund your perps balance with SOL. It takes less than a minute and your SOL will automatically be converted to USDC on Hyperliquid.",
      },
      {
        type: "image",
        content:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
        caption: "Fund your perps balance with SOL",
      },
      {
        type: "heading",
        content: "Open a position",
        level: 3,
      },
      {
        type: "list",
        content: [
          "Choose from more than 100 perps contract options, and decide to go long (if you think the price will go up) or short (if you think the price will go down).",
          "Input the amount you'd like to trade with, use the slider to adjust your leverage, and set stop loss and take profit to limit losses and lock in gains.",
          "Finalize your order details, review your position, and open it. Remember—you can easily manage positions right from the Home tab, with real-time data at your fingertips.",
        ],
      },
      {
        type: "image",
        content:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        caption: "Open a position in just a few taps",
      },
      {
        type: "heading",
        content: "Understanding and managing risks",
        level: 2,
      },
      {
        type: "text",
        content:
          "Perps are a powerful trading tool. But they are not without risks.",
      },
      {
        type: "list",
        content: [
          "Greater potential losses with leverage: Leverage lets you control a larger position with a smaller amount of capital. While leverage can amplify potential returns, it can also amplify your potential losses.",
          "Liquidation risks: Liquidation is when a trader is forced to sell their position because asset prices moved too far against their position. Higher leverage increases the risk of liquidation.",
          "Funding rate costs: Perpetual futures use a mechanism called funding rates to keep prices in line with the spot market. Traders who hold positions for long periods will have to periodically pay funding fees, which reduce profitability, especially when using higher leverage.",
        ],
      },
      {
        type: "text",
        content: "Here are some friendly reminders to help you manage risks:",
      },
      {
        type: "list",
        content: [
          "Be cautious with leverage: Start small, and don't leverage more than you're willing to lose.",
          "Always set a stop loss: Protect yourself from market volatility by setting price levels at which you'll automatically close your position. This helps prevent liquidation, and protects your capital.",
        ],
      },
      {
        type: "heading",
        content: "Looking ahead",
        level: 2,
      },
      {
        type: "text",
        content:
          "Our goal is to make Phantom the simplest and most convenient way to trade perps on your phone. We're beginning to roll out perps to some users today, and will expand access in the coming weeks. And we'll be moving to constantly add new features and functionality.",
      },
      {
        type: "text",
        content:
          "If you don't have access yet—it's coming soon! And if you do, tag us on X and let us know what you think.",
      },
      {
        type: "heading",
        content: "Resources",
        level: 2,
      },
      {
        type: "text",
        content:
          "We've worked hard to make perps easy for everyone. If you have any questions about how perps work in Phantom or want to brush up on the basics, check out the following articles:",
      },
      {
        type: "list",
        content: [
          "How to trade perps in Phantom",
          "Understanding perps trading in Phantom",
          "What are perpetual futures?",
        ],
      },
      {
        type: "quote",
        content:
          "Note: Phantom Perps aren't available everywhere. Trading perps involves significant risk and may not be suitable for all users. This post is not intended for UK audiences.",
      },
    ],
    featured: true,
  },
];
