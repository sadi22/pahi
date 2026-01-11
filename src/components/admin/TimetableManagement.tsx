import { Clock, School, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface TimeSlot {
  time: string;
  booked: number;
  maxCapacity: number;
}

interface SchoolSchedule {
  name: string;
  timeSlots: TimeSlot[];
}

export default function TimetableManagement() {
  const [expandedSchool, setExpandedSchool] = useState<string | null>(null);

  // Fixed timetable for each school with booking limits
  const schoolSchedules: SchoolSchedule[] = [
    {
      name: 'Wairoa Primary School',
      timeSlots: [
        { time: '07:30 AM', booked: 3, maxCapacity: 6 },
        { time: '08:00 AM', booked: 5, maxCapacity: 6 },
        { time: '08:30 AM', booked: 1, maxCapacity: 6 },
      ]
    },
    {
      name: 'Wairoa College',
      timeSlots: [
        { time: '08:10 AM', booked: 4, maxCapacity: 6 },
        { time: '08:40 AM', booked: 2, maxCapacity: 6 },
      ]
    },
    {
      name: 'St Joseph\'s School',
      timeSlots: [
        { time: '07:50 AM', booked: 0, maxCapacity: 6 },
        { time: '08:20 AM', booked: 6, maxCapacity: 6 },
      ]
    },
    {
      name: 'Te Kura Kaupapa Māori o Te Whānau a Apanui',
      timeSlots: [
        { time: '06:00 AM', booked: 1, maxCapacity: 6 },
        { time: '07:40 AM', booked: 3, maxCapacity: 6 },
        { time: '08:45 AM', booked: 2, maxCapacity: 6 },
      ]
    },
  ];

  const toggleSchool = (schoolName: string) => {
    setExpandedSchool(expandedSchool === schoolName ? null : schoolName);
  };

  const getTotalBooked = (school: SchoolSchedule) => {
    return school.timeSlots.reduce((sum, slot) => sum + slot.booked, 0);
  };

  const getTotalCapacity = (school: SchoolSchedule) => {
    return school.timeSlots.reduce((sum, slot) => sum + slot.maxCapacity, 0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Header */}
      <div 
        className="px-6 py-4"
        style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
      >
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-white" />
          <h2 className="text-white" style={{ fontSize: '20px', fontWeight: 600 }}>
            School Timetables & Capacity
          </h2>
        </div>
        <p className="text-white/90 mt-1" style={{ fontSize: '14px' }}>
          View booking schedules and availability
        </p>
      </div>

      {/* Schools List */}
      <div className="divide-y divide-gray-200">
        {schoolSchedules.map((school) => {
          const isExpanded = expandedSchool === school.name;
          const totalBooked = getTotalBooked(school);
          const totalCapacity = getTotalCapacity(school);
          const utilizationPercentage = (totalBooked / totalCapacity) * 100;

          return (
            <div key={school.name}>
              {/* School Header */}
              <button
                onClick={() => toggleSchool(school.name)}
                className="w-full px-6 py-5 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#E0F7FA' }}
                    >
                      <School className="w-6 h-6" style={{ color: '#2F6F9F' }} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1" style={{ fontSize: '17px', fontWeight: 600 }}>
                        {school.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600" style={{ fontSize: '14px' }}>
                            {totalBooked}/{totalCapacity} booked
                          </span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600" style={{ fontSize: '14px' }}>
                          {school.timeSlots.length} time slot{school.timeSlots.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      {/* Utilization Bar */}
                      <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full transition-all rounded-full"
                          style={{ 
                            width: `${utilizationPercentage}%`,
                            background: utilizationPercentage >= 80 
                              ? 'linear-gradient(90deg, #EF4444, #DC2626)' 
                              : utilizationPercentage >= 50
                              ? 'linear-gradient(90deg, #F59E0B, #D97706)'
                              : 'linear-gradient(90deg, #10B981, #059669)'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4" />
                  )}
                </div>
              </button>

              {/* Expanded Time Slots */}
              {isExpanded && (
                <div className="px-6 pb-5 bg-gray-50">
                  <div className="space-y-3 pt-3">
                    {school.timeSlots.map((slot) => {
                      const isFull = slot.booked >= slot.maxCapacity;
                      const seatsLeft = slot.maxCapacity - slot.booked;
                      const slotUtilization = (slot.booked / slot.maxCapacity) * 100;

                      return (
                        <div
                          key={slot.time}
                          className="bg-white rounded-xl p-4 shadow-sm border-2"
                          style={{ borderColor: isFull ? '#FEE2E2' : '#E5E7EB' }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: '#E0F7FA' }}
                              >
                                <Clock className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                              </div>
                              <div>
                                <p className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                                  {slot.time}
                                </p>
                                <p className="text-gray-600" style={{ fontSize: '13px' }}>
                                  {isFull ? 'Fully Booked' : `${seatsLeft} seat${seatsLeft !== 1 ? 's' : ''} available`}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Capacity Badge */}
                              <div 
                                className="px-4 py-2 rounded-lg"
                                style={{ 
                                  backgroundColor: isFull 
                                    ? '#FEE2E2' 
                                    : seatsLeft <= 2 
                                    ? '#FEF3C7' 
                                    : '#D1FAE5',
                                  border: `2px solid ${
                                    isFull 
                                      ? '#EF4444' 
                                      : seatsLeft <= 2 
                                      ? '#F59E0B' 
                                      : '#10B981'
                                  }`
                                }}
                              >
                                <p 
                                  style={{ 
                                    fontSize: '15px', 
                                    fontWeight: 700,
                                    color: isFull 
                                      ? '#991B1B' 
                                      : seatsLeft <= 2 
                                      ? '#B45309' 
                                      : '#047857'
                                  }}
                                >
                                  {slot.booked}/{slot.maxCapacity}
                                </p>
                              </div>

                              {/* Status Badge */}
                              {isFull && (
                                <div className="px-3 py-1 bg-red-100 rounded-full border-2 border-red-500">
                                  <span className="text-red-700" style={{ fontSize: '12px', fontWeight: 600 }}>
                                    FULL
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Mini Utilization Bar */}
                          <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="h-full transition-all rounded-full"
                              style={{ 
                                width: `${slotUtilization}%`,
                                background: slotUtilization === 100 
                                  ? '#EF4444' 
                                  : slotUtilization >= 70
                                  ? '#F59E0B'
                                  : '#10B981'
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-gray-600" style={{ fontSize: '14px' }}>
            Total Schools: <span className="text-gray-900" style={{ fontWeight: 600 }}>{schoolSchedules.length}</span>
          </p>
          <p className="text-gray-600" style={{ fontSize: '14px' }}>
            Total Time Slots: <span className="text-gray-900" style={{ fontWeight: 600 }}>
              {schoolSchedules.reduce((sum, s) => sum + s.timeSlots.length, 0)}
            </span>
          </p>
          <p className="text-gray-600" style={{ fontSize: '14px' }}>
            Total Capacity: <span className="text-gray-900" style={{ fontWeight: 600 }}>
              {schoolSchedules.reduce((sum, s) => getTotalCapacity(s), 0)} rides/day
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}