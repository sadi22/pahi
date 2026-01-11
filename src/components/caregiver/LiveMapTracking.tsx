import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Navigation, AlertCircle, CheckCircle, MapPin, Home as HomeIcon, Car } from 'lucide-react';
import wairoaMap from 'figma:asset/802c9fc80a14e644034d432bee88218b1476cba7.png';

interface LiveMapTrackingProps {
  onNavigate: (page: string) => void;
  activeRide?: any;
}

// Real Wairoa locations based on the actual map - LONGER ROUTE
const WAIROA_LOCATIONS = {
  pickup: {
    name: 'Te Reinga Falls Rd',
    coords: { lat: -39.0510, lng: 177.3750 },
    position: { x: 22, y: 35 } // Far western area
  },
  dropoff: {
    name: 'Wairoa Primary School',
    coords: { lat: -39.0342, lng: 177.3972 },
    position: { x: 68, y: 52 } // Eastern side - school location
  },
  // Route waypoints through actual Wairoa - extended journey
  route: [
    { name: 'Te Reinga Falls Rd', x: 22, y: 35 },
    { name: 'Whakarau Road', x: 28, y: 38 },
    { name: 'State Highway 2', x: 35, y: 42 },
    { name: 'Frasertown', x: 40, y: 45 },
    { name: 'Bridge Approach', x: 43, y: 48 },
    { name: 'Wairoa River Bridge', x: 46, y: 50 },
    { name: 'Marine Parade', x: 50, y: 51 },
    { name: 'North Clyde', x: 54, y: 51 },
    { name: 'McLean Street', x: 58, y: 51 },
    { name: 'Queen Street', x: 62, y: 51.5 },
    { name: 'Carroll Street', x: 65, y: 52 },
    { name: 'School Zone', x: 68, y: 52 }
  ]
};

