"use client";

import {
  Calendar,
  Clock,
  Share2,
  ChevronRight,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import * as motion from "motion/react-client";
import { useState } from "react";
import { ContentRenderer } from "./ContentRenderer";
import { TableOfContents } from "./TableOfContent";
import { RelatedArticles } from "./RelatedArticles";
import Image from "next/image";

// Types
interface BlogPostDetail {
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
}

interface BlogContent {
  type: "text" | "heading" | "list" | "image" | "video" | "quote";
  content: string | string[];
  level?: number;
  caption?: string;
}

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface RelatedPost {
  id: string;
  title: string;
  date: string;
  difficulty: string;
  image: string;
}

// Mock Data
const mockBlogPost: BlogPostDetail = {
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
};

const relatedPosts: RelatedPost[] = [
  {
    id: "2",
    title: "What are perpetual futures (perps)?",
    date: "Jul 8, 2025",
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    title: "How to short crypto: The essential guide",
    date: "Sep 3, 2025",
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    title: "Trade smarter with token charts in Phantom",
    date: "Jun 18, 2024",
    difficulty: "Beginner",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
  },
];

// Breadcrumb Component
const Breadcrumb = ({ category }: { category: string }) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
      <a href="/blog" className="hover:text-primary transition-colors">
        Blog
      </a>
      <ChevronRight className="w-4 h-4" />
      <div className="hover:text-primary transition-colors">{category}</div>
    </nav>
  );
};

// Share Button Component
const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all font-medium"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 right-0 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-2 min-w-[160px] z-50"
        >
          <button className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm">
            <Twitter className="w-4 h-4 text-blue-400" />
            Twitter
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm">
            <Facebook className="w-4 h-4 text-blue-600" />
            Facebook
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm">
            <Linkedin className="w-4 h-4 text-blue-500" />
            LinkedIn
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm"
          >
            <Link2 className="w-4 h-4 text-gray-400" />
            {copied ? "Copied!" : "Copy link"}
          </button>
        </motion.div>
      )}
    </div>
  );
};

// Main Blog Post Detail Page
export const BlogPostDetailPage = ({
  mockBlogPost,
}: {
  mockBlogPost: BlogPostDetail;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const tableOfContents: TableOfContentsItem[] = mockBlogPost.content
    .filter((item) => item.type === "heading")
    .map((item) => ({
      id:
        typeof item.content === "string"
          ? item.content.toLowerCase().replace(/[^a-z0-9]+/g, "-")
          : "",
      title: item.content as string,
      level: item.level || 2,
    }));

  return (
    <div className="min-h-screen py-12 text-white">
      <section className="relative py-12 border-b border-gray-800">
        <div className="container px-4 mx-auto max-w-4xl">
          <Breadcrumb category={mockBlogPost.category} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {mockBlogPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Image
                  height={60}
                  width={60}
                  src={mockBlogPost.author.avatar}
                  alt={mockBlogPost.author.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-800"
                />
                <div>
                  <p className="font-medium text-white">
                    {mockBlogPost.author.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {mockBlogPost.author.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <span className="flex items-center gap-1.5 text-sm">
                  <Calendar className="w-4 h-4" />
                  {mockBlogPost.date}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  mockBlogPost.difficulty === "Beginner"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : mockBlogPost.difficulty === "Intermediate"
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {mockBlogPost.difficulty}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                <Clock className="w-4 h-4 inline mr-2" />
                {mockBlogPost.readTime}
              </span>
              {mockBlogPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <ShareButton />
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                  isBookmarked
                    ? "bg-primary text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                {isBookmarked ? "Saved" : "Save"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative">
        <div className="container px-4 mx-auto max-w-6xl py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-video rounded-3xl overflow-hidden border border-gray-800"
          >
            <Image
              height={60}
              width={60}
              src={mockBlogPost.coverImage}
              alt={mockBlogPost.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-3xl"
            >
              <ContentRenderer content={mockBlogPost.content} />
            </motion.article>

            <aside className="hidden lg:block">
              <TableOfContents
                items={tableOfContents}
                activeId={activeSection}
              />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
