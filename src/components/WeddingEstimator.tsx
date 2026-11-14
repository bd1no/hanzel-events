import { useState } from "react";
import { Calculator, Sparkles, ArrowRight, Crown, Palette, MapPin } from "lucide-react";

interface WeddingEstimatorProps {
  onOpenEnquiryWithData: (data: {
    guests: string;
    theme: string;
    focus: string;
    location: string;
  }) => void;
}

// e.g. 15000 → "€15,000"
function formatEuros(amount: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function WeddingEstimator({ onOpenEnquiryWithData }: WeddingEstimatorProps) {
  const [guests, setGuests] = useState<string>("150-300");
  const [theme, setTheme] = useState<string>("Royal Heritage");
  const [focus, setFocus] = useState<string>("All-Inclusive Curation");
  const [location, setLocation] = useState<string>("Kerala Backwaters");

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

    if (location === "Udaipur / Rajasthan Palace") {
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

  return (
    <section id="estimator" className="bg-noir py-24 px-6 text-ivory relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/10 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-header border border-rosegold/30 text-rosegold font-label text-[10px] tracking-[0.25em] uppercase font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE CONSULTATION BUILDER</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-ivory">
            Calculate your custom <em className="italic text-rosegold">wedding scope.</em>
          </h2>
          <p className="font-body text-sm sm:text-base text-ivory/75">
            Select your guest scale, dream aesthetic, and destination region to generate an instant estimate breakdown and recommended color palette.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Options Input Form */}
          <div className="lg:col-span-7 glass-header rounded-3xl p-6 sm:p-8 border border-rosegold/20 space-y-6">
            {/* Step 1: Guest Count */}
            <div>
              <label className="font-label text-xs tracking-[0.2em] text-rosegold uppercase font-semibold block mb-3 flex items-center gap-2">
                <Crown className="w-4 h-4 text-champagne" />
                <span>1. Guest Count Scale</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["<150", "150-300", "300-500", "500+"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setGuests(val)}
                    className={`py-2.5 px-3 rounded-xl font-label text-xs tracking-wider transition-all ${
                      guests === val
                        ? "bg-crimson text-ivory font-bold shadow-md"
                        : "bg-noir/40 text-ivory/70 border border-ivory/10 hover:border-rosegold/30"
                    }`}
                  >
                    {val} Guests
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Theme */}
            <div>
              <label className="font-label text-xs tracking-[0.2em] text-rosegold uppercase font-semibold block mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-champagne" />
                <span>2. Theme &amp; Aesthetic Vibe</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Royal Heritage",
                  "Coastal Boho Luxe",
                  "Botanical Romance",
                  "Modern Glamour",
                ].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTheme(val)}
                    className={`py-3 px-4 rounded-xl font-label text-xs tracking-wider transition-all text-left ${
                      theme === val
                        ? "bg-crimson text-ivory font-bold shadow-md"
                        : "bg-noir/40 text-ivory/70 border border-ivory/10 hover:border-rosegold/30"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Location */}
            <div>
              <label className="font-label text-xs tracking-[0.2em] text-rosegold uppercase font-semibold block mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-champagne" />
                <span>3. Destination Region</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "Kerala Backwaters",
                  "Udaipur / Rajasthan Palace",
                  "Goa Beachfront",
                  "Hyderabad Royal",
                  "Bangalore Estate",
                ].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setLocation(val)}
                    className={`py-2.5 px-3 rounded-xl font-label text-[11px] tracking-wider transition-all text-left truncate ${
                      location === val
                        ? "bg-crimson text-ivory font-bold shadow-md"
                        : "bg-noir/40 text-ivory/70 border border-ivory/10 hover:border-rosegold/30"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Key Focus */}
            <div>
              <label className="font-label text-xs tracking-[0.2em] text-rosegold uppercase font-semibold block mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-champagne" />
                <span>4. Primary Focus Area</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Mandap & Stage Decor",
                  "Cinematic Lighting",
                  "Royal Hospitality",
                  "All-Inclusive Curation",
                ].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFocus(val)}
                    className={`py-2.5 px-3 rounded-xl font-label text-xs tracking-wider transition-all text-left ${
                      focus === val
                        ? "bg-crimson text-ivory font-bold shadow-md"
                        : "bg-noir/40 text-ivory/70 border border-ivory/10 hover:border-rosegold/30"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 rounded-3xl p-8 bg-gradient-to-b from-[#1c161c] to-noir border border-rosegold/40 shadow-2xl space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/20 text-rosegold font-label text-[10px] tracking-[0.25em] uppercase font-bold">
              <span>YOUR WEDDING BREAKDOWN</span>
            </div>

            <div>
              <p className="font-label text-xs tracking-[0.2em] text-ivory/60 uppercase">
                ESTIMATED PLANNING &amp; PRODUCTION
              </p>
              <p className="font-display text-4xl sm:text-5xl font-bold text-crimson mt-2 drop-shadow">
                {getEstimatedRange()}
              </p>
              <p className="font-body text-[11px] text-ivory/50 mt-1">
                *Includes decor, lighting, stage, vendor direction &amp; floor crew.
              </p>
            </div>

            {/* Custom Palette Preview */}
            <div className="bg-noir/60 p-4 rounded-2xl border border-ivory/10 space-y-2">
              <span className="font-label text-[10px] tracking-[0.2em] text-rosegold uppercase block">
                RECOMMENDED PALETTE
              </span>
              <div className="flex items-center justify-center gap-3 pt-1">
                {getPalette().map((hex, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border border-white/20 shadow-md transform transition-transform hover:scale-125"
                    style={{ backgroundColor: hex }}
                    title={`Color ${hex}`}
                  />
                ))}
              </div>
            </div>

            {/* Selected Summary Tags */}
            <div className="text-left bg-noir/40 p-4 rounded-2xl border border-ivory/10 space-y-2 text-xs font-body text-ivory/80">
              <div className="flex justify-between">
                <span className="text-ivory/50">Scale:</span>
                <span className="font-semibold">{guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory/50">Theme:</span>
                <span className="font-semibold text-rosegold">{theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory/50">Region:</span>
                <span className="font-semibold">{location}</span>
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
              className="gemstone-btn w-full py-4 px-6 rounded-full font-label text-xs tracking-[0.25em] text-noir font-bold uppercase flex items-center justify-center gap-2"
            >
              <span>Book Consultation With This Scope</span>
              <ArrowRight className="w-4 h-4 text-crimson" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
