"use client";

import { Calendar, ChevronRight, Clock } from "lucide-react";
import * as motion from "motion/react-client";
import DifficultyBadge from "./DifficultyBadge";
import Image from "next/image";
import { BlogPostDetail } from "@/utils/itemList";

interface FeaturedCardProps {
  post: BlogPostDetail;
  index: number;
  loadModule: (id: string | number) => void;
}

const FeaturedBlogCard: React.FC<FeaturedCardProps> = ({
  post,
  loadModule,
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-primary/30 transition-all duration-300"
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10" />
        <Image
          width={600}
          height={400}
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <div className="flex items-center gap-3 mb-4">
          <DifficultyBadge difficulty={post.difficulty} />
          <span className="text-primary text-sm font-medium">
            {post.category}
          </span>
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>
        <div
          onClick={() => loadModule(post.id)}
          className="mt-4 flex items-center gap-2 text-primary cursor-pointer font-medium group-hover:gap-3  transition-all"
        >
          Read Article
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.article>
  );
};
export default FeaturedBlogCard;
