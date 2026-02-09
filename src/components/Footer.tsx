import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Youtube, Radio } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram.com',
      label: 'Instagram'
    },
    {
      icon: Youtube,
      href: 'https://youtube.com',
      label: 'YouTube'
    },
    {
      icon: Radio,
      href: 'https://spotify.com',
      label: 'Spotify'
    }
  ];

  return (
    <footer className="py-12 px-4 border-t border-orange-500/20 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              SoundKraft DJ Academy
            </span>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-500 text-sm">
              © 2025 SoundKraft DJ Academy. All rights reserved.
            </p>
            <Link
              to="/terms-and-conditions"
              className="text-gray-500 text-sm hover:text-orange-500 transition-colors"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
