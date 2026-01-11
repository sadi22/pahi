import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import wairoaPlayground from 'figma:asset/cc4600e17b11a47d678653d6e63866b1c1fbf9a8.png';
import wairoaLighthouse from 'figma:asset/58ea61f35ead2c566b0ee1dd657d5686656f64ea.png';
import whakamahiaBeach from 'figma:asset/6e28251a2c306f267952531fa34fd75e9afff538.png';
import wairoaCommunityCenter from 'figma:asset/0d6f9940acb885d47ee286274c1b8a9c53b93ba5.png';
import wairoaCommunity from 'figma:asset/55287406e8087230400c137e4d6197f643accd07.png';
import wairoaKids from 'figma:asset/5c00c109be9d0bc53577ec6466940683a2b372d2.png';

interface LandingPageProps {
  onGetStarted: () => void;
  onBack?: () => void;
}

export default function LandingPage({ onGetStarted, onBack }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const wairoaPlaces = [
    {
      id: 1,
      name: 'Wairoa Lighthouse',
      image: wairoaLighthouse,
      description: 'Historic lighthouse standing guard over our coastline. A beloved landmark for photos and sunset watching.'
    },
    {
      id: 2,
      name: 'Whakamahia Beach',
      image: whakamahiaBeach,
      description: 'Stunning coastal gem with dramatic white cliffs and pristine waters. Perfect for family picnics and beach adventures.'
    },
    {
      id: 3,
      name: 'Wairoa Playground',
      image: wairoaPlayground,
      description: 'Modern playground with exciting equipment. A safe and fun destination for our tamariki.'
    },
    {
      id: 4,
      name: 'Wairoa Kids Club',
      image: wairoaKids,
      description: 'After-school programs, sports activities, and educational workshops for children of all ages.'
    },
    {
      id: 5,
      name: 'Community Hub',
      image: wairoaCommunityCenter,
      description: 'Heart of our community where families gather, learn, and grow together.'
    },
    {
      id: 6,
      name: 'Wairoa Tennis Club',
      image: wairoaCommunity,
      description: 'Community sports facility where locals enjoy tennis and recreational activities together.'
    }
  ];

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % wairoaPlaces.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [wairoaPlaces.length]);

  const currentPlace = wairoaPlaces[currentSlide];

  return (
    <div className="w-full h-full fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col">
      {/* Background Image - Full Screen with Lighthouse Focus */}
      <img 
        src={currentPlace.image}
        alt={currentPlace.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: currentSlide === 0 ? 'center 35%' : 'center'
        }}
      />
      
      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-900/40 to-slate-900/60"></div>

      {/* Content Overlay - Scrollable */}
      <div className="relative flex-1 flex flex-col min-h-full">
        {/* Back Button - Fixed Position */}
        {onBack && (
          <div className="absolute top-6 left-4 z-10">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/40 active:scale-95 transition-all border border-white/20"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {/* Text Content - Top Section */}
        <div className="pt-16 px-6 text-white pb-8">
          <h3 className="text-white/95 mb-4 tracking-wide">Discover Wairoa with us</h3>
          <h2 className="text-white mb-3">{currentPlace.name}</h2>
          <p className="text-white/90 max-w-sm leading-relaxed">
            {currentPlace.description}
          </p>
        </div>

        {/* Spacer - Pushes bottom content down */}
        <div className="flex-1 min-h-[200px]"></div>

        {/* Bottom Navigation Area - Anchored to bottom */}
        <div className="pb-6">
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {wairoaPlaces.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-6 bg-white' 
                    : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Get Started Button - Fixed at absolute bottom */}
        <div className="bg-white px-6 py-6 pb-8">
          <button
            onClick={onGetStarted}
            className="w-full text-white py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-semibold"
            style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}