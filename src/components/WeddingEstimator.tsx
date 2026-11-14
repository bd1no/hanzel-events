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
      ? "text-white shadow-[0_0_22px_rgba(139,124,240,0.55)] border border-[#c7bbff]/60"
      : "bg-white/[0.03] text-[#ddd6f5]/85 border border-[#b9a7f5]/15 hover:border-[#b9a7f5]/45 hover:bg-white/[0.06]"
  }`;
}

const SELECTED_BG = { background: "linear-gradient(135deg, #5b55d0 0%, #8f7ae6 55%, #b3a3f3 100%)" };

// Four-point sparkle used in the badge divider and the star field
function Sparkle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 0 C12.8 7.5 16.5 11.2 24 12 C16.5 12.8 12.8 16.5 12 24 C11.2 16.5 7.5 12.8 0 12 C7.5 11.2 11.2 7.5 12 0 Z" />
    </svg>
  );
}

// One faceted crystal shard: a tall hexagonal prism with a light and a dark face
function Shard({ x, y, w, h, rotate, shade = 0 }: { x: number; y: number; w: number; h: number; rotate: number; shade?: number }) {
  const tip = h * 0.28;
  const left = `${x},${y - h} ${x - w},${y - h + tip} ${x - w},${y} ${x},${y + w * 0.35}`;
  const right = `${x},${y - h} ${x + w},${y - h + tip} ${x + w},${y} ${x},${y + w * 0.35}`;
  return (
    <g transform={`rotate(${rotate} ${x} ${y})`} opacity={1 - shade * 0.25}>
      <polygon points={left} fill="url(#crystal-light)" stroke="#e9e2ff" strokeOpacity="0.55" strokeWidth="1.2" />
      <polygon points={right} fill="url(#crystal-dark)" stroke="#e9e2ff" strokeOpacity="0.35" strokeWidth="1.2" />
      <line x1={x} y1={y - h} x2={x} y2={y + w * 0.35} stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1" />
    </g>
  );
}

// Cluster of shards growing from a corner; mirrored for the right side
function CrystalCluster({ side }: { side: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 320 900"
      preserveAspectRatio="xMinYMid slice"
      className={`absolute top-0 bottom-0 h-full w-[34vw] max-w-[420px] pointer-events-none opacity-80 ${
        side === "left" ? "left-0" : "right-0 -scale-x-100"
      }`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crystal-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#efeaff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#a99af0" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#4b3f9e" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="crystal-dark" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b7de0" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#3a2f7d" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1b1540" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="crystal-glow">
          <stop offset="0%" stopColor="#b9a7f5" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#b9a7f5" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Upper cluster */}
      <circle cx="70" cy="230" r="170" fill="url(#crystal-glow)" />
      <Shard x={40} y={330} w={34} h={260} rotate={-18} shade={1} />
      <Shard x={110} y={300} w={26} h={200} rotate={14} />
      <Shard x={20} y={260} w={22} h={150} rotate={-40} shade={2} />
      <Shard x={150} y={340} w={18} h={120} rotate={32} shade={1} />

      {/* Lower cluster */}
      <circle cx="90" cy="760" r="200" fill="url(#crystal-glow)" />
      <Shard x={70} y={900} w={44} h={330} rotate={8} />
      <Shard x={150} y={910} w={30} h={230} rotate={28} shade={1} />
      <Shard x={10} y={880} w={30} h={220} rotate={-22} shade={1} />
      <Shard x={210} y={920} w={20} h={140} rotate={42} shade={2} />
    </svg>
  );
}

// Fixed positions so the star field looks the same on every render
const STARS = [
  { top: "8%", left: "30%", size: 10, delay: "0s" },
  { top: "14%", left: "72%", size: 14, delay: "1.2s" },
  { top: "36%", left: "22%", size: 8, delay: "0.6s" },
  { top: "52%", left: "88%", size: 18, delay: "2s" },
  { top: "68%", left: "12%", size: 12, delay: "1.6s" },
  { top: "80%", left: "64%", size: 9, delay: "0.3s" },
  { top: "24%", left: "92%", size: 8, delay: "2.4s" },
  { top: "90%", left: "36%", size: 11, delay: "1s" },
];

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
        return ["#6f68d8", "#cfc3d9", "#3e4a78", "#c9a86a"];
      case "Coastal Boho Luxe":
        return ["#e5b8a6", "#2c5e53", "#f8f4ef", "#d4af37"];
      case "Botanical Romance":
        return ["#3b5a45", "#f3d8cc", "#ffffff", "#8b1e2d"];
      default:
        return ["#141014", "#e5b8a6", "#d4af37", "#ffffff"];
    }
  };

  const stepLabel = "font-label text-xs tracking-[0.25em] text-[#e4ddfb] uppercase font-semibold mb-3 flex items-center gap-2.5";
  const stepIcon = "w-4 h-4 text-[#d9b46c]";

  return (
    <section
      id="estimator"
      className="relative min-h-screen overflow-hidden pt-32 pb-24 px-6 text-white"
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, #2a1f4d 0%, #17112e 45%, #0b0817 100%)",
      }}
    >
      {/* Star dust: two tiled layers of tiny dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20px 30px, #fff, transparent), radial-gradient(1px 1px at 120px 80px, #d9d0ff, transparent), radial-gradient(1.5px 1.5px at 200px 160px, #fff, transparent), radial-gradient(1px 1px at 60px 190px, #cfc4ff, transparent)",
          backgroundSize: "240px 240px",
        }}
      />
      {STARS.map((s, i) => (
        <Sparkle
          key={i}
          className="absolute text-[#fff4dc] animate-pulse-glow pointer-events-none"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
        />
      ))}

      {/* Crystal clusters framing the page */}
      <div className="hidden md:block">
        <CrystalCluster side="left" />
        <CrystalCluster side="right" />
      </div>

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#b9a7f5]/35 bg-white/[0.04] backdrop-blur font-label text-[11px] tracking-[0.25em] uppercase text-[#e4ddfb]">
            <Star className="w-3.5 h-3.5 text-[#d9b46c] fill-current" />
            <span>Estimate · Plan · Celebrate</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-normal text-white mt-5 leading-[1.05]">
            Calculate your custom{" "}
            <em className="italic text-[#c9bcff]">wedding scope.</em>
          </h2>
          <div className="flex items-center justify-center gap-3 my-4" aria-hidden="true">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#c9bcff]/70" />
            <Sparkle className="w-3.5 h-3.5 text-[#e4ddfb]" />
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#c9bcff]/70" />
          </div>
          <p className="font-body text-sm sm:text-base text-[#ddd6f5]/85">
            Select your guest scale, dream aesthetic, and destination region to generate an instant estimate breakdown and recommended color palette.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Options Input Form */}
          <div
            className="lg:col-span-7 rounded-[28px] p-6 sm:p-8 space-y-7 border border-[#b9a7f5]/30 backdrop-blur-md"
            style={{
              background: "linear-gradient(160deg, rgba(58,44,104,0.55) 0%, rgba(22,16,44,0.65) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 60px rgba(10,6,30,0.6), 0 0 40px rgba(139,124,240,0.12)",
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
            className="lg:col-span-5 rounded-[28px] p-7 sm:p-8 space-y-6 text-center border border-[#b9a7f5]/35 backdrop-blur-md"
            style={{
              background: "linear-gradient(170deg, rgba(64,48,112,0.6) 0%, rgba(24,18,48,0.7) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 60px rgba(10,6,30,0.6), 0 0 50px rgba(139,124,240,0.18)",
            }}
          >
            <div className="inline-flex px-4 py-1 rounded-full border border-[#b9a7f5]/35 bg-white/[0.05] font-label text-[10px] tracking-[0.25em] uppercase text-[#e4ddfb]">
              Your Wedding Breakdown
            </div>

            <div>
              <p className="font-label text-xs tracking-[0.2em] text-[#ddd6f5]/90 uppercase whitespace-nowrap">
                Estimated Planning &amp; Production
              </p>
              <p
                className="font-display text-5xl sm:text-6xl font-semibold mt-3 leading-[1.05] bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(180deg, #f3efff 0%, #c9bcff 55%, #9d8cf0 100%)",
                  filter: "drop-shadow(0 0 18px rgba(185,167,245,0.35))",
                }}
              >
                {getEstimatedRange()}
              </p>
              <p className="font-label text-[10px] tracking-[0.2em] text-[#ddd6f5]/70 uppercase mt-3">
                Typical cost range for a {prettyRange(guests)} guest wedding
              </p>
              <Sparkle className="w-3 h-3 text-[#d9b46c] mx-auto mt-3" />
            </div>

            {/* Custom Palette Preview */}
            <div className="rounded-2xl border border-[#b9a7f5]/25 bg-white/[0.03] p-4 space-y-3">
              <span className="font-label text-[10px] tracking-[0.25em] text-[#e4ddfb] uppercase block">
                Recommended Palette
              </span>
              <div className="flex items-center justify-center gap-3">
                {getPalette().map((hex, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border border-white/30 shadow-[0_0_14px_rgba(185,167,245,0.35)] transition-transform hover:scale-125"
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
              className="relative w-full overflow-hidden py-4 px-6 rounded-full font-label text-xs tracking-[0.25em] text-[#1d1640] font-bold uppercase flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] border border-white/60 shadow-[0_0_30px_rgba(185,167,245,0.45)]"
              style={{ background: "linear-gradient(120deg, #cdbff7 0%, #f1ecff 35%, #b4a3f0 65%, #e3dbff 100%)" }}
            >
              <Star className="w-3.5 h-3.5 text-[#c99a3e] fill-current" />
              <span>Book Consultation With This Scope</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
