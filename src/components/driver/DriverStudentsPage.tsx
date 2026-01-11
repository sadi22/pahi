import { useState } from 'react';
import { Search, UserCheck, Users, CheckCircle, XCircle, Phone, MapPin, Clock, User, Bell, Car } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import ChildAvatar from '../ChildAvatar';
import { useNotifications } from '../../contexts/NotificationContext';

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

interface DriverStudentsPageProps {
  students: Student[];
  onCheckIn: (studentId: number) => void;
  onNoShow: (studentId: number) => void;
  onParentCheckIn: (studentId: number) => void;
  onNavigateToMap: () => void;
}

export default function DriverStudentsPage({ students, onCheckIn, onNoShow, onParentCheckIn, onNavigateToMap }: DriverStudentsPageProps) {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'on-board' | 'dropped' | 'no-show'>('all');

  const handleCheckIn = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    onCheckIn(studentId);
    toast.success(`Student Checked In`, {
      description: `${student?.name} is now on board. Journey tracking activated.`,
      duration: 3000,
    });
  };

  const handleNoShow = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    onNoShow(studentId);
    toast.error(`No-Show Recorded`, {
      description: `${student?.name} was not present at scheduled pickup time.`,
      duration: 3000,
    });
  };

  const handleParentCheckIn = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    onParentCheckIn(studentId);
    toast.success(`Parent Verification Complete`, {
      description: `${student?.parentName} has confirmed presence for ${student?.name}.`,
      duration: 3000,
    });
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || student.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusCounts = () => {
    return {
      pending: students.filter(s => s.status === 'pending').length,
      onBoard: students.filter(s => s.status === 'on-board').length,
      dropped: students.filter(s => s.status === 'dropped').length,
      noShow: students.filter(s => s.status === 'no-show').length,
    };
  };

  const counts = getStatusCounts();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="bg-white rounded-t-2xl p-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-slate-800 mb-1">Student Check-In/Out</h2>
          <p className="text-slate-600 text-sm">Manage student pickups and drop-offs</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student or parent name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Pending */}
          <button
            onClick={() => setActiveFilter('pending')}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              activeFilter === 'pending' ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50'
            }`}
          >
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">{counts.pending}</span>
            <span className="text-xs text-slate-600">Pending</span>
          </button>

          {/* On Board */}
          <button
            onClick={() => setActiveFilter('on-board')}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              activeFilter === 'on-board' ? 'bg-blue-50 border-2 border-blue-400' : 'bg-gray-50'
            }`}
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">{counts.onBoard}</span>
            <span className="text-xs text-slate-600">On Board</span>
          </button>

          {/* Dropped */}
          <button
            onClick={() => setActiveFilter('dropped')}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              activeFilter === 'dropped' ? 'bg-green-50 border-2 border-green-400' : 'bg-gray-50'
            }`}
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">{counts.dropped}</span>
            <span className="text-xs text-slate-600">Dropped</span>
          </button>

          {/* No Show */}
          <button
            onClick={() => setActiveFilter('no-show')}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              activeFilter === 'no-show' ? 'bg-red-50 border-2 border-red-400' : 'bg-gray-50'
            }`}
          >
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">{counts.noShow}</span>
            <span className="text-xs text-slate-600">No Show</span>
          </button>
        </div>

        {/* Clear Filter */}
        {activeFilter !== 'all' && (
          <button
            onClick={() => setActiveFilter('all')}
            className="w-full mb-4 py-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Show All Students
          </button>
        )}

        {/* Student List */}
        <div className="space-y-3 pb-20">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              {/* Student Header */}
              <div className="flex items-start gap-3 mb-3">
                {/* Avatar */}
                <ChildAvatar
                  name={student.name}
                  photoUrl={student.photoUrl}
                  initials={getInitials(student.name)}
                  size="sm"
                />

                {/* Student Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-800">{student.name}</h3>
                    <span className="text-blue-600 font-semibold text-sm">{student.scheduledTime}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User className="w-3.5 h-3.5" />
                      <span>{student.parentName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="w-3.5 h-3.5" />
                      <a href={`tel:${student.phone}`} className="text-blue-600 hover:underline">
                        {student.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>Pickup: {student.pickupAddress}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-green-500" />
                      <span>Drop-off: {student.dropoffAddress}</span>
                    </div>
                    {student.parentCheckedIn && student.status === 'pending' && (
                      <div className="flex items-center gap-2 text-sm mt-2 bg-green-50 px-2 py-1 rounded-lg border border-green-200">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-700 font-medium">Parent checked in {student.parentCheckInTime && `at ${student.parentCheckInTime}`}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {student.status === 'pending' && (
                <>
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => handleCheckIn(student.id)}
                      className="flex-1 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                      style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Check In</span>
                    </button>
                    <button
                      onClick={() => handleNoShow(student.id)}
                      className="flex-1 bg-red-500 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-red-600"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>No Show</span>
                    </button>
                  </div>
                  {!student.parentCheckedIn && (
                    <button
                      onClick={() => handleParentCheckIn(student.id)}
                      className="w-full text-blue-600 py-2 text-sm flex items-center justify-center gap-2 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Parent Check-in</span>
                    </button>
                  )}
                </>
              )}

              {/* Status Badges */}
              {student.status === 'on-board' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg py-2 px-3 text-center">
                  <span className="text-blue-700 font-medium">On Board</span>
                </div>
              )}
              {student.status === 'dropped' && (
                <div className="bg-green-50 border border-green-200 rounded-lg py-2 px-3 text-center">
                  <span className="text-green-700 font-medium">Dropped Off</span>
                </div>
              )}
              {student.status === 'no-show' && (
                <div className="bg-red-50 border border-red-200 rounded-lg py-2 px-3 text-center">
                  <span className="text-red-700 font-medium">No Show</span>
                </div>
              )}
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No students found</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-2 max-w-lg mx-auto">
          <button
            className="flex flex-col items-center py-4 px-4 text-white"
            style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
          >
            <Users className="w-6 h-6 mb-1" />
            <span className="text-sm font-semibold">Students</span>
          </button>
          <button
            onClick={onNavigateToMap}
            className="flex flex-col items-center py-4 px-4 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <MapPin className="w-6 h-6 mb-1" />
            <span className="text-sm font-semibold">Live Map</span>
          </button>
        </div>
      </div>
    </div>
  );
}