
import React, { useState } from 'react';
import { BookOpen, Code, Play, CheckCircle, HelpCircle, Trophy, Monitor, Layout, Smartphone, Database, ArrowRight, ArrowLeft, BarChart, ChevronDown, ChevronUp } from 'lucide-react';

interface FreeCoursesProps {
  lang?: 'en' | 'am' | 'om';
}

const FreeCourses: React.FC<FreeCoursesProps> = ({ lang = 'en' }) => {
  const [activeCourse, setActiveCourse] = useState<'marketing' | 'web' | null>(null);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Translation Helper
  const t = {
    en: {
      title: "Free Professional Courses",
      subtitle: "Master high-income digital skills completely for free. Certified by Addis Web Studio.",
      back: "Back to Courses",
      startQuiz: "Start Final Exam",
      question: "Question",
      score: "Your Score",
      retry: "Retry Quiz",
      marketing: {
        title: "Digital Marketing Mastery",
        desc: "A complete guide to SEO, Social Media, and Content Strategy.",
        modules: "10 Modules",
        quiz: "30 Question Exam"
      },
      web: {
        title: "Full Stack Web & App Dev",
        desc: "Learn HTML, CSS, React, and Modern App Development.",
        modules: "Project Based",
        quiz: "Practical Demos"
      }
    },
    am: {
      title: "ነጻ የሙያ ኮርሶች",
      subtitle: "ከፍተኛ ገቢ የሚያስገኙ ዲጂታል ክህሎቶችን በነጻ ይማሩ። በአዲስ ዌብ ስቱዲዮ የተረጋገጠ።",
      back: "ወደ ኮርሶች ይመለሱ",
      startQuiz: "ፈተና ይጀምሩ",
      question: "ጥያቄ",
      score: "ውጤት",
      retry: "እንደገና ይሞክሩ",
      marketing: {
        title: "ዲጂታል ማርኬቲንግ ማስተሪ",
        desc: "ስለ SEO፣ ማህበራዊ ሚዲያ እና ይዘት ስትራቴጂ ሙሉ መመሪያ።",
        modules: "10 ምዕራፎች",
        quiz: "30 የፈተና ጥያቄዎች"
      },
      web: {
        title: "ፉል ስታክ ዌብ እና አፕ ልማት",
        desc: "HTML፣ CSS፣ React እና ዘመናዊ የአፕ ልማትን ይማሩ።",
        modules: "በፕሮጀክት የተደገፈ",
        quiz: "ተግባራዊ ልምምድ"
      }
    },
    om: {
      title: "Koorsiiwwan Ogummaa Bilisaa",
      subtitle: "Dandeettiiwwan diijiitaalaa galii olaanaa argamsiisan bilisaan baradhaa.",
      back: "Gara Koorsiiwwanii",
      startQuiz: "Qormaata Jalqabi",
      question: "Gaaffii",
      score: "Qabxii Keessan",
      retry: "Irra Deebi'i",
      marketing: {
        title: "Digitaal Maarketingii",
        desc: "Qajeelfama guutuu waa'ee SEO, Miidiyaa Hawaasaa fi Tarsiimoo Qabiyyee.",
        modules: "Kutaa 10",
        quiz: "Gaaffii 30"
      },
      web: {
        title: "Misooma Weebsaayitii fi Appii",
        desc: "HTML, CSS, React fi Misooma Appii ammayyaa baradhaa.",
        modules: "Pirojektii Irratti Kan Hundaa'e",
        quiz: "Agarsiisa Qabatamaa"
      }
    }
  }[lang];

  // --- MARKETING DATA ---
  const marketingModules = [
    { title: "Introduction to Digital Marketing", content: "Understanding the landscape of online business, customer journeys, and the difference between traditional and digital marketing.", icon: <BookOpen /> },
    { title: "Content Strategy & Copywriting", content: "How to write words that sell. The art of storytelling, headlines, and structuring content for engagement.", icon: <Layout /> },
    { title: "Social Media Marketing (SMM)", content: "Mastering Facebook, Instagram, Telegram, and LinkedIn. Creating calendars and viral content.", icon: <Smartphone /> },
    { title: "Search Engine Optimization (SEO)", content: "Getting found on Google. Keywords, on-page optimization, and backlink strategies.", icon: <SearchIcon /> },
    { title: "Email Marketing & Automation", content: "Building lists and sending automated sequences that convert leads into customers.", icon: <CheckCircle /> },
    { title: "Paid Advertising (PPC)", content: "Google Ads and Facebook Ads. How to target the right audience and manage budgets.", icon: <BarChart /> },
    { title: "Video Marketing Strategy", content: "Using YouTube and TikTok. Scripting, filming, and editing for retention.", icon: <Play /> },
    { title: "Branding & Design Basics", content: "Visual identity. Using Canva and basic tools to create consistent brand aesthetics.", icon: <Layout /> },
    { title: "Analytics & Data Analysis", content: "Reading the numbers. Google Analytics, interpreting metrics, and making data-driven decisions.", icon: <BarChart /> },
    { title: "Future Trends & AI in Marketing", content: "Using ChatGPT and AI tools to speed up workflows and personalize marketing.", icon: <BotIcon /> }
  ];

  const marketingQuiz = [
    { q: "What does SEO stand for?", options: ["Search Engine Optimization", "Social Engine Operation", "Sales Executive Officer", "Site External Order"], a: 0 },
    { q: "Which platform is best for B2B marketing?", options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], a: 1 },
    { q: "What is 'Content Marketing'?", options: ["Selling content", "Creating valuable content to attract audience", "Paying for ads", "Email spamming"], a: 1 },
    { q: "What is a 'Call to Action' (CTA)?", options: ["A phone call", "A button prompting user action", "A complaint", "A meeting"], a: 1 },
    { q: "Which is a metric for email marketing?", options: ["Open Rate", "Followers", "Likes", "Retweets"], a: 0 },
    { q: "What does PPC stand for?", options: ["Pay Per Click", "Post Per Channel", "Price Per Customer", "Public Post Content"], a: 0 },
    { q: "What is the 80/20 rule in content?", options: ["80% Value, 20% Promotion", "80% Ads, 20% Content", "80% Video, 20% Text", "80% Images, 20% Links"], a: 0 },
    { q: "Which tool is used for website analytics?", options: ["Google Analytics", "Photoshop", "Canva", "Trello"], a: 0 },
    { q: "What is a 'Lead'?", options: ["A leader", "A potential customer", "A sale", "A boss"], a: 1 },
    { q: "Short-form video is dominant on which app?", options: ["LinkedIn", "TikTok", "Gmail", "Excel"], a: 1 },
    // Adding 20 more simple questions to reach 30
    { q: "ROI stands for?", options: ["Return On Investment", "Rate Of Interest", "Risk Of Inflation", "Run On Internet"], a: 0 },
    { q: "A/B Testing helps you?", options: ["Compare two versions", "Test blood type", "Write alphabet", "Ignore data"], a: 0 },
    { q: "Which is NOT a social media platform?", options: ["Facebook", "MySQL", "Instagram", "X"], a: 1 },
    { q: "Influencer marketing leverages?", options: ["Popular people", "Robots", "Viruses", "Spam"], a: 0 },
    { q: "Bounce rate refers to?", options: ["Users leaving quickly", "Ball games", "Server speed", "Email replies"], a: 0 },
    { q: "CTR stands for?", options: ["Click Through Rate", "Cut The Rope", "Call The Representative", "Center Text Right"], a: 0 },
    { q: "What is a 'Persona'?", options: ["Fictional ideal customer", "A mask", "A robot", "A website"], a: 0 },
    { q: "Evergreen content is?", options: ["Always relevant", "Green colored", "Seasonal", "Deleted quickly"], a: 0 },
    { q: "Hashtags are used to?", options: ["Categorize content", "Hide content", "Delete posts", "Encrypt data"], a: 0 },
    { q: "Viral marketing relies on?", options: ["Users sharing content", "Buying followers", "Hacking", "Luck only"], a: 0 },
    { q: "KPI means?", options: ["Key Performance Indicator", "Key Person Incharge", "Keep Posting Images", "Kind People Inside"], a: 0 },
    { q: "B2C means?", options: ["Business to Customer", "Back to Class", "Business to Company", "Big to Cool"], a: 0 },
    { q: "Affiliate marketing involves?", options: ["Earning commission", "Owning products", "Manufacturing", "Shipping"], a: 0 },
    { q: "Target Audience is?", options: ["Specific group you sell to", "Everyone", "Your employees", "Robots"], a: 0 },
    { q: "CRM stands for?", options: ["Customer Relationship Management", "Car Repair Manual", "Cool Role Model", "Code Run Machine"], a: 0 },
    { q: "Landing page is designed for?", options: ["Conversion", "Landing planes", "Decoration", "History"], a: 0 },
    { q: "UGC stands for?", options: ["User Generated Content", "Use Google Chrome", "Universal Game Code", "Under Ground Cable"], a: 0 },
    { q: "Retargeting shows ads to?", options: ["Previous visitors", "New people", "Aliens", "Nobody"], a: 0 },
    { q: "Organic traffic comes from?", options: ["Unpaid search results", "Ads", "Buying lists", "Robots"], a: 0 },
    { q: "The 'Funnel' describes?", options: ["Customer journey", "A kitchen tool", "A tornado", "A drink"], a: 0 },
  ];

  // --- WEB DEV DATA ---
  const webTechs = [
    { name: "HTML5", desc: "The Skeleton of the Web", icon: <Layout className="text-orange-500" /> },
    { name: "CSS3", desc: "Styling & Responsive Layouts", icon: <BookOpen className="text-blue-500" /> },
    { name: "JavaScript", desc: "Interactivity & Logic", icon: <Code className="text-yellow-400" /> },
    { name: "React.js", desc: "Modern UI Components", icon: <Database className="text-cyan-400" /> },
  ];

  const handleQuizAnswer = (optionIndex: number) => {
    if (optionIndex === marketingQuiz[currentQuestion].a) {
      setScore(score + 1);
    }
    if (currentQuestion < marketingQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizStarted(false);
  };

  if (!activeCourse) {
    return (
      <div className="min-h-screen bg-[#0f172a] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
           <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6 animate-bounce">
             <Trophy className="w-3 h-3 mr-2" /> Certified Free Education
           </div>
           <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">{t.title}</h1>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Marketing Card */}
          <div className="group relative bg-slate-800 rounded-3xl p-8 border border-white/5 hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-900/20 cursor-pointer overflow-hidden" onClick={() => setActiveCourse('marketing')}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <BarChart size={120} />
            </div>
            <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
              <BarChart size={32} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{t.marketing.title}</h3>
            <p className="text-gray-400 mb-6">{t.marketing.desc}</p>
            <div className="flex gap-4 text-sm font-medium text-gray-300">
               <span className="flex items-center gap-1"><BookOpen size={16} className="text-pink-400"/> {t.marketing.modules}</span>
               <span className="flex items-center gap-1"><HelpCircle size={16} className="text-pink-400"/> {t.marketing.quiz}</span>
            </div>
            <div className="mt-8 flex items-center text-pink-400 font-bold group-hover:translate-x-2 transition-transform">
              Start Learning <ArrowRight className="ml-2" />
            </div>
          </div>

          {/* Web Dev Card */}
          <div className="group relative bg-slate-800 rounded-3xl p-8 border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 cursor-pointer overflow-hidden" onClick={() => setActiveCourse('web')}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code size={120} />
            </div>
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Code size={32} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{t.web.title}</h3>
            <p className="text-gray-400 mb-6">{t.web.desc}</p>
            <div className="flex gap-4 text-sm font-medium text-gray-300">
               <span className="flex items-center gap-1"><Monitor size={16} className="text-blue-400"/> {t.web.modules}</span>
               <span className="flex items-center gap-1"><Code size={16} className="text-blue-400"/> {t.web.quiz}</span>
            </div>
             <div className="mt-8 flex items-center text-blue-400 font-bold group-hover:translate-x-2 transition-transform">
              Start Learning <ArrowRight className="ml-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- MARKETING COURSE RENDER ---
  if (activeCourse === 'marketing') {
    return (
      <div className="min-h-screen bg-[#0f172a] pt-20 pb-12">
        <div className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => { setActiveCourse(null); resetQuiz(); }} className="flex items-center text-gray-400 hover:text-white transition">
              <ArrowLeft className="mr-2" size={20} /> {t.back}
            </button>
            <span className="font-bold text-white hidden sm:block">{t.marketing.title}</span>
            <div className="w-8"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
           {/* Course Intro */}
           {!quizStarted && (
             <div className="mb-12 text-center animate-fade-in-up">
               <h1 className="text-4xl font-bold text-white mb-4">{t.marketing.title}</h1>
               <p className="text-gray-400">{t.marketing.desc}</p>
             </div>
           )}

           {/* Modules List */}
           {!quizStarted && (
             <div className="space-y-4 mb-12">
               {marketingModules.map((module, idx) => (
                 <div key={idx} className="bg-slate-800 rounded-xl border border-white/5 overflow-hidden">
                   <button 
                    onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition"
                   >
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold">
                         {idx + 1}
                       </div>
                       <div>
                         <h3 className="font-bold text-white text-lg">{module.title}</h3>
                       </div>
                     </div>
                     {activeModule === idx ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                   </button>
                   
                   {activeModule === idx && (
                     <div className="px-6 pb-6 pt-2 bg-black/20 border-t border-white/5">
                        <div className="flex flex-col md:flex-row gap-6">
                           <div className="flex-1">
                              <p className="text-gray-300 leading-relaxed mb-4">{module.content}</p>
                              <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-white/10 relative group cursor-pointer">
                                 <Play className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                                 <span className="absolute bottom-2 right-2 text-xs bg-black/50 px-2 py-1 rounded text-white">Video Lesson</span>
                              </div>
                           </div>
                           <div className="w-full md:w-1/3 bg-slate-700/30 rounded-lg p-4">
                              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                {module.icon} Key Takeaways
                              </h4>
                              <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-start gap-2"><CheckCircle size={14} className="mt-1 text-green-400 shrink-0"/> Understand core concepts</li>
                                <li className="flex items-start gap-2"><CheckCircle size={14} className="mt-1 text-green-400 shrink-0"/> Practical application</li>
                                <li className="flex items-start gap-2"><CheckCircle size={14} className="mt-1 text-green-400 shrink-0"/> Case studies review</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                   )}
                 </div>
               ))}
             </div>
           )}

           {/* Quiz Section */}
           <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <Trophy size={180} />
              </div>

              {!quizStarted ? (
                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">Ready to certify your knowledge?</h3>
                  <p className="text-indigo-200 mb-6">Take the comprehensive 30-question exam to prove your skills.</p>
                  <button 
                    onClick={() => setQuizStarted(true)}
                    className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105"
                  >
                    {t.startQuiz}
                  </button>
                </div>
              ) : showResult ? (
                <div className="text-center relative z-10 animate-fade-in-up">
                  <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Trophy size={48} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{t.score}</h3>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6">
                    {Math.round((score / marketingQuiz.length) * 100)}%
                  </div>
                  <p className="text-indigo-200 mb-8">You answered {score} out of {marketingQuiz.length} questions correctly.</p>
                  <button onClick={resetQuiz} className="px-6 py-2 border border-white/20 hover:bg-white/10 text-white rounded-full transition">
                    {t.retry}
                  </button>
                </div>
              ) : (
                <div className="relative z-10 animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-indigo-300 uppercase tracking-widest">{t.question} {currentQuestion + 1} / {marketingQuiz.length}</span>
                    <span className="text-sm text-indigo-300">Score: {score}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
                    {marketingQuiz[currentQuestion].q}
                  </h3>

                  <div className="grid gap-4">
                    {marketingQuiz[currentQuestion].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuizAnswer(i)}
                        className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-indigo-500/20 hover:border-indigo-500 transition-all text-gray-200 hover:text-white"
                      >
                        <span className="inline-block w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-center text-sm mr-3">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
           </div>
        </div>
      </div>
    );
  }

  // --- WEB DEV COURSE RENDER ---
  if (activeCourse === 'web') {
    return (
      <div className="min-h-screen bg-[#0f172a] pt-20 pb-12">
         <div className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => setActiveCourse(null)} className="flex items-center text-gray-400 hover:text-white transition">
              <ArrowLeft className="mr-2" size={20} /> {t.back}
            </button>
            <span className="font-bold text-white hidden sm:block">{t.web.title}</span>
            <div className="w-8"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
           {/* Intro */}
           <div className="text-center mb-16 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Full Stack Developer Roadmap</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We don't just teach syntax. We teach you how to build real-world applications. From the first line of HTML to deploying full-scale React apps.
              </p>
           </div>

           {/* Tech Stack Cards */}
           <div className="grid md:grid-cols-4 gap-6 mb-16">
              {webTechs.map((tech, i) => (
                <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-white/5 text-center hover:bg-slate-750 transition shadow-lg">
                   <div className="w-16 h-16 bg-black/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                     {tech.icon}
                   </div>
                   <h3 className="font-bold text-white text-lg">{tech.name}</h3>
                   <p className="text-sm text-gray-400 mt-2">{tech.desc}</p>
                </div>
              ))}
           </div>

           {/* Curriculum Timeline */}
           <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              
              <h2 className="text-3xl font-bold text-white mb-12 text-center relative z-10">How We Teach</h2>

              <div className="space-y-12 relative z-10">
                 {/* Step 1 */}
                 <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2">
                       <div className="aspect-video bg-black rounded-xl border border-blue-500/20 relative overflow-hidden group">
                          <img src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=800" alt="Code" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Play className="w-16 h-16 text-white drop-shadow-lg" />
                          </div>
                       </div>
                    </div>
                    <div className="w-full md:w-1/2">
                       <div className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Module 1</div>
                       <h3 className="text-2xl font-bold text-white mb-4">Foundation: HTML & CSS</h3>
                       <p className="text-gray-400 leading-relaxed mb-6">
                         We start with the building blocks. You'll learn how to structure documents semantically and style them with modern CSS (Flexbox, Grid). You will build a personal portfolio site as your first project.
                       </p>
                       <button className="text-white border-b border-blue-500 pb-1 hover:text-blue-400 transition">View Course Details</button>
                    </div>
                 </div>

                 {/* Step 2 */}
                 <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                    <div className="w-full md:w-1/2">
                       <div className="aspect-video bg-black rounded-xl border border-yellow-500/20 relative overflow-hidden group">
                          <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800" alt="Code" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Play className="w-16 h-16 text-white drop-shadow-lg" />
                          </div>
                       </div>
                    </div>
                    <div className="w-full md:w-1/2 md:text-right">
                       <div className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-2">Module 2</div>
                       <h3 className="text-2xl font-bold text-white mb-4">Logic: JavaScript & DOM</h3>
                       <p className="text-gray-400 leading-relaxed mb-6">
                         Make your sites alive. Learn variables, loops, functions, and event listeners. We build a Todo App and a Weather Dashboard connecting to real APIs.
                       </p>
                       <button className="text-white border-b border-yellow-500 pb-1 hover:text-yellow-400 transition">View Course Details</button>
                    </div>
                 </div>

                 {/* Step 3 */}
                 <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/2">
                       <div className="aspect-video bg-black rounded-xl border border-cyan-500/20 relative overflow-hidden group">
                          <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800" alt="React" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <Play className="w-16 h-16 text-white drop-shadow-lg" />
                          </div>
                       </div>
                    </div>
                    <div className="w-full md:w-1/2">
                       <div className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2">Module 3</div>
                       <h3 className="text-2xl font-bold text-white mb-4">Frameworks: React.js</h3>
                       <p className="text-gray-400 leading-relaxed mb-6">
                         Enter modern development. Components, State, Hooks, and Routing. You will build a full-scale E-commerce frontend with a shopping cart.
                       </p>
                       <button className="text-white border-b border-cyan-500 pb-1 hover:text-cyan-400 transition">View Course Details</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return null;
};

// Helper Icons
const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const BotIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
);

export default FreeCourses;
