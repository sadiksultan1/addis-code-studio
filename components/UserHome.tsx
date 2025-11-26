import React from 'react';
import Services from './Services';
import VideoSection from './VideoSection';
import Showcase from './Showcase';
import { Sparkles, ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserHomeProps {
  user: any;
}

const UserHome: React.FC<UserHomeProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Personalized Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl animate-fade-in-up">
             <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles className="w-3 h-3 mr-2" /> Member Access
                  </div>
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                    Welcome Back, <span className="text-blue-400">{user.displayName || user.phoneNumber || 'Creator'}</span>
                  </h1>
                  <p className="text-gray-400 text-lg max-w-xl">
                    We are ready to bring your next vision to life. Explore our premium services, view our latest work, or start a new project instantly.
                  </p>
                  
                  <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                    <button 
                      onClick={() => navigate('/start')}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-1"
                    >
                      Start New Project
                    </button>
                    <button 
                      onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth'})}
                      className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold transition-all flex items-center gap-2"
                    >
                      Explore Services <ArrowDown size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                   <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl">
                      <img 
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=0f172a&color=fff&size=200`} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover border-4 border-[#0f172a]"
                      />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Full Content Display for Logged In User */}
      <div id="details">
        {/* Services Section */}
        <Services />
        
        {/* Cinematic Video Section */}
        <VideoSection />
        
        {/* Portfolio Showcase */}
        <Showcase />
      </div>
    </div>
  );
};

export default UserHome;