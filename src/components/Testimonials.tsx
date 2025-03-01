import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export function Testimonials() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const testimonials = useMemo<Testimonial[]>(() => [
    {
      id: 1,
      name: "Marie L.",
      role: t('testimonials.roles.volunteer'),
      content: t('testimonials.content.volunteer'),
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: 2,
      name: "Jean D.",
      role: t('testimonials.roles.donor'),
      content: t('testimonials.content.donor'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      id: 3,
      name: "Emma R.",
      role: t('testimonials.roles.teacher'),
      content: t('testimonials.content.teacher'),
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
    }
  ], [t]);

  const nextTestimonial = useCallback(() => {
    if (!isTransitioning) {
      setDirection('right');
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 500);
    }
  }, [isTransitioning, testimonials.length]);

  const prevTestimonial = useCallback(() => {
    if (!isTransitioning) {
      setDirection('left');
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsTransitioning(false);
      }, 500);
    }
  }, [isTransitioning, testimonials.length]);

  const goToTestimonial = useCallback((index: number) => {
    if (!isTransitioning && index !== activeIndex) {
      setDirection(index > activeIndex ? 'right' : 'left');
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 500);
    }
  }, [isTransitioning, activeIndex]);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-16">
          {t('testimonials.title')}
        </h2>

        <div className="relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className={`absolute w-24 h-24 rounded-full object-cover border-4 border-red-500 dark:border-white transition-all duration-500 ease-in-out transform
                  ${isTransitioning ? (direction === 'right' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0') : 'translate-x-0 opacity-100'}
                `}
              />
            </div>

            <div className={`transition-all duration-500 ease-in-out transform
              ${isTransitioning ? (direction === 'right' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0') : 'translate-x-0 opacity-100'}
            `}>
              <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-6">
                "{testimonials[activeIndex].content}"
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {testimonials[activeIndex].name}
              </h3>
              <p className="text-red-500 dark:text-red-400">
                {testimonials[activeIndex].role}
              </p>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('testimonials.navigation.prev')}
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('testimonials.navigation.next')}
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125
                ${index === activeIndex ? 'bg-red-500 dark:bg-red-400 scale-110' : 'bg-gray-300 dark:bg-gray-600'}
                ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              aria-label={`${t('testimonials.navigation.goto')} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
