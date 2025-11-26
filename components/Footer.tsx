
import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Facebook, Heart, Check, Loader2, Settings, Shield, GraduationCap } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import SettingsModal from './SettingsModal';
import PolicyModal from './PolicyModal';

interface FooterProps {
  currentTheme?: string;
  setTheme?: (theme: string) => void;
}

const Footer: React.FC<FooterProps> = ({ currentTheme = 'blue', setTheme = () => {} }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await addDoc(collection(db, "newsletter"), {
        email: email,
        subscribedAt: serverTimestamp(),
        source: 'footer_form'
      });
      setStatus('success');
      setEmail('');
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus('error');
    }
  };

  const handleNavigation = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <footer className="bg-[#050914] border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6 cursor-pointer" onClick={() => handleNavigation('hero')}>
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-serif font-bold text-white">Addis Web</span>
                  <span className="text-xs text-blue-400 uppercase tracking-widest">Studio</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Transforming ideas into digital reality in the heart of Ethiopia. We build brands that last.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-800 hover:text-white transition-all">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><button onClick={() => navigate('/courses')} className="hover:text-yellow-400 transition text-left flex items-center gap-2 font-bold"><GraduationCap size={14}/> Free Courses</button></li>
                <li><button onClick={() => handleNavigation('services')} className="hover:text-blue-400 transition text-left">Web Development</button></li>
                <li><button onClick={() => handleNavigation('services')} className="hover:text-blue-400 transition text-left">UI/UX Design</button></li>
                <li><button onClick={() => handleNavigation('services')} className="hover:text-blue-400 transition text-left">Video Editing</button></li>
                <li><button onClick={() => handleNavigation('services')} className="hover:text-blue-400 transition text-left">Photography</button></li>
              </ul>
            </div>

            {/* Combined Company & Legal */}
            <div>
              <h4 className="text-white font-bold mb-6">Company & Legal</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><button onClick={() => handleNavigation('hero')} className="hover:text-blue-400 transition text-left">About Us</button></li>
                <li><button onClick={() => handleNavigation('contact')} className="hover:text-blue-400 transition text-left">Contact</button></li>
                {/* NEW LINKS */}
                <li>
                  <button onClick={() => setIsSettingsOpen(true)} className="hover:text-blue-400 transition text-left flex items-center gap-2">
                    <Settings size={14} /> Website Settings
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsPolicyOpen(true)} className="hover:text-blue-400 transition text-left flex items-center gap-2">
                    <Shield size={14} /> Policies & Terms
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-gray-500 text-sm mb-4">Subscribe to get the latest design trends and updates.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`flex items-center justify-center text-white text-sm font-semibold py-2 rounded-lg transition-all ${status === 'success' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {status === 'loading' ? <Loader2 className="animate-spin w-4 h-4" /> : 
                   status === 'success' ? <><Check className="w-4 h-4 mr-2" /> Subscribed!</> : 
                   'Subscribe'}
                </button>
                {status === 'success' && <p className="text-xs text-green-500">Sent to admin database.</p>}
              </form>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Addis Web Studio. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-600">
              <span>Made with </span>
              <Heart size={14} className="mx-1 text-red-500 fill-red-500" />
              <span> by Sadik Sultan</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        currentTheme={currentTheme}
        onThemeChange={setTheme}
      />

      {/* Policy Modal */}
      <PolicyModal 
        isOpen={isPolicyOpen} 
        onClose={() => setIsPolicyOpen(false)} 
      />
    </>
  );
};

export default Footer;
