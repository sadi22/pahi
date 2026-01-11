import { ArrowLeft, Settings, Globe, Palette, Download, Smartphone, Wifi } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface AppPreferencesProps {
  onBack: () => void;
}

export default function AppPreferences({ onBack }: AppPreferencesProps) {
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-nz');
  const [selectedTheme, setSelectedTheme] = useState('light');

  const languages = [
    { value: 'en-nz', label: 'English (New Zealand)', flag: '🇳🇿' },
    { value: 'mi', label: 'Te Reo Māori', flag: '🇳🇿' },
    { value: 'en', label: 'English (International)', flag: '🌍' }
  ];

  const themes = [
    { value: 'light', label: 'Light Mode', description: 'Bright and clear' },
    { value: 'dark', label: 'Dark Mode', description: 'Coming soon' },
    { value: 'auto', label: 'Auto (System)', description: 'Coming soon' }
  ];

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    toast.success('Language updated');
  };

  const handleThemeChange = (theme: string) => {
    if (theme !== 'light') {
      toast.info('Coming Soon', { description: 'Dark mode will be available in a future update' });
      return;
    }
    setSelectedTheme(theme);
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(to bottom, #F0F9FF 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-4 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span style={{ fontSize: '16px', fontWeight: 600 }}>Back</span>
        </button>

        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-white mb-1" style={{ fontSize: '24px', fontWeight: 700 }}>
              App Preferences
            </h1>
            <p className="text-white/90" style={{ fontSize: '14px' }}>
              Customize your app experience
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-5">
        {/* Language Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <Globe className="w-6 h-6" style={{ color: '#2F6F9F' }} />
            </div>
            <h2 className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
              Language
            </h2>
          </div>

          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleLanguageChange(lang.value)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all active:scale-95 ${
                  selectedLanguage === lang.value
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-2'
                    : 'bg-gray-50'
                }`}
                style={selectedLanguage === lang.value ? { borderColor: '#2F6F9F' } : {}}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '24px' }}>{lang.flag}</span>
                  <span 
                    className={selectedLanguage === lang.value ? 'text-gray-900' : 'text-gray-700'}
                    style={{ fontSize: '15px', fontWeight: selectedLanguage === lang.value ? 600 : 500 }}
                  >
                    {lang.label}
                  </span>
                </div>
                {selectedLanguage === lang.value && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2F6F9F' }}>
                    <span className="text-white" style={{ fontSize: '12px' }}>✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FEF3C7' }}
            >
              <Palette className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
              Appearance
            </h2>
          </div>

          <div className="space-y-3">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => handleThemeChange(theme.value)}
                disabled={theme.value !== 'light'}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                  theme.value === 'light' ? 'active:scale-95' : 'opacity-50 cursor-not-allowed'
                } ${
                  selectedTheme === theme.value
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-2'
                    : 'bg-gray-50'
                }`}
                style={selectedTheme === theme.value ? { borderColor: '#2F6F9F' } : {}}
              >
                <div className="flex-1 text-left">
                  <p 
                    className={selectedTheme === theme.value ? 'text-gray-900' : 'text-gray-700'}
                    style={{ fontSize: '15px', fontWeight: selectedTheme === theme.value ? 600 : 500 }}
                  >
                    {theme.label}
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    {theme.description}
                  </p>
                </div>
                {selectedTheme === theme.value && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2F6F9F' }}>
                    <span className="text-white" style={{ fontSize: '12px' }}>✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* App Updates */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <Download className="w-6 h-6" style={{ color: '#2F6F9F' }} />
            </div>
            <h2 className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
              Updates
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <p className="text-gray-900 mb-1" style={{ fontSize: '15px', fontWeight: 500 }}>
                  Auto-Update App
                </p>
                <p className="text-gray-600" style={{ fontSize: '13px' }}>
                  Download updates automatically
                </p>
              </div>
              <button
                onClick={() => {
                  setAutoUpdates(!autoUpdates);
                  toast.success(autoUpdates ? 'Auto-updates disabled' : 'Auto-updates enabled');
                }}
                className={`w-14 h-8 rounded-full transition-colors ${
                  autoUpdates ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    autoUpdates ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 mb-1" style={{ fontSize: '15px', fontWeight: 500 }}>
                    Current Version
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    Pahi App v1.0.0
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-100">
                  <span className="text-green-700" style={{ fontSize: '12px', fontWeight: 600 }}>
                    Up to date
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data & Storage */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <Smartphone className="w-6 h-6" style={{ color: '#2F6F9F' }} />
            </div>
            <h2 className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
              Data & Storage
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 flex-1">
                <Wifi className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <div>
                  <p className="text-gray-900 mb-1" style={{ fontSize: '15px', fontWeight: 500 }}>
                    Offline Mode
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    Access ride history offline
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setOfflineMode(!offlineMode);
                  toast.success(offlineMode ? 'Offline mode disabled' : 'Offline mode enabled');
                }}
                className={`w-14 h-8 rounded-full transition-colors ${
                  offlineMode ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    offlineMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <button 
              onClick={() => toast.success('Cache cleared successfully')}
              className="w-full p-4 bg-gray-50 rounded-xl active:scale-95 transition-all"
            >
              <p className="text-gray-900 text-center" style={{ fontSize: '15px', fontWeight: 500 }}>
                Clear App Cache
              </p>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-100">
          <p className="text-blue-900 mb-2" style={{ fontSize: '14px', fontWeight: 600 }}>
            System Information
          </p>
          <p className="text-blue-700" style={{ fontSize: '13px', lineHeight: '1.6' }}>
            Some preferences sync across devices when you're logged in. Changes to language and notifications take effect immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
