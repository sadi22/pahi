import { Book, Circle, Guitar, Palette, Star, Rocket, Heart, Music, Camera, Trophy } from 'lucide-react';
import { AVATAR, COLORS, RADIUS } from '../constants/designSystem';

interface ChildAvatarProps {
  photoUrl?: string;
  initials: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
}

// Map of icon names to Lucide components with their colors
const iconMap: { [key: string]: { component: any; color: string } } = {
  book: { component: Book, color: '#8B4513' }, // Brown
  ball: { component: Circle, color: '#4CAF50' }, // Green
  guitar: { component: Guitar, color: '#FF6B35' }, // Orange
  palette: { component: Palette, color: '#FF6B9D' }, // Pink/Coral
  star: { component: Star, color: '#FFD700' }, // Yellow/Gold
  rocket: { component: Rocket, color: '#E53935' }, // Red
  heart: { component: Heart, color: '#EF5350' }, // Red
  music: { component: Music, color: '#9B7EBD' }, // Purple
  camera: { component: Camera, color: '#455A64' }, // Gray
  trophy: { component: Trophy, color: '#FFC107' }, // Gold
};

export default function ChildAvatar({ photoUrl, initials, name, size = 'md', backgroundColor }: ChildAvatarProps) {
  // Check if photoUrl is an icon key
  const iconData = photoUrl && iconMap[photoUrl.toLowerCase()] ? iconMap[photoUrl.toLowerCase()] : null;
  
  const sizeStyles = {
    sm: { dimension: AVATAR.sm, iconSize: 20, fontSize: 'text-sm' },
    md: { dimension: AVATAR.md, iconSize: 28, fontSize: 'text-lg' },
    lg: { dimension: AVATAR.lg, iconSize: 40, fontSize: 'text-2xl' },
    xl: { dimension: AVATAR.xl, iconSize: 48, fontSize: 'text-3xl' }
  };

  const currentSize = sizeStyles[size];

  return (
    <div 
      className={`${currentSize.fontSize} rounded-2xl flex items-center justify-center flex-shrink-0`}
      style={{ 
        width: currentSize.dimension,
        height: currentSize.dimension,
        backgroundColor: backgroundColor || COLORS.accent,
        borderRadius: RADIUS.lg,
      }}
    >
      {iconData ? (
        <iconData.component 
          size={currentSize.iconSize}
          style={{ color: iconData.color }}
          strokeWidth={2.5}
          fill={photoUrl === 'star' ? iconData.color : 'none'}
        />
      ) : photoUrl && photoUrl.startsWith('http') ? (
        <img 
          src={photoUrl} 
          alt={name}
          className="w-full h-full object-cover"
          style={{ borderRadius: RADIUS.lg }}
        />
      ) : (
        <span className={`${currentSize.fontSize} font-semibold`} style={{ color: COLORS.primary }}>
          {initials}
        </span>
      )}
    </div>
  );
}