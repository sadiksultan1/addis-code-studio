
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, ArrowRight, Star, Layers, Code, Zap, Smartphone, Search, Cloud, MapPin, Calendar, Cpu, Monitor, Camera } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const StartProject: React.FC = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    serviceType: 'Website Creation', 
    budget: '', 
    message: '' 
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        type: 'project_inquiry',
        timestamp: new Date()
      });
      setStatus('success');
      setFormData({ name: '', email: '', serviceType: 'Website Creation', budget: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  // Internal Component for Charts & Stats
  const OperationsDashboard = () => {
    const [timeframe, setTimeframe] = useState<'Daily' | 'Monthly' | 'Yearly'>('Yearly');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const getData = () => {
        switch(timeframe) {
            case 'Daily': return [
                { label: 'Video Editing', value: 45, icon: <Layers size={14} />, color: 'from-pink-500 to-rose-500' },
                { label: 'Web & App Dev', value: 85, icon: <Monitor size={14} />, color: 'from-blue-500 to-cyan-500' },
                { label: 'Photography', value: 30, icon: <Camera size={14} />, color: 'from-yellow-400 to-orange-500' },
                { label: 'AI Engineering', value: 95, icon: <Cpu size={14} />, color: 'from-purple-500 to-indigo-500' },
            ];
            case 'Monthly': return [
                { label: 'Video Editing', value: 65, icon: <Layers size={14} />, color: 'from-pink-500 to-rose-500' },
                { label: 'Web & App Dev', value: 75, icon: <Monitor size={14} />, color: 'from-blue-500 to-cyan-500' },
                { label: 'Photography', value: 80, icon: <Camera size={14} />, color: 'from-yellow-400 to-orange-500' },
                { label: 'AI Engineering', value: 85, icon: <Cpu size={14} />, color: 'from-purple-500 to-indigo-500' },
            ];
            case 'Yearly': return [
                { label: 'Video Editing', value: 75, icon: <Layers size={14} />, color: 'from-pink-500 to-rose-500' },
                { label: 'Web & App Dev', value: 80, icon: <Monitor size={14} />, color: 'from-blue-500 to-cyan-500' },
                { label: 'Photography', value: 95, icon: <Camera size={14} />, color: 'from-yellow-400 to-orange-500' },
                { label: 'AI Engineering', value: 100, icon: <Cpu size={14} />, color: 'from-purple-500 to-indigo-500' },
            ];
        }
    };

    const stats = getData();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    return (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            {/* Header: Location & Weather */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg leading-none mb-1">Addis Ababa, ET</h4>
                        <div className="flex items-center gap-2 text-xs text-blue-300 font-medium bg-blue-500/10 px-2 py-1 rounded-md w-fit">
                            <Cloud size={12} />
                            <span>22°C • Mostly Sunny</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                         <div className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                         </div>
                         <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Operational</span>
                    </div>
                    <div className="text-gray-400 text-xs flex items-center gap-1.5">
                        <Calendar size={12} /> {today}
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="mb-8">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h4 className="text-white font-bold text-lg">Workload Distribution</h4>
                        <p className="text-gray-400 text-xs">Real-time resource allocation</p>
                    </div>
                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                        {(['Daily', 'Monthly', 'Yearly'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimeframe(t)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                                    timeframe === t 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-5">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="group">
                            <div className="flex justify-between items-center mb-2 text-sm">
                                <span className="text-gray-300 font-medium flex items-center gap-2">
                                    <span className={`p-1 rounded-md bg-white/5 text-gray-400 group-hover:text-white transition-colors`}>{stat.icon}</span>
                                    {stat.label}
                                </span>
                                <span className="text-white font-bold">{stat.value}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                                <div 
                                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                                    style={{ width: mounted ? `${stat.value}%` : '0%' }}
                                >
                                    <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBMMTAgME0xMCAyMEwyMCAxMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3ApIi8+PC9zdmc+')] animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Technologies */}
            <div>
                <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider opacity-70">Core Technologies</h4>
                <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Python', 'TensorFlow', 'Firebase', 'Adobe CC', 'Figma', 'Node.js'].map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
  };

  if (status === 'success') {
    return (
      <div className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center bg-[#0f172a]">
        <div className="text-center max-w-lg glass-panel p-10 rounded-3xl border border-green-500/20 shadow-2xl shadow-green-900/20">
          <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Request Received!</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Thank you for choosing Addis Web Studio. We've received your project details and our team will get back to you within 24 hours to discuss the next steps.
          </p>
          <a href="/" className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-all">
            Return Home <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Star className="w-3 h-3 mr-2 fill-blue-400" /> Start Your Journey
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Let's Build Something <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Extraordinary</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From concept to launch, we provide comprehensive web editing and creation services tailored to your unique vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Detailed Description Section (Wide Layout) */}
          <div className="space-y-10 animate-fade-in-up">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code size={120} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-white mb-6">Web Editing & Creation</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Our core expertise lies in crafting high-performance digital experiences. Whether you need a brand new website from scratch or advanced editing of an existing platform, our <strong>Web Editing Service</strong> covers it all.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Full-Stack Development</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      We use modern frameworks like React, Next.js, and Node.js. This ensures your site is faster, more secure, and more scalable than traditional builders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-600/20 text-purple-400 rounded-xl">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Real-Time Editing & CMS</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Need to update content frequently? We build custom Content Management Systems (CMS) or integrate headless solutions so you can edit text and images instantly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-600/20 text-green-400 rounded-xl">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Responsive & Adaptive</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Your project will look flawless on every device. We meticulously code breakpoints for Mobile, Tablet, and Desktop screens.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-yellow-600/20 text-yellow-400 rounded-xl">
                    <Search size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">SEO Optimized</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      We structure your web editing project with clean semantic HTML and meta tags to ensure you rank high on Google search results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NEW Operations Dashboard */}
            <OperationsDashboard />

            <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl flex items-center justify-between">
               <div>
                  <h4 className="text-blue-400 font-bold mb-1">Not sure where to start?</h4>
                  <p className="text-xs text-blue-200">Our experts can guide you through the process.</p>
               </div>
               <div className="text-right">
                  <span className="block text-2xl font-bold text-white">100%</span>
                  <span className="text-xs text-blue-300">Satisfaction Guarantee</span>
               </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative animate-fade-in-up delay-100">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
             <h3 className="text-2xl font-bold text-white mb-2">Project Inquiry</h3>
             <p className="text-gray-400 text-sm mb-8">Fill out the form below to get a custom quote for your web editing or creation needs.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Service Type</label>
                  <div className="relative">
                    <select
                      value={formData.serviceType}
                      onChange={e => setFormData({...formData, serviceType: e.target.value})}
                      className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option>Website Creation</option>
                      <option>Web Editing & Maintenance</option>
                      <option>Photo Design</option>
                      <option>Video Editing</option>
                      <option>Full Branding Package</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <ArrowRight size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Budget Range (USD)</label>
                  <div className="relative">
                    <select
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                      className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a range</option>
                      <option>$500 - $1,000</option>
                      <option>$1,000 - $3,000</option>
                      <option>$3,000 - $5,000</option>
                      <option>$5,000+</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                       <ArrowRight size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Project Details</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder-gray-600"
                  placeholder="Tell us about your project goals, features needed, and timeline..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01]"
              >
                {status === 'submitting' ? 'Submitting...' : (
                  <>Start Your Project <Send size={20} /></>
                )}
              </button>

              {status === 'error' && (
                 <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center text-sm">
                    Something went wrong. Please check your connection.
                 </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartProject;
