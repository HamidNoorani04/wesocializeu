import { useState } from "react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSubmitEnquiry } from "@workspace/api-client-react";
import { ArrowRight, Mail, Clock, Users } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const submitEnquiry = useSubmitEnquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry.mutate(
      { type: "contact", ...form },
      { onSuccess: () => setSubmitted(true) }
    );
  };

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-[#f8f9fa] pt-32 pb-16 px-6 border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-4">Get In Touch</span>
            <h1 className="text-[56px] font-extrabold text-[#1a202c] leading-none tracking-tight mb-4">Contact Us</h1>
            <p className="text-[#4a5568] text-lg max-w-xl leading-relaxed">
              Have a question or want to explore a partnership? Let's talk.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          {submitted ? (
            <div className="max-w-lg mx-auto bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-12 text-center">
              <div className="w-16 h-16 bg-[rgba(245,166,35,0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✓</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-[#1a202c] mb-3">Message Received</h2>
              <p className="text-[#4a5568]">Our team will be in touch within 24 hours.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Form */}
              <form onSubmit={handleSubmit} className="bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-8 flex flex-col gap-5">
                <h2 className="font-display font-bold text-xl text-[#1a202c]">Send a Message</h2>
                <div>
                  <label className="block text-xs font-medium text-[#4a5568] mb-2">Full Name *</label>
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
                  <label className="block text-xs font-medium text-[#4a5568] mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#4a5568] mb-2">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#4a5568] mb-2">Message *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitEnquiry.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl py-3.5 shadow-[0px_10px_15px_-3px_rgba(245,166,35,0.2)] transition-all disabled:opacity-60"
                >
                  {submitEnquiry.isPending ? "Sending..." : "Send Message →"}
                </button>
              </form>

              {/* Info */}
              <div className="flex flex-col gap-6">
                <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[rgba(245,166,35,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#4a5568] uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:hello@wesocializeu.com" className="text-[#1a202c] font-medium text-sm hover:text-primary transition-colors">
                      hello@wesocializeu.com
                    </a>
                  </div>
                </div>
                <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[rgba(245,166,35,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#4a5568] uppercase tracking-widest mb-1">Response Time</p>
                    <p className="text-[#1a202c] text-sm">We respond within 24 hours, Monday through Friday.</p>
                  </div>
                </div>
                <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 bg-[rgba(245,166,35,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#4a5568] uppercase tracking-widest mb-3">Looking to Partner?</p>
                    <div className="flex flex-col gap-2">
                      <a href="/join/brand" className="text-sm text-primary hover:underline flex items-center gap-1">
                        Partner as a Brand <ArrowRight size={12} />
                      </a>
                      <a href="/join/creator" className="text-sm text-[#4a5568] hover:text-primary transition-colors flex items-center gap-1">
                        Join as a Creator <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
