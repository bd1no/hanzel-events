import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface AboutStudioProps {
  onOpenEnquiry?: () => void;
}

export function AboutStudio({ onOpenEnquiry }: AboutStudioProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#f7ede4] text-noir py-24 sm:py-32 px-6 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 15% 30%, #fdf5ef 0%, #f7ebe1 45%, #f3e4d7 100%)",
      }}
    >
      {/* Delicate Floral / Architectural Line Art Background Accents */}
      <div className="absolute right-4 top-12 bottom-12 w-1/3 pointer-events-none opacity-30">
        <svg viewBox="0 0 400 600" fill="none" stroke="#b8977e" strokeWidth="1" className="w-full h-full">
          {/* Subtle Archway outline */}
          <path d="M 220 80 A 70 70 0 0 1 360 80 L 360 400 L 220 400 Z" strokeDasharray="4 4" />
          <path d="M 240 100 A 50 50 0 0 1 340 100 L 340 380 L 240 380 Z" />
          {/* Subtle botanical lines */}
          <path d="M 120 450 C 180 400, 200 320, 220 260 C 230 230, 250 200, 290 190" />
          <circle cx="290" cy="190" r="15" />
          <circle cx="280" cy="180" r="20" />
          <circle cx="295" cy="205" r="18" />
          <path d="M 150 490 C 200 440, 240 400, 280 390" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Story & Service Offerings Container */}
          <div className="lg:col-span-7 space-y-7">
            {/* Tagline pill */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(25px)",
                transitionDelay: "0ms",
              }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4e2d4]/70 border border-[#dfc3b0] text-[#7a483a] font-label text-[10.5px] tracking-[0.28em] uppercase font-semibold shadow-sm">
                <Sparkles className="w-3 h-3 text-[#b36952]" />
                <span>THE HANZEL PHILOSOPHY — EST. 2022</span>
              </div>
            </div>

            {/* Main Big Quote */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(35px)",
                transitionDelay: "120ms",
              }}
            >
              <h2 className="font-display text-4xl sm:text-5xl md:text-[3.35rem] leading-[1.14] text-[#422c27] font-normal tracking-tight">
                “We do not decorate a room. We set a table for a life that is about to change.”
              </h2>
            </div>

            {/* Paragraph Description */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(35px)",
                transitionDelay: "240ms",
              }}
            >
              <p className="font-body text-sm sm:text-[15px] leading-relaxed text-[#5a433d]/85 max-w-2xl">
                Founded as an elite wedding planning and production house, Hanzel Events brings an architectural approach to matrimony. Lighting, hospitality, floral sculpting, and sound are held in one unified conversation so your day arrives effortlessly.
              </p>
            </div>

            {/* Service Offerings Iridescent Box (Replaces the 2 previous boxes) */}
            <div
              className="pt-2 transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(35px)",
                transitionDelay: "360ms",
              }}
            >
              <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#d8beaa] shadow-[0_12px_35px_rgba(200,165,140,0.18)] backdrop-blur-md overflow-hidden bg-gradient-to-r from-[#fefbf8]/95 via-[#fcf5ed]/90 to-[#f8eee3]/95">
                {/* Subtle Iridescent glow line */}
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#f5dfce]/40 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#e9d1bf]/40 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <h3 className="font-label text-xs sm:text-[13px] tracking-[0.22em] font-semibold text-[#8c6046] uppercase pb-1">
                      SERVICE OFFERINGS
                    </h3>
                    <ul className="space-y-1.5 font-label text-[10.5px] sm:text-[11.5px] tracking-wider text-[#48342f] uppercase font-medium">
                      <li className="hover:text-[#8c6046] transition-colors">FULL-SERVICE PLANNING</li>
                      <li className="hover:text-[#8c6046] transition-colors">CONCEPTUAL DESIGN &amp; THEME DEVELOPMENT</li>
                      <li className="hover:text-[#8c6046] transition-colors">VENDOR PROCUREMENT</li>
                      <li className="hover:text-[#8c6046] transition-colors">LOGISTICS &amp; PRODUCTION</li>
                    </ul>
                  </div>

                  {/* Right Column with Left Border Divider on Desktop */}
                  <div className="sm:border-l sm:border-[#d8beaa]/70 sm:pl-7 space-y-1.5 font-label text-[10.5px] sm:text-[11.5px] tracking-wider text-[#48342f] uppercase font-medium pt-1 sm:pt-0">
                    <div className="hover:text-[#8c6046] transition-colors">VENUE MANAGEMENT</div>
                    <div className="hover:text-[#8c6046] transition-colors">FLORAL SCULPTING &amp; DECOR</div>
                    <div className="hover:text-[#8c6046] transition-colors">LIGHTING &amp; SOUND PRODUCTION</div>
                    <div className="hover:text-[#8c6046] transition-colors">CINEMATIC COVERAGE</div>
                    <div className="hover:text-[#8c6046] transition-colors">POST-EVENT SERVICES</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Mandap Card & Clean Enquire Button */}
          <div
            className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center space-y-5 transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transitionDelay: "280ms",
            }}
          >
            {/* Architectural Mandap Card */}
            <div className="relative w-full max-w-[380px] aspect-square rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#d8beaa]/80 shadow-[0_20px_45px_rgba(180,145,120,0.22)] bg-[#fcf6f0] p-1.5 group">
              <div className="relative w-full h-full rounded-[24px] sm:rounded-[28px] overflow-hidden">
                <img
                  src="/about-mandap-card.png"
                  alt="Architectural Mandap Stage"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/about-mandap.jpg";
                  }}
                />
              </div>
            </div>

            {/* Enquire Now Button (Clean without H&E badge as instructed) */}
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="w-full max-w-[380px] py-3.5 sm:py-4 px-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#fefbf7] via-[#faede0] to-[#f4ded0] border border-[#d4b59b] shadow-[0_8px_24px_rgba(195,155,125,0.2)] text-[#5c3e34] hover:text-[#38201a] font-display text-lg sm:text-xl font-bold tracking-[0.22em] uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(195,155,125,0.32)] hover:border-[#b88c6e] group cursor-pointer"
            >
              <span>ENQUIRE NOW</span>
              <ArrowRight className="w-5 h-5 text-[#8c6046] group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
