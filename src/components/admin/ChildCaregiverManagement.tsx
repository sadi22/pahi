import { useState } from 'react';
import { Users, Baby, School, UserCheck, UserX, Check, X, Search, GraduationCap, MapPin, CheckCircle, XCircle, Mail, Phone, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { COLORS, TYPOGRAPHY, GRADIENTS, RADIUS, ICON, BUTTON } from '../../constants/designSystem';
import PageHeader from '../shared/PageHeader';
import ConfirmDialog from '../ConfirmDialog';
import ChildAvatar from '../ChildAvatar';

interface Child {
  id: string;
  name: string;
  age: number;
  year: string;
  school: string;
  initials: string;
  photoUrl?: string;
  isEmojiAvatar?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  caregiverName?: string;
  caregiverEmail?: string;
}

interface ChildCaregiverManagementProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
  children: Child[];
  setChildren: (children: Child[]) => void;
}

export default function ChildCaregiverManagement({ onBack, children, setChildren }: ChildCaregiverManagementProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'children' | 'schools'>('children');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{ 
    show: boolean; 
    action: string; 
    id: string;
    name: string 
  }>({
    show: false,
    action: '',
    id: '',
    name: ''
  });

  const [schoolsData, setSchoolsData] = useState([
    {
      id: 1,
      name: 'Wairoa Primary School',
      address: 'Marine Parade, Wairoa',
      contact: 'Principal Sarah Williams',
      email: 'office@wairoaps.school.nz',
      phone: '06 838 7200',
      students: 180,
      status: 'approved'
    },
    {
      id: 2,
      name: 'Wairoa College',
      address: 'Lucknow Street, Wairoa',
      contact: 'Principal David Thompson',
      email: 'admin@wairoac.school.nz',
      phone: '06 838 8581',
      students: 320,
      status: 'approved'
    },
    {
      id: 3,
      name: 'St Joseph\'s School',
      address: 'North Clyde, Wairoa',
      contact: 'Principal Mary O\'Connor',
      email: 'office@stjosephswairoa.school.nz',
      phone: '06 838 8369',
      students: 95,
      status: 'approved'
    },
    {
      id: 4,
      name: 'Te Kura Kaupapa Māori o Te Whānau a Apanui',
      address: 'Waerenga-a-Hika, Wairoa',
      contact: 'Tumuaki Hine Tawhara',
      email: 'office@tekurakaupapa.school.nz',
      phone: '06 838 7189',
      students: 75,
      status: 'approved'
    }
  ]);

  const handleApproveChild = (childId: string) => {
    const child = children.find(c => c.id === childId);
    setChildren(prev => prev.map(c => 
      c.id === childId ? { ...c, status: 'approved' } : c
    ));
    toast.success(`${child?.name} approved`);
    setConfirmDialog({ show: false, action: '', id: '', name: '' });
  };

  const handleRejectChild = (childId: string) => {
    const child = children.find(c => c.id === childId);
    setChildren(prev => prev.filter(c => c.id !== childId));
    toast.error(`${child?.name} rejected`);
    setConfirmDialog({ show: false, action: '', id: '', name: '' });
  };

  const handleApproveSchool = (schoolId: number) => {
    const school = schoolsData.find(s => s.id === schoolId);
    setSchoolsData(prev => prev.map(s => 
      s.id === schoolId ? { ...s, status: 'approved' } : s
    ));
    toast.success(`${school?.name} approved`);
    setConfirmDialog({ show: false, action: '', id: '', name: '' });
  };

  const handleRejectSchool = (schoolId: number) => {
    const school = schoolsData.find(s => s.id === schoolId);
    setSchoolsData(prev => prev.filter(s => s.id !== schoolId));
    toast.error(`${school?.name} rejected`);
    setConfirmDialog({ show: false, action: '', id: '', name: '' });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: { bg: '#ecfdf5', text: '#10b981', label: 'Approved' },
      pending: { bg: '#fef3c7', text: '#f59e0b', label: 'Pending' }
    };
    
    const style = styles[status as keyof typeof styles] || styles.pending;
    
    return (
      <span 
        className="px-2.5 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: style.bg, color: style.text }}
      >
        {style.label}
      </span>
    );
  };

  // Filter data based on search query and active tab
  const filteredPendingChildren = children
    .filter(c => c.status === 'pending')
    .filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.caregiverName && c.caregiverName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const filteredChildren = children.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.caregiverName && c.caregiverName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const approvedChildren = children.filter(c => c.status === 'approved');
  const filteredApprovedChildren = approvedChildren.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.caregiverName && c.caregiverName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredSchools = schoolsData.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50 pb-24 overflow-y-auto">
      <ConfirmDialog
        isOpen={confirmDialog.show}
        title={`${confirmDialog.action} ${activeTab === 'schools' ? 'School' : 'Child'}`}
        message={`Are you sure you want to ${confirmDialog.action.toLowerCase()} ${confirmDialog.name}?`}
        confirmText={confirmDialog.action}
        cancelText="Cancel"
        onConfirm={() => {
          if (activeTab === 'schools') {
            if (confirmDialog.action === 'Approve') handleApproveSchool(parseInt(confirmDialog.id));
            else handleRejectSchool(parseInt(confirmDialog.id));
          } else {
            if (confirmDialog.action === 'Approve') handleApproveChild(confirmDialog.id);
            else handleRejectChild(confirmDialog.id);
          }
        }}
        onCancel={() => setConfirmDialog({ show: false, action: '', id: '', name: '' })}
        variant={confirmDialog.action === 'Reject' ? 'danger' : 'info'}
      />

      {/* Clean Header */}
      <PageHeader
        onBack={onBack}
        title="Children & Schools"
        subtitle="Verify children and approve schools"
        color={COLORS.BLUE}
      />

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-5 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('children')}
            className="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all"
            style={activeTab === 'children' ? { 
              background: GRADIENTS.primary,
              color: COLORS.white
            } : { 
              background: '#f3f4f6',
              color: '#4b5563'
            }}
          >
            Children ({approvedChildren.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all"
            style={activeTab === 'pending' ? { 
              background: GRADIENTS.primary,
              color: COLORS.white
            } : { 
              background: '#f3f4f6',
              color: '#4b5563'
            }}
          >
            Pending ({children.filter(c => c.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('schools')}
            className="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all"
            style={activeTab === 'schools' ? { 
              background: GRADIENTS.primary,
              color: COLORS.white
            } : { 
              background: '#f3f4f6',
              color: '#4b5563'
            }}
          >
            Schools ({schoolsData.length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 pt-4 pb-2 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab === 'schools' ? 'schools' : 'children'}...`}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-5 space-y-3 pb-24">
        {activeTab === 'pending' ? (
          filteredPendingChildren.length > 0 ? (
            filteredPendingChildren.map((child) => (
              <div key={child.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                {/* Child Info */}
                <div className="flex items-start gap-3 mb-3">
                  <ChildAvatar
                    name={child.name}
                    initials={child.initials}
                    photoUrl={child.photoUrl}
                    isEmojiAvatar={child.isEmojiAvatar}
                    className="w-12 h-12 rounded-xl flex-shrink-0 object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 font-semibold">{child.name}</h3>
                        <p className="text-gray-600 text-sm">{child.age} years • {child.year}</p>
                      </div>
                      {getStatusBadge(child.status || 'pending')}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-3.5 h-3.5" />
                        <span>Caregiver: {child.caregiverName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{child.caregiverEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <School className="w-3.5 h-3.5" />
                        <span>{child.school}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmDialog({ 
                      show: true, 
                      action: 'Approve', 
                      id: child.id, 
                      name: child.name 
                    })}
                    className="flex-1 bg-green-500 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-green-600 transition-colors active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => setConfirmDialog({ 
                      show: true, 
                      action: 'Reject', 
                      id: child.id, 
                      name: child.name 
                    })}
                    className="flex-1 bg-red-500 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-red-600 transition-colors active:scale-95"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-gray-900 font-semibold mb-2">All Caught Up!</h3>
              <p className="text-gray-600 text-sm">No pending child registrations at the moment.</p>
            </div>
          )
        ) : activeTab === 'children' ? (
          filteredApprovedChildren.map((child) => (
            <div key={child.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              {/* Child Info */}
              <div className="flex items-start gap-3 mb-3">
                <ChildAvatar
                  name={child.name}
                  initials={child.initials}
                  photoUrl={child.photoUrl}
                  isEmojiAvatar={child.isEmojiAvatar}
                  className="w-12 h-12 rounded-xl flex-shrink-0 object-cover"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 font-semibold">{child.name}</h3>
                      <p className="text-gray-600 text-sm">{child.age} years • {child.year}</p>
                    </div>
                    {getStatusBadge(child.status || 'pending')}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-3.5 h-3.5" />
                      <span>Caregiver: {child.caregiverName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{child.caregiverEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <School className="w-3.5 h-3.5" />
                      <span>{child.school}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {child.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmDialog({ 
                      show: true, 
                      action: 'Approve', 
                      id: child.id, 
                      name: child.name 
                    })}
                    className="flex-1 bg-green-500 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-green-600 transition-colors active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => setConfirmDialog({ 
                      show: true, 
                      action: 'Reject', 
                      id: child.id, 
                      name: child.name 
                    })}
                    className="flex-1 bg-red-500 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-red-600 transition-colors active:scale-95"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          filteredSchools.map((school) => (
            <div key={school.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              {/* School Info */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <School className="w-6 h-6 text-purple-600" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 font-semibold">{school.name}</h3>
                      <p className="text-gray-600 text-sm">{school.students} students</p>
                    </div>
                    {getStatusBadge(school.status)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{school.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-3.5 h-3.5" />
                      <span>{school.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{school.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{school.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {school.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmDialog({ 
                      show: true, 
                      action: 'Approve', 
                      id: school.id.toString(), 
                      name: school.name 
                    })}
                    className="flex-1 bg-green-500 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-green-600 transition-colors active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => setConfirmDialog({ 
                      show: true, 
                      action: 'Reject', 
                      id: school.id.toString(), 
                      name: school.name 
                    })}
                    className="flex-1 bg-red-500 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-red-600 transition-colors active:scale-95"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}