import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  useListServices,
  useGetFeaturedCreators,
  useGetFeaturedCaseStudies,
} from "@workspace/api-client-react";
import { useState } from "react";

const BRANDS = ["Amazon", "Flipkart", "PUMA", "Godrej", "Bajaj", "Myntra"];

const PLATFORMS = [
  {
    name: "YouTube",
    color: "#ef4444",
    bgColor: "rgba(239,68,68,0.08)",
    desc: "Long-form storytelling & professional content",
  },
  {
    name: "Instagram",
    color: "#ec4899",
    bgColor: "rgba(236,72,153,0.08)",
    desc: "Visual aesthetics & short-form viral loops",
  },
  {
    name: "Facebook",
    color: "#3b82f6",
    bgColor: "rgba(59,130,246,0.08)",
    desc: "Community building & precise ad targeting",
  },
  {
    name: "TikTok",
    color: "#1a202c",
    bgColor: "rgba(26,32,44,0.06)",
    desc: "Viral reach & entertainment-first content",
  },
];

const STATS = [
  { value: "500+", label: "Verified Creators" },
  { value: "150+", label: "Brands Scaled" },
  { value: "2.8B+", label: "Total Reach" },
  { value: "99.8%", label: "Success Rate" },
];

const SERVICES_OVERVIEW = [
  {
    icon: "📣",
    title: "Influencer Marketing",
    desc: "End-to-end campaign management that connects your brand with the right creators at the right time.",
  },
  {
    icon: "🎥",
    title: "UGC Content",
    desc: "Authentic user-generated content at scale — without the overhead of traditional production.",
  },
  {
    icon: "📈",
    title: "Brand Growth",
    desc: "Data-driven growth strategies that turn social engagement into measurable business outcomes.",
  },
  {
    icon: "⚡",
    title: "Viral Campaigns",
    desc: "Creative campaigns engineered to cut through noise and create cultural moments for your brand.",
  },
];

