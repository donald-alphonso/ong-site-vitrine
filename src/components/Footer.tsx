import { Heart, Send, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription à la newsletter
    setEmail('');
  };

  return (
    <footer className="bg-gray-800 text-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
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
          <div className="transform transition-all duration-300 hover:translate-x-2">
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Liens Rapides
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </h3>
            <ul className="space-y-2">
              {['Accueil', 'Notre Mission', 'Programmes', 'Témoignages', 'Blog', 'Contact'].map((item) => (
                <li key={item} className="transform transition-all duration-300 hover:translate-x-2">
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="transform transition-all duration-300 hover:translate-x-2">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4 transition-colors duration-300 hover:text-gray-300">
              Inscrivez-vous pour recevoir nos actualités.
            </p>
            <form onSubmit={handleSubmit} className="flex group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-l-md text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              />
              <button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="bg-red-500 px-4 py-2 rounded-r-md transition-all duration-300 hover:bg-red-600 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <span>S'inscrire</span>
                <Send 
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isHovered ? 'translate-x-1 -translate-y-1' : ''
                  }`}
                />
              </button>
            </form>
          </div>
        </div>
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
