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
        <div className="pt-32 pb-16 container mx-auto px-6">
          <div className="h-96 animate-pulse bg-card" />
        </div>
      </PublicLayout>
    );
  }

  if (!service) {
    return (
      <PublicLayout>
        <div className="pt-32 pb-16 container mx-auto px-6 text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Service Not Found</h1>
          <Link href="/services" className="text-primary">Back to Services</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="pt-28 pb-16 container mx-auto px-6 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/services" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-12 transition-colors">
            <ArrowLeft size={16} /> All Services
          </Link>

          <div className="text-xs text-primary uppercase tracking-widest font-bold mb-4">Service</div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-white/60 max-w-2xl leading-relaxed mb-16">{service.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-6">What's Included</h2>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            {service.imageUrl && (
              <div className="relative overflow-hidden h-72 md:h-auto">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            )}
          </div>

          <div className="border border-primary/20 bg-primary/5 p-8 md:p-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white/60 mb-6">Let's discuss how {service.title} can accelerate your brand's growth.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-none px-8 py-5 uppercase tracking-widest font-bold text-sm">
                <Link href="/join/brand">Start a Campaign <ArrowRight size={16} /></Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-none px-8 py-5 uppercase tracking-widest font-bold text-sm">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
