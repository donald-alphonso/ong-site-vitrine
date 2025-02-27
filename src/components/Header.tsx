import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center transform transition-transform duration-300 hover:scale-105">
            <Heart className="h-8 w-8 text-red-500 animate-pulse" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              God's Hand
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group">
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#mission" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group">
              Notre Mission
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#programs" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group">
              Programmes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group">
              Témoignages
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#blog" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button className="bg-red-500 text-white px-6 py-2 rounded-md transition-all duration-300 transform hover:bg-red-600 hover:scale-105 hover:shadow-lg active:scale-95">
              Faire un don
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="transition-transform duration-300 hover:scale-110"
            >
              {isOpen ? (
                <X className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm">
          <a href="#home" className="block px-3 py-2 text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md">
            Accueil
          </a>
          <a href="#mission" className="block px-3 py-2 text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md">
            Notre Mission
          </a>
          <a href="#programs" className="block px-3 py-2 text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md">
            Programmes
          </a>
          <a href="#testimonials" className="block px-3 py-2 text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md">
            Témoignages
          </a>
          <a href="#blog" className="block px-3 py-2 text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md">
            Blog
          </a>
          <a href="#contact" className="block px-3 py-2 text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md">
            Contact
          </a>
          <button className="w-full text-left bg-red-500 text-white px-3 py-2 rounded-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg active:scale-95">
            Faire un don
          </button>
        </div>
      </div>
    </nav>
  );
}
