import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, MessageCircle, AlertCircle, User, Clock, Home, Navigation } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import BusLocationPin from './icons/BusLocationPin';
import wairoaMap from 'figma:asset/802c9fc80a14e644034d432bee88218b1476cba7.png';

interface TrackRideProps {
  onBack?: () => void;
}

export default function TrackRide({ onBack }: TrackRideProps) {
  const [driverPosition, setDriverPosition] = useState(0);
  const [isTracking, setIsTracking] = useState(true);

  useEffect(() => {
    if (isTracking && driverPosition < 100) {
      const timer = setInterval(() => {
        setDriverPosition((prev) => Math.min(prev + 1.5, 100));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTracking, driverPosition]);

  const estimatedTime = Math.ceil((100 - driverPosition) / 5);
  const distance = ((100 - driverPosition) / 20).toFixed(1);

  return (
    <div className="min-h-full bg-[#f8fafc] pb-24">
      {/* Status Banner */}
      <div className="relative px-6 py-6 shadow-card" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors z-10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/90 text-sm mb-1">Arriving in</p>
            <p className="text-white text-3xl font-bold">{estimatedTime} min</p>
          </div>
          <div className="text-right">
            <p className="text-white/90 text-sm mb-1">{distance} km away</p>
            <div className="flex items-center justify-end gap-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <p className="text-emerald-300 text-sm font-medium">On time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="relative" style={{ height: '320px' }}>
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
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
            <p className="text-gray-900 text-sm">Wairoa, NZ</p>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}></div>

          {/* Route Line */}
          <div className="absolute top-1/2 left-12 right-12 transform -translate-y-1/2">
            <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="absolute h-full rounded-full transition-all duration-1000"
                style={{ width: `${driverPosition}%`, background: 'linear-gradient(90deg, #2F6F9F 0%, #5699D2 100%)' }}
              ></div>
            </div>
          </div>

          {/* Pickup Location */}
          <div className="absolute left-10 top-1/2 transform -translate-y-1/2">
            <div className="w-10 h-10 rounded-full shadow-elevated flex items-center justify-center border-4 border-white" style={{ backgroundColor: '#2F6F9F' }}>
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-card border border-slate-100">
                <p className="text-slate-900 text-xs font-semibold">123 Main St</p>
              </div>
            </div>
          </div>

          {/* School Location */}
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="w-10 h-10 bg-emerald-500 rounded-full shadow-elevated flex items-center justify-center border-4 border-white">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-card border border-slate-100">
                <p className="text-slate-900 text-xs font-semibold">School</p>
              </div>
            </div>
          </div>

          {/* Driver Position */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000"
            style={{ left: `calc(10% + ${driverPosition * 0.80}%)` }}
          >
            <div className="relative">
              <BusLocationPin className="w-14 h-14 drop-shadow-xl" />
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shadow-card">
                {estimatedTime} min away
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Driver Card */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-card" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
              <span className="text-xl font-semibold">MK</span>
            </div>
            <div className="flex-1">
              <h4 className="text-slate-900 font-semibold mb-1">Mike Kereama</h4>
              <div className="flex items-center gap-2 mb-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 text-xs font-medium">Verified Driver</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-slate-900 text-sm font-medium">5.0</span>
                <span className="text-slate-500 text-xs">• 147 rides</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
            <p className="text-slate-600 text-sm mb-1">Vehicle</p>
            <p className="text-slate-900 font-semibold">Toyota Corolla • ABC 123</p>
          </div>

          <div className="flex gap-3">
            <a
              href="tel:0214567890"
              className="flex-1 text-white py-3 rounded-xl text-sm font-medium text-center flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-card"
              style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
            >
              <Phone className="w-4 h-4" />
              Call Driver
            </a>
            <a
              href="sms:0214567890"
              className="flex-1 bg-slate-100 text-slate-900 py-3 rounded-xl text-sm font-medium text-center flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Message
            </a>
          </div>
        </div>

        {/* Ride Details */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
          <h4 className="text-slate-900 font-semibold mb-4">Trip Details</h4>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E0F7FA' }}>
                <User className="w-5 h-5" style={{ color: '#2F6F9F' }} />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-xs mb-1 font-medium">Passenger</p>
                <p className="text-slate-900 font-semibold">Ciara Mitchell</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E0F7FA' }}>
                <MapPin className="w-5 h-5" style={{ color: '#2F6F9F' }} />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-xs mb-1 font-medium">Pickup Location</p>
                <p className="text-slate-900 font-semibold">123 Main St, Wairoa</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-xs mb-1 font-medium">Destination</p>
                <p className="text-slate-900 font-semibold">Sunshine Elementary School</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-xs mb-1 font-medium">Scheduled Time</p>
                <p className="text-slate-900 font-semibold">8:00 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Updates */}
        {driverPosition > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
            <h4 className="text-slate-900 font-semibold mb-4">Live Updates</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2.5 h-2.5 rounded-full mt-1.5" style={{ backgroundColor: '#2F6F9F' }}></div>
                <div className="flex-1">
                  <p className="text-slate-900 font-medium text-sm">Driver is on the way</p>
                  <p className="text-slate-500 text-xs mt-0.5">2 minutes ago</p>
                </div>
              </div>
              {driverPosition > 30 && (
                <div className="flex gap-3">
                  <div className="w-2.5 h-2.5 rounded-full mt-1.5" style={{ backgroundColor: '#5699D2' }}></div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-medium text-sm">Approaching pickup location</p>
                    <p className="text-slate-500 text-xs mt-0.5">Just now</p>
                  </div>
                </div>
              )}
              {driverPosition > 90 && (
                <div className="flex gap-3">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-1.5 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-medium text-sm">Driver arriving soon!</p>
                    <p className="text-slate-500 text-xs mt-0.5">Just now</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Back Button */}
        {onBack && (
          <button 
            onClick={onBack}
            className="w-full bg-slate-100 text-slate-900 py-3.5 rounded-2xl font-medium active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        )}
      </div>
    </div>
  );
}