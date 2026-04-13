import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  useListEnquiries,
  useUpdateEnquiry,
  useDeleteEnquiry,
  getListEnquiriesQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

type EnquiryType = "contact" | "brand" | "creator" | undefined;
type EnquiryStatus = "new" | "read" | "replied" | undefined;

export default function AdminEnquiriesPage() {
  const [filterType, setFilterType] = useState<EnquiryType>(undefined);
  const [filterStatus, setFilterStatus] = useState<EnquiryStatus>(undefined);
  const { data: enquiries = [] } = useListEnquiries({ type: filterType, status: filterStatus });
  const updateEnquiry = useUpdateEnquiry();
  const deleteEnquiry = useDeleteEnquiry();
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState<number | null>(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: getListEnquiriesQueryKey() });

  const handleStatus = (id: number, status: "new" | "read" | "replied") => {
    updateEnquiry.mutate({ id, status }, { onSuccess: invalidate });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this enquiry?")) {
      deleteEnquiry.mutate({ id }, { onSuccess: invalidate });
    }
  };

  const TYPE_COLORS: Record<string, string> = {
    brand: "bg-primary/20 text-primary",
    creator: "bg-secondary/20 text-secondary",
    contact: "bg-white/10 text-white/60",
  };
  const STATUS_COLORS: Record<string, string> = {
    new: "bg-accent/20 text-accent",
    read: "bg-blue-500/20 text-blue-400",
    replied: "bg-green-500/20 text-green-400",
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Enquiries</h1>
          <p className="text-white/40 text-sm">{enquiries.length} enquiries</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-2">
            {(["", "contact", "brand", "creator"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t === "" ? undefined : (t as EnquiryType))}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all ${
                  filterType === (t === "" ? undefined : t)
                    ? "bg-primary text-white border-primary"
                    : "border-white/15 text-white/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {t === "" ? "All Types" : t}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(["", "new", "read", "replied"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s === "" ? undefined : (s as EnquiryStatus))}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all ${
                  filterStatus === (s === "" ? undefined : s)
                    ? "bg-white/20 text-white border-white/40"
                    : "border-white/15 text-white/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {s === "" ? "All Status" : s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-px bg-white/5">
          {enquiries.length === 0 ? (
            <div className="bg-background p-12 text-center text-white/30">No enquiries found</div>
          ) : (
            enquiries.map((enq) => (
              <motion.div key={enq.id} layout className="bg-background">
                <div
                  className="flex items-center gap-4 p-5 cursor-pointer hover:bg-card transition-colors"
                  onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium">{enq.name}</div>
                    <div className="text-white/40 text-xs truncate">{enq.email} {enq.company ? `· ${enq.company}` : ""}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 font-bold uppercase tracking-wider ${TYPE_COLORS[enq.type] ?? ""}`}>{enq.type}</span>
                    <span className={`text-xs px-2 py-0.5 font-bold uppercase tracking-wider ${STATUS_COLORS[enq.status] ?? ""}`}>{enq.status}</span>
                  </div>
                  <div className="text-white/30 text-xs shrink-0">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {expanded === enq.id && (
                  <div className="px-5 pb-5 border-t border-white/5 bg-card/50">
                    <p className="text-white/60 text-sm py-4 leading-relaxed">{enq.message}</p>
                    {enq.budget && <div className="text-xs text-white/40 mb-1">Budget: <span className="text-accent">{enq.budget}</span></div>}
                    {enq.platform && <div className="text-xs text-white/40 mb-1">Platform: {enq.platform}</div>}
                    {enq.followersCount && <div className="text-xs text-white/40 mb-4">Followers: {enq.followersCount}</div>}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(["new", "read", "replied"] as const).map((s) => (
                        <Button
                          key={s}
                          size="sm"
                          variant={enq.status === s ? "default" : "outline"}
                          onClick={() => handleStatus(enq.id, s)}
                          className={`rounded-none text-xs uppercase tracking-widest ${enq.status === s ? "bg-primary text-white border-primary" : "border-white/20 text-white/60"}`}
                        >
                          Mark {s}
                        </Button>
                      ))}
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(enq.id)} className="text-destructive/60 hover:text-destructive rounded-none ml-auto">
                        <Trash2 size={15} />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
