import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { useSubmitEnquiry } from "@workspace/api-client-react";

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Instagram + TikTok", "All Platforms"];
const FOLLOWER_RANGES = ["1K - 10K", "10K - 50K", "50K - 100K", "100K - 500K", "500K+"];

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

  const BENEFITS = [
    "Access to premium brand partnerships with top-tier companies",
    "Dedicated talent manager to handle negotiations",
    "Fair, transparent compensation — no hidden cuts",
    "Creative freedom with brand safety guardrails",
    "Early access to exclusive brand campaigns",
  ];

  return (
    <PublicLayout>
      <div className="pt-28 pb-16 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="text-xs text-secondary uppercase tracking-widest font-bold mb-4">For Creators</div>
            <h1 className="text-5xl md:text-6xl font-display font-black text-white leading-none mb-6">
              Join Our<br />Network
            </h1>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              WeSocializeU works with creators who have authentic audiences and a genuine creative voice. If that's you, we want to hear from you.
            </p>
            <div className="space-y-4">
              {BENEFITS.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-secondary mt-0.5 shrink-0" />
                  <span className="text-white/60">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {submitted ? (
              <div className="border border-secondary/30 bg-secondary/5 p-12 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-3xl font-display font-bold text-white mb-4">Application Received</h2>
                <p className="text-white/50">Our talent team reviews all applications within 5 business days. If you're a fit, we'll reach out to schedule a call.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/25"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/25"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Primary Platform</label>
                  <select
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                  >
                    <option value="">Select your main platform</option>
                    {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Follower Count</label>
                  <select
                    value={form.followersCount}
                    onChange={(e) => setForm({ ...form, followersCount: e.target.value })}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
                  >
                    <option value="">Select range</option>
                    {FOLLOWER_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Tell Us About Yourself *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/25 resize-none"
                    placeholder="Your niche, content style, audience demographics, and the kinds of brands you'd love to work with..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitEnquiry.isPending}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-none px-10 py-5 uppercase tracking-widest font-bold text-sm w-full"
                >
                  {submitEnquiry.isPending ? "Submitting..." : "Apply to Network"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
