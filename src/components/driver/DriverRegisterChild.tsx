import { useState } from 'react';
import { UserPlus, User, Phone, MapPin, ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DriverRegisterChildProps {
  onBack: () => void;
  onRegister: (childData: any) => void;
}

export default function DriverRegisterChild({ onBack, onRegister }: DriverRegisterChildProps) {
  const [formData, setFormData] = useState({
    childName: '',
    school: 'Wairoa Primary School',
    pickupAddress: '',
    caregiverName: '',
    caregiverPhone: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.childName || !formData.pickupAddress || !formData.caregiverName || !formData.caregiverPhone) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Call the onRegister callback with the child data
    onRegister(formData);
    
    toast.success(`✅ ${formData.childName} has been registered successfully! Redirecting to children list...`);
    
    // Reset form
    setFormData({
      childName: '',
      school: 'Wairoa Primary School',
      pickupAddress: '',
      caregiverName: '',
      caregiverPhone: '',
    });
  };

  return (
    <div className="px-4 py-4 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
          <UserPlus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="mb-0 text-gray-900">Register New Child</h2>
          <p className="text-gray-600 text-sm">Add a child to the Pahi system</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Child Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" style={{ color: '#2F6F9F' }} />
            Child Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Child's Full Name *
              </label>
              <input
                type="text"
                value={formData.childName}
                onChange={(e) => handleInputChange('childName', e.target.value)}
                placeholder="Enter child's name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 text-gray-900"
                style={{ focusRing: '#2F6F9F' }}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                School
              </label>
              <select
                value={formData.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 text-gray-900"
                style={{ focusRing: '#2F6F9F' }}
              >
                <option>Wairoa Primary School</option>
                <option>Lincoln Middle School</option>
                <option>Wairoa College</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Pickup Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.pickupAddress}
                  onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                  placeholder="123 Main St, Wairoa"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 text-gray-900"
                  style={{ focusRing: '#2F6F9F' }}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Caregiver Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" style={{ color: '#2F6F9F' }} />
            Caregiver Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Caregiver Name *
              </label>
              <input
                type="text"
                value={formData.caregiverName}
                onChange={(e) => handleInputChange('caregiverName', e.target.value)}
                placeholder="Enter caregiver's name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 text-gray-900"
                style={{ focusRing: '#2F6F9F' }}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.caregiverPhone}
                  onChange={(e) => handleInputChange('caregiverPhone', e.target.value)}
                  placeholder="027 123 4567"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 text-gray-900"
                  style={{ focusRing: '#2F6F9F' }}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
        >
          <Save className="w-5 h-5" />
          Register Child
        </button>
      </form>
    </div>
  );
}