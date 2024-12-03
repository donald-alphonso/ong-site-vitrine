import React from 'react';

export function Hero() {
  return (
    <div id="home" className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"),',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Donnons de l'espoir aux Enfants
          </h1>
          <p className="text-xl text-white mb-8">
            Ensemble, construisons un avenir meilleur pour les orphelins à
            travers l'amour, l'éducation et le soutien.
          </p>
          <div className="space-x-4">
            <button className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600">
              Faire un don
            </button>
            <button className="bg-white text-red-500 px-8 py-3 rounded-md hover:bg-gray-100">
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
