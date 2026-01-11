import { useState } from 'react';
import { X, Search, Bell, Clock, MapPin, User, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { COLORS, GRADIENTS, TYPOGRAPHY, ICON, RADIUS, SPACING } from '../../constants/designSystem';

interface RideRequest {
  id: number;
  type: 'pickup' | 'dropoff';
  childName: string;
  parentName: string;
  scheduledTime: string;
  timestamp: string;
  location: string;
  isNew: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead?: () => void;
  notifications?: any[];
  onNavigate?: (page: string) => void;
}

export default function NotificationPanel({ isOpen, onClose, onMarkAllAsRead, notifications, onNavigate }: NotificationPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([
    {
      id: 1,
      type: 'pickup',
      childName: 'Johnny Whaanga',
      parentName: 'Tom Whaanga',
      scheduledTime: '16 Dec 2025 at 08:00 AM',
      timestamp: '47 min ago',
      location: '45 Beach Rd, Wairoa',
      isNew: true
    },
    {
      id: 2,
      type: 'pickup',
      childName: 'Blu Kahukura',
      parentName: 'Maria Kahukura',
      scheduledTime: '16 Dec 2025 at 08:10 AM',
      timestamp: '57 min ago',
      location: '78 Marine Parade, Wairoa',
      isNew: true
    }
  ]);

  const filteredRequests = rideRequests.filter(req =>
    req.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.parentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = rideRequests.filter(req => req.isNew).length;

  const handleMarkAllRead = () => {
    setRideRequests(prev => prev.map(req => ({ ...req, isNew: false })));
    toast.success('All notifications marked as read');
    if (onMarkAllAsRead) onMarkAllAsRead();
  };

  const handleApprove = (id: number, childName: string) => {
    setRideRequests(prev => prev.filter(req => req.id !== id));
    toast.success(`Ride request for ${childName} approved`);
    // Stay in admin panel, don't navigate away
  };

  const handleReject = (id: number, childName: string) => {
    setRideRequests(prev => prev.filter(req => req.id !== id));
    toast.error(`Ride request for ${childName} rejected`);
    // Stay in admin panel, don't navigate away
  };

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
        {/* Header with App Theme */}
        <div 
          className="px-5 py-4 flex items-center justify-between"
          style={{ background: GRADIENTS.primary }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="bg-white/20 flex items-center justify-center"
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: RADIUS.lg 
              }}
            >
              <Bell size={ICON.sm} className="text-white" />
            </div>
            <div>
              <h2 
                className="text-white"
                style={{ 
                  fontSize: TYPOGRAPHY.heading.size,
                  fontWeight: TYPOGRAPHY.heading.weight,
                }}
              >
                Notifications
              </h2>
              <p 
                className="text-white/80"
                style={{ fontSize: TYPOGRAPHY.caption.size }}
              >
                {unreadCount} new notifications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95"
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: RADIUS.md 
            }}
          >
            <X size={ICON.sm} className="text-white" />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student or parent name..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* New Ride Requests Section */}
          <div className="px-5 py-4 border-b border-gray-200 bg-orange-50/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-600" />
                <h3 className="font-semibold text-gray-900">New Ride Requests</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-blue-600 text-sm font-semibold hover:text-blue-700"
                >
                  Mark read
                </button>
              )}
            </div>
          </div>

          {/* Ride Request Cards */}
          <div className="p-5 space-y-3">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
                    request.isNew ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {request.type === 'pickup' ? 'Pick Up' : 'Drop Off'}
                        </h4>
                        {request.isNew && (
                          <span className="inline-block px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-medium">{request.childName}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {request.scheduledTime}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{request.timestamp}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(request.id, request.childName)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id, request.childName)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">
                  {searchQuery ? 'No matching requests found' : 'No new ride requests'}
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