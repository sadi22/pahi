# Pahi App - Typography & UI Reference Guide

## 📝 STRICT TYPOGRAPHY SYSTEM

All text in the app MUST use these exact font sizes. No custom sizes allowed.

### Display & Headings

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **Display** | `32px` | 700 (Bold) | 1.2 | Large hero text, splash screen |
| **Page Title** | `24px` | 600 (Semibold) | 1.3 | Main page headers (H1) |
| **Heading** | `18px` | 600 (Semibold) | 1.4 | Section headers, card titles (H2) |
| **Subheading** | `16px` | 600 (Semibold) | 1.4 | Smaller section titles (H3) |

### Body Text

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **Body** | `16px` | 400 (Regular) | 1.5 | Standard paragraphs, descriptions |
| **Body Small** | `14px` | 400 (Regular) | 1.5 | Secondary text, smaller descriptions |

### Interactive Elements

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **Button** | `16px` | 600 (Semibold) | 1.5 | All standard buttons |
| **Button Small** | `14px` | 600 (Semibold) | 1.5 | Compact buttons |
| **Label** | `14px` | 500 (Medium) | 1.4 | Form labels, input labels |

### Small Text

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **Caption** | `12px` | 400 (Regular) | 1.4 | Timestamps, meta info, tiny text |
| **Caption Bold** | `12px` | 600 (Semibold) | 1.4 | Badges, emphasized small text |
| **Navigation** | `13px` | 500 (Medium) | 1.3 | Bottom nav labels (inactive) |
| **Nav Active** | `13px` | 600 (Semibold) | 1.3 | Bottom nav labels (active) |

### Special

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **Stat** | `28px` | 700 (Bold) | 1.2 | Large numbers, statistics |

---

## 🎨 USAGE EXAMPLES

### Page Headers

```tsx
import { TYPOGRAPHY } from '../constants/designSystem';

<h1 style={{ 
  fontSize: TYPOGRAPHY.pageTitle.size,      // 24px
  fontWeight: TYPOGRAPHY.pageTitle.weight,  // 600
  lineHeight: TYPOGRAPHY.pageTitle.lineHeight, // 1.3
}}>
  Page Title Here
</h1>
```

### Section Headings

```tsx
<h2 style={{ 
  fontSize: TYPOGRAPHY.heading.size,      // 18px
  fontWeight: TYPOGRAPHY.heading.weight,  // 600
}}>
  Section Heading
</h2>
```

### Body Text

```tsx
<p style={{ 
  fontSize: TYPOGRAPHY.body.size,      // 16px
  lineHeight: TYPOGRAPHY.body.lineHeight, // 1.5
}}>
  This is body text with standard sizing.
</p>
```

### Buttons

```tsx
<button style={{
  fontSize: TYPOGRAPHY.button.size,      // 16px
  fontWeight: TYPOGRAPHY.button.weight,  // 600
}}>
  Click Me
</button>
```

### Small Text / Captions

```tsx
<span style={{ 
  fontSize: TYPOGRAPHY.caption.size,  // 12px
}}>
  2 min ago
</span>
```

### Statistics

```tsx
<p style={{
  fontSize: TYPOGRAPHY.stat.size,      // 28px
  fontWeight: TYPOGRAPHY.stat.weight,  // 700
}}>
  25
</p>
```

---

## 🎯 WHERE TO USE EACH SIZE

### 32px (Display)
- ✅ Splash screen "Pahi" title
- ✅ Large welcome headers
- ✅ App name displays

### 24px (Page Title)
- ✅ Every page header (Admin Dashboard, Ride Management, etc.)
- ✅ Main H1 headings
- ✅ Modal titles

### 18px (Heading)
- ✅ Card titles
- ✅ Section headers within pages (Recent Alerts, New Ride Requests)
- ✅ H2 headings
- ✅ List group headers

### 16px (Subheading / Body)
- ✅ Subheadings (H3)
- ✅ All paragraph text
- ✅ Form input text
- ✅ Button text (standard)
- ✅ List item primary text
- ✅ Descriptions

### 14px (Body Small / Label / Button Small)
- ✅ Form labels
- ✅ Secondary descriptions
- ✅ Subtitle text under headers
- ✅ Small buttons
- ✅ List item secondary text
- ✅ Card metadata

### 13px (Navigation)
- ✅ Bottom navigation labels
- ✅ Tab labels
- ✅ Filter labels

### 12px (Caption)
- ✅ Timestamps ("2 min ago")
- ✅ Badge text
- ✅ Very small metadata
- ✅ Helper text
- ✅ Legal text

### 28px (Stat)
- ✅ Dashboard statistics
- ✅ Large numbers on cards
- ✅ Count displays

---

## 🚫 NEVER USE THESE SIZES

The following sizes are **BANNED** - they create inconsistency:

- ❌ 15px
- ❌ 17px
- ❌ 19px
- ❌ 20px
- ❌ 21px
- ❌ 22px
- ❌ 23px
- ❌ 25px
- ❌ 26px
- ❌ 27px
- ❌ 30px
- ❌ Any other custom size not in the typography system

**Exception:** Splash screen decorative text can use larger responsive sizes like `3.5rem` or `1.75rem`.

