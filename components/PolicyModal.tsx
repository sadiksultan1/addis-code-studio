
import React, { useState } from 'react';
import { X, Shield, FileText, Globe } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');
  const [lang, setLang] = useState<'en' | 'am' | 'om'>('en');

  if (!isOpen) return null;

  const content = {
    en: {
      privacy: {
        title: "Privacy Policy",
        text: `
          **1. Data Collection**
          We collect personal information such as name, email, and project details when you submit forms on Addis Web Studio. This data is used solely for communication and project execution.

          **2. Data Security**
          We implement industry-standard security measures (Firebase Authentication, Firestore Rules) to protect your data. We do not sell your personal information to third parties.

          **3. Cookies**
          We use cookies to enhance user experience and analyze website traffic. By using our website, you consent to our use of cookies.
        `
      },
      terms: {
        title: "Terms of Service",
        text: `
          **1. Services**
          Addis Web Studio provides web development, design, and video editing services. All project scopes and costs are agreed upon before work begins.

          **2. Payments**
          We accept TeleBirr, PayPal, and Bank Transfers. A deposit is required for most projects. Refunds are subject to the stage of project completion.

          **3. Intellectual Property**
          Upon full payment, the client owns the rights to the final delivered product. Addis Web Studio retains the right to display the work in our portfolio.
        `
      }
    },
    am: {
      privacy: {
        title: "የግላዊነት ፖሊሲ",
        text: `
          **1. መረጃ አሰባሰብ**
          በአዲስ ዌብ ስቱዲዮ ቅጾችን ሲሞሉ እንደ ስም፣ ኢሜይል እና የፕሮጀክት ዝርዝሮች ያሉ ግላዊ መረጃዎችን እንሰበስባለን። ይህ መረጃ ለግንኙነት እና ለፕሮጀክት ማስፈጸሚያ ብቻ ጥቅም ላይ ይውላል።

          **2. የመረጃ ደህንነት**
          መረጃዎን ለመጠበቅ የኢንዱስትሪ ደረጃ የሆኑ የደህንነት እርምጃዎችን (Firebase Authentication) እንጠቀማለን። የግል መረጃዎን ለሶስተኛ ወገኖች አንሸጥም።

          **3. ኩኪዎች**
          የተጠቃሚን ልምድ ለማሻሻል ኩኪዎችን እንጠቀማለን። ድር ጣቢያችንን በመጠቀም፣ ለኩኪዎች አጠቃቀማችን ፈቃድ ይሰጣሉ።
        `
      },
      terms: {
        title: "የአገልግሎት ውል",
        text: `
          **1. አገልግሎቶች**
          አዲስ ዌብ ስቱዲዮ የድር ልማት፣ ዲዛይን እና የቪዲዮ አርትዖት አገልግሎቶችን ይሰጣል። ሁሉም የፕሮጀክት መጠኖች እና ወጪዎች ስራ ከመጀመሩ በፊት ስምምነት ይደረግባቸዋል።

          **2. ክፍያዎች**
          ቴሌብር፣ ፔይፓል እና የባንክ ዝውውሮችን እንቀበላለን። ለአብዛኞቹ ፕሮጀክቶች ቅድመ ክፍያ ያስፈልጋል።

          **3. የአእምሮ ንብረት**
          ሙሉ ክፍያ ከተፈጸመ በኋላ፣ ደንበኛው የመጨረሻውን ምርት ባለቤትነት መብት ያገኛል። አዲስ ዌብ ስቱዲዮ ስራውን በፖርትፎሊዮ የመጠቀም መብቱ የተጠበቀ ነው።
        `
      }
    },
    om: {
      privacy: {
        title: "Imaammata Iccitii",
        text: `
          **1. Funaansa Odeeffannoo**
          Yeroo foormii guuttan maqaa, imeelii fi bal'ina pirojektii isin irraa funaanna. Odeeffannoon kun quunnamtii fi hojii pirojektiif qofa oola.

          **2. Nageenya Odeeffannoo**
          Odeeffannoo keessan eeguuf teeknooloojii ammayyaa (Firebase Security) fayyadamna. Odeeffannoo keessan qaama sadaffaaf hin gurgurru.

          **3. Kukiil**
          Muuxannoo fayyadamaa fooyyessuuf kukiil fayyadamna.

        `
      },
      terms: {
        title: "Waliigaltee Tajaajilaa",
        text: `
          **1. Tajaajiloota**
          Addis Web Studio tajaajila misooma weebsaayitii, dizaayinii fi gulaallii viidiyoo ni kenna. 

          **2. Kaffaltii**
          TeleBirr, PayPal fi Baankiin ni fudhanna. Pirojektoota hedduuf kaffaltiin duraa ni barbaachisa.

          **3. Mirga Abbummaa**
          Kaffaltiin guutuun erga raawwatamee booda, maamilli abbaa qabeenyaa oomisha xumuraa ta'a.
        `
      }
    }
  };

  const currentContent = activeTab === 'privacy' ? content[lang].privacy : content[lang].terms;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1e293b] w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
             <Shield className="text-blue-400" />
             <h2 className="text-xl font-serif font-bold text-white">Legal & Policies</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition">
            <X size={24} />
          </button>
        </div>

        {/* Tabs & Language */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/10 bg-black/20 p-2 gap-4 sm:gap-0">
          <div className="flex gap-2 w-full sm:w-auto px-4">
             <button 
               onClick={() => setActiveTab('privacy')}
               className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'privacy' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
             >
               <Shield size={16} /> Privacy
             </button>
             <button 
               onClick={() => setActiveTab('terms')}
               className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'terms' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
             >
               <FileText size={16} /> Terms
             </button>
          </div>

          <div className="flex items-center gap-2 px-4">
             <Globe size={16} className="text-gray-500" />
             <div className="flex bg-white/5 rounded-lg p-1">
                {(['en', 'am', 'om'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-md text-xs font-bold uppercase transition-all ${lang === l ? 'bg-gray-700 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {l}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          <h3 className="text-2xl font-bold text-white mb-6">{currentContent.title}</h3>
          <div className="text-gray-300 space-y-6 leading-relaxed whitespace-pre-line">
             {currentContent.text}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-black/20 text-center">
           <p className="text-xs text-gray-500">Last updated: October 2024 • Addis Web Studio</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
