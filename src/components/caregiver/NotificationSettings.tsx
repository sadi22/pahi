import { ArrowLeft, Bell, MessageSquare, MapPin, AlertCircle, Calendar } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface NotificationSettingsProps {
  onBack: () => void;
}

export default function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    rideUpdates: true,
    safetyAlerts: true,
    driverMessages: true,
    pickupReminders: true,
    scheduleChanges: true,
    promotions: false
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Notification preference updated');
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
            <Bell className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-white mb-1" style={{ fontSize: '24px', fontWeight: 700 }}>
              Notifications
            </h1>
            <p className="text-white/90" style={{ fontSize: '14px' }}>
              Manage your alert preferences
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-5">
        {/* Ride Notifications */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h2 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Ride Notifications
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 flex-1">
                <MapPin className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <div>
                  <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                    Ride Updates
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    Driver on the way, arrival alerts
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('rideUpdates')}
                className={`w-14 h-8 rounded-full transition-colors ${
                  settings.rideUpdates ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    settings.rideUpdates ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 flex-1">
                <Calendar className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <div>
                  <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                    Pickup Reminders
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    Remind me 15 minutes before pickup
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('pickupReminders')}
                className={`w-14 h-8 rounded-full transition-colors ${
                  settings.pickupReminders ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    settings.pickupReminders ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 flex-1">
                <AlertCircle className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <div>
                  <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                    Schedule Changes
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    Alerts for ride cancellations or delays
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('scheduleChanges')}
                className={`w-14 h-8 rounded-full transition-colors ${
                  settings.scheduleChanges ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    settings.scheduleChanges ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Safety & Communication */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h2 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Safety & Communication
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 flex-1">
                <Bell className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                    Safety Alerts
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    Important safety notifications
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('safetyAlerts')}
                className={`w-14 h-8 rounded-full transition-colors ${
                  settings.safetyAlerts ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    settings.safetyAlerts ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 flex-1">
                <MessageSquare className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <div>
                  <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                    Driver Messages
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    Messages from Mike Kereama
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('driverMessages')}
                className={`w-14 h-8 rounded-full transition-colors ${
                  settings.driverMessages ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    settings.driverMessages ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Optional Notifications */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h2 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Optional
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 flex-1">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                    Promotions & Updates
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    Service updates and community news
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('promotions')}
                className={`w-14 h-8 rounded-full transition-colors ${
                  settings.promotions ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    settings.promotions ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-100">
          <div className="flex gap-3">
            <Bell className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900" style={{ fontSize: '14px', fontWeight: 600 }}>
                Push Notification Status
              </p>
              <p className="text-blue-700 mt-1" style={{ fontSize: '13px' }}>
                Push notifications are enabled for this device. You can manage system-level notification settings in your device settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
