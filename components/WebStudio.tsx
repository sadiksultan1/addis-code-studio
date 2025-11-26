
import React, { useState } from 'react';
import { CheckCircle, Code, Cpu, Globe, ShoppingCart, CreditCard, Banknote, X, Smartphone, ExternalLink, Eye } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface WebProject {
  id: string;
  title: string;
  price: string;
  category: string;
  imageUrl: string;
  description: string;
  tech: string[];
}

const WebStudio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<WebProject | null>(null);
  const [paymentStep, setPaymentStep] = useState<'method' | 'form' | 'success'>('method');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [buyerInfo, setBuyerInfo] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const webProjects: WebProject[] = [
    {
      id: 'ws-1',
      title: 'E-Commerce Pro',
      price: '$899 / 100,000 ETB',
      category: 'E-Commerce',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
      description: 'A full-featured online store with cart, checkout, and admin dashboard.',
      tech: ['React', 'Node.js', 'Stripe']
    },
    {
      id: 'ws-2',
      title: 'Corporate Elite',
      price: '$599 / 70,000 ETB',
      category: 'Business',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      description: 'Professional presence for corporations with team management and blog.',
      tech: ['Next.js', 'Tailwind', 'CMS']
    },
    {
      id: 'ws-3',
      title: 'Creative Portfolio',
      price: '$399 / 45,000 ETB',
      category: 'Portfolio',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
      description: 'Minimalist design focused on showcasing visual art and photography.',
      tech: ['React', 'Framer Motion']
    },
    {
      id: 'ws-4',
      title: 'Restaurant Booking',
      price: '$499 / 55,000 ETB',
      category: 'Hospitality',
      imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800',
      description: 'Menu display and real-time table reservation system.',
      tech: ['Vue.js', 'Firebase', 'Maps']
    },
    {
      id: 'ws-5',
      title: 'Tech Blog & News',
      price: '$299 / 35,000 ETB',
      category: 'Content',
      imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
      description: 'High-performance blog with SEO optimization and newsletter.',
      tech: ['Gatsby', 'GraphQL', 'React']
    },
    {
      id: 'ws-6',
      title: 'Real Estate Engine',
      price: '$999 / 110,000 ETB',
      category: 'Real Estate',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      description: 'Property listing platform with advanced filtering and map search.',
      tech: ['React', 'Google Maps API', 'Node']
    },
    {
      id: 'ws-7',
      title: 'Medical Clinic',
      price: '$699 / 80,000 ETB',
      category: 'Health',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      description: 'Patient appointment scheduling and secure record access portal.',
      tech: ['React', 'Firebase Auth', 'Secure']
    },
    {
      id: 'ws-8',
      title: 'Education LMS',
      price: '$1200 / 135,000 ETB',
      category: 'Education',
      imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
      description: 'Learning Management System for schools with video courses and quizzes.',
      tech: ['React', 'Video API', 'Express']
    }
  ];

  const handleBuyClick = (project: WebProject) => {
    setSelectedProject(project);
    setPaymentStep('method');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate Payment Processing and Save Order
      await addDoc(collection(db, "orders"), {
        project: selectedProject?.title,
        price: selectedProject?.price,
        paymentMethod,
        buyer: buyerInfo,
        status: 'pending',
        timestamp: serverTimestamp()
      });

      setPaymentStep('success');
    } catch (error) {
      console.error("Order error:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-100 font-sans pt-20">
      
      {/* Hero Header */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
          Addis Web <span className="text-blue-500">Studio</span>
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed">
          We build future-proof digital experiences. Our web solutions are engineered for speed, security, and scalability, tailored specifically for the Ethiopian and global market.
        </p>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 bg-black/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-blue-400 text-sm font-bold tracking-widest uppercase">Under the Hood</span>
            <h2 className="text-2xl font-bold text-white mt-2">Modern Technology Stack</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <Code className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h3 className="font-bold text-white">React & TypeScript</h3>
              <p className="text-xs text-gray-400 mt-2">Interactive, type-safe, and robust front-end interfaces.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <Cpu className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="font-bold text-white">Node.js & Next.js</h3>
              <p className="text-xs text-gray-400 mt-2">Server-side rendering for blazing fast performance and SEO.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <Globe className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-bold text-white">Firebase & Cloud</h3>
              <p className="text-xs text-gray-400 mt-2">Real-time databases, secure authentication, and scalable hosting.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <Smartphone className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <h3 className="font-bold text-white">Responsive Design</h3>
              <p className="text-xs text-gray-400 mt-2">Tailwind CSS ensuring perfection on Mobile, Tablet, and Desktop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold mb-12 border-l-4 border-blue-500 pl-4">Premium Templates & Custom Builds</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {webProjects.map((project) => (
            <div key={project.id} className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                  {project.category}
                </div>
                
                 {/* Hover Overlay for Preview */}
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <a 
                      href="https://1.envato.market/RygA17" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
                      title="Live Preview"
                    >
                      <Eye size={20} />
                    </a>
                 </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] uppercase bg-blue-500/10 text-blue-300 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-lg font-bold text-white">{project.price.split('/')[0]}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleBuyClick(project)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                    >
                      Purchase <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1e293b] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
            
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-xl font-bold text-white">Purchase {selectedProject.title}</h3>
              <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              {paymentStep === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Order Received!</h4>
                  <p className="text-gray-400 mb-6">
                    Thank you for your order. We will contact you via phone/email shortly to finalize the payment via {paymentMethod} and start your project.
                  </p>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl"
                  >
                    Close
                  </button>
                </div>
              ) : paymentStep === 'method' ? (
                <div>
                   <p className="text-gray-400 mb-6">Select your preferred payment method for <span className="text-white font-bold">{selectedProject.price}</span>.</p>
                   <div className="space-y-3">
                      {[
                        { id: 'telebirr', name: 'Tele Birr', icon: <Smartphone className="text-green-400" /> },
                        { id: 'paypal', name: 'PayPal', icon: <CreditCard className="text-blue-400" /> },
                        { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="text-purple-400" /> },
                        { id: 'vodafone', name: 'Vodafone Cash', icon: <Smartphone className="text-red-400" /> },
                        { id: 'cash', name: 'Cash Payment', icon: <Banknote className="text-yellow-400" /> },
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => {
                            setPaymentMethod(method.name);
                            setPaymentStep('form');
                          }}
                          className="w-full flex items-center p-4 bg-black/20 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all group"
                        >
                          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-colors">
                            {method.icon}
                          </div>
                          <span className="font-bold text-white">{method.name}</span>
                          <ArrowRight className="ml-auto text-gray-500 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" size={16} />
                        </button>
                      ))}
                   </div>
                </div>
              ) : (
                <form onSubmit={handlePaymentSubmit}>
                  <p className="text-sm text-blue-400 font-bold mb-4 uppercase tracking-wider">Method: {paymentMethod}</p>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Your Name</label>
                      <input 
                        required 
                        type="text" 
                        value={buyerInfo.name}
                        onChange={e => setBuyerInfo({...buyerInfo, name: e.target.value})}
                        className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        value={buyerInfo.phone}
                        onChange={e => setBuyerInfo({...buyerInfo, phone: e.target.value})}
                        className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                     <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <input 
                        required 
                        type="email" 
                        value={buyerInfo.email}
                        onChange={e => setBuyerInfo({...buyerInfo, email: e.target.value})}
                        className="w-full bg-black/40 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setPaymentStep('method')}
                      className="w-1/3 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Processing...' : 'Confirm Order'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal Helper for Arrows
const ArrowRight = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default WebStudio;
