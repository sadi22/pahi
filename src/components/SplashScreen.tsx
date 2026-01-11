import { useEffect } from 'react';
import splashImage from 'figma:asset/5b89e5903595208ac493a9a849db7149aeed58c2.png';
import wairoaLighthouse from 'figma:asset/58ea61f35ead2c566b0ee1dd657d5686656f64ea.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    // Auto-transition to landing page after 4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full fixed inset-0 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
      {/* Background Kids Image */}
      <img
        src={wairoaLighthouse}
        alt="Wairoa Lighthouse"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Soft Overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(47, 111, 159, 0.5), rgba(86, 153, 210, 0.4))' }} />

      {/* Content - Centered Splash Design */}
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="text-center animate-fade-in">
          {/* Shield Icon */}
          <div className="mb-8">
            <div className="w-28 h-28 bg-white/30 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-white/40">
              <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z"/>
              </svg>
            </div>
          </div>
          
          {/* Pahi Title */}
          <h1 className="text-white mb-4" style={{ fontSize: '3.5rem', fontWeight: '700', letterSpacing: '0.02em' }}>Pahi</h1>
          
          {/* Subtitle */}
          <p className="text-white/95 mb-3" style={{ fontSize: '1.75rem', fontWeight: '500' }}>The ride for kids</p>
          
          {/* Tagline */}
          <p className="text-white/90" style={{ fontSize: '1.1rem' }}>Safe rides for tamariki & mokopuna</p>
        </div>
      </div>
    </div>
  );
}