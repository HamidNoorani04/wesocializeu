import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  useListBlogPosts,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
  getListBlogPostsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string;
  published: boolean;
  publishedAt?: string | null;
  createdAt: string;
};

const empty = { title: "", slug: "", excerpt: "", content: "", author: "", category: "", imageUrl: "", published: false, publishedAt: "" };

export default function AdminBlogPage() {
  const { data: posts = [] } = useListBlogPosts();
  const createBlogPost = useCreateBlogPost();
  const updateBlogPost = useUpdateBlogPost();
  const deleteBlogPost = useDeleteBlogPost();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);

  const invalidate = () => qc.invalidateQueries({ queryKey: getListBlogPostsQueryKey() });

  const handleSave = () => {
    const payload = { ...form, slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"), publishedAt: form.published ? new Date().toISOString() : undefined };
    if (editing) {
      updateBlogPost.mutate({ id: editing.id, ...payload }, { onSuccess: () => { setEditing(null); invalidate(); } });
    } else {
      createBlogPost.mutate(payload, { onSuccess: () => { setCreating(false); setForm(empty); invalidate(); } });
    }
  };

  const handleEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content, author: p.author, category: p.category, imageUrl: p.imageUrl, published: p.published, publishedAt: p.publishedAt ?? "" });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this post?")) {
      deleteBlogPost.mutate({ id }, { onSuccess: invalidate });
    }
  };

  const showForm = creating || !!editing;

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-1">Blog</h1>
            <p className="text-white/40 text-sm">{posts.length} posts</p>
          </div>
          <Button onClick={() => { setCreating(true); setEditing(null); setForm(empty); }} className="bg-primary text-white rounded-none gap-2">
            <Plus size={16} /> New Post
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-white/10 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold text-white">{editing ? "Edit Post" : "New Post"}</h2>
              <button onClick={() => { setCreating(false); setEditing(null); }} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated" className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Author</label>
                <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Category</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Image URL</label>
                <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Excerpt</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm resize-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Content</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm resize-none font-mono" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-primary" />
                <label htmlFor="published" className="text-sm text-white/70">Published</label>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-primary text-white rounded-none">
                {editing ? "Save Changes" : "Create Post"}
              </Button>
              <Button variant="outline" onClick={() => { setCreating(false); setEditing(null); }} className="rounded-none border-white/20 text-white">Cancel</Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-px bg-white/5">
          {posts.map((post) => (
            <div key={post.id} className="bg-background hover:bg-card transition-colors flex items-center gap-4 p-5">
              <img src={post.imageUrl} alt={post.title} className="w-16 h-12 object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{post.title}</div>
                <div className="text-white/40 text-xs">{post.category} · {post.author}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 font-bold uppercase tracking-wider shrink-0 ${post.published ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"}`}>
                {post.published ? "Published" : "Draft"}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(post)} className="text-white/50 hover:text-white rounded-none"><Pencil size={15} /></Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(post.id)} className="text-destructive/60 hover:text-destructive rounded-none"><Trash2 size={15} /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
