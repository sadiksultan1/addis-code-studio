
import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface VideoProps {
  lang?: 'en' | 'am' | 'om';
}

const VideoSection: React.FC<VideoProps> = ({ lang = 'en' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Attempt to play on mount (autoplay fallback)
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay prevented by browser policy
        setIsPlaying(false);
      });
    }
  }, []);

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

  const content = {
    en: {
      badge: "Future Tech",
      title: "Innovation In Motion",
      cardTitle: "Technology & Innovation",
      desc: "We leverage cutting-edge technology to build digital solutions that are faster, smarter, and more efficient. Experience the future of web development.",
      stats: { ai: "Integration", time: "Uptime", fast: "Performance", secure: "Systems" }
    },
    am: {
      badge: "የወደፊት ቴክኖሎጂ",
      title: "ኢኖቬሽን በተግባር",
      cardTitle: "ቴክኖሎጂ እና ፈጠራ",
      desc: "ፈጣን፣ ብልህ እና ቀልጣፋ የሆኑ ዲጂታል መፍትሄዎችን ለመገንባት ዘመናዊ ቴክኖሎጂን እንጠቀማለን። የወደፊቱን የድር ልማት ይለማመዱ።",
      stats: { ai: "ውህደት", time: "ስራ ላይ", fast: "አፈጻጸም", secure: "ስርዓቶች" }
    },
    om: {
      badge: "Teknooloojii Fuulduraa",
      title: "Kalaqa Sochii Keessa",
      cardTitle: "Teknooloojii fi Kalaqa",
      desc: "Furmaata diijiitaalaa saffisaa, abshaalaa fi bu'a qabeessa ta'an ijaaruuf teknooloojii ammayyaa ni fayyadamna.",
      stats: { ai: "Qindoomina", time: "Yeroo", fast: "Raawwii", secure: "Sirnoota" }
    }
  };

  const t = content[lang];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-900/10 z-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-2 block">{t.badge}</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">{t.title}</h2>
        </div>

        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          {/* Overlay Gradient */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-500 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
            <button 
              onClick={togglePlay}
              className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 transform group-hover:scale-110"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
          </div>

          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-circuit-board-97-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
             <div className="max-w-3xl">
                <h3 className="text-2xl text-white font-bold mb-2">{t.cardTitle}</h3>
                <p className="text-gray-300">
                  {t.desc}
                </p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
           <div className="text-center p-6 glass-panel rounded-xl">
              <div className="text-3xl font-bold text-white mb-1">AI</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{t.stats.ai}</div>
           </div>
           <div className="text-center p-6 glass-panel rounded-xl">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{t.stats.time}</div>
           </div>
           <div className="text-center p-6 glass-panel rounded-xl">
              <div className="text-3xl font-bold text-white mb-1">Fast</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{t.stats.fast}</div>
           </div>
           <div className="text-center p-6 glass-panel rounded-xl">
              <div className="text-3xl font-bold text-white mb-1">Secure</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">{t.stats.secure}</div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
