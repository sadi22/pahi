import { Home, Users, Navigation, Clock, User } from 'lucide-react';

interface SimpleBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function SimpleBottomNav({ currentPage, onNavigate }: SimpleBottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rides', label: 'Rides', icon: Users },
    { id: 'track', label: 'Track', icon: Navigation },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all active:scale-95 min-w-[60px]"
              style={{
                color: isActive ? '#2F6F9F' : '#6B7280',
                backgroundColor: isActive ? '#E0F7FA' : 'transparent'
              }}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
