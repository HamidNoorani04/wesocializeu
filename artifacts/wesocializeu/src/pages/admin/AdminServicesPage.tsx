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
            <h1 className="text-3xl font-display font-bold text-white mb-1">Services</h1>
            <p className="text-white/40 text-sm">{services.length} services</p>
          </div>
          <Button onClick={() => { setCreating(true); setEditing(null); setForm(empty); }} className="bg-primary text-white rounded-none gap-2">
            <Plus size={16} /> Add Service
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-white/10 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold text-white">{editing ? "Edit Service" : "New Service"}</h2>
              <button onClick={() => { setCreating(false); setEditing(null); }} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" placeholder="auto-generated if empty" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Short Description</label>
                <input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Full Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Icon Name</label>
                <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Order</label>
                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Features (one per line)</label>
                <textarea
                  value={form.features.join("\n")}
                  onChange={(e) => setForm({ ...form, features: e.target.value.split("\n") })}
                  rows={4}
                  className="w-full bg-background border border-white/15 text-white px-3 py-2 focus:outline-none focus:border-primary text-sm resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} className="bg-primary text-white rounded-none">
                {editing ? "Save Changes" : "Create Service"}
              </Button>
              <Button variant="outline" onClick={() => { setCreating(false); setEditing(null); }} className="rounded-none border-white/20 text-white">Cancel</Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-px bg-white/5">
          {services.map((service) => (
            <div key={service.id} className="bg-background hover:bg-card transition-colors flex items-center justify-between p-5 gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium">{service.title}</div>
                <div className="text-white/40 text-sm truncate">{service.shortDescription}</div>
              </div>
              <div className="text-white/30 text-xs">{service.features.length} features</div>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(service)} className="text-white/50 hover:text-white rounded-none">
                  <Pencil size={15} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(service.id)} className="text-destructive/60 hover:text-destructive rounded-none">
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
