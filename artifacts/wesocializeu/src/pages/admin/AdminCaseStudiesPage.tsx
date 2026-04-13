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
const inputCls = "w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-3 py-2 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all";

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
            <h1 className="text-2xl font-display font-bold text-[#1a202c] mb-1">Case Studies</h1>
            <p className="text-[#4a5568] text-sm">{caseStudies.length} case studies</p>
          </div>
          <Button onClick={() => { setCreating(true); setEditing(null); setForm(empty); }} className="bg-primary text-white rounded-xl gap-2 shadow-[0px_4px_12px_0px_rgba(245,166,35,0.2)]">
            <Plus size={16} /> Add Case Study
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-display font-bold text-[#1a202c]">{editing ? "Edit Case Study" : "New Case Study"}</h2>
              <button onClick={() => { setCreating(false); setEditing(null); }} className="text-[#4a5568] hover:text-[#1a202c]"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { label: "Title", key: "title" as const },
                { label: "Client", key: "client" as const },
                { label: "Industry", key: "industry" as const },
                { label: "Image URL", key: "imageUrl" as const },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-[#4a5568] mb-1">{label}</label>
                  <input value={form[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputCls} />
                </div>
              ))}
              {(["summary", "challenge", "solution", "results"] as const).map((key) => (
                <div key={key} className="md:col-span-2">
                  <label className="block text-xs font-medium text-[#4a5568] mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <textarea value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={2} className={`${inputCls} resize-none`} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">ROI %</label>
                <input type="number" value={form.roiPercent} onChange={(e) => setForm({ ...form, roiPercent: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Reach (Millions)</label>
                <input type="number" step="0.1" value={form.reachMillion} onChange={(e) => setForm({ ...form, reachMillion: Number(e.target.value) })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Engagement Rate %</label>
                <input type="number" step="0.1" value={form.engagementRate} onChange={(e) => setForm({ ...form, engagementRate: Number(e.target.value) })} className={inputCls} />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <input type="checkbox" id="featured-cs" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-primary" />
                <label htmlFor="featured-cs" className="text-sm text-[#4a5568]">Featured</label>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-primary text-white rounded-xl">
                {editing ? "Save Changes" : "Create Case Study"}
              </Button>
              <Button variant="outline" onClick={() => { setCreating(false); setEditing(null); }} className="rounded-xl border-black/10 text-[#4a5568]">Cancel</Button>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col gap-2">
          {caseStudies.map((cs) => (
            <div key={cs.id} className="bg-white border border-black/[0.06] rounded-2xl flex items-center gap-4 p-4 shadow-sm hover:shadow-md transition-all">
              <img src={cs.imageUrl} alt={cs.title} className="w-16 h-12 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[#1a202c] font-medium text-sm">{cs.title}</div>
                <div className="text-[rgba(74,85,104,0.5)] text-xs mt-0.5">{cs.client} · {cs.industry}</div>
              </div>
              <div className="hidden md:flex gap-3 text-xs flex-shrink-0">
                <span className="text-primary font-bold">{cs.roiPercent}% ROI</span>
                <span className="text-[#4a5568]">{cs.reachMillion}M reach</span>
              </div>
              {cs.featured && (
                <span className="text-[10px] bg-[rgba(245,166,35,0.1)] text-primary border border-[rgba(245,166,35,0.15)] px-2 py-1 font-semibold uppercase tracking-wider rounded-lg flex-shrink-0">Featured</span>
              )}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(cs)} className="text-[#4a5568] hover:text-[#1a202c] rounded-xl"><Pencil size={14} /></Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(cs.id)} className="text-destructive/50 hover:text-destructive rounded-xl"><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
