import { Shield, AlertTriangle, Clock, CheckCircle, Send, AlertCircle, ArrowLeft, Bell, LogOut, User, Calendar } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { COLORS, TYPOGRAPHY, GRADIENTS, RADIUS, BUTTON } from '../../constants/designSystem';
import PageHeader from '../shared/PageHeader';
import ConfirmDialog from '../ConfirmDialog';
import { formatDate } from '../../utils/dateFormatter';

interface SafetyOversightProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export default function SafetyOversight({ onBack, onNavigate, onLogout }: SafetyOversightProps) {
  const [activeTab, setActiveTab] = useState<'incidents' | 'alerts'>('incidents');
  const [alertMessage, setAlertMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; incidentId: number; description: string }>({
    show: false,
    incidentId: 0,
    description: ''
  });

  const [incidentsData, setIncidentsData] = useState([
    {
      id: 1,
      type: 'complaint',
      title: 'Late pickup reported',
      description: 'Driver was 10 minutes late for pickup',
      reporter: 'Rachel Mitchell',
      driver: 'Mike Kereama',
      date: '20 Mar 2024',
      status: 'resolved',
      priority: 'low'
    },
    {
      id: 2,
      type: 'incident',
      title: 'Route deviation',
      description: 'Driver took different route than planned',
      reporter: 'System Auto-detect',
      driver: 'Mike Kereama',
      date: '19 Mar 2024',
      status: 'reviewed',
      priority: 'medium'
    }
  ]);

  const handleResolve = (incidentId: number) => {
    setIncidentsData(prev => prev.map(inc => 
      inc.id === incidentId ? { ...inc, status: 'resolved' } : inc
    ));
    toast.success('Incident marked as resolved');
  };

  const handleDelete = () => {
    setIncidentsData(prev => prev.filter(inc => inc.id !== deleteConfirm.incidentId));
    setDeleteConfirm({ show: false, incidentId: 0, description: '' });
    toast.success('Incident deleted');
  };

  const handleSendAlert = () => {
    if (!alertMessage.trim()) {
      toast.error('Please enter an alert message');
      return;
    }
    toast.success('Emergency alert sent to all users');
    setAlertMessage('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return { bg: '#fee2e2', text: '#ef4444' };
      case 'medium': return { bg: '#fef3c7', text: '#f59e0b' };
      default: return { bg: '#e0f2fe', text: '#3b82f6' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return { bg: '#ecfdf5', text: '#10b981' };
      case 'reviewed': return { bg: '#eff6ff', text: '#3b82f6' };
      default: return { bg: '#fef3c7', text: '#f59e0b' };
    }
  };

  return (
    <div className="h-screen bg-gray-50 pb-24 overflow-y-auto">
      <ConfirmDialog
        isOpen={deleteConfirm.show}
        title="Delete Incident"
        message={`Are you sure you want to delete this incident: "${deleteConfirm.description}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm({ show: false, incidentId: 0, description: '' })}
        variant="danger"
      />

      {/* Clean Header */}
      <PageHeader
        title="Safety Oversight"
        subtitle="Monitor incidents and send alerts"
        icon={<Shield className="w-6 h-6 text-white" />}
        onBack={onBack}
        onLogout={onLogout}
      />

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-5 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('incidents')}
            className="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all text-white"
            style={activeTab === 'incidents' ? { 
              background: GRADIENTS.primary 
            } : { 
              background: '#f3f4f6',
              color: '#4b5563'
            }}
          >
            Incidents ({incidentsData.length})
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all text-white"
            style={activeTab === 'alerts' ? { 
              background: GRADIENTS.primary 
            } : { 
              background: '#f3f4f6',
              color: '#4b5563'
            }}
          >
            Send Alert
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-5 pb-24">
        {activeTab === 'incidents' ? (
          <div className="space-y-3">
            {incidentsData.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No incidents reported</p>
              </div>
            ) : (
              incidentsData.map((incident) => {
                const priorityStyle = getPriorityColor(incident.priority);
                const statusStyle = getStatusColor(incident.status);
                
                return (
                  <div key={incident.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-semibold mb-1">
                          {incident.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {incident.description}
                        </p>
                      </div>
                      <span 
                        className="px-2.5 py-1 rounded-full text-xs font-semibold ml-2 flex-shrink-0"
                        style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.text }}
                      >
                        {incident.priority.toUpperCase()}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-3.5 h-3.5" />
                        <span>Reporter: {incident.reporter}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-3.5 h-3.5" />
                        <span>Driver: {incident.driver}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(incident.date)}</span>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                      >
                        {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </span>
                      
                      {incident.status === 'pending' && (
                        <button
                          onClick={() => handleResolve(incident.id)}
                          className="ml-auto px-4 py-1.5 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors active:scale-95"
                        >
                          Resolve
                        </button>
                      )}
                      
                      <button
                        onClick={() => setDeleteConfirm({ 
                          show: true, 
                          incidentId: incident.id, 
                          description: incident.title 
                        })}
                        className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors active:scale-95"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Alert Composer */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-500" />
                Emergency Alert
              </h3>
              
              <textarea
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                placeholder="Type your alert message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={5}
              />

              <button
                onClick={handleSendAlert}
                className="w-full mt-3 bg-orange-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors active:scale-95"
              >
                <Send className="w-5 h-5" />
                Send Alert to All Users
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900 font-semibold text-sm mb-1">
                    Alert Guidelines
                  </p>
                  <p className="text-blue-700 text-xs">
                    Emergency alerts will be sent to all caregivers, drivers, and school contacts. 
                    Use only for urgent safety matters requiring immediate attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}