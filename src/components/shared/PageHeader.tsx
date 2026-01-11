import { LogOut, Bell } from 'lucide-react';
import BackButton from './BackButton';
import { COLORS, ICON, RADIUS, TOUCH_TARGET, HEADER, TYPOGRAPHY, GRADIENTS } from '../../constants/designSystem';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onLogout?: () => void;
  showNotifications?: boolean;
  onNotifications?: () => void;
  notificationCount?: number;
  variant?: 'gradient' | 'solid';
  backLabel?: string;
}

/**
 * Standardized Page Header Component
 * Ensures consistent header design across all pages
 */
export default function PageHeader({ 
  title, 
  subtitle, 
  onBack, 
  onLogout,
  showNotifications,
  onNotifications,
  notificationCount = 0,
  variant = 'gradient',
  backLabel,
}: PageHeaderProps) {
  // Always use the consistent primary gradient
  const headerBackground = GRADIENTS.primary;

  return (
    <div 
      className="px-5 pt-6 pb-8"
      style={{ 
        background: headerBackground,
        minHeight: HEADER.mobileHeight,
      }}
    >
      {/* Top Row: Back, Title, Actions */}
      <div className="flex items-center justify-between mb-2">
        {/* Back Button */}
        <div>
          {onBack && (
            <BackButton 
              onClick={onBack} 
              variant="transparent"
              label={backLabel}
            />
          )}
        </div>

        {/* Right Actions: Notifications & Logout */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          {showNotifications && onNotifications && (
            <button
              onClick={onNotifications}
              className="relative active:scale-95 transition-all"
              style={{
                width: TOUCH_TARGET.minSize,
                height: TOUCH_TARGET.minSize,
                borderRadius: RADIUS.lg,
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bell size={ICON.md} color={COLORS.white} strokeWidth={2.5} />
              {notificationCount > 0 && (
                <div 
                  className="absolute -top-1 -right-1"
                  style={{
                    background: COLORS.danger,
                    color: COLORS.white,
                    borderRadius: RADIUS.full,
                    minWidth: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '0 5px',
                    border: `2px solid ${COLORS.white}`,
                  }}
                >
                  {notificationCount > 99 ? '99+' : notificationCount}
                </div>
              )}
            </button>
          )}

          {/* Logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="active:scale-95 transition-all"
              style={{
                width: TOUCH_TARGET.minSize,
                height: TOUCH_TARGET.minSize,
                borderRadius: RADIUS.lg,
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LogOut size={ICON.md} color={COLORS.white} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      {/* Title & Subtitle */}
      <div>
        <h1 
          className="text-white mb-1" 
          style={{ 
            fontSize: TYPOGRAPHY.pageTitle.size,
            fontWeight: TYPOGRAPHY.pageTitle.weight,
            lineHeight: TYPOGRAPHY.pageTitle.lineHeight,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p 
            className="text-white/90" 
            style={{ 
              fontSize: TYPOGRAPHY.bodySmall.size,
              lineHeight: TYPOGRAPHY.bodySmall.lineHeight,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}