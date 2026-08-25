import { useState } from "react";
import { Heart, MapPin, Sparkles, X, ArrowRight, Quote } from "lucide-react";

export interface StoryItem {
  id: string;
  names: string;
  category: "palace" | "coastal" | "estate" | "destination";
  categoryLabel: string;
  venue: string;
  location: string;
  month: string;
  coverImage: string;
  guestCount: string;
  theme: string;
  quote: string;
  description: string;
  highlights: string[];
}

export const STORIES_DATA: StoryItem[] = [
  {
    id: "meera-arjun",
    names: "Meera & Arjun",
    category: "palace",
    categoryLabel: "Royal Palace",
    venue: "Taj Falaknuma Palace",
    location: "Hyderabad, Telangana",
    month: "March 2026",
    coverImage: "/wedding-couple.png",
    guestCount: "450 Guests",
    theme: "Heritage Crimson & Champagne Gold",
    quote: "Hanzel Events turned a heritage palace into an intimate dreamland. From the floral mandap to the candlelit banquet, our guests felt like royalty.",
    description: "A grand 3-day royal palace wedding held at the iconic Taj Falaknuma. Featuring an ornate crystal mandap with 5,000 imported blush roses, synchronized pyrotechnics, and bespoke room welcome hampers.",
    highlights: ["Custom 4-pillar crystal mandap", "Live classical sitar & acoustic ensemble", "Candlelit courtyard banquet for 450 guests"],
  },
  {
    id: "priya-daniel",
    names: "Priya & Daniel",
    category: "coastal",
    categoryLabel: "Coastal Resort",
    venue: "Kumarakom Lake Resort",
    location: "Kottayam, Kerala",
    month: "January 2026",
    coverImage: "/mandap-decor.png",
    guestCount: "250 Guests",
    theme: "Botanical Ivory & Emerald Lotus",
    quote: "Planning from London felt effortlessly smooth. Walking down the backwater floating aisle with fairy light reflections was surreal.",
    description: "An ethereal lakeside wedding set against the quiet Kerala backwaters. Built with floating lotus flower mandap platforms, warm lantern illuminated walkways, and traditional houseboat guest transfers.",
    highlights: ["Floating backwater mandap platform", "Houseboat guest welcome fleet", "Sunset acoustic sangeet by the lake"],
  },
  {
    id: "kavya-rohan",
    names: "Kavya & Rohan",
    category: "coastal",
    categoryLabel: "Coastal Resort",
    venue: "The Leela Kovalam",
    location: "Thiruvananthapuram, Kerala",
    month: "December 2025",
    coverImage: "/wedding-couple.png",
    guestCount: "300 Guests",
    theme: "Cliffside Sunset & Gold Glass",
    quote: "The team handled every guest with royal care. The sunset sea-view mandap took everyone's breath away.",
    description: "A cliffside luxury destination wedding overlooking the Arabian Sea. Incorporating warm wooden pergolas, white orchid chandeliers, and a midnight beach party with live DJ & saxophone.",
    highlights: ["Cliffside sunset view mandap", "Midnight saxophone beach party", "Custom cocktail lounge bar"],
  },
  {
    id: "alisha-ben",
    names: "Alisha & Ben",
    category: "estate",
    categoryLabel: "Intimate Estate",
    venue: "Fort Kochi Heritage Bungalow",
    location: "Kochi, Kerala",
    month: "November 2025",
    coverImage: "/mandap-decor.png",
    guestCount: "120 Guests",
    theme: "Vintage Colonial & Rose Gold",
    quote: "Warm, romantic, and deeply personal. Every napkin, place-card, and light fixture felt handwritten for us.",
    description: "An intimate colonial heritage wedding nestled in Fort Kochi. Featuring antique brass chandeliers, customized calligraphed menus, and a jazz quartet under ancient banyan trees.",
    highlights: ["Custom hand-calligraphed stationery suite", "Banyan tree fairy light canopy", "Curated 7-course fusion feast"],
  },
  {
    id: "sneha-gokul",
    names: "Sneha & Gokul",
    category: "palace",
    categoryLabel: "Royal Palace",
    venue: "City Palace Lawns",
    location: "Udaipur, Rajasthan",
    month: "February 2026",
    coverImage: "/wedding-couple.png",
    guestCount: "600 Guests",
    theme: "Royal Rajputana & Amber Gold",
    quote: "A royal spectacle beyond our wildest imagination. The fireworks over Lake Pichola were unforgettable.",
    description: "A monumental destination wedding at Udaipur’s City Palace. Complete with elephant welcome processions, royal folk dancers, 3D projection mapping on palace facades, and a 600-person sangeet extravaganza.",
    highlights: ["3D facade projection mapping", "Palace lakefront fireworks show", "Royal folk troupe performances"],
  },
  {
    id: "ananya-chris",
    names: "Ananya & Chris",
    category: "destination",
    categoryLabel: "Destination",
    venue: "Wayanad Coffee Estate Lawns",
    location: "Wayanad, Kerala",
    month: "April 2026",
    coverImage: "/mandap-decor.png",
    guestCount: "180 Guests",
    theme: "Mist & Wildflower Boho Luxe",
    quote: "It felt like stepping into an enchanted mist garden. Hanzel Events created magic in the mountains.",
    description: "A high-altitude misty mountain estate celebration. Nestled amidst coffee blooms with cascading botanical floral archways, cozy campfire acoustic circles, and artisanal coffee tasting bars.",
    highlights: ["Misty mountain botanical archways", "Artisanal coffee & wine bar", "Campfire acoustic sangeet night"],
  },
];

