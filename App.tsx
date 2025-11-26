
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Showcase from './components/Showcase';
import VideoSection from './components/VideoSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import StartProject from './components/StartProject';
import UserHome from './components/UserHome';
import WebStudio from './components/WebStudio';
import ChatAssistant from './components/ChatAssistant';
import FreeCourses from './components/FreeCourses';
import { auth } from './firebaseConfig';
import * as firebaseAuth from 'firebase/auth';
import { MessageCircle, Bot } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Component for the Public Landing Page with Language Support
const Home: React.FC<{ lang?: 'en' | 'am' | 'om' }> = ({ lang = 'en' }) => {
  return (
    <>
      <Hero lang={lang} />
      <Services lang={lang} />
      <VideoSection lang={lang} />
      <Showcase lang={lang} />
      <Contact lang={lang} />
    </>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [themeColor, setThemeColor] = useState('blue'); // 'blue', 'purple', 'green', 'orange'

  // Authorized admin email
  const ADMIN_EMAIL = "sadik@431gmail.com";

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-serif text-lg tracking-widest animate-pulse">ADDIS WEB STUDIO</p>
      </div>
    );
  }

  // Dynamic classes for the floating button based on theme
  const getFloatingButtonClass = () => {
    switch(themeColor) {
      case 'purple': return 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-600/30';
      case 'green': return 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-green-600/30';
      case 'orange': return 'from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-orange-600/30';
      default: return 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-blue-600/30';
    }
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans text-slate-100 bg-[#0f172a]">
        {/* Navbar is persistent across all routes */}
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang="en" />} />
            <Route path="/am" element={<Home lang="am" />} />
            <Route path="/om" element={<Home lang="om" />} />
            
            {/* The Beautiful Home Page for Logged In Users */}
            <Route 
              path="/dashboard" 
              element={
                user ? <UserHome user={user} /> : <Navigate to="/" replace />
              } 
            />

            <Route path="/start" element={<StartProject />} />
            <Route path="/web-studio" element={<WebStudio />} />
            
            {/* Free Courses Routes */}
            <Route path="/courses" element={<FreeCourses lang="en" />} />
            <Route path="/am/courses" element={<FreeCourses lang="am" />} />
            <Route path="/om/courses" element={<FreeCourses lang="om" />} />
            
            <Route 
              path="/admin" 
              element={
                user && user.email === ADMIN_EMAIL ? (
                  <AdminDashboard user={user} />
                ) : (
                  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#0f172a] space-y-4 px-4 text-center mt-20">
                    <div className="bg-red-500/10 p-6 rounded-full">
                       <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
                    </div>
                    <p className="text-gray-400 max-w-md">You do not have permission to view the dashboard. Please sign in with an authorized account.</p>
                    <a href="/" className="px-8 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition text-white font-semibold">Return Home</a>
                  </div>
                )
              } 
            />
            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer is persistent, now controls the theme settings */}
        <Footer currentTheme={themeColor} setTheme={setThemeColor} />
        
        {/* Floating Addis Chat Button */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-gradient-to-r text-white p-3 md:pl-5 md:pr-6 md:py-4 rounded-full shadow-2xl flex items-center gap-2 md:gap-3 transition-all transform hover:scale-105 group animate-fade-in-up ${getFloatingButtonClass()}`}
            aria-label="Open Addis Chat"
          >
            <div className="relative">
              <Bot size={24} className="md:w-7 md:h-7 text-white" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-green-500"></span>
              </span>
            </div>
            <span className="hidden md:block font-bold text-lg tracking-wide">Addis Chat</span>
          </button>
        )}
        
        {/* AI Chat Assistant */}
        <ChatAssistant 
           isOpen={isChatOpen} 
           onClose={() => setIsChatOpen(false)} 
           themeColor={themeColor}
        />
      </div>
    </HashRouter>
  );
};

export default App;
