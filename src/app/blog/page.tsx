"use client";

import { useEffect, useState } from "react";
import { BlogPostDetail, mockBlogPost } from "@/utils/itemList";
import { BlogView } from "@/components/core/blog/BlogView";
import { BlogPostDetailPage } from "@/components/core/blog/BlogDetailView";

interface Category {
  name: string;
  slug: string;
}

// Mock Data
const categories: Category[] = [
  { name: "News", slug: "news" },
  { name: "Solana", slug: "solana" },
  { name: "Wallet", slug: "wallet" },
  { name: "DeFi", slug: "defi" },
  { name: "Security", slug: "security" },
  { name: "NFTs", slug: "nfts" },
];

export default function BlogPage() {
  const [moduleId, setModuleId] = useState<string | number | null>(null);
  const [moduleData, setModuleData] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.Document) {
      // Extract module ID from URL hash or search params
      const urlParams = new URLSearchParams(window.location.search);
      const hashId = window.location.hash.replace("#", "");
      const searchId = urlParams.get("id");

      // Try to get ID from hash first, then search params, then path
      const id = hashId || searchId;

      if (id) {
        setModuleId(id);
        loadModuleData(id);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const loadModuleData = async (id: string | number) => {
    try {
      setLoading(true);
      setModuleId(id); // Set the module ID here

      const data = mockBlogPost.filter((blogpost) => blogpost.id === id);
      if (data.length > 0) {
        setModuleData(data[0]);
        if (window.Document) {
          window.history.replaceState(null, "", `/blog#${id}`);
        }
      }
    } catch (error) {
      console.error("Error loading module data:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div title="Loading...">
        <main className={"w-full h-screen"}>
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  if (!moduleId || !moduleData) {
    return (
      <main>
        <BlogView
          blogPosts={mockBlogPost}
          categories={categories}
          loadModule={(id) => loadModuleData(id)}
        />
      </main>
    );
  }

  return (
    <main>
      <BlogPostDetailPage mockBlogPost={moduleData} />
    </main>
  );
}
