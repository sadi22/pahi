# 🚗 PAHI APP - COMPLETE CAREGIVER PANEL SPECIFICATION

## 📱 OVERVIEW

The Pahi App Caregiver Panel is a mobile-first ride booking and tracking application designed for the Wairoa community. It is optimized for users who are not tech-savvy, featuring a simple bottom navigation bar (NO hamburger menus), large touch targets, and clear visual feedback.

---

## 🎨 DESIGN SYSTEM (Use These Exact Values)

### **Color Palette**
- **Primary Blue**: `#2F6F9F` - Main brand color, buttons, active states
- **Primary Light**: `#5699D2` - Headers, lighter accents
- **Accent Cyan**: `#E0F7FA` - Background highlights, selected items
- **Dark Gray**: `#1F2937` - Main text, headings
- **Background**: `#f8fafc` - Page backgrounds
- **White**: `#ffffff` - Cards, modals
- **Success Green**: `#10B981` - Completed actions, confirmation
- **Warning Orange**: `#f59e0b` - Pending states, caution
- **Danger Red**: `#ef4444` - Errors, rejections

### **Gradients (MUST USE)**
- **Primary Gradient**: `linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)` - ALL page headers, primary buttons
- **Success Gradient**: `linear-gradient(135deg, #10b981 0%, #059669 100%)` - Confirmation buttons
- **Danger Gradient**: `linear-gradient(90deg, #EF4444, #DC2626)` - Delete buttons

### **Typography Sizes (STRICT)**
- **Display**: `32px` / Bold (700) - Hero text
- **Page Title (H1)**: `28px` / Bold (700) - Main headers
- **Heading (H2)**: `18px` / Semibold (600) - Section headers
- **Subheading (H3)**: `17px` / Semibold (600) - Card titles
- **Body**: `16px` / Regular (400) - Standard text
- **Body Small**: `15px` / Regular (400) - Secondary text
- **Label**: `14px` / Medium (500) - Form labels
- **Caption**: `13px` / Regular (400) - Small text, timestamps
- **Caption Small**: `12px` / Regular (400) - Tiny text

### **Spacing**
- **xs**: `8px` - Tiny gaps
- **sm**: `12px` - Small gaps
- **md**: `16px` - Standard gaps
- **lg**: `20px` - Large gaps (most common)
- **xl**: `24px` - Extra large gaps
- **2xl**: `32px` - Section dividers

### **Border Radius**
- **md**: `12px` - Small elements
- **lg**: `16px` - Standard buttons, cards ✅ MOST COMMON
- **xl**: `20px` - Large cards
- **2xl**: `24px` - Special large elements
- **full**: `9999px` - Circular/pill shapes

### **Button Heights (Touch-Optimized)**
- **Medium**: `48px` ✅ RECOMMENDED - Standard buttons
- **Large**: `56px` - Primary CTAs

### **Shadows**
- **Soft**: `shadow-sm` - Subtle elevation
- **Medium**: `shadow-md` - Standard cards
- **Large**: `shadow-lg` - Emphasized elements

---

## 🧭 NAVIGATION STRUCTURE

### **Bottom Navigation Bar**
**Position**: Fixed bottom, always visible  
**Height**: `80px`  
**Background**: White with top border (`#e2e8f0`)  
**Z-Index**: 40  
**Layout**: 4 equal columns

#### **Navigation Items** (Left to Right):
1. **Home** - Home icon - Navigate to dashboard
2. **Book Ride** - Car icon - Navigate to booking flow
3. **Track** - Navigation icon - Navigate to live tracking
4. **Profile** - User icon - Navigate to profile/settings

#### **Active State Styling**:
- Background: `#E0F7FA` (accent cyan)
- Border: `2px solid #2F6F9F`
- Icon Color: `#2F6F9F` (primary blue)
- Icon Stroke: `2.5`
- Text Weight: `600` (semibold)
- Border Radius: `16px`

#### **Inactive State Styling**:
- Background: White
- Border: Transparent
- Icon Color: `#94a3b8` (tertiary gray)
- Icon Stroke: `2`
- Text Weight: `500` (medium)

---

## 📄 SCREEN-BY-SCREEN DETAILED SPECIFICATIONS

---

## 1️⃣ **HOME SCREEN** (`SimpleEasyHome.tsx`)

### **Purpose**
Dashboard showing ride status, children, driver info, quick actions.

### **Layout Structure**

#### **Header Section**
- **Background**: Primary gradient (`linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)`)
- **Padding**: `20px` horizontal, `32px` top, `24px` bottom
- **Layout**:
  - **Left Side**:
    - Greeting: "Welcome Back" - `28px` Bold, white
    - Parent Name: "Rachel Mitchell" - `16px` Regular, white/90% opacity
  - **Right Side**:
    - **Notifications Button**:
      - Size: `44px × 44px`
      - Background: `rgba(255, 255, 255, 0.25)` with backdrop blur
      - Icon: Bell (white, `20px`)
      - Border Radius: `12px`
      - **Badge** (if unread notifications exist):
        - Position: Absolute top-right
        - Size: `20px × 20px`
        - Background: `#EF4444` (red)
        - Text: Unread count or "9+" if > 9
        - Font: `10px` Bold white
    - **Logout Button**:
      - Same styling as notification button
      - Icon: LogOut (white, `20px`)

#### **Content Section**
- **Background**: Gradient from `#F0F9FF` to white
- **Padding**: `20px` horizontal, `24px` vertical
- **Bottom Padding**: `112px` (to account for bottom nav)

### **Component Cards** (Top to Bottom):

#### **1. Active Ride Tracking** (Only shows when ride.status === 'started')
- **Layout**:
  - Background: Gradient blue (`from-blue-500 to-blue-600`)
  - Border: `2px solid #60A5FA` (blue-400)
  - Border Radius: `20px`
  - Padding: `20px`
  - Shadow: Extra large
  - Animation: Pulse effect

- **Content**:
  - **Icon Section**:
    - Animated pulsing circle: `48px` white/20% opacity
    - Static circle: `48px` white background
    - Icon: Navigation (`24px`, blue-600)
  
  - **Text Section**:
    - Title: "Ride in Progress!" - `18px` Bold white
    - Subtitle: "{Child Name}'s ride has started" - `14px` blue-100
  
  - **Action Button**:
    - Width: Full width
    - Background: White
    - Text: "Track Ride Now" - `18px` Bold blue-600
    - Height: `56px`
    - Border Radius: `12px`
    - Shadow: Large
    - Active State: `scale-95`

#### **2. Quick Actions Grid**
- **Layout**: 2 columns, equal width
- **Gap**: `16px`

**A. History Button**:
- Background: White
- Border: `2px solid #8B5CF6` (purple)
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Icon Container**:
  - Size: `56px × 56px`
  - Background: Purple gradient (`135deg, #8B5CF6 0%, #7C3AED 100%`)
  - Border Radius: `12px`
  - Icon: History (white, `28px`, stroke 2.5)

- **Text**:
  - Title: "History" - `17px` Semibold gray-900
  - Subtitle: "Past rides" - `13px` Regular gray-600

**B. Feedback Button**:
- Same layout as History
- Border: `2px solid #F59E0B` (orange)
- Icon Background: Orange gradient (`135deg, #F59E0B 0%, #D97706 100%`)
- Icon: MessageSquare
- Title: "Feedback"
- Subtitle: "Share feedback"

#### **3. Manage Children Button**
- Background: White
- Border: `2px solid #E0F7FA` (blue-100)
- Border Radius: `20px`
- Padding: `16px`
- Shadow: Medium
- Layout: Horizontal flex

- **Icon**:
  - Size: `48px × 48px`
  - Background: `#E0F7FA`
  - Border Radius: `12px`
  - Icon: Users (`24px`, primary blue)

- **Text**:
  - Title: "Manage Children" - `16px` Semibold gray-900
  - Subtitle: "Add or edit children information" - `13px` gray-600

#### **4. Next Scheduled Ride Card**
- Background: White
- Border: `2px solid #E0F7FA`
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Header**:
  - Icon: Clock (`20px`, primary blue) in `40px` cyan background circle
  - Title: "Next Scheduled Ride" - `17px` Semibold gray-900
  - Subtitle: "Tomorrow at 8:00 AM" - `14px` gray-600

