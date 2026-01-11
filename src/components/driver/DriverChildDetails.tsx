import { useState } from 'react';
import { User, Phone, MapPin, Mail, AlertCircle, Heart, Shield, ArrowLeft } from 'lucide-react';
import ChildAvatar from '../ChildAvatar';

interface DriverChildDetailsProps {
  onBack: () => void;
  children: any[];
}

export default function DriverChildDetails({ onBack, children }: DriverChildDetailsProps) {
  const [selectedChild, setSelectedChild] = useState<any>(null);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="px-4 py-4">
      {!selectedChild ? (
        <>
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <div className="mb-4">
            <h3 className="text-gray-900 mb-2">Children Registry</h3>
            <p className="text-gray-600 text-sm">View caregiver and child details for all assigned students</p>
          </div>

          <div className="space-y-3">
            {children.map((child) => (
              <div
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <ChildAvatar
                    name={child.name}
                    photoUrl={child.photoUrl}
                    initials={getInitials(child.name)}
                    size="md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-gray-900">{child.name}</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{child.school}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <p className="text-gray-500">{child.caregiverName}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Child Detail View */}
          <button
            onClick={() => setSelectedChild(null)}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to List
          </button>

          <div className="space-y-4">
            {/* Child Info */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <ChildAvatar
                  name={selectedChild.name}
                  photoUrl={selectedChild.photoUrl}
                  initials={getInitials(selectedChild.name)}
                  size="xl"
                />
                <div>
                  <h2 className="text-gray-900 mb-1">{selectedChild.name}</h2>
                  <p className="text-gray-600">{selectedChild.school}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-900">{selectedChild.pickupAddress}</p>
                    <p className="text-gray-500 text-sm">Pickup Address</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Caregiver Info */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-gray-900 mb-4">Primary Caregiver</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 mt-0.5" style={{ color: '#2F6F9F' }} />
                  <div>
                    <p className="text-gray-900">{selectedChild.caregiverName}</p>
                    <p className="text-gray-500 text-sm">Parent/Guardian</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-gray-900">{selectedChild.caregiverPhone}</p>
                    <p className="text-gray-500 text-sm">Primary Contact</p>
                  </div>
                  <a href={`tel:${selectedChild.caregiverPhone}`} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
                    Call
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="text-gray-900 mb-3">Quick Actions</h3>
              <div className="flex gap-2">
                <a
                  href={`tel:${selectedChild.caregiverPhone}`}
                  className="flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
                >
                  <Phone className="w-4 h-4" />
                  Call Caregiver
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}