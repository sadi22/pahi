import { useState } from 'react';
import { Car, LogOut, Bell } from 'lucide-react';
import DriverStudentsPage from './DriverStudentsPage';
import RealisticLiveTracking from '../caregiver/RealisticLiveTracking';
import DriverNotificationPanel from './DriverNotificationPanel';
import { useNotifications } from '../../contexts/NotificationContext';
import { toast } from 'sonner@2.0.3';

interface Student {
  id: number;
  name: string;
  parentName: string;
  phone: string;
  pickupAddress: string;
  dropoffAddress: string;
  scheduledTime: string;
  photo?: string;
  photoUrl?: string;
  isEmojiAvatar?: boolean;
  status: 'pending' | 'on-board' | 'dropped' | 'no-show';
  parentCheckedIn?: boolean;
  parentCheckInTime?: string;
}

interface DriverDashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

export default function DriverDashboard({ user, onNavigate }: DriverDashboardProps) {
  const { addDropoffNotification } = useNotifications();
  const [currentPage, setCurrentPage] = useState<'students' | 'map'>('students');
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Ciara Mitchell',
      parentName: 'Rachel Mitchell',
      phone: '021 456 7890',
      pickupAddress: '123 Main St, Wairoa',
      dropoffAddress: 'Wairoa Primary School',
      scheduledTime: '08:00 AM',
      photo: 'star',
      photoUrl: 'star',
      isEmojiAvatar: true,
      status: 'pending'
    },
    {
      id: 2,
      name: 'Liam Mitchell',
      parentName: 'Rachel Mitchell',
      phone: '021 456 7890',
      pickupAddress: '123 Main St, Wairoa',
      dropoffAddress: 'Wairoa Primary School',
      scheduledTime: '08:05 AM',
      photo: 'music',
      photoUrl: 'music',
      isEmojiAvatar: true,
      status: 'pending'
    },
    {
      id: 3,
      name: 'Johnny Whaanga',
      parentName: 'Tom Whaanga',
      phone: '021 345 6789',
      pickupAddress: '45 Beach Rd, Wairoa',
      dropoffAddress: 'Wairoa Primary School',
      scheduledTime: '08:15 AM',
      photo: 'ball',
      photoUrl: 'ball',
      isEmojiAvatar: true,
      status: 'pending'
    },
    {
      id: 4,
      name: 'Blu Kahukura',
      parentName: 'Maria Kahukura',
      phone: '021 456 7890',
      pickupAddress: '78 Hill St, Wairoa',
      dropoffAddress: 'Wairoa Primary School',
      scheduledTime: '08:20 AM',
      photo: 'rocket',
      photoUrl: 'rocket',
      isEmojiAvatar: true,
      status: 'pending'
    },
  ]);
  
  const handleLogout = () => {
    onNavigate('landing');
  };

  const handleCheckIn = (studentId: number) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, status: 'on-board' as const } : s
    ));
    // Don't auto-navigate to map - let driver check in multiple students
  };

  const handleNoShow = (studentId: number) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, status: 'no-show' as const } : s
    ));
  };

  const handleParentCheckIn = (studentId: number) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    setStudents(students.map(s => 
      s.id === studentId ? { 
        ...s, 
        parentCheckedIn: true,
        parentCheckInTime: timeString,
        status: 'on-board' as const  // Change status to on-board so student appears on map
      } : s
    ));
  };

  const handleDropOff = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      // Create caregiver notification for drop-off
      const now = new Date();
      const today = now.toLocaleDateString('en-NZ', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
      const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      
      addDropoffNotification({
        caregiverId: `parent-${studentId}`, // Map student to their parent
        caregiverName: student.parentName,
        childName: student.name,
        childId: String(studentId),
        rideType: 'dropoff',
        date: today,
        time: currentTime,
        school: student.dropoffAddress,
        dropoffAddress: student.dropoffAddress,
        pickupAddress: student.pickupAddress
      });
    }
    
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, status: 'dropped' as const } : s
    ));
    toast.success(`Dropped off ${student?.name} successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white px-4 py-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <div className="flex items-center justify-between">
          {/* Left - Driver Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white mb-0">Mike Kereama</h2>
              <p className="text-white/80 text-sm">Certified Driver</p>
            </div>
          </div>

          {/* Right - Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <button
              onClick={() => setShowNotificationPanel(true)}
              className="p-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div>
        {currentPage === 'students' && (
          <DriverStudentsPage 
            students={students}
            onCheckIn={handleCheckIn}
            onNoShow={handleNoShow}
            onParentCheckIn={handleParentCheckIn}
            onNavigateToMap={() => setCurrentPage('map')} 
          />
        )}
        {currentPage === 'map' && (
          <RealisticLiveTracking 
            students={students}
            onDropOff={handleDropOff}
            onNavigateToStudents={() => setCurrentPage('students')} 
          />
        )}
      </div>

      {/* Notification Panel */}
      <DriverNotificationPanel 
        isOpen={showNotificationPanel}
        onClose={() => setShowNotificationPanel(false)}
      />
    </div>
  );
}