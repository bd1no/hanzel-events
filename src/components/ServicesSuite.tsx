import { useState } from "react";
import { Check, Video, Crown, ShieldCheck } from "lucide-react";
import type { Theme } from "../App";

const SERVICES = [
  {
    id: "lighting",
    icon: Video,
    tabLabel: "ATMOSPHERIC LIGHTING",
    title: "Atmospheric Lighting &",
    titleItalic: "Sound Dynamics",
    tagline: "ONE UNIFIED VISION. • ZERO VENDOR CHAOS",
    description:
      "Lighting is the quiet narrator of your wedding. We engineer dynamic mood lighting, warm fairy lights, architectural uplighting, and concert-grade acoustic sound.",
    videoSrc: "/star.mp4",
    features: [
      "Architectural facade & garden tree uplighting",
      "Synchronized entry pyrotechnics & dry ice fog",
      "Acoustic audio design for crystal-clear vows",
      "Sangeet concert stage lighting & LED walls",
    ],
  },
  {
    id: "planning",
    icon: Crown,
    tabLabel: "FULL WEDDING ART DIRECTION",
    title: "Full Wedding Art Direction &",
    titleItalic: "Planning",
    tagline: "ONE UNIFIED VISION. • ZERO VENDOR CHAOS",
    description:
      "We take complete ownership of your celebration from timeline creation and theme ideation to budgeting, contract negotiations, and technical production.",
    videoSrc: "/events.mp4",
    features: [
      "Custom theme moodboards & 3D venue renders",
      "Vendor orchestration (photography, makeup, caterers)",
      "Comprehensive timeline & stage management",
      "Budget optimization & direct luxury pricing",
    ],
  },
  {
    id: "hospitality",
    icon: ShieldCheck,
    tabLabel: "ROYAL GUEST HOSPITALITY",
    title: "Royal Guest Hospitality &",
    titleItalic: "Logistics",
    tagline: "ONE UNIFIED VISION. • ZERO VENDOR CHAOS",
    description:
      "Your guests are treated to first-class hospitality from airport greetings and luxury fleet shuttles to curated room hampers and dedicated floor concierge.",
    videoSrc: "/hero-alt.mp4",
    features: [
      "Airport luxury fleet pickup & drop management",
      "Custom room hampers & welcome letters",
      "Guest RSVP desk & check-in management",
      "Special dietary & VIP guest concierge",
    ],
  },
];

// Cherry blossom petals drifting upward — replaces the old floating light dots
const PETALS = [
  { left: "6%",  bottom: "4%",  width: "10px", height: "13px", rotate: -18, drift: "34px", duration: "11.5s", delay: "0s"   },
  { left: "14%", bottom: "22%", width: "7px",  height: "9px",  rotate: 22,  drift: "-24px", duration: "9.2s",  delay: "1.4s" },
  { left: "22%", bottom: "10%", width: "13px", height: "16px", rotate: -8,  drift: "40px", duration: "13.5s", delay: "2.8s" },
  { left: "31%", bottom: "32%", width: "8px",  height: "10px", rotate: 30,  drift: "-30px", duration: "8.8s",  delay: "0.6s" },
  { left: "42%", bottom: "14%", width: "11px", height: "14px", rotate: -25, drift: "26px", duration: "11.0s", delay: "3.4s" },
  { left: "51%", bottom: "26%", width: "9px",  height: "11px", rotate: 15,  drift: "-36px", duration: "10.2s", delay: "1.9s" },
  { left: "60%", bottom: "6%",  width: "12px", height: "15px", rotate: -12, drift: "32px", duration: "12.4s", delay: "3.1s" },
  { left: "71%", bottom: "30%", width: "8px",  height: "10px", rotate: 26,  drift: "-22px", duration: "9.6s",  delay: "0.3s" },
  { left: "82%", bottom: "16%", width: "10px", height: "13px", rotate: -20, drift: "28px", duration: "11.8s", delay: "4.0s" },
  { left: "91%", bottom: "20%", width: "7px",  height: "9px",  rotate: 18,  drift: "-32px", duration: "8.5s",  delay: "1.1s" },
  { left: "11%", bottom: "46%", width: "9px",  height: "11px", rotate: -14, drift: "24px", duration: "10.6s", delay: "4.6s" },
  { left: "28%", bottom: "50%", width: "7px",  height: "9px",  rotate: 24,  drift: "-20px", duration: "9.0s",  delay: "2.4s" },
  { left: "47%", bottom: "40%", width: "12px", height: "15px", rotate: -22, drift: "36px", duration: "12.8s", delay: "1.6s" },
  { left: "68%", bottom: "48%", width: "8px",  height: "10px", rotate: 16,  drift: "-26px", duration: "9.8s",  delay: "3.7s" },
  { left: "86%", bottom: "44%", width: "10px", height: "13px", rotate: -18, drift: "30px", duration: "11.3s", delay: "2.1s" },
  { left: "96%", bottom: "36%", width: "7px",  height: "9px",  rotate: 20,  drift: "-24px", duration: "8.9s",  delay: "0.9s" },
];

