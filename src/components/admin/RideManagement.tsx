import { useState, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';
import { 
  User, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Navigation, 
  Phone,
  Home,
  School
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import BusLocationPin from '../icons/BusLocationPin';
import wairoaMap from 'figma:asset/802c9fc80a14e644034d432bee88218b1476cba7.png';
import ConfirmDialog from '../ConfirmDialog';
import PageHeader from '../shared/PageHeader';

interface RideManagementProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
  initialRideId?: number | null;
  onRideSelected?: () => void;
}

export default function RideManagement({ onBack, onNavigate, onLogout, initialRideId, onRideSelected }: RideManagementProps) {
  // State for tabs and live tracking
  const [activeTab, setActiveTab] = useState<'live' | 'scheduled' | 'history'>(() => {
    // If initialRideId is provided, determine which tab it belongs to
    if (initialRideId) {
      // Ride IDs 1-2 are live rides, 3-5 are scheduled rides, 100+ are history
      if (initialRideId <= 2) return 'live';
      if (initialRideId <= 5) return 'scheduled';
      return 'history';
    }
    return 'live';
  });
  const [selectedRide, setSelectedRide] = useState<number | null>(initialRideId || null);
  const [driverPosition, setDriverPosition] = useState(65);
  const [liveRidesData, setLiveRidesData] = useState([
    {
      id: 1,
      childName: 'Ciara Mitchell',
      driverName: 'Mike Kereama',
      pickup: '123 Main St, Wairoa',
      dropoff: 'Wairoa Primary School',
      status: 'in-progress',
      startTime: '08:15 AM',
      estimatedArrival: '08:30 AM',
      progress: 65
    },
    {
      id: 2,
      childName: 'Johnny Whaanga',
      driverName: 'Mike Kereama',
      pickup: '45 Beach Rd, Wairoa',
      dropoff: 'Wairoa Primary School',
      status: 'picking-up',
      startTime: '08:20 AM',
      estimatedArrival: '08:35 AM',
      progress: 15
    }
  ]);

  const [scheduledRidesData, setScheduledRidesData] = useState([
    {
      id: 3,
      childName: 'Johnny Whaanga',
      caregiverName: 'Tom Whaanga',
      pickup: '45 Beach Rd, Wairoa',
      dropoff: 'Wairoa College',
      scheduledTime: '08:00 AM',
      driverAssigned: false
    },
    {
      id: 4,
      childName: 'Mercedez Smith',
      caregiverName: 'Rachel Smith',
      pickup: '89 River Road, Wairoa',
      dropoff: 'St Joseph\'s School',
      scheduledTime: '03:15 PM',
      driverAssigned: true,
      driverName: 'Mike Kereama'
    },
    {
      id: 5,
      childName: 'Blu Kahukura',
      caregiverName: 'Maria Kahukura',
      pickup: '78 Marine Parade, Wairoa',
      dropoff: 'Wairoa Primary School',
      scheduledTime: '08:10 AM',
      driverAssigned: false
    }
  ]);

  const [historyRides] = useState([
    {
      id: 101,
      childName: 'Ciara Mitchell',
      driverName: 'Mike Kereama',
      pickup: '123 Main St, Wairoa',
      dropoff: 'Wairoa Primary School',
      date: '27 Nov 2024',
      time: '08:15 AM',
      status: 'completed',
      duration: '15 min'
    },
    {
      id: 102,
      childName: 'Johnny Whaanga',
      driverName: 'Mike Kereama',
      pickup: '45 Beach Rd, Wairoa',
      dropoff: 'Wairoa Primary School',
      date: '27 Nov 2024',
      time: '08:20 AM',
      status: 'completed',
      duration: '12 min'
    },
    {
      id: 103,
      childName: 'Hine Brown',
      driverName: 'Mike Kereama',
      pickup: '78 Hill St, Wairoa',
      dropoff: 'Wairoa Primary School',
      date: '26 Nov 2024',
      time: '03:00 PM',
      status: 'completed',
      duration: '18 min'
    },
    {
      id: 104,
      childName: 'Tash Goldsmith',
      driverName: 'Mike Kereama',
      pickup: '56 Lake View, Wairoa',
      dropoff: 'Wairoa Primary School',
      date: '26 Nov 2024',
      time: '08:10 AM',
      status: 'completed',
      duration: '20 min'
    }
  ]);

  const [confirmCancel, setConfirmCancel] = useState<{ show: boolean; rideId: number; rideName: string }>({
    show: false,
    rideId: 0,
    rideName: ''
  });

  const handleCancelRide = (rideId: number, rideName: string) => {
    setConfirmCancel({ show: true, rideId, rideName });
  };

  const confirmCancelRide = () => {
    setLiveRidesData(prevRides => prevRides.filter(ride => ride.id !== confirmCancel.rideId));
    toast.success('Ride cancelled', { description: 'Caregiver has been notified' });
    setConfirmCancel({ show: false, rideId: 0, rideName: '' });
  };

  const handleAssignDriver = (rideId: number) => {
    setScheduledRidesData(prevRides =>
      prevRides.map(ride =>
        ride.id === rideId 
          ? { ...ride, driverAssigned: true, driverName: 'Mike Kereama' }
          : ride
      )
    );
    toast.success('Driver assigned', { description: 'Mike Kereama has been assigned to this ride' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-green-100 text-green-700';
      case 'picking-up':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'En Route';
      case 'picking-up':
        return 'Picking Up';
      case 'completed':
        return 'Completed';
      default:
        return 'Scheduled';
    }
  };

  // Simulate live tracking
  useEffect(() => {
    if (selectedRide && driverPosition < 100) {
      const timer = setInterval(() => {
        setDriverPosition((prev) => Math.min(prev + 1, 100));
      }, [1000]);
      return () => clearInterval(timer);
    }
  }, [selectedRide, driverPosition]);

  // Clear initialRideId after initial render
  useEffect(() => {
    if (initialRideId && onRideSelected) {
      onRideSelected();
    }
  }, [initialRideId, onRideSelected]);

  return (
    <div className="h-screen bg-gray-50 pb-20 overflow-y-auto">
      {/* Header */}
      <PageHeader
        title="Ride Management"
        subtitle="Monitor and manage all rides"
        onBack={onBack}
      />

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-2">
          {['live', 'scheduled', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={activeTab === tab ? { background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' } : {}}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'live' && (
                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white rounded-full text-xs">
                  {liveRidesData.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Live Rides */}
      {activeTab === 'live' && (
        <div className="px-6 py-4 space-y-4">
          {/* Live Map View */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="relative" style={{ height: '240px' }}>
              {/* Wairoa Map Background */}
              <ImageWithFallback 
                src={wairoaMap}
                alt="Wairoa Map"
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              {/* Map Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                  <p className="text-gray-900 font-semibold text-sm">Live Tracking - Wairoa</p>
                  <p className="text-gray-500 text-xs">{liveRidesData.length} active rides</p>
                </div>
                <div className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Live
                </div>
              </div>

              {/* Active Ride Markers */}
              <div className="absolute inset-0 flex items-center justify-center gap-8">
                {/* Pickup Location - Home (Blue) */}
                <div className="relative">
                  <div className="w-9 h-9 bg-blue-600 rounded-full shadow-lg flex items-center justify-center border-3 border-white">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white px-2 py-0.5 rounded text-xs whitespace-nowrap font-semibold">
                    Home
                  </div>
                </div>

                {/* Driver Position */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center border-4 border-white animate-pulse" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
                    <Navigation className="w-6 h-6 text-white" style={{ transform: 'rotate(45deg)' }} />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Mike K.
                  </div>
                </div>

                {/* Drop-off Location - School (Red) */}
                <div className="relative">
                  <div className="w-9 h-9 bg-red-600 rounded-full shadow-lg flex items-center justify-center border-3 border-white">
                    <School className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-2 py-0.5 rounded text-xs whitespace-nowrap font-semibold">
                    School
                  </div>
                </div>
              </div>

              {/* Landmark Markers - Fixed Locations */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Wairoa Tennis Club */}
                <div className="absolute" style={{ left: '30%', bottom: '25%' }}>
                  <div className="w-2 h-2 bg-orange-500 rounded-full border border-white shadow-sm"></div>
                </div>
                
                {/* Wairoa Business Hub */}
                <div className="absolute" style={{ left: '55%', bottom: '35%' }}>
                  <div className="w-2 h-2 bg-teal-600 rounded-full border border-white shadow-sm"></div>
                </div>

                {/* Wairoa Primary School */}
                <div className="absolute" style={{ left: '40%', bottom: '30%' }}>
                  <div className="w-2 h-2 bg-blue-600 rounded-full border border-white shadow-sm"></div>
                </div>

                {/* Wairoa College */}
                <div className="absolute" style={{ left: '20%', top: '15%' }}>
                  <div className="w-2 h-2 bg-purple-600 rounded-full border border-white shadow-sm"></div>
                </div>

                {/* St Joseph's School */}
                <div className="absolute" style={{ left: '55%', top: '30%' }}>
                  <div className="w-2 h-2 bg-rose-600 rounded-full border border-white shadow-sm"></div>
                </div>

                {/* Te Kura Kaupapa Māori */}
                <div className="absolute" style={{ left: '60%', bottom: '10%' }}>
                  <div className="w-2 h-2 bg-emerald-600 rounded-full border border-white shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {liveRidesData.map((ride) => (
            <div key={ride.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(ride.status)}`}>
                  {getStatusText(ride.status)}
                </span>
                <span className="text-gray-500 text-sm">{ride.startTime}</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{ride.driverName}</p>
                    <p className="text-gray-500 text-sm">Driver</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 mt-0.5" style={{ color: '#2F6F9F' }} />
                  <div>
                    <p className="text-gray-900">{ride.childName}</p>
                    <p className="text-gray-500 text-sm">Student</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5" style={{ color: '#2F6F9F' }} />
                  <div>
                    <p className="text-gray-900 text-sm">{ride.pickup}</p>
                    <p className="text-gray-500 text-xs">Pickup Location</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5" style={{ color: '#5699D2' }} />
                  <div>
                    <p className="text-gray-900 text-sm">{ride.dropoff}</p>
                    <p className="text-gray-500 text-xs">Drop-off Location</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{ride.estimatedArrival}</p>
                    <p className="text-gray-500 text-sm">Estimated Arrival</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900">{ride.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${ride.progress}%`, background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedRide(ride.id);
                    setDriverPosition(ride.progress);
                    if (onNavigate) {
                      onNavigate('admin-track');
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 text-white py-2.5 rounded-lg active:scale-[0.98] transition-all" 
                  style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
                >
                  <Navigation className="w-4 h-4" />
                  Track Live
                </button>
                <button 
                  onClick={() => handleCancelRide(ride.id, ride.childName)}
                  className="px-4 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 flex items-center justify-center active:scale-[0.98] transition-all"
                  title="Cancel Ride"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scheduled Rides */}
      {activeTab === 'scheduled' && (
        <div className="px-6 py-4 space-y-4">
          {scheduledRidesData.map((ride) => (
            <div key={ride.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  Scheduled
                </span>
                <span className="text-gray-900">{ride.scheduledTime}</span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 mt-0.5" style={{ color: '#2F6F9F' }} />
                  <div>
                    <p className="text-gray-900">{ride.childName}</p>
                    <p className="text-gray-500 text-sm">Student</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{ride.caregiverName}</p>
                    <p className="text-gray-500 text-sm">Caregiver</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5" style={{ color: '#2F6F9F' }} />
                  <div>
                    <p className="text-gray-900 text-sm">{ride.pickup}</p>
                    <p className="text-gray-500 text-xs">→ {ride.dropoff}</p>
                  </div>
                </div>

                {ride.driverAssigned ? (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-green-900 text-sm">Driver Assigned</p>
                      <p className="text-green-700 text-xs">{ride.driverName}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <p className="text-yellow-900 text-sm">No driver assigned yet</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!ride.driverAssigned && (
                  <button 
                    onClick={() => handleAssignDriver(ride.id)}
                    className="flex-1 text-white py-2.5 rounded-lg active:scale-[0.98] transition-all" 
                    style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
                  >
                    Assign Driver
                  </button>
                )}
                <button 
                  onClick={() => {
                    setConfirmCancel({ show: true, rideId: ride.id, rideName: ride.childName });
                  }}
                  className="px-4 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 flex items-center justify-center active:scale-[0.98] transition-all"
                  title="Cancel Ride"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History */}
      {activeTab === 'history' && (
        <div className="px-6 py-4 space-y-4">
          {historyRides.map((ride) => (
            <div key={ride.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Completed
                </span>
                <span className="text-gray-500 text-sm">{ride.date}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 mt-0.5" style={{ color: '#2F6F9F' }} />
                  <div>
                    <p className="text-gray-900">{ride.childName}</p>
                    <p className="text-gray-500 text-sm">Student</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{ride.driverName}</p>
                    <p className="text-gray-500 text-sm">Driver</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5" style={{ color: '#2F6F9F' }} />
                  <div>
                    <p className="text-gray-900 text-sm">{ride.pickup}</p>
                    <p className="text-gray-500 text-xs">→ {ride.dropoff}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-gray-500 text-xs">Time</p>
                      <p className="text-gray-900 text-sm">{ride.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-gray-500 text-xs">Duration</p>
                      <p className="text-gray-900 text-sm">{ride.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}