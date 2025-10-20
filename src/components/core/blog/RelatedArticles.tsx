import Image from "next/image";
import * as motion from "motion/react-client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RelatedPost {
  id: string;
  title: string;
  date: string;
  difficulty: string;
  image: string;
}
// Related Articles Component
export const RelatedArticles = ({ posts }: { posts: RelatedPost[] }) => {
  return (
    <section className="mt-20 py-16 border-t border-gray-800">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-bold">
          Related <span className="text-primary">articles</span>
        </h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.article
            key={post.id}
            whileHover={{ y: -4 }}
            className="group rounded-2xl overflow-hidden bg-gray-900/50 border border-gray-800 hover:border-primary/30 transition-all"
          >
            <div className="aspect-video relative overflow-hidden bg-gray-800">
              <Image
                height={60}
                width={60}
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.date}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    post.difficulty === "Beginner"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : post.difficulty === "Intermediate"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-purple-500/10 text-purple-400"
                  }`}
                >
                  {post.difficulty}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
