import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListBlogPosts } from "@workspace/api-client-react";

const CATEGORIES = ["All", "Industry Insights", "Strategy", "Data & Analytics", "Creator Tips", "Case Studies"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: posts = [], isLoading } = useListBlogPosts({ published: true });

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-[#f8f9fa] pt-32 pb-16 px-6 border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-4">Ideas & Insights</span>
            <h1 className="text-[56px] md:text-[72px] font-extrabold text-[#1a202c] leading-none tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-[#4a5568] text-lg max-w-xl leading-relaxed">
              Industry intelligence, strategy guides, and creative thinking from the WeSocializeU team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-[0px_4px_12px_0px_rgba(245,166,35,0.2)]"
                    : "border-black/10 text-[#4a5568] hover:border-primary/30 hover:text-primary bg-[#f8f9fa]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#f8f9fa] rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#4a5568] text-lg">No articles yet in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group bg-white border border-black/[0.06] rounded-2xl overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all cursor-pointer h-full"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-primary text-xs font-semibold uppercase tracking-widest">{post.category}</span>
                      <h2 className="text-base font-display font-bold text-[#1a202c] mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-[#4a5568] text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[rgba(74,85,104,0.5)] pt-4 border-t border-black/[0.06]">
                        <span>By {post.author}</span>
                        {post.publishedAt && (
                          <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
