import { User, Mail, Phone, MapPin, Edit, Save, X, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface ProfilePageProps {
  user: any;
  setUser: (user: any) => void;
  onBack?: () => void;
}

export default function ProfilePage({ user, setUser, onBack }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleSave = () => {
    setUser({ ...user, ...editData });
    setIsEditing(false);
  };

  return (
    <div className="p-4 pb-24">
      {/* Profile Header */}
      <div className="rounded-2xl p-6 text-white text-center mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl" style={{ color: '#2F6F9F' }}>
            {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
          </span>
        </div>
        <h2 className="mb-1">{user?.name}</h2>
        <p className="text-white/90">Caregiver Account</p>
      </div>

      {/* Edit Button */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full flex items-center justify-center gap-2 bg-white py-3 rounded-xl shadow-md mb-6 border border-gray-100 active:scale-95 transition-all"
          style={{ color: '#2F6F9F' }}
        >
          <Edit className="w-5 h-5" />
          Edit Profile
        </button>
      )}

      {/* Profile Information */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
        <h3 className="text-gray-800 mb-4">Personal Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-400 mt-3" />
            <div className="flex-1">
              <label className="block text-gray-600 text-sm mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRingColor: '#2F6F9F' }}
                />
              ) : (
                <p className="text-gray-800">{user?.name}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-400 mt-3" />
            <div className="flex-1">
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <p className="text-gray-800">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-400 mt-3" />
            <div className="flex-1">
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-800">{user?.phone}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-3" />
            <div className="flex-1">
              <label className="block text-gray-600 text-sm mb-1">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-800">{user?.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 rounded-xl active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-xl active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
          >
            <Save className="w-5 h-5" />
            Save
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
        <h4 className="text-gray-800 mb-3">Account Statistics</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#E0F7FA' }}>
            <div className="mb-1" style={{ color: '#2F6F9F' }}>2</div>
            <p className="text-gray-600 text-sm">Children</p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#E0F7FA' }}>
            <div className="mb-1" style={{ color: '#5699D2' }}>15</div>
            <p className="text-gray-600 text-sm">Rides</p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#E0F7FA' }}>
            <div className="mb-1" style={{ color: '#2F6F9F' }}>3</div>
            <p className="text-gray-600 text-sm">Months</p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 rounded-xl active:scale-95 transition-all mt-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      )}
    </div>
  );
}