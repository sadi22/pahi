import { ArrowLeft } from 'lucide-react';
import { COLORS, ICON, RADIUS, TOUCH_TARGET } from '../../constants/designSystem';

interface BackButtonProps {
  onClick: () => void;
  variant?: 'transparent' | 'white' | 'dark';
  label?: string;
}

/**
 * Standardized Back Button Component
 * Used consistently across all pages in the app
 */
export default function BackButton({ onClick, variant = 'transparent', label }: BackButtonProps) {
  const variants = {
    transparent: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: COLORS.white,
      hoverBg: 'rgba(255, 255, 255, 0.3)',
    },
    white: {
      background: COLORS.white,
      color: COLORS.textPrimary,
      hoverBg: '#f1f5f9',
    },
    dark: {
      background: COLORS.dark,
      color: COLORS.white,
      hoverBg: COLORS.primary,
    },
  };

  const style = variants[variant];

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 active:scale-95 transition-all"
      style={{
        background: style.background,
        color: style.color,
        borderRadius: RADIUS.lg,
        padding: '10px 16px',
        minHeight: TOUCH_TARGET.minSize,
        minWidth: TOUCH_TARGET.minSize,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = style.hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = style.background;
      }}
    >
      <ArrowLeft 
        size={ICON.md} 
        strokeWidth={2.5}
      />
      {label && (
        <span style={{ fontSize: '16px', fontWeight: 600 }}>
          {label}
        </span>
      )}
    </button>
  );
}
