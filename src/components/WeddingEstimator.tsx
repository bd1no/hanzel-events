import { useEffect, useState } from "react";
import { Star, Crown, Palette, MapPin, Sparkles } from "lucide-react";

interface WeddingEstimatorProps {
  onOpenEnquiryWithData: (data: {
    guests: string;
    theme: string;
    focus: string;
    location: string;
  }) => void;
}

const GUEST_OPTIONS = ["<150", "150-300", "300-500", "500+"];
const THEME_OPTIONS = ["Royal Heritage", "Coastal Boho Luxe", "Botanical Romance", "Modern Glamour"];
const LOCATION_OPTIONS = ["Scandinavia", "Iberian Peninsula", "Côte d’Azur", "Mediterranean", "Alpine"];
const FOCUS_OPTIONS = ["Mandap & Stage Decor", "Cinematic Lighting", "Royal Hospitality", "All-Inclusive Curation"];

// e.g. 15000 → "€15,000"
function formatEuros(amount: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// "150-300" → "150–300" (typographic dash for display)
const prettyRange = (val: string) => val.replace("-", "–");

// Selected / unselected pill styles shared by every option group
function pillClass(selected: boolean, extra = "") {
  return `py-2.5 rounded-full font-body text-sm transition-all duration-300 ${extra} ${
    selected
      ? "text-[#2b1f14] font-semibold shadow-[0_0_22px_rgba(250,235,215,0.45)] border border-white/70"
      : "bg-black/25 text-[#f3e9dc]/90 border border-[#f1dfc6]/25 hover:border-[#f1dfc6]/55 hover:bg-black/35"
  }`;
}

const SELECTED_BG = { background: "linear-gradient(135deg, #fffaf3 0%, #f6e9d9 60%, #e8d3bb 100%)" };

// Four-point sparkle used in the badge divider and the star field
function Sparkle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 0 C12.8 7.5 16.5 11.2 24 12 C16.5 12.8 12.8 16.5 12 24 C11.2 16.5 7.5 12.8 0 12 C7.5 11.2 11.2 7.5 12 0 Z" />
    </svg>
  );
}

type Shine = { id: number; top: number; left: number; size: number };

// Random glints of light that flash briefly across the page, a few at a time
function LightShines() {
  const [shines, setShines] = useState<Shine[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let nextId = 0;
    const timer = window.setInterval(() => {
      const shine: Shine = {
        id: nextId++,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 14 + Math.random() * 26,
      };
      setShines((current) => [...current.slice(-5), shine]);
      // Drop it once its 1.6s animation has finished
      window.setTimeout(() => {
        setShines((current) => current.filter((s) => s.id !== shine.id));
      }, 1700);
    }, 700);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5]" aria-hidden="true">
      {shines.map((s) => (
        <Sparkle
          key={s.id}
          className="light-shine"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
        />
      ))}
    </div>
  );
}

