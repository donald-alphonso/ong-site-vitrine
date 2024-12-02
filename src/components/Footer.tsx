import { Heart } from 'lucide-react';
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="ml-2 text-xl font-bold">God's Hand</span>
            </div>
            <p className="text-gray-400">
              Ensemble, donnons de l'espoir et un avenir meilleur aux enfants
              dans le besoin.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Notre Mission
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Programmes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Inscrivez-vous pour recevoir nos actualités.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-l-md text-gray-800"
              />
              <button className="bg-red-500 px-4 py-2 rounded-r-md hover:bg-red-600">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} God's Hand. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
