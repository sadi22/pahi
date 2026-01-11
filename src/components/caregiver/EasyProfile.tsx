import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

interface EasyProfileProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function EasyProfile({ onNavigate, onLogout }: EasyProfileProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-32">
      {/* Logout Confirmation */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Logout?"
        message="Do you want to logout? You will need to login again."
        confirmText="Yes, Logout"
        cancelText="No, Stay"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        variant="warning"
      />

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
          <div className="text-7xl mb-4">👤</div>
          <h1 className="text-white text-4xl font-bold mb-2">Your Profile</h1>
          <p className="text-white text-xl">Rachel Mitchell</p>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Personal Info */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200">
          <div className="text-6xl mb-4 text-center">📋</div>
          <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Your Information</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-6">
              <p className="text-gray-600 text-lg mb-1">Name</p>
              <p className="text-gray-900 text-2xl font-bold">Sarah Johnson</p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-6">
              <p className="text-gray-600 text-lg mb-1">Phone</p>
              <p className="text-gray-900 text-2xl font-bold">021 234 5678</p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-6">
              <p className="text-gray-600 text-lg mb-1">Address</p>
              <p className="text-gray-900 text-2xl font-bold">123 Main Street, Wairoa</p>
            </div>
          </div>
        </div>

        {/* Children */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200">
          <div className="text-6xl mb-4 text-center">👨‍👩‍👧‍👦</div>
          <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Your Children</h2>
          
          <div className="space-y-4">
            <div className="bg-pink-50 rounded-2xl p-6 border-2 border-pink-200">
              <div className="flex items-center gap-4">
                <div className="text-5xl">👧</div>
                <div>
                  <p className="text-gray-900 text-2xl font-bold">Emma Johnson</p>
                  <p className="text-gray-600 text-lg">8 years old</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-4">
                <div className="text-5xl">👦</div>
                <div>
                  <p className="text-gray-900 text-2xl font-bold">Liam Johnson</p>
                  <p className="text-gray-600 text-lg">6 years old</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200">
          <div className="text-6xl mb-4 text-center">🚙</div>
          <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Your Driver</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-2xl p-6">
              <p className="text-gray-600 text-lg mb-1">Driver Name</p>
              <p className="text-gray-900 text-2xl font-bold">Mike Kereama</p>
            </div>
            
            <a 
              href="tel:06838800"
              className="block bg-green-50 rounded-2xl p-6 border-3 border-green-300 active:scale-95 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-5xl">📞</div>
                <div>
                  <p className="text-gray-600 text-lg mb-1">Call Driver</p>
                  <p className="text-green-700 text-2xl font-bold">(06) 838-8000</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Help */}
        <div className="bg-yellow-50 rounded-3xl p-8 shadow-xl border-4 border-yellow-200">
          <div className="text-6xl mb-4 text-center">💡</div>
          <h2 className="text-gray-900 text-2xl font-bold text-center mb-6">Need Help?</h2>
          
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

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-red-500 rounded-3xl p-8 shadow-2xl text-white active:scale-95 transition-all border-4 border-red-600"
        >
          <div className="text-6xl mb-3">🚪</div>
          <p className="text-3xl font-bold">Logout</p>
          <p className="text-xl mt-2">Exit the app</p>
        </button>
      </div>
    </div>
  );
}