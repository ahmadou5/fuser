"use client";

import { BookOpen, Calendar, Clock } from "lucide-react";
import * as motion from "motion/react-client";
import DifficultyBadge from "./DifficultyBadge";
import Image from "next/image";
import { BlogPostDetail } from "@/utils/itemList";

interface BlogCardProps {
  post: BlogPostDetail;
  index: number;
  loadModule: (id: string | number) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, loadModule }) => {
  return (
    <motion.article
      onClick={() => loadModule(post.id)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group rounded-2xl overflow-hidden bg-gray-300/50 border border-gray-800 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="aspect-[16/9] relative overflow-hidden bg-gray-800">
        <Image
          width={600}
          height={400}
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty={post.difficulty} />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>
        <button className="mt-4 flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
          <BookOpen className="w-4 h-4" />
          Read
        </button>
      </div>
    </motion.article>
  );
};
