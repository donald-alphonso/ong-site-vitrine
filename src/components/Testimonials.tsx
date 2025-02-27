import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie K.',
    role: 'Bénévole',
    content:
      'Travailler avec cette organisation a été une expérience incroyablement enrichissante. Voir le sourire sur le visage des enfants est la meilleure récompense possible.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 2,
    name: 'Thomas L.',
    role: 'Ancien bénéficiaire',
    content:
      "Grâce à leur soutien constant et leur accompagnement, j'ai pu poursuivre mes études et réaliser mes rêves. Aujourd'hui, je suis fier de pouvoir à mon tour aider d'autres jeunes.",
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 3,
    name: 'Sophie M.',
    role: 'Partenaire',
    content:
      "La collaboration avec l'équipe est exceptionnelle. Leur professionnalisme et leur dévouement envers les enfants sont vraiment admirables.",
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('right');
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('left');
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
          Témoignages
        </h2>

        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-24 h-24">
              <img
                src={testimonials[activeIndex].imageUrl}
                alt={testimonials[activeIndex].name}
                className={`absolute w-24 h-24 rounded-full object-cover border-4 border-red-500 transition-all duration-500 ease-in-out transform
                  ${isTransitioning ? (direction === 'right' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0') : 'translate-x-0 opacity-100'}
                `}
              />
            </div>
          </div>

          <div className="text-center relative overflow-hidden">
            <div className={`transition-all duration-500 ease-in-out transform
              ${isTransitioning ? (direction === 'right' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0') : 'translate-x-0 opacity-100'}
            `}>
              <p className="text-xl text-gray-700 italic mb-6">
                "{testimonials[activeIndex].content}"
              </p>
              <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300">
                {testimonials[activeIndex].name}
              </h3>
              <p className="text-red-500 transition-colors duration-300">
                {testimonials[activeIndex].role}
              </p>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mt-6 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125
                ${index === activeIndex ? 'bg-red-500 scale-110' : 'bg-gray-300'}
                ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