- **Details Box**:
  - Background: `#F9FAFB` (gray-50)
  - Border Radius: `12px`
  - Padding: `16px`

  - **Child Info**:
    - Icon: User (`20px`, gray-500)
    - Label: "Child" - `12px` gray-500
    - Value: "Ciara Mitchell" - `15px` Semibold gray-900

  - **School Info**:
    - Icon: MapPin (`20px`, gray-500)
    - Label: "School" - `12px` gray-500
    - Value: "Wairoa Primary School" - `15px` Semibold gray-900

#### **5. Your Children Card**
- Background: White
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Header**: "Your Children" - `18px` Semibold gray-900

- **Child List** (foreach child):
  - Background: `#EFF6FF` (blue-50)
  - Border Radius: `12px`
  - Padding: `16px`
  - Gap: `12px` between items

  - **Child Avatar**:
    - Component: `<ChildAvatar />`
    - Size: `40px` (sm)
    - Background: Primary blue

  - **Child Info**:
    - Name: `16px` Semibold gray-900
    - Details: "{age} years old • {year}" - `14px` gray-600

#### **6. Your Driver Card**
- Background: White
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Header**: "Your Driver" - `18px` Semibold gray-900

- **Driver Info**:
  - **Avatar**:
    - Size: `56px` circle
    - Background: `#E0F7FA`
    - Icon: User (`28px`, primary blue)

  - **Details**:
    - Name: "Mike Kereama" - `17px` Semibold gray-900
    - Role: "Certified Community Driver" - `14px` gray-600
    - **Status Indicator**:
      - Green dot (`8px` circle, `#10B981`)
      - Text: "Available" - `13px` Medium green-600

  - **Call Button**:
    - Width: Full
    - Height: `56px`
    - Background: `#10B981` (green)
    - Text: "Call Driver" - `16px` Semibold white
    - Icon: Phone (white, `20px`)
    - Border Radius: `12px`
    - Active: `scale-95`
    - Link: `tel:06838800`

#### **7. Emergency Contact Card**
- Background: Red-50
- Border: `2px solid #FECACA` (red-200)
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Header**:
  - Icon: AlertCircle (`24px`, red-600) in red-100 background
  - Title: "Emergency Contact" - `16px` Semibold red-900
  - Subtitle: "Available 24/7" - `13px` red-700

- **Emergency Button**:
  - Width: Full
  - Height: `56px`
  - Background: `#DC2626` (red-600)
  - Text: "Call 111" - `16px` Semibold white
  - Icon: Phone (white, `20px`)
  - Border Radius: `12px`
  - Link: `tel:111`

---

## 2️⃣ **BOOK RIDE SCREEN** (`SimpleEasyBookRide.tsx`)

### **Purpose**
5-step wizard to book a ride: Select child → Ride type → Date → School → Time

### **Layout Structure**

#### **Header Section**
- Background: Primary gradient
- Padding: `20px` horizontal, `24px` top, `20px` bottom

- **Back Button**:
  - Icon: ArrowLeft (white, `24px`)
  - Text: "Back" - `16px` Semibold white
  - Action: Go to previous step or home if step 1

- **Title**: "Book a Ride" - `26px` Bold white
- **Subtitle**: "Step {current} of 5" - `15px` white/90%

#### **Progress Bar**
- Container:
  - Background: `#E5E7EB` (gray-200)
  - Height: `8px`
  - Border Radius: `9999px` (full)
  - Margin: `16px` horizontal

- **Progress Fill**:
  - Background: Primary gradient
  - Width: `{(step / 5) * 100}%`
  - Height: `8px`
  - Border Radius: `9999px`
  - Transition: `300ms`

### **Step 1: Select Child**

- **Heading**:
  - Title: "Who needs a ride?" - `20px` Semibold gray-900
  - Subtitle: "Select your child" - `15px` gray-600

- **Child Cards** (foreach child):
  - Background: White
  - Border: `2px solid` (gray-200 default, primary blue if selected)
  - Border Radius: `20px`
  - Padding: `20px`
  - Shadow: Medium
  - Active: `scale-95`
  - Cursor: Pointer

  - **Layout**:
    - **Avatar**: `<ChildAvatar />` size `md` (56px)
    - **Info**:
      - Name: `17px` Semibold gray-900
      - Age: "{age} years old" - `14px` gray-600
    - **Check Icon** (if selected):
      - Size: `32px` circle
      - Background: Green-500
      - Icon: Check (white, `20px`, stroke 3)

  - **Action**: On click → Set selected child → Go to step 2

### **Step 2: Ride Type**

- **Heading**:
  - Title: "What type of ride?" - `20px` Semibold gray-900
  - Subtitle: "Choose pickup or dropoff" - `15px` gray-600

- **Pickup Option**:
  - Background: White
  - Border: `2px solid` (gray-200 or primary if selected)
  - Border Radius: `20px`
  - Padding: `24px`
  - Shadow: Medium

  - **Icon Container**:
    - Size: `48px × 48px`
    - Background: `#E0F7FA`
    - Border Radius: `12px`
    - Icon: MapPin (primary blue, `24px`)

  - **Text**:
    - Title: "Pick Up" - `18px` Semibold gray-900
    - Subtitle: "From home to school" - `14px` gray-600

  - **Arrow**: ArrowRight (gray-400, `24px`)
  - **Action**: On click → Set rideType='pickup' → Go to step 3

- **Dropoff Option**:
  - Same layout
  - Title: "Drop Off"
  - Subtitle: "From school to home"
  - Action: Set rideType='dropoff' → Go to step 3

### **Step 3: Select Date**

- **Heading**:
  - Title: "What day?" - `20px` Semibold gray-900
  - Subtitle: "Choose the date" - `15px` gray-600

- **Date Input Card**:
  - Background: White
  - Border Radius: `20px`
  - Padding: `20px`
  - Shadow: Medium

  - **Label**:
    - Icon: Calendar (primary blue, `20px`)
    - Text: "Select Date" - `16px` Semibold gray-900

  - **Input**:
    - Type: `date`
    - Width: Full
    - Padding: `16px`
    - Border: `2px solid #D1D5DB` (gray-300)
    - Border Radius: `12px`
    - Focus: Border becomes primary blue
    - Font Size: `16px`

- **Continue Button** (only if date selected):
  - Width: Full
  - Height: `56px`
  - Background: Primary gradient
  - Text: "Continue" - `16px` Semibold white
  - Border Radius: `12px`
  - Shadow: Medium
  - Active: `scale-95`
  - Action: Go to step 4

### **Step 4: Select School**

- **Heading**:
  - Title: "Which school?" - `20px` Semibold gray-900
  - Subtitle: "Select the destination school" - `15px` gray-600

- **School Cards** (foreach school):
  - Schools: 
    1. Wairoa Primary School
    2. Wairoa College
    3. St Joseph's School
    4. Te Kura Kaupapa Māori o Te Whānau a Apanui

  - Background: White
  - Border: `2px solid` (gray-200 or primary if selected)
  - Border Radius: `20px`
  - Padding: `20px`
  - Shadow: Medium

  - **Icon Container**:
    - Size: `48px × 48px`
    - Background: `#E0F7FA`
    - Border Radius: `12px`
    - Icon: School (primary blue, `24px`)

  - **Text**:
    - School Name: `17px` Semibold gray-900
    - Time Slots: "{count} time slot(s) available" - `14px` gray-600

  - **Check Icon** (if selected): Green circle with checkmark

  - **Action**: On click → Set selected school → Go to step 5

### **Step 5: Select Time & Confirm**

- **Heading**:
  - Title: "Select Time Slot" - `20px` Semibold gray-900
  - Subtitle: "{Selected School Name}" - `15px` gray-600

