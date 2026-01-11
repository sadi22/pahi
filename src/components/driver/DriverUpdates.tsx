import { useState } from 'react';
import { MessageSquare, Send, Clock, AlertTriangle, Info, CheckCircle, Users, ArrowLeft } from 'lucide-react';

interface DriverUpdatesProps {
  onBack: () => void;
}

export default function DriverUpdates({ onBack }: DriverUpdatesProps) {
  const [updateType, setUpdateType] = useState<'delay' | 'issue' | 'info'>('delay');
  const [message, setMessage] = useState('');
  const [selectedChildren, setSelectedChildren] = useState<number[]>([]);
  const [sent, setSent] = useState(false);

  const scheduledChildren = [
    { id: 1, name: 'Emma Johnson', caregiver: 'Sarah Johnson' },
    { id: 2, name: 'Liam Smith', caregiver: 'Tom Smith' },
    { id: 3, name: 'Olivia Brown', caregiver: 'Jane Brown' },
    { id: 4, name: 'Noah Williams', caregiver: 'Tom Williams' },
    { id: 5, name: 'Ava Davis', caregiver: 'Mike Davis' }
  ];

  const quickMessages = {
    delay: [
      'Running 5 minutes late due to traffic',
      'Running 10 minutes late due to traffic',
      'Slight delay - will arrive in 15 minutes',
      'Weather delay - running 10 minutes behind'
    ],
    issue: [
      'Vehicle breakdown - arranging alternative transport',
      'Road closure - taking alternative route',
      'Emergency stop required - will update shortly',
      'Safety concern - ride temporarily paused'
    ],
    info: [
      'On schedule - arriving as planned',
      'Child picked up successfully',
      'Approaching drop-off location',
      'Ride completed - all children safely dropped off'
    ]
  };

  const toggleChild = (childId: number) => {
    if (selectedChildren.includes(childId)) {
      setSelectedChildren(selectedChildren.filter(id => id !== childId));
    } else {
      setSelectedChildren([...selectedChildren, childId]);
    }
  };

  const selectAll = () => {
    if (selectedChildren.length === scheduledChildren.length) {
      setSelectedChildren([]);
    } else {
      setSelectedChildren(scheduledChildren.map(c => c.id));
    }
  };

  const handleSend = () => {
    if (message.trim() && selectedChildren.length > 0) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setMessage('');
        setSelectedChildren([]);
      }, 3000);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'delay':
        return { bg: 'bg-yellow-500', text: 'text-yellow-700', lightBg: 'bg-yellow-50', border: 'border-yellow-200' };
      case 'issue':
        return { bg: 'bg-red-500', text: 'text-red-700', lightBg: 'bg-red-50', border: 'border-red-200' };
      case 'info':
        return { bg: 'bg-blue-500', text: 'text-blue-700', lightBg: 'bg-blue-50', border: 'border-blue-200' };
      default:
        return { bg: 'bg-gray-500', text: 'text-gray-700', lightBg: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'delay':
        return <Clock className="w-5 h-5" />;
      case 'issue':
        return <AlertTriangle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const colors = getTypeColor(updateType);

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-gray-900 mb-2">Send Updates</h3>
        <p className="text-gray-600 text-sm">Notify caregivers about ride status or issues</p>
      </div>

      {/* Success Message */}
      {sent && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-green-900">Update sent successfully!</p>
            <p className="text-green-700 text-sm">{selectedChildren.length} caregiver(s) notified</p>
          </div>
        </div>
      )}

      {/* Update Type Selection */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <p className="text-gray-900 mb-3">Update Type</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setUpdateType('delay')}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
              updateType === 'delay'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <Clock className={`w-6 h-6 ${updateType === 'delay' ? 'text-yellow-600' : 'text-gray-400'}`} />
            <p className={`text-xs ${updateType === 'delay' ? 'text-yellow-700' : 'text-gray-600'}`}>Delay</p>
          </button>
          <button
            onClick={() => setUpdateType('issue')}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
              updateType === 'issue'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <AlertTriangle className={`w-6 h-6 ${updateType === 'issue' ? 'text-red-600' : 'text-gray-400'}`} />
            <p className={`text-xs ${updateType === 'issue' ? 'text-red-700' : 'text-gray-600'}`}>Issue</p>
          </button>
          <button
            onClick={() => setUpdateType('info')}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
              updateType === 'info'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <Info className={`w-6 h-6 ${updateType === 'info' ? 'text-blue-600' : 'text-gray-400'}`} />
            <p className={`text-xs ${updateType === 'info' ? 'text-blue-700' : 'text-gray-600'}`}>Info</p>
          </button>
        </div>
      </div>

      {/* Quick Message Templates */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <p className="text-gray-900 mb-3">Quick Messages</p>
        <div className="space-y-2">
          {quickMessages[updateType].map((template, index) => (
            <button
              key={index}
              onClick={() => setMessage(template)}
              className={`w-full text-left p-3 rounded-lg border ${colors.border} ${colors.lightBg} hover:opacity-80 transition-opacity`}
            >
              <p className={`text-sm ${colors.text}`}>{template}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Message */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <p className="text-gray-900 mb-3">Custom Message</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your custom message here..."
          rows={4}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Select Recipients */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-900">Select Recipients</p>
          <button
            onClick={selectAll}
            className="text-blue-600 text-sm"
          >
            {selectedChildren.length === scheduledChildren.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="space-y-2">
          {scheduledChildren.map((child) => (
            <button
              key={child.id}
              onClick={() => toggleChild(child.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                selectedChildren.includes(child.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                selectedChildren.includes(child.id)
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selectedChildren.includes(child.id) && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900 text-sm">{child.name}</p>
                <p className="text-gray-500 text-xs">Notify: {child.caregiver}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Send Button */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-gray-500" />
          <p className="text-gray-600 text-sm">
            {selectedChildren.length === 0 
              ? 'No recipients selected' 
              : `${selectedChildren.length} caregiver(s) will be notified`}
          </p>
        </div>
        <button
          onClick={handleSend}
          disabled={!message.trim() || selectedChildren.length === 0}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
            !message.trim() || selectedChildren.length === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'text-white'
          }`}
          style={message.trim() && selectedChildren.length > 0 ? { background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' } : {}}
        >
          <Send className="w-4 h-4" />
          Send Update to Caregivers
        </button>
      </div>

      {/* Recent Updates */}
      <div className="mt-6">
        <h3 className="text-gray-900 mb-3">Recent Updates Sent</h3>
        <div className="space-y-2">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm mb-1">Running 5 minutes late due to traffic</p>
                <p className="text-gray-500 text-xs">Sent to 3 caregivers • 10 mins ago</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm mb-1">On schedule - arriving as planned</p>
                <p className="text-gray-500 text-xs">Sent to 5 caregivers • 1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={onBack}
          className="text-blue-600 text-sm"
        >
          <ArrowLeft className="w-4 h-4 inline-block mr-1" />
          Back
        </button>
      </div>
    </div>
  );
}