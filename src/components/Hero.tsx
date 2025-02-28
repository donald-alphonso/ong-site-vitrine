import React from 'react';

export function Hero() {
  const handleLearnMore = () => {
    const missionSection = document.getElementById('mission');
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroImage = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          src={heroImage}
          alt="Children playing"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
          Donnons de l'espoir aux Enfants
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 animate-slide-up">
          Ensemble, construisons un avenir meilleur pour les orphelins à travers l'amour, l'éducation et le soutien.
        </p>
        <button
          onClick={handleLearnMore}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-all duration-300 animate-slide-up"
        >
          En savoir plus
        </button>
      </div>
    </section>
  );
}