export function WeddingEstimator({ onOpenEnquiryWithData }: WeddingEstimatorProps) {
  const [guests, setGuests] = useState<string>("150-300");
  const [theme, setTheme] = useState<string>("Royal Heritage");
  const [focus, setFocus] = useState<string>("All-Inclusive Curation");
  const [location, setLocation] = useState<string>("Iberian Peninsula");

  // Dynamic Output Calculations
  const getEstimatedRange = () => {
    let baseMin = 15; // in thousands of euros
    let baseMax = 35;

    if (guests === "500+") {
      baseMin = 45;
      baseMax = 95;
    } else if (guests === "300-500") {
      baseMin = 30;
      baseMax = 60;
    } else if (guests === "<150") {
      baseMin = 12;
      baseMax = 25;
    }

    if (theme === "Royal Heritage") {
      baseMin += 8;
      baseMax += 15;
    }

    // Premium destinations
    if (location === "Côte d’Azur" || location === "Scandinavia") {
      baseMin += 10;
      baseMax += 20;
    }

    return `${formatEuros(baseMin * 1000)} – ${formatEuros(baseMax * 1000)}`;
  };

  const getPalette = () => {
    switch (theme) {
      case "Royal Heritage":
        return ["#8b1e2d", "#d4af37", "#141014", "#f8f4ef"];
      case "Coastal Boho Luxe":
        return ["#e5b8a6", "#2c5e53", "#f8f4ef", "#d4af37"];
      case "Botanical Romance":
        return ["#3b5a45", "#f3d8cc", "#ffffff", "#8b1e2d"];
      default:
        return ["#141014", "#e5b8a6", "#d4af37", "#ffffff"];
    }
  };

  const stepLabel = "font-label text-xs tracking-[0.25em] text-[#f3e6c8] uppercase font-semibold mb-3 flex items-center gap-2.5";
  const stepIcon = "w-4 h-4 text-[#e6c6a4]";

  return (
    <section
      id="estimator"
      className="relative min-h-screen overflow-hidden pt-32 pb-24 px-6 text-white"
      style={{
        background: "#0a0805",
      }}
    >
      {/* Crystal background image, faded into the dark base */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: "url('/estimator-bg-gold.webp') center / cover no-repeat" }}
      />
      {/* Darker centre so the text and panels stay readable over the crystals */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(10,8,5,0.45) 0%, rgba(10,8,5,0.15) 55%, transparent 80%)" }}
      />

      {/* Occasional glints of light */}
      <LightShines />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d9b46c]/35 bg-white/[0.04] backdrop-blur font-label text-[11px] tracking-[0.25em] uppercase text-[#f3e6c8]">
            <Star className="w-3.5 h-3.5 text-[#e6c6a4] fill-current" />
            <span>Estimate · Plan · Celebrate</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-normal text-white mt-5 leading-[1.05]">
            Calculate your custom{" "}
            <em className="italic text-[#ecc9a8]">wedding scope.</em>
          </h2>
          <div className="flex items-center justify-center gap-3 my-4" aria-hidden="true">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#ecc9a8]/70" />
            <Sparkle className="w-3.5 h-3.5 text-[#f3e6c8]" />
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#ecc9a8]/70" />
          </div>
          <p className="font-body text-sm sm:text-base text-[#e9dcc0]/85">
            Select your guest scale, dream aesthetic, and destination region to generate an instant estimate breakdown and recommended color palette.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Options Input Form */}
          <div
            className="lg:col-span-7 rounded-[28px] p-6 sm:p-8 space-y-7 border border-[#f1dfc6]/50 backdrop-blur-md"
            style={{
              background: "linear-gradient(160deg, rgba(150,125,105,0.30) 0%, rgba(70,56,46,0.38) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 30px rgba(255,240,220,0.06), 0 20px 60px rgba(8,5,2,0.5), 0 0 28px rgba(245,225,195,0.22)",
            }}
          >
            {/* Step 1: Guest Count */}
            <div>
              <p className={stepLabel}>
                <Crown className={stepIcon} />
                <span>1. Guest Count Scale</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {GUEST_OPTIONS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setGuests(val)}
                    className={pillClass(guests === val, "px-2 text-[13px] whitespace-nowrap")}
                    style={guests === val ? SELECTED_BG : undefined}
                  >
                    {prettyRange(val)} Guests
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Theme */}
            <div>
              <p className={stepLabel}>
                <Palette className={stepIcon} />
                <span>2. Theme &amp; Aesthetic Vibe</span>
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {THEME_OPTIONS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTheme(val)}
                    className={pillClass(theme === val, "text-left px-5")}
                    style={theme === val ? SELECTED_BG : undefined}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Location */}
            <div>
              <p className={stepLabel}>
                <MapPin className={stepIcon} />
                <span>3. Destination Region</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {LOCATION_OPTIONS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setLocation(val)}
                    className={pillClass(location === val, "text-left px-5 truncate")}
                    style={location === val ? SELECTED_BG : undefined}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Key Focus */}
            <div>
              <p className={stepLabel}>
                <Sparkles className={stepIcon} />
                <span>4. Primary Focus Area</span>
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {FOCUS_OPTIONS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFocus(val)}
                    className={pillClass(focus === val, "text-left px-5")}
                    style={focus === val ? SELECTED_BG : undefined}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div
            className="lg:col-span-5 rounded-[28px] p-7 sm:p-8 space-y-6 text-center border border-[#f1dfc6]/50 backdrop-blur-md"
            style={{
              background: "linear-gradient(170deg, rgba(150,125,105,0.30) 0%, rgba(70,56,46,0.38) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 30px rgba(255,240,220,0.06), 0 20px 60px rgba(8,5,2,0.5), 0 0 28px rgba(245,225,195,0.22)",
            }}
          >
            <div className="inline-flex px-4 py-1 rounded-full border border-[#d9b46c]/35 bg-white/[0.05] font-label text-[10px] tracking-[0.25em] uppercase text-[#f3e6c8]">
              Your Wedding Breakdown
            </div>

            <div>
              <p className="font-label text-xs tracking-[0.2em] text-[#e9dcc0]/90 uppercase whitespace-nowrap">
                Estimated Planning &amp; Production
              </p>
              <p
                className="font-display text-5xl sm:text-6xl font-semibold mt-3 leading-[1.05] bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(180deg, #fff3e6 0%, #ecd0b6 50%, #c99c7a 100%)",
                  filter: "drop-shadow(0 0 18px rgba(245,215,185,0.35))",
                }}
              >
                {getEstimatedRange()}
              </p>
              <p className="font-label text-[10px] tracking-[0.2em] text-[#e9dcc0]/70 uppercase mt-3">
                Typical cost range for a {prettyRange(guests)} guest wedding
              </p>
              <div className="flex items-center justify-center gap-3 mt-4" aria-hidden="true">
                <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#f1dfc6]/40" />
                <span className="w-1.5 h-1.5 rotate-45 bg-[#e8cdb0]" />
                <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#f1dfc6]/40" />
              </div>
            </div>

            {/* Custom Palette Preview */}
            <div className="space-y-3">
              <span className="font-label text-[10px] tracking-[0.25em] text-[#f3e6c8] uppercase block">
                Recommended Palette
              </span>
              <div className="flex items-center justify-center gap-3">
                {getPalette().map((hex, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border border-white/30 shadow-[0_0_14px_rgba(245,225,195,0.3)] transition-transform hover:scale-125"
                    style={{ backgroundColor: hex }}
                    title={`Color ${hex}`}
                  />
                ))}
              </div>
            </div>

            {/* Selected Summary */}
            <div className="border-t border-[#f1dfc6]/20 pt-5 space-y-2 text-sm font-body">
              {[
                ["Scale", `${prettyRange(guests)} Guests`],
                ["Theme", theme],
                ["Region", location],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-[#e9dcc0]/65">{label}:</span>
                  <span className="text-[#f6ece0]">{value}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() =>
                onOpenEnquiryWithData({
                  guests,
                  theme,
                  focus,
                  location,
                })
              }
              className="relative w-full overflow-hidden py-4 px-6 rounded-full font-label text-xs tracking-[0.25em] text-[#2b1f14] font-bold uppercase flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] border border-white/60 shadow-[0_0_30px_rgba(250,230,205,0.45)]"
              style={{ background: "linear-gradient(120deg, #ead2b6 0%, #fdf6ec 40%, #e6ccae 75%, #f6e6d2 100%)" }}
            >
              <Star className="w-3.5 h-3.5 text-[#a7774c] fill-current" />
              <span>Book Consultation With This Scope</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