- **Time Slot Cards** (foreach available slot):
  - Background: White
  - Border: `2px solid` (gray-200 or primary if selected)
  - Border Radius: `20px`
  - Padding: `20px`
  - Shadow: Medium
  - Disabled: If `slot.booked >= slot.maxCapacity` (opacity 50%)

  - **Icon Container**:
    - Size: `48px × 48px`
    - Background: `#E0F7FA`
    - Border Radius: `12px`
    - Icon: Clock (primary blue, `24px`)

  - **Time Info**:
    - Time: `18px` Semibold gray-900
    - **Availability**:
      - Icon: Users (gray-500, `16px`)
      - Text: "{seatsLeft} seat(s) available" or "Fully Booked"
      - Font: `14px` gray-600

  - **Capacity Badge**:
    - Background: Yellow-100 if ≤2 seats, Green-100 if >2
    - Border: `2px` matching color
    - Padding: `8px 12px`
    - Border Radius: `8px`
    - Text: "{seatsLeft}/{maxCapacity}" - `14px` Bold

  - **Full Badge** (if full):
    - Background: Red-100
    - Border: `2px solid` red-500
    - Text: "FULL" - `12px` Semibold red-700
    - Border Radius: Full

#### **Review Booking Section** (shows when time selected)

- **Review Card**:
  - Background: Blue-50
  - Border: `2px solid #E0F7FA`
  - Border Radius: `20px`
  - Padding: `20px`

  - **Title**: "Review Your Booking" - `17px` Semibold gray-900

  - **Details** (each row):
    - Label: `14px` gray-600
    - Value: `15px` Semibold gray-900
    - Items:
      - Child
      - School
      - Ride Type
      - Date
      - Time

- **Confirm Button**:
  - Width: Full
  - Height: `64px`
  - Background: Success gradient (`linear-gradient(135deg, #10b981 0%, #059669 100%)`)
  - Text: "Confirm Booking" - `17px` Semibold white
  - Border Radius: `12px`
  - Shadow: Large
  - Active: `scale-95`
  - Action:
    1. Create notification for admin/driver
    2. Show success toast
    3. Reset form
    4. Navigate to home

---

## 3️⃣ **TRACK RIDE SCREEN** (`SimpleEasyTrackRide.tsx`)

### **Purpose**
Live simulation of ride progress with status updates.

### **Header Section**
- Background: Primary gradient
- Padding: `20px` horizontal, `24px` top, `20px` bottom

- **Back Button**: "Back" with ArrowLeft icon
- **Title**: "Track Ride" - `26px` Bold white
- **Subtitle**: "{Child Name}" - `15px` white/90%

### **Current Status Card**

- **Container**:
  - Background: White
  - Border: `2px` (primary blue if in progress, green if complete)
  - Border Radius: `20px`
  - Padding: `24px`
  - Shadow: Large

- **Status Icon**:
  - Size: `48px` circle
  - Background: Cyan (`#E0F7FA`) if in progress, green-50 if complete
  - Icon: Car (primary blue) or CheckCircle (green-600)

- **Status Text**:
  - Label: "Current Status" - `13px` gray-600
  - Status: Dynamic text - `18px` Semibold gray-900
    - "Driver is on the way" (0-25%)
    - "Child picked up safely" (25-50%)
    - "En route to destination" (50-75%)
    - "Arriving shortly" (75-100%)
    - "Arrived at destination" (100%)

- **Progress Bar**:
  - Container: `12px` height, gray-200 background, rounded full
  - Fill: Primary gradient (or green if 100%)
  - Width: `{progress}%`
  - Transition: 500ms
  - Text: "{progress}% Complete" - `13px` gray-600 right-aligned

### **Route Details Card**

- Background: White
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Title**: "Route Details" - `17px` Semibold gray-900

- **Pickup Location**:
  - **Icon Circle**:
    - Size: `40px`
    - Background: Cyan (default) or green-50 (completed)
    - Icon: MapPin (primary or green-600)
  
  - **Connector**: Vertical line (gray-300, `2px` wide, `48px` height)

  - **Info**:
    - Label: "Pick Up Location" - `13px` gray-600
    - Address: "123 Main Street, Wairoa" - `15px` Semibold gray-900
    - **Check Icon** (if progress > 10%):
      - Icon: CheckCircle (green-600, `16px`)
      - Text: "Picked up" - `13px` Medium green-600

- **Dropoff Location**:
  - Same layout
  - Label: "Drop Off Location"
  - Address: "Wairoa Primary School"
  - Check icon shows if progress === 100%

### **Driver Information Card**

- Background: White
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Title**: "Driver Information" - `17px` Semibold gray-900

- **Driver Details**:
  - **Avatar**: User icon in cyan circle (48px)
  - **Info**:
    - Label: "Driver Name" - `13px` gray-600
    - Name: "Mike Kereama" - `16px` Semibold gray-900

- **Vehicle Details**:
  - **Icon**: Car in cyan circle (48px)
  - **Info**:
    - Label: "Vehicle" - `13px` gray-600
    - Details: "Toyota Hiace • ABC123" - `16px` Semibold gray-900

- **Call Driver Button**:
  - Width: Full
  - Height: `56px`
  - Background: Green-500
  - Text: "Call Driver" - `16px` Semibold white
  - Icon: Phone (white)
  - Border Radius: `12px`
  - Link: `tel:06838800`

### **Emergency Help Card**

- Background: Red-50
- Border: `2px solid` red-200
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Header**:
  - Icon: AlertCircle (red-600, `24px`) in red-100 background
  - Title: "Emergency Help" - `15px` Semibold red-900
  - Subtitle: "Call if you need immediate assistance" - `13px` red-700

- **Emergency Button**:
  - Width: Full
  - Height: `56px`
  - Background: Red-600
  - Text: "Call 111" - `16px` Semibold white
  - Icon: Phone
  - Border Radius: `12px`

### **Ride Complete Section** (shows when progress === 100%)

- Background: Green-50
- Border: `2px solid` green-200
- Border Radius: `20px`
- Padding: `24px`
- Shadow: Medium
- Text Align: Center

- **Success Icon**:
  - Size: `64px` circle
  - Background: Green-100
  - Icon: CheckCircle (green-600, `40px`)

- **Title**: "Ride Complete!" - `19px` Semibold green-900
- **Message**: "Your child has arrived safely at the destination" - `14px` green-700

- **Home Button**:
  - Width: Full
  - Height: `56px`
  - Background: Primary gradient
  - Text: "Return to Home" - `16px` Semibold white
  - Border Radius: `12px`

---

## 4️⃣ **PROFILE SCREEN** (`SimpleEasyProfile.tsx`)

### **Purpose**
View/edit account info, manage children, access settings.

### **Header Section**

- Background: Primary gradient
- Padding: `20px` horizontal, `24px` top, `24px` bottom
- Text Align: Center

- **Back Button**: Top-left, "Back to Home"

- **Profile Photo**:
  - Size: `96px` circle
  - Border: `4px solid white`
  - Shadow: Large
  - Background: `#E0F7FA` (if no photo)
  - Content: User icon (primary blue, `48px`) OR uploaded photo OR emoji avatar

  - **Camera Button**:
    - Position: Absolute bottom-right
    - Size: `32px` circle
    - Background: Primary blue
    - Border: `2px solid white`
    - Icon: Camera (white, `16px`)
    - Action: Open photo options modal

- **Name**: "Rachel Mitchell" - `26px` Bold white
- **Role**: "Parent Account" - `15px` white/90%

### **Account Information Card**

- Background: White
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Header**:
  - Title: "Account Information" - `18px` Semibold gray-900
  - **Edit Button** (if not editing):
    - Background: `#E0F7FA`
    - Padding: `8px 16px`
    - Border Radius: `8px`
    - Icon: Edit2 (primary blue, `16px`)
    - Text: "Edit" - `14px` Semibold primary blue

- **Fields** (foreach: name, phone, email, address):

  - **Label**:
    - Icon (User/Phone/Mail/MapPin) - `16px` gray-400
    - Text: Field name - `13px` Medium gray-600

  - **Display Mode** (not editing):
    - Background: Gray-50
    - Padding: `12px 16px`
    - Border Radius: `12px`
    - Text: `15px` Medium gray-900

  - **Edit Mode**:
    - Input field
    - Padding: `12px 16px`
    - Border: `2px solid` gray-300
    - Border Radius: `12px`
    - Focus: Border becomes primary blue
    - Font: `15px`

