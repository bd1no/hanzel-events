import { useState } from "react";
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
      ? "text-[#1a1206] font-semibold shadow-[0_0_18px_rgba(248,244,239,0.25)] border border-[#d9b46c]/60"
      : "bg-white/[0.03] text-[#e9dcc0]/85 border border-[#d9b46c]/15 hover:border-[#d9b46c]/45 hover:bg-white/[0.06]"
  }`;
}

const SELECTED_BG = { background: "linear-gradient(135deg, #fbf8f2 0%, #f8f4ef 50%, #eae2d8 100%)" };

// Four-point sparkle used in the badge divider and the star field
function Sparkle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 0 C12.8 7.5 16.5 11.2 24 12 C16.5 12.8 12.8 16.5 12 24 C11.2 16.5 7.5 12.8 0 12 C7.5 11.2 11.2 7.5 12 0 Z" />
    </svg>
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
  const stepIcon = "w-4 h-4 text-[#d9b46c]";

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
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{ background: "url('/estimator-bg-gold.webp') center / cover no-repeat" }}
      />
      {/* Darker centre so the text and panels stay readable over the crystals */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(10,8,5,0.55) 0%, rgba(10,8,5,0.25) 55%, transparent 80%)" }}
      />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d9b46c]/35 bg-white/[0.04] backdrop-blur font-label text-[11px] tracking-[0.25em] uppercase text-[#f3e6c8]">
            <Star className="w-3.5 h-3.5 text-[#d9b46c] fill-current" />
            <span>Estimate · Plan · Celebrate</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-normal text-white mt-5 leading-[1.05]">
            Calculate your custom{" "}
            <em className="italic text-[#e8c378]">wedding scope.</em>
          </h2>
          <div className="flex items-center justify-center gap-3 my-4" aria-hidden="true">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#e8c378]/70" />
            <Sparkle className="w-3.5 h-3.5 text-[#f3e6c8]" />
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#e8c378]/70" />
          </div>
          <p className="font-body text-sm sm:text-base text-[#e9dcc0]/85">
            Select your guest scale, dream aesthetic, and destination region to generate an instant estimate breakdown and recommended color palette.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Options Input Form */}
          <div
            className="lg:col-span-7 rounded-[28px] p-6 sm:p-8 space-y-7 border border-[#d9b46c]/30 backdrop-blur-md"
            style={{
              background: "linear-gradient(160deg, rgba(62,46,22,0.55) 0%, rgba(20,14,8,0.65) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 60px rgba(8,5,2,0.6), 0 0 40px rgba(212,165,80,0.12)",
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
            className="lg:col-span-5 rounded-[28px] p-7 sm:p-8 space-y-6 text-center border border-[#d9b46c]/35 backdrop-blur-md"
            style={{
              background: "linear-gradient(170deg, rgba(68,50,24,0.6) 0%, rgba(22,16,9,0.7) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(8,5,2,0.6), 0 0 50px rgba(212,165,80,0.18)",
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
                  backgroundImage: "linear-gradient(180deg, #fff6dc 0%, #e8c378 55%, #b8862f 100%)",
                  filter: "drop-shadow(0 0 18px rgba(217,180,108,0.35))",
                }}
              >
                {getEstimatedRange()}
              </p>
              <p className="font-label text-[10px] tracking-[0.2em] text-[#e9dcc0]/70 uppercase mt-3">
                Typical cost range for a {prettyRange(guests)} guest wedding
              </p>
              <Sparkle className="w-3 h-3 text-[#d9b46c] mx-auto mt-3" />
            </div>

            {/* Custom Palette Preview */}
            <div className="rounded-2xl border border-[#d9b46c]/25 bg-white/[0.03] p-4 space-y-3">
              <span className="font-label text-[10px] tracking-[0.25em] text-[#f3e6c8] uppercase block">
                Recommended Palette
              </span>
              <div className="flex items-center justify-center gap-3">
                {getPalette().map((hex, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border border-white/30 shadow-[0_0_14px_rgba(217,180,108,0.35)] transition-transform hover:scale-125"
                    style={{ backgroundColor: hex }}
                    title={`Color ${hex}`}
                  />
                ))}
              </div>
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
              className="relative w-full overflow-hidden py-4 px-6 rounded-full font-label text-xs tracking-[0.25em] text-[#1f1505] font-bold uppercase flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] border border-white/60 shadow-[0_0_30px_rgba(217,180,108,0.45)]"
              style={{ background: "linear-gradient(120deg, #d9ae5c 0%, #fbefc9 35%, #c9973f 65%, #f1d995 100%)" }}
            >
              <Star className="w-3.5 h-3.5 text-[#7a4e12] fill-current" />
              <span>Book Consultation With This Scope</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
