import { Home, MapPin, Calendar, Users, CheckSquare, UserPlus, MessageSquare, LogOut, X, Car, Shield } from 'lucide-react';

interface DriverMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function DriverMenu({ isOpen, onClose, currentPage, onNavigate, onLogout }: DriverMenuProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, description: 'Dashboard overview' },
    { id: 'tracking', label: 'Live Map', icon: MapPin, description: 'Track rides in real-time' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, description: 'View your roster' },
    { id: 'details', label: 'Child Details', icon: Users, description: 'View children & caregivers' },
    { id: 'checkin', label: 'Check-In', icon: CheckSquare, description: 'Mark attendance' },
    { id: 'register', label: 'Register Child', icon: UserPlus, description: 'Add new child' },
    { id: 'updates', label: 'Send Updates', icon: MessageSquare, description: 'Message caregivers' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="text-white px-6 py-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white mb-0">Mike Kereama</h3>
                <p className="text-blue-100 text-sm">Certified Driver</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Verified Badge */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-100" />
              <span className="text-blue-100 text-sm">Wairoa Community Verified</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-4 px-3 flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <p className="px-3 mb-3 text-xs text-gray-500 uppercase tracking-wider">Navigation</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-start gap-3 px-3 py-3.5 rounded-xl mb-2 transition-all ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={isActive ? { background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' } : {}}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isActive ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`mb-0 ${isActive ? 'text-white' : 'text-gray-900'}`}>{item.label}</p>
                  <p className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
