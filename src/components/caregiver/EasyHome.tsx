interface EasyHomeProps {
  onNavigate: (page: string) => void;
}

export default function EasyHome({ onNavigate }: EasyHomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-32">
      {/* Large Header with Welcome */}
      <div className="px-6 pt-12 pb-8 text-center" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <div className="text-7xl mb-4">👋</div>
        <h1 className="text-white text-4xl mb-3 font-bold leading-tight">
          Welcome to<br/>Pahi App
        </h1>
        <p className="text-white text-xl">Safe rides for your children</p>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Main Action - Book a Ride */}
        <button
          onClick={() => onNavigate('book')}
          className="w-full rounded-3xl p-8 shadow-2xl active:scale-95 transition-all border-4"
          style={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderColor: '#047857'
          }}
        >
          <div className="text-8xl mb-4">🚗</div>
          <h2 className="text-white text-3xl font-bold mb-2">Book a Ride</h2>
          <p className="text-white text-xl">Tap here to book</p>
        </button>

        {/* Track Ride */}
        <button
          onClick={() => onNavigate('track')}
          className="w-full rounded-3xl p-8 shadow-2xl active:scale-95 transition-all border-4"
          style={{ 
            background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)',
            borderColor: '#1e4d6f'
          }}
        >
          <div className="text-8xl mb-4">📍</div>
          <h2 className="text-white text-3xl font-bold mb-2">Track Ride</h2>
          <p className="text-white text-xl">See where child is</p>
        </button>

        {/* Child Info Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200">
          <div className="text-6xl mb-4 text-center">👧</div>
          <h3 className="text-gray-900 text-2xl font-bold text-center mb-4">Your Child</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-5">
              <p className="text-gray-600 text-lg mb-1">Name</p>
              <p className="text-gray-900 text-2xl font-bold">Ciara Mitchell</p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-5">
              <p className="text-gray-600 text-lg mb-1">School</p>
              <p className="text-gray-900 text-2xl font-bold">Wairoa Primary</p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5 border-2 border-green-200">
              <p className="text-gray-600 text-lg mb-1">Next Ride</p>
              <p className="text-green-700 text-2xl font-bold">Tomorrow 8:00 AM</p>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200">
          <div className="text-6xl mb-4 text-center">🚙</div>
          <h3 className="text-gray-900 text-2xl font-bold text-center mb-4">Your Driver</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-5">
              <p className="text-gray-600 text-lg mb-1">Driver Name</p>
              <p className="text-gray-900 text-2xl font-bold">Mike Kereama</p>
            </div>
            
            <a 
              href="tel:06838800"
              className="block bg-green-50 rounded-2xl p-6 border-3 border-green-300 active:scale-95 transition-all"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="text-5xl">📞</div>
                <div>
                  <p className="text-gray-600 text-lg mb-1">Call Driver</p>
                  <p className="text-green-700 text-2xl font-bold">(06) 838-8000</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 rounded-3xl p-8 shadow-xl border-4 border-red-300">
          <div className="text-6xl mb-4 text-center">🚨</div>
          <h3 className="text-red-900 text-2xl font-bold text-center mb-4">Emergency</h3>
          
          <a 
            href="tel:111"
            className="block bg-red-600 rounded-2xl p-8 active:scale-95 transition-all shadow-lg"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="text-6xl">☎️</div>
              <div>
                <p className="text-white text-xl mb-1">Call Emergency</p>
                <p className="text-white text-5xl font-bold">111</p>
              </div>
            </div>
          </a>
        </div>

        {/* Help Section */}
        <div className="bg-yellow-50 rounded-3xl p-8 shadow-xl border-4 border-yellow-200">
          <div className="text-6xl mb-4 text-center">💡</div>
          <h3 className="text-gray-900 text-2xl font-bold text-center mb-4">Need Help?</h3>
          
          <a 
            href="tel:06838800"
            className="block bg-yellow-400 rounded-2xl p-6 active:scale-95 transition-all"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl">📞</div>
              <div>
                <p className="text-gray-900 text-xl font-bold">Call Support</p>
                <p className="text-gray-700 text-lg">(06) 838-8000</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}