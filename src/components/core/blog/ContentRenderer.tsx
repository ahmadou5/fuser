import Image from "next/image";
import type * as React from "react";

interface BlogContent {
  type: "text" | "heading" | "list" | "image" | "video" | "quote";
  content: string | string[];
  level?: number;
  caption?: string;
}
// Content Renderer Component
export const ContentRenderer = ({ content }: { content: BlogContent[] }) => {
  return (
    <div className="prose prose-invert max-w-none">
      {content.map((block, index) => {
        switch (block.type) {
          case "text":
            return (
              <p
                key={index}
                className="text-gray-300 leading-relaxed mb-6 text-lg"
              >
                {block.content}
              </p>
            );
          case "heading":
            const HeadingTag =
              `h${block.level}` as keyof React.JSX.IntrinsicElements;
            const headingId =
              typeof block.content === "string"
                ? block.content.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                : "";
            return (
              <HeadingTag
                key={index}
                id={headingId}
                className={`font-bold text-white mb-4 mt-12 scroll-mt-24 ${
                  block.level === 2 ? "text-3xl" : "text-2xl"
                }`}
              >
                {block.content}
              </HeadingTag>
            );
          case "list":
            return (
              <ul key={index} className="space-y-3 mb-6 ml-6">
                {Array.isArray(block.content) &&
                  block.content.map((item, i) => (
                    <li
                      key={i}
                      className="text-gray-300 leading-relaxed relative pl-2 text-lg"
                    >
                      <span className="absolute -left-4 text-primary font-bold">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
              </ul>
            );
          case "image":
            return (
              <figure key={index} className="my-12">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-purple-900/10 border border-gray-800">
                  <Image
                    height={60}
                    width={60}
                    src={block.content as string}
                    alt={block.caption || "Blog image"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-center text-gray-500 text-sm mt-4">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "video":
            return (
              <div key={index} className="my-12">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-gray-800">
                  <iframe
                    src={block.content as string}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="my-8 p-6 bg-gray-900/50 border-l-4 border-primary rounded-r-lg"
              >
                <p className="text-gray-300 italic">{block.content}</p>
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
