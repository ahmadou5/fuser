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
import intro from "@/assets/intro.svg";
import onboard from "@/assets/onboard.svg";
import sent from "@/assets/sent.svg";
import confirm from "@/assets/confirm.svg";
import amount from "@/assets/amount.svg";
import select from "@/assets/select.svg";
import tap from "@/assets/tap.svg";
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
    title: "Introducing InFuse Wallet V1.0.0",
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
    coverImage: intro,
    content: [
      {
        type: "text",
        content:
          "We are excited to announce the launch of InFuse Wallet Mobile App V1.0.0, bringing a new era of secure and user-friendly crypto asset management to your fingertips.",
      },
      {
        type: "text",
        content:
          "With this release, we have focused on enhancing the user experience and expanding our multi-SVM support to provide a seamless and reliable wallet solution for the entire Solana ecosystem.",
      },
      {
        type: "text",
        content:
          "Learn more about how we're making crypto simple—so anyone can manage their digital assets like a pro.",
      },
      {
        type: "heading",
        content: "Why choose InFuse Wallet?",
        level: 2,
      },
      {
        type: "text",
        content:
          "InFuse Wallet isn't just another crypto wallet. We've built it from the ground up to be intuitive, secure, and powerful enough for both beginners and experienced users.",
      },
      {
        type: "text",
        content: "Here's what makes InFuse special:",
      },
      {
        type: "list",
        content: [
          "Multi-SVM support: Seamlessly interact with multiple Solana Virtual Machine (SVM) chains, giving you access to a broader ecosystem of tokens and dApps.",

          "Lightning-fast transactions: Experience near-instant transaction confirmations powered by Solana's high-performance blockchain.",
          "Clean, intuitive interface: Manage all your crypto assets in one place with a beautiful, easy-to-navigate design.",
          "Built for mobile: Trade, send, and receive tokens anywhere, anytime—right from your pocket.",
        ],
      },
      {
        type: "heading",
        content: "Key features in V1.0.0",
        level: 2,
      },
      {
        type: "list",
        content: [
          "Multi-wallet support: Create and manage multiple wallets within a single app.",
          "Token discovery: Easily discover and add SPL tokens to your wallet.",
          "Transaction history: View your complete transaction history with detailed information.",
          "QR code scanning: Send tokens by simply scanning a QR code.",
          "Address book: Save frequently used addresses for quick access.",
          "Biometric authentication: Secure your wallet with fingerprint or face recognition.",
          "Real-time price tracking: Monitor token prices and portfolio value in real-time.",
        ],
      },
      {
        type: "heading",
        content: "Getting started with InFuse Wallet",
        level: 2,
      },
      {
        type: "text",
        content:
          "Setting up your InFuse Wallet is quick and easy. Here's how to get started:",
      },
      {
        type: "heading",
        content: "Create your wallet",
        level: 3,
      },
      {
        type: "list",
        content: [
          "Download InFuse Wallet from the App Store or Google Play Store.",
          "Open the app and tap 'Create New Wallet' to generate a new wallet.",
          "Write down your recovery phrase (12 or 24 words) and store it somewhere safe. This is the ONLY way to recover your wallet if you lose access.",
          "Verify your recovery phrase by entering the words in the correct order.",
          "Set up biometric authentication for quick and secure access.",
        ],
      },
      {
        type: "image",
        content: onboard,
        caption: "Create your wallet in just a few taps",
      },
      {
        type: "heading",
        content: "Fund your wallet",
        level: 3,
      },
      {
        type: "text",
        content:
          "Before you can send tokens, you'll need to add some funds to your wallet. There are several ways to do this:",
      },
      {
        type: "list",
        content: [
          "Receive from another wallet: Tap 'Receive' on your home screen, copy your wallet address or share your QR code, and have someone send tokens to your address.",
          "Buy with fiat: Use our integrated on-ramp partners to purchase SOL or other tokens with your credit card or bank transfer.",
          "Import existing wallet: If you already have a Solana wallet, you can import it using your recovery phrase or private key.",
        ],
      },
      {
        type: "heading",
        content: "How to send tokens",
        level: 2,
      },
      {
        type: "text",
        content:
          "Sending tokens with InFuse Wallet is simple and secure. Follow these steps:",
      },
      {
        type: "image",
        content: sent,
        caption: "Learn how to send tokens with InFuse Wallet",
      },
      {
        type: "heading",
        content: "Step 1: Select the token",
        level: 3,
      },
      {
        type: "text",
        content:
          "From your home screen, tap on the token you want to send. This will open the token detail page.",
      },
      {
        type: "image",
        content: select,
        caption: "Select a token to send",
      },
      {
        type: "heading",
        content: "Step 2: Initiate the transfer",
        level: 3,
      },
      {
        type: "list",
        content: [
          "Tap the 'Send' icon at the bottom of the screen.",
          "Enter the recipient's wallet address, or tap the QR code icon to scan their address.",
          "You can also select an address from your saved contacts in the address book.",
        ],
      },
      {
        type: "image",
        content: tap,
        caption: "Click the send button and enter receipient address",
      },
      {
        type: "heading",
        content: "Step 3: Enter the amount",
        level: 3,
      },
      {
        type: "list",
        content: [
          "Type in the amount you want to send, or tap 'Max' to send your entire balance.",
          "The app will automatically calculate the network fee (typically a fraction of a cent on Solana).",
          "Review the total amount including fees to ensure everything is correct.",
        ],
      },
      {
        type: "image",
        content: amount,
        caption: "Enter token amount to send",
      },
      {
        type: "heading",
        content: "Step 4: Review and confirm",
        level: 3,
      },
      {
        type: "list",
        content: [
          "Double-check the recipient address—crypto transactions are irreversible!",
          "Verify the amount and network fee.",
          "Tap 'Confirm' to proceed with the transaction.",
        ],
      },
      {
        type: "image",
        content: confirm,
        caption: "Review the Transaction and then confirm it.",
      },
      {
        type: "heading",
        content: "Step 5: Track your transaction",
        level: 3,
      },
      {
        type: "text",
        content:
          "Once confirmed, your transaction will be broadcast to the Solana network. You can track its status in real-time from the solana transaction explorer. Most transactions confirm within seconds!",
      },
      {
        type: "heading",
        content: "Pro tips for sending tokens",
        level: 2,
      },
      {
        type: "list",
        content: [
          "Always double-check addresses: Copy-paste errors or typos can result in lost funds. Use the QR code scanner when possible.",
          "Start with a small test transaction: If sending a large amount to a new address, send a small test amount first to verify the address is correct.",
          "Save frequent contacts: Use the address book feature to save addresses you send to regularly.",
          "Keep some SOL for fees: Make sure you always have a small amount of SOL in your wallet to pay for transaction fees.",
        ],
      },
      {
        type: "heading",
        content: "Security best practices",
        level: 2,
      },
      {
        type: "text",
        content:
          "Your security is our top priority. Follow these guidelines to keep your assets safe:",
      },
      {
        type: "list",
        content: [
          "Enable biometric authentication: This adds an extra layer of security and makes accessing your wallet more convenient.",
          "Keep your app updated: Always use the latest version of InFuse Wallet to benefit from security improvements and new features.",
          "Be cautious of phishing: Only download InFuse Wallet from official app stores. Watch out for fake websites and apps.",
        ],
      },
      {
        type: "heading",
        content: "Troubleshooting common issues",
        level: 2,
      },
      {
        type: "text",
        content: "Running into problems? Here are solutions to common issues:",
      },
      {
        type: "list",
        content: [
          "Transaction pending: Solana transactions usually confirm within seconds. If your transaction is stuck, try refreshing the app or checking Solana network status.",
          "Insufficient funds for fee: Make sure you have enough SOL to cover the transaction fee (usually around 0.000005 SOL).",
          "Can't connect to network: Check your internet connection and try switching between WiFi and mobile data.",
        ],
      },
      {
        type: "heading",
        content: "What's next?",
        level: 2,
      },
      {
        type: "text",
        content:
          "This is just the beginning for InFuse Wallet. We're committed to continuously improving the app and adding new features based on your feedback.",
      },
      {
        type: "text",
        content: "Coming soon:",
      },
      {
        type: "list",
        content: [
          "NFT gallery and marketplace integration",
          "In-app staking for supported tokens",
          "DApp browser for seamless access to Solana dApps",
          "Multi-language support",
          "Advanced portfolio analytics",
          "Hardware wallet integration",
        ],
      },
      {
        type: "heading",
        content: "Join the InFuse community",
        level: 2,
      },
      {
        type: "text",
        content:
          "We'd love to hear from you! Share your feedback, report bugs, or suggest new features:",
      },
      {
        type: "list",
        content: [
          "Follow us on X (Twitter) @InFuseWallet",
          "Join our Discord community",
          "Visit our website at infusewallet.com",
          "Email us at support@infusewallet.com",
        ],
      },
      {
        type: "heading",
        content: "Resources",
        level: 2,
      },
      {
        type: "text",
        content:
          "New to crypto or need more help? Check out these helpful resources:",
      },
      {
        type: "list",
        content: [
          "Getting started with InFuse Wallet",
          "How to keep your crypto safe",
          "Understanding Solana and SPL tokens",
          "Frequently Asked Questions",
        ],
      },
      {
        type: "quote",
        content:
          "Important: Never share your recovery phrase or private keys with anyone. InFuse Wallet will never ask for this information. Always verify you're using the official InFuse Wallet app from trusted sources.",
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
