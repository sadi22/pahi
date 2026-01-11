# 🏫 PAHI APP - SCHOOL TIMETABLE REFERENCE

## 📚 AUTHENTIC WAIROA SCHOOLS (ONLY USE THESE 4)

1. **Wairoa Primary School**
2. **Wairoa College**
3. **St Joseph's School**
4. **Te Kura Kaupapa Māori o Te Whānau a Apanui**

---

## 🚌 PICKUP SCHEDULES (Morning - Home to School)

### **1. Wairoa Primary School**

| Time Slot | Booked Seats | Max Capacity | Available Seats | Status |
|-----------|--------------|--------------|-----------------|--------|
| **07:30 AM** | 3 | 6 | 3 | ⚠️ Half Full |
| **08:00 AM** | 5 | 6 | 1 | 🔴 Almost Full |
| **08:30 AM** | 1 | 6 | 5 | ✅ Available |

---

### **2. Wairoa College**

| Time Slot | Booked Seats | Max Capacity | Available Seats | Status |
|-----------|--------------|--------------|-----------------|--------|
| **08:10 AM** | 4 | 6 | 2 | ⚠️ Limited |
| **08:40 AM** | 2 | 6 | 4 | ✅ Available |

---

### **3. St Joseph's School**

| Time Slot | Booked Seats | Max Capacity | Available Seats | Status |
|-----------|--------------|--------------|-----------------|--------|
| **07:50 AM** | 0 | 6 | 6 | ✅ Empty |
| **08:20 AM** | 6 | 6 | 0 | 🚫 FULL |

---

### **4. Te Kura Kaupapa Māori o Te Whānau a Apanui**

| Time Slot | Booked Seats | Max Capacity | Available Seats | Status |
|-----------|--------------|--------------|-----------------|--------|
| **06:00 AM** | 1 | 6 | 5 | ✅ Available |
| **07:40 AM** | 3 | 6 | 3 | ⚠️ Half Full |
| **08:45 AM** | 2 | 6 | 4 | ✅ Available |

---

## 🏠 DROPOFF SCHEDULES (Afternoon - School to Home)

### **1. Wairoa Primary School**

| Time Slot | Booked Seats | Max Capacity | Available Seats | Status |
|-----------|--------------|--------------|-----------------|--------|
| **2:50 PM** | 2 | 6 | 4 | ✅ Available |
| **3:00 PM** | 4 | 6 | 2 | ⚠️ Limited |
| **3:10 PM** | 1 | 6 | 5 | ✅ Available |
| **3:20 PM** | 3 | 6 | 3 | ⚠️ Half Full |
| **3:30 PM** | 5 | 6 | 1 | 🔴 Almost Full |

---

### **2. Wairoa College**

| Time Slot | Booked Seats | Max Capacity | Available Seats | Status |
|-----------|--------------|--------------|-----------------|--------|
| **3:00 PM** | 3 | 6 | 3 | ⚠️ Half Full |
| **3:20 PM** | 2 | 6 | 4 | ✅ Available |
| **3:40 PM** | 4 | 6 | 2 | ⚠️ Limited |
| **4:00 PM** | 1 | 6 | 5 | ✅ Available |

---

### **3. St Joseph's School**

| Time Slot | Booked Seats | Max Capacity | Available Seats | Status |
|-----------|--------------|--------------|-----------------|--------|
| **2:50 PM** | 1 | 6 | 5 | ✅ Available |
| **3:00 PM** | 3 | 6 | 3 | ⚠️ Half Full |
| **3:10 PM** | 2 | 6 | 4 | ✅ Available |
| **3:30 PM** | 4 | 6 | 2 | ⚠️ Limited |

---

### **4. Te Kura Kaupapa Māori o Te Whānau a Apanui**

| Time Slot | Booked Seats | Max Capacity | Available Seats | Status |
|-----------|--------------|--------------|-----------------|--------|
| **2:50 PM** | 0 | 6 | 6 | ✅ Empty |
| **3:10 PM** | 2 | 6 | 4 | ✅ Available |
| **3:30 PM** | 3 | 6 | 3 | ⚠️ Half Full |
| **3:50 PM** | 1 | 6 | 5 | ✅ Available |
| **4:00 PM** | 2 | 6 | 4 | ✅ Available |

---

## 📊 SUMMARY STATISTICS

### **Total Time Slots by School**

| School | Pickup Slots | Dropoff Slots | Total Slots |
|--------|-------------|---------------|-------------|
| **Wairoa Primary School** | 3 | 5 | 8 |
| **Wairoa College** | 2 | 4 | 6 |
| **St Joseph's School** | 2 | 4 | 6 |
| **Te Kura Kaupapa Māori o Te Whānau a Apanui** | 3 | 5 | 8 |
| **TOTAL** | **10** | **18** | **28** |

---

## 🎯 BOOKING SYSTEM LOGIC

### **Capacity Badge Colors**

```typescript
// Available Seats <= 2 (Limited)
backgroundColor: '#FEF3C7' (yellow-100)
borderColor: '#F59E0B' (orange)
textColor: '#B45309' (dark orange)

// Available Seats > 2 (Available)
backgroundColor: '#D1FAE5' (green-100)
borderColor: '#10B981' (green)
textColor: '#047857' (dark green)

// Fully Booked (0 seats)
backgroundColor: '#FEE2E2' (red-100)
borderColor: '#EF4444' (red)
textColor: '#991B1B' (dark red)
Badge: "FULL"
```