- **Action Buttons** (if editing):
  - **Save Button**:
    - Width: 50%
    - Height: `48px`
    - Background: Primary gradient
    - Text: "Save Changes" - `15px` Semibold white
    - Border Radius: `12px`

  - **Cancel Button**:
    - Width: 50%
    - Height: `48px`
    - Background: White
    - Border: `2px solid` gray-200
    - Text: "Cancel" - `15px` Semibold gray-600
    - Border Radius: `12px`

### **Registered Children Card**

- Background: White
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Header**:
  - Title: "Registered Children" - `18px` Semibold gray-900
  - **Count Badge**:
    - Size: `40px` circle
    - Background: `#E0F7FA`
    - Text: "{count}" - `16px` Bold primary blue

- **Child List Items**:
  - Background: Gray-50
  - Border Radius: `12px`
  - Padding: `12px`
  - Gap: `8px` between items

  - **Avatar**: Initials in cyan circle (`40px`)
  - **Info**:
    - Name: `15px` Semibold gray-900
    - Year: `13px` gray-600

- **Manage Button**:
  - Width: Full
  - Height: `48px`
  - Background: Primary blue
  - Text: "Manage Children" - `15px` Semibold white
  - Icon: Users (white, `20px`)
  - Border Radius: `12px`

### **Settings Card**

- Background: White
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Title**: "Settings" - `18px` Semibold gray-900

- **Settings Items** (each):
  - Background: Gray-50
  - Padding: `16px`
  - Border Radius: `12px`
  - Layout: Horizontal flex, space-between

  - **Left**:
    - Icon (Bell/Shield/Settings) - `20px` primary blue
    - Text: `15px` Medium gray-900

  - **Right**: Chevron › (gray-400, `20px`)

  - **Items**:
    1. Notifications → Navigate to notification settings
    2. Privacy & Safety → Navigate to privacy page
    3. App Preferences → Navigate to preferences page

### **Help & Support Card**

- Same layout as Settings
- **Title**: "Help & Support"

- **Items**:
  1. Help Center → Navigate to help page
  2. Contact Support → Phone link (tel:06838800), shows number `13px` gray-600
  3. App Version → Shows toast with version info, displays "v1.0.0"

### **Logout Button**

- Width: Full
- Height: `56px`
- Background: Red-50
- Border: `2px solid` red-100
- Text: "Log Out" - `16px` Semibold red-600
- Icon: LogOut (red-600, `20px`)
- Border Radius: `12px`
- Shadow: Medium
- Action: Show confirmation dialog

### **Photo Options Modal** (when camera button clicked)

- **Overlay**: Black/50% opacity, full screen
- **Panel**:
  - Position: Bottom of screen
  - Background: White
  - Border Radius: `24px` (top only)
  - Padding: `24px`
  - Animation: Slide up

- **Header**:
  - Title: "Profile Photo" - `20px` Semibold gray-900
  - **Close Button**: X icon in gray circle

- **Upload Photo Option**:
  - Background: Gradient blue-50 to cyan-50
  - Padding: `16px`
  - Border Radius: `12px`
  - Icon: Upload (white) in primary blue circle (`48px`)
  - Title: "Upload Photo" - `16px` Semibold gray-900
  - Subtitle: "Choose from your device" - `13px` gray-600

- **Remove Photo Option** (if photo exists):
  - Background: Red-50
  - Icon: X in red-100 circle
  - Title: "Remove Photo" - `16px` Semibold red-900
  - Subtitle: "Use default avatar" - `13px` red-600

- **Avatar Grid**:
  - Layout: 4 columns
  - Gap: `12px`
  - **Items**: Emoji/icon options (⚽🎨📚🎵🧩🎮🎭🎸🏀🎪⭐)
  - **Button**:
    - Size: `48px` circle
    - Background: Gray-100
    - Emoji Size: `24px`
    - Active: `scale-95`
    - Hover: Blue-50

- **Info Text**: "Max file size: 5MB • Supported formats: JPG, PNG" - `12px` gray-500

---

## 5️⃣ **MANAGE CHILDREN SCREEN** (`ManageChildren.tsx`)

### **Purpose**
Add, edit, remove children profiles. View approval status.

### **Header Section**

- Background: Primary gradient
- Padding: `20px` horizontal, `24px` top, `20px` bottom

- **Back Button**: 
  - If adding/editing: Go back to list view
  - If on list view: Go to home

- **Title**: Dynamic
  - "Manage Children" (list view)
  - "Add New Child" (adding)
  - "Edit Child" (editing)
  - Font: `26px` Bold white

- **Subtitle**: Dynamic
  - "{count} children registered" (list view)
  - "Fill in the details below" (adding/editing)
  - Font: `15px` white/90%

- **Add Button** (list view only):
  - Size: `48px` circle
  - Background: White
  - Icon: Plus (primary blue, `24px`, stroke 2.5)
  - Border Radius: `12px`
  - Shadow: Large
  - Action: Show add form

### **Pending Approval Notice** (if any pending children)

- Background: Yellow-50
- Border: `2px solid` yellow-200
- Border Radius: `20px`
- Padding: `16px`

- **Icon**: User (yellow-600) in yellow-100 circle (`40px`)
- **Title**: "Pending Approval" - `15px` Semibold yellow-900
- **Message**: "{count} child(ren) waiting for admin approval. You'll be able to book rides once approved." - `13px` yellow-800

### **Add/Edit Form** (when isAdding === true)

- **Container**:
  - Background: White
  - Border: `2px solid` primary blue
  - Border Radius: `20px`
  - Padding: `20px`
  - Shadow: Large

- **Form Title**: "Add New Child" or "Edit Child" - `18px` Semibold gray-900

- **Fields**:

  **1. Full Name**:
  - Label: "Full Name" - `14px` Medium gray-700
  - Input Container:
    - Border: `2px solid` gray-300
    - Border Radius: `12px`
    - Padding: `12px 16px`
    - Icon: User (gray-400, `20px`)
    - Input: Placeholder "Enter child's full name", `16px`

  **2. Age**:
  - Label: "Age"
  - Icon: Calendar
  - Input: Type `number`, min `3`, max `18`
  - Placeholder: "Enter age"

  **3. Year**:
  - Label: "Year"
  - Icon: School
  - Input: `<select>` dropdown
  - Options:
    - Kindergarten
    - Year 1-13 (Primary/Intermediate/Secondary)

  **4. School**:
  - Label: "School"
  - Icon: School
  - Input: `<select>` dropdown
  - Options:
    - Wairoa Primary School
    - Wairoa College
    - St Joseph's School
    - Te Kura Kaupapa Māori o Te Whānau a Apanui

  **5. Photo**:
  - Label: "Photo"
  - **Preview** (if photo selected):
    - `<ChildAvatar />` component, size `lg` (80px)
    - Centered

  - **Choose Avatar Button**:
    - Width: Full
    - Background: `#F0F9FF` (blue-50)
    - Border: `2px solid` primary blue
    - Border Radius: `12px`
    - Padding: `12px 16px`
    - Icon: 🎨 emoji
    - Text: "Choose Avatar" - `16px` Semibold primary blue
    - Action: Open avatar picker modal

  - **Upload Photo**:
    - Icon: Camera (gray-400, `20px`)
    - Input: Type `file`, accept `image/*`
    - Border: `2px solid` gray-300
    - Border Radius: `12px`
    - Padding: `12px 16px`

- **Action Buttons**:
  - **Cancel**:
    - Width: 50%
    - Height: `56px`
    - Background: White
    - Border: `2px solid` gray-300
    - Text: "Cancel" - `16px` Semibold gray-600
    - Border Radius: `12px`

  - **Submit** (Add Child / Update):
    - Width: 50%
    - Height: `56px`
    - Background: Primary gradient
    - Text: "Add Child" or "Update" - `16px` Semibold white
    - Border Radius: `12px`
    - Action:
      - Validate fields
      - Create/update child
      - Show success toast
      - Close form

### **Children List View** (when not adding/editing)

#### **Empty State** (if no children):
- Background: White
- Border Radius: `20px`
- Padding: `40px`
- Text Align: Center
- Shadow: Medium

