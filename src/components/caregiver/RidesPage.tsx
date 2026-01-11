import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Plus, Baby, School, MapPin, Calendar, Clock, User, Phone, Trash2, Edit } from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';

interface RidesPageProps {
  onNavigate: (page: string) => void;
  onRideBooked?: (rideData: any) => void;
}

export default function RidesPage({ onNavigate, onRideBooked }: RidesPageProps) {
  const [activeTab, setActiveTab] = useState<'children' | 'book'>('children');
  const [showAddChild, setShowAddChild] = useState(false);
  const [showBookRide, setShowBookRide] = useState(false);
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [school, setSchool] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [rideDate, setRideDate] = useState('');
  const [rideType, setRideType] = useState<'pickup' | 'dropoff'>('pickup');
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; childId: number; childName: string }>({
    show: false,
    childId: 0,
    childName: ''
  });

  const [childrenData, setChildrenData] = useState([
    { id: 1, name: 'Emma Johnson', age: 8, school: 'Wairoa Primary School', emergencyContact: '021 234 5678' },
    { id: 2, name: 'Liam Johnson', age: 6, school: 'Wairoa Primary School', emergencyContact: '021 234 5678' },
  ]);

  const handleAddChild = () => {
    if (childName && childAge && school) {
      const newChild = {
        id: childrenData.length + 1,
        name: childName,
        age: parseInt(childAge),
        school,
        emergencyContact: '021 234 5678'
      };
      setChildrenData([...childrenData, newChild]);
      toast.success('Child added successfully', { description: `${childName} has been added` });
      setChildName('');
      setChildAge('');
      setSchool('');
      setShowAddChild(false);
    } else {
      toast.error('Please fill all fields');
    }
  };

  const handleDeleteChild = (childId: number) => {
    const child = childrenData.find(c => c.id === childId);
    if (child) {
      setConfirmDelete({ show: true, childId, childName: child.name });
    }
  };

  const confirmDeleteChild = () => {
    setChildrenData(childrenData.filter(c => c.id !== confirmDelete.childId));
    toast.success('Child removed');
    setConfirmDelete({ show: false, childId: 0, childName: '' });
  };

  const handleBookRide = () => {
    if (selectedChild && pickupAddress && pickupTime && rideDate) {
      toast.success('Ride booked successfully!', { 
        description: `Ride for ${selectedChild} on ${rideDate} at ${pickupTime}` 
      });
      setSelectedChild('');
      setPickupAddress('');
      setPickupTime('');
      setRideDate('');
      setShowBookRide(false);
      if (onRideBooked) {
        onRideBooked({
          childName: selectedChild,
          pickupAddress,
          pickupTime,
          rideDate,
          rideType
        });
      }
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={confirmDelete.show}
        title="Remove Child?"
        message={`Are you sure you want to remove ${confirmDelete.childName}? This action cannot be undone.`}
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={confirmDeleteChild}
        onCancel={() => setConfirmDelete({ show: false, childId: 0, childName: '' })}
        variant="danger"
      />

      {/* Header */}
      <div className="px-6 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <h1 className="text-white text-2xl mb-1">Rides & Children</h1>
        <p className="text-white/90">Manage your children and book rides</p>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4">
        <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('children')}
            className="flex-1 py-3 rounded-lg transition-all active:scale-95"
            style={{
              backgroundColor: activeTab === 'children' ? '#E0F7FA' : 'transparent',
              color: activeTab === 'children' ? '#2F6F9F' : '#6B7280',
              fontWeight: activeTab === 'children' ? 600 : 400
            }}
          >
            My Children
          </button>
          <button
            onClick={() => setActiveTab('book')}
            className="flex-1 py-3 rounded-lg transition-all active:scale-95"
            style={{
              backgroundColor: activeTab === 'book' ? '#E0F7FA' : 'transparent',
              color: activeTab === 'book' ? '#2F6F9F' : '#6B7280',
              fontWeight: activeTab === 'book' ? 600 : 400
            }}
          >
            Book Ride
          </button>
        </div>
      </div>

      {/* Children Tab */}
      {activeTab === 'children' && (
        <div className="px-6 py-6 space-y-4">
          {/* Add Child Button */}
          <button
            onClick={() => setShowAddChild(!showAddChild)}
            className="w-full py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md text-white"
            style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
          >
            <Plus className="w-5 h-5" />
            Add New Child
          </button>

          {/* Add Child Form */}
          {showAddChild && (
            <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-gray-900 font-medium">Add New Child</h3>
              
              <div>
                <label className="block text-gray-700 text-sm mb-2">Child's Name</label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Enter child's name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Age</label>
                <input
                  type="number"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  placeholder="Enter age"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">School</label>
                <select
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                >
                  <option value="">Select school</option>
                  <option value="Wairoa Primary School">Wairoa Primary School</option>
                  <option value="Wairoa College">Wairoa College</option>
                  <option value="Te Kura Kaupapa Māori o Wairoa">Te Kura Kaupapa Māori o Wairoa</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddChild}
                  className="flex-1 py-3 text-white rounded-lg active:scale-[0.98] transition-all"
                  style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
                >
                  Add Child
                </button>
                <button
                  onClick={() => setShowAddChild(false)}
                  className="px-6 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Children List */}
          {childrenData.map((child) => (
            <div key={child.id} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E0F7FA' }}>
                  <Baby className="w-6 h-6" style={{ color: '#2F6F9F' }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 font-medium">{child.name}</h3>
                  <p className="text-gray-500 text-sm">{child.age} years old</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <School className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{child.school}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{child.emergencyContact}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toast.info('Edit child', { description: 'Edit functionality coming soon' })}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 active:scale-[0.98] transition-all"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteChild(child.id)}
                  className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg flex items-center justify-center gap-2 hover:bg-red-100 active:scale-[0.98] transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Book Ride Tab */}
      {activeTab === 'book' && (
        <div className="px-6 py-6 space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-gray-900 font-medium">Book a New Ride</h3>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Select Child</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
              >
                <option value="">Choose a child</option>
                {childrenData.map((child) => (
                  <option key={child.id} value={child.name}>{child.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Ride Type</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setRideType('pickup')}
                  className="flex-1 py-3 rounded-lg transition-all active:scale-95 border-2"
                  style={{
                    backgroundColor: rideType === 'pickup' ? '#E0F7FA' : 'white',
                    borderColor: rideType === 'pickup' ? '#2F6F9F' : '#E5E7EB',
                    color: rideType === 'pickup' ? '#2F6F9F' : '#6B7280'
                  }}
                >
                  Pickup (To School)
                </button>
                <button
                  onClick={() => setRideType('dropoff')}
                  className="flex-1 py-3 rounded-lg transition-all active:scale-95 border-2"
                  style={{
                    backgroundColor: rideType === 'dropoff' ? '#E0F7FA' : 'white',
                    borderColor: rideType === 'dropoff' ? '#2F6F9F' : '#E5E7EB',
                    color: rideType === 'dropoff' ? '#2F6F9F' : '#6B7280'
                  }}
                >
                  Dropoff (From School)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">
                {rideType === 'pickup' ? 'Pickup' : 'Dropoff'} Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Enter home address"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={rideDate}
                  onChange={(e) => setRideDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2F6F9F]"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <User className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Your Driver</p>
                  <p className="text-sm text-gray-600">Mike Kereama - Toyota Hiace (ABC123)</p>
                  <p className="text-xs text-gray-500 mt-1">Certified community driver</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleBookRide}
              className="w-full py-4 text-white rounded-xl active:scale-[0.98] transition-all shadow-md"
              style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
            >
              Book Ride
            </button>
          </div>
        </div>
      )}
    </div>
  );
}