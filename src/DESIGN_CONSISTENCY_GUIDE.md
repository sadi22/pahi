# Pahi App - Design Consistency Guide

## 📐 Design System Implementation

All components now use the centralized design system from `/constants/designSystem.ts` to ensure consistency across the mobile application.

## 🎨 Color Palette (Strictly Enforced)

### Primary Colors
- **Primary Blue**: `COLORS.primary` (#2F6F9F) - Main brand color, buttons, active states
- **Primary Light**: `COLORS.primaryLight` (#5699D2) - Headers, gradients, hover states  
- **Accent**: `COLORS.accent` (#E0F7FA) - Backgrounds, highlights, selected items
- **Dark Gray**: `COLORS.dark` (#1F2937) - Text, headings

### Status Colors
- **Success**: `COLORS.success` (#10B981) - Approved, completed actions
- **Warning**: `COLORS.warning` (#f59e0b) - Pending, caution states
- **Danger**: `COLORS.danger` (#ef4444) - Errors, rejections, destructive actions
- **Info**: `COLORS.info` (#3B82F6) - Information, neutral notifications

### Text Colors
- **Primary Text**: `COLORS.textPrimary` (#1F2937) - Main content
- **Secondary Text**: `COLORS.textSecondary` (#475569) - Descriptions, labels
- **Tertiary Text**: `COLORS.textTertiary` (#94a3b8) - Inactive, disabled text

## 📏 Spacing & Sizing

### Standard Spacing Scale
```typescript
SPACING.xs   = 8px   // Tiny gaps
SPACING.sm   = 12px  // Small gaps
SPACING.md   = 16px  // Standard gaps
SPACING.lg   = 20px  // Large gaps
SPACING.xl   = 24px  // Extra large gaps
SPACING.2xl  = 32px  // Section spacing
SPACING.3xl  = 48px  // Major section spacing
```

### Border Radius (Rounded Corners)
```typescript
RADIUS.sm   = 8px   // Small items, badges
RADIUS.md   = 12px  // Inputs, small cards
RADIUS.lg   = 16px  // Buttons, cards
RADIUS.xl   = 20px  // Large cards, modals
RADIUS.2xl  = 24px  // Special large elements
RADIUS.full = 9999px // Circular items
```

## 🔘 Button Standards (Touch-Friendly)

### Button Heights (Minimum 44px for touch targets)
- **Small**: `BUTTON.heightSm` (40px) - Compact contexts only
- **Medium**: `BUTTON.heightMd` (48px) - Standard buttons ✅ RECOMMENDED
- **Large**: `BUTTON.heightLg` (56px) - Primary CTAs

### Button Padding
- Small: `8px 16px`
- Medium: `12px 24px` ✅ RECOMMENDED
- Large: `16px 32px`

### Button Styling
- Border Radius: `RADIUS.lg` (16px)
- Always include: `active:scale-95` for touch feedback
- Font Size: 16px (prevents zoom on iOS)
- Font Weight: 600 (semibold)

### Button Color Combinations
```typescript
// Primary Button
background: COLORS.primary
color: COLORS.white
border: none

// Secondary Button  
background: COLORS.white
color: COLORS.primary
border: 2px solid COLORS.primary

// Danger Button
background: COLORS.danger
color: COLORS.white
border: none
```

## 🖼️ Icons (Lucide React)

### Standard Icon Sizes
```typescript
ICON.xs   = 16px // Inline text icons
ICON.sm   = 20px // Small UI elements
ICON.md   = 24px // Standard icons ✅ RECOMMENDED
ICON.lg   = 28px // Large UI elements
ICON.xl   = 32px // Headers, emphasis
ICON.2xl  = 40px // Hero icons
```

### Icon Usage
- Always use `size={ICON.md}` for consistency
- Use `strokeWidth={2}` for regular icons
- Use `strokeWidth={2.5}` for active/emphasized icons
- Color icons with `style={{ color: COLORS.primary }}`

## 👤 Avatar Sizes (Child Avatars)

### Avatar Dimensions
```typescript
AVATAR.sm = 40px  // Lists, small cards
AVATAR.md = 56px  // Standard display ✅ RECOMMENDED
AVATAR.lg = 80px  // Profile headers
AVATAR.xl = 96px  // Large profile displays
```

### Avatar Icons (Consistent Colors)
- **Ciara Mitchell**: Yellow star (`#FFD700`)
- **Liam Mitchell**: Purple music note (`#9B7EBD`)
- All avatars use `RADIUS.lg` (16px) rounded corners
- Background: `COLORS.accent` by default

## 📱 Mobile Layout Standards

### Bottom Navigation
- Height: `80px` fixed
- Icon Size: `28px` (ICON.lg)
- Font Size: `13px`
- Padding: `12px`
- 4 items for caregiver panel
- 5 items for admin panel
- Always at z-index 40

### Headers
- Mobile Height: `64px`
- Gradient background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`
- White text
- Back button: 40px × 40px with `RADIUS.sm`

### Cards
- Border Radius: `RADIUS.xl` (20px)
- Padding: `SPACING.lg` (20px)
- Shadow: `0 1px 3px rgba(0, 0, 0, 0.1)`
- Background: `COLORS.card` (white)
- Border: 1px solid `COLORS.border` (optional)

## 🔔 Notifications & Toasts

### Toast Notifications
```typescript
minHeight: 80px
padding: 20px
fontSize: 18px
fontWeight: bold
borderWidth: 3px
borderColor: COLORS.primary
borderRadius: RADIUS.lg (16px)
```

### Notification Banners
- Position: Fixed top with `16px` margins
- Border Radius: `RADIUS.xl` (20px)
- Background: Gradient (primary to primaryLight)
- z-index: `Z_INDEX.notification` (30)
- Animation: `animate-slide-down`

## 🏷️ Badges

### Badge Sizing
```typescript
paddingSm: 4px 8px   // Tiny badges
paddingMd: 6px 12px  // Standard ✅ RECOMMENDED
paddingLg: 8px 16px  // Large badges
fontSize: 12px
radius: RADIUS.full (circular)
```

### Badge Colors by Status
- **Approved**: Green bg (`#D1FAE5`), dark green text (`#065F46`)
- **Pending**: Yellow bg (`#FEF3C7`), dark yellow text (`#92400E`)
- **Rejected**: Red bg (`#FEE2E2`), dark red text (`#991B1B`)

## 📝 Form Inputs

### Input Field Standards
```typescript
height: 48px (prevents iOS zoom)
padding: 12px 16px
borderRadius: RADIUS.lg (16px)
borderWidth: 2px
borderColor: COLORS.border
fontSize: 16px (prevents iOS zoom)
```

### Focus States
- Border: `2px solid ${COLORS.primary}`
- Ring: `0 0 0 3px ${COLORS.primary}20` (20% opacity)
- Remove default outline

### Label Standards
- Font Size: `14px`
- Font Weight: `500` (medium)
- Color: `COLORS.textSecondary`
- Margin Bottom: `6px`

## 🗺️ Map Markers

### Marker Sizing
```typescript
size: 48px (touch-friendly)
iconSize: ICON.md (24px)
pulseSize: 64px (for animation)
```

### Marker Colors
- **Driver/Bus**: `COLORS.warning` (#f59e0b) - Orange
- **Pickup**: `COLORS.success` (#10B981) - Green  
- **Dropoff**: `COLORS.info` (#3B82F6) - Blue
- **Child**: `COLORS.primary` (#2F6F9F) - Primary blue

## ⚡ Transitions & Animations

### Standard Durations
```typescript
TRANSITION.fast   = 150ms  // Hover effects
TRANSITION.normal = 300ms  // Standard transitions ✅ RECOMMENDED
TRANSITION.slow   = 500ms  // Page transitions
```

### Common Transitions
- `transition-all` - For most elements
- `transition-colors` - For color changes only
- `transition-transform` - For scale/position
- `active:scale-95` - Touch feedback on buttons

## 📐 Z-Index Layers (Stacking Order)

```typescript
Z_INDEX.base         = 1   // Default content
Z_INDEX.dropdown     = 10  // Dropdowns, menus
Z_INDEX.modal        = 20  // Modals, dialogs
Z_INDEX.notification = 30  // Toasts, banners
Z_INDEX.bottomNav    = 40  // Bottom navigation
Z_INDEX.header       = 50  // Fixed headers
```

## ✅ Touch Target Guidelines

### Minimum Touch Size
- **All interactive elements**: Minimum `44px × 44px` (Apple HIG)
- Buttons, links, icons should meet this minimum
- Add padding if visual size is smaller

### Spacing Between Touch Targets
- Minimum `8px` gap between adjacent buttons
- Recommended `12px` for better UX

## 📱 Container & Layout

### Page Container
```typescript
paddingMobile: 20px (horizontal)
maxWidth: 448px (centered on larger screens)
```

### Content Spacing
- Section padding: `SPACING.xl` (24px)
- Card gaps: `SPACING.sm` (12px)
- Element spacing: `SPACING.md` (16px)

## 🎯 Typography (From globals.css)

### Headings
- **H1**: 30px (1.875rem), weight 700
- **H2**: 24px (1.5rem), weight 600  
- **H3**: 20px (1.25rem), weight 600
- **H4**: 18px (1.125rem), weight 600

### Body Text
- **Paragraph**: 16px (1rem), weight 400
- **Label**: 14px (0.875rem), weight 500
- **Small**: 12px (0.75rem), weight 400

### Font Weights
```typescript
FONT_WEIGHT.normal   = 400
FONT_WEIGHT.medium   = 500 ✅ Labels
FONT_WEIGHT.semibold = 600 ✅ Buttons, headings
FONT_WEIGHT.bold     = 700 ✅ Major headings
```

## 🚀 Implementation Checklist

When creating a new component:

- [ ] Import design system: `import { COLORS, BUTTON, ICON, RADIUS } from '../constants/designSystem'`
- [ ] Use `COLORS` for all colors (no hardcoded hex)
- [ ] Use `BUTTON` constants for button dimensions
- [ ] Use `ICON` sizes for all Lucide icons
- [ ] Use `RADIUS` for border-radius values
- [ ] Use `SPACING` for margins, padding, gaps
- [ ] Ensure all buttons are minimum 44px height
- [ ] Add `active:scale-95` to all clickable elements
- [ ] Use `transition-all` for smooth interactions
- [ ] Verify touch targets meet 44px minimum
- [ ] Use proper z-index from `Z_INDEX` constants
- [ ] Test on mobile viewport (375px width minimum)

## 🔧 Common Patterns

### Primary Button
```tsx
<button
  className="w-full active:scale-95 transition-all"
  style={{
    height: BUTTON.heightMd,
    background: COLORS.primary,
    color: COLORS.white,
    borderRadius: RADIUS.lg,
    fontSize: BUTTON.fontSizeMd,
    fontWeight: 600,
  }}
>
  Button Text
</button>
```

### Card Component
```tsx
<div 
  className="shadow-sm"
  style={{
    background: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    border: `1px solid ${COLORS.border}`,
  }}
>
  Card Content
</div>
```

### Icon Button
```tsx
<button
  className="active:scale-95 transition-all"
  style={{
    width: '44px',
    height: '44px',
    borderRadius: RADIUS.sm,
    background: COLORS.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Icon size={ICON.md} style={{ color: COLORS.primary }} />
</button>
```

## 📊 Component Audit Status

✅ **Updated Components** (Using Design System):
- `EasyBottomNav` - Bottom navigation
- `ChildAvatar` - Child avatar display
- `RideNotificationBanner` - Ride notifications
- `AdminDashboard` - Admin panel imports

🔄 **Next to Update**:
- All admin panel components
- All caregiver panel components  
- All driver panel components
- Form components
- Modal/dialog components

## 🎓 Best Practices

### Do's ✅
- Always use design system constants
- Keep touch targets 44px minimum
- Use consistent icon sizes (ICON.md most common)
- Apply active:scale-95 to all buttons
- Use semantic color names (COLORS.success vs #10B981)
- Test on 375px mobile viewport
- Use consistent border radius from RADIUS

### Don'ts ❌
- Don't hardcode colors (use COLORS.*)
- Don't use arbitrary icon sizes (use ICON.*)
- Don't skip touch target minimums
- Don't mix spacing values (use SPACING.*)
- Don't ignore mobile-first design
- Don't create custom transitions (use TRANSITION.*)
- Don't vary button heights unnecessarily

## 📱 User-Friendly Features

### Simplicity for Non-Tech Users
1. **Large touch targets** - Easy to tap (44px minimum)
2. **Clear visual hierarchy** - Important items stand out
3. **Consistent patterns** - Same actions look the same everywhere
4. **Immediate feedback** - Scale animations on tap
5. **Clear labels** - No jargon, simple language
6. **Visual indicators** - Colors show status at a glance
7. **Forgiving UI** - Confirmation dialogs for destructive actions

### Navigation Simplicity
- Bottom navigation (not hamburger menu)
- Clear back buttons on all pages
- Breadcrumb-style navigation
- Maximum 2 taps to any feature

This guide ensures the Pahi App maintains professional consistency and optimal mobile user experience for the Wairoa community.
