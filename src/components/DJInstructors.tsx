import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DJ {
  id: number;
  name: string;
  lessons: number;
  image: string;
  specialty?: string;
}

const DJInstructors = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const djs: DJ[] = [
    {
      id: 1,
      name: "James Hype",
      lessons: 36,
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
      specialty: "House & Tech House"
    },
    {
      id: 2,
      name: "Afrojack",
      lessons: 95,
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      specialty: "EDM & Progressive House"
    },
    {
      id: 3,
      name: "Alok",
      lessons: 8,
      image: "https://images.pexels.com/photos/1481309/pexels-photo-1481309.jpeg?auto=compress&cs=tinysrgb&w=800",
      specialty: "Brazilian Bass"
    },
    {
      id: 4,
      name: "Kevin de Vries",
      lessons: 18,
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800",
      specialty: "Techno"
    },
    {
      id: 5,
      name: "Martin Garrix",
      lessons: 42,
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
      specialty: "Big Room House"
    },
    {
      id: 6,
      name: "David Guetta",
      lessons: 67,
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
      specialty: "Commercial Dance"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2, rootMargin: '-50px 0px' });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const getCardsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
    }
    return 4;
  };

  const cardsPerSlide = getCardsPerSlide();
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % Math.ceil(djs.length / cardsPerSlide));
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + Math.ceil(djs.length / cardsPerSlide)) % Math.ceil(djs.length / cardsPerSlide));

  const getVisibleDJs = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return djs.slice(startIndex, startIndex + cardsPerSlide);
  };

  return (
    <>
      <style>{`
        .dj-section { transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1); }
        .animate-header { opacity: 0; transform: translateY(-40px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.2s; }
        .animate-carousel { opacity: 0; transform: translateY(-30px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.4s; }
        .animate-nav { opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 1.6s; }
        .animate-indicators { opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 1.8s; }
        
        .is-visible .animate-header,
        .is-visible .animate-carousel,
        .is-visible .animate-nav,
        .is-visible .animate-indicators { opacity: 1; transform: translateY(0); }
        
        /* Staggered DJ cards */
        .dj-card { opacity: 0; transform: translateY(40px) scale(0.9); transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1); }
        .is-visible .dj-card { opacity: 1; transform: translateY(0) scale(1); }
        .is-visible .dj-card:nth-child(1) { transition-delay: 0.8s; }
        .is-visible .dj-card:nth-child(2) { transition-delay: 1.0s; }
        .is-visible .dj-card:nth-child(3) { transition-delay: 1.2s; }
        .is-visible .dj-card:nth-child(4) { transition-delay: 1.4s; }
        
        /* Enhanced card effects */
        .dj-card-content {
          position: relative;
          background: linear-gradient(135deg, #f97316, #fb923c, #dc2626);
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
        }
        .dj-card-content:hover {
          box-shadow: 0 0 40px rgba(249, 115, 22, 0.4);
          transform: scale(1.05) translateY(-5px);
        }
        
        /* Navigation buttons */
        .nav-btn {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(249, 115, 22, 0.3);
          color: white;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        .nav-btn:hover:not(:disabled) {
          background: #f97316;
          border-color: #f97316;
          box-shadow: 0 8px 25px rgba(249, 115, 22, 0.25);
          transform: translateY(-2px);
        }
        .nav-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        /* Indicators */
        .indicator { width: 12px; height: 12px; border-radius: 50%; transition: all 0.3s ease; cursor: pointer; }
        .indicator.active { background-color: #f97316; transform: scale(1.2); }
        .indicator:not(.active) { background-color: #6b7280; }
        .indicator:not(.active):hover { background-color: #9ca3af; transform: scale(1.1); }
      `}</style>

      <section ref={sectionRef} className={`dj-section py-20 px-4 ${isVisible ? 'is-visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="animate-header flex justify-between items-start mb-12">
            <div>
              <p className="text-orange-500 uppercase tracking-wider text-sm font-semibold mb-3">
                LEARN FROM THE BEST
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                DJs and their courses
              </h2>
            </div>
          </div>

          {/* DJ Cards Carousel */}
          <div className="animate-carousel relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getVisibleDJs().map((dj) => (
                <div key={dj.id} className="dj-card group">
                  <div className="dj-card-content">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={dj.image}
                        alt={dj.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                          {dj.name}
                        </h3>
                        <p className="text-orange-200 font-semibold drop-shadow">
                          {dj.lessons} lessons
                        </p>
                        {dj.specialty && (
                          <p className="text-white/80 text-sm mt-1 drop-shadow">
                            {dj.specialty}
                          </p>
                        )}
                      </div>

                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm"></div>
                      <div className="absolute top-6 right-16 w-4 h-4 bg-orange-300/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="animate-nav">
              <button
                onClick={prevSlide}
                className="nav-btn absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="nav-btn absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6"
                disabled={currentSlide >= Math.ceil(djs.length / cardsPerSlide) - 1}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="animate-indicators flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(djs.length / cardsPerSlide) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DJInstructors;
