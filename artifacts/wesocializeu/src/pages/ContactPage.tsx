import { useState } from "react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { useSubmitEnquiry } from "@workspace/api-client-react";

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
      <div className="pt-28 pb-16 container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-xs text-primary uppercase tracking-widest font-bold mb-4">Get In Touch</div>
          <h1 className="text-5xl md:text-6xl font-display font-black text-white leading-none mb-6">Contact Us</h1>
          <p className="text-white/50 text-xl max-w-xl mb-16">
            Have a question about our services or want to explore a partnership? Let's talk.
          </p>

          {submitted ? (
            <div className="border border-primary/30 bg-primary/5 p-12 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-3xl font-display font-bold text-white mb-4">Message Received</h2>
              <p className="text-white/50">Our team will be in touch within 24 hours.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Full Name *</label>
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
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-white/25"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-white/25"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Message *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full bg-card border border-white/15 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-white/25 resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitEnquiry.isPending}
                  className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-5 uppercase tracking-widest font-bold text-sm w-full"
                >
                  {submitEnquiry.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>

              <div className="space-y-10">
                <div>
                  <div className="text-xs text-primary font-bold uppercase tracking-widest mb-3">Email</div>
                  <div className="text-white/60">hello@wesocializeu.com</div>
                </div>
                <div>
                  <div className="text-xs text-primary font-bold uppercase tracking-widest mb-3">Response Time</div>
                  <div className="text-white/60">We respond to all inquiries within 24 hours, Monday through Friday.</div>
                </div>
                <div>
                  <div className="text-xs text-primary font-bold uppercase tracking-widest mb-3">Looking to Partner?</div>
                  <div className="text-white/60 mb-4">For campaign partnerships, use our dedicated brand or creator application forms.</div>
                  <div className="flex flex-col gap-3">
                    <a href="/join/brand" className="text-sm text-primary hover:underline">Partner as a Brand →</a>
                    <a href="/join/creator" className="text-sm text-secondary hover:underline">Join as a Creator →</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </PublicLayout>
  );
}
