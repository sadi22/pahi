import { Calendar, Clock, User, MapPin, Phone, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

interface DriverScheduleProps {
  onBack: () => void;
}

export default function DriverSchedule({ onBack }: DriverScheduleProps) {
  const todayRides = [
    {
      id: 1,
      time: '08:15 AM',
      childName: 'Emma Johnson',
      caregiverName: 'Sarah Johnson',
      caregiverPhone: '027 123 4567',
      pickup: '123 Main St, Wairoa',
      dropoff: 'Wairoa Primary School',
      status: 'completed'
    },
    {
      id: 2,
      time: '08:20 AM',
      childName: 'Liam Smith',
      caregiverName: 'Tom Smith',
      caregiverPhone: '027 234 5678',
      pickup: '45 Beach Rd, Wairoa',
      dropoff: 'Wairoa Primary School',
      status: 'in-progress'
    },
    {
      id: 3,
      time: '03:00 PM',
      childName: 'Olivia Brown',
      caregiverName: 'Jane Brown',
      caregiverPhone: '027 345 6789',
      pickup: 'Wairoa Primary School',
      dropoff: '78 Hill St, Wairoa',
      status: 'scheduled'
    },
    {
      id: 4,
      time: '03:15 PM',
      childName: 'Noah Williams',
      caregiverName: 'Tom Williams',
      caregiverPhone: '027 456 7890',
      pickup: 'Wairoa Primary School',
      dropoff: '22 River Rd, Wairoa',
      status: 'scheduled'
    }
  ];

  const tomorrowRides = [
    {
      id: 5,
      time: '08:00 AM',
      childName: 'Ava Davis',
      caregiverName: 'Mike Davis',
      caregiverPhone: '027 567 8901',
      pickup: '56 Park Ave, Wairoa',
      dropoff: 'Wairoa Primary School',
      status: 'scheduled'
    },
    {
      id: 6,
      time: '08:30 AM',
      childName: 'James Wilson',
      caregiverName: 'Lisa Wilson',
      caregiverPhone: '027 678 9012',
      pickup: '89 Coast Rd, Wairoa',
      dropoff: 'Wairoa Primary School',
      status: 'scheduled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const RideCard = ({ ride }: { ride: any }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-gray-900">{ride.time}</span>
        </div>
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${getStatusColor(ride.status)}`}>
          {getStatusIcon(ride.status)}
          {ride.status === 'completed' ? 'Completed' : ride.status === 'in-progress' ? 'In Progress' : 'Scheduled'}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 mt-0.5" style={{ color: '#2F6F9F' }} />
          <div className="flex-1">
            <p className="text-gray-900">{ride.childName}</p>
            <p className="text-gray-500 text-sm">{ride.caregiverName}</p>
          </div>
          <a href={`tel:${ride.caregiverPhone}`} className="p-2 bg-green-50 rounded-lg">
            <Phone className="w-4 h-4 text-green-600" />
          </a>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-gray-900 text-sm">{ride.pickup}</p>
            <p className="text-gray-500 text-xs">Pickup</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
          <div>
            <p className="text-gray-900 text-sm">{ride.dropoff}</p>
            <p className="text-gray-500 text-xs">Drop-off</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <p className="text-gray-900 mb-1">8</p>
          <p className="text-gray-500 text-xs">Today</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="w-10 h-10 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <p className="text-gray-900 mb-1">1</p>
          <p className="text-gray-500 text-xs">Done</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="w-10 h-10 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <p className="text-gray-900 mb-1">7</p>
          <p className="text-gray-500 text-xs">Upcoming</p>
        </div>
      </div>

      {/* Today's Schedule */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900">Today's Schedule</h3>
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
            {todayRides.length} rides
          </span>
        </div>
        <div className="space-y-3">
          {todayRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      </div>

      {/* Tomorrow's Schedule */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900">Tomorrow's Schedule</h3>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {tomorrowRides.length} rides
          </span>
        </div>
        <div className="space-y-3">
          {tomorrowRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-gray-900 mb-4">This Week</h3>
        <div className="space-y-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
            <div key={day} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${index < 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <p className="text-gray-900">{day}</p>
              </div>
              <p className="text-gray-600">{index === 0 ? '8 rides' : index === 1 ? '6 rides' : '7 rides'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}