export default function HomePage() {
  const { data: services = [] } = useListServices();
  const { data: creators = [] } = useGetFeaturedCreators();
  const { data: caseStudies = [] } = useGetFeaturedCaseStudies();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Influencer Marketing",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/contact";
  };

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-[#f8f9fa] overflow-hidden pt-20">
        {/* Background gradient blob */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(26,95,180,0.05) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-[1200px] mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Hero Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center self-start bg-[rgba(245,166,35,0.05)] border border-[rgba(245,166,35,0.1)] rounded-xl px-4 py-2">
                <span className="text-primary font-semibold text-xs uppercase tracking-widest">
                  India's #1 Influencer Marketing Agency
                </span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-[64px] md:text-[80px] font-extrabold text-[#1a202c] leading-[1.05] tracking-[-3px]">
                  We Solve All<br />
                  Your Content<br />
                  <span className="text-primary">Problems.</span>
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-[#4a5568] text-lg leading-relaxed max-w-xl">
                Stop burning budget on generic ads. We build high-performance influencer strategies that convert attention into sustainable brand authority.
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-8">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white rounded-lg px-8 py-6 text-base font-semibold shadow-[0px_20px_25px_-5px_rgba(245,166,35,0.2),0px_8px_10px_-6px_rgba(245,166,35,0.2)]"
                >
                  <Link href="/join/brand">Start Your Campaign</Link>
                </Button>
                <Link
                  href="/case-studies"
                  className="text-[#1a202c] font-semibold text-base border-b border-[#1a202c] pb-1 hover:text-primary hover:border-primary transition-colors"
                >
                  View Results
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-col gap-4 pt-2">
                <p className="text-xs font-semibold text-[rgba(74,85,104,0.6)] uppercase tracking-widest">
                  Trusted by Industry Leaders
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white border border-black/[0.05] text-[#1a202c] text-xs font-medium px-3 py-1.5 rounded-xl shadow-sm">
                    99.8% Success Rate
                  </span>
                  <span className="bg-white border border-black/[0.05] text-[#1a202c] text-xs font-medium px-3 py-1.5 rounded-xl shadow-sm">
                    150+ Brands Scaled
                  </span>
                  <span className="bg-white border border-black/[0.05] text-[#1a202c] text-xs font-medium px-3 py-1.5 rounded-xl shadow-sm">
                    500+ Creators
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[rgba(26,95,180,0.05)] rounded-2xl blur-[50px]" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[rgba(245,166,35,0.05)] rounded-2xl blur-[40px]" />

              <div className="relative bg-white rounded-2xl border-t-[3px] border-t-primary border border-black/[0.06] shadow-[0px_24px_60px_0px_rgba(0,0,0,0.06)] p-8">
                <h2 className="text-[#1a202c] font-extrabold text-2xl font-display mb-1">
                  Schedule A Meeting
                </h2>
                <p className="text-[#4a5568] text-sm mb-6">
                  Free consultation. We respond in 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Business Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="+91 Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#f8f9fa] border border-black/[0.05] rounded-xl px-4 py-3 text-sm text-[#1a202c] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                  />

                  <div>
                    <p className="text-xs font-medium text-[#4a5568] mb-2">Services Looking For</p>
                    <div className="flex flex-wrap gap-2">
                      {["Influencer Marketing", "Tech Solutions", "Ads Shoot", "User Generated Content"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: s })}
                          className={`text-xs font-medium px-4 py-2 rounded-xl border transition-all ${
                            formData.service === s
                              ? "bg-[rgba(245,166,35,0.1)] border-[rgba(245,166,35,0.2)] text-primary"
                              : "bg-[#f8f9fa] border-black/10 text-[#4a5568] hover:border-primary/30"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold text-sm rounded-xl py-3.5 mt-1 shadow-[0px_10px_15px_-3px_rgba(245,166,35,0.2)] transition-all"
                  >
                    Submit Enquiry →
                  </button>
                  <p className="text-center text-[rgba(74,85,104,0.4)] text-xs">
                    🔒 Your details are safe with us.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BRANDS MARQUEE */}
      <section className="bg-white border-t border-black/[0.06] py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-center text-[rgba(74,85,104,0.4)] text-xs font-medium tracking-[3px] uppercase mb-8">
            Trusted by Global Market Leaders
          </p>
          <div className="bg-[rgba(248,249,250,0.5)] backdrop-blur-md border border-black/[0.05] rounded-3xl px-12 py-10 flex items-center justify-between shadow-sm flex-wrap gap-6">
            {BRANDS.map((brand) => (
              <span key={brand} className="font-display font-bold text-[#1a202c] text-xl grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="bg-[#f8f9fa] border-t border-black/[0.06] py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-4">
            <span className="text-primary text-xs font-semibold uppercase tracking-widest">Platforms We Excel At</span>
          </div>
          <h2 className="text-[40px] font-extrabold text-[#1a202c] text-center mb-4 tracking-tight">
            Dominate Every Platform
          </h2>
          <p className="text-[#4a5568] text-center text-base mb-12 max-w-xl mx-auto">
            From YouTube deep-dives to TikTok virality — we know what works on every platform and build strategies accordingly.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PLATFORMS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-black/[0.05] rounded-[32px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.03)] p-8 flex flex-col items-center text-center gap-4 group hover:shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] transition-all"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
                  style={{ backgroundColor: p.bgColor, color: p.color }}
                >
                  {p.name[0]}
                </div>
                <h3 className="font-display font-bold text-[#1a202c] text-xl">{p.name}</h3>
                <p className="text-[#4a5568] text-sm leading-relaxed">{p.desc}</p>
                <button className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-1 mt-auto">
                  EXPLORE NOW <ArrowRight size={10} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white border-t border-black/[0.06] py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-3">What We Offer</span>
              <h2 className="text-[40px] font-extrabold text-[#1a202c] tracking-tight leading-tight">
                Full-Service<br />Influence
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden md:flex border-black/10 text-[#4a5568] hover:text-[#1a202c] gap-2">
              <Link href="/services">All Services <ArrowRight size={16} /></Link>
            </Button>
          </div>

          {(Array.isArray(services) && services.length > 0 ? [...services] : SERVICES_OVERVIEW).slice(0, 6).map((item: any, i: number) => {
            const isService = 'id' in item;
            return (
              <motion.div
                key={isService ? item.id : item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-black/[0.06] group"
              >
                {isService ? (
                  <Link href={`/services/${item.id}`}>
                    <div className="py-6 flex items-center justify-between cursor-pointer hover:bg-[#f8f9fa] px-4 -mx-4 rounded-xl transition-all">
                      <div className="flex items-center gap-6">
                        <span className="text-primary text-xs font-bold w-8">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <h3 className="text-[#1a202c] font-display font-bold text-lg group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[#4a5568] text-sm mt-1">{item.shortDescription}</p>
                        </div>
                      </div>
                      <ArrowUpRight size={20} className="text-[#4a5568] group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </Link>
                ) : (
                  <div className="py-6 flex items-center justify-between px-4 -mx-4">
                    <div className="flex items-center gap-6">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="text-[#1a202c] font-display font-bold text-lg">{item.title}</h3>
                        <p className="text-[#4a5568] text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
          <div className="border-t border-black/[0.06]" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#f8f9fa] border-t border-black/[0.06] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-[48px] font-extrabold text-primary font-display leading-tight">{stat.value}</div>
                <div className="text-[#4a5568] text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CREATORS */}
      {creators.length > 0 && (
        <section className="bg-white border-t border-black/[0.06] py-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-3">Our Network</span>
                <h2 className="text-[40px] font-extrabold text-[#1a202c] tracking-tight">
                  Featured Creators
                </h2>
              </div>
              <Button asChild variant="outline" className="hidden md:flex border-black/10 text-[#4a5568] hover:text-[#1a202c] gap-2">
                <Link href="/creators">All Creators <ArrowRight size={16} /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creators.map((creator, i) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.08)] transition-all group"
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={creator.imageUrl}
                      alt={creator.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md">
                        {creator.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-[#1a202c] text-lg">{creator.name}</h3>
                    <p className="text-[#4a5568] text-sm mb-4">{creator.handle}</p>
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/[0.06]">
                      <div className="text-center">
                        <div className="text-sm font-bold text-[#1a202c]">
                          {(creator.instagramFollowers / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-[10px] text-[#4a5568] uppercase tracking-wider">Instagram</div>
                      </div>
                      <div className="text-center border-x border-black/[0.06]">
                        <div className="text-sm font-bold text-[#1a202c]">
                          {(creator.tiktokFollowers / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-[10px] text-[#4a5568] uppercase tracking-wider">TikTok</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary">{creator.engagementRate}%</div>
                        <div className="text-[10px] text-[#4a5568] uppercase tracking-wider">Engagement</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CASE STUDIES */}
      {caseStudies.length > 0 && (
        <section className="bg-[#f8f9fa] border-t border-black/[0.06] py-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-3">Proven Results</span>
                <h2 className="text-[40px] font-extrabold text-[#1a202c] tracking-tight">
                  Campaign Wins
                </h2>
              </div>
              <Button asChild variant="outline" className="hidden md:flex border-black/10 text-[#4a5568] hover:text-[#1a202c] gap-2">
                <Link href="/case-studies">All Case Studies <ArrowRight size={16} /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudies.map((cs, i) => (
                <Link key={cs.id} href={`/case-studies/${cs.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl border border-black/[0.06] shadow-sm overflow-hidden group hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.08)] transition-all cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cs.imageUrl}
                        alt={cs.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-5">
                      <span className="text-primary text-xs font-semibold uppercase tracking-widest">{cs.industry}</span>
                      <h3 className="font-display font-bold text-[#1a202c] text-base mt-1 mb-3 leading-tight">{cs.title}</h3>
                      <div className="flex gap-4">
                        <div className="bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.15)] rounded-lg px-3 py-2 text-center">
                          <div className="text-primary font-bold text-lg font-display">{cs.roiPercent}%</div>
                          <div className="text-[#4a5568] text-[10px] uppercase tracking-wider">ROI</div>
                        </div>
                        <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-lg px-3 py-2 text-center">
                          <div className="text-[#1a202c] font-bold text-lg font-display">{cs.reachMillion}M</div>
                          <div className="text-[#4a5568] text-[10px] uppercase tracking-wider">Reach</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#1a202c] py-24 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest block mb-4">Ready to Scale?</span>
          <h2 className="text-[48px] md:text-[56px] font-extrabold text-white leading-tight tracking-tight mb-6">
            Let's Build Something <span className="text-primary">Extraordinary</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
            Whether you're a brand looking to grow or a creator ready to monetize — WeSocializeU is your unfair advantage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-6 font-semibold rounded-xl shadow-[0px_20px_25px_-5px_rgba(245,166,35,0.3)]">
              <Link href="/join/brand">For Brands</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-10 py-6 font-semibold rounded-xl">
              <Link href="/join/creator">For Creators</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
