import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ServicesSuite } from "./components/ServicesSuite";
import { TestimonialCarousel } from "./components/TestimonialCarousel";
import { WeddingEstimator } from "./components/WeddingEstimator";
import { ContactPage } from "./components/ContactPage";
import { EnquiryModal } from "./components/EnquiryModal";

export type Theme = "light" | "dark";

// Choices made in the estimator, used to pre-fill the enquiry form
type EnquiryData = {
  guests?: string;
  theme?: string;
  focus?: string;
  location?: string;
};

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
  const [enquiryData, setEnquiryData] = useState<EnquiryData | null>(null);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const { pathname, hash } = useLocation();

  // Start each page at the top, unless the link points at a section (e.g. /#services)
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  const handleOpenEnquiry = () => {
    setEnquiryData(null);
    setIsEnquiryOpen(true);
  };

  const handleOpenEnquiryWithData = (data: EnquiryData) => {
    setEnquiryData(data);
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

      {/* Page content fades in on every page change (keyed by path so it replays) */}
      <div key={pathname} className="page-fade-in">
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <Hero onOpenEnquiry={handleOpenEnquiry} onOpenStory={() => {}} />

                {/* Services & Curation Suite */}
                <ServicesSuite theme={theme} />

                {/* Stories / Testimonials Section */}
                <TestimonialCarousel theme={theme} />
              </>
            }
          />

          {/* Budget Estimator page */}
          <Route
            path="/estimator"
            element={<WeddingEstimator onOpenEnquiryWithData={handleOpenEnquiryWithData} />}
          />

          {/* Contact page */}
          <Route path="/contact" element={<ContactPage onOpenEnquiry={handleOpenEnquiry} />} />
        </Routes>
      </div>

      {/* Enquiry Consultation Booking Modal — mounted only while open, so it
          picks up fresh estimator choices each time */}
      {isEnquiryOpen && (
        <EnquiryModal
          isOpen
          onClose={() => setIsEnquiryOpen(false)}
          initialData={enquiryData}
        />
      )}
    </div>
  );
}
