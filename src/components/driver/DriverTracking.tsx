import { useState, useEffect } from 'react';
import { MapPin, Navigation, User, Clock, Phone, CheckCircle, Play, Pause, ArrowLeft, Bus } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import BusLocationPin from '../icons/BusLocationPin';
import wairoaMap from 'figma:asset/802c9fc80a14e644034d432bee88218b1476cba7.png';

interface DriverTrackingProps {
  onBack: () => void;
}

export default function DriverTracking({ onBack }: DriverTrackingProps) {
  const [activeRide, setActiveRide] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  const upcomingRides = [
    {
      id: 1,
      childName: 'Emma Johnson',
      caregiverName: 'Sarah Johnson',
      caregiverPhone: '027 123 4567',
      pickup: '123 Main St, Wairoa',
      dropoff: 'Wairoa Primary School',
      scheduledTime: '08:15 AM',
      status: 'pending'
    },
    {
      id: 2,
      childName: 'Liam Smith',
      caregiverName: 'Tom Smith',
      caregiverPhone: '027 234 5678',
      pickup: '45 Beach Rd, Wairoa',
      dropoff: 'Wairoa Primary School',
      scheduledTime: '08:20 AM',
      status: 'pending'
    }
  ];

  useEffect(() => {
    let interval: any;
    if (isTracking && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 100));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isTracking, progress]);

  const startRide = (ride: any) => {
    setActiveRide(ride);
    setProgress(0);
    setIsTracking(true);
  };

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  const completeRide = () => {
    setActiveRide(null);
    setProgress(0);
    setIsTracking(false);
  };

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <div className="px-4 pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Live Map */}
      <div className="bg-white shadow-sm">
        <div className="relative" style={{ height: '350px' }}>
          {/* Wairoa Map Background */}
          <ImageWithFallback 
            src={wairoaMap}
            alt="Wairoa Map"
            className="absolute inset-0 w-full h-full"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(1.5)',
              transformOrigin: 'center center'
            }}
          />

          {/* Map Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
              <p className="text-gray-900">Live Tracking - Wairoa</p>
            </div>
            {isTracking && (
              <div className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Tracking
              </div>
            )}
          </div>

          {/* Route Visualization */}
          {activeRide && (
            <>
              {/* Pickup Location */}
              <div 
                className="absolute w-10 h-10 bg-blue-500 rounded-full shadow-lg flex items-center justify-center border-3 border-white"
                style={{ top: '25%', left: '30%' }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div 
                className="absolute bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                style={{ top: '32%', left: '30%', transform: 'translateX(-50%)' }}
              >
                Pickup
              </div>

              {/* Dropoff Location */}
              <div 
                className="absolute w-10 h-10 bg-emerald-500 rounded-full shadow-lg flex items-center justify-center border-3 border-white"
                style={{ top: '65%', right: '25%' }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div 
                className="absolute bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                style={{ top: '72%', right: '25%', transform: 'translateX(50%)' }}
              >
                School
              </div>

              {/* Driver Position (animated) */}
              <div 
                className="absolute transition-all duration-300"
                style={{ 
                  top: `${25 + (progress / 100) * 40}%`,
                  left: `${30 + (progress / 100) * 35}%`
                }}
              >
                <BusLocationPin className="w-14 h-14 drop-shadow-xl" />
              </div>
            </>
          )}

          {!activeRide && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-900 mb-1">No Active Ride</p>
                <p className="text-gray-500 text-sm">Start a ride to begin tracking</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Ride Details */}
      {activeRide && (
        <div className="mx-4 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Current Ride</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              In Progress
            </span>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 mt-0.5" style={{ color: '#2F6F9F' }} />
              <div className="flex-1">
                <p className="text-gray-900">{activeRide.childName}</p>
                <p className="text-gray-500 text-sm">{activeRide.caregiverName}</p>
              </div>
              <a href={`tel:${activeRide.caregiverPhone}`} className="p-2 bg-green-50 rounded-lg">
                <Phone className="w-4 h-4 text-green-600" />
              </a>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-gray-900 text-sm">{activeRide.pickup}</p>
                <p className="text-gray-500 text-xs">Pickup Location</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
              <div>
                <p className="text-gray-900 text-sm">{activeRide.dropoff}</p>
                <p className="text-gray-500 text-xs">Drop-off Location</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-900">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all"
                style={{ 
                  width: `${progress}%`, 
                  background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' 
                }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={toggleTracking}
              className="flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg"
              style={{ background: isTracking ? 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' : 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
            >
              {isTracking ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Resume
                </>
              )}
            </button>
            {progress === 100 && (
              <button
                onClick={completeRide}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg"
              >
                <CheckCircle className="w-4 h-4" />
                Complete
              </button>
            )}
          </div>
        </div>
      )}

      {/* Upcoming Rides */}
      <div className="px-4">
        <h3 className="text-gray-900 mb-3">Upcoming Rides</h3>
        <div className="space-y-3">
          {upcomingRides.map((ride) => (
            <div key={ride.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{ride.scheduledTime}</span>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  Scheduled
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: '#2F6F9F' }} />
                  <p className="text-gray-900">{ride.childName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-600 text-sm">{ride.pickup}</p>
                </div>
              </div>

              <button
                onClick={() => startRide(ride)}
                disabled={activeRide !== null}
                className={`w-full py-2.5 rounded-lg ${
                  activeRide !== null
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'text-white'
                }`}
                style={activeRide === null ? { background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' } : {}}
              >
                Start Ride
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}