import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AboutStudio } from "./components/AboutStudio";
import { ServicesSuite } from "./components/ServicesSuite";
import { VideoReelShowcase } from "./components/VideoReelShowcase";
import { RealWeddingStories } from "./components/RealWeddingStories";
import { WeddingEstimator } from "./components/WeddingEstimator";
import { TestimonialCarousel } from "./components/TestimonialCarousel";
import { Footer } from "./components/Footer";
import { EnquiryModal } from "./components/EnquiryModal";

export default function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [estimatorData, setEstimatorData] = useState<{
    guests?: string;
    theme?: string;
    focus?: string;
    location?: string;
  } | null>(null);

  const handleOpenEnquiry = () => {
    setEstimatorData(null);
    setIsEnquiryOpen(true);
  };

  const handleOpenEnquiryWithData = (data: {
    guests: string;
    theme: string;
    focus: string;
    location: string;
  }) => {
    setEstimatorData(data);
    setIsEnquiryOpen(true);
  };

  const handleOpenStory = (storyId: string) => {
    setSelectedStoryId(storyId);
    // Scroll smoothly to stories section
    const el = document.getElementById("stories");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-noir text-ivory selection:bg-crimson selection:text-ivory">
      {/* Top Glass Notch Header */}
      <Header onOpenEnquiry={handleOpenEnquiry} />

      {/* Hero Section */}
      <Hero onOpenEnquiry={handleOpenEnquiry} onOpenStory={handleOpenStory} />

      {/* About Studio Section */}
      <AboutStudio />

      {/* Services & Curation Suite */}
      <ServicesSuite />

      {/* Video Reel Showcase */}
      <VideoReelShowcase />

      {/* Real Wedding Stories Gallery */}
      <RealWeddingStories
        onOpenEnquiry={handleOpenEnquiry}
        selectedStoryId={selectedStoryId}
        onClearSelectedStory={() => setSelectedStoryId(null)}
      />

      {/* Interactive Wedding Estimator */}
      <WeddingEstimator onOpenEnquiryWithData={handleOpenEnquiryWithData} />

      {/* Testimonials Praise Carousel */}
      <TestimonialCarousel />

      {/* Footer */}
      <Footer />

      {/* Enquiry Consultation Booking Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialData={estimatorData}
      />
    </div>
  );
}
