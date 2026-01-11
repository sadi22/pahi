import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { User, Mail, Phone, MapPin, Edit, Save, LogOut, Shield, Bell, HelpCircle } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

interface SimpleProfileProps {
  onLogout: () => void;
}

export default function SimpleProfile({ onLogout }: SimpleProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [name, setName] = useState('Sarah Johnson');
  const [email, setEmail] = useState('sarah.johnson@email.com');
  const [phone, setPhone] = useState('021 234 5678');
  const [address, setAddress] = useState('123 Main Street, Wairoa');
  const [emergencyContact, setEmergencyContact] = useState('021 987 6543');

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Logout?"
        message="Are you sure you want to logout? You will need to login again to access the app."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        variant="warning"
      />

      {/* Header */}
      <div className="px-6 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <User className="w-10 h-10" style={{ color: '#2F6F9F' }} />
          </div>
          <div>
            <h1 className="text-white text-2xl">{name}</h1>
            <p className="text-white/90">Caregiver Account</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Personal Information */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-medium">Personal Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg active:scale-[0.98] transition-all"
                style={{ backgroundColor: '#E0F7FA', color: '#2F6F9F' }}
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg active:scale-[0.98] transition-all"
                style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                />
              ) : (
                <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">{name}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                />
              ) : (
                <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">{email}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                />
              ) : (
                <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">{phone}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                Home Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                />
              ) : (
                <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">{address}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Phone className="w-4 h-4" />
                Emergency Contact
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                />
              ) : (
                <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-lg">{emergencyContact}</p>
              )}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-gray-900 font-medium mb-4">Settings</h3>
          
          <div className="space-y-2">
            <button
              onClick={() => toast.info('Notifications', { description: 'Notification settings coming soon' })}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Notifications</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>

            <button
              onClick={() => toast.info('Privacy & Security', { description: 'Privacy settings coming soon' })}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Privacy & Security</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>

            <button
              onClick={() => toast.info('Help & Support', { description: 'Contact support@pahiapp.co.nz for assistance' })}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Help & Support</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-gray-900 font-medium mb-3">About Pahi App</h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">Version 1.0.0</p>
            <p className="text-gray-600">Wairoa Community Safe Rides</p>
            <p className="text-gray-600">© 2024 Pahi App. All rights reserved.</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-4 bg-red-50 text-red-600 rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 active:scale-[0.98] transition-all shadow-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
