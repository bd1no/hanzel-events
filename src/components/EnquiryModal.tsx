import { useState, type FormEvent } from "react";
import { X, Send, Sparkles, Mail, Calendar, MapPin, User, Phone } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-ivory text-noir rounded-3xl p-6 sm:p-10 border border-crimson/30 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-noir/10 text-noir hover:bg-crimson hover:text-ivory transition-colors"
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson font-label text-[10px] tracking-[0.25em] uppercase font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE REPLY CARD · CONSULTATION</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-noir">
                Kindly reply, <em className="italic text-crimson">in your own words.</em>
              </h3>
              <p className="font-body text-xs text-noir/70">
                Share your names, target wedding date, and destination city to reserve your date with Hanzel Events.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-label text-[10px] tracking-[0.2em] uppercase font-bold text-noir/70 block mb-1">
                  Partner Names
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-crimson absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meera & Arjun"
                    value={formData.names}
                    onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-noir/20 bg-white font-body text-sm text-noir focus:border-crimson focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-label text-[10px] tracking-[0.2em] uppercase font-bold text-noir/70 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-crimson absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="studio@wedding.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-noir/20 bg-white font-body text-sm text-noir focus:border-crimson focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-label text-[10px] tracking-[0.2em] uppercase font-bold text-noir/70 block mb-1">
                  Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-crimson absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-noir/20 bg-white font-body text-sm text-noir focus:border-crimson focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-label text-[10px] tracking-[0.2em] uppercase font-bold text-noir/70 block mb-1">
                  Target Wedding Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-crimson absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. November 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-noir/20 bg-white font-body text-sm text-noir focus:border-crimson focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-label text-[10px] tracking-[0.2em] uppercase font-bold text-noir/70 block mb-1">
                  City / Venue Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-crimson absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Udaipur / Kochi / Goa"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-noir/20 bg-white font-body text-sm text-noir focus:border-crimson focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-label text-[10px] tracking-[0.2em] uppercase font-bold text-noir/70 block mb-1">
                  Estimated Guest Count
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-noir/20 bg-white font-body text-sm text-noir focus:border-crimson focus:outline-none"
                >
                  <option value="<150">Intimate (&lt;150 Guests)</option>
                  <option value="150-300">Grand (150 - 300 Guests)</option>
                  <option value="300-500">Regal (300 - 500 Guests)</option>
                  <option value="500+">Royal (500+ Guests)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-label text-[10px] tracking-[0.2em] uppercase font-bold text-noir/70 block mb-1">
                The Feeling &amp; Vision You Desire
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about the atmosphere, floral preferences, or special requests..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 rounded-xl border border-noir/20 bg-white font-body text-sm text-noir focus:border-crimson focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-crimson text-ivory font-label text-xs tracking-[0.25em] uppercase font-bold hover:bg-crimson-hover transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Seal &amp; Send Reply Card</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
