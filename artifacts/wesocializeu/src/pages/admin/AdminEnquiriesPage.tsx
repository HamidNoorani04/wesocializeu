import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
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

const TYPE_BADGE: Record<string, string> = {
  brand: "bg-[rgba(245,166,35,0.1)] text-primary border border-[rgba(245,166,35,0.15)]",
  creator: "bg-blue-50 text-blue-600 border border-blue-100",
  contact: "bg-[#f8f9fa] text-[#4a5568] border border-black/[0.06]",
};
const STATUS_BADGE: Record<string, string> = {
  new: "bg-[rgba(245,166,35,0.1)] text-primary border border-[rgba(245,166,35,0.15)]",
  read: "bg-blue-50 text-blue-600 border border-blue-100",
  replied: "bg-green-50 text-green-600 border border-green-100",
};

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

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-[#1a202c] mb-1">Enquiries</h1>
          <p className="text-[#4a5568] text-sm">{enquiries.length} enquiries found</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-2">
            {(["", "contact", "brand", "creator"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t === "" ? undefined : (t as EnquiryType))}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                  filterType === (t === "" ? undefined : t)
                    ? "bg-primary text-white border-primary shadow-[0px_4px_12px_0px_rgba(245,166,35,0.2)]"
                    : "border-black/10 text-[#4a5568] hover:border-primary/30 bg-white"
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
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                  filterStatus === (s === "" ? undefined : s)
                    ? "bg-[#1a202c] text-white border-[#1a202c]"
                    : "border-black/10 text-[#4a5568] hover:border-[#1a202c]/30 bg-white"
                }`}
              >
                {s === "" ? "All Status" : s}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-2">
          {enquiries.length === 0 ? (
            <div className="bg-white border border-black/[0.06] rounded-2xl p-12 text-center text-[rgba(74,85,104,0.5)]">No enquiries found</div>
          ) : (
            enquiries.map((enq) => (
              <motion.div key={enq.id} layout className="bg-white border border-black/[0.06] rounded-2xl shadow-sm overflow-hidden">
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#f8f9fa] transition-colors"
                  onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[#1a202c] font-medium text-sm">{enq.name}</div>
                    <div className="text-[rgba(74,85,104,0.5)] text-xs truncate">{enq.email} {enq.company ? `· ${enq.company}` : ""}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] px-2 py-1 font-semibold uppercase tracking-wider rounded-lg ${TYPE_BADGE[enq.type] ?? ""}`}>{enq.type}</span>
                    <span className={`text-[10px] px-2 py-1 font-semibold uppercase tracking-wider rounded-lg ${STATUS_BADGE[enq.status] ?? ""}`}>{enq.status}</span>
                    <span className="text-[rgba(74,85,104,0.4)] text-xs flex-shrink-0 hidden sm:block">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                    {expanded === enq.id ? <ChevronUp size={16} className="text-[#4a5568]" /> : <ChevronDown size={16} className="text-[#4a5568]" />}
                  </div>
                </div>

                {expanded === enq.id && (
                  <div className="px-5 pb-5 pt-4 border-t border-black/[0.05] bg-[#f8f9fa]/60">
                    <p className="text-[#4a5568] text-sm leading-relaxed mb-4">{enq.message}</p>
                    {enq.budget && <div className="text-xs text-[rgba(74,85,104,0.5)] mb-1">Budget: <span className="text-primary font-semibold">{enq.budget}</span></div>}
                    {enq.platform && <div className="text-xs text-[rgba(74,85,104,0.5)] mb-1">Platform: {enq.platform}</div>}
                    {enq.followersCount && <div className="text-xs text-[rgba(74,85,104,0.5)] mb-4">Followers: {enq.followersCount}</div>}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(["new", "read", "replied"] as const).map((s) => (
                        <Button
                          key={s}
                          size="sm"
                          onClick={() => handleStatus(enq.id, s)}
                          className={`rounded-xl text-xs font-semibold ${enq.status === s ? "bg-primary text-white border-primary shadow-sm" : "bg-white text-[#4a5568] border border-black/10 hover:border-primary/30"}`}
                          variant={enq.status === s ? "default" : "outline"}
                        >
                          Mark {s}
                        </Button>
                      ))}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(enq.id)}
                        className="text-destructive/50 hover:text-destructive hover:bg-destructive/5 rounded-xl ml-auto"
                      >
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
