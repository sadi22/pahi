import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Check, User, ArrowRight, Calendar, Clock, MapPin, Users, School } from 'lucide-react';
import ChildAvatar from '../ChildAvatar';
import { useNotifications } from '../../contexts/NotificationContext';

interface Child {
  id: string;
  name: string;
  age: number;
  year: string;
  school: string;
  initials: string;
  photoUrl?: string;
  isEmojiAvatar?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
}

interface TimeSlot {
  time: string;
  booked: number;
  maxCapacity: number;
}

interface SchoolSchedule {
  name: string;
  timeSlots: TimeSlot[];
}

interface SimpleEasyBookRideProps {
  onNavigate: (page: string) => void;
  onRideBooked?: (rideData: any) => void;
  children: Child[];
}

export default function SimpleEasyBookRide({ onNavigate, onRideBooked, children }: SimpleEasyBookRideProps) {
  const { addNotification } = useNotifications();
  const [step, setStep] = useState(1);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [rideType, setRideType] = useState<'pickup' | 'dropoff'>('pickup');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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

  // Pickup schedules (morning times)
  const pickupSchedules: SchoolSchedule[] = [
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

  // Dropoff schedules (afternoon times)
  const dropoffSchedules: SchoolSchedule[] = [
    {
      name: 'Wairoa Primary School',
      timeSlots: [
        { time: '2:50 PM', booked: 2, maxCapacity: 6 },
        { time: '3:00 PM', booked: 4, maxCapacity: 6 },
        { time: '3:10 PM', booked: 1, maxCapacity: 6 },
        { time: '3:20 PM', booked: 3, maxCapacity: 6 },
        { time: '3:30 PM', booked: 5, maxCapacity: 6 },
      ]
    },
    {
      name: 'Wairoa College',
      timeSlots: [
        { time: '3:00 PM', booked: 3, maxCapacity: 6 },
        { time: '3:20 PM', booked: 2, maxCapacity: 6 },
        { time: '3:40 PM', booked: 4, maxCapacity: 6 },
        { time: '4:00 PM', booked: 1, maxCapacity: 6 },
      ]
    },
    {
      name: 'St Joseph\'s School',
      timeSlots: [
        { time: '2:50 PM', booked: 1, maxCapacity: 6 },
        { time: '3:00 PM', booked: 3, maxCapacity: 6 },
        { time: '3:10 PM', booked: 2, maxCapacity: 6 },
        { time: '3:30 PM', booked: 4, maxCapacity: 6 },
      ]
    },
    {
      name: 'Te Kura Kaupapa Māori o Te Whānau a Apanui',
      timeSlots: [
        { time: '2:50 PM', booked: 0, maxCapacity: 6 },
        { time: '3:10 PM', booked: 2, maxCapacity: 6 },
        { time: '3:30 PM', booked: 3, maxCapacity: 6 },
        { time: '3:50 PM', booked: 1, maxCapacity: 6 },
        { time: '4:00 PM', booked: 2, maxCapacity: 6 },
      ]
    },
  ];

  const handleBookRide = () => {
    // Create notification for admin and driver
    addNotification({
      caregiverId: 'user123', // In real app, this would be current user's ID
      caregiverName: 'Rachel Mitchell', // In real app, this would be current user's name
      childName: selectedChild?.name || '',
      childId: selectedChild?.id || '',
      rideType,
      date: selectedDate,
      time: selectedTime,
      school: selectedSchool,
      pickupAddress: selectedChild?.pickupAddress
    });

    if (onRideBooked) {
      onRideBooked({
        childName: selectedChild?.name,
        rideType,
        school: selectedSchool,
        date: selectedDate,
        time: selectedTime
      });
    }
    
    toast.success('Ride Booked Successfully!', { 
      description: `Scheduled for ${selectedChild?.name} on ${selectedDate}`,
      duration: 5000
    });
    
    // Reset and go home
    setStep(1);
    setSelectedChild(null);
    setRideType('pickup');
    setSelectedDate('');
    setSelectedSchool('');
    setSelectedTime('');
    onNavigate('home');
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(to bottom, #F0F9FF 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-5" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <button
          onClick={() => step === 1 ? onNavigate('home') : setStep(step - 1)}
          className="flex items-center gap-2 text-white mb-6 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span style={{ fontSize: '16px', fontWeight: 600 }}>Back</span>
        </button>

        <h1 className="text-white mb-2" style={{ fontSize: '26px', fontWeight: 700 }}>
          Book a Ride
        </h1>
        <p className="text-white/90" style={{ fontSize: '15px' }}>Step {step} of 5</p>
      </div>

      {/* Progress Bar */}
      <div className="px-5 py-4">
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full transition-all duration-300 rounded-full"
            style={{
              width: `${(step / 5) * 100}%`,
              background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)'
            }}
          />
        </div>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* Step 1: Select Child */}
        {step === 1 && (
          <div>
            <div className="mb-5">
              <h2 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                Who needs a ride?
              </h2>
              <p className="text-gray-600" style={{ fontSize: '15px' }}>
                Select your child
              </p>
            </div>

            <div className="space-y-3">
              {children.map((child) => (
                <button
                  key={child.name}
                  onClick={() => {
                    setSelectedChild(child);
                    setStep(2);
                  }}
                  className="w-full bg-white rounded-2xl p-5 shadow-md active:scale-95 transition-all border-2"
                  style={{ borderColor: selectedChild?.name === child.name ? '#2F6F9F' : '#E5E7EB' }}
                >
                  <div className="flex items-center gap-4">
                    <ChildAvatar
                      photoUrl={child.photoUrl}
                      initials={child.initials}
                      name={child.name}
                      size="md"
                      backgroundColor="#E0F7FA"
                    />
                    <div className="flex-1 text-left">
                      <p className="text-gray-900 mb-1" style={{ fontSize: '17px', fontWeight: 600 }}>
                        {child.name}
                      </p>
                      <p className="text-gray-600" style={{ fontSize: '14px' }}>
                        {child.age} years old
                      </p>
                    </div>
                    {selectedChild?.name === child.name && (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Ride Type */}
        {step === 2 && (
          <div>
            <div className="mb-5">
              <h2 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                What type of ride?
              </h2>
              <p className="text-gray-600" style={{ fontSize: '15px' }}>
                Choose pickup or dropoff
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setRideType('pickup');
                  setStep(3);
                }}
                className="w-full bg-white rounded-2xl p-6 shadow-md active:scale-95 transition-all border-2"
                style={{ borderColor: rideType === 'pickup' ? '#2F6F9F' : '#E5E7EB' }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#E0F7FA' }}
                  >
                    <MapPin className="w-6 h-6" style={{ color: '#2F6F9F' }} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-gray-900 mb-1" style={{ fontSize: '18px', fontWeight: 600 }}>
                      Pick Up
                    </h3>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      From home to school
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              </button>

              <button
                onClick={() => {
                  setRideType('dropoff');
                  setStep(3);
                }}
                className="w-full bg-white rounded-2xl p-6 shadow-md active:scale-95 transition-all border-2"
                style={{ borderColor: rideType === 'dropoff' ? '#2F6F9F' : '#E5E7EB' }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#E0F7FA' }}
                  >
                    <MapPin className="w-6 h-6" style={{ color: '#2F6F9F' }} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-gray-900 mb-1" style={{ fontSize: '18px', fontWeight: 600 }}>
                      Drop Off
                    </h3>
                    <p className="text-gray-600" style={{ fontSize: '14px' }}>
                      From school to home
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Select Date */}
        {step === 3 && (
          <div>
            <div className="mb-5">
              <h2 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                What day?
              </h2>
              <p className="text-gray-600" style={{ fontSize: '15px' }}>
                Choose the date
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <label className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                  Select Date
                </label>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                style={{ fontSize: '16px' }}
              />
            </div>

            {selectedDate && (
              <button
                onClick={() => setStep(4)}
                className="w-full rounded-xl py-4 shadow-md text-white active:scale-95 transition-all mt-5"
                style={{ 
                  background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                Continue
              </button>
            )}
          </div>
        )}

        {/* Step 4: Select School */}
        {step === 4 && (
          <div>
            <div className="mb-5">
              <h2 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                Which school?
              </h2>
              <p className="text-gray-600" style={{ fontSize: '15px' }}>
                Select the destination school
              </p>
            </div>

            <div className="space-y-3">
              {schoolSchedules.map((school) => (
                <button
                  key={school.name}
                  onClick={() => {
                    setSelectedSchool(school.name);
                    setStep(5);
                  }}
                  className="w-full bg-white rounded-2xl p-5 shadow-md active:scale-95 transition-all border-2"
                  style={{ borderColor: selectedSchool === school.name ? '#2F6F9F' : '#E5E7EB' }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#E0F7FA' }}
                    >
                      <School className="w-6 h-6" style={{ color: '#2F6F9F' }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-900 mb-1" style={{ fontSize: '17px', fontWeight: 600 }}>
                        {school.name}
                      </p>
                      <p className="text-gray-600" style={{ fontSize: '14px' }}>
                        {school.timeSlots.length} time slot{school.timeSlots.length !== 1 ? 's' : ''} available
                      </p>
                    </div>
                    {selectedSchool === school.name && (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Select Time */}
        {step === 5 && (() => {
          const schedule = rideType === 'pickup' ? pickupSchedules.find(s => s.name === selectedSchool) : dropoffSchedules.find(s => s.name === selectedSchool);

          return (
            <div>
              <div className="mb-5">
                <h2 className="text-gray-900 mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
                  Select Time Slot
                </h2>
                <p className="text-gray-600" style={{ fontSize: '15px' }}>
                  {selectedSchool}
                </p>
              </div>

              {schedule ? (
                <div className="space-y-3 mb-5">
                  {schedule.timeSlots.map((slot) => {
                    const isFull = slot.booked >= slot.maxCapacity;
                    const seatsLeft = slot.maxCapacity - slot.booked;

                    return (
                      <button
                        key={slot.time}
                        onClick={() => !isFull && setSelectedTime(slot.time)}
                        disabled={isFull}
                        className="w-full bg-white rounded-2xl p-5 shadow-md active:scale-95 transition-all border-2"
                        style={{ 
                          borderColor: selectedTime === slot.time ? '#2F6F9F' : '#E5E7EB',
                          opacity: isFull ? 0.5 : 1,
                          cursor: isFull ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: '#E0F7FA' }}
                            >
                              <Clock className="w-6 h-6" style={{ color: '#2F6F9F' }} />
                            </div>
                            <div className="text-left">
                              <p className="text-gray-900 mb-1" style={{ fontSize: '18px', fontWeight: 600 }}>
                                {slot.time}
                              </p>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-500" />
                                <p className="text-gray-600" style={{ fontSize: '14px' }}>
                                  {isFull ? 'Fully Booked' : `${seatsLeft} seat${seatsLeft !== 1 ? 's' : ''} available`}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {!isFull && (
                              <div 
                                className="px-3 py-2 rounded-lg"
                                style={{ 
                                  backgroundColor: seatsLeft <= 2 ? '#FEF3C7' : '#D1FAE5',
                                  border: `2px solid ${seatsLeft <= 2 ? '#F59E0B' : '#10B981'}`
                                }}
                              >
                                <p 
                                  style={{ 
                                    fontSize: '14px', 
                                    fontWeight: 700,
                                    color: seatsLeft <= 2 ? '#B45309' : '#047857'
                                  }}
                                >
                                  {seatsLeft}/{slot.maxCapacity}
                                </p>
                              </div>
                            )}

                            {selectedTime === slot.time && !isFull && (
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" strokeWidth={3} />
                              </div>
                            )}

                            {isFull && (
                              <div className="px-3 py-1 bg-red-100 rounded-full border-2 border-red-500">
                                <span className="text-red-700" style={{ fontSize: '12px', fontWeight: 600 }}>
                                  FULL
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-yellow-50 rounded-2xl p-5 border-2 border-yellow-200 mb-5">
                  <p className="text-yellow-800" style={{ fontSize: '15px' }}>
                    No scheduled times available for {selectedSchool}
                  </p>
                </div>
              )}

              {/* Review */}
              {selectedTime && (
                <>
                  <div className="bg-blue-50 rounded-2xl p-5 border-2" style={{ borderColor: '#E0F7FA' }}>
                    <h3 className="text-gray-900 mb-4" style={{ fontSize: '17px', fontWeight: 600 }}>
                      Review Your Booking
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600" style={{ fontSize: '14px' }}>Child</span>
                        <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                          {selectedChild?.name}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600" style={{ fontSize: '14px' }}>School</span>
                        <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                          {selectedSchool}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600" style={{ fontSize: '14px' }}>Ride Type</span>
                        <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                          {rideType === 'pickup' ? 'Pick Up' : 'Drop Off'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600" style={{ fontSize: '14px' }}>Date</span>
                        <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                          {selectedDate}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600" style={{ fontSize: '14px' }}>Time</span>
                        <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                          {selectedTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBookRide}
                    className="w-full rounded-xl py-5 shadow-lg text-white active:scale-95 transition-all mt-5"
                    style={{ 
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      fontSize: '17px',
                      fontWeight: 600
                    }}
                  >
                    Confirm Booking
                  </button>
                </>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}