### **Slot Availability Rules**

```typescript
// Calculate availability
const seatsLeft = slot.maxCapacity - slot.booked;
const isFull = slot.booked >= slot.maxCapacity;

// Display logic
if (isFull) {
  // Disable button, show "Fully Booked", display FULL badge
  disabled: true,
  opacity: 50%,
  cursor: 'not-allowed'
}

if (seatsLeft <= 2 && !isFull) {
  // Show warning color (yellow/orange)
  // Display: "2 seats available" or "1 seat available"
}

if (seatsLeft > 2) {
  // Show success color (green)
  // Display: "X seats available"
}
```

---

## 🚨 IMPORTANT NOTES

### **Capacity Settings**
- **Maximum Capacity Per Ride**: 6 children
- **Driver Vehicle**: Toyota Hiace (6-passenger capacity)
- **Safety Compliance**: New Zealand transport regulations for school rides

### **Time Slot Display Format**
- **12-hour format** (AM/PM)
- **Example**: "08:00 AM" NOT "8:00am" or "08:00"

### **Booking Validation**
1. ✅ Check if slot is not full (`booked < maxCapacity`)
2. ✅ Check if caregiver's child is approved
3. ✅ Check if date is in the future
4. ✅ Prevent double-booking same child for same time slot

### **UI Behavior**
- **Fully booked slots** are displayed but disabled (50% opacity)
- **Low availability (≤2 seats)** shows yellow/orange warning colors
- **Good availability (>2 seats)** shows green success colors
- **Empty slots (0 booked)** show green with "6 seats available"

---

## 📱 CODE REFERENCE

### **TypeScript Interfaces**

```typescript
interface TimeSlot {
  time: string;              // e.g., "07:30 AM"
  booked: number;            // Current bookings (0-6)
  maxCapacity: number;       // Always 6
}

interface SchoolSchedule {
  name: string;              // School name
  timeSlots: TimeSlot[];     // Array of available time slots
}
```

### **Example School Schedule Object**

```typescript
const wairoa_primary_pickup: SchoolSchedule = {
  name: 'Wairoa Primary School',
  timeSlots: [
    { time: '07:30 AM', booked: 3, maxCapacity: 6 },
    { time: '08:00 AM', booked: 5, maxCapacity: 6 },
    { time: '08:30 AM', booked: 1, maxCapacity: 6 },
  ]
};
```

---

## 🔄 DYNAMIC UPDATES

### **When a Ride is Booked**
```typescript
// Increment booked count for that time slot
slot.booked = slot.booked + 1;

// Update UI immediately
- If booked reaches maxCapacity → Disable slot, show FULL
- If booked becomes > (maxCapacity - 2) → Change to yellow warning
- If booked stays <= (maxCapacity - 2) → Keep green
```

### **When a Ride is Cancelled**
```typescript
// Decrement booked count
slot.booked = slot.booked - 1;

// Update UI
- Re-enable slot if it was full
- Update color based on new availability
```

---

## 📅 TYPICAL DAILY SCHEDULE

### **Morning (Pickup)**
- **Earliest**: 06:00 AM (Te Kura Kaupapa Māori)
- **Latest**: 08:45 AM (Te Kura Kaupapa Māori)
- **Most Common**: 08:00 AM - 08:30 AM

### **Afternoon (Dropoff)**
- **Earliest**: 2:50 PM (Multiple schools)
- **Latest**: 4:00 PM (Wairoa College, Te Kura Kaupapa Māori)
- **Most Common**: 3:00 PM - 3:30 PM

---

## 🎨 UI DISPLAY EXAMPLES

### **Available Slot (4 seats left)**
```
┌────────────────────────────────────┐
│  🕐  08:00 AM                      │
│  👥  4 seats available             │
│                                    │
│                    [4/6] ✓        │
└────────────────────────────────────┘
Green border, green badge
```

### **Limited Slot (2 seats left)**
```
┌────────────────────────────────────┐
│  🕐  08:00 AM                      │
│  👥  2 seats available             │
│                                    │
│                    [2/6] ✓        │
└────────────────────────────────────┘
Blue border, yellow/orange badge
```

### **Full Slot (0 seats left)**
```
┌────────────────────────────────────┐
│  🕐  08:20 AM                      │
│  👥  Fully Booked                  │
│                                    │
│                         [FULL]    │
└────────────────────────────────────┘
Gray/disabled, red FULL badge, 50% opacity
```

---

## ✅ QUICK REFERENCE LOOKUP

### **Need a morning slot for Wairoa Primary?**
→ 07:30 AM, 08:00 AM, or 08:30 AM

### **Need an afternoon slot for Wairoa College?**
→ 3:00 PM, 3:20 PM, 3:40 PM, or 4:00 PM

### **Which school has the earliest pickup?**
→ Te Kura Kaupapa Māori (06:00 AM)

### **Which school has the most time slots?**
→ Wairoa Primary & Te Kura Kaupapa Māori (8 total each)

### **Which slot is completely full?**
→ St Joseph's School, 08:20 AM (Pickup)

### **Which slot is completely empty?**
→ St Joseph's School, 07:50 AM (Pickup)  
→ Te Kura Kaupapa Māori, 2:50 PM (Dropoff)

---

**END OF TIMETABLE REFERENCE** 📋