- **Icon**: User in blue-50 circle (`80px`, gray-400, `40px`)
- **Title**: "No Children Added" - `18px` Semibold gray-900
- **Message**: "Add your first child to start booking rides" - `14px` gray-600
- **Add Button**:
  - Width: Auto
  - Padding: `12px 24px`
  - Height: `48px`
  - Background: Primary gradient
  - Text: "Add Child" - `15px` Semibold white
  - Border Radius: `12px`

#### **Child Cards** (foreach child):

- Background: White
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium
- Gap: `12px` between cards

- **Layout**:
  - **Avatar**: `<ChildAvatar />` size `md` (56px)
  - **Info Section**:
    - **Name Row**:
      - Name: `17px` Semibold gray-900
      - **Status Badge**:
        - Pending: Yellow-100 bg, yellow-700 text, `xs` font, `600` weight
        - Approved: Green-100 bg, green-700 text
        - Rejected: Red-100 bg, red-700 text
        - Text: Status name
        - Padding: `2px 8px`
        - Border Radius: Full

    - **Age/Year**: "{age} years old • {year}" - `14px` gray-600

    - **School Row**:
      - Icon: School (gray-400, `16px`)
      - Text: School name - `13px` gray-600

  - **Action Buttons** (right side):
    - **Edit Button**:
      - Size: `40px` circle
      - Background: Blue-50
      - Border Radius: `8px`
      - Icon: Edit2 (primary blue, `20px`)

    - **Delete Button**:
      - Size: `40px` circle
      - Background: Red-50
      - Border Radius: `8px`
      - Icon: Trash2 (red-600, `20px`)
      - Action: Show confirmation dialog

- **Add Another Child Button** (bottom of list):
  - Width: Full
  - Height: `64px`
  - Background: `#F0F9FF` (blue-50)
  - Border: `2px dashed` primary blue
  - Border Radius: `20px`
  - Icon: Plus (primary blue, `24px`, stroke 2.5)
  - Text: "Add Another Child" - `17px` Semibold primary blue
  - Active: `scale-95`

### **Avatar Picker Modal**

- **Overlay**: Black/50%, full screen
- **Panel**:
  - Position: Bottom
  - Background: White
  - Border Radius: `24px` (top)
  - Padding: `24px`
  - Max Height: `80vh`
  - Overflow: Auto

- **Header**:
  - Title: "Choose Avatar" - `20px` Semibold gray-900
  - Close Button: X in gray circle

- **Avatar Grid**:
  - Layout: 4 columns
  - Gap: `16px`
  - **Items**: Icon options (Book, Ball, Guitar, Palette, Star, Rocket, Heart, Music, Camera, Trophy)
  - **Button**:
    - Layout: Vertical flex
    - Padding: `12px`
    - Background: Gray-50
    - Border Radius: `12px`
    - Active: `scale-95`, hover: Blue-50

    - **Icon Container**:
      - Size: `56px × 56px`
      - Background: `#E0F7FA`
      - Border Radius: `16px`
      - Icon: `28px`, stroke `2.5`, colored

    - **Label**: Icon name - `12px` gray-600

- **Cancel Button**:
  - Width: Full
  - Height: `56px`
  - Border: `2px solid` gray-200
  - Border Radius: `12px`
  - Text: "Cancel" - `16px` Semibold gray-700

### **Delete Confirmation Dialog**

- Component: `<ConfirmDialog />`
- Title: "Remove Child"
- Message: "Are you sure you want to remove this child from your account?"
- Confirm Text: "Yes, Remove"
- Cancel Text: "Cancel"
- Variant: `danger` (red theme)

---

## 6️⃣ **HISTORY PAGE** (`HistoryFeedbackPage.tsx`)

### **Purpose**
View past completed rides with details.

### **Header Section**

- Background: Primary gradient
- Padding: `24px` horizontal, `32px` top, `24px` bottom

- **Back Button**:
  - Size: `40px`
  - Background: `rgba(255, 255, 255, 0.2)` with backdrop blur
  - Icon: ArrowLeft (white, `20px`)
  - Border Radius: `8px`

- **Title**: "Ride History" - `24px` white
- **Subtitle**: "View past rides and trip details" - white/90%

### **Helpful Hint Box**

- Background: Blue-50
- Border: `2px solid` blue-200
- Border Radius: `12px`
- Padding: `16px`

- **Icon**: MapPin in primary blue circle (`32px`)
- **Text**: "Tap any completed ride to view the route map and trip details" - `14px` Semibold primary blue

### **Ride History Cards** (foreach ride)

- Background: White
- Border Radius: `12px`
- Padding: `20px`
- Shadow: Small
- Active: `scale-98%`
- Cursor: Pointer (if completed)

- **Status Row**:
  - **Status Badge** (left):
    - Completed:
      - Background: Green-100
      - Text: "Completed" - `14px` Medium green-700
      - Icon: CheckCircle (green, `16px`)
      - Padding: `4px 12px`
      - Border Radius: Full

    - Cancelled:
      - Background: Red-100
      - Text: "Cancelled" - red-700
      - Icon: XCircle

  - **Date** (right): "{date}" - `14px` gray-500

- **Child Info Row**:
  - Icon: User (primary blue, `20px`)
  - Name: Child name - Medium gray-900
  - **Type Badge**:
    - Background: Gray-100
    - Text: "Pickup" or "Dropoff" - `12px` gray-600
    - Padding: `2px 8px`
    - Border Radius: `4px`

- **Route Section**:
  - **From**:
    - Icon: MapPin (blue-600, `20px`)
    - Label: "From" - `12px` gray-500
    - Address: `14px` gray-900

  - **To**:
    - Icon: MapPin (green-600, `20px`)
    - Label: "To" - `12px` gray-500
    - Address: `14px` gray-900

- **Details Footer** (border-top gray-100):
  - **Left**:
    - Icon: Clock (gray, `16px`)
    - Time: `14px` gray-600

  - **Right**:
    - Text: "Driver: {name}" - `14px` gray-600
    - Icon: ChevronRight (gray-400, `20px`) if completed

- **Action**: On click (if completed) → Open RideDetailModal with route map

### **Empty State** (if no history)

- Text Align: Center
- Padding: `48px` vertical

- **Icon**: Clock (gray-300, `64px`)
- **Text**: "No ride history yet" - `16px` gray-500
- **Book Button**:
  - Background: Primary gradient
  - Text: "Book Your First Ride"
  - Padding: `8px 24px`
  - Border Radius: `8px`
  - Active: `scale-98%`

---

## 7️⃣ **NOTIFICATIONS PAGE** (`CaregiverNotifications.tsx`)

### **Purpose**
View all notifications (ride requests, dropoffs, updates).

### **Header Section**

- Component: `<PageHeader />`
- Background: Primary gradient
- Title: "Notifications"
- Subtitle: "{unreadCount} unread notification(s)" (if > 0)
- **Right Element** (if unread > 0):
  - Button: "Mark all read"
  - Background: `rgba(255, 255, 255, 0.2)`
  - Text: `14px` Semibold white
  - Padding: `6px 12px`
  - Border Radius: `8px`

### **Notifications List**

#### **Empty State** (if no notifications):
- Background: White
- Border Radius: `12px`
- Padding: `32px`
- Text Align: Center

- **Icon**: Bell (primary blue) in cyan circle (`64px`)
- **Title**: "No Notifications Yet" - gray-900
- **Message**: "You'll receive notifications when your child is dropped off at school" - `14px` gray-600

#### **Notification Cards** (foreach notification):

- Background: White (or blue-50/30% if unread)
- Border: `2px` (blue-200 if unread, gray-100 if read)
- Border Radius: `12px`
- Padding: `16px`
- Shadow: Small
- Transition: All properties 300ms
- Click: Mark as read if unread

