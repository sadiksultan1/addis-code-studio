
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface ContactProps {
  lang?: 'en' | 'am' | 'om';
}

const Contact: React.FC<ContactProps> = ({ lang = 'en' }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const content = {
    en: {
      header: "Let's Create Something Amazing",
      desc: "Ready to take your digital presence to the next level? Contact Addis Web Studio today for a free consultation.",
      labels: { name: "Your Name", email: "Email Address", message: "Message", send: "Send Message", sending: "Sending...", success: "Message sent successfully!", error: "Something went wrong." },
      info: { email: "Email Us", visit: "Visit Us", call: "Call Us" }
    },
    am: {
      header: "አስደናቂ ነገር እንፍጠር",
      desc: "ዲጂታል መገኘትዎን ወደ ቀጣዩ ደረጃ ለማድረስ ዝግጁ ነዎት? ለነጻ ምክክር ዛሬውኑ አዲስ ዌብ ስቱዲዮን ያግኙ።",
      labels: { name: "ስም", email: "ኢሜይል አድራሻ", message: "መልእክት", send: "መልእክት ይላኩ", sending: "በመላክ ላይ...", success: "መልእክቱ በተሳካ ሁኔታ ተልኳል!", error: "ስህተት ተፈጥሯል።" },
      info: { email: "ኢሜይል", visit: "አድራሻ", call: "ስልክ" }
    },
    om: {
      header: "Waan Dinqisiisaa Haauumnu",
      desc: "Jireenya diijiitaalaa keessan sadarkaa itti aanutti ceesisuuf qophiidhaa? Har'a Addis Web Studio quunnamaa.",
      labels: { name: "Maqaa", email: "Teessoo Imeelii", message: "Ergaa", send: "Ergaa Ergaa", sending: "Ergaa jira...", success: "Ergaan milkaa'inaan ergameera!", error: "Dogoggorri uumameera." },
      info: { email: "Imeelii", visit: "Teessoo", call: "Bilbila" }
    }
  };

  const t = content[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: new Date()
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t.header}</h2>
            <p className="text-gray-400 mb-10 text-lg">
              {t.desc}
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{t.info.email}</h4>
                  <p className="text-gray-400">sadiksultan43@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{t.info.visit}</h4>
                  <p className="text-gray-400">Addis Ababa, Ethiopia</p>
                </div>
              </div>

               <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{t.info.call}</h4>
                  <p className="text-gray-400">+20112955130</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">{t.labels.send}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{t.labels.name}</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{t.labels.email}</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="email@.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">{t.labels.message}</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'submitting' ? t.labels.sending : (
                  <>{t.labels.send} <Send className="w-5 h-5" /></>
                )}
              </button>
              
              {status === 'success' && <p className="text-green-400 text-center">{t.labels.success}</p>}
              {status === 'error' && <p className="text-red-400 text-center">{t.labels.error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
