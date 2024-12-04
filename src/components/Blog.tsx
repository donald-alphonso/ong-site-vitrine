interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Nouveau programme de soutien scolaire lancé',
    excerpt:
      "Nous sommes ravis d'annoncer le lancement de notre nouveau programme de soutien scolaire qui aidera plus de 50 enfants cette année.",
    date: '15 Janvier 2024',
    author: 'Équipe pédagogique',
    category: 'Éducation',
    imageUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Succès de notre campagne de collecte de fonds',
    excerpt:
      "Grâce à votre générosité, nous avons dépassé notre objectif de collecte de fonds pour la rénovation du centre d'accueil.",
    date: '10 Janvier 2024',
    author: 'Équipe de direction',
    category: 'Collecte de fonds',
    imageUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '3 min',
  },
  {
    id: 3,
    title: 'Partenariat avec des entreprises locales',
    excerpt:
      'De nouvelles opportunités de formation professionnelle grâce à nos partenariats avec des entreprises de la région.',
    date: '5 Janvier 2024',
    author: 'Service partenariats',
    category: 'Partenariats',
    imageUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    readTime: '4 min',
  },
];
export function Blog() {
  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
          Actualités
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
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
                <div className="flex items-center text-sm text-gra-600">
                  <span className="mr-4">
                    <i className="far fa-calendar mr-2"></i>
                    {post.date}
                  </span>
                  <span>
                    <i className="far fa-clock mr-2"></i>
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 hover:text-red-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Par {post.author}
                  </span>
                  <button className="text-red-500 hover:text-red-600 font-medium">
                    Lire la suite →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
            Voir tous les articles
          </button>
        </div>
      </div>
    </section>
  );
}
