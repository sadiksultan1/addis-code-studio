
import React from 'react';
import { Layout, Camera, Video, CheckCircle } from 'lucide-react';

interface ServicesProps {
  lang?: 'en' | 'am' | 'om';
}

const Services: React.FC<ServicesProps> = ({ lang = 'en' }) => {
  
  const content = {
    en: {
      header: "Our Premium Services",
      sub: "High-quality, professional, and customer-focused solutions designed to scale your business.",
      services: [
        {
          title: "Website Creation",
          description: "Custom, responsive, and high-performance websites tailored to your business goals.",
          features: ["Responsive Design", "SEO Optimization", "Fast Loading Speed"]
        },
        {
          title: "Photo Design",
          description: "Professional photo editing and graphic design. From retouching to creative composition.",
          features: ["High-End Retouching", "Creative Manipulation", "Brand Identity"]
        },
        {
          title: "Video Editing",
          description: "Cinematic video editing for commercials, social media, and events.",
          features: ["Color Grading", "Motion Graphics", "Sound Design"]
        }
      ]
    },
    am: {
      header: "ፕሪሚየም አገልግሎቶቻችን",
      sub: "ንግድዎን ለማሳደግ የተነደፉ ከፍተኛ ጥራት ያላቸው እና ደንበኛ ተኮር መፍትሄዎች።",
      services: [
        {
          title: "የድር ጣቢያ ግንባታ",
          description: "ለንግድዎ ግቦች የተዘጋጁ ብጁ፣ ምላሽ ሰጪ እና ከፍተኛ አፈጻጸም ያላቸው ድር ጣቢያዎች።",
          features: ["ሪስፖንሲቭ ዲዛይን", "SEO ማመቻቸት", "ፈጣን ፍጥነት"]
        },
        {
          title: "ፎቶ ዲዛይን",
          description: "ሙያዊ የፎቶ አርትዖት እና ግራፊክ ዲዛይን። ከማስተካከያ እስከ ፈጠራ ጥንቅሮች።",
          features: ["ከፍተኛ ጥራት", "የፈጠራ ስራ", "ብራንድ ማንነት"]
        },
        {
          title: "ቪዲዮ ኤዲቲንግ",
          description: "ለማስታወቂያዎች፣ ለማህበራዊ ሚዲያ እና ለዝግጅቶች የሚሆን ሲኒማዊ ቪዲዮ አርትዖት።",
          features: ["ቀለም ማስተካከያ", "ሞሽን ግራፊክስ", "ሳውንድ ዲዛይን"]
        }
      ]
    },
    om: {
      header: "Tajaajila Keenya Olaanaa",
      sub: "Furmaata qulqullina olaanaa qabu, ogummaa fi maamiltoota irratti xiyyeeffate.",
      services: [
        {
          title: "Uuminsa Webusaayitii",
          description: "Webusaayitiiwwan si'aatoo fi raawwii olaanaa qaban, galma bizinisa keessaniif qophaa'an.",
          features: ["Dizaayinii Si'aataa", "SEO Optimization", "Saffisa Olaanaa"]
        },
        {
          title: "Dizaayinii Suuraa",
          description: "Gulaallii suuraa fi dizaayinii giraafiksii ogummaa qabu. Suuraa qulqulleessuu irraa hanga uumuu.",
          features: ["Qulqullina Olaanaa", "Uumuu Kalaqaa", "Eenyummaa Brandii"]
        },
        {
          title: "Gulaallii Viidiyoo",
          description: "Beeksisa, miidiyaa hawaasaa fi qophiilee adda addaatiif gulaallii viidiyoo sinimaa fakkaatu.",
          features: ["Sirreessuu Halluu", "Motion Graphics", "Dizaayinii Sagalee"]
        }
      ]
    }
  };

  const t = content[lang];
  
  // Map icons to the translated content
  const servicesWithIcons = t.services.map((service, index) => ({
    ...service,
    icon: index === 0 ? <Layout className="w-8 h-8 text-blue-400" /> : index === 1 ? <Camera className="w-8 h-8 text-pink-400" /> : <Video className="w-8 h-8 text-purple-400" />
  }));

  return (
    <section id="services" className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{t.header}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesWithIcons.map((service, index) => (
            <div key={index} className="group glass-panel p-8 rounded-2xl hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-blue-500/30">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
