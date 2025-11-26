
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  lang?: 'en' | 'am' | 'om';
}

const Hero: React.FC<HeroProps> = ({ lang = 'en' }) => {
  const navigate = useNavigate();

  const content = {
    en: {
      badge: "Addis Web Studio",
      title: "We Craft Digital",
      highlight: "Masterpieces",
      desc: "Elevate your brand with professional website creation, stunning photo design, and cinematic video editing. We bring your vision to life in Addis Ababa.",
      startBtn: "Start Your Project",
      viewBtn: "View Portfolio"
    },
    am: {
      badge: "አዲስ ዌብ ስቱዲዮ",
      title: "ዲጂታል ድንቅ ስራዎችን",
      highlight: "እንሰራለን",
      desc: "ብራንድዎን በፕሮፌሽናል ድር ጣቢያ፣ አስደናቂ የፎቶ ዲዛይን እና ሲኒማዊ ቪዲዮ ኤዲቲንግ ያሳድጉ። ራዕይዎን  ወደ እውነት እንለውጣለን።",
      startBtn: "ፕሮጀክት ይጀምሩ",
      viewBtn: "ፖርትፎሊዮ ይመልከቱ"
    },
    om: {
      badge: "Addis Web Studio",
      title: "Hojiiwwan Diijiitaalaa",
      highlight: "Dinqisiisoo Ni Uumna",
      desc: "Dizaayinii weebsaayitii qulqullina qabu, suuraa hawwataa fi gulaallii viidiyoo sadarkaa isaa eeggateen maqaa gaarii keessan ol kaasaa. Mul'ata keessan adunyatti  keessatti dhugoomsiina.",
      startBtn: "Pirojektii Jalqabaa",
      viewBtn: "Poortifooliyoo Ilaalaa"
    }
  };

  const t = content[lang];

  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Gradient Blobs */}
      <div className="absolute inset-0 bg-brand-dark z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl mix-blend-screen"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm animate-fade-in-down">
          <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">{t.badge}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          {t.title} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400">
            {t.highlight}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
          {t.desc}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/start')}
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transform hover:-translate-y-1"
          >
            {t.startBtn}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/web-studio')}
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold transition-all flex items-center gap-2 backdrop-blur-sm hover:bg-white/15"
          >
            <Play className="w-5 h-5 fill-current text-white/70" />
            {t.viewBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
