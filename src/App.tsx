import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ServicesSuite } from "./components/ServicesSuite";
import { TestimonialCarousel } from "./components/TestimonialCarousel";
import { Footer } from "./components/Footer";
import { EnquiryModal } from "./components/EnquiryModal";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("hanzel_theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable — fall through to the default
  }
  return "light";
}

export default function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const handleOpenEnquiry = () => {
    setIsEnquiryOpen(true);
  };

  const toggleTheme = () => {
    setTheme((current) => {
      const next: Theme = current === "light" ? "dark" : "light";
      try {
        localStorage.setItem("hanzel_theme", next);
      } catch {
        // ignore — theme just won't persist across reloads
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-noir text-ivory selection:bg-crimson selection:text-ivory">
      {/* Top Glass Notch Header */}
      <Header onOpenEnquiry={handleOpenEnquiry} theme={theme} onToggleTheme={toggleTheme} />

      {/* Hero Section */}
      <Hero onOpenEnquiry={handleOpenEnquiry} onOpenStory={() => {}} />

      {/* Services & Curation Suite */}
      <ServicesSuite theme={theme} />

      {/* Stories / Testimonials Section */}
      <TestimonialCarousel theme={theme} />

      {/* Footer */}
      <Footer />

      {/* Enquiry Consultation Booking Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialData={null}
      />
    </div>
  );
}