export default function LiveMapTracking({ onNavigate, activeRide }: LiveMapTrackingProps) {
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('Starting ride...');
  const [driverPosition, setDriverPosition] = useState(WAIROA_LOCATIONS.pickup.position);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [currentStreet, setCurrentStreet] = useState('Main Street');
  const [etaMinutes, setEtaMinutes] = useState(38);
  const [distanceKm, setDistanceKm] = useState(11.2);

  // Simulate live tracking - slower for longer distance
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.5; // Slower progression for longer ride
      });
    }, 400); // Slower interval

    return () => clearInterval(interval);
  }, []);

  // Update driver position, ETA, and distance based on progress
  useEffect(() => {
    const routeIndex = Math.floor((progress / 100) * (WAIROA_LOCATIONS.route.length - 1));
    const currentWaypoint = WAIROA_LOCATIONS.route[routeIndex];
    
    if (currentWaypoint) {
      setDriverPosition({ x: currentWaypoint.x, y: currentWaypoint.y });
      setCurrentStreet(currentWaypoint.name);
    }

    // Update ETA and distance - longer journey
    setEtaMinutes(Math.ceil(38 * (1 - progress / 100)));
    setDistanceKm(parseFloat((11.2 * (1 - progress / 100)).toFixed(1)));

    // Update status
    if (progress < 5) {
      setCurrentStatus('Driver heading to pickup location...');
    } else if (progress < 10) {
      setCurrentStatus('Arriving at pickup point');
    } else if (progress < 15) {
      setCurrentStatus('Child picked up safely - starting journey');
    } else if (progress < 30) {
      setCurrentStatus(`Traveling on ${currentStreet}`);
    } else if (progress < 50) {
      setCurrentStatus(`Crossing Wairoa River Bridge`);
    } else if (progress < 85) {
      setCurrentStatus(`En route through ${currentStreet}`);
    } else if (progress < 98) {
      setCurrentStatus('Approaching Wairoa Primary School');
    } else if (progress >= 100) {
      setCurrentStatus('Arrived safely at school!');
      setPulseAnimation(false);
      setEtaMinutes(0);
      setDistanceKm(0);
    }
  }, [progress, currentStreet]);

  const childName = activeRide?.childName || 'Emma Johnson';
  const isOnTime = etaMinutes <= 38;

  return (
    <div className="min-h-screen pb-28 bg-gray-100">
      {/* Compact Header */}
      <div className="px-4 pt-4 pb-3" style={{ background: 'linear-gradient(135deg, #5089b8 0%, #4a8ab8 100%)' }}>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Tracking in</span>
          </button>
          <div className="text-right">
            <p className="text-white" style={{ fontSize: '13px', fontWeight: 500 }}>
              {distanceKm.toFixed(1)} km away
            </p>
            <p 
              className="text-xs font-medium mt-0.5" 
              style={{ color: isOnTime ? '#86efac' : '#fbbf24' }}
            >
              {progress >= 100 ? 'Arrived' : 'On time'}
            </p>
          </div>
        </div>
        <h1 className="text-white" style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1 }}>
          {etaMinutes} min
        </h1>
      </div>

      {/* Map Container */}
      <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden shadow-xl border border-gray-300" style={{ height: '480px' }}>
        {/* Actual Wairoa Map Image */}
        <img 
          src={wairoaMap} 
          alt="Wairoa Map" 
          className="absolute inset-0 w-full h-full"
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.5)',
            transformOrigin: 'center center',
            zIndex: 1 
          }}
        />

        {/* Route Path - dotted/dashed style */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
          <path
            d={`M ${WAIROA_LOCATIONS.route.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x}% ${p.y}%`).join(' ')}`}
            stroke="#ec4899"
            strokeWidth="4"
            strokeDasharray="8,6"
            fill="none"
            opacity="0.9"
          />
        </svg>

        {/* Pickup Location - Home */}
        <div 
          className="absolute z-20"
          style={{ 
            left: `${WAIROA_LOCATIONS.pickup.position.x}%`, 
            top: `${WAIROA_LOCATIONS.pickup.position.y}%`, 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          {/* Pin marker */}
          <div className="relative">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-4 border-white"
              style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
            >
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
            {progress > 12 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white" 
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }} />
            )}
          </div>
          
          {/* Address label */}
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-lg border-2"
              style={{ borderColor: '#2F6F9F' }}>
              <p className="font-bold" style={{ fontSize: '11px', color: '#2F6F9F' }}>
                {WAIROA_LOCATIONS.pickup.name}
              </p>
            </div>
          </div>
        </div>

        {/* Dropoff Location - School */}
        <div 
          className="absolute z-20"
          style={{ 
            left: `${WAIROA_LOCATIONS.dropoff.position.x}%`, 
            top: `${WAIROA_LOCATIONS.dropoff.position.y}%`, 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          {/* Pin marker */}
          <div className="relative">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-4 border-white"
              style={{ background: 'linear-gradient(135deg, #5699D2 0%, #2F6F9F 100%)' }}
            >
              <MapPin className="w-6 h-6 text-white" fill="white" />
            </div>
          </div>
          
          {/* School label */}
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-lg border-2"
              style={{ borderColor: '#5699D2' }}>
              <p className="font-bold" style={{ fontSize: '11px', color: '#2F6F9F' }}>
                {WAIROA_LOCATIONS.dropoff.name}
              </p>
            </div>
          </div>
        </div>

        {/* Driver/Vehicle Position - Moving with time badge */}
        <div 
          className="absolute transition-all duration-500 ease-linear z-30"
          style={{ 
            left: `${driverPosition.x}%`, 
            top: `${driverPosition.y}%`, 
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Pulse effect */}
          {pulseAnimation && (
            <>
              <div 
                className="absolute inset-0 rounded-full animate-ping"
                style={{ 
                  backgroundColor: '#3b82f6',
                  opacity: 0.4,
                  width: '60px',
                  height: '60px',
                  left: '-14px',
                  top: '-14px'
                }}
              />
            </>
          )}
          
          {/* Driver bubble with time */}
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
              style={{ backgroundColor: progress >= 100 ? '#10b981' : '#3b82f6' }}
            >
              <Car className="w-7 h-7 text-white" />
            </div>
            
            {/* Time badge */}
            {progress < 100 && (
              <div 
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full shadow-lg"
                style={{ backgroundColor: '#1e293b' }}
              >
                <p className="text-white font-bold whitespace-nowrap" style={{ fontSize: '11px' }}>
                  {etaMinutes} min
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="px-4 py-5 space-y-4">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
              Trip Status
            </h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${pulseAnimation ? 'animate-pulse' : ''}`} style={{ backgroundColor: progress >= 100 ? '#10b981' : '#3b82f6' }} />
              <span className="text-sm font-medium" style={{ color: progress >= 100 ? '#10b981' : '#3b82f6' }}>
                {progress >= 100 ? 'Completed' : 'Active'}
              </span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-3" style={{ fontSize: '14px' }}>
            {currentStatus}
          </p>
          
          <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full transition-all duration-300 rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: progress >= 100 ? '#10b981' : '#3b82f6'
              }}
            />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-600" style={{ fontSize: '12px' }}>{progress}% Complete</span>
            <span className="text-gray-900 font-semibold" style={{ fontSize: '12px' }}>
              {progress >= 100 ? 'Arrived' : `${etaMinutes} min • ${distanceKm.toFixed(1)} km`}
            </span>
          </div>
        </div>

        {/* Driver Info Card */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="text-gray-900 mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>
            Driver Information
          </h3>
          
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#e0f2fe' }}
            >
              <span className="font-bold" style={{ fontSize: '16px', color: '#0369a1' }}>MK</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-semibold" style={{ fontSize: '15px' }}>
                Mike Kereama
              </p>
              <p className="text-gray-600" style={{ fontSize: '13px' }}>
                Toyota Hiace • ABC123
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-green-600 font-medium" style={{ fontSize: '12px' }}>Online</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:06838800"
              className="flex items-center justify-center gap-2 rounded-xl py-3 active:scale-95 transition-all"
              style={{ backgroundColor: '#10b981' }}
            >
              <Phone className="w-4 h-4 text-white" />
              <span className="text-white font-semibold" style={{ fontSize: '14px' }}>
                Call
              </span>
            </a>
            <button
              className="flex items-center justify-center gap-2 border-2 rounded-xl py-3 active:scale-95 transition-all"
              style={{ borderColor: '#e5e7eb' }}
            >
              <span className="text-gray-700 font-semibold" style={{ fontSize: '14px' }}>
                Message
              </span>
            </button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 rounded-2xl p-4 shadow-md border border-red-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-red-900 font-semibold" style={{ fontSize: '14px' }}>
                Emergency Help
              </h3>
              <p className="text-red-700" style={{ fontSize: '12px' }}>
                Available 24/7
              </p>
            </div>
            <a
              href="tel:111"
              className="px-4 py-2 rounded-lg active:scale-95 transition-all"
              style={{ backgroundColor: '#dc2626' }}
            >
              <span className="text-white font-semibold" style={{ fontSize: '13px' }}>
                Call 111
              </span>
            </a>
          </div>
        </div>

        {/* Completion Card */}
        {progress >= 100 && (
          <div className="bg-green-50 rounded-2xl p-5 shadow-md border-2 border-green-300">
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-green-900 mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>
                Ride Complete!
              </h3>
              <p className="text-green-700 mb-4" style={{ fontSize: '14px' }}>
                {childName} has arrived safely at school
              </p>
              
              <button
                onClick={() => onNavigate('home')}
                className="w-full rounded-xl py-3 text-white active:scale-95 transition-all"
                style={{ 
                  background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)',
                  fontSize: '15px',
                  fontWeight: 600
                }}
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}