- **Layout**:
  - **Icon Container**:
    - Size: `48px × 48px`
    - Border Radius: `12px`
    - Background:
      - Dropoff Complete: Green-100
      - Ride Request: Blue-100
    - Icon:
      - Dropoff Complete: CheckCircle (green-600, `24px`)
      - Ride Request: AlertCircle (blue-600, `24px`)

  - **Content**:
    - **Header Row**:
      - **Title**: `16px` Semibold gray-900
        - "Child Dropped Off" (dropoff_complete)
        - "Ride Request Received" (ride request)
      
      - **Unread Dot** (if unread):
        - Size: `10px` circle
        - Background: Primary blue
        - Position: Top-right

    - **Message**: `15px` gray-700
      - Dropoff: "{childName} has been safely dropped off at {school}."
      - Request: "Ride request for {childName} has been received."

    - **Details Section**:
      - **Child**: Icon User + child name - `14px` gray-600
      - **School**: Icon MapPin + school - `14px` gray-600
      - **Time**: Icon Clock + date & time - `14px` gray-600
      - Gap: `8px` between rows

    - **Timestamp**: "X min/hours/days ago" - `12px` gray-400

---

## 8️⃣ **NOTIFICATION SETTINGS** (`NotificationSettings.tsx`)

### **Purpose**
Configure notification preferences.

### **Header Section**

- Background: Primary gradient
- Padding: `20px` horizontal, `24px` top, `24px` bottom

- **Back Button**: ArrowLeft + "Back"

- **Icon Circle**:
  - Size: `64px`
  - Background: `rgba(255, 255, 255, 0.2)`
  - Icon: Bell (white, `32px`)

- **Title**: "Notifications" - `24px` Bold white
- **Subtitle**: "Manage your alert preferences" - `14px` white/90%

### **Ride Notifications Card**

- Background: White
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Title**: "Ride Notifications" - `18px` Semibold gray-900

- **Toggle Items**:

  **1. Ride Updates**:
  - **Left**:
    - Icon: MapPin (primary blue, `20px`)
    - Title: "Ride Updates" - `15px` Medium gray-900
    - Subtitle: "Driver on the way, arrival alerts" - `13px` gray-600
    - Background: Gray-50
    - Padding: `16px`
    - Border Radius: `12px`

  - **Right** - Toggle Switch:
    - Width: `56px`, Height: `32px`
    - Background: Green-500 (on) or Gray-300 (off)
    - Border Radius: Full
    - **Thumb**:
      - Size: `24px` circle
      - Background: White
      - Shadow: Medium
      - Translate: `28px` (on) or `4px` (off)
      - Transition: 300ms

  **2. Pickup Reminders**:
  - Icon: Calendar
  - Title: "Pickup Reminders"
  - Subtitle: "Remind me 15 minutes before pickup"

  **3. Schedule Changes**:
  - Icon: AlertCircle
  - Title: "Schedule Changes"
  - Subtitle: "Alerts for ride cancellations or delays"

### **Safety & Communication Card**

- Same layout as Ride Notifications
- **Title**: "Safety & Communication"

- **Items**:
  **1. Safety Alerts**:
  - Icon: Bell (red-500, `20px`)
  - Title: "Safety Alerts"
  - Subtitle: "Important safety notifications"

  **2. Driver Messages**:
  - Icon: MessageSquare
  - Title: "Driver Messages"
  - Subtitle: "Messages from Mike Kereama"

### **Optional Card**

- **Title**: "Optional"

- **Item**:
  **Promotions & Updates**:
  - Icon: Bell (gray-400)
  - Title: "Promotions & Updates"
  - Subtitle: "Service updates and community news"
  - Default: OFF

### **Info Box**

- Background: Blue-50
- Border: `2px solid` blue-100
- Border Radius: `20px`
- Padding: `20px`

- **Icon**: Bell (blue-600, `20px`)
- **Title**: "Push Notification Status" - `14px` Semibold blue-900
- **Message**: "Push notifications are enabled for this device. You can manage system-level notification settings in your device settings." - `13px` blue-700

---

## 9️⃣ **PRIVACY & SAFETY** (`PrivacySafety.tsx`)

### **Purpose**
Information about data protection and safety features.

### **Header Section**

- Same layout as Notification Settings
- Icon: Shield (white, `32px`)
- Title: "Privacy & Safety"
- Subtitle: "Your data protection and safety"

### **Data Protection Card**

- Background: White
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Header**:
  - Icon: Lock (primary blue, `24px`) in cyan circle (`48px`)
  - Title: "Data Protection" - `18px` Semibold gray-900

- **Info Boxes**:

  **1. Secure Data Storage**:
  - Background: Gray-50
  - Padding: `16px`
  - Border Radius: `12px`
  - Title: "Secure Data Storage" - `15px` Medium gray-900
  - Text: "All your personal information is encrypted and securely stored. We use industry-standard security measures to protect your data." - `13px` gray-600, line-height `1.6`

  **2. Limited Data Sharing**:
  - Title: "Limited Data Sharing"
  - Text: "Your information is only shared with verified drivers for active rides. No third-party marketing or data selling."

  **3. Data Control**:
  - Title: "Data Control"
  - Text: "You can request to view, update, or delete your personal data at any time. Contact support for data requests."

### **Safety Features Card**

- **Header**:
  - Icon: Shield (red-600, `24px`) in red-100 circle
  - Title: "Safety Features"

- **Feature Items**:

  **1. Verified Drivers Only**:
  - Icon: UserCheck (primary blue, `20px`)
  - Title: "Verified Drivers Only" - `15px` Medium gray-900
  - Text: "All drivers undergo background checks and vehicle safety inspections. Mike Kereama is our verified community driver." - `13px` gray-600

  **2. Live Ride Tracking**:
  - Icon: Eye
  - Title: "Live Ride Tracking"
  - Text: "Track every ride in real-time on the map. You always know where your child is during transport."

  **3. Safety Monitoring**:
  - Icon: AlertTriangle
  - Title: "Safety Monitoring"
  - Text: "All rides are monitored for safety. Unusual activity triggers automatic alerts to caregivers and administrators."

### **Policies & Terms Card**

- **Header**:
  - Icon: FileText (primary blue) in cyan circle
  - Title: "Policies & Terms"

- **Links**:
  1. "Privacy Policy" → Chevron right
  2. "Terms of Service" → Chevron right
  3. "Community Guidelines" → Chevron right
  - Each:
    - Background: Gray-50
    - Padding: `16px`
    - Border Radius: `12px`
    - Text: `15px` Medium gray-900
    - Active: `scale-95`

### **Contact Box**

- Background: Gradient blue-50 to cyan-50
- Border: `2px solid` blue-100
- Border Radius: `20px`
- Padding: `20px`

- **Title**: "Privacy Questions?" - `16px` Semibold gray-900
- **Message**: "If you have any questions about how we protect your data or our safety measures, please contact us." - `14px` gray-700
- **Button**:
  - Background: Primary gradient
  - Text: "Contact Support" - `15px` Semibold white
  - Padding: `12px 20px`
  - Border Radius: `12px`
  - Link: `tel:06838800`

---

## 🔟 **APP PREFERENCES** (`AppPreferences.tsx`)

### **Purpose**
Customize app language, theme, updates, data settings.

### **Header Section**

- Icon: Settings (white, `32px`)
- Title: "App Preferences"
- Subtitle: "Customize your app experience"

### **Language Card**

- **Header**:
  - Icon: Globe (primary blue, `24px`) in cyan circle
  - Title: "Language"

- **Language Options**:

  **Items**:
  1. 🇳🇿 English (New Zealand) - `en-nz` ✅ DEFAULT
  2. 🇳🇿 Te Reo Māori - `mi`
  3. 🌍 English (International) - `en`

  - **Button Layout**:
    - Background: Blue-50 gradient if selected, Gray-50 if not
    - Border: `2px solid` primary blue if selected
    - Padding: `16px`
    - Border Radius: `12px`
    - Active: `scale-95`

    - **Left**: Flag emoji (`24px`) + Language name (`15px`)
    - **Right** (if selected): Primary blue circle with white checkmark

### **Appearance Card**

- **Header**:
  - Icon: Palette (amber-600, `24px`) in yellow-100 circle
  - Title: "Appearance"

- **Theme Options**:
  1. Light Mode - "Bright and clear" ✅ ACTIVE
  2. Dark Mode - "Coming soon" (disabled, opacity 50%)
  3. Auto (System) - "Coming soon" (disabled)

  - **Button**:
    - Same layout as language
    - **Title**: `15px` Medium
    - **Description**: `13px` gray-600

