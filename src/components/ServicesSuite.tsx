import { useState } from "react";
import { Check, Sparkles, Video, Crown, Compass, ShieldCheck } from "lucide-react";

const SERVICES = [
  {
    id: "planning",
    icon: Crown,
    title: "Full Wedding Art Direction & Planning",
    tagline: "One unified Vision, Zero Vendor Chaos",
    description:
      "We take complete ownership of your celebration from timeline creation and theme ideation to budgeting, contract negotiations, and technical production.",
    features: [
      "Custom theme moodboards & 3D venue renders",
      "Vendor orchestration (photography, makeup, caterers)",
      "Comprehensive timeline & stage management",
      "Budget optimization & direct luxury pricing",
    ],
  },
  {
    id: "mandap",
    icon: Sparkles,
    title: "Bespoke Mandap & Floral Architecture",
    tagline: "Scenery Built to Take Breath Away",
    description:
      "From opulent crystal chandelier mandaps at royal palaces to rustic botanical beachfront setups, our floral sculptors build sets that frame your sacred vows.",
    features: [
      "Fresh exotic flower installations",
      "Custom mandap pillars & glass aisleways",
      "Photo backdrop booths & welcome archways",
      "Theme-matching banquet table centerpieces",
    ],
  },
  {
    id: "lighting",
    icon: Video,
    title: "Atmospheric Lighting & Sound Dynamics",
    tagline: "Illumination That Paints Emotion",
    description:
      "Lighting is the quiet narrator of your wedding. We engineer dynamic mood lighting, warm fairy lights, architectural uplighting, and concert-grade acoustic sound.",
    features: [
      "Architectural facade & garden tree uplighting",
      "Synchronized entry pyrotechnics & dry ice fog",
      "Acoustic audio design for crystal-clear vows",
      "Sangeet concert stage lighting & LED walls",
    ],
  },
  {
    id: "hospitality",
    icon: ShieldCheck,
    title: "Royal Guest Hospitality & Logistics",
    tagline: "Seamless Comfort for Every Loved One",
    description:
      "Your guests are treated to first-class hospitality from airport greetings and luxury fleet shuttles to curated room hampers and dedicated floor concierge.",
    features: [
      "Airport luxury fleet pickup & drop management",
      "Custom room hampers & welcome letters",
      "Guest RSVP desk & check-in management",
      "Special dietary & VIP guest concierge",
    ],
  },
  {
    id: "destination",
    icon: Compass,
    title: "Destination Wedding Curation",
    tagline: "Kerala, Rajasthan, Goa & International",
    description:
      "Whether it’s a backwater resort in Kumarakom, a cliffside palace in Udaipur, or a beachfront sunset in Goa, we handle remote logistics with ease.",
    features: [
      "Site selection & venue inspection tours",
      "Destination permissions & local vendor scouting",
      "Travel, stay & banquet contract curation",
      "Multi-day theme coordination (Mehendi, Sangeet, Wedding, Reception)",
    ],
  },
];

export function ServicesSuite() {
  const [activeTab, setActiveTab] = useState("planning");

  const currentService = SERVICES.find((s) => s.id === activeTab) || SERVICES[0];

  return (
    <section id="services" className="bg-noir py-24 px-6 text-ivory relative overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-crimson/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-rosegold/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="font-label text-xs tracking-[0.3em] text-rosegold uppercase font-semibold">
            THE WEDDING SUITE · BESPOKE SERVICES
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-ivory">
            What is included in <em className="italic text-rosegold">your celebration.</em>
          </h2>
          <p className="font-body text-sm sm:text-base text-ivory/70 leading-relaxed">
            One studio holds art direction, floral architecture, production, sound, and floor direction. You do not assemble a wedding from six scattered inboxes — you receive one flawless experience.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 border-b border-ivory/10 pb-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-full font-label text-xs tracking-[0.2em] transition-all uppercase font-medium ${
                  isActive
                    ? "bg-crimson text-ivory shadow-lg shadow-crimson/30 border border-crimson-light"
                    : "glass-header text-ivory/70 hover:text-ivory hover:border-rosegold/30"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-champagne" : "text-rosegold"}`} />
                <span>{s.title.split("&")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Card */}
        <div className="mt-10 grid lg:grid-cols-12 gap-8 items-center glass-header rounded-3xl p-8 sm:p-12 border border-rosegold/20">
          {/* Service Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/20 border border-crimson/30 text-rosegold font-label text-[10px] tracking-[0.25em] uppercase">
              <span>{currentService.tagline}</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl text-ivory font-light">
              {currentService.title}
            </h3>

            <p className="font-body text-sm sm:text-base leading-relaxed text-ivory/80">
              {currentService.description}
            </p>

            <div className="space-y-3 pt-2">
              {currentService.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-crimson text-ivory shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-body text-sm text-ivory/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Media Feature Box */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-rosegold/30 shadow-2xl aspect-[4/3]">
            {currentService.id === "lighting" ? (
              <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                <source src="/lighting.mp4" type="video/mp4" />
              </video>
            ) : currentService.id === "mandap" ? (
              <img
                src="/mandap-decor.png"
                alt="Mandap Decor Architecture"
                className="h-full w-full object-cover"
              />
            ) : (
              <video autoPlay loop muted playsInline className="h-full w-full object-cover">
                <source src="/hero-alt.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent flex items-end p-6">
              <span className="font-label text-xs tracking-[0.2em] text-ivory uppercase font-semibold">
                HANZEL EVENTS STAGING
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
