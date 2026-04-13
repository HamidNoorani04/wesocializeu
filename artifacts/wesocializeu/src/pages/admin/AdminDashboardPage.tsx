import { motion } from "framer-motion";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  useGetDashboardStats,
  useGetEnquiriesByType,
  useGetRecentEnquiries,
} from "@workspace/api-client-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboardPage() {
  const { data: stats } = useGetDashboardStats();
  const { data: enquiriesByType = [] } = useGetEnquiriesByType();
  const { data: recentEnquiries = [] } = useGetRecentEnquiries();

  const statCards = stats
    ? [
        { label: "Total Enquiries", value: stats.totalEnquiries, sub: `${stats.newEnquiries} new` },
        { label: "Total Creators", value: stats.totalCreators, sub: `${stats.featuredCreators} featured` },
        { label: "Case Studies", value: stats.totalCaseStudies, sub: "All time" },
        { label: "Blog Posts", value: stats.totalBlogPosts, sub: `${stats.publishedPosts} published` },
        { label: "Services", value: stats.totalServices, sub: "Active" },
      ]
    : [];

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

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold text-[#1a202c] mb-1">Dashboard</h1>
          <p className="text-[#4a5568] text-sm mb-8">Overview of WeSocializeU agency performance</p>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {statCards.map((card) => (
              <div key={card.label} className="bg-white border border-black/[0.06] rounded-2xl p-5 shadow-sm">
                <div className="text-3xl font-display font-extrabold text-primary">{card.value}</div>
                <div className="text-[#1a202c] text-sm font-medium mt-1">{card.label}</div>
                <div className="text-[rgba(74,85,104,0.5)] text-xs mt-0.5">{card.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enquiries by Type Chart */}
            {enquiriesByType.length > 0 && (
              <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm">
                <h2 className="text-xs font-semibold text-[#4a5568] uppercase tracking-widest mb-6">Enquiries by Type</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={enquiriesByType}>
                    <XAxis dataKey="type" stroke="#e2e8f0" tick={{ fill: "#4a5568", fontSize: 12 }} />
                    <YAxis stroke="#e2e8f0" tick={{ fill: "#4a5568", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", color: "#1a202c", borderRadius: "12px" }}
                    />
                    <Bar dataKey="count" fill="#f5a623" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Recent Enquiries */}
            <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-semibold text-[#4a5568] uppercase tracking-widest mb-6">Recent Enquiries</h2>
              <div className="flex flex-col gap-3">
                {recentEnquiries.length === 0 ? (
                  <p className="text-[rgba(74,85,104,0.5)] text-sm">No enquiries yet.</p>
                ) : (
                  recentEnquiries.map((enq) => (
                    <div key={enq.id} className="flex items-center justify-between py-3 border-b border-black/[0.05] last:border-0">
                      <div>
                        <div className="text-[#1a202c] text-sm font-medium">{enq.name}</div>
                        <div className="text-[rgba(74,85,104,0.5)] text-xs">{enq.email}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-1 font-semibold uppercase tracking-wider rounded-lg ${TYPE_BADGE[enq.type] ?? ""}`}>{enq.type}</span>
                        <span className={`text-[10px] px-2 py-1 font-semibold uppercase tracking-wider rounded-lg ${STATUS_BADGE[enq.status] ?? ""}`}>{enq.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
