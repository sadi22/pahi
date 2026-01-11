import { Baby, Car, Phone, AlertCircle, MapPin, Clock } from 'lucide-react';

interface SimpleHomeProps {
  onNavigate: (page: string) => void;
}

export default function SimpleHome({ onNavigate }: SimpleHomeProps) {
  // Mock data
  const child = {
    name: 'Emma Johnson',
    age: 8,
    school: 'Wairoa Primary School',
    nextRide: 'Tomorrow 8:00 AM',
    status: 'Active'
  };

  const driver = {
    name: 'Mike Kereama',
    phone: '(06) 838-8000',
    vehicle: 'Toyota Hiace - ABC123',
    status: 'Available'
  };

  const emergencyContact = {
    name: 'Emergency Services',
    phone: '111',
    support: '(06) 838-8000'
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <h1 className="text-white text-2xl mb-1">Welcome to Pahi App</h1>
        <p className="text-white/90">Wairoa Community Safe Rides</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Child Information */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E0F7FA' }}>
              <Baby className="w-6 h-6" style={{ color: '#2F6F9F' }} />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium">Your Child</h3>
              <p className="text-gray-500 text-sm">{child.status}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Name</span>
              <span className="text-gray-900 font-medium">{child.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Age</span>
              <span className="text-gray-900 font-medium">{child.age} years</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">School</span>
              <span className="text-gray-900 font-medium">{child.school}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Next Ride</span>
              <span className="text-gray-900 font-medium">{child.nextRide}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('rides')}
            className="w-full mt-4 py-3 text-white rounded-lg active:scale-[0.98] transition-all shadow-md"
            style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
          >
            Book a Ride
          </button>
        </div>

        {/* Driver Information */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E0F7FA' }}>
              <Car className="w-6 h-6" style={{ color: '#2F6F9F' }} />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium">Your Driver</h3>
              <p className="text-gray-500 text-sm">{driver.status}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Name</span>
              <span className="text-gray-900 font-medium">{driver.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Vehicle</span>
              <span className="text-gray-900 font-medium">{driver.vehicle}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Phone</span>
              <a href={`tel:${driver.phone}`} className="font-medium" style={{ color: '#2F6F9F' }}>
                {driver.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-gray-900 font-medium mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" style={{ color: '#2F6F9F' }} />
            Recent Activity
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-900 text-sm font-medium">Ride Completed</p>
                <p className="text-gray-600 text-xs">Emma was safely dropped at school</p>
                <p className="text-gray-400 text-xs mt-1">Today, 8:15 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-900 text-sm font-medium">Ride Booked</p>
                <p className="text-gray-600 text-xs">Tomorrow morning pickup</p>
                <p className="text-gray-400 text-xs mt-1">Yesterday, 6:30 PM</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('history')}
            className="w-full mt-4 py-2.5 text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            View Full History
          </button>
        </div>

        {/* Emergency & Contact */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2" style={{ borderColor: '#2F6F9F' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-gray-900 font-medium">Emergency Contact</h3>
              <p className="text-gray-500 text-sm">Available 24/7</p>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href="tel:111"
              className="flex items-center justify-between p-3 bg-red-50 rounded-lg active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-gray-900 font-medium">Emergency Services</p>
                  <p className="text-gray-600 text-sm">Police, Fire, Ambulance</p>
                </div>
              </div>
              <span className="text-red-600 font-bold text-lg">111</span>
            </a>

            <a
              href={`tel:${emergencyContact.support}`}
              className="flex items-center justify-between p-3 rounded-lg active:scale-[0.98] transition-all"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <div>
                  <p className="text-gray-900 font-medium">Pahi App Support</p>
                  <p className="text-gray-600 text-sm">For ride assistance</p>
                </div>
              </div>
              <span className="font-bold" style={{ color: '#2F6F9F' }}>{emergencyContact.support}</span>
            </a>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-gray-900 font-medium mb-3">Need Help?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Contact our support team for any questions or concerns about your rides.
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Email:</span> support@pahiapp.co.nz
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Phone:</span> (06) 838-8000
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Hours:</span> Mon-Fri, 7AM - 6PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
