import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, User, Phone, MapPin, LogOut, HelpCircle, Users, Mail, Edit2, Shield, Bell, CreditCard, Settings, Camera, Upload, X } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

interface Child {
  id: string;
  name: string;
  age: number;
  year: string;
  school: string;
  initials: string;
  photoUrl?: string;
  isEmojiAvatar?: boolean;
}

interface SimpleEasyProfileProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  children: Child[];
}

export default function SimpleEasyProfile({ onNavigate, onLogout, children }: SimpleEasyProfileProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isEmojiAvatar, setIsEmojiAvatar] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Rachel Mitchell',
    phone: '021 234 5678',
    email: 'rachel.mitchell@email.com',
    address: '123 Main Street, Wairoa'
  });

  const avatarOptions = [
    { emoji: '⚽', label: 'Football' },
    { emoji: '🎨', label: 'Paint' },
    { emoji: '📚', label: 'Book' },
    { emoji: '🎵', label: 'Music' },
    { emoji: '🧩', label: 'Puzzle' },
    { emoji: '🎮', label: 'Gaming' },
    { emoji: '🎭', label: 'Drama' },
    { emoji: '🎸', label: 'Guitar' },
    { emoji: '🏀', label: 'Basketball' },
    { emoji: '🎪', label: 'Fun' },
    { emoji: '⭐', label: 'Star' },
  ];

  const handleLogoutConfirm = () => {
    setShowLogoutDialog(false);
    toast.success('Logged out successfully');
    onLogout();
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
        setShowPhotoOptions(false);
        toast.success('Profile photo updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setShowPhotoOptions(false);
    toast.success('Profile photo removed');
  };

  const handleSelectAvatar = (emoji: string) => {
    setProfilePhoto(emoji);
    setIsEmojiAvatar(true);
    setShowPhotoOptions(false);
    toast.success('Profile photo updated!');
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(to bottom, #F0F9FF 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-white mb-6 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span style={{ fontSize: '16px', fontWeight: 600 }}>Back to Home</span>
        </button>

        <div className="text-center">
          <div className="relative inline-block">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              {profilePhoto ? (
                isEmojiAvatar ? (
                  <span className="text-4xl" style={{ color: '#2F6F9F' }}>{profilePhoto}</span>
                ) : (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                )
              ) : (
                <User className="w-12 h-12" style={{ color: '#2F6F9F' }} />
              )}
            </div>
            
            {/* Camera Button */}
            <button
              onClick={() => setShowPhotoOptions(true)}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg active:scale-95 transition-all"
              style={{ backgroundColor: '#2F6F9F' }}
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>

          <h1 className="text-white mb-1 mt-4" style={{ fontSize: '26px', fontWeight: 700 }}>
            {userInfo.name}
          </h1>
          <p className="text-white/90" style={{ fontSize: '15px' }}>
            Parent Account
          </p>
        </div>
      </div>

      <div className="px-5 py-6 space-y-5">
        {/* Account Information Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
              Account Information
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg active:scale-95 transition-all"
                style={{ backgroundColor: '#E0F7FA' }}
              >
                <Edit2 className="w-4 h-4" style={{ color: '#2F6F9F' }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#2F6F9F' }}>Edit</span>
              </button>
            ) : null}
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-gray-600 mb-2 flex items-center gap-2" style={{ fontSize: '13px', fontWeight: 500 }}>
                <User className="w-4 h-4" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  style={{ fontSize: '15px' }}
                />
              ) : (
                <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-xl" style={{ fontSize: '15px', fontWeight: 500 }}>
                  {userInfo.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-gray-600 mb-2 flex items-center gap-2" style={{ fontSize: '13px', fontWeight: 500 }}>
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  style={{ fontSize: '15px' }}
                />
              ) : (
                <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-xl" style={{ fontSize: '15px', fontWeight: 500 }}>
                  {userInfo.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-600 mb-2 flex items-center gap-2" style={{ fontSize: '13px', fontWeight: 500 }}>
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  style={{ fontSize: '15px' }}
                />
              ) : (
                <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-xl" style={{ fontSize: '15px', fontWeight: 500 }}>
                  {userInfo.email}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="text-gray-600 mb-2 flex items-center gap-2" style={{ fontSize: '13px', fontWeight: 500 }}>
                <MapPin className="w-4 h-4" />
                Home Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.address}
                  onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                  style={{ fontSize: '15px' }}
                />
              ) : (
                <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-xl" style={{ fontSize: '15px', fontWeight: 500 }}>
                  {userInfo.address}
                </p>
              )}
            </div>

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-3 rounded-xl text-white active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)', fontSize: '15px', fontWeight: 600 }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 rounded-xl border-2 active:scale-95 transition-all"
                  style={{ borderColor: '#e5e7eb', fontSize: '15px', fontWeight: 600, color: '#6b7280' }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Children Summary Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
              Registered Children
            </h2>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <span className="font-bold" style={{ fontSize: '16px', color: '#2F6F9F' }}>
                {children.length}
              </span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            {children.map((child) => (
              <div key={child.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#E0F7FA' }}
                >
                  <span className="font-semibold" style={{ fontSize: '14px', color: '#2F6F9F' }}>
                    {child.initials}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900" style={{ fontSize: '15px', fontWeight: 600 }}>
                    {child.name}
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    {child.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('manage-children')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl active:scale-95 transition-all"
            style={{ backgroundColor: '#2F6F9F' }}
          >
            <Users className="w-5 h-5 text-white" />
            <span className="text-white" style={{ fontSize: '15px', fontWeight: 600 }}>
              Manage Children
            </span>
          </button>
        </div>

        {/* Settings & Preferences */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h2 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Settings
          </h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('notifications-settings')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                  Notifications
                </span>
              </div>
              <span className="text-gray-400" style={{ fontSize: '20px' }}>›</span>
            </button>

            <button 
              onClick={() => onNavigate('privacy-safety')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                  Privacy & Safety
                </span>
              </div>
              <span className="text-gray-400" style={{ fontSize: '20px' }}>›</span>
            </button>

            <button 
              onClick={() => onNavigate('app-preferences')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                  App Preferences
                </span>
              </div>
              <span className="text-gray-400" style={{ fontSize: '20px' }}>›</span>
            </button>
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h2 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Help & Support
          </h2>
          
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('help')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                  Help Center
                </span>
              </div>
              <span className="text-gray-400" style={{ fontSize: '20px' }}>›</span>
            </button>

            <a
              href="tel:06838800"
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                  Contact Support
                </span>
              </div>
              <span className="text-gray-600" style={{ fontSize: '13px' }}>06 838 800</span>
            </a>

            <button 
              onClick={() => toast.info('App Version', { description: 'Pahi App v1.0.0 • Last updated: Dec 2025 • You are using the latest version.' })}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                  App Version
                </span>
              </div>
              <span className="text-gray-600" style={{ fontSize: '13px' }}>v1.0.0</span>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl shadow-md active:scale-95 transition-all"
          style={{ backgroundColor: '#fee2e2', border: '2px solid #fecaca' }}
        >
          <LogOut className="w-5 h-5 text-red-600" />
          <span className="text-red-600" style={{ fontSize: '16px', fontWeight: 600 }}>
            Log Out
          </span>
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onCancel={() => setShowLogoutDialog(false)}
        onConfirm={handleLogoutConfirm}
        title="Log Out?"
        message="Are you sure you want to log out of your account?"
        confirmText="Log Out"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Photo Options Modal */}
      {showPhotoOptions && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fadeIn" onClick={() => setShowPhotoOptions(false)}>
          <div 
            className="bg-white w-full rounded-t-3xl p-6 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-gray-900" style={{ fontSize: '20px', fontWeight: 600 }}>
                Profile Photo
              </h3>
              <button
                onClick={() => setShowPhotoOptions(false)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Upload Photo */}
              <label className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl cursor-pointer active:scale-95 transition-all">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#2F6F9F' }}
                >
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                    Upload Photo
                  </p>
                  <p className="text-gray-600" style={{ fontSize: '13px' }}>
                    Choose from your device
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {/* Remove Photo - Only show if photo exists */}
              {profilePhoto && (
                <button
                  onClick={handleRemovePhoto}
                  className="w-full flex items-center gap-4 p-4 bg-red-50 rounded-xl active:scale-95 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-red-900" style={{ fontSize: '16px', fontWeight: 600 }}>
                      Remove Photo
                    </p>
                    <p className="text-red-600" style={{ fontSize: '13px' }}>
                      Use default avatar
                    </p>
                  </div>
                </button>
              )}

              {/* Avatar Options */}
              <div className="grid grid-cols-4 gap-3">
                {avatarOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSelectAvatar(option.emoji)}
                    className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-all"
                  >
                    <span className="text-2xl" style={{ color: '#2F6F9F' }}>{option.emoji}</span>
                  </button>
                ))}
              </div>

              {/* Cancel */}
              <button
                onClick={() => setShowPhotoOptions(false)}
                className="w-full py-4 rounded-xl border-2 border-gray-200 active:scale-95 transition-all"
              >
                <span className="text-gray-700" style={{ fontSize: '16px', fontWeight: 600 }}>
                  Cancel
                </span>
              </button>
            </div>

            {/* Info Text */}
            <p className="text-center text-gray-500 text-xs mt-4">
              Max file size: 5MB • Supported formats: JPG, PNG
            </p>
          </div>
        </div>
      )}
    </div>
  );
}