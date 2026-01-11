import { MessageSquare, Star, CheckCircle, XCircle, Eye, User, Calendar, Clock, Filter, ArrowLeft, Bell, LogOut, X } from 'lucide-react';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useState } from 'react';
import { COLORS, TYPOGRAPHY, GRADIENTS, RADIUS, BUTTON } from '../../constants/designSystem';
import PageHeader from '../shared/PageHeader';
import { formatDate, formatTime } from '../../utils/dateFormatter';
import { toast } from 'sonner';

interface FeedbackManagementProps {
  onNavigate: (page: string) => void;
}

export default function FeedbackManagement({ onNavigate }: FeedbackManagementProps) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');
  
  const { feedbacks, updateFeedbackStatus } = useFeedback();
  
  // Filter feedbacks
  const filteredFeedback = feedbacks.filter(f => {
    const categoryMatch = filterCategory === 'all' || f.type === filterCategory;
    const statusMatch = filterStatus === 'all' || f.status === filterStatus;
    return categoryMatch && statusMatch;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      driver: '#10B981',
      app: '#3B82F6',
      general: '#8B5CF6',
      ride: '#F59E0B'
    };
    return colors[category] || '#6B7280';
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: { bg: '#FEF3C7', text: '#92400E', label: 'Pending' },
      reviewed: { bg: '#DBEAFE', text: '#1E40AF', label: 'Reviewed' },
      resolved: { bg: '#D1FAE5', text: '#065F46', label: 'Resolved' }
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const handleUpdateStatus = (newStatus: 'pending' | 'reviewed' | 'resolved') => {
    if (!selectedFeedback) return;
    
    updateFeedbackStatus(selectedFeedback.id, newStatus, adminNotes || undefined);
    toast.success(`Feedback marked as ${newStatus}`);
    setSelectedFeedback(null);
    setAdminNotes('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <PageHeader
        title="Feedback Management"
        subtitle="Review user feedback and suggestions"
        onBack={() => onNavigate('admin')}
      />

      {/* Stats Summary */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold" style={{ color: '#2F6F9F' }}>
              {feedbacks.length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Total</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {feedbacks.filter(f => f.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Pending</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {feedbacks.filter(f => f.status === 'resolved').length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Resolved</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-2 space-y-3">
        {/* Category Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Category:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'general', 'driver', 'app', 'ride'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className="px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all active:scale-95"
                style={{
                  backgroundColor: filterCategory === cat ? '#E0F7FA' : '#FFFFFF',
                  color: filterCategory === cat ? '#2F6F9F' : '#6B7280',
                  fontWeight: filterCategory === cat ? 600 : 400,
                  border: `2px solid ${filterCategory === cat ? '#2F6F9F' : '#E5E7EB'}`
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Status:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'pending', 'reviewed', 'resolved'].map((stat) => (
              <button
                key={stat}
                onClick={() => setFilterStatus(stat)}
                className="px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all active:scale-95"
                style={{
                  backgroundColor: filterStatus === stat ? '#E0F7FA' : '#FFFFFF',
                  color: filterStatus === stat ? '#2F6F9F' : '#6B7280',
                  fontWeight: filterStatus === stat ? 600 : 400,
                  border: `2px solid ${filterStatus === stat ? '#2F6F9F' : '#E5E7EB'}`
                }}
              >
                {stat.charAt(0).toUpperCase() + stat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="px-6 py-4 space-y-3">
        {filteredFeedback.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No feedback matches your filters</p>
          </div>
        ) : (
          filteredFeedback.map((item) => {
            const statusInfo = getStatusBadge(item.status);
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedFeedback(item);
                  setAdminNotes(item.adminNotes || '');
                }}
                className="w-full bg-white rounded-xl p-4 shadow-sm text-left active:scale-[0.98] transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E0F7FA' }}>
                      <User className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.caregiverName}</p>
                      <p className="text-xs text-gray-500">Caregiver</p>
                    </div>
                  </div>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: statusInfo.bg, color: statusInfo.text }}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                {/* Subject & Category */}
                <div className="mb-2">
                  <p className="font-semibold text-gray-900 mb-1">{item.subject}</p>
                  <span 
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: getCategoryColor(item.type) + '20',
                      color: getCategoryColor(item.type)
                    }}
                  >
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>

                {/* Message Preview */}
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {item.message}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.createdAt)} at {formatTime(item.createdAt)}
                  </div>
                  {item.driverName && (
                    <span className="text-xs text-gray-500">Re: {item.driverName}</span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fadeIn">
          <div 
            className="bg-white w-full rounded-t-3xl overflow-hidden animate-slideUp"
            style={{ maxHeight: '85vh' }}
          >
            {/* Modal Header */}
            <div className="px-5 pt-5 pb-4" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-xl font-semibold">
                  Feedback Details
                </h2>
                <button
                  onClick={() => {
                    setSelectedFeedback(null);
                    setAdminNotes('');
                  }}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-5 space-y-4" style={{ maxHeight: 'calc(85vh - 80px)' }}>
              {/* User Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E0F7FA' }}>
                    <User className="w-6 h-6" style={{ color: '#2F6F9F' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedFeedback.caregiverName}</p>
                    <p className="text-sm text-gray-500">Caregiver</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatDate(selectedFeedback.createdAt)} at {formatTime(selectedFeedback.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Status</p>
                <span 
                  className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium"
                  style={{ 
                    backgroundColor: getStatusBadge(selectedFeedback.status).bg,
                    color: getStatusBadge(selectedFeedback.status).text
                  }}
                >
                  {getStatusBadge(selectedFeedback.status).label}
                </span>
              </div>

              {/* Category & Subject */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Category & Subject</p>
                <div className="space-y-2">
                  <span 
                    className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium"
                    style={{ 
                      backgroundColor: getCategoryColor(selectedFeedback.type) + '20',
                      color: getCategoryColor(selectedFeedback.type)
                    }}
                  >
                    {selectedFeedback.type.charAt(0).toUpperCase() + selectedFeedback.type.slice(1)}
                  </span>
                  <p className="font-semibold text-gray-900">{selectedFeedback.subject}</p>
                </div>
              </div>

              {/* Driver Info (if applicable) */}
              {selectedFeedback.driverName && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Related Driver</p>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-3">
                    <p className="text-gray-900 font-medium">{selectedFeedback.driverName}</p>
                  </div>
                </div>
              )}

              {/* Feedback Message */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Message</p>
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <p className="text-gray-900" style={{ lineHeight: '1.6' }}>
                    {selectedFeedback.message}
                  </p>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Admin Notes</p>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
                  rows={4}
                  placeholder="Add internal notes about this feedback..."
                />
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdateStatus('reviewed')}
                    className="flex-1 py-3 rounded-xl text-white font-semibold active:scale-95 transition-all"
                    style={{ backgroundColor: '#3B82F6' }}
                  >
                    Mark Reviewed
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('resolved')}
                    className="flex-1 py-3 rounded-xl text-white font-semibold active:scale-95 transition-all"
                    style={{ backgroundColor: '#10B981' }}
                  >
                    Mark Resolved
                  </button>
                </div>
                <button
                  onClick={() => {
                    setSelectedFeedback(null);
                    setAdminNotes('');
                  }}
                  className="w-full py-3 rounded-xl border-2 text-gray-700 font-semibold active:scale-95 transition-all"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}