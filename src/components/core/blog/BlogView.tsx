import { useState } from "react";
import { BlogCard } from "@/components/core/blog/BlogCard";
import FeaturedBlogCard from "@/components/core/blog/FeatureCard";
import { BookOpen, ChevronDown, Filter, Search, Video } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import NavLogo from "@/assets/logo.svg";
import { BlogPostDetail } from "@/utils/itemList";

interface Category {
  name: string;
  slug: string;
}

// Mock Data

interface BlogViewProps {
  blogPosts: BlogPostDetail[];
  categories: Category[];
  loadModule: (id: string | number) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  blogPosts,
  categories,
  loadModule,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedContentType, setSelectedContentType] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || post.difficulty === selectedDifficulty;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black/0 text-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container px-4 mx-auto relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className=" ml-auto mr-auto text-5xl flex items-center justify-center py-2 lg:text-7xl font-bold tracking-tight mb-6">
              <Image src={NavLogo} height={260} width={300} alt="logo" />
              <span className="text-primary">Blog</span>
            </div>
            <p className="text-xl text-gray-400">
              All the latest news, updates, and announcements from InFuse
            </p>
          </div>
        </motion.div>
      </section>

      {/* Filters Section - Mobile Optimized */}
      <section className=" top-0 z-40 bg-black/0 backdrop-blur-xs border-b border-gray-800">
        <div className="container px-4 mx-auto py-6">
          {/* Mobile: Collapsible Filters */}
          <div className="md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between mb-4"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-white">Filters</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Collapsible Content */}
            {showFilters && (
              <div className="space-y-4 mb-4">
                {/* Content Type - Read/Watch */}
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-all">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm font-medium">Read</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition-all">
                    <Video className="w-4 h-4" />
                    <span className="text-sm font-medium">Watch</span>
                  </button>
                </div>

                {/* Difficulty Levels */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDifficulty("Beginner")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedDifficulty === "Beginner"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-gray-800 text-gray-400 border border-gray-700"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Beginner
                  </button>
                  <button
                    onClick={() => setSelectedDifficulty("Intermediate")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedDifficulty === "Intermediate"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                        : "bg-gray-800 text-gray-400 border border-gray-700"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Intermediate
                  </button>
                  <button
                    onClick={() => setSelectedDifficulty("Advanced")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedDifficulty === "Advanced"
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                        : "bg-gray-800 text-gray-400 border border-gray-700"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    Advanced
                  </button>
                </div>

                {/* Category Tags - Mobile Inside Filters */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === "all"
                        ? "bg-primary text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.name
                          ? "bg-primary text-white"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:block">
            {/* Row 1: Content Type (Read/Watch) and Search */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedContentType("read")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      selectedContentType === "read"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm font-medium">Read</span>
                  </button>
                  <button
                    onClick={() => setSelectedContentType("watch")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      selectedContentType === "watch"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span className="text-sm font-medium">Watch</span>
                  </button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors w-64"
                />
              </div>
            </div>

            {/* Row 2: Difficulty Levels with Colored Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedDifficulty("all")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDifficulty === "all"
                    ? "bg-gray-700 text-white border border-gray-600"
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700"
                }`}
              >
                All Levels
              </button>
              <button
                onClick={() => setSelectedDifficulty("Beginner")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDifficulty === "Beginner"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Beginner
              </button>
              <button
                onClick={() => setSelectedDifficulty("Intermediate")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDifficulty === "Intermediate"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Intermediate
              </button>
              <button
                onClick={() => setSelectedDifficulty("Advanced")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDifficulty === "Advanced"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                    : "bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Advanced
              </button>
            </div>

            {/* Row 3: Category Tags */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
          <div className="grid gap-8">
            {featuredPosts.map((post, index) => (
              <div key={post.id} className={index === 0 ? "lg:col-span-2" : ""}>
                <FeaturedBlogCard
                  post={post}
                  index={index}
                  loadModule={(id) => loadModule(id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Articles Grid */}
      <section className="py-16 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory === "all" ? "All Articles" : selectedCategory}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <BlogCard
                key={post.id}
                post={post}
                index={idx}
                loadModule={loadModule}
              />
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
