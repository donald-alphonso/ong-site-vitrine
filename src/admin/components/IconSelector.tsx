import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, LucideProps } from 'lucide-react';

interface IconSelectorProps {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({ selectedIcon, onSelectIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Obtenir tous les noms d'icônes de Lucide
  const iconNames = Object.keys(LucideIcons).filter(
    (key) => key !== 'createLucideIcon' && key !== 'default'
  );

  // Filtrer les icônes en fonction du terme de recherche
  const filteredIcons = iconNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SelectedIcon = LucideIcons[selectedIcon as keyof typeof LucideIcons] as React.FC<LucideProps> || LucideIcons.HelpCircle

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {SelectedIcon && <SelectedIcon size={24} />}
        <span>{selectedIcon || 'Sélectionner une icône'}</span>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-96 max-h-96 bg-white border rounded-md shadow-lg mt-1 overflow-hidden">
          <div className="p-2 border-b sticky top-0 bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une icône..."
                className="w-full pl-8 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 p-2 overflow-y-auto max-h-80">
            {filteredIcons.map((name) => {
              const Icon = LucideIcons[name as keyof typeof LucideIcons] as React.FC<LucideProps>;
              return (
                <div
                  key={name}
                  className={`flex flex-col items-center p-2 rounded-md cursor-pointer hover:bg-gray-50 ${
                    selectedIcon === name ? 'bg-blue-50 border border-blue-200' : ''
                  }`}
                  onClick={() => {
                    onSelectIcon(name);
                    setIsOpen(false);
                  }}
                >
                  <Icon size={24} />
                  <span className="text-xs mt-1 text-center truncate w-full">
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default IconSelector;