### **Updates Card**

- **Header**:
  - Icon: Download (primary blue) in cyan circle
  - Title: "Updates"

- **Settings**:

  **1. Auto-Update App** (Toggle):
  - Background: Gray-50
  - Padding: `16px`
  - Border Radius: `12px`
  - Title: "Auto-Update App" - `15px` Medium gray-900
  - Subtitle: "Download updates automatically" - `13px` gray-600
  - Toggle: Same as notification toggles

  **2. Current Version** (Display):
  - Background: Gray-50
  - **Left**:
    - Title: "Current Version"
    - Value: "Pahi App v1.0.0" - `13px` gray-600
  - **Right**:
    - Badge: "Up to date"
    - Background: Green-100
    - Text: `12px` Semibold green-700
    - Padding: `4px 12px`
    - Border Radius: Full

### **Data & Storage Card**

- **Header**:
  - Icon: Smartphone (primary blue) in cyan circle
  - Title: "Data & Storage"

- **Settings**:

  **1. Offline Mode** (Toggle):
  - Icon: Wifi (primary blue, `20px`)
  - Title: "Offline Mode"
  - Subtitle: "Access ride history offline"

  **2. Clear App Cache** (Button):
  - Background: Gray-50
  - Padding: `16px`
  - Border Radius: `12px`
  - Text: "Clear App Cache" - `15px` Medium gray-900
  - Center aligned
  - Active: `scale-95`
  - Action: Show success toast

### **Info Box**

- Background: Blue-50
- Border: `2px solid` blue-100
- Border Radius: `20px`
- Padding: `20px`

- **Title**: "System Information" - `14px` Semibold blue-900
- **Text**: "Some preferences sync across devices when you're logged in. Changes to language and notifications take effect immediately." - `13px` blue-700

---

## 1️⃣1️⃣ **HELP PAGE** (`HelpPage.tsx`)

### **Purpose**
Contact support and view FAQs.

### **Contact Support Section**

- **Title**: "Contact Support" - `18px` gray-800

- **Contact Cards**:

  **1. Call Us**:
  - Background: White
  - Border: `1px solid` gray-100
  - Border Radius: `12px`
  - Padding: `16px`
  - Shadow: Medium
  - Active: `scale-95`
  - Link: `tel:0800123456`

  - **Icon**: Phone (primary blue, `24px`) in cyan circle (`48px`)
  - **Title**: "Call Us" - gray-800
  - **Info**: "0800 123 456" - `14px` gray-600

  **2. Email Us**:
  - Icon: Mail (green-600) in green-100 circle
  - Title: "Email Us"
  - Info: "support@wairoarides.nz"
  - Link: `mailto:support@wairoarides.nz`

  **3. Live Chat**:
  - Icon: MessageCircle (primary blue) in cyan circle
  - Title: "Live Chat"
  - Info: "Chat with support"
  - Type: Button (not link)

### **FAQs Section**

- **Title**: "Frequently Asked" - `18px` gray-800

- **FAQ Items**:

  **Questions**:
  1. "How do I book a ride?"
  2. "Can I track rides in real-time?"
  3. "How do I add children?"
  4. "How can I cancel a ride?"
  5. "Are drivers verified?"

  - **Collapsed State**:
    - Background: White
    - Border: `1px solid` gray-100
    - Border Radius: `12px`
    - Padding: `16px`
    - Shadow: Medium

    - **Left**:
      - Icon: HelpCircle (primary blue, `20px`)
      - Question: `14px` gray-800

    - **Right**: ChevronDown icon (gray-400, `20px`)

  - **Expanded State**:
    - Chevron becomes ChevronUp
    - Answer appears below question
    - Answer: `14px` gray-600, indented `32px` from left

### **Emergency Note**

- Background: Red-50
- Border-Left: `4px solid` red-500
- Padding: `16px`
- Border Radius: `4px`

- **Title**: "Emergency" - gray-800
- **Text**: "In case of emergency, call **111**" - `14px` gray-700

---

## 1️⃣2️⃣ **FEEDBACK PAGE** (`FeedbackPage.tsx`)

### **Purpose**
Submit feedback about the app, driver, or service.

### **Header Section**

- Background: Primary gradient
- Padding: `20px` horizontal, `32px` top, `24px` bottom

- **Back Button**: Circle with white/20% background, ArrowLeft icon

- **Title**: "Share Feedback" - `28px` Bold white
- **Subtitle**: "Help us improve your experience" - `16px` white/90%

### **Form Content**

#### **1. Rate Your Experience Card**

- Background: White
- Border: `2px solid #E0F7FA`
- Border Radius: `20px`
- Padding: `20px`
- Shadow: Medium

- **Title**: "Rate Your Experience" - `18px` Semibold gray-900

- **Star Rating**:
  - 5 stars in horizontal layout
  - Size: `48px` each
  - Color: Yellow-400 (filled) or Gray-300 (empty)
  - Fill: Yellow-400 if selected
  - Stroke Width: 2
  - Active: `scale-110`
  - Gap: `12px`

- **Rating Text** (below stars):
  - 5 stars: "Excellent!" - `16px` Medium gray-700
  - 4 stars: "Very Good!"
  - 3 stars: "Good"
  - 2 stars: "Fair"
  - 1 star: "Needs Improvement"

#### **2. Feedback Category Card**

- Same card styling

- **Title**: "Feedback Category"

- **Category Grid**: 2 columns, gap `12px`
  - **Options**: General, Driver, App, Ride

  - **Button**:
    - Padding: `16px`
    - Border: `2px solid` gray-200 (default) or primary blue (selected)
    - Border Radius: `12px`
    - Background: Blue-50 if selected, White if not
    - Text: `16px` Semibold, primary blue if selected
    - Active: `scale-95`

#### **3. Subject Card**

- **Title**: "Subject"

- **Input**:
  - Width: Full
  - Padding: `16px`
  - Border: `2px solid` gray-300
  - Border Radius: `12px`
  - Focus: Border becomes primary blue
  - Font: `16px`
  - Placeholder: "Brief subject line..."
  - Required: Yes

#### **4. Your Feedback Card**

- **Title**: "Your Feedback"

- **Textarea**:
  - Width: Full
  - Padding: `16px`
  - Border: `2px solid` gray-300
  - Border Radius: `12px`
  - Focus: Border becomes primary blue
  - Font: `16px`
  - Rows: 8
  - Resize: None
  - Placeholder: "Share your experience or suggestions..."
  - Required: Yes

#### **5. Submit Button**

- Width: Full
- Height: `64px`
- Background: Primary gradient (if enabled), Gray-400 (if disabled)
- Text: "Submit Feedback" - `18px` Semibold white
- Icon: Send (white, `24px`)
- Border Radius: `20px`
- Shadow: Large
- Active: `scale-95`
- Disabled: If no rating, subject, or feedback

- **Enabled Conditions**:
  - Rating > 0
  - Subject filled
  - Feedback filled

- **Action**:
  1. Submit to feedback context
  2. Show success state
  3. Redirect to home after 2 seconds

### **Success State** (after submission)

- Background: Gradient blue-50 to white
- Layout: Centered, full screen
- Padding: `20px`

- **Success Icon**:
  - Size: `96px` circle
  - Background: Green-100
  - Icon: CheckCircle (green-600, `64px`, stroke 2.5)

- **Title**: "Thank You!" - `24px` Bold gray-900
- **Message**: "Your feedback has been submitted successfully. We appreciate your input to help improve Pahi App." - `16px` gray-600

---

## 📊 **COMMON PATTERNS & REUSABLE COMPONENTS**

### **1. ChildAvatar Component**

**Props**:
- `photoUrl`: string (emoji, icon name, or image URL)
- `initials`: string (2 letters)
- `name`: string (for alt text)
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `backgroundColor`: string (default '#2F6F9F')

**Sizes**:
- sm: `40px`
- md: `56px`
- lg: `80px`
- xl: `96px`

**Rendering Logic**:
- If `photoUrl` is emoji or short string: Display as text icon with color
- If `photoUrl` is image URL: Display as `<img>`
- If no `photoUrl`: Display initials

