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
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold tracking-tighter text-white">
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
                  location.startsWith(link.href) ? "text-primary" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Contact
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-6 uppercase tracking-wider font-semibold text-xs border border-primary">
              <Link href="/join/brand">Partner With Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-white/10 md:hidden flex flex-col p-6 gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium transition-colors ${
                location.startsWith(link.href) ? "text-primary" : "text-white/80"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-lg font-medium text-white/80"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
            <Button asChild variant="outline" className="w-full rounded-none border-white/20 hover:bg-white/5">
              <Link href="/join/creator" onClick={() => setIsOpen(false)}>Join as Creator</Link>
            </Button>
            <Button asChild className="w-full rounded-none bg-primary hover:bg-primary/90">
              <Link href="/join/brand" onClick={() => setIsOpen(false)}>Partner With Us</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
