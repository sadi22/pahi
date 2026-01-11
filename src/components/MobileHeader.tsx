import { Menu, Bell } from 'lucide-react';

interface MobileHeaderProps {
  currentPage: string;
  onMenuToggle: () => void;
  user: any;
  onNotificationClick?: () => void;
}

export default function MobileHeader({ currentPage, onMenuToggle, user, onNotificationClick }: MobileHeaderProps) {
  const pageTitles: { [key: string]: string } = {
    home: 'Pahi',
    book: 'Book a Ride',
    track: 'Track Ride',
    history: 'Ride History',
    profile: 'Profile',
    children: 'My Children',
    help: 'Help & Support',
    feedback: 'Feedback',
    notifications: 'Notifications',
    admin: 'Admin Dashboard',
    'admin-users': 'User Management',
    'admin-rides': 'Ride Management',
    'admin-safety': 'Safety Oversight',
    'admin-children': 'Child Management',
    'admin-settings': 'Settings'
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-4">
        <button 
          onClick={onMenuToggle}
          className="p-2 -ml-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-700" />
        </button>
        
        <h1 className="text-slate-900 font-semibold">
          {pageTitles[currentPage] || 'Pahi'}
        </h1>
        
        <button 
          onClick={onNotificationClick}
          className="p-2 -mr-2 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-colors relative"
        >
          <Bell className="w-6 h-6 text-slate-700" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}
