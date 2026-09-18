import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Theme } from "../App";

const TESTIMONIALS = [
  {
    quote: "Hanzel Events treated our wedding like a fine piece of art. Calm on the floor, completely synchronized behind the scenes. We walked into our reception with zero stress.",
    names: "Asha & Rohan K.",
    place: "Kochi, Kerala",
    venue: "Grand Hyatt Bolgatty",
    rating: 5,
  },
  {
    quote: "We planned our destination wedding from London and didn’t have to worry about a single vendor. The mandap lighting and floral arrangements exceeded our wild expectations.",
    names: "Meera & Arjun V.",
    place: "Hyderabad, Telangana",
    venue: "Taj Falaknuma Palace",
    rating: 5,
  },
  {
    quote: "The acoustic pacing and fairy light canopy made the sangeet feel like a fairy tale. Our guests still talk about the grand entrance and hospitality to this day.",
    names: "Priya & Daniel M.",
    place: "Kumarakom, Kerala",
    venue: "Kumarakom Lake Resort",
    rating: 5,
  },
];

export function TestimonialCarousel({ theme }: { theme: Theme }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[index];

  const prev = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="stories"
      className="text-noir py-24 px-6 relative overflow-hidden"
      style={{ background: theme === "dark" ? "#FBF7F3" : "#fcf9f5" }}
    >
      {/* Background logoH watermark */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] max-w-[90vw] aspect-square pointer-events-none select-none z-0 flex items-center justify-center">
        <img
          src="/logoH.png"
          alt=""
          className="w-full h-full object-contain opacity-[0.08]"
        />
      </div>

      <div className="mx-auto max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-crimson/10 text-crimson mb-6">
          <Quote className="w-6 h-6" />
        </div>

        <div className="flex items-center justify-center gap-1 mb-6 text-champagne">
          {[...Array(current.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current text-crimson" />
          ))}
        </div>

        <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl font-light italic leading-snug text-noir min-h-[160px] flex items-center justify-center">
          “{current.quote}”
        </blockquote>

        <div className="mt-8 space-y-1">
          <p className="font-label text-xs tracking-[0.25em] text-crimson font-bold uppercase">
            {current.names}
          </p>
          <p className="font-body text-xs text-noir/60">
            {current.venue} · {current.place}
          </p>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="p-3 rounded-full border border-noir/20 text-noir hover:bg-crimson hover:text-ivory hover:border-crimson transition-all"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-crimson" : "w-2 bg-noir/20"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-3 rounded-full border border-noir/20 text-noir hover:bg-crimson hover:text-ivory hover:border-crimson transition-all"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
