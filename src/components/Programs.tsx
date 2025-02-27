import React, { useState } from 'react';

interface Program {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const programsList: Program[] = [
  {
    id: '1',
    title: 'Programme éducatif',
    description: 'Accès à une éducation de qualité et soutien scolaire personnalisé.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '2',
    title: 'Soins de Santé',
    description: 'Suivi médical régulier et accès aux soins de santé essentiels.',
    imageUrl: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

export function Programs() {
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const hasMorePrograms = programsList.length > 2;
  const displayedPrograms = showAllPrograms ? programsList : programsList.slice(0, 2);

  const handleTogglePrograms = () => {
    setIsTransitioning(true);
    setShowAllPrograms(!showAllPrograms);

    if (showAllPrograms) {
      const element = document.getElementById('programs');
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
    <section id="programs" className="py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
          Nos Programmes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {displayedPrograms.map((program) => (
            <div
              key={program.id}
              className="transform transition-all duration-500 ease-in-out opacity-100 translate-y-0"
            >
              <div 
                className="relative group overflow-hidden rounded-lg cursor-pointer transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl"
              >
                <img
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  src={program.imageUrl}
                  alt={program.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6 transform transition-all duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-red-400">
                    {program.title}
                  </h3>
                  <p className="text-white transform transition-all duration-300 opacity-90 group-hover:opacity-100">
                    {program.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMorePrograms && (
          <div className="text-center mt-8">
            <button
              onClick={handleTogglePrograms}
              disabled={isTransitioning}
              className={`bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 inline-flex items-center space-x-2
                ${isTransitioning ? 'opacity-75 cursor-wait' : 'opacity-100'}
              `}
            >
              <span>{showAllPrograms ? 'Voir moins' : 'Voir tous les programmes'}</span>
              <span className={`text-xl transition-transform duration-300 ${showAllPrograms ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
