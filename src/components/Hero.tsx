import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Music, Trophy, Sparkles, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const Hero = ({ scrollToSection }: HeroProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [rotatingTextWidth, setRotatingTextWidth] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Array of phrases to rotate through
  const rotatingWords = [
    '& Become a Pro DJ in just 30 hours',
    '& Become Club-Ready in 30 hours',
    '& Master DJing with a 30-hour intensive program',
    'Now Learn DJing, Mixing & Performance in 30 hours',
    '& Fast-track your DJ journey go live in 30 hours',
    '& Step into the DJ booth in just 30 hours'
  ];

  // Trigger entrance animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Function to calculate text width with more precision
  const calculateTextWidth = (text: string) => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      // Use the exact font properties from CSS clamp
      const fontSize = Math.min(Math.max(window.innerWidth * 0.06, 32), 67.2); // Convert clamp(2rem, 6vw, 4.2rem)
      context.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
      const metrics = context.measureText(text);
      return Math.ceil(metrics.width) + 10; // Add small buffer for safety
    }

    return 0;
  };

  // Pre-calculate all widths for smoother transitions
  useEffect(() => {
    const widths = rotatingWords.map(word => calculateTextWidth(word));
    const currentWidth = widths[currentWordIndex];
    setRotatingTextWidth(currentWidth);
  }, [currentWordIndex, rotatingWords]);

  useEffect(() => {
    const FADE_DURATION = 800; // Slightly faster for smoother feel
    const WORD_CHANGE_INTERVAL = 3000; // Increased for better readability

    const wordChangeTimeout = setInterval(() => {
      // Start fade out
      setFadeClass('fade-out');

      // Change word after fade out completes
      setTimeout(() => {
        setCurrentWordIndex(prevIndex => (prevIndex + 1) % rotatingWords.length);
        // Start fade in immediately after word change
        setTimeout(() => {
          setFadeClass('fade-in');
        }, 50); // Small delay to ensure DOM update
      }, FADE_DURATION / 2);

    }, WORD_CHANGE_INTERVAL);

    return () => {
      clearInterval(wordChangeTimeout);
    };
  }, [rotatingWords.length]);

  return (
    <>
      <style>{`
        /* Page entrance animation - slide down from top */
        .hero-entrance {
          opacity: 0;
          transform: translateY(-50px);
          transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .hero-entrance.loaded {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Staggered animation for child elements */
        .stagger-1 {
          opacity: 0;
          transform: translateY(-30px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          transition-delay: 0.2s;
        }
        
        .stagger-2 {
          opacity: 0;
          transform: translateY(-30px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          transition-delay: 0.4s;
        }
        
        .stagger-3 {
          opacity: 0;
          transform: translateY(-30px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          transition-delay: 0.6s;
        }
        
        .stagger-4 {
          opacity: 0;
          transform: translateY(-30px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          transition-delay: 0.8s;
        }
        
        .loaded .stagger-1,
        .loaded .stagger-2,
        .loaded .stagger-3,
        .loaded .stagger-4 {
          opacity: 1;
          transform: translateY(0);
        }

        /* Ultra-smooth animations with optimized cubic-bezier curves */
        .fade-in {
          opacity: 1;
          transform: translateY(0px) scale(1);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .fade-out {
          opacity: 0;
          transform: translateY(-12px) scale(0.98);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        /* Ultra-smooth rotating text container */
        .rotating-text {
          display: inline-block;
          min-height: 1.2em;
          text-align: center;
          vertical-align: top;
          white-space: normal;
          overflow: visible;
          line-height: 1.2;
          /* Ultra-smooth width transition with custom easing */
          transition: all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: width, transform;
          transform: translateZ(0); /* Hardware acceleration */
        }
        
        /* Desktop: prevent wrapping */
        @media (min-width: 640px) {
          .rotating-text {
            white-space: nowrap;
          }
        }

        /* Mobile-specific headline container with line break */
        .headline-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          /* Smooth container adjustments */
          transition: all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
          transform: translateZ(0);
        }
        
        /* Mobile responsive headline - wrap "Learn to become a" to new line */
        @media (max-width: 640px) {
          .headline-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.25rem;
          }
          
          .headline-prefix {
            display: block;
            width: 100%;
            text-align: center;
          }
          
          .headline-dynamic {
            display: block;
            width: 100%;
            text-align: center;
          }
        }

        /* Enhanced gradient with smoother animation */
        .gradient-text {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ffd23f 50%, #ff8c42 75%, #ff6b35 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlowSmooth 6s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          will-change: background-position;
        }

        @keyframes gradientFlowSmooth {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 200% 50%; }
          75% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Hero section with optimized performance and added top margin */
        .hero-section {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 0.2rem 2rem; /* Increased top padding for more margin */
          overflow-x: hidden;
          /* Smooth scrolling performance */
          will-change: transform;
          transform: translateZ(0);
        }

        /* Content Layout */
        .main-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 0.1rem;
        }

        /* Ultra-smooth stats cards - Desktop layout (4 cards in one row) */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 3rem auto 0;
        }

        .stat-card {
          position: relative;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(0, 0, 0, 0.3));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(249, 115, 22, 0.3);
          border-radius: 24px;
          padding: 2rem 1.5rem;
          text-align: center;
          overflow: hidden;
          /* Ultra-smooth hover transitions */
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 
                      0 0 0 1px rgba(249, 115, 22, 0.1) inset;
        }
        
        /* Glowing effect behind stat cards */
        .stat-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.3), transparent 70%);
          filter: blur(20px);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 0;
        }
        
        .stat-card:hover .stat-glow {
          opacity: 1;
        }
        
        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(249, 115, 22, 0.6);
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.4),
                      0 0 0 1px rgba(249, 115, 22, 0.3) inset,
                      0 0 40px rgba(249, 115, 22, 0.2);
        }

        /* Mobile-first responsive stats cards - 2x2 GRID FOR BETTER MOBILE ALIGNMENT */
        @media (max-width: 768px) {
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-top: 2rem;
            padding: 0 1rem;
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            gap: 0.75rem;
            padding: 0 1rem;
          }
        }
        
        /* Mobile-specific card styling */
        @media (max-width: 768px) {
          .stat-card {
            background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(0, 0, 0, 0.3));
            backdrop-filter: blur(10px);
            border: 1px solid rgba(249, 115, 22, 0.2);
            border-radius: 16px;
            padding: 1rem 0.5rem;
            box-shadow: none;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100px;
          }

          .stat-card .text-3xl {
            font-size: 1.75rem !important;
            margin-bottom: 0.25rem !important;
          }
        }

        /* Compact mobile layout */
        @media (max-width: 480px) {
          .stats-grid {
            gap: 0.5rem;
            padding: 0 0.5rem;
          }
          
          .stat-card {
            padding: 0.75rem 0.25rem;
            min-height: 90px;
          }
          
          .stat-card .text-3xl {
            font-size: 1.5rem !important;
          }
          
          .stat-card .text-gray-300 {
            font-size: 0.75rem;
          }
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .stat-card:hover {
          transform: translateY(-6px) translateZ(0);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 107, 53, 0.4);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(255, 107, 53, 0.2);
        }

        .stat-card:hover::before {
          left: 100%;
        }

        /* Ultra-smooth icon animations */
        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .icon-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 107, 53, 0.2);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, border-color, box-shadow;
          transform: translateZ(0);
        }

        .icon-wrapper:hover {
          transform: translateY(-4px) rotate(8deg) translateZ(0);
          border-color: rgba(255, 107, 53, 0.6);
          box-shadow: 0 12px 24px rgba(255, 107, 53, 0.25);
        }

        /* Enhanced Typography with smooth scaling */
        .main-headline {
          font-size: clamp(2rem, 6vw, 4.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          color: #ffffff;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          /* Smooth text scaling */
          transition: font-size 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .sub-headline {
          font-size: clamp(1.4rem, 3.5vw, 2.6rem);
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #ff6b35 50%, #ffd23f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          transition: font-size 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .tagline {
          font-size: 1.3rem;
          font-weight: 600;
          color: #ff8c42;
          margin-bottom: 0.8rem;
          text-shadow: 0 2px 10px rgba(255, 107, 53, 0.3);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .description {
          font-size: 1.1rem;
          color: #cbd5e1;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 2rem;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Content Center */
        .content-center {
          text-align: center;
          margin-bottom: 2rem;
        }

        /* Ultra-smooth buttons */
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
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: perspective(1000px) rotateX(0deg) translateZ(0);
          box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.3),
                      0 10px 10px -5px rgba(249, 115, 22, 0.04);
          will-change: transform, box-shadow, background;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .btn-primary:hover {
          transform: perspective(1000px) rotateX(-10deg) translateY(-3px) translateZ(0);
          box-shadow: 0 25px 50px -10px rgba(249, 115, 22, 0.4),
                      0 20px 30px -5px rgba(249, 115, 22, 0.1);
          background: linear-gradient(45deg, #ea580c, #f97316);
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:active {
          transform: perspective(1000px) rotateX(0deg) translateY(0px) translateZ(0);
          transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .btn-secondary {
          position: relative;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 12px;
          color: #f97316;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 14px 30px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background-clip: padding-box;
          will-change: transform, color, box-shadow;
          transform: translateZ(0);
        }

        .btn-secondary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, #f97316, #fb923c, #fdba74, #f97316);
          background-size: 400% 400%;
          border-radius: 12px;
          z-index: -2;
          animation: gradientShiftSmooth 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }

        .btn-secondary::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          background: #000;
          border-radius: 10px;
          z-index: -1;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .btn-secondary:hover {
          color: white;
          transform: translateY(-3px) translateZ(0);
          box-shadow: 0 18px 35px -5px rgba(249, 115, 22, 0.3);
        }

        .btn-secondary:hover::after {
          background: transparent;
        }

        @keyframes gradientShiftSmooth {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 200% 50%; }
          75% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Responsive Design with smooth scaling */
        @media (max-width: 768px) {
          .icon-container {
            gap: 1.5rem;
          }
          .icon-wrapper {
            width: 50px;
            height: 50px;
          }
          .hero-section {
            min-height: 70vh;
            padding: 7rem 0.1rem 1.5rem; /* Adjusted for mobile */
          }
        }

        @media (max-width: 640px) {
          .btn-primary,
          .btn-secondary {
            font-size: 1rem;
            padding: 14px 28px;
            width: 100%;
            max-width: 280px;
          }
          .hero-section {
            min-height: 65vh;
            padding: 6rem 0.05rem 1rem; /* Adjusted for small mobile */
          }
        }

        /* Prefers-reduced-motion support for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .gradient-text {
            animation: none;
          }
          
          .btn-secondary::before {
            animation: none;
          }
          
          .hero-entrance,
          .stagger-1,
          .stagger-2,
          .stagger-3,
          .stagger-4 {
            transition: none;
          }
        }
      `}</style>

      <section id="home" className={`hero-section hero-entrance ${isLoaded ? 'loaded' : ''}`}>
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Radial gradients for depth */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-500/20 via-orange-600/10 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-red-500/15 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-orange-400/15 to-transparent blur-3xl"></div>
        </div>

        <div className="main-content">
          {/* Floating Icons - Repositioned */}
          <div className={`absolute top-0 left-0 right-0 flex justify-center gap-8 sm:gap-12 md:gap-16 opacity-30 stagger-1`}>
            <div className="icon-wrapper">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-400" />
            </div>
            <div className="icon-wrapper">
              <Music className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-400" />
            </div>
            <div className="icon-wrapper">
              <Trophy className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-400" />
            </div>
            <div className="icon-wrapper">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-400" />
            </div>
          </div>

          {/* Main Content - No Container */}
          <div className={`content-center stagger-2 mt-16 sm:mt-14 md:mt-16 px-4 sm:px-6`}>
            {/* Ultra-smooth dynamic headline */}
            <div className="headline-container" style={{ flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
              <h1 className="text-3xl sm:text-6xl font-bold text-white px-2 leading-relaxed" style={{ textAlign: 'center', marginBottom: '0.5rem', wordBreak: 'break-word', hyphens: 'auto' }}>
                <span className="headline-prefix">You Always wanted to Learn&nbsp;DJing</span>
              </h1>
              <h2 className="text-xl sm:text-4xl font-bold px-2 w-full leading-relaxed" style={{ textAlign: 'center', wordBreak: 'break-word', hyphens: 'auto' }}>
                <span className="headline-dynamic w-full" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span
                    className={`rotating-text gradient-text ${fadeClass}`}
                    style={{
                      width: window.innerWidth > 640 && rotatingTextWidth ? `${rotatingTextWidth}px` : 'auto',
                      minWidth: window.innerWidth > 640 && rotatingTextWidth ? `${rotatingTextWidth}px` : 'auto',
                      textAlign: 'center',
                      maxWidth: '100%'
                    }}
                  >
                    {rotatingWords[currentWordIndex]}
                  </span>
                </span>
              </h2>
            </div>

            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-400 font-semibold px-2 mt-6 sm:mt-4" style={{ textAlign: 'center' }}>
              with 30+ Professional Lessons
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white px-2 mt-8 sm:mt-6 leading-relaxed" style={{ textAlign: 'center' }}>
              Unlock Your Musical Potential
            </p>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 px-6 sm:px-4 mt-6 sm:mt-4 leading-relaxed" style={{ maxWidth: '700px', margin: '1.5rem auto 0', textAlign: 'center' }}>
              Learn the art and science of DJing, music creation, mixing, and performance with a structured curriculum trusted by 2,000+ students worldwide just in 30 Hours.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0 mt-10 sm:mt-8">
              <button
                onClick={() => scrollToSection('pricing')}
                className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
              >
                Start Learning Today
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => scrollToSection('courses')}
                className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                Explore Courses
              </button>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className={`stats-grid stagger-4 px-4 sm:px-6`} style={{ marginTop: '3rem sm:4rem md:5rem' }}>
            <div className="stat-card">
              <div className="stat-glow"></div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400 mb-2 relative z-10">20K+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300 font-medium relative z-10">Active Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-glow"></div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400 mb-2 relative z-10">2K+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300 font-medium relative z-10">Students Trained</div>
            </div>
            <div className="stat-card">
              <div className="stat-glow"></div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400 mb-2 relative z-10">600+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300 font-medium relative z-10">Professional Lessons</div>
            </div>
            <div className="stat-card">
              <div className="stat-glow"></div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400 mb-2 relative z-10">95%</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300 font-medium relative z-10">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
