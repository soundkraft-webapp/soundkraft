import { useState, useEffect, useRef } from 'react';

interface AcademyFeature {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const DiscoverAcademy = () => {
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features: AcademyFeature[] = [
    {
      id: 1,
      title: "30+ Professional Lessons",
      description: "Learn DJing from scratch through 30+ structured lessons covering mixing, beatmatching, transitions, effects, and live performance, designed to help you progress confidently from beginner to performer.",
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "1-on-1 Private Coaching",
      description: "Get personalized mentorship from experienced industry professionals, tailored to your learning pace, music style, and goals, with real-time feedback for faster improvement.",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "10,000+ Hot Cue Files",
      description: "Access 10,000+ professionally prepared hot cue files that help you practice efficiently, improve transitions, and perform live sets with greater accuracy and confidence.",
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: "Online Learning",
      description: "Learn from anywhere through flexible online sessions, whether you use a DJ console or not, with training adapted to your setup and skill level.",
      imageUrl: "https://images.unsplash.com/photo-1571266028243-d220c9ae3b15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 5,
      title: "Trusted by 2,000+ Students Worldwide",
      description: "Join a global community of 2,000+ students who trust our proven curriculum, delivering real-world DJ skills, confidence, and career growth.",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2, rootMargin: '-50px 0px' });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <>
      <style>{`
        .academy-section { transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1); }
        .animate-image { opacity: 0; transform: translateX(-50px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.2s; }
        .animate-title { opacity: 0; transform: translateX(50px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.4s; }
        .animate-features { opacity: 0; transform: translateX(30px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.6s; }
        .animate-button { opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.8s; }
        
        .is-visible .animate-image,
        .is-visible .animate-title,
        .is-visible .animate-features,
        .is-visible .animate-button { opacity: 1; transform: translate(0); }
        
        /* 3D Button Effect */
        .btn-primary {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #f97316, #fb923c);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 16px 32px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: perspective(1000px) rotateX(0deg) translateZ(0);
          box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(249, 115, 22, 0.04);
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease-in-out;
        }
        .btn-primary:hover {
          transform: perspective(1000px) rotateX(-10deg) translateY(-2px) translateZ(0);
          box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.4), 0 15px 25px -5px rgba(249, 115, 22, 0.1);
          background: linear-gradient(45deg, #ea580c, #f97316);
        }
        .btn-primary:hover::before { left: 100%; }
        .btn-primary:active { transform: perspective(1000px) rotateX(0deg) translateY(0px) translateZ(0); transition: transform 0.1s ease; }
        
        .feature-image { transition: all 0.7s ease; border-radius: 16px; box-shadow: 0 15px 30px -10px rgba(249, 115, 22, 0.3); }
        .feature-image:hover { transform: scale(1.02); box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.4); }
        .thumbnail-image { transition: all 0.3s ease; }
        .thumbnail-image:hover { transform: scale(1.05); }
        
        @media (max-width: 640px) {
          .btn-primary { font-size: 1rem; padding: 14px 28px; }
        }
      `}</style>

      <section ref={sectionRef} className={`academy-section py-20 px-4 ${isVisible ? 'is-visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Dynamic Image Display */}
            <div className="animate-image relative">
              <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-8 rounded-3xl shadow-2xl">
                <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-20">
                  <div className="grid grid-cols-3 h-full">
                    <div className="bg-gradient-to-b from-orange-400 to-orange-600"></div>
                    <div className="bg-gradient-to-b from-red-500 to-orange-500"></div>
                    <div className="bg-gradient-to-b from-orange-600 to-red-600"></div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-4 border-gray-800/50">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-gray-400 text-xs">SoundKraft Academy</div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl mb-4 group">
                      <img
                        src={features.find(f => f.id === activeFeature)?.imageUrl}
                        alt={features.find(f => f.id === activeFeature)?.title}
                        className="w-full h-64 object-cover feature-image transition-transform duration-700"
                        loading="eager"
                        onError={(e) => {
                          const fallbacks = [
                            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80",
                            "https://picsum.photos/1000/640?random=dj"
                          ];
                          const currentSrc = e.currentTarget.src;
                          const nextFallback = fallbacks.find(url => !currentSrc.includes(url.split('?')[0]));
                          if (nextFallback) e.currentTarget.src = nextFallback;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">
                          {features.find(f => f.id === activeFeature)?.title}
                        </h3>
                        <p className="text-orange-300 text-sm font-medium">
                          Feature {activeFeature} of {features.length} • SoundKraft
                        </p>
                      </div>

                      <div className="absolute top-4 right-4 w-8 h-8 bg-orange-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {features.map((feature) => (
                        <button
                          key={feature.id}
                          onClick={() => setActiveFeature(feature.id)}
                          className={`relative overflow-hidden rounded-lg transition-all duration-300 ${activeFeature === feature.id
                            ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-black transform scale-105'
                            : 'opacity-60 hover:opacity-100 hover:scale-105'
                            }`}
                        >
                          <img
                            src={feature.imageUrl}
                            alt={feature.title}
                            className="w-full h-12 object-cover thumbnail-image"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = `https://picsum.photos/80/48?random=${feature.id}&grayscale`;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-1 left-1 text-white text-xs font-bold">{feature.id}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-red-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Right side - Interactive Content List */}
            <div>
              <h2 className="animate-title text-4xl sm:text-5xl font-bold text-white mb-12">
                Discover the SoundKraft DJ Academy
              </h2>

              <div className="animate-features space-y-8">
                {features.map((feature) => (
                  <div key={feature.id} className="flex group">
                    <div className={`w-1 mr-6 flex-shrink-0 transition-all duration-500 ease-in-out ${activeFeature === feature.id ? 'bg-orange-500 h-16' : 'bg-gray-600 h-8 group-hover:h-12 group-hover:bg-orange-400'
                      }`}></div>

                    <div className="flex-1">
                      <button
                        onClick={() => setActiveFeature(feature.id)}
                        className={`text-xl font-bold mb-3 text-left w-full transition-all duration-500 ease-in-out hover:text-orange-400 flex items-center gap-3 ${activeFeature === feature.id ? 'text-white' : 'text-gray-400'
                          }`}
                      >
                        <span>{feature.title}</span>
                        {activeFeature === feature.id && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        )}
                      </button>

                      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${activeFeature === feature.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                        <div className={`transform transition-all duration-700 ease-in-out ${activeFeature === feature.id ? 'translate-y-0' : '-translate-y-4'
                          }`}>
                          <p className="text-gray-300 leading-relaxed pt-3">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="animate-button mt-12">
                <button className="btn-primary">Start Your SoundKraft Journey</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DiscoverAcademy;
