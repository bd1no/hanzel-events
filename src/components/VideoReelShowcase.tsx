import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Film, Sparkles, Maximize2 } from "lucide-react";

const REELS = [
  {
    id: "hero-main",
    title: "The Sacred Vows & Royal Ceremony",
    src: "/hero.mp4",
    poster: "/wedding-couple.png",
    location: "Taj Falaknuma Palace, Hyderabad",
    tag: "Royal Wedding Curation",
  },
  {
    id: "hero-alt",
    title: "Sangeet Revelry & Couples Romance",
    src: "/hero-alt.mp4",
    poster: "/wedding-couple.png",
    location: "Kumarakom Lake Resort, Kerala",
    tag: "Atmosphere & Moments",
  },
  {
    id: "lighting-reel",
    title: "Cinematic Lighting & Floral Decor Dynamics",
    src: "/lighting.mp4",
    poster: "/mandap-decor.png",
    location: "City Palace Lawns, Udaipur",
    tag: "Lighting Architecture",
  },
  {
    id: "logo-anim",
    title: "Hanzel Group Signature Identity",
    src: "/logo-animation.mp4",
    poster: "/logo.png",
    location: "Hanzel Events Studio",
    tag: "Brand Identity",
  },
];

export function VideoReelShowcase() {
  const [selectedReelIndex, setSelectedReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeReel = REELS[selectedReelIndex];

  const handleSelectReel = (index: number) => {
    setSelectedReelIndex(index);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section id="reels" className="bg-charcoal py-24 px-6 text-ivory relative overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-header border border-rosegold/30 text-rosegold font-label text-[10px] tracking-[0.25em] uppercase mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>CINEMATIC REELS &amp; ARCHIVE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-ivory">
              Witness the motion of <em className="italic text-rosegold">unforgettable days.</em>
            </h2>
          </div>
          <p className="font-body text-sm text-ivory/70 max-w-md">
            Step inside our live wedding productions. Experience the acoustic atmosphere, glowing floral mandaps, and emotional grand entries captured in high definition.
          </p>
        </div>

        {/* Main Cinema Screen Player */}
        <div className="relative rounded-3xl overflow-hidden glass-header border border-rosegold/30 shadow-2xl aspect-video w-full max-h-[560px] group">
          <video
            ref={videoRef}
            key={activeReel.src}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster={activeReel.poster}
            className="w-full h-full object-cover"
          >
            <source src={activeReel.src} type="video/mp4" />
          </video>

          {/* Player Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-noir/40 pointer-events-none" />

          {/* Top Info Bar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
            <span className="bg-crimson text-ivory font-label text-[10px] tracking-[0.25em] px-3 py-1 rounded-full uppercase font-bold shadow">
              {activeReel.tag}
            </span>
            <span className="font-label text-xs tracking-wider text-ivory/80 glass-header px-3 py-1 rounded-full">
              {activeReel.location}
            </span>
          </div>

          {/* Center Play Overlay Button */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center z-10 focus:outline-none"
            aria-label={isPlaying ? "Pause Video" : "Play Video"}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full glass-header flex items-center justify-center text-ivory hover:text-rosegold border border-rosegold/40 transition-all duration-300 hover:scale-110 shadow-2xl">
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1 text-crimson" />}
            </div>
          </button>

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-ivory drop-shadow">
                {activeReel.title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSound}
                className="p-2.5 rounded-full glass-header text-ivory hover:text-rosegold transition-colors flex items-center gap-2 px-3"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-ivory/60" /> : <Volume2 className="w-4 h-4 text-rosegold" />}
                <span className="font-label text-[10px] tracking-widest uppercase hidden sm:inline">
                  {isMuted ? "Muted" : "Audio Active"}
                </span>
              </button>
              <button
                onClick={handleFullscreen}
                className="p-2.5 rounded-full glass-header text-ivory hover:text-rosegold transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Carousel Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {REELS.map((reel, idx) => {
            const isSelected = selectedReelIndex === idx;
            return (
              <div
                key={reel.id}
                onClick={() => handleSelectReel(idx)}
                className={`cursor-pointer rounded-xl overflow-hidden glass-header p-3 transition-all duration-300 border ${
                  isSelected
                    ? "border-rosegold ring-2 ring-rosegold/50 scale-[1.02] shadow-xl"
                    : "border-ivory/10 hover:border-rosegold/40 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-noir">
                  <video muted playsInline className="w-full h-full object-cover">
                    <source src={reel.src} type="video/mp4" />
                  </video>
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-crimson p-1 rounded-full">
                      <Sparkles className="w-3 h-3 text-ivory" />
                    </div>
                  )}
                </div>
                <p className="font-display text-sm font-semibold text-ivory line-clamp-1">
                  {reel.title}
                </p>
                <p className="font-label text-[9px] tracking-wider text-ivory/50 uppercase mt-0.5">
                  Reel {idx + 1}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
