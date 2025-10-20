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
