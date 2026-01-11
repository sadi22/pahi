import { Car, Navigation, Phone, AlertCircle, User, MapPin, Clock, Users, CheckCircle, History, MessageSquare, LogOut, Bell } from 'lucide-react';
import ChildAvatar from '../ChildAvatar';
import { useNotifications } from '../../contexts/NotificationContext';

interface Child {
  id: string;
  name: string;
  age: number;
  year: string;
  school: string;
  initials: string;
  photoUrl?: string;
  isEmojiAvatar?: boolean;
}

interface SimpleEasyHomeProps {
  onNavigate: (page: string) => void;
  children: Child[];
  activeRide?: any;
  onLogout?: () => void;
}

export default function SimpleEasyHome({ onNavigate, children, activeRide, onLogout }: SimpleEasyHomeProps) {
  const { getCaregiverNotifications } = useNotifications();
  
  // Get notifications for current caregiver (using parent-1 as example ID)
  const caregiverNotifs = getCaregiverNotifications('parent-1');
  const unreadCount = caregiverNotifs.filter(n => n.status === 'unread').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-28">
      {/* Header */}
      <div className="px-5 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h1 className="text-white mb-1" style={{ fontSize: '28px', fontWeight: 700 }}>
              Welcome Back
            </h1>
            <p className="text-white/90" style={{ fontSize: '16px' }}>Rachel Mitchell</p>
          </div>
          
          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            {/* Notifications Button */}
            <button
              onClick={() => onNavigate('notifications')}
              className="w-11 h-11 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center active:scale-95 transition-all hover:bg-white/35 shadow-lg relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-white" strokeWidth={2.5} />
              {unreadCount > 0 && (
                <div 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: '#EF4444' }}
                >
                  <span className="text-white" style={{ fontSize: '10px', fontWeight: 700 }}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                </div>
              )}
            </button>
            
            {/* Logout Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="w-11 h-11 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center active:scale-95 transition-all hover:bg-white/35 shadow-lg"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-white" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-5">
        {/* Active Ride Tracking - Only show when ride is active */}
        {activeRide && activeRide.status === 'started' && (
          <div 
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-xl border-2 border-blue-400 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center animate-ping absolute" />
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center relative">
                <Navigation className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">Ride in Progress!</h3>
                <p className="text-blue-100 text-sm">{activeRide.childName}'s ride has started</p>
              </div>
            </div>
            
            <button
              onClick={() => onNavigate('track')}
              className="w-full bg-white rounded-xl py-4 shadow-lg active:scale-95 transition-all"
            >
              <span className="text-blue-600 font-bold text-lg">Track Ride Now</span>
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('history-feedback')}
            className="bg-white rounded-2xl p-5 shadow-md active:scale-95 transition-all border-2"
            style={{ borderColor: '#8B5CF6' }}
          >
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 mx-auto"
              style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)' }}
            >
              <History className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-gray-900 text-center mb-1" style={{ fontSize: '17px', fontWeight: 600 }}>
              History
            </h3>
            <p className="text-gray-600 text-center" style={{ fontSize: '13px' }}>
              Past rides
            </p>
          </button>

          <button
            onClick={() => onNavigate('feedback')}
            className="bg-white rounded-2xl p-5 shadow-md active:scale-95 transition-all border-2"
            style={{ borderColor: '#F59E0B' }}
          >
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 mx-auto"
              style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}
            >
              <MessageSquare className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-gray-900 text-center mb-1" style={{ fontSize: '17px', fontWeight: 600 }}>
              Feedback
            </h3>
            <p className="text-gray-600 text-center" style={{ fontSize: '13px' }}>
              Share feedback
            </p>
          </button>
        </div>

        {/* Manage Children Button */}
        <button
          onClick={() => onNavigate('manage-children')}
          className="w-full bg-white rounded-2xl p-4 shadow-md active:scale-95 transition-all border-2 border-blue-100"
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <Users className="w-6 h-6" style={{ color: '#2F6F9F' }} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-gray-900 mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                Manage Children
              </h3>
              <p className="text-gray-600" style={{ fontSize: '13px' }}>
                Add or edit children information
              </p>
            </div>
          </div>
        </button>

        {/* Next Scheduled Ride */}
        <div className="bg-white rounded-2xl p-5 shadow-md border-2" style={{ borderColor: '#E0F7FA' }}>
          <div className="flex items-start gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <Clock className="w-5 h-5" style={{ color: '#2F6F9F' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 mb-1" style={{ fontSize: '17px', fontWeight: 600 }}>
                Next Scheduled Ride
              </h3>
              <p className="text-gray-600" style={{ fontSize: '14px' }}>Tomorrow at 8:00 AM</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="text-gray-500" style={{ fontSize: '12px' }}>Child</p>
                <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>Ciara Mitchell</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div>
                <p className="text-gray-500" style={{ fontSize: '12px' }}>School</p>
                <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>Wairoa Primary School</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Children */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Your Children
          </h3>
          
          <div className="space-y-3">
            {children.map(child => (
              <div key={child.id} className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                <ChildAvatar 
                  photoUrl={child.photoUrl}
                  initials={child.initials}
                  name={child.name}
                  size="sm"
                  backgroundColor="#2F6F9F"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>{child.name}</p>
                  <p className="text-gray-600" style={{ fontSize: '14px' }}>{child.age} years old • {child.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Driver Information */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Your Driver
          </h3>
          
          <div className="flex items-start gap-4 mb-4">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <User className="w-7 h-7" style={{ color: '#2F6F9F' }} />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 mb-1" style={{ fontSize: '17px', fontWeight: 600 }}>Mike Kereama</p>
              <p className="text-gray-600 mb-2" style={{ fontSize: '14px' }}>Certified Community Driver</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-green-600" style={{ fontSize: '13px', fontWeight: 500 }}>Available</span>
              </div>
            </div>
          </div>

          <a
            href="tel:06838800"
            className="flex items-center justify-center gap-3 w-full rounded-xl py-4 active:scale-95 transition-all"
            style={{ backgroundColor: '#10b981' }}
          >
            <Phone className="w-5 h-5 text-white" />
            <span className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Call Driver</span>
          </a>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 rounded-2xl p-5 shadow-md border-2 border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-red-900" style={{ fontSize: '16px', fontWeight: 600 }}>Emergency Contact</h3>
              <p className="text-red-700" style={{ fontSize: '13px' }}>Available 24/7</p>
            </div>
          </div>
          
          <a
            href="tel:111"
            className="flex items-center justify-center gap-3 w-full rounded-xl py-4 active:scale-95 transition-all"
            style={{ backgroundColor: '#dc2626' }}
          >
            <Phone className="w-5 h-5 text-white" />
            <span className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>Call 111</span>
          </a>
        </div>
      </div>
    </div>
  );
}