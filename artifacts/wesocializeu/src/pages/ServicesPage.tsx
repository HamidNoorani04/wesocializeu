import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListServices } from "@workspace/api-client-react";

export default function ServicesPage() {
  const { data: services = [], isLoading } = useListServices();

  return (
    <PublicLayout>
      <div className="pt-28 pb-16 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="text-xs text-primary uppercase tracking-widest font-bold mb-4">What We Offer</div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-6">
            Our Services
          </h1>
          <p className="text-white/50 text-xl max-w-2xl">
            End-to-end influencer marketing solutions designed to grow your brand, drive conversions, and build lasting creator relationships.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card border border-white/10 h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/services/${service.id}`}>
                  <div className="bg-background hover:bg-card group transition-colors p-8 md:p-10 cursor-pointer border-l-2 border-transparent hover:border-primary h-full">
                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-white/50 mb-6 leading-relaxed">{service.shortDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-xs text-white/60 border border-white/10 px-3 py-1 bg-white/5">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-widest">
                      Explore <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
