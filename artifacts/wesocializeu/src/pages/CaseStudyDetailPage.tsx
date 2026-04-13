import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { useGetCaseStudy, getGetCaseStudyQueryKey } from "@workspace/api-client-react";

export default function CaseStudyDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data: cs, isLoading } = useGetCaseStudy(id, { query: { enabled: !!id, queryKey: getGetCaseStudyQueryKey(id) } });

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="pt-32 container mx-auto px-6">
          <div className="h-96 animate-pulse bg-card" />
        </div>
      </PublicLayout>
    );
  }

  if (!cs) {
    return (
      <PublicLayout>
        <div className="pt-32 container mx-auto px-6 text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Not Found</h1>
          <Link href="/case-studies" className="text-primary">Back to Case Studies</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-12 transition-colors">
              <ArrowLeft size={16} /> All Case Studies
            </Link>

            <div className="relative overflow-hidden h-72 md:h-96 mb-12">
              <img src={cs.imageUrl} alt={cs.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-xs text-accent font-bold uppercase tracking-widest mb-2">{cs.industry}</div>
                <h1 className="text-4xl md:text-5xl font-display font-black text-white">{cs.title}</h1>
                <div className="text-white/50 mt-2">Client: {cs.client}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-16 border-y border-white/10 py-8">
              <div className="text-center">
                <div className="text-4xl font-display font-black text-accent">{cs.roiPercent}%</div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-1">ROI</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-4xl font-display font-black text-secondary">{cs.reachMillion}M</div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Total Reach</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-black text-primary">{cs.engagementRate}%</div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-1">Engagement</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div>
                <div className="text-xs text-primary font-bold uppercase tracking-widest mb-3">The Challenge</div>
                <p className="text-white/60 leading-relaxed">{cs.challenge}</p>
              </div>
              <div>
                <div className="text-xs text-secondary font-bold uppercase tracking-widest mb-3">Our Solution</div>
                <p className="text-white/60 leading-relaxed">{cs.solution}</p>
              </div>
              <div>
                <div className="text-xs text-accent font-bold uppercase tracking-widest mb-3">The Results</div>
                <p className="text-white/60 leading-relaxed">{cs.results}</p>
              </div>
            </div>

            <div className="border border-primary/20 bg-primary/5 p-8 text-center">
              <h2 className="text-2xl font-display font-bold text-white mb-4">Get Results Like These</h2>
              <p className="text-white/50 mb-6">Ready to create your own success story?</p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-5 uppercase tracking-widest font-bold text-sm">
                <Link href="/join/brand">Start Your Campaign</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