interface RealWeddingStoriesProps {
  onOpenEnquiry: () => void;
  selectedStoryId?: string | null;
  onClearSelectedStory?: () => void;
}

export function RealWeddingStories({
  onOpenEnquiry,
  selectedStoryId,
  onClearSelectedStory,
}: RealWeddingStoriesProps) {
  const [filter, setFilter] = useState<string>("all");
  const [activeModalStory, setActiveModalStory] = useState<StoryItem | null>(null);

  // Synchronize externally selected story (e.g. from Hero torn paper card)
  if (selectedStoryId && (!activeModalStory || activeModalStory.id !== selectedStoryId)) {
    const found = STORIES_DATA.find((s) => s.id === selectedStoryId);
    if (found) setActiveModalStory(found);
  }

  const filteredStories =
    filter === "all"
      ? STORIES_DATA
      : STORIES_DATA.filter((s) => s.category === filter);

  const closeModal = () => {
    setActiveModalStory(null);
    if (onClearSelectedStory) onClearSelectedStory();
  };

  return (
    <section id="stories" className="bg-ivory text-noir py-24 px-6 relative">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 text-crimson font-label text-[10px] tracking-[0.25em] uppercase font-semibold mb-3">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>REAL WEDDING STORIES · PLACE-CARDS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-noir">
              Names we have <em className="italic text-crimson">set the table for.</em>
            </h2>
          </div>
          <p className="font-body text-sm text-noir/75 max-w-md">
            Explore our curated portfolio of real weddings staged across palaces, backwaters, and luxury estates.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-noir/10 pb-4">
          {[
            { id: "all", label: "All Celebrations" },
            { id: "palace", label: "Royal Palaces" },
            { id: "coastal", label: "Coastal & Backwaters" },
            { id: "estate", label: "Intimate Estates" },
            { id: "destination", label: "Destination" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full font-label text-xs tracking-[0.2em] transition-all uppercase font-medium ${
                filter === tab.id
                  ? "bg-crimson text-ivory shadow-md"
                  : "bg-white/80 text-noir/70 hover:text-noir border border-noir/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <article
              key={story.id}
              onClick={() => setActiveModalStory(story)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-noir/10 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-noir">
                <img
                  src={story.coverImage}
                  alt={story.names}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/logo.png";
                  }}
                />
                <div className="absolute top-3 left-3 bg-noir/80 backdrop-blur-md text-ivory font-label text-[9px] tracking-widest px-3 py-1 rounded-full uppercase">
                  {story.categoryLabel}
                </div>
                <div className="absolute bottom-3 right-3 bg-crimson text-ivory font-label text-[9px] tracking-widest px-2.5 py-0.5 rounded-full uppercase">
                  {story.month}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-display text-2xl font-bold text-noir group-hover:text-crimson transition-colors">
                  {story.names}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-noir/60 font-body">
                  <MapPin className="w-3.5 h-3.5 text-crimson shrink-0" />
                  <span>{story.venue}, {story.location}</span>
                </div>
                <p className="font-body text-xs text-noir/75 line-clamp-2 leading-relaxed italic">
                  “{story.quote}”
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-noir/10 font-label text-[11px] tracking-wider text-crimson font-bold">
                  <span>EXPLORE STORY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Story Modal Viewer */}
        {activeModalStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/80 backdrop-blur-xl animate-fadeIn">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-ivory rounded-3xl p-6 sm:p-10 border border-crimson/30 shadow-2xl text-noir">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-noir/10 text-noir hover:bg-crimson hover:text-ivory transition-colors"
                aria-label="Close Story Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 text-crimson font-label text-[10px] tracking-[0.25em] uppercase font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>REAL WEDDING ARCHIVE</span>
                </div>

                <div>
                  <h3 className="font-display text-4xl sm:text-5xl font-bold text-noir">
                    {activeModalStory.names}
                  </h3>
                  <p className="font-label text-xs tracking-wider text-crimson uppercase mt-1">
                    {activeModalStory.venue} · {activeModalStory.location}
                  </p>
                </div>

                <div className="relative aspect-video rounded-2xl overflow-hidden border border-noir/10 shadow-lg">
                  <img
                    src={activeModalStory.coverImage}
                    alt={activeModalStory.names}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-noir/10 text-center">
                  <div>
                    <span className="font-label text-[9px] tracking-widest text-noir/50 uppercase block">GUEST COUNT</span>
                    <span className="font-display text-lg font-bold text-crimson">{activeModalStory.guestCount}</span>
                  </div>
                  <div>
                    <span className="font-label text-[9px] tracking-widest text-noir/50 uppercase block">THEME &amp; PALETTE</span>
                    <span className="font-body text-xs font-semibold text-noir">{activeModalStory.theme}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-label text-[9px] tracking-widest text-noir/50 uppercase block">DATE</span>
                    <span className="font-body text-xs font-semibold text-noir">{activeModalStory.month}</span>
                  </div>
                </div>

                {/* Description & Quote */}
                <div className="space-y-4">
                  <p className="font-body text-sm leading-relaxed text-noir/80">
                    {activeModalStory.description}
                  </p>
                  <blockquote className="p-4 rounded-xl bg-crimson/5 border-l-4 border-crimson font-display text-lg italic text-noir">
                    <Quote className="w-5 h-5 text-crimson mb-1" />
                    “{activeModalStory.quote}”
                  </blockquote>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="font-label text-xs tracking-[0.2em] uppercase font-bold text-noir mb-3">
                    STAGING HIGHLIGHTS
                  </h4>
                  <ul className="grid sm:grid-cols-3 gap-2">
                    {activeModalStory.highlights.map((h, i) => (
                      <li key={i} className="p-3 rounded-lg bg-white border border-noir/10 text-xs font-body text-noir/80 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-crimson shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-noir/10">
                  <span className="font-body text-xs text-noir/60">
                    Desire a similar royal aesthetic for your wedding?
                  </span>
                  <button
                    onClick={() => {
                      closeModal();
                      onOpenEnquiry();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-crimson text-ivory font-label text-xs tracking-[0.2em] uppercase font-bold hover:bg-crimson-hover transition-colors shadow-lg"
                  >
                    Enquire For Similar Curation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
