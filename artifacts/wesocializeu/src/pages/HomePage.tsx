import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, BarChart3, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  useListServices,
  useGetFeaturedCreators,
  useGetFeaturedCaseStudies,
} from "@workspace/api-client-react";

const STATS = [
  { value: "500+", label: "Creator Network" },
  { value: "120+", label: "Brands Served" },
  { value: "2.8B+", label: "Total Reach" },
  { value: "9.4%", label: "Avg. Engagement Rate" },
];

const HERO_IMG = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1600&q=90";

export default function HomePage() {
  const { data: services = [] } = useListServices();
  const { data: creators = [] } = useGetFeaturedCreators();
  const { data: caseStudies = [] } = useGetFeaturedCaseStudies();

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-6 py-32 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 mb-8">
              <Star size={10} fill="currentColor" />
              The Premium Influencer Marketing Agency
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-none tracking-tighter mb-6">
              We Make<br />
              <span className="text-primary">Brands</span> Famous
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              WeSocializeU connects world-class brands with authentic creators across Instagram, TikTok, and YouTube — driving campaigns that move culture, not just metrics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-6 uppercase tracking-widest font-bold text-sm">
                <Link href="/join/brand">Start Your Campaign</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-none px-10 py-6 uppercase tracking-widest font-bold text-sm">
                <Link href="/case-studies">View Results</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 bg-background/60 backdrop-blur-sm">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-black text-primary">{stat.value}</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="text-xs text-primary uppercase tracking-widest font-bold mb-3">What We Do</div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
              Full-Service<br />Influence
            </h2>
          </div>
          <Button asChild variant="outline" className="hidden md:flex border-white/20 text-white/70 hover:text-white rounded-none gap-2">
            <Link href="/services">All Services <ArrowRight size={16} /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.slice(0, 6).map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-background group hover:bg-card transition-colors p-8 border-l-2 border-transparent hover:border-primary"
            >
              <Link href={`/services/${service.id}`}>
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">0{i + 1}</div>
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{service.shortDescription}</p>
                <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED CREATORS */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-xs text-secondary uppercase tracking-widest font-bold mb-3">Our Network</div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
                Creator<br />Collective
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden md:flex border-white/20 text-white/70 hover:text-white rounded-none gap-2">
              <Link href="/creators">All Creators <ArrowRight size={16} /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator, i) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card border border-white/5 hover:border-primary/30 transition-all overflow-hidden"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={creator.imageUrl}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs text-primary font-bold uppercase tracking-widest mb-1">{creator.category}</div>
                    <h3 className="text-white font-display font-bold text-xl">{creator.name}</h3>
                    <div className="text-white/60 text-sm">{creator.handle}</div>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">{(creator.instagramFollowers / 1000000).toFixed(1)}M</div>
                    <div className="text-xs text-white/40">Instagram</div>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <div className="text-sm font-bold text-white">{(creator.tiktokFollowers / 1000000).toFixed(1)}M</div>
                    <div className="text-xs text-white/40">TikTok</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-secondary">{creator.engagementRate}%</div>
                    <div className="text-xs text-white/40">Engagement</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      {caseStudies.length > 0 && (
        <section className="py-24 container mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-xs text-accent uppercase tracking-widest font-bold mb-3">Proven Results</div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
                Campaign<br />Wins
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden md:flex border-white/20 text-white/70 hover:text-white rounded-none gap-2">
              <Link href="/case-studies">All Case Studies <ArrowRight size={16} /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <Link key={cs.id} href={`/case-studies/${cs.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="group relative overflow-hidden h-80 cursor-pointer"
                >
                  <img
                    src={cs.imageUrl}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-xs text-accent font-bold uppercase tracking-widest mb-2">{cs.industry}</div>
                    <h3 className="text-white font-display font-bold text-xl mb-2">{cs.title}</h3>
                    <div className="flex gap-6 text-sm">
                      <div><span className="text-accent font-bold">{cs.roiPercent}%</span> <span className="text-white/40">ROI</span></div>
                      <div><span className="text-secondary font-bold">{cs.reachMillion}M</span> <span className="text-white/40">Reach</span></div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <div className="text-xs text-primary uppercase tracking-widest font-bold mb-4">Ready to Scale?</div>
          <h2 className="text-5xl md:text-6xl font-display font-black text-white leading-none mb-6">
            Let's Build Something <span className="text-primary">Extraordinary</span>
          </h2>
          <p className="text-white/50 mb-10 text-lg">
            Whether you're a brand looking to grow or a creator ready to monetize — WeSocializeU is your unfair advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-6 uppercase tracking-widest font-bold">
              <Link href="/join/brand">For Brands</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-none px-10 py-6 uppercase tracking-widest font-bold">
              <Link href="/join/creator">For Creators</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
