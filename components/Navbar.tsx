
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Monitor, UserPlus, Rocket, Globe, GraduationCap } from 'lucide-react';
import { auth } from '../firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import * as firebaseAuth from 'firebase/auth';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any | null>(auth.currentUser);
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const navigate = useNavigate();
  const location = useLocation();

  // Determine language from path
  const currentLang = location.pathname.startsWith('/am') ? 'am' : location.pathname.startsWith('/om') ? 'om' : 'en';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await firebaseAuth.signOut(auth);
    navigate('/');
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const targetPath = currentLang === 'en' ? '/' : `/${currentLang}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath);
      // Wait for navigation to home before scrolling
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const translations = {
    en: { services: 'Services', showcase: 'Showcase', contact: 'Contact', start: 'Start Project', signin: 'Sign In', signup: 'Sign Up', courses: 'Free Courses' },
    am: { services: 'አገልግሎቶች', showcase: 'ፖርትፎሊዮ', contact: 'እውቂያ', start: 'ፕሮጀክት ይጀምሩ', signin: 'ይግቡ', signup: 'ይመዝገቡ', courses: 'ነጻ ኮርሶች' },
    om: { services: 'Tajaajila', showcase: 'Agarsiisa', contact: 'Quunnamaa', start: 'Pirojektii Jalqabaa', signin: 'Seenaa', signup: 'Galmaa\'aa', courses: 'Koorsii Bilisaa' }
  };

  const t = translations[currentLang];

  const switchLanguage = (lang: string) => {
    const isCourses = location.pathname.includes('courses');
    
    if (isCourses) {
        if (lang === 'en') navigate('/courses');
        else if (lang === 'am') navigate('/am/courses');
        else if (lang === 'om') navigate('/om/courses');
    } else {
        if (lang === 'en') navigate('/');
        else if (lang === 'am') navigate('/am');
        else if (lang === 'om') navigate('/om');
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => switchLanguage('en')}>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-white tracking-wide">
                  {currentLang === 'am' ? 'Addis Studio' : 'Addis Web'}
                </span>
                <span className="text-xs text-blue-400 uppercase tracking-widest">Studio</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <button onClick={() => navigate('/courses')} className="text-yellow-400 hover:text-yellow-300 px-3 py-2 text-sm font-bold transition-all flex items-center gap-2">
                  <GraduationCap size={18} /> {t.courses}
                </button>
                
                <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all">{t.services}</button>
                <button onClick={() => scrollToSection('showcase')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all">{t.showcase}</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all">{t.contact}</button>

                {/* Language Switcher */}
                <div className="flex items-center bg-white/5 rounded-full p-1 mx-2 border border-white/10">
                  <button onClick={() => switchLanguage('en')} className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${currentLang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>EN</button>
                  <button onClick={() => switchLanguage('am')} className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${currentLang === 'am' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>አማ</button>
                  <button onClick={() => switchLanguage('om')} className={`px-2 py-1 text-xs font-bold rounded-full transition-all ${currentLang === 'om' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>OM</button>
                </div>

                <button
                  onClick={() => navigate('/start')}
                  className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 transform hover:scale-105"
                >
                  <Rocket size={16} /> {t.start}
                </button>

                <div className="h-6 w-px bg-white/10 mx-2"></div>

                {user ? (
                  <div className="flex items-center space-x-4">
                    {user.email === "sadik@431gmail.com" && (
                       <button
                       onClick={() => navigate('/admin')}
                       className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                     >
                       <Monitor size={16} /> Dashboard
                     </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="border border-white/20 text-white hover:bg-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all"
                    >
                      Sign Out
                    </button>
                    <img 
                      src={user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || user.email) + '&background=0D8ABC&color=fff'} 
                      alt="User" 
                      className="w-9 h-9 rounded-full border-2 border-blue-500 shadow-md" 
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                     <button
                      onClick={() => openAuth('signin')}
                      className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <LogIn size={16} /> {t.signin}
                    </button>
                    <button
                      onClick={() => openAuth('signup')}
                      className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-600/50 px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                    >
                      <UserPlus size={16} /> {t.signup}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Controls (Menu) */}
            <div className="md:hidden flex items-center gap-3">
              <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                  <button onClick={() => switchLanguage('en')} className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded-full transition-all ${currentLang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>EN</button>
                  <button onClick={() => switchLanguage('am')} className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded-full transition-all ${currentLang === 'am' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>አማ</button>
                  <button onClick={() => switchLanguage('om')} className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded-full transition-all ${currentLang === 'om' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>OM</button>
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               <button onClick={() => { navigate('/courses'); setIsMenuOpen(false); }} className="text-yellow-400 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-bold w-full text-left flex items-center gap-2">
                 <GraduationCap size={18} /> {t.courses}
               </button>
               <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium w-full text-left">{t.services}</button>
               <button onClick={() => scrollToSection('showcase')} className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium w-full text-left">{t.showcase}</button>
               <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium w-full text-left">{t.contact}</button>
               
               <button
                  onClick={() => {
                    navigate('/start');
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-3 py-2 rounded-md w-full text-left flex items-center gap-2 mt-2"
                >
                  <Rocket size={16} /> {t.start}
               </button>

               {user ? (
                  <div className="space-y-2 mt-4 border-t border-gray-700 pt-4 px-2">
                    <div className="flex items-center gap-3 px-3 pb-2">
                      <img src={user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || user.email)} className="w-8 h-8 rounded-full" />
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">{user.displayName || 'User'}</span>
                        <span className="text-gray-400 text-xs">{user.email}</span>
                      </div>
                    </div>
                    {user.email === "sadik@431gmail.com" && (
                      <button onClick={() => navigate('/admin')} className="block text-purple-400 font-bold px-3 py-2 w-full text-left hover:bg-white/5 rounded-md">Admin Dashboard</button>
                    )}
                    <button onClick={handleLogout} className="block text-red-400 px-3 py-2 w-full text-left hover:bg-white/5 rounded-md">Sign Out</button>
                  </div>
                ) : (
                  <div className="mt-4 border-t border-gray-700 pt-4 space-y-2 px-2">
                    <button onClick={() => openAuth('signin')} className="w-full text-center text-white px-3 py-2 rounded-md hover:bg-white/5">{t.signin}</button>
                    <button onClick={() => openAuth('signup')} className="w-full bg-blue-600 text-white px-3 py-2 rounded-md font-medium">{t.signup}</button>
                  </div>
                )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </>
  );
};

export default Navbar;
