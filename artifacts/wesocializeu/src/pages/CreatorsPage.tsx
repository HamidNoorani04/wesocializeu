import { useState } from "react";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { useListCreators } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "Lifestyle", "Travel", "Food", "Fitness", "Beauty", "Technology"];

export default function CreatorsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: creators = [], isLoading } = useListCreators();

  const filtered =
    activeCategory === "All"
      ? creators
      : creators.filter((c) => c.category === activeCategory);

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-[#f8f9fa] pt-32 pb-16 px-6 border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-4">Our Network</span>
            <h1 className="text-[56px] md:text-[72px] font-extrabold text-[#1a202c] leading-none tracking-tight mb-4">
              Creator Network
            </h1>
            <p className="text-[#4a5568] text-lg max-w-2xl leading-relaxed">
              500+ vetted creators across every niche. Each one selected for authentic audience relationships and proven brand partnership results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-[0px_4px_12px_0px_rgba(245,166,35,0.2)]"
                    : "border-black/10 text-[#4a5568] hover:border-primary/30 hover:text-primary bg-[#f8f9fa]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#f8f9fa] border border-black/[0.06] h-72 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((creator, i) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all group"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={creator.imageUrl}
                      alt={creator.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {creator.featured && (
                      <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md">
                        {creator.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-[#1a202c] text-xl">{creator.name}</h3>
                    <p className="text-[#4a5568] text-sm mb-3">{creator.handle}</p>
                    <p className="text-[#4a5568] text-sm line-clamp-2 mb-4">{creator.bio}</p>
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/[0.06]">
                      <div className="text-center">
                        <div className="text-sm font-bold text-[#1a202c]">
                          {creator.instagramFollowers >= 1000000
                            ? `${(creator.instagramFollowers / 1000000).toFixed(1)}M`
                            : `${(creator.instagramFollowers / 1000).toFixed(0)}K`}
                        </div>
                        <div className="text-[10px] text-[#4a5568] uppercase tracking-wider">IG</div>
                      </div>
                      <div className="text-center border-x border-black/[0.06]">
                        <div className="text-sm font-bold text-[#1a202c]">
                          {creator.tiktokFollowers >= 1000000
                            ? `${(creator.tiktokFollowers / 1000000).toFixed(1)}M`
                            : `${(creator.tiktokFollowers / 1000).toFixed(0)}K`}
                        </div>
                        <div className="text-[10px] text-[#4a5568] uppercase tracking-wider">TT</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary">{creator.engagementRate}%</div>
                        <div className="text-[10px] text-[#4a5568] uppercase tracking-wider">Eng.</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8f9fa] border-t border-black/[0.06] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white rounded-3xl border border-t-[3px] border-t-primary border-black/[0.06] shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-12 text-center">
            <h2 className="text-3xl font-extrabold text-[#1a202c] mb-4">Join Our Creator Network</h2>
            <p className="text-[#4a5568] mb-8 max-w-lg mx-auto">
              Are you a creator ready to work with world-class brands? Apply to join WeSocializeU's curated network.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white px-10 py-6 font-semibold rounded-xl shadow-[0px_10px_15px_-3px_rgba(245,166,35,0.2)] gap-2">
              <Link href="/join/creator">Apply as Creator <ArrowRight size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
