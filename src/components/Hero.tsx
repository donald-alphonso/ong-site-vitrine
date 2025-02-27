import React from 'react';

export function Hero() {
  const handleLearnMore = () => {
    const missionSection = document.getElementById('mission');
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl transform transition-all duration-700 hover:scale-105">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Donnons de l'espoir aux Enfants
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-in delay-300">
            Ensemble, construisons un avenir meilleur pour les orphelins à
            travers l'amour, l'éducation et le soutien.
          </p>
          <div className="animate-fade-in delay-500">
            <button 
              onClick={handleLearnMore}
              className="bg-white text-red-500 px-8 py-3 rounded-md transition-all duration-300 transform hover:bg-gray-100 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