**Styling**:
- Border Radius: `16px`
- Background: Provided or default primary blue
- Text: White, centered, semibold

### **2. ConfirmDialog Component**

**Props**:
- `isOpen`: boolean
- `title`: string
- `message`: string
- `confirmText`: string
- `cancelText`: string
- `onConfirm`: function
- `onCancel`: function
- `variant`: 'default' | 'danger'

**Layout**:
- Overlay: Black/50%, full screen
- Modal: White, centered, `20px` border radius
- Padding: `24px`
- Max Width: `90%` or `400px`

**Buttons**:
- Cancel: Gray border, gray text
- Confirm (danger): Red background, white text
- Confirm (default): Primary gradient, white text
- Height: `48px`
- Border Radius: `12px`

### **3. PageHeader Component**

**Props**:
- `title`: string
- `subtitle`?: string
- `onBack`: function
- `rightElement`?: ReactNode

**Layout**:
- Background: Primary gradient
- Padding: `24px` horizontal, `32px` top, `24px` bottom

- **Back Button**:
  - Size: `40px`
  - Background: `rgba(255, 255, 255, 0.2)` with backdrop blur
  - Icon: ArrowLeft (white, `20px`)
  - Border Radius: `8px`

- **Title**: `24px` white
- **Subtitle**: `14px` white/90% (if provided)
- **Right Element**: Positioned absolute top-right (if provided)

### **4. Toast Notifications (Sonner)**

**Types**:
- `toast.success()` - Green checkmark icon
- `toast.error()` - Red X icon
- `toast.info()` - Blue info icon

**Styling** (defined in App.tsx):
- Min Height: `80px`
- Padding: `20px`
- Font Size: `18px`
- Font Weight: Bold
- Border Width: `3px`
- Border Color: Primary blue
- Border Radius: `16px`

**Duration**: 5000ms (5 seconds) default

---

## 🎯 **USER FLOWS**

### **Flow 1: Book a Ride**
1. Home → Tap "Book Ride" in bottom nav
2. Step 1: Select child (Ciara Mitchell)
3. Step 2: Choose "Pick Up"
4. Step 3: Select tomorrow's date
5. Step 4: Select "Wairoa Primary School"
6. Step 5: Select "8:00 AM" time slot
7. Review booking details
8. Tap "Confirm Booking"
9. See success toast
10. Redirect to Home

### **Flow 2: Track Active Ride**
1. Home → See "Ride in Progress!" card
2. Tap "Track Ride Now"
3. View real-time progress (0-100%)
4. See status updates
5. View route details (pickup → dropoff)
6. Option to call driver
7. When complete: See "Ride Complete!" message
8. Tap "Return to Home"

### **Flow 3: Add a Child**
1. Home → Tap "Manage Children" button
2. Tap "Add Child" (+ button in header)
3. Fill in form:
   - Name: "Johnny Whaanga"
   - Age: 12
   - Year: Year 8
   - School: Wairoa College
   - Photo: Choose avatar (🎸 Guitar)
4. Tap "Add Child"
5. See pending approval notice
6. See success toast

### **Flow 4: View Ride History**
1. Home → Tap "History" quick action
2. See list of past rides
3. Tap a completed ride
4. View route map and trip details in modal
5. Close modal
6. Return to history list

### **Flow 5: Update Profile**
1. Bottom Nav → Tap "Profile"
2. Tap "Edit" button
3. Update phone number
4. Tap "Save Changes"
5. See success toast
6. Profile updates displayed

---

## 🔐 **DATA ENTITIES**

### **Child Object**
```typescript
{
  id: string;
  name: string;
  age: number;
  year: string;
  school: 'Wairoa Primary School' | 'Wairoa College' | "St Joseph's School" | 'Te Kura Kaupapa Māori o Te Whānau a Apanui';
  initials: string;
  photoUrl?: string;
  isEmojiAvatar?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  caregiverName?: string;
  caregiverEmail?: string;
}
```

### **Ride Object**
```typescript
{
  id: number | string;
  childName: string;
  rideType: 'pickup' | 'dropoff';
  date: string;
  time: string;
  school: string;
  status: 'scheduled' | 'started' | 'completed' | 'cancelled';
  driverName: 'Mike Kereama';
  from: string;
  to: string;
  pickupTime?: string;
  dropoffTime?: string;
}
```

### **Notification Object**
```typescript
{
  id: string;
  caregiverId: string;
  caregiverName: string;
  childName: string;
  childId: string;
  school: string;
  date: string;
  time: string;
  type: 'ride_request' | 'dropoff_complete';
  status: 'unread' | 'read';
  createdAt: string;
}
```

### **Authentic Names (ONLY USE THESE)**
**Children**:
1. Ciara Mitchell
2. Johnny Whaanga
3. Blu Kahukura
4. Mercedez Smith
5. Hine Brown
6. Tash Goldsmith

**Caregiver**:
- Rachel Mitchell

**Driver**:
- Mike Kereama (ONLY DRIVER)

**Schools** (ONLY USE THESE):
1. Wairoa Primary School
2. Wairoa College
3. St Joseph's School
4. Te Kura Kaupapa Māori o Te Whānau a Apanui

---

## 🎨 **DESIGN PRINCIPLES**

### **1. Mobile-First**
- Full-screen layout (100vh/100dvh)
- Fixed positioning for nav
- Touch-optimized (44px minimum)
- No desktop hamburger menus

### **2. Simplicity**
- Bottom navigation (NOT sidebar)
- Maximum 4 nav items
- Large, clear buttons
- Simple language

### **3. Accessibility**
- High contrast text
- Large touch targets
- Clear visual hierarchy
- Immediate feedback (toasts, animations)

### **4. Consistency**
- Same gradient for ALL headers
- Same button heights (48px standard)
- Same border radius (16px standard)
- Same padding (20px standard)

### **5. Safety-First**
- Emergency contact always visible on Home
- Driver info prominently displayed
- Live tracking emphasized
- Clear status indicators

---

## 🚀 **IMPLEMENTATION NOTES**

1. **All components use inline styles** with design system constants
2. **No custom CSS files** - Use Tailwind classes and inline styles
3. **Active states**: Always use `active:scale-95` for buttons
4. **Transitions**: Use `transition-all` with 300ms duration
5. **Icons**: Lucide React, sizes from ICON constants
6. **Toasts**: Sonner library with custom styling
7. **Forms**: `16px` font size to prevent iOS zoom
8. **Gradients**: Import from design system, NEVER hardcode
9. **Colors**: Import from COLORS constant, NEVER hardcode
10. **Spacing**: Use SPACING constants, avoid arbitrary values

---

## ✅ **COMPLETE SCREEN CHECKLIST**

- [x] 1. Home Screen (SimpleEasyHome)
- [x] 2. Book Ride (SimpleEasyBookRide)
- [x] 3. Track Ride (SimpleEasyTrackRide)
- [x] 4. Profile (SimpleEasyProfile)
- [x] 5. Manage Children (ManageChildren)
- [x] 6. History (HistoryFeedbackPage)
- [x] 7. Notifications (CaregiverNotifications)
- [x] 8. Notification Settings (NotificationSettings)
- [x] 9. Privacy & Safety (PrivacySafety)
- [x] 10. App Preferences (AppPreferences)
- [x] 11. Help Page (HelpPage)
- [x] 12. Feedback Page (FeedbackPage)
- [x] Bottom Navigation (EasyBottomNav)

---

## 📐 **QUICK REFERENCE**

### **Most Common Values**
- Button Height: `48px`
- Border Radius: `16px`
- Padding: `20px`
- Card Shadow: `shadow-md`
- Icon Size: `24px`
- Font Size (Body): `16px`
- Font Size (Heading): `18px`
- Gap: `12px` or `16px`

### **Color Shortcuts**
- Primary: `#2F6F9F`
- Gradient: `linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)`
- Accent: `#E0F7FA`
- Success: `#10B981`
- Danger: `#ef4444`

---

**END OF SPECIFICATION** 🎉

This document contains every detail needed to rebuild the exact Pahi App caregiver panel from scratch!
