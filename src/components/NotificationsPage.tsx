import { ArrowLeft, Check, MapPin, Calendar, CheckCircle, AlertCircle, Bell } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { toast } from 'sonner@2.0.3';
import { formatDate } from '../utils/dateFormatter';

interface NotificationsPageProps {
  onBack: () => void;
  isAdminMode?: boolean;
}

export default function NotificationsPage({ onBack, isAdminMode = false }: NotificationsPageProps) {
  const { notifications, markAsRead, confirmRide } = useNotifications();

  const handleConfirmRide = (notificationId: string, notification: any) => {
    // Mark the ride as confirmed and create confirmation notification for caregiver
    confirmRide(notificationId);
    
    toast.success('Ride Confirmed!', {
      description: `Ride for ${notification.childName} has been confirmed`,
      duration: 4000
    });
    
    // Mark as read
    markAsRead(notificationId);
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInMs = now.getTime() - then.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    
    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} minute${diffInMins !== 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="px-5 pt-6 pb-5" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-4 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span style={{ fontSize: '16px', fontWeight: 600 }}>Back</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white mb-1" style={{ fontSize: '24px', fontWeight: 700 }}>
              Notifications
            </h1>
            <p className="text-white/90" style={{ fontSize: '14px' }}>
              {notifications.filter(n => n.status === 'unread').length} unread
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-5 pt-5 space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>
              No notifications
            </p>
            <p className="text-gray-600" style={{ fontSize: '14px' }}>
              You're all caught up!
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const isRideRequest = notification.type === 'ride_request';
            const isDropoffComplete = notification.type === 'dropoff_complete';
            const isRideConfirmed = notification.type === 'ride_confirmed';
            
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all ${
                  notification.status === 'unread' 
                    ? 'border-blue-200 bg-blue-50/30' 
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isRideRequest 
                        ? 'bg-blue-100' 
                        : isDropoffComplete 
                        ? 'bg-green-100'
                        : 'bg-purple-100'
                    }`}
                  >
                    {isRideRequest && <MapPin className="w-6 h-6 text-blue-600" />}
                    {isDropoffComplete && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {isRideConfirmed && <Check className="w-6 h-6 text-purple-600" />}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                          {isRideRequest && 'New Ride Request'}
                          {isDropoffComplete && 'Drop-off Complete'}
                          {isRideConfirmed && 'Ride Confirmed'}
                        </h3>
                        <p className="text-gray-600 mb-2" style={{ fontSize: '14px' }}>
                          {isRideRequest && `${notification.caregiverName} requested a ${notification.rideType} for ${notification.childName}`}
                          {isDropoffComplete && `${notification.childName} was safely dropped off`}
                          {isRideConfirmed && `Your ${notification.rideType} ride for ${notification.childName} has been confirmed`}
                        </p>
                      </div>
                      {notification.status === 'unread' && (
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>

                    {/* Ride Details */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-gray-600" style={{ fontSize: '13px' }}>
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(notification.date)} at {notification.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600" style={{ fontSize: '13px' }}>
                        <MapPin className="w-4 h-4" />
                        <span>{notification.school}</span>
                      </div>
                    </div>

                    {/* Actions for Admin */}
                    {isAdminMode && isRideRequest && !notification.confirmed && (
                      <button
                        onClick={() => handleConfirmRide(notification.id, notification)}
                        className="w-full rounded-xl py-3 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                        style={{ 
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          fontSize: '14px',
                          fontWeight: 600
                        }}
                      >
                        <Check className="w-5 h-5" />
                        Confirm Ride
                      </button>
                    )}

                    {/* Confirmed Badge */}
                    {notification.confirmed && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-700" style={{ fontSize: '13px', fontWeight: 600 }}>
                          Confirmed
                        </span>
                      </div>
                    )}

                    {/* Time */}
                    <p className="text-gray-400 mt-3" style={{ fontSize: '12px' }}>
                      {getRelativeTime(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}