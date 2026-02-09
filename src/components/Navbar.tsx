import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const Navbar = ({ activeSection, scrollToSection }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'bootcamp', label: 'Guarantee' },
    { id: 'faq', label: 'FAQ' }
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Add the 3D button effect styles */}
      <style>{`
        .btn-3d-navbar {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #f97316, #fb923c);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: perspective(1000px) rotateX(0deg);
          box-shadow: 0 8px 20px -4px rgba(249, 115, 22, 0.4),
                      0 4px 8px -2px rgba(249, 115, 22, 0.1);
        }

        .btn-3d-navbar::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease-in-out;
        }

        .btn-3d-navbar:hover {
          transform: perspective(1000px) rotateX(-8deg) translateY(-1px);
          box-shadow: 0 15px 30px -6px rgba(249, 115, 22, 0.5),
                      0 8px 15px -3px rgba(249, 115, 22, 0.2);
          background: linear-gradient(45deg, #ea580c, #f97316);
        }

        .btn-3d-navbar:hover::before {
          left: 100%;
        }

        .btn-3d-navbar:active {
          transform: perspective(1000px) rotateX(0deg) translateY(0px);
          transition: transform 0.1s ease;
        }

        /* Mobile version with slightly reduced effect */
        @media (max-width: 768px) {
          .btn-3d-navbar:hover {
            transform: perspective(1000px) rotateX(-5deg) translateY(-1px);
          }
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                SoundKraft DJ Academy
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`capitalize transition-colors ${activeSection === item.id ? 'text-orange-500' : 'text-gray-300 hover:text-orange-400'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              {/* Show Login link when signed out, UserButton when signed in */}
              <SignedOut>
                <Link to="/signin" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Login
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </SignedIn>
              {/* Enhanced Get Started button with 3D effect */}
              <button
                onClick={() => scrollToSection('pricing')}
                className="btn-3d-navbar px-6 py-2"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-orange-500 hover:text-orange-400 focus:outline-none transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-orange-500/20">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full text-left capitalize text-gray-300 hover:text-orange-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              {/* Show Login link when signed out, UserButton when signed in */}
              <SignedOut>
                <Link to="/signin" className="block w-full text-left text-gray-300 hover:text-orange-400 transition-colors">
                  Login
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-3">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10"
                      }
                    }}
                  />
                  <span className="text-gray-300">My Account</span>
                </div>
              </SignedIn>
              {/* Enhanced mobile Get Started button */}
              <button
                onClick={() => scrollToSection('pricing')}
                className="btn-3d-navbar w-full px-6 py-2"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
