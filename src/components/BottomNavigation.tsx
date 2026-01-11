import { Home, Calendar, MapPin, History, User, Users, Car, Baby, BarChart3, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user?: any;
}

export default function BottomNavigation({ currentPage, onNavigate, user }: BottomNavigationProps) {
  const isAdmin = user?.role === 'admin';
  
  const caregiverNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'book', label: 'Book', icon: Calendar },
    { id: 'track', label: 'Track', icon: MapPin },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const adminNavItems = [
    { id: 'admin', label: 'Dashboard', icon: Home },
    { id: 'admin-rides', label: 'Rides', icon: Car },
    { id: 'admin-users', label: 'Users', icon: Users },
    { id: 'admin-children', label: 'Children', icon: Baby },
    { id: 'admin-settings', label: 'Settings', icon: Settings }
  ];

  const navItems = isAdmin ? adminNavItems : caregiverNavItems;

  return (
    <nav className="bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
      <div className="flex justify-around items-center px-2 py-2 max-w-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all active:scale-95 min-w-[68px] ${
                isActive 
                  ? 'text-[#2F6F9F]' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className={`relative ${isActive ? 'mb-1' : 'mb-1.5'}`}>
                <Icon className={`w-6 h-6 transition-all ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: '#2F6F9F' }}></div>
                )}
              </div>
              <span className={`text-[11px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}