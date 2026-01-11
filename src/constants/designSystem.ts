/**
 * Pahi App - Design System Constants
 * Ensures consistency across all components for mobile-first, user-friendly experience
 */

// PRIMARY COLOR PALETTE
export const COLORS = {
  // App Primary Colors (Blue-Gray Professional Palette)
  primary: '#2F6F9F',
  primaryDark: '#1e4d6f',
  primaryLight: '#5699D2',
  secondary: '#5699D2',
  accent: '#E0F7FA',
  dark: '#1F2937',
  
  // Status Colors
  success: '#10B981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3B82F6',
  
  // UI Colors
  white: '#ffffff',
  background: '#f8fafc',
  card: '#ffffff',
  border: '#e2e8f0',
  
  // Text Colors
  textPrimary: '#1F2937',
  textSecondary: '#475569',
  textTertiary: '#94a3b8',
  textLight: '#ffffff',
  
  // Shadows
  shadow: 'rgba(31, 41, 55, 0.04)',
  shadowMedium: 'rgba(31, 41, 55, 0.08)',
  shadowStrong: 'rgba(31, 41, 55, 0.12)',
} as const;

// GRADIENTS - CONSISTENT THROUGHOUT APP
export const GRADIENTS = {
  // Primary gradient - use for ALL headers, primary buttons, key UI elements
  primary: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)',
  
  // Success gradient - use for confirmation/success buttons
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  
  // Danger gradient - use for delete/danger actions
  danger: 'linear-gradient(90deg, #EF4444, #DC2626)',
  
  // Warning gradient - use for warning states
  warning: 'linear-gradient(90deg, #F59E0B, #D97706)',
  
  // Info gradient - use for info/neutral states
  info: 'linear-gradient(90deg, #10B981, #059669)',
} as const;

// TYPOGRAPHY - STRICT FONT SIZE SYSTEM
// Use these EXACT sizes everywhere - no custom sizes allowed
export const TYPOGRAPHY = {
  // Display Sizes (Large headings)
  display: {
    size: '32px',
    lineHeight: '1.2',
    weight: 700,
  },
  
  // Page Titles (Main page headers)
  pageTitle: {
    size: '24px',
    lineHeight: '1.3',
    weight: 600,
  },
  
  // Section Headings (Card titles, section headers)
  heading: {
    size: '18px',
    lineHeight: '1.4',
    weight: 600,
  },
  
  // Subheadings (Smaller section titles)
  subheading: {
    size: '16px',
    lineHeight: '1.4',
    weight: 600,
  },
  
  // Body Text (Standard paragraph text, descriptions)
  body: {
    size: '16px',
    lineHeight: '1.5',
    weight: 400,
  },
  
  // Body Small (Secondary text, descriptions)
  bodySmall: {
    size: '14px',
    lineHeight: '1.5',
    weight: 400,
  },
  
  // Labels (Form labels, input labels)
  label: {
    size: '14px',
    lineHeight: '1.4',
    weight: 500,
  },
  
  // Buttons (All button text)
  button: {
    size: '16px',
    lineHeight: '1.5',
    weight: 600,
  },
  
  // Button Small (Compact buttons)
  buttonSmall: {
    size: '14px',
    lineHeight: '1.5',
    weight: 600,
  },
  
  // Caption (Very small text, timestamps, meta info)
  caption: {
    size: '12px',
    lineHeight: '1.4',
    weight: 400,
  },
  
  // Caption Bold (Small emphasized text, badges)
  captionBold: {
    size: '12px',
    lineHeight: '1.4',
    weight: 600,
  },
  
  // Navigation (Bottom nav labels)
  nav: {
    size: '13px',
    lineHeight: '1.3',
    weight: 500,
  },
  
  // Navigation Active (Active nav item)
  navActive: {
    size: '13px',
    lineHeight: '1.3',
    weight: 600,
  },
  
  // Stats/Numbers (Large statistics)
  stat: {
    size: '28px',
    lineHeight: '1.2',
    weight: 700,
  },
} as const;

