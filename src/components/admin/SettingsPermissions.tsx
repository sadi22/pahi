import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Settings, Shield, MapPin, Clock, DollarSign, Users, FileText, Save, ArrowLeft } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

interface SettingsPermissionsProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export default function SettingsPermissions({ onBack, onNavigate, onLogout }: SettingsPermissionsProps) {
  const [activeTab, setActiveTab] = useState<'policies' | 'roles' | 'content'>('policies');
  
  const [rideSettings, setRideSettings] = useState({
    maxDistance: 15,
    bookingAdvanceHours: 2,
    cancellationHours: 1,
    maxRidesPerDay: 4
  });

  const [driverRequirements, setDriverRequirements] = useState({
    minAge: 25,
    minExperience: 3,
    backgroundCheck: true,
    drivingRecord: true,
    vehicleInspection: true
  });

  const adminRoles = [
    {
      id: 1,
      name: 'Super Admin',
      email: 'admin@pahi.nz',
      permissions: ['All Access'],
      createdDate: '1 Jan 2024'
    },
    {
      id: 2,
      name: 'School Coordinator',
      email: 'coordinator@wairoaps.nz',
      permissions: ['View Students', 'Manage Rides', 'View Reports'],
      createdDate: '15 Feb 2024'
    }
  ];

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Clean Header */}
      <div 
        className="text-white px-5 py-4 flex-shrink-0"
        style={{ background: '#5699D2' }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-3 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-white mb-1">Settings</h1>
        <p className="text-white/80 text-sm">System policies and permissions</p>
      </div>

      {/* Simplified Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex gap-1.5">
          <button
            onClick={() => setActiveTab('policies')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'policies'
                ? 'text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            style={activeTab === 'policies' ? { background: '#5699D2' } : {}}
          >
            Policies
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'roles'
                ? 'text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            style={activeTab === 'roles' ? { background: '#5699D2' } : {}}
          >
            Roles
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeTab === 'content'
                ? 'text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            style={activeTab === 'content' ? { background: '#5699D2' } : {}}
          >
            Content
          </button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="p-4 space-y-3">
            {/* Ride Settings */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-100">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E0F7FA', color: '#2F6F9F' }}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-gray-900 text-sm">Ride Configuration</h3>
                  <p className="text-gray-500 text-xs">Distance and booking limits</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 text-sm mb-1.5">Maximum Ride Distance (km)</label>
                  <input
                    type="number"
                    value={rideSettings.maxDistance}
                    onChange={(e) => setRideSettings({...rideSettings, maxDistance: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ '--tw-ring-color': '#5699D2' } as any}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-1.5">Advance Booking Required (hours)</label>
                  <input
                    type="number"
                    value={rideSettings.bookingAdvanceHours}
                    onChange={(e) => setRideSettings({...rideSettings, bookingAdvanceHours: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ '--tw-ring-color': '#5699D2' } as any}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-1.5">Cancellation Notice (hours)</label>
                  <input
                    type="number"
                    value={rideSettings.cancellationHours}
                    onChange={(e) => setRideSettings({...rideSettings, cancellationHours: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ '--tw-ring-color': '#5699D2' } as any}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-1.5">Max Rides Per Child Per Day</label>
                  <input
                    type="number"
                    value={rideSettings.maxRidesPerDay}
                    onChange={(e) => setRideSettings({...rideSettings, maxRidesPerDay: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ '--tw-ring-color': '#5699D2' } as any}
                  />
                </div>
              </div>
            </div>

            {/* Driver Requirements */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-100">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 text-sm">Driver Requirements</h3>
                  <p className="text-gray-500 text-xs">Minimum qualifications</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 text-sm mb-1.5">Minimum Age</label>
                  <input
                    type="number"
                    value={driverRequirements.minAge}
                    onChange={(e) => setDriverRequirements({...driverRequirements, minAge: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ '--tw-ring-color': '#5699D2' } as any}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-1.5">Minimum Driving Experience (years)</label>
                  <input
                    type="number"
                    value={driverRequirements.minExperience}
                    onChange={(e) => setDriverRequirements({...driverRequirements, minExperience: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-sm"
                    style={{ '--tw-ring-color': '#5699D2' } as any}
                  />
                </div>

                <div className="space-y-2.5 pt-1">
                  <label className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={driverRequirements.backgroundCheck}
                      onChange={(e) => setDriverRequirements({...driverRequirements, backgroundCheck: e.target.checked})}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#5699D2' }}
                    />
                    <span className="text-gray-700 text-sm">Background Check Required</span>
                  </label>

                  <label className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={driverRequirements.drivingRecord}
                      onChange={(e) => setDriverRequirements({...driverRequirements, drivingRecord: e.target.checked})}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#5699D2' }}
                    />
                    <span className="text-gray-700 text-sm">Clean Driving Record Required</span>
                  </label>

                  <label className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={driverRequirements.vehicleInspection}
                      onChange={(e) => setDriverRequirements({...driverRequirements, vehicleInspection: e.target.checked})}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#5699D2' }}
                    />
                    <span className="text-gray-700 text-sm">Vehicle Safety Inspection Required</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveSettings}
              className="w-full text-white py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm text-sm"
              style={{ background: '#5699D2' }}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="p-4 space-y-3">
            {/* Add New Admin Button */}
            <button 
              onClick={() => toast.info('Add New Admin', { description: 'This feature would open a form to add a new administrator' })}
              className="w-full text-white py-2.5 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm text-sm" 
              style={{ background: '#5699D2' }}
            >
              <Users className="w-4 h-4" />
              Add New Admin
            </button>

            {/* Existing Admins */}
            {adminRoles.map((admin) => (
              <div key={admin.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E0F7FA', color: '#2F6F9F' }}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 text-sm">{admin.name}</h4>
                    <p className="text-gray-500 text-xs truncate">{admin.email}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <p className="text-gray-600 text-xs">Permissions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {admin.permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 rounded-full text-xs"
                        style={{ backgroundColor: '#E0F7FA', color: '#2F6F9F' }}
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs mt-1.5">Created: {admin.createdDate}</p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => toast.info('Edit Permissions', { description: `Modify ${admin.name}'s access rights` })}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-xs active:scale-[0.98] transition-all"
                  >
                    Edit Permissions
                  </button>
                  {admin.id !== 1 && (
                    <button 
                      onClick={() => toast.success(`${admin.name} removed`)}
                      className="px-3 bg-red-100 text-red-700 py-2 rounded-lg text-xs active:scale-[0.98] transition-all"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="p-4 space-y-3">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-100">
                <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 text-sm">App Content</h3>
                  <p className="text-gray-500 text-xs">Manage FAQs, terms, and info</p>
                </div>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => toast.info('Edit FAQ Content')}
                  className="w-full text-left px-3 py-2.5 bg-gray-50 rounded-lg flex items-center justify-between active:scale-[0.98] transition-all"
                >
                  <span className="text-gray-700 text-sm">Edit FAQ Content</span>
                  <FileText className="w-4 h-4 text-gray-400" />
                </button>

                <button 
                  onClick={() => toast.info('Update Terms of Service')}
                  className="w-full text-left px-3 py-2.5 bg-gray-50 rounded-lg flex items-center justify-between active:scale-[0.98] transition-all"
                >
                  <span className="text-gray-700 text-sm">Update Terms of Service</span>
                  <FileText className="w-4 h-4 text-gray-400" />
                </button>

                <button 
                  onClick={() => toast.info('Update Privacy Policy')}
                  className="w-full text-left px-3 py-2.5 bg-gray-50 rounded-lg flex items-center justify-between active:scale-[0.98] transition-all"
                >
                  <span className="text-gray-700 text-sm">Update Privacy Policy</span>
                  <FileText className="w-4 h-4 text-gray-400" />
                </button>

                <button 
                  onClick={() => toast.info('Manage Contact Information')}
                  className="w-full text-left px-3 py-2.5 bg-gray-50 rounded-lg flex items-center justify-between active:scale-[0.98] transition-all"
                >
                  <span className="text-gray-700 text-sm">Manage Contact Info</span>
                  <FileText className="w-4 h-4 text-gray-400" />
                </button>

                <button 
                  onClick={() => toast.info('Edit Welcome Messages')}
                  className="w-full text-left px-3 py-2.5 bg-gray-50 rounded-lg flex items-center justify-between active:scale-[0.98] transition-all"
                >
                  <span className="text-gray-700 text-sm">Edit Welcome Messages</span>
                  <FileText className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}