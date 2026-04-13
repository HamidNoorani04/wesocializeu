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
        { label: "Total Enquiries", value: stats.totalEnquiries, color: "text-primary", sub: `${stats.newEnquiries} new` },
        { label: "Total Creators", value: stats.totalCreators, color: "text-secondary", sub: `${stats.featuredCreators} featured` },
        { label: "Case Studies", value: stats.totalCaseStudies, color: "text-accent", sub: "All time" },
        { label: "Blog Posts", value: stats.totalBlogPosts, color: "text-white", sub: `${stats.publishedPosts} published` },
        { label: "Services", value: stats.totalServices, color: "text-primary", sub: "Active" },
      ]
    : [];

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/40 text-sm mb-8">Overview of WeSocializeU agency performance</p>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5 mb-8">
            {statCards.map((card) => (
              <div key={card.label} className="bg-background p-6">
                <div className={`text-3xl font-display font-black ${card.color}`}>{card.value}</div>
                <div className="text-white/70 text-sm mt-1">{card.label}</div>
                <div className="text-white/30 text-xs mt-1">{card.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enquiries by Type Chart */}
            {enquiriesByType.length > 0 && (
              <div className="bg-card border border-white/10 p-6">
                <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Enquiries by Type</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={enquiriesByType}>
                    <XAxis dataKey="type" stroke="#ffffff40" tick={{ fill: "#ffffff60", fontSize: 12 }} />
                    <YAxis stroke="#ffffff40" tick={{ fill: "#ffffff60", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ background: "#0d0d14", border: "1px solid #ffffff15", color: "#fff" }}
                    />
                    <Bar dataKey="count" fill="hsl(320, 80%, 60%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Recent Enquiries */}
            <div className="bg-card border border-white/10 p-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Recent Enquiries</h2>
              <div className="space-y-3">
                {recentEnquiries.length === 0 ? (
                  <p className="text-white/30 text-sm">No enquiries yet.</p>
                ) : (
                  recentEnquiries.map((enq) => (
                    <div key={enq.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <div className="text-white text-sm font-medium">{enq.name}</div>
                        <div className="text-white/40 text-xs">{enq.email}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 font-bold uppercase tracking-wider ${
                          enq.type === "brand" ? "bg-primary/20 text-primary" :
                          enq.type === "creator" ? "bg-secondary/20 text-secondary" :
                          "bg-white/10 text-white/60"
                        }`}>
                          {enq.type}
                        </span>
                        <span className={`text-xs px-2 py-0.5 font-bold uppercase tracking-wider ${
                          enq.status === "new" ? "bg-accent/20 text-accent" :
                          enq.status === "replied" ? "bg-green-500/20 text-green-400" :
                          "bg-white/10 text-white/50"
                        }`}>
                          {enq.status}
                        </span>
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
