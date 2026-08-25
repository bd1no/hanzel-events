import { useEffect, useRef, useState } from "react";
import { Sparkles, Award, MapPin } from "lucide-react";

export function AboutStudio() {
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
      className="relative bg-ivory text-noir py-24 px-6 overflow-hidden"
    >
      {/* Torn paper edge at top */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-ivory" style={{
        maskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q 15 0 30 15 Q 45 5 60 18 Q 75 2 90 14 Q 105 0 120 16 Q 135 3 150 17 Q 165 1 180 15 Q 195 4 210 18 Q 225 0 240 14 Q 255 5 270 17 Q 285 2 300 16 Q 315 0 330 15 Q 345 3 360 18 Q 375 1 390 14 Q 405 4 420 17 Q 435 0 450 16 Q 465 5 480 15 Q 495 2 510 18 Q 525 0 540 14 Q 555 3 570 17 Q 585 1 600 16 Q 615 4 630 15 Q 645 0 660 18 Q 675 5 690 14 Q 705 2 720 17 Q 735 0 750 16 Q 765 3 780 15 Q 795 1 810 18 Q 825 4 840 14 Q 855 0 870 17 Q 885 5 900 16 Q 915 2 930 15 Q 945 0 960 18 Q 975 3 990 14 Q 1005 1 1020 17 Q 1035 4 1050 16 Q 1065 0 1080 15 Q 1095 5 1110 18 Q 1125 2 1140 14 Q 1155 0 1170 17 Q 1185 3 1200 16 L 1200 20 L 0 20 Z' fill='white'/%3E%3C/svg%3E\")",
        WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1200 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q 15 0 30 15 Q 45 5 60 18 Q 75 2 90 14 Q 105 0 120 16 Q 135 3 150 17 Q 165 1 180 15 Q 195 4 210 18 Q 225 0 240 14 Q 255 5 270 17 Q 285 2 300 16 Q 315 0 330 15 Q 345 3 360 18 Q 375 1 390 14 Q 405 4 420 17 Q 435 0 450 16 Q 465 5 480 15 Q 495 2 510 18 Q 525 0 540 14 Q 555 3 570 17 Q 585 1 600 16 Q 615 4 630 15 Q 645 0 660 18 Q 675 5 690 14 Q 705 2 720 17 Q 735 0 750 16 Q 765 3 780 15 Q 795 1 810 18 Q 825 4 840 14 Q 855 0 870 17 Q 885 5 900 16 Q 915 2 930 15 Q 945 0 960 18 Q 975 3 990 14 Q 1005 1 1020 17 Q 1035 4 1050 16 Q 1065 0 1080 15 Q 1095 5 1110 18 Q 1125 2 1140 14 Q 1155 0 1170 17 Q 1185 3 1200 16 L 1200 20 L 0 20 Z' fill='white'/%3E%3C/svg%3E\")",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        transform: "translateY(-100%) scaleY(-1)",
      }} />

      {/* Background Subtle Watermark Logo */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none w-96 h-96">
        <img src="/logo.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tagline pill */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "0ms",
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 text-crimson font-label text-[11px] tracking-[0.3em] uppercase font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>THE HANZEL PHILOSOPHY – EST. 2022</span>
              </div>
            </div>

            {/* Big Quote */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: "150ms",
              }}
            >
              <h2 className="font-display text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.12] text-noir">
                &ldquo;We do not decorate a room. We set a table for a life that is about to change.&rdquo;
              </h2>
            </div>

            {/* Body Copy */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: "300ms",
              }}
            >
              <p className="font-body text-base sm:text-lg leading-relaxed text-noir/70 max-w-2xl">
                Founded as an elite wedding planning and production house, Hanzel Events brings an architectural approach to matrimony. Lighting, hospitality, floral sculpting, and sound are held in one unified conversation so your day arrives effortlessly.
              </p>
            </div>

            {/* Feature Cards */}
            <div
              className="grid sm:grid-cols-2 gap-5 pt-2 transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: "450ms",
              }}
            >
              <div className="flex items-start gap-3.5 p-5 rounded-xl bg-white/80 border border-noir/8 shadow-sm hover:shadow-md hover:border-crimson/20 transition-all duration-300 group">
                <div className="p-2.5 rounded-lg bg-crimson text-ivory shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-noir">Bespoke Curation</h3>
                  <p className="font-body text-xs text-noir/65 mt-1 leading-relaxed">
                    No template designs. Every mandap, palette, and floral installation is custom crafted.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-5 rounded-xl bg-white/80 border border-noir/8 shadow-sm hover:shadow-md hover:border-crimson/20 transition-all duration-300 group">
                <div className="p-2.5 rounded-lg bg-crimson text-ivory shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-noir">Pan-India Studios</h3>
                  <p className="font-body text-xs text-noir/65 mt-1 leading-relaxed">
                    Operating studios in Kochi, Hyderabad, Udaipur, Goa, and Bangalore.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Invitation Card */}
          <div
            className="lg:col-span-5 flex flex-col items-center justify-start lg:pt-6 transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0) rotate(0deg)" : "translateX(60px) rotate(2deg)",
              transitionDelay: "350ms",
            }}
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-sm bg-[#f0e6da] p-8 sm:p-10 border border-rosegold-dark/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-between text-center"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            >
              {/* Inner border */}
              <div className="absolute inset-4 border border-crimson/15 rounded-sm pointer-events-none" />

              {/* Corner flourishes */}
              <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-crimson/30" />
              <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-crimson/30" />
              <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-crimson/30" />
              <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-crimson/30" />

              <p className="font-label text-[9px] tracking-[0.4em] text-crimson/80 uppercase font-bold mt-2">
                ROYAL INVITATION TO ELEGANCE
              </p>

              <div className="my-auto space-y-3 py-4">
                <p className="font-display text-2xl italic text-noir/70">the marriage of</p>
                <p className="font-display text-3xl sm:text-4xl font-bold text-crimson tracking-wide">Artistry &amp; Emotion</p>
                <p className="font-display text-2xl italic text-noir/70">composed as one</p>
                <div className="w-16 h-px bg-crimson/30 mx-auto my-5" />
                <p className="font-body text-xs leading-relaxed text-noir/60 px-6 max-w-xs mx-auto">
                  From initial sit-down concept sketches to the grand reception fireworks, our crew oversees every detail with calm perfection.
                </p>
              </div>

              {/* Wax Seal with Tassel */}
              <div className="relative group cursor-pointer mb-2">
                {/* Tassel string */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-px h-10 bg-gradient-to-b from-amber-700 to-amber-500/40" />
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 flex gap-0.5">
                  <div className="w-1 h-5 bg-gradient-to-b from-amber-600 to-amber-400/30 rounded-full" />
                  <div className="w-1 h-6 bg-gradient-to-b from-amber-600 to-amber-400/30 rounded-full" />
                  <div className="w-1 h-5 bg-gradient-to-b from-amber-600 to-amber-400/30 rounded-full" />
                </div>

                <div className="w-20 h-20 rounded-full wax-seal grid place-items-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <span className="font-label text-[9px] tracking-[0.3em] font-bold text-ivory uppercase">
                    H&amp;E
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Counter Bar */}
        <div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-noir/10 pt-12 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "600ms",
          }}
        >
          <div className="text-center">
            <p className="font-display text-5xl sm:text-6xl font-bold text-crimson">150+</p>
            <p className="font-label text-xs tracking-[0.22em] text-noir/60 uppercase mt-2">
              Weddings Orchestrated
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-5xl sm:text-6xl font-bold text-crimson">100%</p>
            <p className="font-label text-xs tracking-[0.22em] text-noir/60 uppercase mt-2">
              Bespoke Tailored Decor
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-5xl sm:text-6xl font-bold text-crimson">4.9★</p>
            <p className="font-label text-xs tracking-[0.22em] text-noir/60 uppercase mt-2">
              Couple &amp; Guest Praise
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-5xl sm:text-6xl font-bold text-crimson">5+</p>
            <p className="font-label text-xs tracking-[0.22em] text-noir/60 uppercase mt-2">
              Destination Regions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
