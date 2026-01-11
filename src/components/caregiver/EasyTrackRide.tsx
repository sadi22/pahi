import { useState, useEffect } from 'react';
import { ArrowLeft, Phone } from 'lucide-react';

interface EasyTrackRideProps {
  onNavigate: (page: string) => void;
}

export default function EasyTrackRide({ onNavigate }: EasyTrackRideProps) {
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('Starting ride...');
  const [statusEmoji, setStatusEmoji] = useState('🚗');

  useEffect(() => {
    // Simulate ride progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update status based on progress
    if (progress < 25) {
      setCurrentStatus('Starting ride...');
      setStatusEmoji('🚗');
    } else if (progress < 50) {
      setCurrentStatus('On the way...');
      setStatusEmoji('🛣️');
    } else if (progress < 75) {
      setCurrentStatus('Almost there...');
      setStatusEmoji('🏫');
    } else if (progress < 100) {
      setCurrentStatus('Arriving soon...');
      setStatusEmoji('✅');
    } else {
      setCurrentStatus('Arrived safely!');
      setStatusEmoji('🎉');
    }
  }, [progress]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-32">
      {/* Header */}
      <div className="px-6 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-white mb-6 text-xl active:scale-95 transition-all p-3 bg-white/20 rounded-2xl"
        >
          <ArrowLeft className="w-8 h-8" />
          <span className="font-bold">Back</span>
        </button>

        <div className="text-center">
          <div className="text-7xl mb-4">📍</div>
          <h1 className="text-white text-4xl font-bold mb-2">Track Ride</h1>
          <p className="text-white text-xl">Emma Johnson</p>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Current Status */}
        <div className="bg-white rounded-3xl p-10 shadow-xl border-4 border-blue-200 text-center">
          <div className="text-9xl mb-6 animate-bounce">{statusEmoji}</div>
          <h2 className="text-gray-900 text-4xl font-bold mb-4">{currentStatus}</h2>
          <p className="text-gray-600 text-2xl">{progress}% Complete</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200">
          <div className="bg-gray-200 rounded-full h-12 overflow-hidden">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              }}
            />
          </div>
        </div>

        {/* Route Info */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200">
          <h3 className="text-gray-900 text-2xl font-bold mb-6 text-center">Route</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl">🏠</div>
              <div className="flex-1">
                <p className="text-gray-600 text-lg">Pick Up</p>
                <p className="text-gray-900 text-xl font-bold">123 Main Street</p>
              </div>
              {progress > 10 && (
                <div className="text-4xl">✅</div>
              )}
            </div>

            <div className="flex items-center justify-center">
              <div className="text-5xl">⬇️</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-6xl">🏫</div>
              <div className="flex-1">
                <p className="text-gray-600 text-lg">Drop Off</p>
                <p className="text-gray-900 text-xl font-bold">Wairoa Primary School</p>
              </div>
              {progress >= 100 && (
                <div className="text-4xl">✅</div>
              )}
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200">
          <div className="text-6xl mb-4 text-center">🚙</div>
          <h3 className="text-gray-900 text-2xl font-bold text-center mb-6">Driver</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-6">
              <p className="text-gray-600 text-lg mb-1">Driver Name</p>
              <p className="text-gray-900 text-2xl font-bold">Mike Kereama</p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-6">
              <p className="text-gray-600 text-lg mb-1">Vehicle</p>
              <p className="text-gray-900 text-2xl font-bold">Toyota Hiace - ABC123</p>
            </div>
          </div>
        </div>

        {/* Call Driver Button */}
        <a
          href="tel:06838800"
          className="block bg-green-500 rounded-3xl p-8 shadow-2xl text-white active:scale-95 transition-all border-4 border-green-600"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="text-6xl">📞</div>
            <div>
              <p className="text-3xl font-bold">Call Driver</p>
              <p className="text-xl">(06) 838-8000</p>
            </div>
          </div>
        </a>

        {/* Emergency Contact */}
        <a
          href="tel:111"
          className="block bg-red-500 rounded-3xl p-8 shadow-2xl text-white active:scale-95 transition-all border-4 border-red-600"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="text-6xl">🚨</div>
            <div>
              <p className="text-3xl font-bold">Emergency</p>
              <p className="text-5xl font-bold">111</p>
            </div>
          </div>
        </a>

        {progress >= 100 && (
          <div className="bg-green-50 rounded-3xl p-8 shadow-xl border-4 border-green-300 text-center">
            <div className="text-8xl mb-4">🎉</div>
            <h3 className="text-green-900 text-3xl font-bold mb-4">Arrived Safely!</h3>
            <p className="text-green-700 text-xl mb-6">Your child has reached the destination</p>
            
            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-green-500 text-white rounded-2xl p-6 text-2xl font-bold active:scale-95 transition-all"
            >
              Go to Home ➡️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
