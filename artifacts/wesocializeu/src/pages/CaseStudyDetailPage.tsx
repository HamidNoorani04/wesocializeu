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
        <div className="pt-32 max-w-[1200px] mx-auto px-6">
          <div className="h-96 bg-[#f8f9fa] rounded-2xl animate-pulse" />
        </div>
      </PublicLayout>
    );
  }

  if (!cs) {
    return (
      <PublicLayout>
        <div className="pt-32 max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-4xl font-display font-bold text-[#1a202c] mb-4">Not Found</h1>
          <Link href="/case-studies" className="text-primary hover:underline">Back to Case Studies</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="pt-24 pb-16">
        {/* Hero image */}
        <div className="relative overflow-hidden h-72 md:h-[480px]">
          <img src={cs.imageUrl} alt={cs.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a202c]/80 via-[#1a202c]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-[1200px] mx-auto px-6 pb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link href="/case-studies" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
                <ArrowLeft size={16} /> All Case Studies
              </Link>
              <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-2">{cs.industry}</span>
              <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight">{cs.title}</h1>
              <p className="text-white/60 mt-2">Client: {cs.client}</p>
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-white border-b border-black/[0.06]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-3 divide-x divide-black/[0.06] py-8">
              <div className="text-center px-6">
                <div className="text-4xl font-display font-extrabold text-primary">{cs.roiPercent}%</div>
                <div className="text-xs text-[#4a5568] uppercase tracking-widest mt-1">ROI</div>
              </div>
              <div className="text-center px-6">
                <div className="text-4xl font-display font-extrabold text-[#1a202c]">{cs.reachMillion}M</div>
                <div className="text-xs text-[#4a5568] uppercase tracking-widest mt-1">Total Reach</div>
              </div>
              <div className="text-center px-6">
                <div className="text-4xl font-display font-extrabold text-[#1a202c]">{cs.engagementRate}%</div>
                <div className="text-xs text-[#4a5568] uppercase tracking-widest mt-1">Engagement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm">
              <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-3">The Challenge</span>
              <p className="text-[#4a5568] text-sm leading-relaxed">{cs.challenge}</p>
            </div>
            <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm">
              <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-3">Our Solution</span>
              <p className="text-[#4a5568] text-sm leading-relaxed">{cs.solution}</p>
            </div>
            <div className="bg-white border border-black/[0.06] rounded-2xl p-6 shadow-sm">
              <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-3">The Results</span>
              <p className="text-[#4a5568] text-sm leading-relaxed">{cs.results}</p>
            </div>
          </div>

          <div className="bg-white border border-t-[3px] border-t-primary border-black/[0.06] rounded-2xl shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-8 md:p-12 text-center">
            <h2 className="text-2xl font-display font-bold text-[#1a202c] mb-3">Get Results Like These</h2>
            <p className="text-[#4a5568] text-sm mb-6">Ready to create your own success story?</p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white px-10 py-4 font-semibold rounded-xl shadow-[0px_10px_15px_-3px_rgba(245,166,35,0.2)]">
              <Link href="/join/brand">Start Your Campaign</Link>
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
