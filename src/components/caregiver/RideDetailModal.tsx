import { X, Clock, CheckCircle, MapPin, User, Navigation } from 'lucide-react';
import { useEffect, useRef } from 'react';
import wairoaMap from 'figma:asset/322dabe9429e6d40a0d2ade9a4f27fa62bfa1795.png';

interface RideDetail {
  id: number;
  childName: string;
  date: string;
  time: string;
  completedTime?: string;
  type: 'Pickup' | 'Dropoff';
  from: string;
  to: string;
  status: 'completed' | 'cancelled';
  driver: string;
  fromCoords?: { x: number; y: number };
  toCoords?: { x: number; y: number };
  pickupTime?: string;
}

interface RideDetailModalProps {
  ride: RideDetail | null;
  onClose: () => void;
}

// Color mapping for different children/users
const getUserColor = (childName: string): string => {
  const colors: { [key: string]: string } = {
    'Emma Johnson': '#EF4444', // Red
    'Liam Johnson': '#3B82F6', // Blue
    'Aroha Smith': '#10B981', // Green
    'Tāne Williams': '#F59E0B', // Amber
    'Kaia Brown': '#8B5CF6', // Purple
    'Wiremu Jones': '#EC4899', // Pink
  };
  return colors[childName] || '#2F6F9F'; // Default blue
};

