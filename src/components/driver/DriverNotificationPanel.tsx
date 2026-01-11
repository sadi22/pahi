import { useState } from 'react';
import { X, Search, User, MapPin, Clock, Bell, ArrowLeft } from 'lucide-react';

interface RideNotification {
  id: number;
  type: 'pickup' | 'dropoff';
  title: string;
  description: string;
  childName: string;
  parentName: string;
  location: string;
  scheduledTime: string;
  timestamp: string;
  isNew: boolean;
}

interface DriverNotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DriverNotificationPanel({ isOpen, onClose }: DriverNotificationPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<RideNotification[]>([
    {
      id: 1,
      type: 'pickup',
      title: 'New Ride Request',
      description: 'Sarah Mitchell has requested a ride for Ciara Mitchell from 123 Main St, Wairoa to Wairoa Primary School.',
      childName: 'Ciara Mitchell',
      parentName: 'Sarah Mitchell',
      location: '123 Main St, Wairoa',
      scheduledTime: '2025-12-11 at 07:30 AM',
      timestamp: '32 min ago',
      isNew: true
    },
    {
      id: 2,
      type: 'pickup',
      title: 'New Ride Request',
      description: 'Karen Whaanga has requested a ride for Johnny Whaanga from 789 Beach Rd, Wairoa to Wairoa College.',
      childName: 'Johnny Whaanga',
      parentName: 'Karen Whaanga',
      location: '789 Beach Rd, Wairoa',
      scheduledTime: '2025-12-11 at 08:00 AM',
      timestamp: '1 hour ago',
      isNew: true
    },
    {
      id: 3,
      type: 'dropoff',
      title: 'New Ride Request',
      description: 'Maria Kahukura has requested a drop-off for Blu Kahukura from St Joseph\'s School to 456 Hill Rd, Wairoa.',
      childName: 'Blu Kahukura',
      parentName: 'Maria Kahukura',
      location: '456 Hill Rd, Wairoa',
      scheduledTime: '2025-12-11 at 03:00 PM',
      timestamp: '2 hours ago',
      isNew: false
    }
  ]);

  const filteredNotifications = notifications.filter(notif =>
    notif.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notif.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notif.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = notifications.filter(notif => notif.isNew).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl z-[70] flex flex-col animate-slide-in-right">
        {/* Header - App Theme Colors */}
        <div className="px-5 py-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1">
              <h2 className="text-white mb-0">Notifications</h2>
            </div>
          </div>

          <div className="px-11">
            <p className="text-white/80 text-sm mb-0">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="px-5 py-4 bg-white border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ focusRingColor: '#2F6F9F' }}
            />
          </div>
        </div>

        {/* Content - Scrollable Notifications */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-5">
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Bell className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title with unread indicator */}
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-gray-900 mb-0">
                          {notif.title}
                        </h4>
                        {notif.isNew && (
                          <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: '#2F6F9F' }}></div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                        {notif.description}
                      </p>

                      {/* Details */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span>{notif.childName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span>{notif.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{notif.scheduledTime}</span>
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">{notif.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">
                  {searchQuery ? 'No matching notifications found' : 'No notifications'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}