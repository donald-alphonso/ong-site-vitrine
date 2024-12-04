import { useState } from 'react';

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
    imageUrl: '/images/testimonials/volunteer1.jpg',
  },
  {
    id: 2,
    name: 'Thomas L.',
    role: 'Ancien bénéficiaire',
    content:
      "Grâce à leur soutien constant et leur accompagnement, j'ai pu poursuivre mes études et réaliser mes rêves. Aujourd'hui, je suis fier de pouvoir à mon tour aider d'autres jeunes.",
    imageUrl: '/images/testimonials/beneficiary1.jpg',
  },
  {
    id: 3,
    name: 'Sophie M.',
    role: 'Partenaire',
    content:
      "La collaboration avec l'équipe est exceptionnelle. Leur professionnalisme et leur dévouement envers les enfants sont vraiment admirables.",
    imageUrl: '/images/testimonials/partner1.jpg',
  },
];
export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
          Témoignages
        </h2>

        <div className="relative">
          <div className="flex items-center justify-center mb-8">
            <img
              src={testimonials[activeIndex].imageUrl}
              alt={testimonials[activeIndex].name}
              className="w-24 h-24 rounded-full object-cover border-4 border-red-500"
            />
          </div>

          <div className="text-center">
            <p className="text-xl text-gray-700 italic mb-6">
              "{testimonials[activeIndex].content}"
            </p>
            <h3 className="text-lg font-semibold text-gray-900">
              {testimonials[activeIndex].name}
            </h3>
            <p className="tex-red-500">{testimonials[activeIndex].role}</p>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
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
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
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

        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-red-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
