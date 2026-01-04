import { useEffect, useRef, useState } from 'react';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  link: string;
}

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const pricingPlans: PricingPlan[] = [
    {
      name: 'Book Your Live Demo Now',
      price: '₹1,600',
      period: ' + GST',
      features: [
        '1-on-1 Live Demo with Pro DJs',
        'Learn from Home – No need for a DJ console',
        'Learn Using Your Laptop',
        'Hands-On Experience',
        'Test Before You Invest',
        'Fast Assessment of Your Skills',
        'Comfort & Convenience from Anywhere',
        'Risk-Free Exploration'
      ],
      link: 'https://classplusapp.com/w/wlp/xbnojz/sound-kraft-demo'
    },
    {
      name: '1:5 & Group Sessions',
      price: '₹35,000',
      period: ' + GST',
      features: [
        'Small Group Learning (1:5 Ratio)',
        '20 One-Hour Professional Sessions',
        'Real-Time Guidance',
        'Build Confidence Fast',
        'Collaborative Environment',
        'Structured Curriculum',
        'Fixed Time & Learning Schedule'
      ],
      link: '#'
    },
    {
      name: '30 One-Hour Pro DJing Course',
      price: '₹70,000',
      period: ' + GST',
      features: [
        '30 Live One-Hour Sessions',
        '1-on-1 Personalized Coaching',
        'Flexible Schedule – Learn anytime that suits you',
        'Real-Time Feedback',
        'Hands-On Practical Training',
        'Build Confidence Quickly',
        'Complimentary Bonus Pack (₹1.3 Lakh Value)'
      ],
      popular: true,
      link: '#'
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
        .pricing-section { transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1); }
        .animate-header { opacity: 0; transform: translateY(-40px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.2s; }
        .animate-subtitle { opacity: 0; transform: translateY(-30px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.4s; }
        .animate-grid { opacity: 0; transform: translateY(-20px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.6s; }
        
        .is-visible .animate-header,
        .is-visible .animate-subtitle,
        .is-visible .animate-grid { opacity: 1; transform: translateY(0); }
        
        /* Staggered pricing cards */
        .pricing-card { opacity: 0; transform: translateY(40px) scale(0.95); transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1); }
        .is-visible .pricing-card { opacity: 1; transform: translateY(0) scale(1); }
        .is-visible .pricing-card:nth-child(1) { transition-delay: 0.8s; }
        .is-visible .pricing-card:nth-child(2) { transition-delay: 1.0s; }
        .is-visible .pricing-card:nth-child(3) { transition-delay: 1.2s; }
        
        /* Card layout */
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; align-items: stretch; }
        .pricing-card { display: flex; flex-direction: column; height: 100%; }
        .card-content { flex: 1; display: flex; flex-direction: column; }
        .features-list { flex-grow: 1; margin-bottom: 2rem; }
        .button-container { margin-top: auto; }
        
        /* 3D Primary Button Effect */
        .pricing-btn-primary-compact {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #f97316, #fb923c);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: perspective(1000px) rotateX(0deg) translateZ(0);
          box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.3), 0 10px 10px -5px rgba(249, 115, 22, 0.04);
          width: 100%;
        }
        .pricing-btn-primary-compact::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease-in-out;
        }
        .pricing-btn-primary-compact:hover {
          transform: perspective(1000px) rotateX(-10deg) translateY(-2px) translateZ(0);
          box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.4), 0 15px 25px -5px rgba(249, 115, 22, 0.1);
          background: linear-gradient(45deg, #ea580c, #f97316);
        }
        .pricing-btn-primary-compact:hover::before { left: 100%; }
        .pricing-btn-primary-compact:active { transform: perspective(1000px) rotateX(0deg) translateY(0px) translateZ(0); transition: transform 0.1s ease; }
        
        /* Secondary Button Effect */
        .pricing-btn-secondary {
          position: relative;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 12px;
          color: #f97316;
          font-weight: 600;
          font-size: 1rem;
          padding: 12px 24px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
          background-clip: padding-box;
          width: 100%;
        }
        .pricing-btn-secondary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, #f97316, #fb923c, #fdba74, #f97316);
          background-size: 300% 300%;
          border-radius: 12px;
          z-index: -2;
          animation: pricing-gradientShift 3s ease infinite;
        }
        .pricing-btn-secondary::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          background: #000;
          border-radius: 10px;
          z-index: -1;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
        }
        .pricing-btn-secondary:hover {
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(249, 115, 22, 0.3);
        }
        .pricing-btn-secondary:hover::after { background: transparent; }
        
        /* Enhanced card hover effects */
        .card-hover { transition: all 0.3s ease; }
        .card-hover:not(.popular-card):hover { border-color: rgba(249, 115, 22, 0.6); transform: translateY(-5px); }
        .popular-card { border-color: #f97316; box-shadow: 0 0 40px rgba(249, 115, 22, 0.4); }
        
        @keyframes pricing-gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        }
        @media (max-width: 640px) {
          .pricing-btn-primary-compact, .pricing-btn-secondary { font-size: 0.9rem; padding: 10px 20px; }
        }
      `}</style>

      <section ref={sectionRef} id="pricing" className={`pricing-section min-h-screen py-20 px-4 ${isVisible ? 'is-visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="animate-header text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
            Pricing Plans
          </h2>
          <p className="animate-subtitle text-center text-gray-400 mb-16 text-lg">
            Flexible plans to match your learning goals
          </p>

          <div className="animate-grid pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card card-hover relative bg-black/50 backdrop-blur-sm rounded-2xl p-8 border transition-all ${plan.popular
                  ? 'popular-card'
                  : 'border-orange-500/30'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-sm font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="card-content">
                  <h3 className="text-2xl font-bold mb-2 text-orange-400">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>

                  <ul className="features-list space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="button-container">
                    <a
                      href={plan.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        plan.popular
                          ? "pricing-btn-primary-compact"
                          : "pricing-btn-secondary"
                      }
                      style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                    >
                      Book a Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
