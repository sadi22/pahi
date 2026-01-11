import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, MapPin, User, Car, AlertCircle, CheckCircle } from 'lucide-react';

interface SimpleEasyTrackRideProps {
  onNavigate: (page: string) => void;
}

export default function SimpleEasyTrackRide({ onNavigate }: SimpleEasyTrackRideProps) {
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('Starting ride...');

  useEffect(() => {
    // Simulate ride progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update status based on progress
    if (progress < 25) {
      setCurrentStatus('Driver is on the way');
    } else if (progress < 50) {
      setCurrentStatus('Child picked up safely');
    } else if (progress < 75) {
      setCurrentStatus('En route to destination');
    } else if (progress < 100) {
      setCurrentStatus('Arriving shortly');
    } else {
      setCurrentStatus('Arrived at destination');
    }
  }, [progress]);

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(to bottom, #F0F9FF 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-5" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-white mb-6 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span style={{ fontSize: '16px', fontWeight: 600 }}>Back</span>
        </button>

        <h1 className="text-white mb-2" style={{ fontSize: '26px', fontWeight: 700 }}>
          Track Ride
        </h1>
        <p className="text-white/90" style={{ fontSize: '15px' }}>Emma Johnson</p>
      </div>

      <div className="px-5 py-6 space-y-5">
        {/* Current Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2" style={{ borderColor: progress >= 100 ? '#10b981' : '#2F6F9F' }}>
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: progress >= 100 ? '#dcfce7' : '#E0F7FA' }}
            >
              {progress >= 100 ? (
                <CheckCircle className="w-7 h-7 text-green-600" />
              ) : (
                <Car className="w-7 h-7" style={{ color: '#2F6F9F' }} />
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-600 mb-1" style={{ fontSize: '13px' }}>Current Status</p>
              <h3 className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
                {currentStatus}
              </h3>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: `${progress}%`,
                background: progress >= 100 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)'
              }}
            />
          </div>
          <p className="text-right text-gray-600" style={{ fontSize: '13px' }}>{progress}% Complete</p>
        </div>

        {/* Route Information */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-gray-900 mb-4" style={{ fontSize: '17px', fontWeight: 600 }}>
            Route Details
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: progress > 10 ? '#dcfce7' : '#E0F7FA' }}
                >
                  <MapPin 
                    className="w-5 h-5" 
                    style={{ color: progress > 10 ? '#10b981' : '#2F6F9F' }} 
                  />
                </div>
                <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
              </div>
              <div className="flex-1 pt-2">
                <p className="text-gray-600 mb-1" style={{ fontSize: '13px' }}>Pick Up Location</p>
                <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                  123 Main Street, Wairoa
                </p>
                {progress > 10 && (
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-600" style={{ fontSize: '13px', fontWeight: 500 }}>
                      Picked up
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: progress >= 100 ? '#dcfce7' : '#f3f4f6' }}
              >
                <MapPin 
                  className="w-5 h-5" 
                  style={{ color: progress >= 100 ? '#10b981' : '#9ca3af' }} 
                />
              </div>
              <div className="flex-1 pt-2">
                <p className="text-gray-600 mb-1" style={{ fontSize: '13px' }}>Drop Off Location</p>
                <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                  Wairoa Primary School
                </p>
                {progress >= 100 && (
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-600" style={{ fontSize: '13px', fontWeight: 500 }}>
                      Arrived
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Driver Information */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-gray-900 mb-4" style={{ fontSize: '17px', fontWeight: 600 }}>
            Driver Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#E0F7FA' }}
              >
                <User className="w-6 h-6" style={{ color: '#2F6F9F' }} />
              </div>
              <div className="flex-1">
                <p className="text-gray-600" style={{ fontSize: '13px' }}>Driver Name</p>
                <p className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                  Mike Kereama
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#E0F7FA' }}
              >
                <Car className="w-6 h-6" style={{ color: '#2F6F9F' }} />
              </div>
              <div className="flex-1">
                <p className="text-gray-600" style={{ fontSize: '13px' }}>Vehicle</p>
                <p className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                  Toyota Hiace • ABC123
                </p>
              </div>
            </div>
          </div>

          <a
            href="tel:06838800"
            className="flex items-center justify-center gap-3 w-full rounded-xl py-4 mt-5 active:scale-95 transition-all"
            style={{ backgroundColor: '#10b981' }}
          >
            <Phone className="w-5 h-5 text-white" />
            <span className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>
              Call Driver
            </span>
          </a>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 rounded-2xl p-5 shadow-md border-2 border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-red-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                Emergency Help
              </h3>
              <p className="text-red-700" style={{ fontSize: '13px' }}>
                Call if you need immediate assistance
              </p>
            </div>
          </div>
          
          <a
            href="tel:111"
            className="flex items-center justify-center gap-3 w-full rounded-xl py-4 active:scale-95 transition-all"
            style={{ backgroundColor: '#dc2626' }}
          >
            <Phone className="w-5 h-5 text-white" />
            <span className="text-white" style={{ fontSize: '16px', fontWeight: 600 }}>
              Call 111
            </span>
          </a>
        </div>

        {/* Completed State */}
        {progress >= 100 && (
          <div className="bg-green-50 rounded-2xl p-6 shadow-md border-2 border-green-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-green-900 mb-2" style={{ fontSize: '19px', fontWeight: 600 }}>
                Ride Complete!
              </h3>
              <p className="text-green-700 mb-5" style={{ fontSize: '14px' }}>
                Your child has arrived safely at the destination
              </p>
              
              <button
                onClick={() => onNavigate('home')}
                className="w-full rounded-xl py-4 text-white active:scale-95 transition-all"
                style={{ 
                  background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)',
                  fontSize: '16px',
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
