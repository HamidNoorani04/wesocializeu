import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-display font-bold tracking-tighter text-white">
                WeSocialize<span className="text-primary">U</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              The premium influencer marketing agency connecting global brands with authentic creators. We don't just follow culture, we shape it.
            </p>
          </div>

          <div>
            <h3 className="text-white font-display font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services/tiktok-growth" className="text-white/60 hover:text-primary text-sm transition-colors">TikTok Growth</Link></li>
              <li><Link href="/services/brand-campaigns" className="text-white/60 hover:text-primary text-sm transition-colors">Brand Campaigns</Link></li>
              <li><Link href="/services/creator-management" className="text-white/60 hover:text-primary text-sm transition-colors">Creator Management</Link></li>
              <li><Link href="/services/content-production" className="text-white/60 hover:text-primary text-sm transition-colors">Content Production</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/case-studies" className="text-white/60 hover:text-primary text-sm transition-colors">Case Studies</Link></li>
              <li><Link href="/creators" className="text-white/60 hover:text-primary text-sm transition-colors">Our Creators</Link></li>
              <li><Link href="/blog" className="text-white/60 hover:text-primary text-sm transition-colors">Insights</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-semibold mb-6">Join Us</h3>
            <ul className="space-y-3">
              <li><Link href="/join/brand" className="text-white/60 hover:text-primary text-sm transition-colors">Partner as a Brand</Link></li>
              <li><Link href="/join/creator" className="text-white/60 hover:text-primary text-sm transition-colors">Apply as a Creator</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} WeSocializeU. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