export default function RideDetailModal({ ride, onClose }: RideDetailModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ride || ride.status !== 'completed' || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load the map image
    const img = new Image();
    img.src = wairoaMap;
    
    img.onload = () => {
      // Set canvas size to match container
      const container = containerRef.current;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = 300;
      canvas.width = width;
      canvas.height = height;

      // Draw the map image
      ctx.drawImage(img, 0, 0, width, height);

      // Get route color for this user
      const routeColor = getUserColor(ride.childName);

      // Define route coordinates (percentage-based for responsive design)
      // Default route from pickup to school
      const defaultFrom = { x: 0.25, y: 0.65 }; // Bottom left area (residential)
      const defaultTo = { x: 0.55, y: 0.35 }; // Middle area (school zone)

      const from = ride.fromCoords || defaultFrom;
      const to = ride.toCoords || defaultTo;

      // Convert percentages to pixel coordinates
      const fromX = from.x * width;
      const fromY = from.y * height;
      const toX = to.x * width;
      const toY = to.y * height;

      // Create a curved path for more realistic route
      const midX = (fromX + toX) / 2 + (Math.random() - 0.5) * 50;
      const midY = (fromY + toY) / 2 + (Math.random() - 0.5) * 50;

      // Draw route path with gradient
      const gradient = ctx.createLinearGradient(fromX, fromY, toX, toY);
      gradient.addColorStop(0, routeColor);
      gradient.addColorStop(1, routeColor + 'CC'); // Add transparency at end

      // Draw main route line
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.quadraticCurveTo(midX, midY, toX, toY);
      ctx.strokeStyle = routeColor;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Draw dashed overlay for animation effect
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.quadraticCurveTo(midX, midY, toX, toY);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw start marker (pickup)
      ctx.beginPath();
      ctx.arc(fromX, fromY, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#2563EB';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw end marker (destination)
      ctx.beginPath();
      ctx.arc(toX, toY, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#10B981';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Add pulsing effect circles
      const drawPulse = (x: number, y: number, color: string, offset: number) => {
        ctx.beginPath();
        ctx.arc(x, y, 18 + offset, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3 - (offset / 50);
        ctx.stroke();
        ctx.globalAlpha = 1;
      };

      // Animate pulsing
      let pulseOffset = 0;
      const animate = () => {
        // Redraw everything
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Route line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.quadraticCurveTo(midX, midY, toX, toY);
        ctx.strokeStyle = routeColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Dashed overlay
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.quadraticCurveTo(midX, midY, toX, toY);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Pulsing circles
        drawPulse(fromX, fromY, '#2563EB', pulseOffset);
        drawPulse(toX, toY, '#10B981', pulseOffset);

        // Markers
        ctx.beginPath();
        ctx.arc(fromX, fromY, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#2563EB';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(toX, toY, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#10B981';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.stroke();

        pulseOffset = (pulseOffset + 0.5) % 15;
      };

      const interval = setInterval(animate, 50);
      
      return () => clearInterval(interval);
    };
  }, [ride]);

  if (!ride) return null;

  const userColor = getUserColor(ride.childName);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fadeIn">
      <div 
        className="bg-white w-full h-[90vh] rounded-t-3xl overflow-hidden animate-slideUp"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white" style={{ fontSize: '20px', fontWeight: 600 }}>
              Ride Details
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Status Badge */}
          {ride.status === 'completed' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full" style={{ fontSize: '13px', fontWeight: 600 }}>
              <CheckCircle className="w-4 h-4" />
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full" style={{ fontSize: '13px', fontWeight: 600 }}>
              <X className="w-4 h-4" />
              Cancelled
            </span>
          )}
        </div>

        <div className="overflow-y-auto" style={{ height: 'calc(90vh - 110px)' }}>
          {/* Map View - Only show for completed rides */}
          {ride.status === 'completed' && (
            <div className="relative bg-gray-100">
              <div ref={containerRef} className="w-full" style={{ height: '300px' }}>
                <canvas 
                  ref={canvasRef}
                  className="w-full h-full"
                />
              </div>
              
              {/* Route Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: userColor }}
                    />
                    <Navigation className="w-4 h-4" style={{ color: '#2F6F9F' }} />
                    <span className="text-gray-700" style={{ fontWeight: 500 }}>
                      {ride.childName}&apos;s Route
                    </span>
                  </div>
                  <span className="text-gray-500">~5.2 km</span>
                </div>
              </div>
            </div>
          )}

          {/* Ride Information */}
          <div className="px-5 py-5 space-y-4">
            {/* Child Info */}
            <div 
              className="bg-white rounded-xl p-4 border-2"
              style={{ borderColor: userColor + '40' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: userColor + '20' }}
                >
                  <User className="w-4 h-4" style={{ color: userColor }} />
                </div>
                <span className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>{ride.childName}</span>
                <span 
                  className="ml-auto px-2 py-1 text-xs rounded" 
                  style={{ 
                    backgroundColor: userColor + '20',
                    color: userColor,
                    fontWeight: 600 
                  }}
                >
                  {ride.type}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{ride.date}</span>
              </div>
            </div>

            {/* Timing Information */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
              <h3 className="text-gray-900 mb-4" style={{ fontSize: '15px', fontWeight: 600 }}>
                Complete Trip Timeline
              </h3>
              
              <div className="space-y-0">
                {/* Booking Time */}
                <div className="flex items-start gap-3 pb-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center z-10">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    {ride.status === 'completed' && (
                      <div className="w-0.5 h-full bg-blue-300 absolute top-10 left-5" style={{ height: '40px' }} />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-xs text-gray-500 mb-0.5">Booking Time</p>
                    <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>{ride.time}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Ride scheduled and confirmed</p>
                  </div>
                </div>

                {ride.status === 'completed' && (
                  <>
                    {/* Actual Pickup Time */}
                    <div className="flex items-start gap-3 pb-4 relative">
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center z-10"
                          style={{ backgroundColor: userColor }}
                        >
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-0.5 h-full bg-blue-300 absolute top-10 left-5" style={{ height: '40px' }} />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-xs text-gray-500 mb-0.5">Actual Pickup Time</p>
                        <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                          {ride.pickupTime || '8:05 AM'}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{ride.childName} picked up from {ride.from ? ride.from.split(',')[0] : 'Home'}</p>
                      </div>
                      <div className="text-right pt-1">
                        <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-600">
                          +5 min
                        </span>
                      </div>
                    </div>

                    {/* Drop-off Time */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-xs text-gray-500 mb-0.5">Drop-off Time</p>
                        <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                          {ride.completedTime || '8:25 AM'}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{ride.childName} arrived at {ride.to ? ride.to.split(',')[0] : 'School'}</p>
                      </div>
                      <div className="text-right pt-1">
                        <span className="text-xs px-2 py-1 bg-green-100 rounded-full text-green-700" style={{ fontWeight: 600 }}>
                          20 min trip
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Route Details */}
            <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '15px', fontWeight: 600 }}>
                Route Details
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">From</p>
                    <p className="text-gray-900" style={{ fontSize: '14px', fontWeight: 500 }}>{ride.from}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">To</p>
                    <p className="text-gray-900" style={{ fontSize: '14px', fontWeight: 500 }}>{ride.to}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Info */}
            <div className="bg-white rounded-xl p-4 border-2 border-gray-100">
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '15px', fontWeight: 600 }}>
                Driver Information
              </h3>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2F6F9F' }}>
                  <span className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>MK</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>{ride.driver}</p>
                  <p className="text-gray-500 text-xs">Community Verified Driver</p>
                </div>
              </div>
            </div>

            {/* Color Legend */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '15px', fontWeight: 600 }}>
                Route Color
              </h3>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: userColor }}
                />
                <span className="text-gray-700 text-sm">
                  {ride.childName}&apos;s dedicated route color
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Each child has a unique color to easily identify their routes on the map
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}