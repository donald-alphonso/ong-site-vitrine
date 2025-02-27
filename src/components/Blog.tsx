import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    title: 'Nouveau programme de soutien scolaire lancé',
    excerpt: "Nous sommes ravis d'annoncer le lancement de notre nouveau programme de soutien scolaire qui aidera plus de 50 enfants cette année. Notre équipe pédagogique a développé une approche personnalisée pour chaque élève.",
    date: '15 Janvier 2024',
    author: 'Équipe pédagogique',
    category: 'Éducation',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '5 min',
  },
  {
    id: '3e7c3f6d-9db0-4017-a011-d4ab0e29a3c7',
    title: 'Succès de notre campagne de collecte de fonds',
    excerpt: "Grâce à votre générosité, nous avons dépassé notre objectif de collecte de fonds pour la rénovation du centre d'accueil. Les travaux pourront commencer dès le mois prochain pour offrir un meilleur cadre à nos bénéficiaires.",
    date: '10 Janvier 2024',
    author: 'Équipe de direction',
    category: 'Collecte de fonds',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '3 min',
  },
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    title: 'Partenariat avec des entreprises locales',
    excerpt: 'De nouvelles opportunités de formation professionnelle grâce à nos partenariats avec des entreprises de la région. Ces collaborations ouvrent des perspectives d\'emploi prometteuses pour nos jeunes.',
    date: '5 Janvier 2024',
    author: 'Service partenariats',
    category: 'Partenariats',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '4 min',
  },
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    title: 'Lancement du programme de mentorat',
    excerpt: 'Un nouveau programme qui met en relation nos jeunes avec des professionnels expérimentés pour un accompagnement personnalisé. Plus de 20 mentors sont déjà engagés dans cette initiative.',
    date: '1 Janvier 2024',
    author: 'Service formation',
    category: 'Formation',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '6 min',
  }
];

export function Blog() {
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const hasMorePosts = blogPosts.length > 3;
  
  const handleToggleArticles = () => {
    setIsTransitioning(true);
    setShowAllArticles(!showAllArticles);

    if (showAllArticles) {
      const element = document.getElementById('blog');
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
    <section id="blog" className="py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
          Actualités
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className={`block group transform transition-all duration-500 ease-in-out
                ${index >= 3 
                  ? (showAllArticles 
                    ? 'opacity-100 translate-y-0 h-auto' 
                    : 'opacity-0 translate-y-8 pointer-events-none absolute -z-10')
                  : 'opacity-100 translate-y-0'}
              `}
            >
              <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-4">
                      <i className="far fa-calendar mr-2"></i>
                      {post.date}
                    </span>
                    <span>
                      <i className="far fa-clock mr-2"></i>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Par {post.author}
                    </span>
                    <span className="text-red-500 group-hover:text-red-600 font-medium">
                      Lire la suite →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {hasMorePosts && (
          <div className="text-center mt-8">
            <button
              onClick={handleToggleArticles}
              disabled={isTransitioning}
              className={`bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 inline-flex items-center space-x-2
                ${isTransitioning ? 'opacity-75 cursor-wait' : 'opacity-100'}
              `}
            >
              <span>{showAllArticles ? 'Voir moins' : 'Voir tous les articles'}</span>
              <span className={`text-xl transition-transform duration-300 ${showAllArticles ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
