
import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { Star, CreditCard, Smartphone, Banknote, Landmark, X, CheckCircle, Wifi } from 'lucide-react';

interface ShowcaseProps {
  lang?: 'en' | 'am' | 'om';
}

const Showcase: React.FC<ShowcaseProps> = ({ lang = 'en' }) => {
  const [filter, setFilter] = useState<'all' | 'website' | 'dashboard' | 'photo' | 'video'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem & { priceRange: string } | null>(null);
  const [ratings, setRatings] = useState<{[key: string]: number}>({});

  const handleRate = (e: React.MouseEvent, id: string, rating: number) => {
    e.stopPropagation();
    setRatings(prev => ({ ...prev, [id]: rating }));
  };

  const content = {
    en: {
      title: "Premium Portfolio",
      desc: "Explore our curated selection of digital excellence.",
      filters: { all: "All", website: "Websites", dashboard: "Dashboards", photo: "Photography", video: "Video Editing" },
      view: "View Details",
      rate: "Rate us",
      modal: {
        interest: "You are interested in our",
        confirm: "Please confirm to proceed with payment details or inquiry.",
        accepted: "Accepted Payment Methods:",
        cancel: "Cancel",
        btn: "Confirm Interest"
      }
    },
    am: {
      title: "ፕሪሚየም ፖርትፎሊዮ",
      desc: "የእኛን ምርጥ የዲጂታል ስራዎች ያስሱ።",
      filters: { all: "ሁሉም", website: "ድር ጣቢያዎች", dashboard: "ዳሽቦርዶች", photo: "ፎቶግራፍ", video: "ቪዲዮ" },
      view: "ዝርዝር ይመልከቱ",
      rate: "ደረጃ ይስጡ",
      modal: {
        interest: "በዚህ አገልግሎት ላይ ፍላጎት አሳይተዋል",
        confirm: "እባክዎ ለክፍያ ዝርዝሮች ወይም ለጥያቄ ለመቀጠል ያረጋግጡ።",
        accepted: "ተቀባይነት ያላቸው የመክፈያ ዘዴዎች:",
        cancel: "ሰርዝ",
        btn: "ፍላጎትን ያረጋግጡ"
      }
    },
    om: {
      title: "Poortifooliyoo Olaanaa",
      desc: "Filannoo keenya filatamaa kan ta'an hojiiwwan diijiitaalaa daawwadhaa.",
      filters: { all: "Hunda", website: "Weebsaayitii", dashboard: "Daashboordii", photo: "Suuraa", video: "Viidiyoo" },
      view: "Bal'ina Ilaalaa",
      rate: "Sadarkaa",
      modal: {
        interest: "Tajaajila kana irratti fedhii qabdu",
        confirm: "Maaloo kaffaltii ykn gaaffii itti fufiinsaa mirkaneessaa.",
        accepted: "Mala Kaffaltii Fudhatama Qaban:",
        cancel: "Haquu",
        btn: "Mirkaneessaa"
      }
    }
  };

  const t = content[lang];

  // Payment Icons Component
  const PaymentIcons = () => (
    <div className="flex gap-2 text-gray-400 mt-3 pt-3 border-t border-gray-700/50 justify-center md:justify-start flex-wrap">
      <div title="PayPal"><CreditCard size={14} /></div>
      <div title="Vodafone Cash"><Smartphone size={14} className="text-red-400" /></div>
      <div title="TeleBirr"><Wifi size={14} className="text-blue-400" /></div>
      <div title="Cash"><Banknote size={14} className="text-green-400" /></div>
      <div title="Bank Transfer"><Landmark size={14} /></div>
    </div>
  );

  const portfolioItems: (PortfolioItem & { priceRange: string })[] = [
    // 1. Website Design (4 Images)
    { 
      id: 'web-1', 
      category: 'website', 
      title: 'Modern Corporate Web', 
      description: 'Clean responsive design for enterprise.', 
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'web-2', 
      category: 'website', 
      title: 'E-Commerce Storefront', 
      description: 'High-conversion retail layout.', 
      imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'web-3', 
      category: 'website', 
      title: 'Creative Agency Site', 
      description: 'Bold typography and animations.', 
      imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'web-4', 
      category: 'website', 
      title: 'Landing Page Pro', 
      description: 'Marketing focused single page app.', 
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf7d?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },

    // 2. Dashboard Design (4 Images)
    { 
      id: 'dash-1', 
      category: 'dashboard',
      title: 'Analytics Dashboard', 
      description: 'Data visualization dark mode UI.', 
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'dash-2', 
      category: 'dashboard', 
      title: 'CRM Interface', 
      description: 'Customer management system UI.', 
      imageUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'dash-3', 
      category: 'dashboard', 
      title: 'Finance Tracker', 
      description: 'Crypto and stock trading view.', 
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'dash-4', 
      category: 'dashboard', 
      title: 'SaaS Admin Panel', 
      description: 'Clean user management grid.', 
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },

    // 3. Photography (4 Images)
    { 
      id: 'photo-1', 
      category: 'photo', 
      title: 'Portrait Studio', 
      description: 'High-end lighting and retouching.', 
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'photo-2', 
      category: 'photo', 
      title: 'Urban Architecture', 
      description: 'Cityscape and structural detail.', 
      imageUrl: 'https://images.unsplash.com/photo-1470075801209-17f9ec0cade6?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'photo-3', 
      category: 'photo', 
      title: 'Product Photography', 
      description: 'Commercial advertising shots.', 
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'photo-4', 
      category: 'photo', 
      title: 'Fashion Editorial', 
      description: 'Stylized magazine quality edits.', 
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },

    // 4. Adobe Video Editing (4 Images)
    { 
      id: 'video-1', 
      category: 'video', 
      title: 'Premiere Pro Edit', 
      description: 'Complex timeline narrative cut.', 
      imageUrl: 'https://images.unsplash.com/photo-1574717432707-c571700d7294?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'video-2', 
      category: 'video', 
      title: 'Color Grading', 
      description: 'DaVinci/Lumetri color work.', 
      imageUrl: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'video-3', 
      category: 'video', 
      title: 'VFX Compositing', 
      description: 'After Effects motion graphics.', 
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    },
    { 
      id: 'video-4', 
      category: 'video', 
      title: 'Sound Design', 
      description: 'Audio mixing and mastering.', 
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
      priceRange: '$500–$1800'
    }
  ];

  // Cast type for filtering logic
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter as any);

  return (
    <section id="showcase" className="py-24 bg-[#0a0f1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{t.title}</h2>
            <p className="text-gray-400 max-w-xl">
              {t.desc}
            </p>
          </div>
          
          <div className="mt-8 md:mt-0 flex flex-wrap gap-2">
            {[
              { id: 'all', label: t.filters.all },
              { id: 'website', label: t.filters.website },
              { id: 'dashboard', label: t.filters.dashboard },
              { id: 'photo', label: t.filters.photo },
              { id: 'video', label: t.filters.video }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 font-bold text-sm">
                    {t.view}
                  </span>
                </div>
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                   {item.priceRange}
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs mb-3">{item.description}</p>
                
                {/* Rating & Payment Section */}
                <div className="mt-auto">
                   <div className="flex justify-between items-center mb-2">
                      {/* Interactive Stars */}
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={14} 
                            className={`cursor-pointer transition-colors ${
                              star <= (ratings[item.id] || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600 hover:text-yellow-400'
                            }`}
                            onClick={(e) => handleRate(e, item.id, star)}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {ratings[item.id] ? `${ratings[item.id]}.0` : t.rate}
                      </span>
                   </div>
                   
                   <PaymentIcons />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
            
            <div className="relative h-48 shrink-0 sm:h-56">
              <img src={selectedItem.imageUrl} alt={selectedItem.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition backdrop-blur-sm z-10"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1e293b] to-transparent p-4 pt-12">
                 <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{selectedItem.title}</h3>
                 <p className="text-blue-400 font-bold text-sm">{selectedItem.priceRange}</p>
              </div>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto">
              <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                {t.modal.interest} <strong>{selectedItem.title}</strong>. {t.modal.confirm}
              </p>

              <div className="bg-black/20 rounded-xl p-4 mb-6 border border-white/5">
                <h4 className="text-sm font-bold text-white mb-3">{t.modal.accepted}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-400">
                   <div className="flex items-center gap-2"><CreditCard size={14} className="text-blue-400 shrink-0"/> PayPal</div>
                   <div className="flex items-center gap-2"><Smartphone size={14} className="text-red-400 shrink-0"/> Vodafone Cash</div>
                   <div className="flex items-center gap-2"><Wifi size={14} className="text-blue-400 shrink-0"/> TeleBirr</div>
                   <div className="flex items-center gap-2"><Banknote size={14} className="text-green-400 shrink-0"/> Cash Payment</div>
                   <div className="flex items-center gap-2"><Landmark size={14} className="text-gray-300 shrink-0"/> Bank Transfer</div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                 <button 
                   onClick={() => setSelectedItem(null)}
                   className="w-1/3 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition text-sm font-medium"
                 >
                   {t.modal.cancel}
                 </button>
                 <button 
                   onClick={() => {
                     alert(`Thank you! We will contact you about the ${selectedItem.title}.`);
                     setSelectedItem(null);
                   }}
                   className="w-2/3 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 text-sm"
                 >
                   {t.modal.btn} <CheckCircle size={16} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Showcase;
