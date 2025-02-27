import React, { useState } from 'react';
import { Book, Heart, Home } from 'lucide-react';

interface MissionItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const missionsList: MissionItem[] = [
  {
    id: '1',
    title: 'Amour et Soins',
    description: 'Nous offrons un environnement familial chaleureux et aimant à chaque enfant.',
    icon: <Heart className="h-8 w-8 text-red-500" />
  },
  {
    id: '2',
    title: 'Education',
    description: 'Nous assurons une éducation de qualité pour préparer leur avenir.',
    icon: <Book className="h-8 w-8 text-red-500" />
  },
  {
    id: '3',
    title: 'Foyer Sûr',
    description: 'Nous fournissons un logement sûr et confortable pour chaque enfant.',
    icon: <Home className="h-8 w-8 text-red-500" />
  }
  
];

export function Mission() {
  const [showAllMissions, setShowAllMissions] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const hasMoreMissions = missionsList.length > 3;
  const displayedMissions = showAllMissions ? missionsList : missionsList.slice(0, 3);

  const handleToggleMissions = () => {
    setIsTransitioning(true);
    setShowAllMissions(!showAllMissions);

    if (showAllMissions) {
      const element = document.getElementById('mission');
      const offset = element?.getBoundingClientRect().top ?? 0;
      const headerOffset = 80;
      const elementPosition = offset + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section id="mission" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Notre mission
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous nous engageons à fournir un environnement sûr, aimant et
            enrichissant pour les enfants qui en ont le plus besoin.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {displayedMissions.map((mission) => (
            <div
              key={mission.id}
              className="transform transition-all duration-500 ease-in-out opacity-100 translate-y-0"
            >
              <div 
                className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              >
                <div 
                  className="inline-block p-3 bg-red-100 rounded-full mb-4 transform transition-all duration-300 group-hover:scale-110 hover:bg-red-200"
                >
                  {mission.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 hover:text-red-500">
                  {mission.title}
                </h3>
                <p className="text-gray-600 transition-all duration-300 group-hover:text-gray-800">
                  {mission.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {hasMoreMissions && (
          <div className="text-center mt-8">
            <button
              onClick={handleToggleMissions}
              disabled={isTransitioning}
              className={`bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 inline-flex items-center space-x-2
                ${isTransitioning ? 'opacity-75 cursor-wait' : 'opacity-100'}
              `}
            >
              <span>{showAllMissions ? 'Voir moins' : 'Voir toutes nos missions'}</span>
              <span className={`text-xl transition-transform duration-300 ${showAllMissions ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
