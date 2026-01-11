import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { 
  Users, 
  Car, 
  Baby, 
  Shield,
  Settings,
  LogOut,
  Bell,
  Clock,
  MessageSquare
} from 'lucide-react';
import TimetableManagement from './admin/TimetableManagement';
import NotificationPanel from './admin/NotificationPanel';
import { useNotifications } from '../contexts/NotificationContext';
import { COLORS, ICON, RADIUS, SPACING, BUTTON, BOTTOM_NAV, Z_INDEX, TYPOGRAPHY, GRADIENTS } from '../constants/designSystem';
import { formatDate } from '../utils/dateFormatter';

interface AdminDashboardProps {
  user: any;
  onNavigate: (page: string, params?: { rideId?: number }) => void;
  onLogout?: () => void;
}

export default function AdminDashboard({ user, onNavigate, onLogout }: AdminDashboardProps) {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  const stats = [
    { label: 'Active Rides', value: 6, icon: Car },
    { label: 'Total Users', value: 25, icon: Users },
    { label: 'Active Drivers', value: 1, icon: Users },
    { label: 'Children', value: 18, icon: Baby }
  ];

  // Mock data for search (in a real app, this would come from a database)
  const allUsers = [
    { id: 1, name: 'Mike Kereama', type: 'driver', email: 'mike@pahi.com' },
    { id: 2, name: 'Rachel Mitchell', type: 'caregiver', email: 'rachel@example.com' },
    { id: 3, name: 'Maria Kahukura', type: 'caregiver', email: 'maria@example.com' },
  ];

  const allChildren = [
    { id: 1, name: 'Ciara Mitchell', school: 'Wairoa Primary School' },
    { id: 2, name: 'Johnny Whaanga', school: 'Wairoa Primary School' },
    { id: 3, name: 'Blu Kahukura', school: 'Wairoa College' },
  ];

  const allRides = [
    { id: 1, childName: 'Ciara Mitchell', type: 'pickup', status: 'in-progress', time: '08:30 AM' },
    { id: 2, childName: 'Johnny Whaanga', type: 'pickup', status: 'scheduled', time: '08:35 AM' },
    { id: 3, childName: 'Blu Kahukura', type: 'dropoff', status: 'scheduled', time: '03:00 PM' },
  ];

  // Search filtering
  const searchResults = {
    users: allUsers.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.type.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    children: allChildren.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.school.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    rides: allRides.filter(r => 
      r.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.status.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  const hasResults = searchResults.users.length > 0 || 
                     searchResults.children.length > 0 || 
                     searchResults.rides.length > 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const recentAlerts = [
    { 
      message: 'Ciara Mitchell in transit to Wairoa Primary', 
      time: '5 min ago',
      type: 'live_ride',
      isLive: true,
      route: 'admin-rides',
      rideId: 1 // Live ride - Ciara Mitchell
    },
    { 
      message: 'Mike Kereama confirmed for 03:15 PM - Mercedez Smith', 
      time: '15 min ago',
      type: 'driver_confirmed',
      isLive: false,
      route: 'admin-rides',
      rideId: 4 // Mercedez Smith's scheduled ride at 03:15 PM
    }
  ];

  const navigationItems = [
    { id: 'users', label: 'Users', icon: Users, route: 'admin-users' },
    { id: 'rides', label: 'Rides', icon: Car, route: 'admin-rides' },
    { id: 'children', label: 'Children', icon: Baby, route: 'admin-children' },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, route: 'admin-feedback' },
    { id: 'safety', label: 'Safety', icon: Shield, route: 'admin-safety' }
  ];

  return (
    <div className="h-screen bg-gray-50 pb-24 overflow-y-auto">
      {/* Clean Professional Header */}
      <div 
        className="text-white px-5 pt-6 pb-32"
        style={{ background: GRADIENTS.primary }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 
              className="text-white mb-1" 
              style={{ 
                fontSize: TYPOGRAPHY.pageTitle.size,
                fontWeight: TYPOGRAPHY.pageTitle.weight,
              }}
            >
              Admin Dashboard
            </h1>
            <p 
              className="text-white/90"
              style={{ 
                fontSize: TYPOGRAPHY.bodySmall.size,
              }}
            >
              Welcome, {user?.name || 'Admin User'}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <button
              onClick={() => setShowNotificationPanel(true)}
              className="p-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors active:scale-95 relative"
            >
              <Bell size={ICON.md} className="text-white" />
              {/* Badge with number of new notifications */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </span>
            </button>
            
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors active:scale-95"
            >
              <LogOut size={ICON.md} className="text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search users, rides, or children..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            style={{ fontSize: TYPOGRAPHY.body.size }}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Search Results Overlay */}
      {showSearchResults && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={clearSearch}>
          <div 
            className="bg-white mt-[180px] mx-5 rounded-2xl shadow-2xl max-h-[60vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {hasResults ? (
              <div className="p-4">
                {/* Users Results */}
                {searchResults.users.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                      <Users size={16} />
                      Users ({searchResults.users.length})
                    </h3>
                    <div className="space-y-2">
                      {searchResults.users.map(user => (
                        <button
                          key={user.id}
                          onClick={() => {
                            clearSearch();
                            onNavigate('admin-users');
                          }}
                          className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-blue-50 active:scale-[0.98] transition-all"
                        >
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-blue-600 capitalize mt-1">{user.type}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Children Results */}
                {searchResults.children.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                      <Baby size={16} />
                      Children ({searchResults.children.length})
                    </h3>
                    <div className="space-y-2">
                      {searchResults.children.map(child => (
                        <button
                          key={child.id}
                          onClick={() => {
                            clearSearch();
                            onNavigate('admin-children');
                          }}
                          className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-blue-50 active:scale-[0.98] transition-all"
                        >
                          <p className="font-medium text-gray-900">{child.name}</p>
                          <p className="text-sm text-gray-600">{child.school}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rides Results */}
                {searchResults.rides.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                      <Car size={16} />
                      Rides ({searchResults.rides.length})
                    </h3>
                    <div className="space-y-2">
                      {searchResults.rides.map(ride => (
                        <button
                          key={ride.id}
                          onClick={() => {
                            clearSearch();
                            onNavigate('admin-rides');
                          }}
                          className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-blue-50 active:scale-[0.98] transition-all"
                        >
                          <p className="font-medium text-gray-900">{ride.childName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize">
                              {ride.type}
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded capitalize">
                              {ride.status}
                            </span>
                            <span className="text-xs text-gray-500">{ride.time}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-900 font-medium mb-1">No results found</p>
                <p className="text-gray-500 text-sm">Try searching for a different term</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="px-5 -mt-24 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isActiveRides = stat.label === 'Active Rides';
            return (
              <div 
                key={stat.label} 
                className={`bg-white rounded-xl p-5 shadow-sm ${isActiveRides ? 'cursor-pointer active:scale-95 transition-transform' : ''}`}
                onClick={isActiveRides ? () => onNavigate('admin-track') : undefined}
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <Icon size={ICON.sm} className="text-blue-600" />
                </div>
                <p 
                  className="text-gray-600 mb-1"
                  style={{ fontSize: TYPOGRAPHY.bodySmall.size }}
                >
                  {stat.label}
                </p>
                <p 
                  className="text-gray-900"
                  style={{ 
                    fontSize: TYPOGRAPHY.stat.size,
                    fontWeight: TYPOGRAPHY.stat.weight,
                  }}
                >
                  {stat.value}
                </p>
                {isActiveRides && (
                  <p 
                    className="text-blue-600 mt-2"
                    style={{ 
                      fontSize: TYPOGRAPHY.caption.size,
                      fontWeight: TYPOGRAPHY.captionBold.weight,
                    }}
                  >
                    Tap to track live
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 
            className="text-gray-900"
            style={{ 
              fontSize: TYPOGRAPHY.heading.size,
              fontWeight: TYPOGRAPHY.heading.weight,
            }}
          >
            Recent Alerts
          </h2>
          <Bell size={ICON.sm} className="text-gray-400" />
        </div>

        <div className="space-y-2">
          {recentAlerts.map((alert, index) => (
            <button
              key={index}
              onClick={() => onNavigate(alert.route, { rideId: alert.rideId })}
              className={`w-full rounded-xl p-4 border text-left active:scale-[0.98] transition-all ${
                alert.isLive 
                  ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                  : 'bg-blue-50 border-blue-100 hover:bg-blue-100'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <p 
                  className="text-gray-900 flex-1"
                  style={{ 
                    fontSize: TYPOGRAPHY.bodySmall.size,
                    fontWeight: TYPOGRAPHY.label.weight,
                  }}
                >
                  {alert.message}
                </p>
                {alert.isLive && (
                  <span className="ml-2 px-2.5 py-1 bg-green-600 text-white rounded-full text-xs font-bold flex-shrink-0 animate-pulse">
                    LIVE
                  </span>
                )}
              </div>
              <p 
                className="text-gray-500 flex items-center gap-1"
                style={{ fontSize: TYPOGRAPHY.caption.size }}
              >
                <Clock size={12} />
                {alert.time}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Ride Request Notifications - Only Tomorrow's Rides */}
      {(() => {
        // Get tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDateStr = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD
        
        // Filter for unconfirmed ride requests scheduled for tomorrow
        const tomorrowRides = notifications.filter(n => 
          n.type === 'ride_request' && 
          !n.confirmed && 
          n.date === tomorrowDateStr
        );
        
        if (tomorrowRides.length === 0) return null;
        
        return (
          <div className="px-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-gray-900 font-semibold" style={{ fontSize: '18px' }}>
                  Tomorrow's Ride Requests
                </h2>
                <div
                  className="px-2 py-1 rounded-full"
                  style={{ backgroundColor: '#EF4444' }}
                >
                  <span className="text-white" style={{ fontSize: '12px', fontWeight: 700 }}>
                    {tomorrowRides.length}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('admin-notifications')}
                className="text-blue-600"
                style={{ fontSize: '13px', fontWeight: 600 }}
              >
                View all
              </button>
            </div>

            <div className="space-y-2">
              {tomorrowRides
                .slice(0, 3)
                .map((notification) => {
                  const timeAgo = () => {
                    const now = new Date();
                    const created = new Date(notification.createdAt);
                    const diffMs = now.getTime() - created.getTime();
                    const diffMins = Math.floor(diffMs / 60000);

                    if (diffMins < 1) return 'Just now';
                    if (diffMins < 60) return `${diffMins} min ago`;
                    const diffHours = Math.floor(diffMins / 60);
                    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                    return `${Math.floor(diffHours / 24)} day${Math.floor(diffHours / 24) > 1 ? 's' : ''} ago`;
                  };

                  return (
                    <div
                      key={notification.id}
                      className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200 cursor-pointer active:scale-[0.98] transition-all"
                      onClick={() => onNavigate('admin-notifications')}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-orange-600" />
                          <p className="text-gray-900 font-semibold" style={{ fontSize: '14px' }}>
                            {notification.rideType === 'pickup' ? 'Pick Up' : 'Drop Off'} Request
                          </p>
                        </div>
                        <div className="px-2 py-1 bg-orange-200 rounded-full">
                          <span className="text-orange-800" style={{ fontSize: '11px', fontWeight: 600 }}>
                            NEW
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-1" style={{ fontSize: '13px' }}>
                        <span className="font-semibold">{notification.childName}</span> • {notification.school}
                      </p>
                      <p className="text-gray-600 mb-2" style={{ fontSize: '12px' }}>
                        {formatDate(notification.date)} at {notification.time}
                      </p>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeAgo()}
                      </p>
                    </div>
                  );
                })}</div>

            {tomorrowRides.length > 3 && (
              <button
                onClick={() => onNavigate('admin-notifications')}
                className="w-full mt-3 py-2 text-blue-600"
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                View all {tomorrowRides.length} requests
              </button>
            )}
          </div>
        );
      })()}

      {/* Verified Driver Status */}
      <div className="px-5 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between">
          <span className="text-gray-700 font-semibold">Verified Driver</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600 text-sm font-semibold">Active</span>
          </div>
        </div>
      </div>

      {/* Timetable Management */}
      <div className="px-5 mb-6">
        <TimetableManagement />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="grid grid-cols-5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.route)}
                className="flex flex-col items-center py-3 px-2 text-gray-500 hover:bg-gray-50 transition-colors active:scale-95"
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification Panel */}
      {showNotificationPanel && (
        <NotificationPanel
          isOpen={showNotificationPanel}
          onClose={() => setShowNotificationPanel(false)}
          onMarkAllAsRead={markAllAsRead}
          notifications={notifications}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}