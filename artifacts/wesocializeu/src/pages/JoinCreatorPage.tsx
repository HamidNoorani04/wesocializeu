import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSubmitEnquiry } from "@workspace/api-client-react";

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Instagram + TikTok", "All Platforms"];
const FOLLOWER_RANGES = ["1K – 10K", "10K – 50K", "50K – 100K", "100K – 500K", "500K+"];

const BENEFITS = [
  "Access to premium brand partnerships with top-tier companies",
  "Dedicated talent manager to handle negotiations",
  "Fair, transparent compensation — no hidden cuts",
  "Creative freedom with brand safety guardrails",
  "Early access to exclusive brand campaigns",
];

export default function JoinCreatorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", platform: "", followersCount: "" });
  const submitEnquiry = useSubmitEnquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry.mutate(
      { type: "creator", ...form },
      { onSuccess: () => setSubmitted(true) }
    );
  };

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-[#f8f9fa] pt-32 pb-16 px-6 border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-4">For Creators</span>
          <h1 className="text-[56px] font-extrabold text-[#1a202c] leading-none tracking-tight mb-4">
            Join Our Network
          </h1>
          <p className="text-[#4a5568] text-lg max-w-xl leading-relaxed">
            WeSocializeU works with creators who have authentic audiences and a genuine creative voice. If that's you, we want to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-display font-bold text-[#1a202c] mb-6">Why Join WeSocializeU?</h2>
              <div className="flex flex-col gap-4 mb-10">
                {BENEFITS.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-[#4a5568] text-sm leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-6">
                <p className="text-[#1a202c] font-bold text-sm mb-1">Already in our network?</p>
                <p className="text-[#4a5568] text-sm">
                  Email your talent manager or reach us at{" "}
                  <a href="mailto:creators@wesocializeu.com" className="text-primary hover:underline">
                    creators@wesocializeu.com
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {submitted ? (
                <div className="bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-12 text-center">
                  <div className="w-16 h-16 bg-[rgba(245,166,35,0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-[#1a202c] mb-3">Application Received</h2>
                  <p className="text-[#4a5568] text-sm">Our talent team reviews all applications within 5 business days. If you're a fit, we'll reach out to schedule a call.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-8 flex flex-col gap-5">
                  <h2 className="font-display font-bold text-xl text-[#1a202c]">Creator Application</h2>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5568] mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5568] mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5568] mb-2">Primary Platform</label>
                    <select
                      value={form.platform}
                      onChange={(e) => setForm({ ...form, platform: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    >
                      <option value="">Select your main platform</option>
                      {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5568] mb-2">Follower Count</label>
                    <select
                      value={form.followersCount}
                      onChange={(e) => setForm({ ...form, followersCount: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    >
                      <option value="">Select range</option>
                      {FOLLOWER_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5568] mb-2">Tell Us About Yourself *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
                      placeholder="Your niche, content style, audience demographics, and the kinds of brands you'd love to work with..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitEnquiry.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl py-3.5 shadow-[0px_10px_15px_-3px_rgba(245,166,35,0.2)] transition-all disabled:opacity-60"
                  >
                    {submitEnquiry.isPending ? "Submitting..." : "Apply to Network →"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
