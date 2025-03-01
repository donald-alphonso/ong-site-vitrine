import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

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
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-white dark:bg-gray-900'
      }`}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center transform transition-transform duration-300 hover:scale-105">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 animate-pulse" aria-hidden="true" />
            <span className="ml-2 text-lg sm:text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
              God's Hand
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <a href="#home" className="text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:scale-105 relative group text-sm lg:text-base">
              {t('nav.home')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#mission" className="text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:scale-105 relative group text-sm lg:text-base">
              {t('nav.mission')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#programs" className="text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:scale-105 relative group text-sm lg:text-base">
              {t('nav.programs')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#gallery" className="text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:scale-105 relative group text-sm lg:text-base">
              {t('nav.gallery')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:scale-105 relative group text-sm lg:text-base">
              {t('nav.testimonials')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#blog" className="text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:scale-105 relative group text-sm lg:text-base">
              {t('nav.blog')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:scale-105 relative group text-sm lg:text-base">
              {t('nav.contact')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
              aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300 flex items-center"
              aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              <Globe className="w-5 h-5 mr-1" aria-hidden="true" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
              aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none transition-all duration-300"
              aria-expanded={isOpen}
              aria-label="Menu principal"
            >
              {isOpen ? (
                <X className="h-6 w-6 transform rotate-0 transition-transform duration-300" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6 transform rotate-0 transition-transform duration-300" aria-hidden="true" />
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
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
      >
        <div className="bg-white dark:bg-gray-900/95 backdrop-blur-sm shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-2 space-y-1">
            <a 
              href="#home" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              {t('nav.home')}
            </a>
            <a 
              href="#mission" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              {t('nav.mission')}
            </a>
            <a 
              href="#programs" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              {t('nav.programs')}
            </a>
            <a 
              href="#gallery" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              {t('nav.gallery')}
            </a>
            <a 
              href="#testimonials" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              {t('nav.testimonials')}
            </a>
            <a 
              href="#blog" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              {t('nav.blog')}
            </a>
            <a 
              href="#contact" 
              onClick={handleLinkClick}
              className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              {t('nav.contact')}
            </a>

            {/* Language Toggle Mobile */}
            <button
              onClick={() => {
                setLanguage(language === 'fr' ? 'en' : 'fr');
                handleLinkClick();
              }}
              className="w-full mt-2 px-3 py-2 text-left text-base font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-300 flex items-center"
              aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              <Globe className="w-5 h-5 mr-2" aria-hidden="true" />
              <span>{language === 'fr' ? 'English' : 'Français'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
