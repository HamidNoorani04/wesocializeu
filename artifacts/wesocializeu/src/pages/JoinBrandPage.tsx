import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSubmitEnquiry } from "@workspace/api-client-react";

const BUDGETS = ["Under ₹5L", "₹5L – ₹20L", "₹20L – ₹50L", "₹50L+"];

const BENEFITS = [
  "Access to 500+ vetted creators across all niches",
  "Full-service campaign management from brief to reporting",
  "Guaranteed deliverables and brand safety compliance",
  "Real-time performance dashboards and analytics",
  "Dedicated account manager from day one",
];

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

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-[#f8f9fa] pt-32 pb-16 px-6 border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-4">For Brands</span>
          <h1 className="text-[56px] font-extrabold text-[#1a202c] leading-none tracking-tight mb-4">
            Partner With Us
          </h1>
          <p className="text-[#4a5568] text-lg max-w-xl leading-relaxed">
            Join 150+ brands who trust WeSocializeU to connect them with the right creators and run campaigns that actually convert.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-display font-bold text-[#1a202c] mb-6">Why Partner With Us?</h2>
              <div className="flex flex-col gap-4 mb-10">
                {BENEFITS.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-[#4a5568] text-sm leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
              <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-6">
                <p className="text-[#1a202c] font-bold text-sm mb-1">Already working with us?</p>
                <p className="text-[#4a5568] text-sm">
                  Contact your dedicated account manager or email{" "}
                  <a href="mailto:hello@wesocializeu.com" className="text-primary hover:underline">
                    hello@wesocializeu.com
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
                  <p className="text-[#4a5568] text-sm">Our partnerships team will review your application and reach out within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-8 flex flex-col gap-5">
                  <h2 className="font-display font-bold text-xl text-[#1a202c]">Brand Application</h2>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5568] mb-2">Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5568] mb-2">Business Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      placeholder="jane@brand.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5568] mb-2">Brand / Company *</label>
                    <input
                      type="text"
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                      placeholder="Your Brand Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5568] mb-2">Campaign Budget</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    >
                      <option value="">Select budget range</option>
                      {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a5568] mb-2">Campaign Goals *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
                      placeholder="Tell us about your brand, target audience, and what you're hoping to achieve..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitEnquiry.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl py-3.5 shadow-[0px_10px_15px_-3px_rgba(245,166,35,0.2)] transition-all disabled:opacity-60"
                  >
                    {submitEnquiry.isPending ? "Submitting..." : "Submit Application →"}
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