---

## ✅ FONT WEIGHT STANDARDS

| Weight | Value | Usage |
|--------|-------|-------|
| **Regular** | 400 | Body text, paragraphs, descriptions |
| **Medium** | 500 | Labels, navigation (inactive) |
| **Semibold** | 600 | Headings, buttons, active states, emphasis |
| **Bold** | 700 | Page titles, statistics, strong emphasis |

### Never Use
- ❌ 300 (Light)
- ❌ 800 (Extra Bold)
- ❌ 900 (Black)

---

## 🎨 COLOR CONSISTENCY

All text must use these color constants:

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Text** | `#1F2937` | Main headings, primary content |
| **Secondary Text** | `#475569` | Descriptions, labels |
| **Tertiary Text** | `#94a3b8` | Disabled, inactive text |
| **Light Text** | `#ffffff` | Text on colored backgrounds |
| **Primary Brand** | `#2F6F9F` | Links, active states, brand elements |

```tsx
import { COLORS } from '../constants/designSystem';

<p style={{ color: COLORS.textPrimary }}>Main text</p>
<p style={{ color: COLORS.textSecondary }}>Secondary text</p>
<p style={{ color: COLORS.textTertiary }}>Inactive text</p>
```

---

## 📐 COMPLETE COMPONENT EXAMPLE

```tsx
import { COLORS, TYPOGRAPHY, BUTTON, RADIUS } from '../constants/designSystem';

function ExampleCard() {
  return (
    <div 
      className="bg-white rounded-xl p-5 shadow-sm"
      style={{ borderRadius: RADIUS.xl }}
    >
      {/* Card Title */}
      <h2 
        className="text-gray-900 mb-3"
        style={{
          fontSize: TYPOGRAPHY.heading.size,        // 18px
          fontWeight: TYPOGRAPHY.heading.weight,    // 600
          color: COLORS.textPrimary,
        }}
      >
        Card Title
      </h2>
      
      {/* Description */}
      <p 
        className="text-gray-600 mb-4"
        style={{
          fontSize: TYPOGRAPHY.bodySmall.size,      // 14px
          lineHeight: TYPOGRAPHY.bodySmall.lineHeight, // 1.5
          color: COLORS.textSecondary,
        }}
      >
        This is a description of the card content.
      </p>
      
      {/* Timestamp */}
      <p 
        className="text-gray-500 mb-4"
        style={{
          fontSize: TYPOGRAPHY.caption.size,        // 12px
          color: COLORS.textTertiary,
        }}
      >
        2 hours ago
      </p>
      
      {/* Button */}
      <button
        className="w-full active:scale-95 transition-all"
        style={{
          height: BUTTON.heightMd,                  // 48px
          background: COLORS.primary,               // #2F6F9F
          color: COLORS.white,
          borderRadius: RADIUS.lg,                  // 16px
          fontSize: TYPOGRAPHY.button.size,         // 16px
          fontWeight: TYPOGRAPHY.button.weight,     // 600
        }}
      >
        Take Action
      </button>
    </div>
  );
}
```

---

## 📱 MOBILE-FIRST CHECKLIST

Every text element must be:

- [ ] Using a size from `TYPOGRAPHY` constants
- [ ] Using a weight from `FONT_WEIGHT` or `TYPOGRAPHY` weight values
- [ ] Using colors from `COLORS` constants
- [ ] Minimum 16px for form inputs (prevents iOS zoom)
- [ ] Line height specified for readability
- [ ] Consistent with other instances of the same type

---

## 🔧 MIGRATION GUIDE

### Before (Inconsistent):
```tsx
❌ <h1 style={{ fontSize: '22px', fontWeight: 600 }}>Title</h1>
❌ <p style={{ fontSize: '15px' }}>Description</p>
❌ <button style={{ fontSize: '17px' }}>Button</button>
❌ <span style={{ fontSize: '11px' }}>Timestamp</span>
```

### After (Consistent):
```tsx
✅ <h1 style={{ fontSize: TYPOGRAPHY.pageTitle.size, fontWeight: TYPOGRAPHY.pageTitle.weight }}>Title</h1>
✅ <p style={{ fontSize: TYPOGRAPHY.bodySmall.size }}>Description</p>
✅ <button style={{ fontSize: TYPOGRAPHY.button.size }}>Button</button>
✅ <span style={{ fontSize: TYPOGRAPHY.caption.size }}>Timestamp</span>
```

---

## 📊 AUDIT RESULTS

### Current Status:
✅ **Design System Created** - `TYPOGRAPHY` constants defined  
✅ **AdminDashboard** - Updated to use TYPOGRAPHY  
✅ **PageHeader** - Updated to use TYPOGRAPHY  
✅ **BackButton** - Updated to use design system  
✅ **EasyBottomNav** - Using consistent nav typography  
✅ **App.tsx Toaster** - Using TYPOGRAPHY for notifications  

### Next to Update:
- All caregiver panel components
- All driver panel components
- Form components
- Modal components
- Remaining admin components

---

This typography system ensures the Pahi App maintains **perfect visual consistency** across all pages, making it look professional and easy to use for the Wairoa community!
