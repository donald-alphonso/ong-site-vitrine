import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              God's Hand
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-red-500">
              Accueil
            </a>
            <a href="#" className="text-gray-600 hover:text-red-500">
              Notre Mission
            </a>
            <a href="#" className="text-gray-600 hover:text-red-500">
              Programmes
            </a>
            <a href="#" className="text-gray-600 hover:text-red-500">
              Contact
            </a>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Faire un don
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-red-500"
            >
              Accueil
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-red-500"
            >
              Notre Mission
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-red-500"
            >
              Programmes
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-red-500"
            >
              Contact
            </a>
            <button className="w-full text-left bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600">
              Faire un don
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
