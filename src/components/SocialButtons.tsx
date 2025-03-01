import React, { useState, useEffect } from 'react';
import { MessageCircle, Facebook } from 'lucide-react';

interface SocialButtonsProps {
  whatsappNumber: string;
  facebookUrl: string;
}

export function SocialButtons({ whatsappNumber, facebookUrl }: SocialButtonsProps) {
  const [showPulse, setShowPulse] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(false);

  useEffect(() => {
    // Afficher le message initial après 3 secondes
    const timer = setTimeout(() => {
      setShowInitialMessage(true);
    }, 3000);

    // Activer l'animation de pulse toutes les 10 secondes
    const pulseInterval = setInterval(() => {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 2000);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=Bonjour, je souhaite en savoir plus sur votre association.`, '_blank');
  };

  const handleFacebookClick = () => {
    window.open(facebookUrl, '_blank');
  };

  return (
    <>
      {/* Message initial flottant */}
      <div 
        className={`fixed bottom-28 right-6 bg-white rounded-lg shadow-xl p-4 max-w-xs transform transition-all duration-500 ${
          showInitialMessage ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <p className="text-gray-800 text-sm">
          👋 Besoin d'informations ? Discutons sur WhatsApp !
        </p>
        <button 
          onClick={() => setShowInitialMessage(false)}
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      {/* Boutons sociaux */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className={`group relative flex items-center bg-transparent hover:bg-transparent${
            showPulse ? 'animate-bounce' : ''
          }`}
        >
          <span className="absolute right-full mr-3 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Discuter sur WhatsApp 💬
          </span>
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
            <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>
        </button>

        {/* Facebook Button */}
        <button
          onClick={handleFacebookClick}
          className="group relative flex items-center bg-transparent hover:bg-transparent"
        >
          <span className="absolute right-full mr-3 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Suivez-nous sur Facebook 👍
          </span>
          <div className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
            <Facebook className="w-6 h-6" />
          </div>
        </button>
      </div>
    </>
  );
}
