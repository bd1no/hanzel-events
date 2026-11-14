import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Calendar, Sparkles, Sun, Moon } from "lucide-react";
import type { Theme } from "../App";

interface HeaderProps {
  onOpenEnquiry: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ onOpenEnquiry, theme, onToggleTheme }: HeaderProps) {
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
      {/* Light / dark mode toggle — top right of the screen, level with the nav */}
      <button
        onClick={onToggleTheme}
        className={`fixed top-3 right-3 md:top-4 md:right-6 z-50 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
          scrolled ? "glass-header-scrolled" : "glass-header"
        } text-ivory hover:text-rosegold hover:scale-105`}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      >
        {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </button>

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
              href="/#services"
              className="font-label text-xs tracking-[0.25em] text-ivory/90 transition-all hover:text-rosegold hover:scale-105 uppercase font-medium hidden sm:inline-block"
            >
              Services
            </a>
          </div>

          {/* Central Logo Container with Downward Notch (Matches Figma Prototype & AI Concept) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[-10px] md:top-[-14px]">
            <a
              href="/"
              className="group relative flex items-center justify-center bg-[#f8f4ef] px-6 py-2.5 sm:px-8 sm:py-3 rounded-b-3xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] border-x border-b border-rosegold/30 transition-transform duration-300 hover:scale-105"
            >
              {/* The source PNG has a lot of built-in whitespace around the mark, so a
                  fixed square crop window + a zoomed-in scale is used to fill it with
                  the actual logo instead of shrinking the whole (mostly blank) image. */}
              <div className="h-10 w-10 sm:h-12 sm:w-12 overflow-hidden flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Hanzel Events Logo"
                  className="h-full w-full object-contain scale-[1.6] transition-transform duration-500 group-hover:scale-[1.7]"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute("src", "/logo.svg");
                  }}
                />
              </div>
            </a>
          </div>

          {/* Right Nav Wing */}
          <div className="flex-1 flex items-center justify-between pl-8 sm:pl-20 md:pl-32">
            <Link
              to="/estimator"
              className="font-label text-xs tracking-[0.25em] text-ivory/90 transition-all hover:text-rosegold hover:scale-105 uppercase font-medium hidden sm:inline-block whitespace-nowrap"
            >
              {/* Shorter label where the header wings are narrow */}
              <span className="xl:hidden">Budget</span>
              <span className="hidden xl:inline">Budget Estimator</span>
            </Link>
            <Link
              to="/contact"
              className="font-label text-xs tracking-[0.25em] text-ivory/90 transition-all hover:text-rosegold hover:scale-105 uppercase font-medium"
            >
              Contact
            </Link>

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
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label text-sm tracking-[0.2em] text-ivory/90 py-2 border-b border-white/10"
            >
              SERVICES
            </a>
            <Link
              to="/estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label text-sm tracking-[0.2em] text-ivory/90 py-2 border-b border-white/10"
            >
              BUDGET ESTIMATOR
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label text-sm tracking-[0.2em] text-ivory/90 py-2 border-b border-white/10"
            >
              CONTACT
            </Link>
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
