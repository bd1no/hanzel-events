import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Globe, Star, ArrowUp, Calculator } from "lucide-react";
import { LightShines } from "./LightShines";

interface ContactPageProps {
  onOpenEnquiry: () => void;
}

// Same champagne glass as the budget estimator panels
const GLASS_STYLE = {
  background: "linear-gradient(160deg, rgba(150,125,105,0.22) 0%, rgba(70,56,46,0.32) 100%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 0 30px rgba(255,240,220,0.05), 0 20px 60px rgba(8,5,2,0.5), 0 0 28px rgba(245,225,195,0.16)",
};

const columnTitle = "font-label text-[11px] tracking-[0.28em] text-[#f1dfc6] uppercase font-semibold mb-5";
const linkStyle = "font-body text-sm text-[#e9dcc0]/80 hover:text-white transition-colors";
const iconStyle = "w-4 h-4 text-[#e6c6a4] shrink-0";

// Thin champagne line with a glowing diamond in the middle
function DiamondDivider() {
  return (
    <div className="relative flex items-center justify-center h-16" aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,201,168,0.22) 0%, transparent 70%)", filter: "blur(20px)" }}
      />
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(241,223,198,0.15) 20%, rgba(241,223,198,0.6) 50%, rgba(241,223,198,0.15) 80%, transparent 100%)",
        }}
      />
      <div
        className="relative w-3.5 h-3.5 rotate-45 border border-[#f1dfc6]/80 bg-[#0b090c]"
        style={{ boxShadow: "0 0 12px rgba(241,223,198,0.5)" }}
      />
    </div>
  );
}

export function ContactPage({ onOpenEnquiry }: ContactPageProps) {
  return (
    <section id="contact" className="relative min-h-screen overflow-hidden bg-noir text-ivory pt-36 pb-10 px-6">
      {/* Gold crystal backdrop, darker towards the bottom */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: "url('/estimator-bg-gold.webp') center / cover no-repeat" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,9,12,0.55) 0%, rgba(11,9,12,0.3) 30%, rgba(11,9,12,0.25) 60%, rgba(11,9,12,0.7) 100%)",
        }}
      />
      <LightShines every={1100} />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Closing invitation */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f1dfc6]/30 bg-white/[0.04] backdrop-blur font-label text-[11px] tracking-[0.25em] uppercase text-[#f3e6c8]">
            <Star className="w-3.5 h-3.5 text-[#e6c6a4] fill-current" />
            <span>Begin Your Story</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-normal text-white mt-6 leading-[1.05]">
            Let’s create something{" "}
            <em className="italic text-[#ecc9a8]">unforgettable.</em>
          </h2>
          <p className="font-body text-sm sm:text-base text-[#e9dcc0]/80 mt-5">
            Tell us about your day. We reply within 48 hours with ideas, a timeline, and a proposal shaped around you.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-label text-xs tracking-[0.25em] text-[#2b1f14] font-bold uppercase flex items-center justify-center gap-2 transition-transform hover:scale-[1.03] border border-white/60 shadow-[0_0_30px_rgba(250,230,205,0.4)]"
              style={{ background: "linear-gradient(120deg, #ead2b6 0%, #fdf6ec 40%, #e6ccae 75%, #f6e6d2 100%)" }}
            >
              <Star className="w-3.5 h-3.5 text-[#a7774c] fill-current" />
              <span>Book a Consultation</span>
            </button>
            <Link
              to="/estimator"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-label text-xs tracking-[0.25em] text-[#f3e9dc] font-semibold uppercase flex items-center justify-center gap-2 border border-[#f1dfc6]/40 bg-black/25 backdrop-blur hover:border-[#f1dfc6]/80 hover:bg-black/40 transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#e6c6a4]" />
              <span>Calculate Your Budget</span>
            </Link>
          </div>
        </div>

        <div className="my-16">
          <DiamondDivider />
        </div>

        {/* Studio details on a champagne glass card */}
        <div
          className="rounded-[28px] border border-[#f1dfc6]/40 backdrop-blur-md p-8 sm:p-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-12"
          style={GLASS_STYLE}
        >
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-ivory flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(250,230,205,0.25)]">
                <img
                  src="/logo.png"
                  alt="Hanzel Events logo"
                  className="h-full w-full object-contain scale-[1.6]"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute("src", "/logo.svg");
                  }}
                />
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl tracking-[0.12em] sm:tracking-[0.14em] text-white whitespace-nowrap">HANZEL EVENTS</p>
                <p className="font-label text-[9px] tracking-[0.3em] text-[#e9dcc0]/60 uppercase">
                  Hanzel Group Luxury Weddings
                </p>
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed text-[#e9dcc0]/75 max-w-xs">
              Full-service luxury wedding planning, mandap styling, and production across India and international destinations.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#f1dfc6]/30 bg-black/20 font-label text-xs tracking-[0.15em] text-[#f3e9dc] hover:border-[#f1dfc6]/70 transition-colors"
            >
              <Globe className={iconStyle} />
              <span>Instagram</span>
            </a>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <p className={columnTitle}>Explore</p>
            <ul className="space-y-3">
              <li><a href="/#services" className={linkStyle}>Services</a></li>
              <li><a href="/#stories" className={linkStyle}>Testimonials</a></li>
              <li><Link to="/estimator" className={linkStyle}>Budget Estimator</Link></li>
              <li>
                <button onClick={onOpenEnquiry} className={linkStyle}>
                  Enquire
                </button>
              </li>
            </ul>
          </div>

          {/* Studios */}
          <div className="lg:col-span-3">
            <p className={columnTitle}>Studios</p>
            <div className="space-y-4 font-body text-sm text-[#e9dcc0]/75">
              <div className="flex items-start gap-3">
                <MapPin className={`${iconStyle} mt-0.5`} />
                <div>
                  <span className="text-white block">Kochi Flagship Studio</span>
                  <span>Fort Kochi Heritage Precinct, Kochi, Kerala 682001</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className={`${iconStyle} mt-0.5`} />
                <div>
                  <span className="text-white block">Hyderabad Atelier</span>
                  <span>Road No. 36, Jubilee Hills, Hyderabad 500033</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className={columnTitle}>Direct Enquiries</p>
            <div className="space-y-3">
              <a href="mailto:studio@hanzelevents.com" className={`${linkStyle} flex items-center gap-3`}>
                <Mail className={iconStyle} />
                <span>studio@hanzelevents.com</span>
              </a>
              <a href="tel:+919876543210" className={`${linkStyle} flex items-center gap-3`}>
                <Phone className={iconStyle} />
                <span>+91 98765 43210</span>
              </a>
              <a href="tel:+919123456789" className={`${linkStyle} flex items-center gap-3`}>
                <Phone className={iconStyle} />
                <span>+91 91234 56789</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-label text-[10px] tracking-[0.2em] text-[#e9dcc0]/45 uppercase">
          <p>© {new Date().getFullYear()} Hanzel Events · Hanzel Group. All rights reserved.</p>
          <a href="#contact" className="flex items-center gap-2 hover:text-white transition-colors">
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
