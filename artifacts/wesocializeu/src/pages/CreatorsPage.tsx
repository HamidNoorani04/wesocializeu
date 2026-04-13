import { useState } from "react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { useListCreators } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "Lifestyle & Fashion", "Travel & Adventure", "Food & Wellness", "Fitness & Sports", "Beauty & Skincare", "Tech & Gaming"];

export default function CreatorsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: creators = [], isLoading } = useListCreators();

  const filtered = activeCategory === "All"
    ? creators
    : creators.filter((c) => c.category === activeCategory);

  return (
    <PublicLayout>
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-xs text-secondary uppercase tracking-widest font-bold mb-4">Our Network</div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-4">
              Creator Network
            </h1>
            <p className="text-white/50 text-xl max-w-2xl">
              500+ vetted creators across every niche. Each one selected for authentic audience relationships and proven brand partnership results.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="container mx-auto px-6 mb-12 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all border ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "border-white/15 text-white/50 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card border border-white/10 h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((creator, i) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className="group bg-card border border-white/5 hover:border-primary/30 transition-all overflow-hidden"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={creator.imageUrl}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  {creator.featured && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1">{creator.category}</div>
                    <h3 className="text-white font-display font-bold text-2xl">{creator.name}</h3>
                    <div className="text-white/50 text-sm">{creator.handle}</div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-white/50 text-sm line-clamp-2 mb-4">{creator.bio}</p>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">
                        {creator.instagramFollowers >= 1000000
                          ? `${(creator.instagramFollowers / 1000000).toFixed(1)}M`
                          : `${(creator.instagramFollowers / 1000).toFixed(0)}K`}
                      </div>
                      <div className="text-xs text-white/40">IG</div>
                    </div>
                    <div className="text-center border-x border-white/10">
                      <div className="text-sm font-bold text-white">
                        {creator.tiktokFollowers >= 1000000
                          ? `${(creator.tiktokFollowers / 1000000).toFixed(1)}M`
                          : `${(creator.tiktokFollowers / 1000).toFixed(0)}K`}
                      </div>
                      <div className="text-xs text-white/40">TT</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-secondary">{creator.engagementRate}%</div>
                      <div className="text-xs text-white/40">Eng.</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="container mx-auto px-6 mt-20 border border-white/10 bg-card/30 p-10 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Join Our Creator Network</h2>
          <p className="text-white/50 mb-6">Are you a creator ready to work with world-class brands? Apply to join WeSocializeU's curated network.</p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-5 uppercase tracking-widest font-bold text-sm">
            <Link href="/join/creator">Apply as Creator <ArrowRight size={16} /></Link>
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
