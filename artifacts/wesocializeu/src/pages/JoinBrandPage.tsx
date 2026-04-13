import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { useSubmitEnquiry } from "@workspace/api-client-react";

const BUDGETS = ["Under $10,000", "$10,000 - $50,000", "$50,000 - $100,000", "$100,000+"];

export default function JoinBrandPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", budget: "" });
  const submitEnquiry = useSubmitEnquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry.mutate(
      { type: "brand", ...form },
      { onSuccess: () => setSubmitted(true) }
    );
  };

  const BENEFITS = [
    "Access to 500+ vetted creators across all niches",
    "Full-service campaign management from brief to reporting",
    "Guaranteed deliverables and brand safety compliance",
    "Real-time performance dashboards and analytics",
    "Dedicated account manager from day one",
  ];

  return (
    <PublicLayout>
      <div className="pt-28 pb-16 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="text-xs text-primary uppercase tracking-widest font-bold mb-4">For Brands</div>
            <h1 className="text-5xl md:text-6xl font-display font-black text-white leading-none mb-6">
              Partner<br />With Us
            </h1>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              Join 120+ brands who trust WeSocializeU to connect them with the right creators and run campaigns that actually convert.
            </p>
            <div className="space-y-4">
              {BENEFITS.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-white/60">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {submitted ? (
              <div className="border border-primary/30 bg-primary/5 p-12 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-3xl font-display font-bold text-white mb-4">Application Received</h2>
                <p className="text-white/50">Our partnerships team will review your application and reach out within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-white/25"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-white/25"
                    placeholder="jane@brand.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Brand / Company *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-white/25"
                    placeholder="Your Brand Name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Campaign Budget</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Select budget range</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Campaign Goals *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-white/25 resize-none"
                    placeholder="Tell us about your brand, target audience, and what you're hoping to achieve..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitEnquiry.isPending}
                  className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-5 uppercase tracking-widest font-bold text-sm w-full"
                >
                  {submitEnquiry.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
