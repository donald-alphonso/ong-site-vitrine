import { Heart, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import React from 'react';

export function Footer() {
  const navigationLinks = [
    { name: 'Accueil', anchor: 'home' },
    { name: 'Notre Mission', anchor: 'mission' },
    { name: 'Galerie', anchor: 'gallery' },
    { name: 'Témoignages', anchor: 'testimonials' },
    { name: 'Blog', anchor: 'blog' },
    { name: 'Contact', anchor: 'contact' }
  ];

  const contactInfo = [
    { 
      icon: <MapPin className="h-5 w-5 text-red-500" />,
      text: "123 Rue de l'Espoir, Paris" 
    },
    { 
      icon: <Phone className="h-5 w-5 text-red-500" />,
      text: "+33 1 23 45 67 89" 
    },
    { 
      icon: <Mail className="h-5 w-5 text-red-500" />,
      text: "contact@godshand.org" 
    }
  ];

  return (
    <footer className="bg-gray-800 text-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo et Description */}
          <div className="transform transition-all duration-300 hover:translate-x-2">
            <div className="flex items-center mb-4 group">
              <Heart className="h-6 w-6 text-red-500 transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse" />
              <span className="ml-2 text-xl font-bold transition-colors duration-300 group-hover:text-red-500">
                God's Hand
              </span>
            </div>
            <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
              Ensemble, donnons de l'espoir et un avenir meilleur aux enfants
              dans le besoin.
            </p>
          </div>

          {/* Liens de Navigation */}
          <div className="transform transition-all duration-300 hover:translate-x-2">
            <h3 className="text-lg font-semibold mb-4 relative inline-block text-white">
              Liens Rapides
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name} className="transform transition-all duration-300 hover:translate-x-2">
                  <a
                    href={`#${link.anchor}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations de Contact */}
          <div className="transform transition-all duration-300 hover:translate-x-2">
            <h3 className="text-lg font-semibold mb-4 text-white">Nous Contacter</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-400 hover:text-gray-300 transition-colors duration-300">
                  {info.icon}
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
            &copy; {new Date().getFullYear()} God's Hand. Tous droits réservés.
          </p>
        </div>
      </div>
      
      {/* Effet de particules/vagues en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute w-96 h-96 bg-red-500 rounded-full -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-red-500 rounded-full -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>
    </footer>
  );
}
