
import React from 'react';
import { X, Palette, MessageCircle, Bell, Volume2, Monitor } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentTheme, onThemeChange }) => {
  if (!isOpen) return null;

  const themes = [
    { id: 'blue', name: 'Addis Blue', color: 'bg-blue-600' },
    { id: 'purple', name: 'Royal Purple', color: 'bg-purple-600' },
    { id: 'green', name: 'Emerald Green', color: 'bg-green-600' },
    { id: 'orange', name: 'Sunset Orange', color: 'bg-orange-600' },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1e293b] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Monitor className="text-gray-400" /> Website Settings
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Color Customization */}
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Palette size={16} /> Appearance & Chat Color
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onThemeChange(theme.id)}
                  className={`group relative flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${currentTheme === theme.id ? 'bg-white/10 ring-2 ring-blue-500' : 'hover:bg-white/5'}`}
                >
                  <div className={`w-10 h-10 rounded-full ${theme.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    {currentTheme === theme.id && (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium text-center">{theme.name}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              This changes the **Addis Chat** color, buttons, and highlights across the website.
            </p>
          </div>

          <div className="h-px bg-white/5"></div>

          {/* Chat Settings */}
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MessageCircle size={16} /> Chat Preferences
            </h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white/5 rounded-lg text-gray-400"><Volume2 size={16} /></div>
                     <span className="text-gray-300 text-sm">Message Sounds</span>
                  </div>
                  <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out">
                     <input type="checkbox" id="toggle-sound" className="peer absolute opacity-0 w-0 h-0" defaultChecked />
                     <label htmlFor="toggle-sound" className="block w-10 h-6 bg-gray-700 rounded-full cursor-pointer peer-checked:bg-blue-600 transition-colors duration-300"></label>
                     <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4"></div>
                  </div>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white/5 rounded-lg text-gray-400"><Bell size={16} /></div>
                     <span className="text-gray-300 text-sm">Notifications</span>
                  </div>
                  <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out">
                     <input type="checkbox" id="toggle-notif" className="peer absolute opacity-0 w-0 h-0" defaultChecked />
                     <label htmlFor="toggle-notif" className="block w-10 h-6 bg-gray-700 rounded-full cursor-pointer peer-checked:bg-blue-600 transition-colors duration-300"></label>
                     <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4"></div>
                  </div>
               </div>
            </div>
          </div>

        </div>

        <div className="p-6 bg-black/20 border-t border-white/10">
          <button 
             onClick={onClose}
             className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition-all"
          >
             Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
