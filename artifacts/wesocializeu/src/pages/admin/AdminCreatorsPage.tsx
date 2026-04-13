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
const inputCls = "w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-3 py-2 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all";

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
            <h1 className="text-2xl font-display font-bold text-[#1a202c] mb-1">Creators</h1>
            <p className="text-[#4a5568] text-sm">{creators.length} creators in network</p>
          </div>
          <Button onClick={() => { setCreating(true); setEditing(null); setForm(empty); }} className="bg-primary text-white rounded-xl gap-2 shadow-[0px_4px_12px_0px_rgba(245,166,35,0.2)]">
            <Plus size={16} /> Add Creator
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-display font-bold text-[#1a202c]">{editing ? "Edit Creator" : "New Creator"}</h2>
              <button onClick={() => { setCreating(false); setEditing(null); }} className="text-[#4a5568] hover:text-[#1a202c]"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Handle</label>
                <input value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} className={inputCls} placeholder="@handle" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Category</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Image URL</label>
                <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Instagram Followers</label>
                <input type="number" value={form.instagramFollowers} onChange={(e) => setForm({ ...form, instagramFollowers: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">TikTok Followers</label>
                <input type="number" value={form.tiktokFollowers} onChange={(e) => setForm({ ...form, tiktokFollowers: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">YouTube Followers</label>
                <input type="number" value={form.youtubeFollowers} onChange={(e) => setForm({ ...form, youtubeFollowers: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Engagement Rate (%)</label>
                <input type="number" step="0.1" value={form.engagementRate} onChange={(e) => setForm({ ...form, engagementRate: Number(e.target.value) })} className={inputCls} />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
                <label htmlFor="featured" className="text-sm text-[#4a5568]">Featured Creator</label>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-primary text-white rounded-xl">
                {editing ? "Save Changes" : "Create Creator"}
              </Button>
              <Button variant="outline" onClick={() => { setCreating(false); setEditing(null); }} className="rounded-xl border-black/10 text-[#4a5568]">Cancel</Button>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col gap-2">
          {creators.map((creator) => (
            <div key={creator.id} className="bg-white border border-black/[0.06] rounded-2xl flex items-center gap-4 p-4 shadow-sm hover:shadow-md transition-all">
              <img src={creator.imageUrl} alt={creator.name} className="w-12 h-12 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[#1a202c] font-medium text-sm">{creator.name} <span className="text-[#4a5568] text-xs">{creator.handle}</span></div>
                <div className="text-[rgba(74,85,104,0.6)] text-xs mt-0.5">{creator.category}</div>
              </div>
              {creator.featured && (
                <span className="text-[10px] bg-[rgba(245,166,35,0.1)] text-primary border border-[rgba(245,166,35,0.15)] px-2 py-1 font-semibold uppercase tracking-wider rounded-lg flex-shrink-0">Featured</span>
              )}
              <div className="text-[rgba(74,85,104,0.5)] text-xs flex-shrink-0">{creator.engagementRate}% eng.</div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(creator)} className="text-[#4a5568] hover:text-[#1a202c] rounded-xl">
                  <Pencil size={14} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(creator.id)} className="text-destructive/50 hover:text-destructive rounded-xl">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
