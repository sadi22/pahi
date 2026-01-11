import { useState } from 'react';
import { Clock, CheckCircle, XCircle, MapPin, User, ArrowLeft, ChevronRight } from 'lucide-react';
import RideDetailModal from './RideDetailModal';

interface HistoryFeedbackPageProps {
  onNavigate: (page: string) => void;
}

export default function HistoryFeedbackPage({ onNavigate }: HistoryFeedbackPageProps) {
  const [selectedRide, setSelectedRide] = useState<any>(null);

  const ridesHistory = [
    {
      id: 1,
      childName: 'Ciara Mitchell',
      date: '9 Dec 2024',
      time: '7:30 AM',
      pickupTime: '7:35 AM',
      dropoffTime: '8:15 AM',
      completedTime: '8:15 AM',
      driverName: 'Mike Kereama',
      status: 'completed',
      rating: 5,
      type: 'Pickup' as const,
      from: '123 Main St, Wairoa',
      to: 'Wairoa Primary School',
      driver: 'Mike Kereama',
      fromCoords: { x: 0.15, y: 0.70 },
      toCoords: { x: 0.58, y: 0.49 }
    },
    {
      id: 2,
      childName: 'Ciara Mitchell',
      date: '9 Dec 2024',
      time: '2:45 PM',
      pickupTime: '3:00 PM',
      dropoffTime: '3:35 PM',
      completedTime: '3:35 PM',
      driverName: 'Mike Kereama',
      status: 'completed',
      rating: 5,
      type: 'Dropoff' as const,
      from: 'Wairoa Primary School',
      to: '123 Main St, Wairoa',
      driver: 'Mike Kereama',
      fromCoords: { x: 0.58, y: 0.49 },
      toCoords: { x: 0.15, y: 0.70 }
    },
    {
      id: 3,
      childName: 'Johnny Whaanga',
      date: '8 Dec 2024',
      time: '7:30 AM',
      pickupTime: '7:32 AM',
      dropoffTime: '8:10 AM',
      completedTime: '8:10 AM',
      driverName: 'Mike Kereama',
      status: 'completed',
      rating: 5,
      type: 'Pickup' as const,
      from: '45 Beach Rd, Wairoa',
      to: 'Wairoa College',
      driver: 'Mike Kereama',
      fromCoords: { x: 0.22, y: 0.62 },
      toCoords: { x: 0.15, y: 0.40 }
    },
    {
      id: 4,
      childName: 'Johnny Whaanga',
      date: '8 Dec 2024',
      time: '2:45 PM',
      pickupTime: '3:05 PM',
      dropoffTime: '3:42 PM',
      completedTime: '3:42 PM',
      driverName: 'Mike Kereama',
      status: 'completed',
      rating: 5,
      type: 'Dropoff' as const,
      from: 'Wairoa College',
      to: '45 Beach Rd, Wairoa',
      driver: 'Mike Kereama',
      fromCoords: { x: 0.15, y: 0.40 },
      toCoords: { x: 0.22, y: 0.62 }
    },
    {
      id: 5,
      childName: 'Blu Kahukura',
      date: '6 Dec 2024',
      time: '7:30 AM',
      pickupTime: '7:38 AM',
      dropoffTime: '8:18 AM',
      completedTime: '8:18 AM',
      driverName: 'Mike Kereama',
      status: 'completed',
      rating: 5,
      type: 'Pickup' as const,
      from: '78 Hill St, Wairoa',
      to: 'St Joseph\'s School',
      driver: 'Mike Kereama',
      fromCoords: { x: 0.28, y: 0.55 },
      toCoords: { x: 0.55, y: 0.35 }
    },
    {
      id: 6,
      childName: 'Blu Kahukura',
      date: '6 Dec 2024',
      time: '2:45 PM',
      pickupTime: '3:10 PM',
      dropoffTime: '3:48 PM',
      completedTime: '3:48 PM',
      driverName: 'Mike Kereama',
      status: 'completed',
      rating: 5,
      type: 'Dropoff' as const,
      from: 'St Joseph\'s School',
      to: '78 Hill St, Wairoa',
      driver: 'Mike Kereama',
      fromCoords: { x: 0.55, y: 0.35 },
      toCoords: { x: 0.28, y: 0.55 }
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-white text-2xl mb-1">Ride History</h1>
            <p className="text-white/90">View past rides and trip details</p>
          </div>
        </div>
      </div>

      {/* History Content */}
      <div className="px-6 py-6 space-y-4">
        {/* Helpful Hint */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2F6F9F' }}>
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm" style={{ color: '#2F6F9F', fontWeight: 600 }}>
              Tap any completed ride to view the route map and trip details
            </p>
          </div>
        </div>

        {ridesHistory.map((ride) => (
          <button
            key={ride.id}
            onClick={() => ride.status === 'completed' && setSelectedRide(ride)}
            className="w-full bg-white rounded-xl p-5 shadow-sm text-left active:scale-[0.98] transition-all"
            style={{ cursor: ride.status === 'completed' ? 'pointer' : 'default' }}
          >
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
              {ride.status === 'completed' ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm flex items-center gap-1 font-medium">
                  <XCircle className="w-4 h-4" />
                  Cancelled
                </span>
              )}
              <span className="text-gray-500 text-sm">{ride.date}</span>
            </div>

            {/* Child Info */}
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5" style={{ color: '#2F6F9F' }} />
              <span className="text-gray-900 font-medium">{ride.childName}</span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">{ride.type}</span>
            </div>

            {/* Route */}
            <div className="space-y-2 mb-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">From</p>
                  <p className="text-sm text-gray-900">{ride.from}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">To</p>
                  <p className="text-sm text-gray-900">{ride.to}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {ride.time}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Driver: {ride.driver}
                </span>
                {ride.status === 'completed' && (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          </button>
        ))}

        {ridesHistory.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No ride history yet</p>
            <button
              onClick={() => onNavigate('rides')}
              className="mt-4 px-6 py-2 text-white rounded-lg active:scale-[0.98] transition-all"
              style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
            >
              Book Your First Ride
            </button>
          </div>
        )}
      </div>

      {/* Ride Detail Modal */}
      {selectedRide && (
        <RideDetailModal
          ride={selectedRide}
          onClose={() => setSelectedRide(null)}
        />
      )}
    </div>
  );
}