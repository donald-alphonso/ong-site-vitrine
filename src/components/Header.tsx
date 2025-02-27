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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center transform transition-transform duration-300 hover:scale-105">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 animate-pulse" />
            <span className="ml-2 text-lg sm:text-xl font-bold text-gray-800 whitespace-nowrap">
              God's Hand
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <a href="#home" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group text-sm lg:text-base">
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#mission" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group text-sm lg:text-base">
              Notre Mission
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#programs" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group text-sm lg:text-base">
              Programmes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#gallery" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group text-sm lg:text-base">
              Galerie
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group text-sm lg:text-base">
              Témoignages
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#blog" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group text-sm lg:text-base">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-gray-600 transition-all duration-300 hover:text-red-500 hover:scale-105 relative group text-sm lg:text-base">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button className="bg-red-500 text-white px-4 lg:px-6 py-2 rounded-md text-sm lg:text-base transition-all duration-300 transform hover:bg-red-600 hover:scale-105 hover:shadow-lg active:scale-95 whitespace-nowrap">
              Faire un don
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-red-500 hover:bg-red-50 focus:outline-none transition-all duration-300"
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

      {/* Menu mobile */}
      <div 
        className={`md:hidden fixed inset-x-0 top-16 transition-all duration-300 ease-in-out transform ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-sm shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-2 space-y-1">
            <a 
              href="#home" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md"
            >
              Accueil
            </a>
            <a 
              href="#mission" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md"
            >
              Notre Mission
            </a>
            <a 
              href="#programs" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md"
            >
              Programmes
            </a>
            <a 
              href="#gallery" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md"
            >
              Galerie
            </a>
            <a 
              href="#testimonials" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md"
            >
              Témoignages
            </a>
            <a 
              href="#blog" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md"
            >
              Blog
            </a>
            <a 
              href="#contact" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 transition-all duration-300 hover:text-red-500 hover:bg-red-50 rounded-md"
            >
              Contact
            </a>
            <div className="mt-2 pb-2">
              <button className="w-full bg-red-500 text-white px-4 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-red-600 hover:shadow-lg active:scale-95">
                Faire un don
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
