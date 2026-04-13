import { Link } from "wouter";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListCaseStudies } from "@workspace/api-client-react";
import { ArrowRight } from "lucide-react";

export default function CaseStudiesPage() {
  const { data: caseStudies = [], isLoading } = useListCaseStudies();

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-[#f8f9fa] pt-32 pb-16 px-6 border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-4">Proof of Work</span>
            <h1 className="text-[56px] md:text-[72px] font-extrabold text-[#1a202c] leading-none tracking-tight mb-4">
              Case Studies
            </h1>
            <p className="text-[#4a5568] text-lg max-w-2xl leading-relaxed">
              Real campaigns. Real results. Explore how WeSocializeU has driven measurable growth for brands across every industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          {isLoading ? (
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#f8f9fa] rounded-2xl h-48 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {caseStudies.map((cs, i) => (
                <Link key={cs.id} href={`/case-studies/${cs.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white border border-black/[0.06] rounded-2xl overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all cursor-pointer grid grid-cols-1 md:grid-cols-2"
                  >
                    <div className="relative overflow-hidden h-56 md:h-auto">
                      <img
                        src={cs.imageUrl}
                        alt={cs.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">{cs.industry}</span>
                      <h2 className="text-2xl font-display font-bold text-[#1a202c] mb-2 group-hover:text-primary transition-colors">
                        {cs.title}
                      </h2>
                      <p className="text-[#4a5568] text-sm mb-2">{cs.client}</p>
                      <p className="text-[#4a5568] text-sm mb-6 line-clamp-2 leading-relaxed">{cs.summary}</p>
                      <div className="flex gap-6 mb-6">
                        <div className="bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.15)] rounded-xl px-4 py-3 text-center">
                          <div className="text-primary font-bold text-2xl font-display">{cs.roiPercent}%</div>
                          <div className="text-[#4a5568] text-[10px] uppercase tracking-wider">ROI</div>
                        </div>
                        <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-xl px-4 py-3 text-center">
                          <div className="text-[#1a202c] font-bold text-2xl font-display">{cs.reachMillion}M</div>
                          <div className="text-[#4a5568] text-[10px] uppercase tracking-wider">Reach</div>
                        </div>
                        <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-xl px-4 py-3 text-center">
                          <div className="text-[#1a202c] font-bold text-2xl font-display">{cs.engagementRate}%</div>
                          <div className="text-[#4a5568] text-[10px] uppercase tracking-wider">Eng.</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                        Read case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
