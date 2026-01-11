import { Bell, ArrowLeft, CheckCircle, AlertCircle, Clock, User, MapPin } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import PageHeader from '../shared/PageHeader';

interface CaregiverNotificationsProps {
  onBack: () => void;
  caregiverId: string;
}

export default function CaregiverNotifications({ onBack, caregiverId }: CaregiverNotificationsProps) {
  const { getCaregiverNotifications, markAsRead, markAllAsRead } = useNotifications();
  
  const caregiverNotifications = getCaregiverNotifications(caregiverId);
  const unreadNotifications = caregiverNotifications.filter(n => n.status === 'unread');

  const formatTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffHours / 24)} day${Math.floor(diffHours / 24) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <PageHeader 
        title="Notifications"
        subtitle={unreadNotifications.length > 0 ? `${unreadNotifications.length} unread notification${unreadNotifications.length > 1 ? 's' : ''}` : undefined}
        onBack={onBack}
        rightElement={
          unreadNotifications.length > 0 ? (
            <button
              onClick={markAllAsRead}
              className="text-sm px-3 py-1.5 rounded-lg text-white bg-white/20 hover:bg-white/30 active:scale-95 transition-all"
              style={{ fontWeight: 600 }}
            >
              Mark all read
            </button>
          ) : undefined
        }
      />

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {caregiverNotifications.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <Bell className="w-8 h-8" style={{ color: '#2F6F9F' }} />
            </div>
            <h3 className="text-gray-900 mb-2">No Notifications Yet</h3>
            <p className="text-gray-600 text-sm">
              You'll receive notifications when your child is dropped off at school
            </p>
          </div>
        ) : (
          caregiverNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
                notification.status === 'unread' 
                  ? 'border-blue-200 bg-blue-50/30' 
                  : 'border-gray-100'
              }`}
              onClick={() => notification.status === 'unread' && markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'dropoff_complete'
                      ? 'bg-green-100'
                      : 'bg-blue-100'
                  }`}
                >
                  {notification.type === 'dropoff_complete' ? (
                    <CheckCircle
                      className="w-6 h-6 text-green-600"
                    />
                  ) : (
                    <AlertCircle
                      className="w-6 h-6 text-blue-600"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-gray-900 mb-0" style={{ fontSize: '16px', fontWeight: 600 }}>
                      {notification.type === 'dropoff_complete' 
                        ? 'Child Dropped Off' 
                        : 'Ride Request Received'}
                    </h3>
                    {notification.status === 'unread' && (
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: '#2F6F9F' }} />
                    )}
                  </div>

                  <p className="text-gray-700 mb-3" style={{ fontSize: '15px' }}>
                    {notification.type === 'dropoff_complete' 
                      ? `${notification.childName} has been safely dropped off at ${notification.school}.`
                      : `Ride request for ${notification.childName} has been received.`}
                  </p>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600">{notification.childName}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600">{notification.school}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600">
                        {notification.date} at {notification.time}
                      </span>
                    </div>
                  </div>

                  {/* Time ago */}
                  <p className="text-gray-400 text-xs mt-3">
                    {formatTimeAgo(notification.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}