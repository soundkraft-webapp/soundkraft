import { useEffect, useRef, useState } from 'react';
import { Trophy, Music, Sparkles, Zap, Star } from 'lucide-react';

const Bootcamp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const bootcampFeatures = [
    {
      icon: Music,
      title: 'Kickstart Your DJ Journey',
      subtitle: '(Intro + Basics)',
      description: 'Learn the fundamentals and get started'
    },
    {
      icon: Zap,
      title: 'Beatmatching & Rhythm Basics',
      subtitle: '',
      description: 'Master timing and sync techniques'
    },
    {
      icon: Star,
      title: 'Mixing & Transitions',
      subtitle: '',
      description: 'Create seamless track blends'
    },
    {
      icon: Sparkles,
      title: 'Creative DJ Skills',
      subtitle: '',
      description: 'Develop your unique style'
    },
    {
      icon: Trophy,
      title: 'Perform Like a Pro',
      subtitle: '',
      description: 'Stage presence and live performance'
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
        .bootcamp-section { transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1); }
        .animate-container { opacity: 0; transform: translateY(-40px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.2s; }
        .animate-icon { opacity: 0; transform: translateY(-30px) scale(0.8); transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.4s; }
        .animate-title { opacity: 0; transform: translateY(-20px); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.6s; }
        .animate-subtitle { opacity: 0; transform: translateY(-15px); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.8s; }
        .animate-grid { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 1.0s; }
        .animate-button { opacity: 0; transform: translateY(30px); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 1.6s; }
        
        .is-visible .animate-container,
        .is-visible .animate-icon,
        .is-visible .animate-title,
        .is-visible .animate-subtitle,
        .is-visible .animate-grid,
        .is-visible .animate-button { opacity: 1; transform: translateY(0) scale(1); }
        
        /* Staggered feature cards */
        .feature-card { opacity: 0; transform: translateY(30px) scale(0.95); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .is-visible .feature-card { opacity: 1; transform: translateY(0) scale(1); }
        .is-visible .feature-card:nth-child(1) { transition-delay: 1.2s; }
        .is-visible .feature-card:nth-child(2) { transition-delay: 1.3s; }
        .is-visible .feature-card:nth-child(3) { transition-delay: 1.4s; }
        .is-visible .feature-card:nth-child(4) { transition-delay: 1.5s; }
        .is-visible .feature-card:nth-child(5) { transition-delay: 1.6s; }
        
        /* 3D Button Effect */
        .bootcamp-btn-primary-compact {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #f97316, #fb923c);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 14px 32px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: perspective(1000px) rotateX(0deg) translateZ(0);
          box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(249, 115, 22, 0.04);
        }
        .bootcamp-btn-primary-compact::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease-in-out;
        }
        .bootcamp-btn-primary-compact:hover {
          transform: perspective(1000px) rotateX(-10deg) translateY(-2px) translateZ(0);
          box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.4), 0 15px 25px -5px rgba(249, 115, 22, 0.1);
          background: linear-gradient(45deg, #ea580c, #f97316);
        }
        .bootcamp-btn-primary-compact:hover::before { left: 100%; }
        .bootcamp-btn-primary-compact:active { transform: perspective(1000px) rotateX(0deg) translateY(0px) translateZ(0); transition: transform 0.1s ease; }
        
        /* Enhanced feature card hover effects */
        .feature-hover { transition: all 0.3s ease; }
        .feature-hover:hover { transform: translateY(-5px); background: rgba(249, 115, 22, 0.15); border-color: rgba(249, 115, 22, 0.5); }
        .feature-icon { transition: all 0.3s ease; }
        .feature-hover:hover .feature-icon { transform: scale(1.1) rotate(5deg); }
        
        /* Improved grid layout - 3 columns on desktop, 2 bottom cards centered */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        
        .features-grid .feature-card {
          grid-column: span 2;
        }
        
        /* Center last row with 2 cards - start from column 2 */
        .features-grid .feature-card:nth-child(4) {
          grid-column: 2 / 4;
        }
        
        .features-grid .feature-card:nth-child(5) {
          grid-column: 4 / 6;
        }
        
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .features-grid .feature-card {
            grid-column: span 1;
          }
          
          .features-grid .feature-card:nth-child(4),
          .features-grid .feature-card:nth-child(5) {
            grid-column: span 1;
          }
        }
        
        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          /* Ensure all cards take full width of their grid cell */
          .features-grid .feature-card {
            width: 100%;
            min-width: 0;
            max-width: none;
          }
          
          /* First card takes full width */
          .features-grid .feature-card:nth-child(1) {
            grid-column: span 2;
          }
          
          /* Cards 2-5 are in 2x2 grid (2 columns each) */
          .features-grid .feature-card:nth-child(2),
          .features-grid .feature-card:nth-child(3),
          .features-grid .feature-card:nth-child(4),
          .features-grid .feature-card:nth-child(5) {
            grid-column: span 1;
            width: 100%;
          }
          
          .bootcamp-btn-primary-compact { font-size: 1rem; padding: 12px 28px; }
        }
        
        @media (max-width: 480px) {
          .bootcamp-btn-primary-compact { font-size: 0.95rem; padding: 10px 24px; }
        }
      `}</style>

      <section ref={sectionRef} id="bootcamp" className={`bootcamp-section min-h-screen py-20 px-4 flex items-center ${isVisible ? 'is-visible' : ''}`}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="animate-container bg-black/50 backdrop-blur-sm rounded-3xl p-4 sm:p-12 border border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.2)]">
            <div className="text-center mb-8 sm:mb-12">
              <Trophy className="animate-icon w-12 h-12 sm:w-16 sm:h-16 text-orange-500 mx-auto mb-4 sm:mb-6" />
              <h2 className="animate-title text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
                100% Money-Back Guarantee
              </h2>
              <p className="animate-subtitle text-lg sm:text-xl text-gray-300 px-2">
                Your dream Your sound Your skill built in 30 hours.
              </p>
              <p className="text-base sm:text-lg text-orange-400 mt-2 sm:mt-3 px-2">
                Learn DJing in 30 hours or get your full fee refunded.
              </p>
            </div>

            <div className="animate-grid features-grid">
              {bootcampFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card feature-hover text-center p-4 sm:p-6 bg-orange-500/10 rounded-xl border border-orange-500/30 flex flex-col items-center justify-start h-full"
                >
                  <feature.icon className="feature-icon w-10 h-10 sm:w-12 sm:h-12 text-orange-500 mx-auto mb-3 sm:mb-4 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold mb-1 text-orange-400 w-full break-words">
                    {feature.title}
                  </h3>
                  {feature.subtitle && (
                    <p className="text-xs sm:text-sm text-orange-300 mb-2">{feature.subtitle}</p>
                  )}
                  <p className="text-gray-400 text-xs sm:text-sm mt-auto w-full">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="animate-button text-center">
              <button className="bootcamp-btn-primary-compact">
                Apply Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bootcamp;
