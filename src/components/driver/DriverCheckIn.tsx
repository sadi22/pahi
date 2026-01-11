import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Search, User, CheckCircle, XCircle, Clock, Shield, ArrowLeft } from 'lucide-react';

interface DriverCheckInProps {
  onBack: () => void;
}

export default function DriverCheckIn({ onBack }: DriverCheckInProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedInChildren, setCheckedInChildren] = useState<number[]>([]);

  const scheduledChildren = [
    { id: 1, name: 'Emma Johnson', studentId: 'WPS-001', time: '08:15 AM', hasPhone: false },
    { id: 2, name: 'Liam Smith', studentId: 'WPS-002', time: '08:20 AM', hasPhone: true },
    { id: 3, name: 'Olivia Brown', studentId: 'WPS-003', time: '08:25 AM', hasPhone: false },
    { id: 4, name: 'Noah Williams', studentId: 'WPS-004', time: '08:30 AM', hasPhone: false },
    { id: 5, name: 'Ava Davis', studentId: 'WPS-005', time: '08:35 AM', hasPhone: true },
    { id: 6, name: 'James Wilson', studentId: 'WPS-006', time: '08:40 AM', hasPhone: false }
  ];

  const filteredChildren = scheduledChildren.filter(child =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckIn = (childId: number) => {
    if (checkedInChildren.includes(childId)) {
      setCheckedInChildren(checkedInChildren.filter(id => id !== childId));
    } else {
      setCheckedInChildren([...checkedInChildren, childId]);
    }
  };

  const isCheckedIn = (childId: number) => checkedInChildren.includes(childId);

  const handleConfirmAll = () => {
    // Show success message or navigate
    toast.success(`Check-in confirmed!`, { description: `Successfully confirmed ${checkedInChildren.length} children` });
    // You could also navigate back or clear the list
    // setCheckedInChildren([]);
  };

  return (
    <div className="px-4 py-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-gray-900 mb-2">Child Check-In</h3>
        <p className="text-gray-600 text-sm">Register children boarding the vehicle</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-900 mb-1">Check-In Requirement</p>
            <p className="text-blue-700 text-sm">
              For children without phones, please check them in using their Student ID or name before starting the ride.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or student ID..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Check-In Summary */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Checked In</p>
          </div>
          <p className="text-gray-900">{checkedInChildren.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-gray-600 text-sm">Pending</p>
          </div>
          <p className="text-gray-900">{scheduledChildren.length - checkedInChildren.length}</p>
        </div>
      </div>

      {/* Children List */}
      <div className="space-y-3">
        {filteredChildren.length > 0 ? (
          filteredChildren.map((child) => (
            <div
              key={child.id}
              className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${
                isCheckedIn(child.id)
                  ? 'border-green-500'
                  : 'border-transparent'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCheckedIn(child.id)
                    ? 'bg-green-500'
                    : 'bg-gradient-to-br from-blue-500 to-blue-600'
                }`}>
                  {isCheckedIn(child.id) ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-900 mb-1">{child.name}</p>
                      <p className="text-gray-600 text-sm">ID: {child.studentId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm mb-1">{child.time}</p>
                      {!child.hasPhone && (
                        <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">
                          No Phone
                        </span>
                      )}
                    </div>
                  </div>

                  {isCheckedIn(child.id) ? (
                    <button
                      onClick={() => handleCheckIn(child.id)}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Remove Check-In
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCheckIn(child.id)}
                      className="w-full flex items-center justify-center gap-2 text-white py-2.5 rounded-lg transition-colors"
                      style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Check In Child
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-900 mb-1">No children found</p>
            <p className="text-gray-500 text-sm">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {checkedInChildren.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-900">{checkedInChildren.length} children checked in</p>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <button
              onClick={handleConfirmAll}
              className="w-full text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
            >
              Confirm All Check-Ins
            </button>
          </div>
        </div>
      )}
    </div>
  );
}