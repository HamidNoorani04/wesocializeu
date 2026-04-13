import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useGetService, getGetServiceQueryKey } from "@workspace/api-client-react";

export default function ServiceDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data: service, isLoading } = useGetService(id, { query: { enabled: !!id, queryKey: getGetServiceQueryKey(id) } });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-16 max-w-[1200px] mx-auto px-6">
          <div className="h-96 bg-[#f8f9fa] rounded-2xl animate-pulse" />
        </div>
      </PublicLayout>
    );
  }

  if (!service) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-16 max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-4xl font-display font-bold text-[#1a202c] mb-4">Service Not Found</h1>
          <Link href="/services" className="text-primary hover:underline">Back to Services</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-[#f8f9fa] pt-32 pb-16 px-6 border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/services" className="inline-flex items-center gap-2 text-[#4a5568] hover:text-primary text-sm mb-10 transition-colors">
              <ArrowLeft size={16} /> All Services
            </Link>
            <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-4">Service</span>
            <h1 className="text-[56px] md:text-[72px] font-extrabold text-[#1a202c] leading-none tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-[#4a5568] text-lg max-w-2xl leading-relaxed">{service.shortDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Detail */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-display font-bold text-[#1a202c] mb-6">What's Included</h2>
              <ul className="flex flex-col gap-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-[#4a5568] text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            {service.imageUrl && (
              <div className="relative overflow-hidden rounded-2xl h-64 md:h-auto">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {service.description && (
            <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-2xl p-8 mb-12">
              <h2 className="text-xl font-display font-bold text-[#1a202c] mb-4">About This Service</h2>
              <p className="text-[#4a5568] text-sm leading-relaxed">{service.description}</p>
            </div>
          )}

          {/* CTA */}
          <div className="bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-8 md:p-12">
            <h2 className="text-2xl font-display font-bold text-[#1a202c] mb-3">Ready to Get Started?</h2>
            <p className="text-[#4a5568] text-sm mb-6">Let's discuss how {service.title} can accelerate your brand's growth.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-4 font-semibold rounded-xl shadow-[0px_10px_15px_-3px_rgba(245,166,35,0.2)] gap-2">
                <Link href="/join/brand">Start a Campaign <ArrowRight size={16} /></Link>
              </Button>
              <Button asChild variant="outline" className="border-black/10 text-[#4a5568] hover:text-[#1a202c] px-8 py-4 font-semibold rounded-xl">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
