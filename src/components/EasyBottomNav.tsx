import { Home, Navigation, Clock, User, Car } from 'lucide-react';
import { COLORS, BOTTOM_NAV, ICON, RADIUS, Z_INDEX } from '../constants/designSystem';

interface EasyBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function EasyBottomNav({ currentPage, onNavigate }: EasyBottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'book', label: 'Book Ride', icon: Car },
    { id: 'track', label: 'Track', icon: Navigation },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 shadow-lg" 
      style={{ 
        borderColor: COLORS.border,
        zIndex: Z_INDEX.bottomNav,
        height: BOTTOM_NAV.height,
      }}
    >
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto h-full" style={{ padding: BOTTOM_NAV.padding }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-2 rounded-xl transition-all active:scale-95"
              style={{
                backgroundColor: isActive ? COLORS.accent : COLORS.white,
                border: `2px solid ${isActive ? COLORS.primary : 'transparent'}`,
                borderRadius: RADIUS.lg,
              }}
            >
              <Icon 
                size={BOTTOM_NAV.iconSize}
                style={{ 
                  color: isActive ? COLORS.primary : COLORS.textTertiary,
                  strokeWidth: isActive ? 2.5 : 2
                }}
              />
              <span 
                className="text-center leading-tight"
                style={{ 
                  color: isActive ? COLORS.primary : COLORS.textTertiary,
                  fontSize: BOTTOM_NAV.fontSize,
                  fontWeight: isActive ? 600 : 500
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}