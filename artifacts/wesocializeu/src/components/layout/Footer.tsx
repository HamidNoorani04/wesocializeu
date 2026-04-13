import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#1a202c] pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <span className="text-xl font-display font-extrabold tracking-tight text-white">
                WeSocialize<span className="text-primary">U</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              India's #1 influencer marketing agency. We build high-performance influencer strategies that convert attention into sustainable brand authority.
            </p>
            <div className="flex gap-3">
              <div className="bg-white/10 hover:bg-primary/20 transition-colors rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer">
                <span className="text-white/70 text-xs font-bold">in</span>
              </div>
              <div className="bg-white/10 hover:bg-primary/20 transition-colors rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer">
                <span className="text-white/70 text-xs font-bold">ig</span>
              </div>
              <div className="bg-white/10 hover:bg-primary/20 transition-colors rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer">
                <span className="text-white/70 text-xs font-bold">yt</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-white/50 hover:text-primary text-sm transition-colors">Influencer Campaigns</Link></li>
              <li><Link href="/services" className="text-white/50 hover:text-primary text-sm transition-colors">Creator Network</Link></li>
              <li><Link href="/services" className="text-white/50 hover:text-primary text-sm transition-colors">Content Strategy</Link></li>
              <li><Link href="/services" className="text-white/50 hover:text-primary text-sm transition-colors">Performance Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/case-studies" className="text-white/50 hover:text-primary text-sm transition-colors">Case Studies</Link></li>
              <li><Link href="/creators" className="text-white/50 hover:text-primary text-sm transition-colors">Our Creators</Link></li>
              <li><Link href="/blog" className="text-white/50 hover:text-primary text-sm transition-colors">Insights</Link></li>
              <li><Link href="/contact" className="text-white/50 hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-wider">Join Us</h3>
            <ul className="space-y-3">
              <li><Link href="/join/brand" className="text-white/50 hover:text-primary text-sm transition-colors">Partner as a Brand</Link></li>
              <li><Link href="/join/creator" className="text-white/50 hover:text-primary text-sm transition-colors">Apply as a Creator</Link></li>
            </ul>
            <div className="mt-8">
              <p className="text-white/30 text-xs mb-2">Contact us</p>
              <a href="mailto:hello@wesocializeu.com" className="text-white/50 hover:text-primary text-sm transition-colors">
                hello@wesocializeu.com
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} WeSocializeU. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
