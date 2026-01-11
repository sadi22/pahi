import { X, Home, User, Users, Calendar, MapPin, HistoryIcon as History, HelpCircle, MessageSquare, LogOut, Shield, Car, Baby, AlertCircle, BarChart3, Settings } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user: any;
}

export default function MobileMenu({ isOpen, onClose, currentPage, onNavigate, onLogout, user }: MobileMenuProps) {
  const isAdmin = user?.role === 'admin';
  
  const caregiverMenuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'children', label: 'Manage Children', icon: Users },
    { id: 'book', label: 'Book New Ride', icon: Calendar },
    { id: 'track', label: 'Track Ride', icon: MapPin },
    { id: 'history', label: 'Ride History', icon: History },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
    { id: 'feedback', label: 'Send Feedback', icon: MessageSquare }
  ];

  const adminMenuItems = [
    { id: 'admin', label: 'Dashboard', icon: Home },
    { id: 'admin-users', label: 'User Management', icon: Users },
    { id: 'admin-rides', label: 'Ride Management', icon: Car },
    { id: 'admin-children', label: 'Child & Caregiver', icon: Baby },
    { id: 'admin-safety', label: 'Safety Oversight', icon: AlertCircle },
    { id: 'admin-settings', label: 'Settings & Permissions', icon: Settings }
  ];

  const menuItems = isAdmin ? adminMenuItems : caregiverMenuItems;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer - matches your screenshot style */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header with User Info - Blue-gray gradient */}
        <div className="text-white p-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2>Menu</h2>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center" style={{ color: '#2F6F9F' }}>
              <span className="text-lg">
                {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'SJ'}
              </span>
            </div>
            <div>
              <p className="text-white">{user?.name || 'Rachel Mitchell'}</p>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{isAdmin ? 'Administrator' : 'Caregiver'}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto bg-gray-50">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 transition-colors ${
                  isActive
                    ? 'bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={isActive ? { color: '#2F6F9F' } : {}}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer - Logout */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}