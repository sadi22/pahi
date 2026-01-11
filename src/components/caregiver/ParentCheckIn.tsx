import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  User,
  Clock,
  MapPin,
  School
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CheckInChild {
  id: string;
  name: string;
  age: number;
  year: string;
  school: string;
  photo?: string;
  photoUrl?: string;
  checkedIn: boolean;
  checkInTime?: string;
}

interface ParentCheckInProps {
  onBack?: () => void;
  children?: any[];
}

export default function ParentCheckIn({ onBack, children: initialChildren }: ParentCheckInProps) {
  const [children, setChildren] = useState<CheckInChild[]>(
    initialChildren?.map((child, index) => ({
      id: child.id || index + 1,
      name: child.name,
      age: child.age,
      year: child.year,
      school: child.school,
      photo: child.photoUrl,
      checkedIn: false
    })) || [
      {
        id: '1',
        name: 'Emma Johnson',
        age: 8,
        year: 'Grade 3',
        school: 'Wairoa Primary School',
        checkedIn: false
      },
      {
        id: '2',
        name: 'Oliver Johnson',
        age: 10,
        year: 'Grade 5',
        school: 'Wairoa Primary School',
        checkedIn: false
      }
    ]
  );

  const [searchQuery, setSearchQuery] = useState('');

  const handleCheckIn = (childId: string) => {
    const child = children.find(c => c.id === childId);
    if (!child) return;

    setChildren(prev => prev.map(c => 
      c.id === childId 
        ? { 
            ...c, 
            checkedIn: true, 
            checkInTime: new Date().toLocaleTimeString('en-NZ', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            location: 'Parent Drop-off'
          } 
        : c
    ));
    
    toast.success(`${child.name} checked in`, {
      description: `Successfully checked in at ${new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' })}`
    });
  };

  const handleCheckOut = (childId: string) => {
    const child = children.find(c => c.id === childId);
    if (!child) return;

    setChildren(prev => prev.map(c => 
      c.id === childId 
        ? { 
            ...c, 
            checkedIn: false, 
            checkInTime: undefined,
            location: undefined
          } 
        : c
    ));
    
    toast.success(`${child.name} checked out`, {
      description: 'Successfully checked out'
    });
  };

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const checkedInCount = children.filter(c => c.checkedIn).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div 
        className="text-white px-5 pt-6 pb-8"
        style={{ background: '#5699D2' }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-4 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </button>

        <div className="mb-6">
          <h1 className="text-white mb-1" style={{ fontSize: '24px', fontWeight: 600 }}>
            Check In Children
          </h1>
          <p className="text-white/90 text-sm">
            Check in your children for school transport
          </p>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search children..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Status Summary */}
      <div className="px-5 -mt-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Checked In</p>
              <p className="text-green-600 font-bold" style={{ fontSize: '28px' }}>
                {checkedInCount}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Not Checked In</p>
              <p className="text-orange-600 font-bold" style={{ fontSize: '28px' }}>
                {children.length - checkedInCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-5 mb-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-blue-900 font-semibold text-sm mb-1">
            How to Check In
          </p>
          <p className="text-blue-700 text-xs">
            Check in your children when they are ready for school transport. 
            The driver will see who is checked in and ready for pickup.
          </p>
        </div>
      </div>

      {/* Children List */}
      <div className="px-5 space-y-3">
        {filteredChildren.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No children found</p>
          </div>
        ) : (
          filteredChildren.map((child) => (
            <div 
              key={child.id} 
              className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
                child.checkedIn 
                  ? 'border-green-500 bg-green-50/30' 
                  : 'border-gray-200'
              }`}
            >
              {/* Child Info */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  {child.photo ? (
                    <ImageWithFallback
                      src={child.photo}
                      alt={child.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-blue-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 font-semibold text-lg">
                        {child.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {child.age} years • {child.year}
                      </p>
                    </div>
                    
                    {child.checkedIn && (
                      <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs font-semibold">Checked In</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <School className="w-3.5 h-3.5" />
                      <span>{child.school}</span>
                    </div>
                    
                    {child.checkedIn && child.checkInTime && (
                      <>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Checked in at {child.checkInTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{child.location}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {child.checkedIn ? (
                <button
                  onClick={() => handleCheckOut(child.id)}
                  className="w-full bg-red-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors active:scale-95"
                >
                  <XCircle className="w-5 h-5" />
                  Check Out
                </button>
              ) : (
                <button
                  onClick={() => handleCheckIn(child.id)}
                  className="w-full bg-green-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors active:scale-95"
                >
                  <CheckCircle className="w-5 h-5" />
                  Check In
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}