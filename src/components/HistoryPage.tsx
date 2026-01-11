import { Calendar, MapPin, User, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

interface HistoryPageProps {
  onBack?: () => void;
}

export default function HistoryPage({ onBack }: HistoryPageProps) {
  const rideHistory = [
    {
      id: 1,
      child: 'Ciara Mitchell',
      date: '24 Nov 2025',
      time: '8:00 AM',
      type: 'Pickup',
      location: 'Wairoa Primary School',
      driver: 'Mike Kereama',
      status: 'completed',
      map: 'https://via.placeholder.com/800x400/3b82f6/ffffff?text=Map+View'
    },
    {
      id: 2,
      child: 'Johnny Whaanga',
      date: '24 Nov 2025',
      time: '3:30 PM',
      type: 'Drop-off',
      location: 'Wairoa Primary School',
      driver: 'Mike Kereama',
      status: 'completed',
      map: 'https://via.placeholder.com/800x400/3b82f6/ffffff?text=Map+View'
    },
    {
      id: 3,
      child: 'Ciara Mitchell',
      date: '23 Nov 2025',
      time: '8:00 AM',
      type: 'Pickup',
      location: 'Wairoa Primary School',
      driver: 'Mike Kereama',
      status: 'completed',
      map: 'https://via.placeholder.com/800x400/3b82f6/ffffff?text=Map+View'
    },
    {
      id: 4,
      child: 'Johnny Whaanga',
      date: '22 Nov 2025',
      time: '8:30 AM',
      type: 'Pickup',
      location: 'Wairoa Primary School',
      driver: 'Mike Kereama',
      status: 'completed',
      map: 'https://via.placeholder.com/800x400/3b82f6/ffffff?text=Map+View'
    }
  ];

  return (
    <div className="p-4 pb-24">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-100">
          <div className="mb-1" style={{ color: '#2F6F9F' }}>13</div>
          <p className="text-gray-600 text-xs">Completed</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-100">
          <div className="mb-1" style={{ color: '#5699D2' }}>2</div>
          <p className="text-gray-600 text-xs">Scheduled</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-100">
          <div className="text-red-600 mb-1">2</div>
          <p className="text-gray-600 text-xs">Cancelled</p>
        </div>
      </div>

      {/* Rides List */}
      <h3 className="text-gray-800 mb-3">Recent Rides</h3>
      <div className="space-y-3">
        {rideHistory.map((ride) => (
          <div key={ride.id} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-gray-800">{ride.child}</h4>
                  <p className="text-gray-600 text-sm">{ride.type}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                  ride.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {ride.status === 'completed' ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    Done
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3" />
                    Cancelled
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{ride.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{ride.time}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg text-xs">
              <div className="flex items-start gap-2 mb-1">
                <MapPin className="w-3 h-3 text-green-500 mt-0.5" />
                <p className="text-gray-700 flex-1">{ride.location}</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3 h-3 text-red-500 mt-0.5" />
                <p className="text-gray-700 flex-1">{ride.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}