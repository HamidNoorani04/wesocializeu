import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  useListCreators,
  useCreateCreator,
  useUpdateCreator,
  useDeleteCreator,
  getListCreatorsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

type Creator = {
  id: number;
  name: string;
  handle: string;
  category: string;
  bio: string;
  imageUrl: string;
  instagramFollowers: number;
  tiktokFollowers: number;
  youtubeFollowers: number;
  engagementRate: number;
  featured: boolean;
  createdAt: string;
};

const empty = { name: "", handle: "", category: "", bio: "", imageUrl: "", instagramFollowers: 0, tiktokFollowers: 0, youtubeFollowers: 0, engagementRate: 0, featured: false };

export default function AdminCreatorsPage() {
  const { data: creators = [] } = useListCreators();
  const createCreator = useCreateCreator();
  const updateCreator = useUpdateCreator();
  const deleteCreator = useDeleteCreator();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Creator | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);

  const invalidate = () => qc.invalidateQueries({ queryKey: getListCreatorsQueryKey() });

  const handleSave = () => {
    if (editing) {
      updateCreator.mutate({ id: editing.id, ...form }, { onSuccess: () => { setEditing(null); invalidate(); } });
    } else {
      createCreator.mutate(form, { onSuccess: () => { setCreating(false); setForm(empty); invalidate(); } });
    }
  };

  const handleEdit = (c: Creator) => {
    setEditing(c);
    setForm({ name: c.name, handle: c.handle, category: c.category, bio: c.bio, imageUrl: c.imageUrl, instagramFollowers: c.instagramFollowers, tiktokFollowers: c.tiktokFollowers, youtubeFollowers: c.youtubeFollowers, engagementRate: c.engagementRate, featured: c.featured });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this creator?")) {
      deleteCreator.mutate({ id }, { onSuccess: invalidate });
    }
  };

  const showForm = creating || !!editing;

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-1">Creators</h1>
            <p className="text-white/40 text-sm">{creators.length} creators in network</p>
          </div>
          <Button onClick={() => { setCreating(true); setEditing(null); setForm(empty); }} className="bg-primary text-white rounded-none gap-2">
            <Plus size={16} /> Add Creator
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-white/10 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold text-white">{editing ? "Edit Creator" : "New Creator"}</h2>
              <button onClick={() => { setCreating(false); setEditing(null); }} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Handle</label>
                <input value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" placeholder="@handle" />
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
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Instagram Followers</label>
                <input type="number" value={form.instagramFollowers} onChange={(e) => setForm({ ...form, instagramFollowers: Number(e.target.value) })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">TikTok Followers</label>
                <input type="number" value={form.tiktokFollowers} onChange={(e) => setForm({ ...form, tiktokFollowers: Number(e.target.value) })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">YouTube Followers</label>
                <input type="number" value={form.youtubeFollowers} onChange={(e) => setForm({ ...form, youtubeFollowers: Number(e.target.value) })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Engagement Rate (%)</label>
                <input type="number" step="0.1" value={form.engagementRate} onChange={(e) => setForm({ ...form, engagementRate: Number(e.target.value) })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div className="flex items-center gap-3 mt-4">
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
                <label htmlFor="featured" className="text-sm text-white/70">Featured Creator</label>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-primary text-white rounded-none">
                {editing ? "Save Changes" : "Create Creator"}
              </Button>
              <Button variant="outline" onClick={() => { setCreating(false); setEditing(null); }} className="rounded-none border-white/20 text-white">Cancel</Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-px bg-white/5">
          {creators.map((creator) => (
            <div key={creator.id} className="bg-background hover:bg-card transition-colors flex items-center gap-4 p-4">
              <img src={creator.imageUrl} alt={creator.name} className="w-12 h-12 object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium">{creator.name} <span className="text-white/40 text-sm">{creator.handle}</span></div>
                <div className="text-white/40 text-xs">{creator.category}</div>
              </div>
              {creator.featured && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 font-bold uppercase tracking-wider shrink-0">Featured</span>
              )}
              <div className="text-white/40 text-xs shrink-0">{creator.engagementRate}% eng.</div>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(creator)} className="text-white/50 hover:text-white rounded-none">
                  <Pencil size={15} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(creator.id)} className="text-destructive/60 hover:text-destructive rounded-none">
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
