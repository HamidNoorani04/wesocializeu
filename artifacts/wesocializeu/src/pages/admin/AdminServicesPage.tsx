import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  useListServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  getListServicesQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

type Service = {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  imageUrl?: string | null;
  features: string[];
  order: number;
  createdAt: string;
};

const empty = { title: "", slug: "", description: "", shortDescription: "", icon: "star", imageUrl: "", features: [""], order: 0 };

const inputCls = "w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-3 py-2 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all";

export default function AdminServicesPage() {
  const { data: services = [] } = useListServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(empty);

  const invalidate = () => qc.invalidateQueries({ queryKey: getListServicesQueryKey() });

  const handleSave = () => {
    const payload = { ...form, features: form.features.filter(Boolean), slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-") };
    if (editing) {
      updateService.mutate({ id: editing.id, ...payload }, { onSuccess: () => { setEditing(null); invalidate(); } });
    } else {
      createService.mutate(payload, { onSuccess: () => { setCreating(false); setForm(empty); invalidate(); } });
    }
  };

  const handleEdit = (s: Service) => {
    setEditing(s);
    setForm({ title: s.title, slug: s.slug, description: s.description, shortDescription: s.shortDescription, icon: s.icon, imageUrl: s.imageUrl ?? "", features: s.features, order: s.order });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this service?")) {
      deleteService.mutate({ id }, { onSuccess: invalidate });
    }
  };

  const showForm = creating || !!editing;

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-[#1a202c] mb-1">Services</h1>
            <p className="text-[#4a5568] text-sm">{services.length} services</p>
          </div>
          <Button onClick={() => { setCreating(true); setEditing(null); setForm(empty); }} className="bg-primary text-white rounded-xl gap-2 shadow-[0px_4px_12px_0px_rgba(245,166,35,0.2)]">
            <Plus size={16} /> Add Service
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-display font-bold text-[#1a202c]">{editing ? "Edit Service" : "New Service"}</h2>
              <button onClick={() => { setCreating(false); setEditing(null); }} className="text-[#4a5568] hover:text-[#1a202c]"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} placeholder="auto-generated if empty" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Short Description</label>
                <input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Full Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Icon Name</label>
                <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Order</label>
                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#4a5568] mb-1">Features (one per line)</label>
                <textarea
                  value={form.features.join("\n")}
                  onChange={(e) => setForm({ ...form, features: e.target.value.split("\n") })}
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-primary text-white rounded-xl">
                {editing ? "Save Changes" : "Create Service"}
              </Button>
              <Button variant="outline" onClick={() => { setCreating(false); setEditing(null); }} className="rounded-xl border-black/10 text-[#4a5568]">Cancel</Button>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col gap-2">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-black/[0.06] rounded-2xl flex items-center justify-between p-4 gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex-1 min-w-0">
                <div className="text-[#1a202c] font-medium text-sm">{service.title}</div>
                <div className="text-[#4a5568] text-xs truncate mt-0.5">{service.shortDescription}</div>
              </div>
              <div className="text-[rgba(74,85,104,0.4)] text-xs">{service.features.length} features</div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(service)} className="text-[#4a5568] hover:text-[#1a202c] rounded-xl">
                  <Pencil size={14} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(service.id)} className="text-destructive/50 hover:text-destructive rounded-xl">
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
