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
      <div className="pt-28 pb-16 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-xs text-primary uppercase tracking-widest font-bold mb-4">Ideas & Insights</div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-4">Blog</h1>
          <p className="text-white/50 text-xl max-w-xl">
            Industry intelligence, strategy guides, and creative thinking from the WeSocializeU team.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "border-white/15 text-white/50 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-white/40">
            <p className="text-xl">No articles yet in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-card border border-white/5 hover:border-primary/30 transition-all overflow-hidden cursor-pointer"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-primary font-bold uppercase tracking-widest mb-3">{post.category}</div>
                    <h2 className="text-lg font-display font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-white/50 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-white/30">
                      <span>By {post.author}</span>
                      {post.publishedAt && (
                        <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
