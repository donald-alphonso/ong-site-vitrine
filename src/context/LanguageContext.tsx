import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.mission': 'Our Mission',
    'nav.gallery': 'Gallery',
    'nav.testimonials': 'Testimonials',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'hero.title': 'Giving Hope to Children',
    'hero.subtitle': 'Together, let\'s build a better future for orphans through love, education, and support.',
    'hero.cta': 'Learn More',
    'mission.title': 'Our Mission',
    'mission.description': 'We are dedicated to providing love, care, and opportunities for orphaned children.',
    'gallery.title': 'Our Gallery',
    'gallery.subtitle': 'Moments of joy and hope captured in our daily activities',
    'gallery.seeMore': 'See More',
    'gallery.seeLess': 'See Less',
    'testimonials.title': 'What People Say About Us',
    'testimonials.roles.volunteer': 'Volunteer',
    'testimonials.roles.donor': 'Donor',
    'testimonials.roles.teacher': 'Teacher',
    'testimonials.content.volunteer': "Working with God's Hand has been an incredible experience. The impact they have on children's lives is truly remarkable.",
    'testimonials.content.donor': "I've seen firsthand how donations transform these children's lives. Every contribution makes a real difference.",
    'testimonials.content.teacher': "The dedication to education and personal development is outstanding. These children are getting the support they truly deserve.",
    'testimonials.navigation.prev': 'Previous testimonial',
    'testimonials.navigation.next': 'Next testimonial',
    'testimonials.navigation.goto': 'Go to testimonial',
    'blog.title': 'Latest News',
    'blog.readMore': 'Read More',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with us',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.mission': 'Notre Mission',
    'nav.gallery': 'Galerie',
    'nav.testimonials': 'Témoignages',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'hero.title': 'Donnons de l\'espoir aux Enfants',
    'hero.subtitle': 'Ensemble, construisons un avenir meilleur pour les orphelins à travers l\'amour, l\'éducation et le soutien.',
    'hero.cta': 'En savoir plus',
    'mission.title': 'Notre Mission',
    'mission.description': 'Nous nous consacrons à apporter amour, soins et opportunités aux enfants orphelins.',
    'gallery.title': 'Notre Galerie',
    'gallery.subtitle': 'Moments de joie et d\'espoir capturés dans nos activités quotidiennes',
    'gallery.seeMore': 'Voir plus',
    'gallery.seeLess': 'Voir moins',
    'testimonials.title': 'Ce que les gens disent de nous',
    'testimonials.roles.volunteer': 'Bénévole',
    'testimonials.roles.donor': 'Donateur',
    'testimonials.roles.teacher': 'Enseignant',
    'testimonials.content.volunteer': "Travailler avec La Main de Dieu a été une expérience incroyable. L'impact qu'ils ont sur la vie des enfants est vraiment remarquable.",
    'testimonials.content.donor': "J'ai vu de mes propres yeux comment les dons transforment la vie de ces enfants. Chaque contribution fait une réelle différence.",
    'testimonials.content.teacher': "Le dévouement à l'éducation et au développement personnel est remarquable. Ces enfants reçoivent le soutien qu'ils méritent vraiment.",
    'testimonials.navigation.prev': 'Témoignage précédent',
    'testimonials.navigation.next': 'Témoignage suivant',
    'testimonials.navigation.goto': 'Aller au témoignage',
    'blog.title': 'Actualités',
    'blog.readMore': 'Lire la suite',
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Prenez contact avec nous',
    'contact.name': 'Votre Nom',
    'contact.email': 'Votre Email',
    'contact.message': 'Votre Message',
    'contact.send': 'Envoyer le message',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang) return savedLang;
      
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'fr' ? 'fr' : 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
