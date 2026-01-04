import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Courses from '../components/Courses';
import DiscoverAcademy from '../components/DiscoverAcademy';
import Features from '../components/Features'; // Add this import
import SectionDivider from '../components/SectionDivider';
import SuccessStories from '../components/SuccessStories';
import Pricing from '../components/Pricing';
import Bootcamp from '../components/Bootcamp';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'courses', 'popular-courses', 'discover', 'subscription', 'pricing', 'bootcamp', 'faq']; // Add 'subscription'
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-black -z-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[150px]"></div>
      </div>

      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />

      <SectionDivider />
      <Courses />

      <SectionDivider />
      <div id="discover">
        <DiscoverAcademy />
      </div>

      <SectionDivider />
      <div id="Features"> {/* Add section wrapper */}
        <Features />
      </div>

      <SectionDivider />
      <div id="SuccessStories"> {/* Add section wrapper */}
        <SuccessStories />
      </div>

      <SectionDivider />
      <Pricing />

      <SectionDivider />
      <Bootcamp />

      <SectionDivider />
      <FAQ />

      <Footer />
    </div>
  );
};

export default Home;
