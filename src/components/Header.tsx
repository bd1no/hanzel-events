import { useState, useEffect } from "react";
import { Menu, X, Calendar, Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenEnquiry: () => void;
}

export function Header({ onOpenEnquiry }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 md:px-6 md:py-4 transition-all duration-500">
      <div className="mx-auto max-w-6xl relative">
        {/* Main Nav pill with notch shape */}
        <div
          className={`relative flex items-center justify-between rounded-full px-6 py-2.5 sm:px-10 md:px-16 md:py-3.5 transition-all duration-500 ${
            scrolled ? "glass-header-scrolled" : "glass-header"
          }`}
        >
          {/* Left Nav Wing */}
          <div className="flex-1 flex items-center justify-between pr-8 sm:pr-20 md:pr-32">
            <button
              onClick={onOpenEnquiry}
              className="font-label text-xs tracking-[0.25em] text-ivory/90 transition-all hover:text-rosegold hover:scale-105 uppercase font-medium flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-rosegold" />
              <span>Enquire</span>
            </button>
            <a
              href="#about"
              className="font-label text-xs tracking-[0.25em] text-ivory/90 transition-all hover:text-rosegold hover:scale-105 uppercase font-medium hidden sm:inline-block"
            >
              About Us
            </a>
          </div>

          {/* Central Logo Container with Downward Notch (Matches Figma Prototype & AI Concept) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[-10px] md:top-[-14px]">
            <a
              href="#top"
              className="group relative flex items-center justify-center bg-[#f8f4ef] px-6 py-2.5 sm:px-8 sm:py-3 rounded-b-3xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] border-x border-b border-rosegold/30 transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/logo.png"
                alt="Hanzel Events Logo"
                className="h-8 sm:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute("src", "/logo.svg");
                }}
              />
            </a>
          </div>

          {/* Right Nav Wing */}
          <div className="flex-1 flex items-center justify-between pl-8 sm:pl-20 md:pl-32">
            <a
              href="#stories"
              className="font-label text-xs tracking-[0.25em] text-ivory/90 transition-all hover:text-rosegold hover:scale-105 uppercase font-medium hidden sm:inline-block"
            >
              Stories
            </a>
            <a
              href="#contact"
              className="font-label text-xs tracking-[0.25em] text-ivory/90 transition-all hover:text-rosegold hover:scale-105 uppercase font-medium"
            >
              Contact
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden text-ivory p-1 focus:outline-none ml-auto"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 rounded-2xl glass-header-scrolled p-6 flex flex-col gap-4 text-center border border-rosegold/20 animate-fadeIn">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label text-sm tracking-[0.2em] text-ivory/90 py-2 border-b border-white/10"
            >
              ABOUT US
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label text-sm tracking-[0.2em] text-ivory/90 py-2 border-b border-white/10"
            >
              SERVICES & CURATION
            </a>
            <a
              href="#reels"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label text-sm tracking-[0.2em] text-ivory/90 py-2 border-b border-white/10"
            >
              CINEMATIC REELS
            </a>
            <a
              href="#stories"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label text-sm tracking-[0.2em] text-ivory/90 py-2 border-b border-white/10"
            >
              REAL WEDDINGS
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label text-sm tracking-[0.2em] text-ivory/90 py-2 border-b border-white/10"
            >
              WEDDING CALCULATOR
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="gemstone-btn py-3 px-6 rounded-full font-label text-xs tracking-[0.2em] text-noir font-bold uppercase mt-2 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-crimson" />
              <span>Begin Your Journey</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
