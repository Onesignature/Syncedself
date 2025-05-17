import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/Logo.png" alt="SyncedSelf" className="h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="font-medium text-gray-700 hover:text-teal-600 transition-colors">Features</a>
          <a href="#how-it-works" className="font-medium text-gray-700 hover:text-teal-600 transition-colors">How It Works</a>
          <a href="#testimonials" className="font-medium text-gray-700 hover:text-teal-600 transition-colors">Testimonials</a>
          <a href="#pricing" className="font-medium text-gray-700 hover:text-teal-600 transition-colors">Pricing</a>
          <a href="#faq" className="font-medium text-gray-700 hover:text-teal-600 transition-colors">FAQ</a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => navigate('/login')} 
            className="font-medium text-teal-600 hover:text-teal-700 transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/signup')} 
            className="btn-primary"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${isScrolled ? 'bg-white' : 'bg-white/95'} shadow-lg absolute top-full left-0 right-0 py-4`}>
          <div className="container-custom flex flex-col space-y-4">
            <a 
              href="#features" 
              className="font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              className="font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#pricing" 
              className="font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className="font-medium text-gray-700 hover:text-teal-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="pt-2 flex flex-col space-y-3">
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/login');
                }} 
                className="font-medium text-teal-600 hover:text-teal-700 transition-colors py-2"
              >
                Log In
              </button>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/signup');
                }} 
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;