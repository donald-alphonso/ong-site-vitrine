import { Book, Heart, Home } from 'lucide-react';

export function Mission() {
  return (
    <>
      <section id="mission" className="py-20 bg-gray-50">
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
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Amour et Soins</h3>
              <p className="text-gray-600">
                Nous offrons un environnement familial chaleureux et aimant à
                chaque enfant.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                <Book className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-gray-600">
                Nous assurons une éducation de qualité pour préparer leur
                avenir.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                <Home className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Foyer Sûr</h3>
              <p className="text-gray-600">
                Nous fournissons un logement sûr et confortable pour chaque
                enfant.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
