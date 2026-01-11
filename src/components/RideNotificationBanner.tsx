import { Navigation, X } from 'lucide-react';
import { COLORS, RADIUS, ICON, BUTTON, Z_INDEX } from '../constants/designSystem';

interface RideNotificationBannerProps {
  childName: string;
  onTrack: () => void;
  onDismiss: () => void;
}

export default function RideNotificationBanner({ childName, onTrack, onDismiss }: RideNotificationBannerProps) {
  return (
    <div 
      className="fixed top-4 left-4 right-4 animate-slide-down"
      style={{ zIndex: Z_INDEX.notification }}
    >
      <div 
        className="shadow-2xl p-5 border-2"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
          borderColor: COLORS.accent,
          borderRadius: RADIUS.xl,
        }}
      >
        <div className="flex items-start gap-4">
          <div 
            className="w-12 h-12 bg-white flex items-center justify-center flex-shrink-0"
            style={{ borderRadius: RADIUS.md }}
          >
            <Navigation size={ICON.md} style={{ color: COLORS.primary }} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-white mb-1" style={{ fontSize: '17px', fontWeight: 600 }}>
              Ride Started
            </h3>
            <p className="text-white/90 mb-4" style={{ fontSize: '14px' }}>
              {childName}'s ride has started. Track the ride to see live location.
            </p>
            
            <button
              onClick={onTrack}
              className="w-full bg-white font-medium active:scale-95 transition-all shadow-md"
              style={{ 
                fontSize: BUTTON.fontSizeMd,
                color: COLORS.dark,
                fontWeight: 600,
                height: BUTTON.heightMd,
                borderRadius: RADIUS.lg,
              }}
            >
              Track Ride Now
            </button>
          </div>
          
          <button
            onClick={onDismiss}
            className="flex-shrink-0 w-8 h-8 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            style={{ borderRadius: RADIUS.sm }}
          >
            <X size={ICON.sm} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}