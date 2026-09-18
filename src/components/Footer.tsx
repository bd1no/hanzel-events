import { MapPin, Mail, Phone, Globe } from "lucide-react";

// Small diamond ornament — matches the one used on the Services frame
function Diamond({ size = 18, color = "rgba(205,153,115,0.8)" }: { size?: number; color?: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: "#0b090c",
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 10px ${color.replace(/[\d.]+\)$/, "0.4)")}`,
        transform: "rotate(45deg)",
        flexShrink: 0,
      }}
    />
  );
}

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-noir text-ivory pt-20 pb-12 px-6">
      {/* Corner vine artwork bleeding off the left/right edges — PNG assets, drop the
          file in /public and it will appear here automatically */}
      <div className="absolute -left-4 bottom-0 w-[280px] h-[440px] pointer-events-none opacity-80 z-0">
        <img src="/footer-corner-vine.png" alt="" className="w-full h-full object-contain animate-glimmer"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
      <div className="absolute -right-4 bottom-0 w-[280px] h-[440px] pointer-events-none opacity-80 z-0 -scale-x-100">
        <img src="/footer-corner-vine.png" alt="" className="w-full h-full object-contain animate-glimmer"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12 pb-16">
          {/* Brand & Crest Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Hanzel Group Logo"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute("src", "/logo.svg");
                }}
              />
              <div>
                <p className="font-display font-bold text-xl tracking-[0.18em] text-rosegold">
                  HANZEL EVENTS
                </p>
                <p className="font-label text-[9px] tracking-[0.3em] text-ivory/50 uppercase">
                  HANZEL GROUP LUXURY WEDDINGS
                </p>
              </div>
            </div>
            <p className="font-body text-xs leading-relaxed text-ivory/70 max-w-sm">
              Full-service luxury wedding planning, mandap styling, and production house operating across Kerala, Rajasthan, Telangana, Goa, and international destinations.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full glass-header text-ivory hover:text-rosegold transition-colors flex items-center gap-2 px-4 text-xs font-label"
                aria-label="Instagram"
              >
                <Globe className="w-4 h-4 text-rosegold" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Studios & Address */}
          <div className="md:col-span-4 space-y-3">
            <p className="font-label text-xs tracking-[0.25em] text-rosegold uppercase font-bold">
              STUDIO LOCATIONS
            </p>
            <div className="space-y-3 font-body text-xs text-ivory/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ivory block">Kochi Flagship Studio</span>
                  <span>Fort Kochi Heritage Precinct, Kochi, Kerala 682001</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-crimson shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ivory block">Hyderabad Atelier</span>
                  <span>Road No. 36, Jubilee Hills, Hyderabad 500033</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Inquiries */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-label text-xs tracking-[0.25em] text-rosegold uppercase font-bold">
              DIRECT INQUIRIES
            </p>
            <div className="space-y-2.5 font-body text-xs text-ivory/80">
              <a
                href="mailto:studio@hanzelevents.com"
                className="flex items-center gap-2 hover:text-rosegold transition-colors"
              >
                <Mail className="w-4 h-4 text-crimson" />
                <span>studio@hanzelevents.com</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 hover:text-rosegold transition-colors"
              >
                <Phone className="w-4 h-4 text-crimson" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="tel:+919123456789"
                className="flex items-center gap-2 hover:text-rosegold transition-colors"
              >
                <Phone className="w-4 h-4 text-crimson" />
                <span>+91 91234 56789</span>
              </a>
            </div>
          </div>
        </div>

        {/* Glowing divider — center diamond with a pendant bloom, in place of a plain
            border line */}
        <div className="relative flex items-center justify-center h-16">
          {/* Warm halo behind the diamond */}
          <div
            className="light-halo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,150,82,0.30) 0%, transparent 70%)", filter: "blur(24px)" }}
          />
          {/* Line, brightening toward the center */}
          <div
            className="absolute left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, rgba(205,153,115,0.18) 20%, rgba(224,168,92,0.6) 50%, rgba(205,153,115,0.18) 80%, transparent 100%)",
            }}
          />
          {/* Pendant flourish under the diamond — PNG asset */}
          <img
            src="/footer-divider-bloom.png"
            alt=""
            className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-3 w-[420px] sm:w-[560px] h-auto opacity-90 pointer-events-none"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          {/* Center diamond */}
          <div className="relative z-10">
            <Diamond size={20} />
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-label text-[10px] tracking-[0.2em] text-ivory/40 uppercase">
          <p>© {new Date().getFullYear()} HANZEL EVENTS · HANZEL GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <a href="#top" className="hover:text-rosegold transition-colors">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
