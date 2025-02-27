import React, { useState, useMemo } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Distribution de Fournitures',
    description: 'Distribution de fournitures scolaires aux enfants défavorisés',
    category: 'Éducation'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Aide aux Devoirs',
    description: 'Séance d\'aide aux devoirs avec nos bénévoles',
    category: 'Éducation'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Distribution Alimentaire',
    description: 'Distribution de repas et de provisions aux familles dans le besoin',
    category: 'Aide alimentaire'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Formation Professionnelle',
    description: 'Atelier de formation professionnelle pour les jeunes',
    category: 'Formation'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Bibliothèque Mobile',
    description: 'Notre bibliothèque mobile apportant la lecture aux enfants',
    category: 'Éducation'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Distribution de Vêtements',
    description: 'Distribution de vêtements aux familles nécessiteuses',
    category: 'Aide matérielle'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Soutien Scolaire',
    description: 'Programme de soutien scolaire personnalisé',
    category: 'Éducation'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1591522811280-a8759970b03f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Aide d\'Urgence',
    description: 'Distribution de kits d\'urgence aux familles',
    category: 'Aide matérielle'
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Soutien aux Familles',
    description: 'Accompagnement des familles en difficulté',
    category: 'Aide matérielle'
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Distribution de Médicaments',
    description: 'Aide médicale aux familles nécessiteuses',
    category: 'Aide matérielle'
  },
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Cours de Rattrapage',
    description: 'Sessions intensives pour les élèves en difficulté',
    category: 'Éducation'
  },
  {
    id: '12',
    url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Distribution d\'Eau',
    description: 'Accès à l\'eau potable pour les familles',
    category: 'Aide matérielle'
  }
];

const IMAGES_PER_PAGE = 8;

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(galleryImages.map(img => img.category)));
    return ['all', ...uniqueCategories];
  }, []);

  const filteredImages = useMemo(() => {
    const filtered = selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === selectedCategory);
    
    return showAll ? filtered : filtered.slice(0, IMAGES_PER_PAGE);
  }, [selectedCategory, showAll]);

  const hasMoreImages = useMemo(() => {
    const totalImages = selectedCategory === 'all'
      ? galleryImages.length
      : galleryImages.filter(img => img.category === selectedCategory).length;
    return totalImages > IMAGES_PER_PAGE;
  }, [selectedCategory]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const handleToggleImages = () => {
    setIsLoading(true);
    setShowAll(!showAll);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <section id="gallery" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Galerie
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Découvrez nos moments les plus précieux en images
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setIsLoading(true);
                setSelectedCategory(category);
                setShowAll(false);
                setTimeout(() => setIsLoading(false), 300);
              }}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageClick(image)}
              className={`relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105 bg-white dark:bg-gray-800 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center p-4">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {hasMoreImages && (
          <div className="text-center mt-8">
            <button
              onClick={handleToggleImages}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-all duration-300"
            >
              {showAll ? (
                <>
                  Voir moins
                  <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  Voir plus
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Modal pour l'image en plein écran */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors duration-300"
            >
              <X size={32} />
            </button>
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 rounded-b-lg">
                <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
