import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Volume2, VolumeX, Play, Pause, ArrowRight, Heart } from "lucide-react";

interface HeroProps {
  onOpenEnquiry: () => void;
  onOpenStory: (storyId: string) => void;
}

const VIDEO_PLAYLIST = [
  { id: "hero", title: "Ceremony & Grandeur", src: "/hero.mp4" },
  { id: "hero-alt", title: "Atmosphere & Moments", src: "/hero-alt.mp4" },
  { id: "lighting", title: "Lighting & Mandap Decor", src: "/lighting.mp4" },
];

export function Hero({ onOpenEnquiry, onOpenStory }: HeroProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(() => {
    try {
      const stored = sessionStorage.getItem("hanzel_hero_video_index");
      const nextIndex = stored !== null ? (parseInt(stored, 10) + 1) % VIDEO_PLAYLIST.length : 0;
      sessionStorage.setItem("hanzel_hero_video_index", nextIndex.toString());
      return nextIndex;
    } catch {
      return 0;
    }
  });

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = VIDEO_PLAYLIST[activeVideoIndex];

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    const nextIdx = (activeVideoIndex + 1) % VIDEO_PLAYLIST.length;
    setActiveVideoIndex(nextIdx);
    try {
      sessionStorage.setItem("hanzel_hero_video_index", nextIdx.toString());
    } catch { }
  };

  return (
    <section id="top" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-noir pt-24 pb-12">
      {/* Background Video Player */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key={activeVideo.src}
          autoPlay
          onEnded={handleVideoEnded}
          muted={isMuted}
          playsInline
          className="h-full w-full object-cover transition-opacity duration-1000"
        >
          <source src={activeVideo.src} type="video/mp4" />
        </video>
        {/* Overlay Dark Gradients for Text Legibility & Glass Aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-noir/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-noir/30 to-noir/80" />
      </div>

      {/* Floating Ambient Sparkles / Bokeh Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-60">
        <div className="sparkle-particle w-3 h-3 top-1/4 left-1/5 animate-pulse-glow" />
        <div className="sparkle-particle w-4 h-4 top-1/3 right-1/4 animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="sparkle-particle w-2 h-2 bottom-1/3 left-1/3 animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="sparkle-particle w-3 h-3 top-1/2 right-1/5 animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Side Decorative Crystal Column Frames (Inspired by Creative AI Photo 2) */}
      <div className="hidden lg:block absolute top-0 left-0 bottom-0 w-32 pointer-events-none z-10 opacity-35 mix-blend-screen">
        <svg viewBox="0 0 100 800" className="h-full w-full text-rosegold stroke-current fill-none stroke-[0.8]">
          <rect x="20" y="80" width="60" height="640" rx="4" />
          <line x1="30" y1="90" x2="30" y2="710" />
          <line x1="70" y1="90" x2="70" y2="710" />
          {/* Floral Art Line Overlay */}
          <path d="M50 150 C30 180, 70 220, 50 250 C30 280, 70 320, 50 350 C30 380, 70 420, 50 450" />
          <circle cx="50" cy="200" r="12" />
          <circle cx="50" cy="300" r="12" />
          <circle cx="50" cy="400" r="12" />
        </svg>
      </div>
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-32 pointer-events-none z-10 opacity-35 mix-blend-screen transform scale-x-[-1]">
        <svg viewBox="0 0 100 800" className="h-full w-full text-rosegold stroke-current fill-none stroke-[0.8]">
          <rect x="20" y="80" width="60" height="640" rx="4" />
          <line x1="30" y1="90" x2="30" y2="710" />
          <line x1="70" y1="90" x2="70" y2="710" />
          <path d="M50 150 C30 180, 70 220, 50 250 C30 280, 70 320, 50 350 C30 380, 70 420, 50 450" />
          <circle cx="50" cy="200" r="12" />
          <circle cx="50" cy="300" r="12" />
          <circle cx="50" cy="400" r="12" />
        </svg>
      </div>

      {/* Playback Controls (Top Right below Header) */}
      <div className="relative z-20 mx-auto max-w-6xl w-full px-6 flex items-center justify-end mt-4">
        {/* Video Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full glass-header text-ivory hover:text-rosegold transition-colors"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleSound}
            className="p-2 rounded-full glass-header text-ivory hover:text-rosegold transition-colors flex items-center gap-1.5 px-3"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-ivory/60" /> : <Volume2 className="w-4 h-4 text-rosegold" />}
            <span className="font-label text-[9px] tracking-wider uppercase text-ivory/70 hidden sm:inline">
              {isMuted ? "Sound Off" : "Sound On"}
            </span>
          </button>
        </div>
      </div>

      {/* Main Hero Center Content */}
      <div className="relative z-20 mx-auto max-w-4xl w-full px-6 text-center my-auto py-12">
        {activeVideoIndex === 2 ? (
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-[1.1] text-ivory drop-shadow-2xl">
            Your story <br />
            <span className="font-normal italic" style={{ color: '#F5D89A' }}>
              should unfold like a starry night.
            </span>
          </h1>
        ) : activeVideoIndex === 1 ? (
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-[1.1] text-ivory drop-shadow-2xl">
            Your right choice, <br />
            <span className="font-normal italic" style={{ color: '#F5D89A' }}>
              where budget meets luxury.
            </span>
          </h1>
        ) : (
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-[1.1] text-ivory drop-shadow-2xl">
            Every celebration <br />
            <span className="font-normal italic text-rosegold">
              should arrive like a love letter.
            </span>
          </h1>
        )}

        <p className="mt-6 max-w-xl mx-auto font-body text-sm sm:text-base leading-relaxed text-ivory/80">
          Hanzel Events is an elite wedding planning and production house. We compose your special day as a seamless symphony — from floral architecture and mandap styling to cinematic lighting and royal guest experience.
        </p>

        {/* Gemstone CTA Button (Matching Creative AI Concept Photo 2) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenEnquiry}
            className="gemstone-btn py-4 px-10 rounded-full font-label text-xs sm:text-sm tracking-[0.28em] text-noir font-bold uppercase transition-all duration-300 flex items-center gap-3 group"
          >
            <span>Begin Your Journey</span>
            <ArrowRight className="w-4 h-4 text-crimson group-hover:translate-x-1 transition-transform" />
          </button>

          <Link
            to="/estimator"
            className="glass-header px-8 py-3.5 rounded-full font-label text-xs tracking-[0.24em] text-ivory hover:text-rosegold border border-ivory/20 hover:border-rosegold/50 transition-all uppercase"
          >
            Calculate Wedding Budget
          </Link>
        </div>
      </div>

      {/* Floating Torn-Paper Card Overlay (Matching Creative AI Concept Photo 2 - Bottom Right Corner) */}
      <div className="relative z-30 mx-auto max-w-6xl w-full px-6 flex justify-end invisible">
        <div
          onClick={() => onOpenStory("meera-arjun")}
          className="torn-paper-card cursor-pointer group p-3 sm:p-4 max-w-[280px] sm:max-w-[320px] transition-all duration-500 hover:scale-105 hover:-rotate-1"
        >
          <div className="relative overflow-hidden rounded-sm border border-noir/10">
            <img
              src="/wedding-couple.png"
              alt="Real Wedding Couple - Meera & Arjun"
              className="h-32 sm:h-36 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.png";
              }}
            />
            <div className="absolute top-2 right-2 bg-crimson text-ivory font-label text-[8px] tracking-widest px-2 py-0.5 rounded-full uppercase font-bold flex items-center gap-1 shadow invisible">
              <Heart className="w-2.5 h-2.5 fill-current" />
              <span>Featured</span>
            </div>
          </div>
          <div className="mt-3 text-left">
            <p className="font-display text-lg font-semibold text-noir group-hover:text-crimson transition-colors">
              Meera &amp; Arjun’s Story
            </p>
            <p className="font-label text-[10px] tracking-[0.2em] text-noir/60 uppercase">
              Taj Falaknuma Palace · Wedding Planners
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-crimson font-label tracking-wider font-semibold group-hover:translate-x-1 transition-transform">
              <span>VIEW GALLERY &amp; REEL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
