import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  useListCaseStudies,
  useCreateCaseStudy,
  useUpdateCaseStudy,
  useDeleteCaseStudy,
  getListCaseStudiesQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

type CaseStudy = {
  id: number;
  title: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  imageUrl: string;
  roiPercent: number;
  reachMillion: number;
  engagementRate: number;
  featured: boolean;
  createdAt: string;
};

const empty = { title: "", client: "", industry: "", summary: "", challenge: "", solution: "", results: "", imageUrl: "", roiPercent: 0, reachMillion: 0, engagementRate: 0, featured: false };

export default function AdminCaseStudiesPage() {
  const { data: caseStudies = [] } = useListCaseStudies();
  const createCaseStudy = useCreateCaseStudy();
  const updateCaseStudy = useUpdateCaseStudy();
  const deleteCaseStudy = useDeleteCaseStudy();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);

  const invalidate = () => qc.invalidateQueries({ queryKey: getListCaseStudiesQueryKey() });

  const handleSave = () => {
    if (editing) {
      updateCaseStudy.mutate({ id: editing.id, ...form }, { onSuccess: () => { setEditing(null); invalidate(); } });
    } else {
      createCaseStudy.mutate(form, { onSuccess: () => { setCreating(false); setForm(empty); invalidate(); } });
    }
  };

  const handleEdit = (cs: CaseStudy) => {
    setEditing(cs);
    setForm({ title: cs.title, client: cs.client, industry: cs.industry, summary: cs.summary, challenge: cs.challenge, solution: cs.solution, results: cs.results, imageUrl: cs.imageUrl, roiPercent: cs.roiPercent, reachMillion: cs.reachMillion, engagementRate: cs.engagementRate, featured: cs.featured });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this case study?")) {
      deleteCaseStudy.mutate({ id }, { onSuccess: invalidate });
    }
  };

  const showForm = creating || !!editing;

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-1">Case Studies</h1>
            <p className="text-white/40 text-sm">{caseStudies.length} case studies</p>
          </div>
          <Button onClick={() => { setCreating(true); setEditing(null); setForm(empty); }} className="bg-primary text-white rounded-none gap-2">
            <Plus size={16} /> Add Case Study
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-white/10 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold text-white">{editing ? "Edit Case Study" : "New Case Study"}</h2>
              <button onClick={() => { setCreating(false); setEditing(null); }} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { label: "Title", key: "title" as const },
                { label: "Client", key: "client" as const },
                { label: "Industry", key: "industry" as const },
                { label: "Image URL", key: "imageUrl" as const },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">{label}</label>
                  <input value={form[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
                </div>
              ))}
              {(["summary", "challenge", "solution", "results"] as const).map((key) => (
                <div key={key} className="md:col-span-2">
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <textarea value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={2} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm resize-none" />
                </div>
              ))}
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">ROI %</label>
                <input type="number" value={form.roiPercent} onChange={(e) => setForm({ ...form, roiPercent: Number(e.target.value) })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Reach (Millions)</label>
                <input type="number" step="0.1" value={form.reachMillion} onChange={(e) => setForm({ ...form, reachMillion: Number(e.target.value) })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Engagement Rate %</label>
                <input type="number" step="0.1" value={form.engagementRate} onChange={(e) => setForm({ ...form, engagementRate: Number(e.target.value) })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div className="flex items-center gap-3 mt-4">
                <input type="checkbox" id="featured-cs" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
                <label htmlFor="featured-cs" className="text-sm text-white/70">Featured</label>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-primary text-white rounded-none">
                {editing ? "Save Changes" : "Create Case Study"}
              </Button>
              <Button variant="outline" onClick={() => { setCreating(false); setEditing(null); }} className="rounded-none border-white/20 text-white">Cancel</Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-px bg-white/5">
          {caseStudies.map((cs) => (
            <div key={cs.id} className="bg-background hover:bg-card transition-colors flex items-center gap-4 p-5">
              <img src={cs.imageUrl} alt={cs.title} className="w-16 h-12 object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium">{cs.title}</div>
                <div className="text-white/40 text-xs">{cs.client} · {cs.industry}</div>
              </div>
              <div className="hidden md:flex gap-4 text-xs text-white/40 shrink-0">
                <span className="text-accent font-bold">{cs.roiPercent}% ROI</span>
                <span className="text-secondary font-bold">{cs.reachMillion}M reach</span>
              </div>
              {cs.featured && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 font-bold uppercase tracking-wider shrink-0">Featured</span>}
              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(cs)} className="text-white/50 hover:text-white rounded-none"><Pencil size={15} /></Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(cs.id)} className="text-destructive/60 hover:text-destructive rounded-none"><Trash2 size={15} /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
