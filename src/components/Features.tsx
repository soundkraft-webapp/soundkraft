import { useState, useEffect, useRef } from 'react';
import { Users, Zap, Monitor, Video, Calendar, BadgeCheck } from 'lucide-react';

interface Feature {  
  id: number;
  title: string;
  description: string;
  icon: any;
}

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features: Feature[] = [
    {
      id: 1,
      title: "1-on-1 Private Coaching or 1:5 Mentor-to-Student Ratio",
      description: "Choose between personalized one-on-one coaching or small group sessions with a 1:5 mentor-to-student ratio for focused guidance.",
      icon: Users,
    },
    {
      id: 2,
      title: "Fast-Track Your DJ Career",
      description: "Learn the skills and techniques required to become club-ready and performance-ready quickly, accelerating your journey as a professional DJ.",
      icon: Zap,
    },
    {
      id: 3,
      title: "Preparation & Performance in One Software",
      description: "Practice, plan, and perform your sets using industry-standard software, combining preparation and live performance seamlessly.",
      icon: Monitor,
    },
    {
      id: 4,
      title: "1-on-1 Live Sessions, Not Boring Recorded Videos",
      description: "Experience interactive live sessions with mentors instead of pre-recorded videos, ensuring real-time feedback and engagement.",
      icon: Video,
    },
    {
      id: 5,
      title: "Book 1-on-1 Live Demo Before You Commit",
      description: "Try a free 1-on-1 live demo session to experience the teaching style and course structure before enrolling fully.",
      icon: Calendar,
    },
    {
      id: 6,
      title: "100% Money-Back Guarantee if You Do Not Learn DJing in 30 Hours",
      description: "We are confident in our teaching if you don't master DJing in 30 hours, you get a full refund, no questions asked.",
      icon: BadgeCheck,
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
        .features-section { transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1); }
        .animate-container { opacity: 0; transform: translateY(-40px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.2s; }
        .animate-header { opacity: 0; transform: translateY(-30px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.4s; }
        .animate-grid { opacity: 0; transform: translateY(-20px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.6s; }
        
        .is-visible .animate-container,
        .is-visible .animate-header,
        .is-visible .animate-grid { opacity: 1; transform: translateY(0); }
        
        /* Staggered feature cards */
        .feature-card { opacity: 0; transform: translateY(30px) scale(0.95); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .is-visible .feature-card { opacity: 1; transform: translateY(0) scale(1); }
        .is-visible .feature-card:nth-child(1) { transition-delay: 0.8s; }
        .is-visible .feature-card:nth-child(2) { transition-delay: 1.0s; }
        .is-visible .feature-card:nth-child(3) { transition-delay: 1.2s; }
        .is-visible .feature-card:nth-child(4) { transition-delay: 1.4s; }
        .is-visible .feature-card:nth-child(5) { transition-delay: 1.6s; }
        .is-visible .feature-card:nth-child(6) { transition-delay: 1.8s; }
        
        /* 3D Button Effect */
        .btn-primary-compact {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #f97316, #fb923c);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          padding: 10px 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: perspective(1000px) rotateX(0deg) translateZ(0);
          box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(249, 115, 22, 0.04);
        }
        .btn-primary-compact::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease-in-out;
        }
        .btn-primary-compact:hover {
          transform: perspective(1000px) rotateX(-10deg) translateY(-2px) translateZ(0);
          box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.4), 0 15px 25px -5px rgba(249, 115, 22, 0.1);
          background: linear-gradient(45deg, #ea580c, #f97316);
        }
        .btn-primary-compact:hover::before { left: 100%; }
        .btn-primary-compact:active { transform: perspective(1000px) rotateX(0deg) translateY(0px) translateZ(0); transition: transform 0.1s ease; }
        
        /* Feature card hover effects */
        .feature-group { transition: all 0.3s ease; }
        .feature-group:hover { transform: translateY(-5px); }
        .feature-icon { transition: all 0.3s ease; }
        .feature-group:hover .feature-icon { background: rgba(249, 115, 22, 0.3); transform: scale(1.1); }
        .feature-title { transition: all 0.3s ease; }
        .feature-group:hover .feature-title { color: #fb923c; }
        
        @media (max-width: 640px) {
          .btn-primary-compact { font-size: 0.9rem; padding: 8px 16px; }
        }
      `}</style>

      <section ref={sectionRef} className={`features-section py-20 px-4 ${isVisible ? 'is-visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="animate-container relative bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-[3rem] p-8 sm:p-12 lg:p-16 border border-orange-500/20 shadow-2xl overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-orange-400/5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Header Section */}
              <div className="animate-header flex justify-between items-start mb-8">
                <div>
                  <p className="text-orange-500 uppercase tracking-wider text-sm font-semibold mb-2">
                    WHAT YOU GET
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    What's included in a subscription?
                  </h2>
                </div>
                <button className="btn-primary-compact">START NOW</button>
              </div>

              {/* Features Grid */}
              <div className="animate-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {features.map((feature) => (
                  <div key={feature.id} className="feature-card feature-group">
                    <div className="mb-4">
                      <div className="feature-icon w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-orange-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="feature-title text-xl font-bold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
