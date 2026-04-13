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
        <div className="pt-32 max-w-3xl mx-auto px-6">
          <div className="h-96 bg-[#f8f9fa] rounded-2xl animate-pulse" />
        </div>
      </PublicLayout>
    );
  }

  if (!post) {
    return (
      <PublicLayout>
        <div className="pt-32 max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-display font-bold text-[#1a202c] mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#4a5568] hover:text-primary text-sm mb-10 transition-colors">
              <ArrowLeft size={16} /> All Articles
            </Link>

            <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-4">{post.category}</span>
            <h1 className="text-[40px] md:text-[52px] font-extrabold text-[#1a202c] leading-tight tracking-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[rgba(74,85,104,0.6)] mb-10 pb-8 border-b border-black/[0.06]">
              <span>By {post.author}</span>
              {post.publishedAt && (
                <span>{new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
              )}
            </div>

            <div className="relative overflow-hidden rounded-2xl h-64 md:h-80 mb-10">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <p className="text-[#4a5568] text-xl mb-8 leading-relaxed">{post.excerpt}</p>

            <div className="prose prose-slate max-w-none">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-display font-bold text-[#1a202c] mt-10 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <h3 key={i} className="text-lg font-bold text-[#1a202c] mt-6 mb-3">
                      {paragraph.replace(/\*\*/g, "")}
                    </h3>
                  );
                }
                return (
                  <p key={i} className="text-[#4a5568] leading-relaxed mb-6 text-base">
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
