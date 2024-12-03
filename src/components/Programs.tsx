export function Programs() {
  return (
    <section id="programs" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
          Nos Programmes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-lg">
            <img
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Education Program"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Programme educatif
              </h3>
              <p className="text-white">
                Accès à une éducation de qualité et soutien scolaire
                personnalisé.
              </p>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg">
            <img
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              src="https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Health Program"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Soins de Santé
              </h3>
              <p className="text-white">
                Suivi médical régulier et accès aux soins de santé essentiels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
