import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Course {
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
}

const Courses = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const courses: Course[] = [
    {
      title: 'Personalized Live Demo',
      description: 'Experience a 1-on-1 live demo with our professional DJ trainers from the comfort of your home. Get a clear understanding of our teaching approach, tools, and course structure before enrolling.',
      price: '₹1,594 + GST',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: 'https://xbnojz.courses.store/708086?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp'
    },
    {
      title: 'For College Students & Kids',
      description: 'Learn DJing through 20 live one-hour sessions conducted in small groups with a 1:5 mentor-to-student ratio. This format ensures personalized attention, real-time feedback, and structured skill development guided by industry professionals.',
      price: '₹30,020 + GST',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: 'https://xbnojz.courses.store/730703?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp'
    },
    {
      title: 'Pro DJing – 1-on-1 Course',
      description: 'A fully personalized 1-on-1 online DJing program consisting of 30 live one-hour sessions. Designed for students seeking focused mentorship, flexible learning pace, and continuous real-time guidance from professional DJs.',
      price: '₹73520 + GST',
      image: 'https://images.pexels.com/photos/1481309/pexels-photo-1481309.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: 'https://xbnojz.courses.store/708909?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp'
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
      if (window.innerWidth < 768) return 2;
    }
    return 3;
  };

  const cardsPerSlide = getCardsPerSlide();
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % Math.ceil(courses.length / cardsPerSlide));
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + Math.ceil(courses.length / cardsPerSlide)) % Math.ceil(courses.length / cardsPerSlide));

  const getVisibleCourses = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return courses.slice(startIndex, startIndex + cardsPerSlide);
  };

  return (
    <>
      <style>{`
        .courses-section { transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1); }
        .animate-title { opacity: 0; transform: translateY(-50px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.2s; }
        .animate-subtitle { opacity: 0; transform: translateY(-30px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.4s; }
        .animate-cards-container { opacity: 0; transform: translateY(-30px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); transition-delay: 0.6s; }
        
        .is-visible .animate-title,
        .is-visible .animate-subtitle,
        .is-visible .animate-cards-container { opacity: 1; transform: translateY(0); }
        
        .course-card { opacity: 0; transform: translateY(30px) scale(0.95); transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); height: 100%; }
        .is-visible .course-card { opacity: 1; transform: translateY(0) scale(1); }
        .is-visible .course-card:nth-child(1) { transition-delay: 0.8s; }
        .is-visible .course-card:nth-child(2) { transition-delay: 1.0s; }
        .is-visible .course-card:nth-child(3) { transition-delay: 1.2s; }
        
        .course-card-content {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          border: 1px solid rgba(249, 115, 22, 0.3);
          transition: all 0.4s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .course-card-content:hover {
          border-color: rgba(249, 115, 22, 1);
          box-shadow: 0 0 30px rgba(249, 115, 22, 0.3);
          transform: translateY(-5px);
        }
        
        .course-image-container { height: 192px; overflow: hidden; flex-shrink: 0; }
        .course-content { padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1; }
        .course-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; color: #fb923c; line-height: 1.3; min-height: 2.6rem; }
        .course-description { color: #9ca3af; margin-bottom: 1rem; line-height: 1.5; flex-grow: 1; }
        .course-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
        .course-price { font-size: 1.875rem; font-weight: 700; color: white; }
        
        /* 3D Button Effect */
        .enroll-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #f97316, #fb923c);
          border: none;
          border-radius: 0.5rem;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: perspective(1000px) rotateX(0deg) translateZ(0);
          box-shadow: 0 6px 15px -3px rgba(249, 115, 22, 0.3), 0 4px 6px -2px rgba(249, 115, 22, 0.05);
          white-space: nowrap;
        }
        .enroll-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .enroll-button:hover {
          transform: perspective(1000px) rotateX(-8deg) translateY(-2px) translateZ(0);
          box-shadow: 0 15px 30px -5px rgba(249, 115, 22, 0.4), 0 10px 20px -2px rgba(249, 115, 22, 0.1);
          background: linear-gradient(45deg, #ea580c, #f97316);
        }
        .enroll-button:hover::before { left: 100%; }
        .enroll-button:active { transform: perspective(1000px) rotateX(0deg) translateY(0px) translateZ(0); transition: transform 0.1s; }
        .enroll-button { display: inline-block; text-decoration: none; text-align: center; }
        
        .nav-arrows { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; transition-delay: 1.4s; }
        .is-visible .nav-arrows { opacity: 1; transform: translateY(0); }
        .indicators { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; transition-delay: 1.6s; }
        .is-visible .indicators { opacity: 1; transform: translateY(0); }
        
        .nav-button {
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
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .nav-button:hover:not(:disabled) {
          background: rgba(249, 115, 22, 1);
          border-color: rgba(249, 115, 22, 1);
          box-shadow: 0 8px 25px rgba(249, 115, 22, 0.25);
          transform: translateY(-2px);
        }
        .nav-button:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .indicator-dot { width: 12px; height: 12px; border-radius: 50%; transition: all 0.3s ease; cursor: pointer; }
        .indicator-dot.active { background-color: #f97316; transform: scale(1.2); }
        .indicator-dot:not(.active) { background-color: #6b7280; }
        .indicator-dot:not(.active):hover { background-color: #9ca3af; transform: scale(1.1); }
        
        @media (max-width: 768px) {
          .course-title { font-size: 1.25rem; min-height: 2.5rem; }
          .course-price { font-size: 1.5rem; }
          .enroll-button { font-size: 0.8rem; padding: 0.4rem 0.8rem; }
        }
      `}</style>

      <section ref={sectionRef} id="courses" className={`courses-section min-h-screen py-20 px-4 ${isVisible ? 'is-visible' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="animate-title text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent px-4">
            Our Courses
          </h2>
          <p className="animate-subtitle text-center text-gray-400 mb-12 sm:mb-16 text-base sm:text-lg px-4">
            Choose the perfect course to start your DJ journey
          </p>

          <div className="animate-cards-container relative px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {getVisibleCourses().map((course, index) => (
                <div key={index} className="course-card">
                  <div className="course-card-content group">
                    <div className="course-image-container">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="course-content">
                      <h3 className="course-title text-xl sm:text-2xl">{course.title}</h3>
                      <p className="course-description text-sm sm:text-base">{course.description}</p>
                      <div className="course-footer">
                        <span className="course-price text-2xl sm:text-3xl">{course.price}</span>
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="enroll-button text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">Enroll Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cardsPerSlide < courses.length && (
              <div className="nav-arrows">
                <button onClick={prevSlide} className="nav-button absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 sm:hidden" disabled={currentSlide === 0}>
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="nav-button absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 sm:hidden" disabled={currentSlide >= Math.ceil(courses.length / cardsPerSlide) - 1}>
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {cardsPerSlide < courses.length && (
            <div className="indicators flex justify-center mt-8 space-x-2 sm:hidden">
              {Array.from({ length: Math.ceil(courses.length / cardsPerSlide) }).map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`indicator-dot ${currentSlide === index ? 'active' : ''}`} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;
