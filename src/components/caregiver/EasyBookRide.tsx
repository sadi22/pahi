import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Check } from 'lucide-react';

interface EasyBookRideProps {
  onNavigate: (page: string) => void;
  onRideBooked?: (rideData: any) => void;
}

export default function EasyBookRide({ onNavigate, onRideBooked }: EasyBookRideProps) {
  const [step, setStep] = useState(1);
  const [selectedChild, setSelectedChild] = useState('');
  const [rideType, setRideType] = useState<'pickup' | 'dropoff'>('pickup');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const children = [
    { name: 'Ciara Mitchell', emoji: '🐻', status: 'approved' },
    { name: 'Johnny Whaanga', emoji: '🦁', status: 'pending' },
  ];

  const handleBookRide = () => {
    if (onRideBooked) {
      onRideBooked({
        childName: selectedChild,
        rideType,
        date: selectedDate,
        time: selectedTime
      });
    }
    
    toast.success('✅ Ride Booked!', { 
      description: `Ride for ${selectedChild} on ${selectedDate}`,
      duration: 5000
    });
    
    // Reset and go home
    setStep(1);
    setSelectedChild('');
    setRideType('pickup');
    setSelectedDate('');
    setSelectedTime('');
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-32">
      {/* Header */}
      <div className="px-6 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <button
          onClick={() => step === 1 ? onNavigate('home') : setStep(step - 1)}
          className="flex items-center gap-3 text-white mb-6 text-xl active:scale-95 transition-all p-3 bg-white/20 rounded-2xl"
        >
          <ArrowLeft className="w-8 h-8" />
          <span className="font-bold">Back</span>
        </button>

        <div className="text-7xl mb-4 text-center">🚗</div>
        <h1 className="text-white text-4xl font-bold text-center mb-2">Book a Ride</h1>
        <p className="text-white text-2xl text-center">Step {step} of 4</p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-3 py-6 px-6">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className="rounded-full transition-all"
            style={{
              width: step === s ? '48px' : '20px',
              height: '20px',
              backgroundColor: step >= s ? '#2F6F9F' : '#D1D5DB'
            }}
          />
        ))}
      </div>

      <div className="px-6 py-4">
        {/* Step 1: Select Child */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">👶</div>
              <h2 className="text-gray-900 text-3xl font-bold mb-2">Who needs a ride?</h2>
              <p className="text-gray-600 text-xl">Choose your child</p>
            </div>

            {children.filter(c => c.status === 'approved').length > 0 ? (
              children.filter(c => c.status === 'approved').map((child) => (
                <button
                  key={child.name}
                  onClick={() => {
                    setSelectedChild(child.name);
                    setStep(2);
                  }}
                  className="w-full bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200 hover:border-blue-500 active:scale-95 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-7xl">{child.emoji}</div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-900 text-3xl font-bold">{child.name}</p>
                    </div>
                    {selectedChild === child.name && (
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-8 h-8 text-white" strokeWidth={4} />
                      </div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center shadow-xl border-4 border-gray-200">
                <div className="text-6xl mb-4">⏳</div>
                <h3 className="text-gray-900 text-2xl font-bold mb-3">No Approved Children</h3>
                <p className="text-gray-600 text-xl mb-6">
                  {children.filter(c => c.status === 'pending').length > 0 
                    ? 'Your children are waiting for admin approval. You\'ll be able to book rides once approved.'
                    : 'Add a child to start booking rides.'}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('children')}
                  className="px-8 py-4 rounded-2xl text-white text-xl font-bold active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
                >
                  Manage Children
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Ride Type */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">🚗</div>
              <h2 className="text-gray-900 text-3xl font-bold mb-2">What type of ride?</h2>
              <p className="text-gray-600 text-xl">Choose pickup or dropoff</p>
            </div>

            <button
              onClick={() => {
                setRideType('pickup');
                setStep(3);
              }}
              className="w-full rounded-3xl p-8 shadow-xl border-4 active:scale-95 transition-all"
              style={{
                backgroundColor: rideType === 'pickup' ? '#E0F7FA' : 'white',
                borderColor: rideType === 'pickup' ? '#2F6F9F' : '#E5E7EB'
              }}
            >
              <div className="text-7xl mb-4">🏠 ➡️ 🏫</div>
              <h3 className="text-gray-900 text-3xl font-bold mb-2">Pick Up</h3>
              <p className="text-gray-600 text-xl">From home to school</p>
            </button>

            <button
              onClick={() => {
                setRideType('dropoff');
                setStep(3);
              }}
              className="w-full rounded-3xl p-8 shadow-xl border-4 active:scale-95 transition-all"
              style={{
                backgroundColor: rideType === 'dropoff' ? '#E0F7FA' : 'white',
                borderColor: rideType === 'dropoff' ? '#2F6F9F' : '#E5E7EB'
              }}
            >
              <div className="text-7xl mb-4">🏫 ➡️ 🏠</div>
              <h3 className="text-gray-900 text-3xl font-bold mb-2">Drop Off</h3>
              <p className="text-gray-600 text-xl">From school to home</p>
            </button>
          </div>
        )}

        {/* Step 3: Select Date */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">📅</div>
              <h2 className="text-gray-900 text-3xl font-bold mb-2">What day?</h2>
              <p className="text-gray-600 text-xl">Choose the date</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-gray-200">
              <label className="block text-gray-900 text-2xl font-bold mb-4">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-6 py-6 border-4 border-gray-300 rounded-2xl text-2xl focus:outline-none focus:border-blue-500"
                style={{ fontSize: '24px' }}
              />
            </div>

            {selectedDate && (
              <button
                onClick={() => setStep(4)}
                className="w-full rounded-2xl p-6 shadow-xl text-white text-2xl font-bold active:scale-95 transition-all"
                style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
              >
                Continue ➡️
              </button>
            )}
          </div>
        )}

        {/* Step 4: Select Time */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4">🕐</div>
              <h2 className="text-gray-900 text-3xl font-bold mb-2">What time?</h2>
              <p className="text-gray-600 text-xl">
                {rideType === 'pickup' ? 'Choose morning pickup time' : 'Choose afternoon drop-off time'}
              </p>
            </div>

            {/* Quick Time Buttons */}
            {rideType === 'pickup' ? (
              <div className="space-y-4">
                <p className="text-gray-700 text-xl font-semibold text-center">Morning Times</p>
                {['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className="w-full bg-white rounded-3xl p-6 shadow-xl border-4 active:scale-95 transition-all"
                    style={{
                      backgroundColor: selectedTime === time ? '#E0F7FA' : 'white',
                      borderColor: selectedTime === time ? '#2F6F9F' : '#E5E7EB'
                    }}
                  >
                    <p className="text-gray-900 text-3xl font-bold">{time}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-700 text-xl font-semibold text-center">Afternoon Times</p>
                {['2:50 PM', '3:00 PM', '3:10 PM', '3:20 PM', '3:30 PM', '3:40 PM', '3:50 PM', '4:00 PM'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className="w-full bg-white rounded-3xl p-6 shadow-xl border-4 active:scale-95 transition-all"
                    style={{
                      backgroundColor: selectedTime === time ? '#E0F7FA' : 'white',
                      borderColor: selectedTime === time ? '#2F6F9F' : '#E5E7EB'
                    }}
                  >
                    <p className="text-gray-900 text-3xl font-bold">{time}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Review */}
            {selectedTime && (
              <>
                <div className="bg-blue-50 rounded-3xl p-8 border-4 border-blue-200">
                  <h3 className="text-gray-900 text-2xl font-bold mb-6 text-center">Review Your Booking</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-5">
                      <p className="text-gray-600 text-lg mb-1">Child</p>
                      <p className="text-gray-900 text-2xl font-bold">{selectedChild}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-5">
                      <p className="text-gray-600 text-lg mb-1">Ride Type</p>
                      <p className="text-gray-900 text-2xl font-bold">
                        {rideType === 'pickup' ? '🏠 ➡️ 🏫 Pick Up' : '🏫 ➡️ 🏠 Drop Off'}
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-5">
                      <p className="text-gray-600 text-lg mb-1">Date</p>
                      <p className="text-gray-900 text-2xl font-bold">{selectedDate}</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-5">
                      <p className="text-gray-600 text-lg mb-1">Time</p>
                      <p className="text-gray-900 text-2xl font-bold">{selectedTime}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBookRide}
                  className="w-full rounded-3xl p-8 shadow-2xl text-white text-3xl font-bold active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                >
                  ✅ Confirm Booking
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}