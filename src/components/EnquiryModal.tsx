import { useState, type FormEvent } from "react";
import { X, Send, ArrowRight, Mail, Calendar, MapPin, User, Phone, Users, Sparkles, ChevronDown } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    guests?: string;
    theme?: string;
    focus?: string;
    location?: string;
  } | null;
}

// Small line-diamond-line ornament, matching the card's paper color
function CardDivider() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="w-20 sm:w-28 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(184,135,115,0.55))" }} />
      <div
        style={{
          width: 12,
          height: 12,
          background: "#fbf7f0",
          border: "1.4px solid rgba(184,135,115,0.7)",
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <div className="w-20 sm:w-28 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(184,135,115,0.55))" }} />
    </div>
  );
}

// Circular blush icon badge used inside each field
function FieldIcon({ icon: Icon, top = "half" }: { icon: typeof User; top?: "half" | "start" }) {
  return (
    <div
      className={`absolute left-1.5 ${top === "half" ? "top-1/2 -translate-y-1/2" : "top-1.5"} w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center pointer-events-none`}
    >
      <Icon className="w-3.5 h-3.5 text-crimson/75" strokeWidth={2} />
    </div>
  );
}

const inputClasses =
  "w-full pl-12 pr-4 py-3 rounded-full border border-noir/10 bg-white font-body text-sm text-noir placeholder:text-noir/35 focus:border-crimson/45 focus:outline-none focus:ring-2 focus:ring-crimson/10 transition-colors";

const labelClasses = "font-label text-[10px] tracking-[0.2em] uppercase font-bold text-noir/55 block mb-1.5";

export function EnquiryModal({ isOpen, onClose, initialData }: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    names: "",
    email: "",
    phone: "",
    date: "",
    city: initialData?.location || "",
    guests: initialData?.guests || "150-300",
    service: initialData?.focus || "Full Wedding Art Direction",
    message: initialData?.theme ? `Selected theme preference: ${initialData.theme}` : "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-iridescent-silk backdrop-blur-sm animate-fadeIn overflow-y-auto">
      {/* Corner sprigs, outside the card, on the light backdrop — PNG assets */}
      <img src="/enquiry-corner-sprig.png" alt="" className="hidden lg:block pointer-events-none fixed -top-4 -left-4 w-64 h-80 opacity-80 object-contain"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      <img src="/enquiry-corner-sprig.png" alt="" className="hidden lg:block pointer-events-none fixed -bottom-4 -right-4 w-64 h-80 opacity-80 rotate-180 object-contain"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto my-8 rounded-[28px] p-7 sm:p-12"
        style={{ background: "#fbf7f0", border: "1px solid rgba(184,135,115,0.28)", boxShadow: "0 30px 70px rgba(80,50,40,0.18), 0 4px 15px rgba(0,0,0,0.05)" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-noir/40 hover:text-crimson hover:bg-crimson/10 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-6 animate-fadeIn">
            {/* Spinning Wax Seal */}
            <div className="w-28 h-28 rounded-full wax-seal grid place-items-center mx-auto shadow-2xl relative">
              <span className="font-label text-xs tracking-[0.3em] text-ivory font-bold uppercase">
                H&amp;E
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-4xl font-bold text-crimson">The Reply is Sealed.</h3>
              <p className="font-body text-base text-noir/80 max-w-md mx-auto">
                Thank you, <span className="font-bold text-noir">{formData.names || "loved ones"}</span>. Our chief director will reach out to <span className="font-bold text-crimson">{formData.email}</span> within 24 hours to schedule your first sitting.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 rounded-full bg-noir text-ivory font-label text-xs tracking-[0.2em] uppercase font-bold hover:bg-crimson transition-colors"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            <CardDivider />

            <div className="space-y-2.5 text-center">
              <p className="font-label text-[11px] tracking-[0.3em] uppercase font-bold text-crimson">
                The Reply Card · Consultation
              </p>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-noir">
                Kindly reply, <br className="sm:hidden" />
                <em className="italic text-crimson">in your own words.</em>
              </h3>
              <p className="font-body text-xs sm:text-sm text-noir/60 max-w-md mx-auto leading-relaxed">
                Share your names, target wedding date, and destination city to reserve your date with Hanzel Events.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Partner Names</label>
                <div className="relative">
                  <FieldIcon icon={User} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meera & Arjun"
                    value={formData.names}
                    onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Email Address</label>
                <div className="relative">
                  <FieldIcon icon={Mail} />
                  <input
                    type="email"
                    required
                    placeholder="studio@wedding.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Phone / WhatsApp</label>
                <div className="relative">
                  <FieldIcon icon={Phone} />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Target Wedding Date</label>
                <div className="relative">
                  <FieldIcon icon={Calendar} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. November 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>City / Venue Location</label>
                <div className="relative">
                  <FieldIcon icon={MapPin} />
                  <input
                    type="text"
                    placeholder="e.g. Udaipur / Kochi / Goa"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Estimated Guest Count</label>
                <div className="relative">
                  <FieldIcon icon={Users} />
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className={`${inputClasses} appearance-none pr-10 cursor-pointer`}
                  >
                    <option value="<150">Intimate (&lt;150 Guests)</option>
                    <option value="150-300">Grand (150 - 300 Guests)</option>
                    <option value="300-500">Regal (300 - 500 Guests)</option>
                    <option value="500+">Royal (500+ Guests)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-noir/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>The Feeling &amp; Vision You Desire</label>
              <div className="relative">
                <FieldIcon icon={Sparkles} top="start" />
                <textarea
                  rows={3}
                  placeholder="Tell us about the atmosphere, floral preferences, or special requests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-[22px] border border-noir/10 bg-white font-body text-sm text-noir placeholder:text-noir/35 focus:border-crimson/45 focus:outline-none focus:ring-2 focus:ring-crimson/10 transition-colors resize-y"
                />
              </div>
            </div>

            <button
              type="submit"
              className="relative w-full py-4 rounded-full text-ivory font-label text-xs sm:text-sm tracking-[0.25em] uppercase font-bold shadow-xl flex items-center transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #a82d3f 0%, #8b1e2d 55%, #6b1421 100%)" }}
            >
              <Send className="w-4 h-4 ml-6" />
              <span className="absolute left-1/2 -translate-x-1/2">Seal &amp; Send Reply Card</span>
              <ArrowRight className="w-4 h-4 ml-auto mr-6" />
            </button>

            <CardDivider />
          </form>
        )}
      </div>
    </div>
  );
}
