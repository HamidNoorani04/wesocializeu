import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/creators", label: "Creators" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-black/[0.06] py-3 shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-b border-black/[0.06] py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-display font-extrabold tracking-tight text-[#1a202c]">
              WeSocialize<span className="text-primary">U</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.startsWith(link.href) ? "text-primary" : "text-[#4a5568]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="text-sm font-medium text-[#4a5568] hover:text-[#1a202c] transition-colors">
              Contact
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-lg px-5 py-2 font-semibold text-sm shadow-[0px_10px_15px_-3px_rgba(245,166,35,0.2)]">
              <Link href="/join/brand">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#1a202c] p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-black/[0.06] md:hidden flex flex-col p-6 gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium transition-colors ${
                location.startsWith(link.href) ? "text-primary" : "text-[#4a5568]"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-base font-medium text-[#4a5568]"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-black/[0.06]">
            <Button asChild variant="outline" className="w-full border-black/10 text-[#1a202c] hover:bg-[#f8f9fa]">
              <Link href="/join/creator" onClick={() => setIsOpen(false)}>Join as Creator</Link>
            </Button>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
              <Link href="/join/brand" onClick={() => setIsOpen(false)}>Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