// SPACING (consistent padding, margin, gap)
export const SPACING = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.25rem',   // 20px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  '3xl': '3rem',   // 48px
} as const;

// BORDER RADIUS (rounded corners)
export const RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const;

// BUTTON STYLES (consistent across app)
export const BUTTON = {
  // Heights (touch-friendly)
  heightSm: '40px',     // Small buttons
  heightMd: '48px',     // Standard buttons
  heightLg: '56px',     // Large buttons
  
  // Padding
  paddingSm: '8px 16px',
  paddingMd: '12px 24px',
  paddingLg: '16px 32px',
  
  // Border Radius
  radius: RADIUS.lg,
  
  // Font Sizes - USE TYPOGRAPHY INSTEAD
  fontSizeSm: TYPOGRAPHY.buttonSmall.size,
  fontSizeMd: TYPOGRAPHY.button.size,
  fontSizeLg: TYPOGRAPHY.button.size,
} as const;

// ICON SIZES (consistent throughout app)
export const ICON = {
  xs: 16,    // Small icons in text
  sm: 20,    // Regular icons
  md: 24,    // Standard icons
  lg: 28,    // Large icons
  xl: 32,    // Extra large icons
  '2xl': 40, // Very large icons
} as const;

// CARD STYLES
export const CARD = {
  radius: RADIUS.xl,
  padding: SPACING.lg,
  shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  shadowMd: '0 4px 6px rgba(0, 0, 0, 0.1)',
  shadowLg: '0 10px 15px rgba(0, 0, 0, 0.1)',
} as const;

// HEADER HEIGHTS
export const HEADER = {
  mobileHeight: '64px',
  tabletHeight: '72px',
} as const;

// BOTTOM NAVIGATION
export const BOTTOM_NAV = {
  height: '80px',
  iconSize: ICON.lg,
  fontSize: TYPOGRAPHY.nav.size,
  padding: '12px',
} as const;

// AVATAR SIZES
export const AVATAR = {
  sm: '40px',   // 10 in Tailwind
  md: '56px',   // 14 in Tailwind
  lg: '80px',   // 20 in Tailwind
  xl: '96px',   // 24 in Tailwind
} as const;

// NOTIFICATION/TOAST SIZES
export const NOTIFICATION = {
  minHeight: '80px',
  padding: '20px',
  fontSize: TYPOGRAPHY.body.size,
  borderWidth: '3px',
  borderRadius: RADIUS.lg,
} as const;

// BADGE SIZES
export const BADGE = {
  paddingSm: '4px 8px',
  paddingMd: '6px 12px',
  paddingLg: '8px 16px',
  fontSize: TYPOGRAPHY.caption.size,
  radius: RADIUS.full,
} as const;

// INPUT/FORM FIELD STYLES
export const INPUT = {
  height: '48px',
  padding: '12px 16px',
  radius: RADIUS.lg,
  borderWidth: '2px',
  fontSize: TYPOGRAPHY.body.size, // 16px prevents zoom on iOS
} as const;

// SEARCH BAR
export const SEARCH = {
  height: '48px',
  padding: '12px 16px',
  radius: RADIUS.xl,
  fontSize: TYPOGRAPHY.body.size,
} as const;

// MAP MARKER SIZES
export const MARKER = {
  size: '48px',
  iconSize: ICON.md,
  pulseSize: '64px',
} as const;

// TRANSITIONS (consistent animation speeds)
export const TRANSITION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;

// Z-INDEX LAYERS
export const Z_INDEX = {
  base: 1,
  dropdown: 10,
  modal: 20,
  notification: 30,
  bottomNav: 40,
  header: 50,
} as const;

// FONT WEIGHTS (from globals.css)
export const FONT_WEIGHT = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// TOUCH TARGET (minimum size for mobile)
export const TOUCH_TARGET = {
  minSize: '44px', // Apple Human Interface Guidelines
} as const;

// CONTAINER PADDING (side margins)
export const CONTAINER = {
  paddingMobile: '20px',
  paddingTablet: '24px',
  maxWidth: '448px', // Max width for mobile-first design
} as const;