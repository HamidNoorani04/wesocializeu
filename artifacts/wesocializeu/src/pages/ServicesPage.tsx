import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListServices } from "@workspace/api-client-react";

export default function ServicesPage() {
  const { data: services = [], isLoading } = useListServices();

  return (
    <PublicLayout>
      {/* Page Header */}
      <section className="bg-[#f8f9fa] pt-32 pb-16 px-6 border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-4">What We Offer</span>
            <h1 className="text-[56px] md:text-[72px] font-extrabold text-[#1a202c] leading-none tracking-tight mb-6">
              Our Services
            </h1>
            <p className="text-[#4a5568] text-lg max-w-2xl leading-relaxed">
              End-to-end influencer marketing solutions designed to grow your brand, drive conversions, and build lasting creator relationships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#f8f9fa] border border-black/[0.06] h-48 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={`/services/${service.id}`}>
                    <div className="bg-white border border-black/[0.06] rounded-2xl p-8 hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all group cursor-pointer h-full">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-primary text-xs font-bold uppercase tracking-widest bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.12)] px-3 py-1 rounded-lg">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <ArrowRight size={18} className="text-[#4a5568] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <h2 className="text-xl font-display font-bold text-[#1a202c] mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-[#4a5568] text-sm leading-relaxed mb-6">{service.shortDescription}</p>
                      <div className="flex flex-col gap-2">
                        {service.features.slice(0, 3).map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                            <span className="text-[#4a5568] text-xs">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#f8f9fa] border-t border-black/[0.06] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white rounded-3xl border border-t-[3px] border-t-primary border-black/[0.06] shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-12 text-center">
            <h2 className="text-[36px] font-extrabold text-[#1a202c] mb-4 tracking-tight">
              Not sure which service is right for you?
            </h2>
            <p className="text-[#4a5568] text-base mb-8 max-w-lg mx-auto">
              Let's talk. Our team will assess your goals and recommend the perfect strategy for your brand.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl shadow-[0px_10px_15px_-3px_rgba(245,166,35,0.2)] transition-all"
            >
              Book a Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
