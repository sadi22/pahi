import { useState } from 'react';
import { Users, Car, Baby, Shield, BarChart3, Settings, X, Home, LogOut } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

interface AdminMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  currentPage?: string;
}

export default function AdminMenu({ isOpen, onClose, onNavigate, onLogout }: AdminMenuProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    {
      id: 'admin',
      title: 'Dashboard',
      icon: Home,
      color: '#2F6F9F',
      route: 'admin'
    },
    {
      id: 'users',
      title: 'User Management',
      icon: Users,
      color: '#2F6F9F',
      route: 'admin-users'
    },
    {
      id: 'rides',
      title: 'Ride Management',
      icon: Car,
      color: '#5699D2',
      route: 'admin-rides'
    },
    {
      id: 'children',
      title: 'Child & Caregiver',
      icon: Baby,
      color: '#2F6F9F',
      route: 'admin-children'
    },
    {
      id: 'safety',
      title: 'Safety & Compliance',
      icon: Shield,
      color: '#5699D2',
      route: 'admin-safety'
    },
    {
      id: 'settings',
      title: 'System Settings',
      icon: Settings,
      color: '#2F6F9F',
      route: 'admin-settings'
    }
  ];

  const handleNavigate = (route: string) => {
    onNavigate(route);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Logout?"
        message="Are you sure you want to logout? You will need to login again to access the admin panel."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={() => {
          if (onLogout) {
            onLogout();
            onClose();
          }
        }}
        onCancel={() => setShowLogoutConfirm(false)}
        variant="warning"
      />

      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Menu Drawer */}
      <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl transform transition-transform">
        {/* Header */}
        <div 
          className="p-6 text-white"
          style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" />
              <h2 className="text-white">Admin Panel</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/80 text-sm">Navigation Menu</p>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.route)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors active:scale-98"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        {onLogout && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-[0.98]"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
