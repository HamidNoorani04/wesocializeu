import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useGetBlogPost, getGetBlogPostQueryKey } from "@workspace/api-client-react";

export default function BlogPostPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data: post, isLoading } = useGetBlogPost(id, { query: { enabled: !!id, queryKey: getGetBlogPostQueryKey(id) } });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="pt-32 container mx-auto px-6 max-w-3xl">
          <div className="h-96 animate-pulse bg-card" />
        </div>
      </PublicLayout>
    );
  }

  if (!post) {
    return (
      <PublicLayout>
        <div className="pt-32 container mx-auto px-6 text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-primary">Back to Blog</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-12 transition-colors">
              <ArrowLeft size={16} /> All Articles
            </Link>

            <div className="text-xs text-primary font-bold uppercase tracking-widest mb-4">{post.category}</div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-white/40 mb-8">
              <span>By {post.author}</span>
              {post.publishedAt && (
                <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              )}
            </div>

            <div className="relative overflow-hidden h-64 md:h-80 mb-10">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <p className="text-xl text-white/70 mb-8 leading-relaxed font-light">{post.excerpt}</p>

            <div className="prose prose-invert prose-lg max-w-none">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-display font-bold text-white mt-10 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <h3 key={i} className="text-lg font-bold text-white mt-6 mb-3">
                      {paragraph.replace(/\*\*/g, "")}
                    </h3>
                  );
                }
                return (
                  <p key={i} className="text-white/60 leading-relaxed mb-6">
                    {paragraph.replace(/\*\*([^*]+)\*\*/g, "$1")}
                  </p>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