// Diamond ornament component
function Diamond({ size = 20, color = "rgba(205,153,115,0.75)", bg = "#0d0a0c" }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: bg,
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 8px ${color.replace("0.75", "0.35")}`,
        transform: "rotate(45deg)",
        flexShrink: 0,
      }}
    />
  );
}

// All colors this section needs, keyed by theme. Dark keeps the site's original noir
// look byte-for-byte; light matches the cream/terracotta reference photo.
function getPalette(theme: Theme) {
  if (theme === "light") {
    return {
      sectionBg: "#fdfaf5",
      showBokeh: false,
      showFloralGlow: false,
      showCrownHalo: false,
      frameBg: "transparent",
      frameBorder: "rgba(184,135,115,0.45)",
      frameShadow: "0 20px 50px rgba(120,90,60,0.08)",
      innerBorder: "rgba(184,135,115,0.15)",
      diamondColor: "rgba(184,135,115,0.8)",
      diamondBg: "#fdfaf5",
      cornerDotColor: "rgba(184,135,115,0.55)",
      cornerLeafOpacities: [0.42, 0.32, 0.42, 0.32],
      eyebrowColor: "#b1795e",
      eyebrowLine: "rgba(184,135,115,0.5)",
      headingColor: "#2b2420",
      headingAccent1: "#c98a75",
      headingAccent2: "#8b1e2d",
      subtextColor: "#6b6259",
      tabInactiveBg: "#ffffff",
      tabInactiveText: "#8a7568",
      tabInactiveBorder: "rgba(184,135,115,0.32)",
      tabIconInactive: "#b1795e",
      tabArrowInactive: "rgba(184,135,115,0.65)",
      tabActiveBg: "linear-gradient(135deg, #f2c0b0 0%, #e39d89 100%)",
      tabActiveText: "#3a1f14",
      tabActiveShadow: "0 0 24px rgba(227,157,137,0.5)",
      tabActiveBorder: "rgba(255,255,255,0.6)",
      dividerLine: "rgba(184,135,115,0.4)",
      taglineColor: "#a9755d",
      panelTitleColor: "#2b2420",
      panelAccentColor: "#c07a63",
      descriptionColor: "#5f574f",
      checkBg: "rgba(184,135,115,0.12)",
      checkBorder: "rgba(184,135,115,0.4)",
      checkIconColor: "#a9755a",
      featureTextColor: "#463f38",
      videoBorder: "rgba(184,135,115,0.4)",
      videoShadow: "0 0 30px rgba(184,135,115,0.15), 0 20px 50px rgba(120,90,60,0.15)",
      videoCornerColor: "rgba(184,135,115,0.7)",
      videoBg: "#efe7d8",
    };
  }
  return {
    sectionBg: "linear-gradient(to bottom, #0b090c 0%, #0c090b 22%, #0e0a0b 46%)",
    showBokeh: true,
    showFloralGlow: true,
    showCrownHalo: true,
    frameBg: "linear-gradient(175deg, rgba(18,12,14,0.96) 0%, rgba(10,7,9,0.98) 100%)",
    frameBorder: "rgba(205,153,115,0.55)",
    frameShadow: "0 0 0 1px rgba(205,153,115,0.10), inset 0 0 100px rgba(180,110,40,0.06), 0 40px 80px rgba(0,0,0,0.5)",
    innerBorder: "rgba(205,153,115,0.22)",
    diamondColor: "rgba(205,153,115,0.75)",
    diamondBg: "#0d0a0c",
    cornerDotColor: "rgba(205,153,115,0.6)",
    cornerLeafOpacities: [0.18, 0.13, 0.18, 0.13],
    eyebrowColor: "#e5b8a6",
    eyebrowLine: "rgba(205,153,115,0.6)",
    headingColor: "#f8f4ef", // ivory
    headingAccent1: "#d4a08a",
    headingAccent2: "#d4a08a",
    subtextColor: "rgba(248,244,239,0.65)",
    tabInactiveBg: "rgba(17,13,15,0.85)",
    tabInactiveText: "#d4a88a",
    tabInactiveBorder: "rgba(255,255,255,0.1)",
    tabIconInactive: "#cd9973",
    tabArrowInactive: "rgba(205,153,115,0.6)",
    tabActiveBg: "linear-gradient(135deg, #f7d9cc 0%, #e8b5a2 50%, #c98a75 100%)",
    tabActiveText: "#2a1208",
    tabActiveShadow: "0 0 28px rgba(229,184,166,0.55)",
    tabActiveBorder: "#f5d9c8",
    dividerLine: "rgba(205,153,115,0.5)",
    taglineColor: "#8ea7be",
    panelTitleColor: "#f5eedc",
    panelAccentColor: "#d4a08a",
    descriptionColor: "#c8bfad",
    checkBg: "rgba(205,153,115,0.15)",
    checkBorder: "rgba(205,153,115,0.45)",
    checkIconColor: "#cd9973",
    featureTextColor: "#e2d8ca",
    videoBorder: "rgba(205,153,115,0.4)",
    videoShadow: "0 0 40px rgba(180,110,40,0.2), 0 20px 60px rgba(0,0,0,0.6)",
    videoCornerColor: "rgba(205,153,115,0.7)",
    videoBg: "#0c0a0d",
  };
}

export function ServicesSuite({ theme }: { theme: Theme }) {
  const [activeTab, setActiveTab] = useState("lighting");
  const currentService = SERVICES.find((s) => s.id === activeTab) || SERVICES[0];
  const p = getPalette(theme);

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{
        // Dark: opens on solid noir, identical to the Hero's base, so the join is
        // seamless. Light: a warm cream, matching the transition banner's own tone.
        background: p.sectionBg,
      }}
    >
      {/* The transition itself, flush against the Hero with no gap and no side padding
          so it IS the seam rather than a floating decoration inside one. Light mode
          uses the banner that fades from black at its top to cream at its bottom; dark
          mode uses the all-black gold-flourish version, since Hero and Services are
          already the same dark tone there and just need the ornamental marker. */}
      <img
        src={theme === "light" ? "/cherryblossom.png" : "/blackgoldenflowers.png"}
        alt=""
        className="block w-full h-auto"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* ══════════════════════════════════════════════
          LAYER 1 — Warm bokeh background ambiance (dark theme only — the light
          reference is a flat, clean cream with no glow blobs)
      ══════════════════════════════════════════════ */}
      {p.showBokeh && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[8%] left-[6%] w-56 h-56 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(200,140,60,0.35) 0%, transparent 70%)", filter: "blur(50px)" }} />
          <div className="absolute top-[5%] right-[8%] w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(180,120,50,0.30) 0%, transparent 70%)", filter: "blur(55px)" }} />
          <div className="absolute top-[40%] -left-16 w-72 h-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(160,90,30,0.28) 0%, transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute top-[35%] -right-16 w-72 h-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(170,100,40,0.28) 0%, transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute bottom-[10%] left-[20%] w-60 h-60 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(150,80,20,0.22) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-[5%] right-[18%] w-52 h-52 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(190,120,50,0.20) 0%, transparent 70%)", filter: "blur(55px)" }} />
        </div>
      )}

      {/* ══════════════════════════════════════════════
          LAYER 2 — Cherry blossom petals drifting upward
      ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {PETALS.map((petal, idx) => (
          <div
            key={idx}
            className="blossom-petal"
            style={{
              left: petal.left,
              bottom: petal.bottom,
              width: petal.width,
              height: petal.height,
              transform: `rotate(${petal.rotate}deg)`,
              animationDuration: petal.duration,
              animationDelay: petal.delay,
              ["--petal-drift" as string]: petal.drift,
            }}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════ */}
      {/* Pulled up by a viewport-width-relative amount so the frame overlaps the tail
          of the transition banner above — the banner scales with viewport width (it's
          h-auto), so this needs to scale with it too, rather than a fixed px/rem value.
          8vw lands well inside the banner's plain lower band, short of where either
          banner's flowers/vine detail sit (roughly its upper 60%). */}
      <div className="mx-auto max-w-6xl px-6 pt-14 sm:pt-20 pb-14 sm:pb-20 relative z-10" style={{ marginTop: "-8vw" }}>

        {/* ╔══════════════════════════════════════════╗
            ║  ONE UNIFIED ORNAMENTAL FRAME            ║
            ╚══════════════════════════════════════════╝ */}
        <div
          className="relative"
          style={{
            background: p.frameBg,
            border: `1.5px solid ${p.frameBorder}`,
            borderRadius: "18px",
            boxShadow: p.frameShadow,
          }}
        >
          {/* ── Inner second border ── */}
          <div className="absolute inset-[9px] rounded-[11px] pointer-events-none z-0"
            style={{ border: `0.75px solid ${p.innerBorder}` }}
          />

          {/* ── Outer edge diamonds ── */}
          {/* Top center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            {p.showCrownHalo && (
              <div
                className="light-halo absolute left-1/2 top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(255,232,170,0.55) 0%, transparent 70%)", filter: "blur(10px)" }}
              />
            )}
            <div className="relative">
              <Diamond color={p.diamondColor} bg={p.diamondBg} />
            </div>
          </div>
          {/* Bottom center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none">
            <Diamond color={p.diamondColor} bg={p.diamondBg} />
          </div>
          {/* Left center */}
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <Diamond color={p.diamondColor} bg={p.diamondBg} />
          </div>
          {/* Right center */}
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <Diamond color={p.diamondColor} bg={p.diamondBg} />
          </div>

          {/* ── Corner dots (on inner border) ── */}
          {["top-[9px] left-[9px]","top-[9px] right-[9px]","bottom-[9px] left-[9px]","bottom-[9px] right-[9px]"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-1.5 h-1.5 rounded-full z-20 pointer-events-none`}
              style={{ background: p.cornerDotColor }}
            />
          ))}

          {/* ── Corner botanical artwork — PNG assets, drop files in /public ── */}
          {/* Top-left */}
          <div className="absolute top-0 left-0 w-40 h-52 pointer-events-none z-0 overflow-hidden" style={{ borderRadius: "18px 0 0 0" }}>
            <img src="/corner-leaf.png" alt="" className="absolute -top-4 -left-4 w-44 h-56 object-contain" style={{ opacity: p.cornerLeafOpacities[0] }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          {/* Top-right (mirrored) */}
          <div className="absolute top-0 right-0 w-40 h-52 pointer-events-none z-0 overflow-hidden" style={{ borderRadius: "0 18px 0 0" }}>
            <img src="/corner-leaf.png" alt="" className="absolute -top-4 -right-4 w-40 h-52 -scale-x-100 object-contain" style={{ opacity: p.cornerLeafOpacities[1] }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          {/* Bottom-right */}
          <div className="absolute bottom-0 right-0 w-40 h-52 pointer-events-none z-0 overflow-hidden" style={{ borderRadius: "0 0 18px 0" }}>
            <img src="/corner-leaf.png" alt="" className="absolute -bottom-4 -right-4 w-44 h-56 rotate-180 object-contain" style={{ opacity: p.cornerLeafOpacities[2] }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          {/* Bottom-left (mirrored) */}
          <div className="absolute bottom-0 left-0 w-40 h-52 pointer-events-none z-0 overflow-hidden" style={{ borderRadius: "0 0 0 18px" }}>
            <img src="/corner-leaf.png" alt="" className="absolute -bottom-4 -left-4 w-40 h-52 -scale-x-100 rotate-180 object-contain" style={{ opacity: p.cornerLeafOpacities[3] }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>

          {/* ╔════════════════════╗
              ║  TOP PANEL         ║
              ╚════════════════════╝ */}
          <div className="relative z-10 px-10 sm:px-16 pt-14 pb-10">

            {/* OUR SERVICES with decorative lines */}
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="flex-1 max-w-[80px] h-px" style={{ background: `linear-gradient(to right, transparent, ${p.eyebrowLine})` }} />
              <p className="font-label text-[10px] sm:text-xs tracking-[0.4em] uppercase font-semibold whitespace-nowrap" style={{ color: p.eyebrowColor }}>
                OUR SERVICES
              </p>
              <div className="flex-1 max-w-[80px] h-px" style={{ background: `linear-gradient(to left, transparent, ${p.eyebrowLine})` }} />
            </div>

            {/* Heading */}
            <h2 className="font-display text-center text-4xl sm:text-5xl md:text-[3.6rem] font-normal tracking-tight leading-[1.1] mb-4" style={{ color: p.headingColor }}>
              What is included in{" "}
              <em className="italic font-normal" style={{ color: p.headingAccent1 }}>your</em>{" "}
              <em className="italic font-normal" style={{ color: p.headingAccent2 }}>celebration.</em>
            </h2>

            {/* Subtext */}
            <p className="font-body text-center text-sm sm:text-base leading-relaxed max-w-2xl mx-auto" style={{ color: p.subtextColor }}>
              One studio holds art direction, floral architecture, production, sound, and floor direction. We do it all.
            </p>

            {/* Tabs */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                const isActive = activeTab === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveTab(s.id)}
                    className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-full font-label text-[11px] sm:text-xs tracking-[0.18em] transition-all duration-300 uppercase font-bold cursor-pointer backdrop-blur-md hover:scale-[1.02] ${
                      isActive ? "scale-105" : ""
                    }`}
                    style={{
                      background: isActive ? p.tabActiveBg : p.tabInactiveBg,
                      color: isActive ? p.tabActiveText : p.tabInactiveText,
                      border: `1px solid ${isActive ? p.tabActiveBorder : p.tabInactiveBorder}`,
                      boxShadow: isActive ? p.tabActiveShadow : "none",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: isActive ? p.tabActiveText : p.tabIconInactive }} />
                    <span>{s.tabLabel}</span>
                    <span className="ml-1 text-[10px]" style={{ color: isActive ? p.tabActiveText : p.tabArrowInactive }}>→</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Divider with center diamond ── */}
          <div className="relative flex items-center mx-10 sm:mx-16">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${p.dividerLine} 20%, ${p.dividerLine} 80%, transparent)` }} />
            <div className="mx-3 shrink-0">
              <Diamond size={16} color={p.dividerLine} bg={p.diamondBg} />
            </div>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${p.dividerLine} 20%, ${p.dividerLine} 80%, transparent)` }} />
          </div>

          {/* ╔════════════════════╗
              ║  BOTTOM PANEL      ║
              ╚════════════════════╝ */}
          <div className="relative z-10 px-10 sm:px-16 pt-10 pb-14">
            <div className="grid lg:grid-cols-12 gap-10 items-center">

              {/* Left: Service details */}
              <div className="lg:col-span-7 space-y-5">
                <p className="font-label text-[11px] tracking-[0.28em] uppercase font-semibold" style={{ color: p.taglineColor }}>
                  {currentService.tagline}
                </p>

                <h3 className="font-display leading-[1.15]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: p.panelTitleColor, fontWeight: 400 }}>
                  {currentService.title}
                  <br />
                  <em className="italic font-normal" style={{ color: p.panelAccentColor }}>{currentService.titleItalic}</em>
                </h3>

                <p className="font-body text-sm sm:text-[15px] leading-relaxed" style={{ color: p.descriptionColor }}>
                  {currentService.description}
                </p>

                {/* Feature list with circular check icons */}
                <div className="space-y-3 pt-1">
                  {currentService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {/* Circular check icon */}
                      <div
                        className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{
                          background: p.checkBg,
                          border: `1px solid ${p.checkBorder}`,
                        }}
                      >
                        <Check className="w-3 h-3" style={{ color: p.checkIconColor }} strokeWidth={2.5} />
                      </div>
                      <span className="font-body text-sm sm:text-[15px] leading-snug" style={{ color: p.featureTextColor }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Video */}
              <div
                className="lg:col-span-5 relative overflow-hidden aspect-[4/3]"
                style={{
                  borderRadius: "14px",
                  border: `1.5px solid ${p.videoBorder}`,
                  boxShadow: p.videoShadow,
                  background: p.videoBg,
                }}
              >
                <video
                  key={currentService.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={currentService.videoSrc} type="video/mp4" />
                </video>
                {/* Corner accent on video */}
                <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
                  style={{ borderTop: `1.5px solid ${p.videoCornerColor}`, borderLeft: `1.5px solid ${p.videoCornerColor}`, borderRadius: "14px 0 0 0" }}
                />
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
                  style={{ borderTop: `1.5px solid ${p.videoCornerColor}`, borderRight: `1.5px solid ${p.videoCornerColor}`, borderRadius: "0 14px 0 0" }}
                />
                <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none"
                  style={{ borderBottom: `1.5px solid ${p.videoCornerColor}`, borderLeft: `1.5px solid ${p.videoCornerColor}`, borderRadius: "0 0 0 14px" }}
                />
                <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
                  style={{ borderBottom: `1.5px solid ${p.videoCornerColor}`, borderRight: `1.5px solid ${p.videoCornerColor}`, borderRadius: "0 0 14px 0" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent flex items-end p-4">
                  <span className="font-label text-[10px] tracking-[0.22em] text-ivory/70 uppercase font-semibold">
                    HANZEL EVENTS STAGING
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ╚══ End ornamental frame ══╝ */}
      </div>

      {/* The transition out — same technique as the cherry blossom banner up top, just
          gold-toned and flush against the section's bottom edge instead of its top.
          Dark mode only: Services is dark and Stories (next section) is light, so this
          is the seam between them; in light mode Services already ends light and Stories
          starts light, so no banner is needed there. */}
      {theme === "dark" && (
        <img
          src="/goldenflowers.png"
          alt=""
          className="block w-full h-auto"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
    </section>
  );
}
