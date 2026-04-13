import { Link } from "wouter";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useListCaseStudies } from "@workspace/api-client-react";

export default function CaseStudiesPage() {
  const { data: caseStudies = [], isLoading } = useListCaseStudies();

  return (
    <PublicLayout>
      <div className="pt-28 pb-16 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="text-xs text-accent uppercase tracking-widest font-bold mb-4">Proof of Work</div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-4">
            Case Studies
          </h1>
          <p className="text-white/50 text-xl max-w-2xl">
            Real campaigns. Real results. Explore how WeSocializeU has driven measurable growth for brands across every industry.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-px bg-white/5">
            {caseStudies.map((cs, i) => (
              <Link key={cs.id} href={`/case-studies/${cs.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-background hover:bg-card transition-colors grid grid-cols-1 md:grid-cols-2 cursor-pointer"
                >
                  <div className="relative overflow-hidden h-64 md:h-72">
                    <img
                      src={cs.imageUrl}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent md:block hidden" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-xs text-accent font-bold uppercase tracking-widest mb-3">{cs.industry}</div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {cs.title}
                    </h2>
                    <div className="text-white/50 text-sm mb-6">{cs.client}</div>
                    <p className="text-white/50 mb-8 line-clamp-2">{cs.summary}</p>
                    <div className="flex gap-8">
                      <div>
                        <div className="text-2xl font-display font-black text-accent">{cs.roiPercent}%</div>
                        <div className="text-xs text-white/40 uppercase tracking-widest">ROI</div>
                      </div>
                      <div>
                        <div className="text-2xl font-display font-black text-secondary">{cs.reachMillion}M</div>
                        <div className="text-xs text-white/40 uppercase tracking-widest">Reach</div>
                      </div>
                      <div>
                        <div className="text-2xl font-display font-black text-primary">{cs.engagementRate}%</div>
                        <div className="text-xs text-white/40 uppercase tracking-widest">Eng. Rate</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
