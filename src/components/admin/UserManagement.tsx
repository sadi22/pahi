import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { 
  Search, 
  Users, 
  UserCheck, 
  UserX,
  CheckCircle,
  XCircle,
  Phone,
  Mail
} from 'lucide-react';
import ConfirmDialog from '../ConfirmDialog';
import PageHeader from '../shared/PageHeader';

interface UserManagementProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

export default function UserManagement({ onBack, onNavigate, onLogout }: UserManagementProps) {
  const [activeTab, setActiveTab] = useState<'drivers' | 'caregivers' | 'schools'>('drivers');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{ 
    show: boolean; 
    action: string; 
    userId: number; 
    userName: string 
  }>({
    show: false,
    action: '',
    userId: 0,
    userName: ''
  });

  const [usersData, setUsersData] = useState([
    {
      id: 1,
      name: 'Mike Kereama',
      type: 'driver',
      email: 'mike.k@example.com',
      phone: '021 234 5678',
      status: 'verified',
      joinDate: '15 Jan 2024',
      ridesCompleted: 234
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      type: 'caregiver',
      email: 'sarah.mitchell@example.com',
      phone: '021 456 7890',
      children: ['Ciara Mitchell'],
      school: 'Wairoa Primary School',
      status: 'active',
      joined: '1 Feb 2024'
    },
    {
      id: 3,
      name: 'Tom Whaanga',
      type: 'caregiver',
      email: 'tom.whaanga@example.com',
      phone: '021 567 8901',
      children: ['Johnny Whaanga'],
      school: 'Wairoa College',
      status: 'pending',
      joined: '15 Feb 2024'
    },
    {
      id: 4,
      name: 'Maria Kahukura',
      type: 'caregiver',
      email: 'maria.kahukura@example.com',
      phone: '021 678 9012',
      children: ['Blu Kahukura'],
      school: 'Wairoa Primary School',
      status: 'active',
      joined: '1 Mar 2024'
    },
    {
      id: 5,
      name: 'Rachel Smith',
      type: 'caregiver',
      email: 'rachel.smith@example.com',
      phone: '021 789 0123',
      children: ['Mercedez Smith'],
      school: 'St Joseph\'s School',
      status: 'pending',
      joined: '5 Mar 2024'
    },
    {
      id: 6,
      name: 'David Brown',
      type: 'caregiver',
      email: 'david.brown@example.com',
      phone: '021 890 1234',
      children: ['Hine Brown'],
      school: 'Te Kura Kaupapa Māori o Te Whānau a Apanui',
      status: 'pending',
      joined: '10 Mar 2024'
    },
    {
      id: 7,
      name: 'Karen Goldsmith',
      type: 'caregiver',
      email: 'karen.goldsmith@example.com',
      phone: '021 901 2345',
      children: ['Tash Goldsmith'],
      school: 'Wairoa College',
      status: 'active',
      joined: '12 Mar 2024'
    },
    {
      id: 8,
      name: 'Wairoa Primary School',
      type: 'school',
      email: 'admin@wairoaps.nz',
      phone: '06 838 7200',
      status: 'active',
      joinDate: '10 Jan 2024',
      students: 150
    },
    {
      id: 9,
      name: 'Wairoa College',
      type: 'school',
      email: 'admin@wairoaco.nz',
      phone: '06 838 6789',
      status: 'active',
      joinDate: '10 Jan 2024',
      students: 280
    },
    {
      id: 10,
      name: 'St Joseph\'s School',
      type: 'school',
      email: 'office@stjosephs-wairoa.nz',
      phone: '06 838 8451',
      status: 'active',
      joinDate: '10 Jan 2024',
      students: 95
    },
    {
      id: 11,
      name: 'Te Kura Kaupapa Māori o Te Whānau a Apanui',
      type: 'school',
      email: 'admin@tkkmwairoa.nz',
      phone: '06 838 9123',
      status: 'active',
      joinDate: '10 Jan 2024',
      students: 68
    }
  ]);

  const handleApprove = (userId: number) => {
    const user = usersData.find(u => u.id === userId);
    setUsersData(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: user.type === 'driver' ? 'verified' : 'active' } : user
      )
    );
    toast.success(`${user?.name} approved`);
    setConfirmDialog({ show: false, action: '', userId: 0, userName: '' });
  };

  const handleReject = (userId: number) => {
    const user = usersData.find(u => u.id === userId);
    setUsersData(prevUsers => prevUsers.filter(u => u.id !== userId));
    toast.error(`${user?.name} rejected`);
    setConfirmDialog({ show: false, action: '', userId: 0, userName: '' });
  };

  const handleSuspend = (userId: number) => {
    const user = usersData.find(u => u.id === userId);
    setUsersData(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: 'suspended' } : user
      )
    );
    toast.warning(`${user?.name} suspended`);
    setConfirmDialog({ show: false, action: '', userId: 0, userName: '' });
  };

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = user.type === activeTab.slice(0, -1);
    return matchesSearch && matchesTab;
  });

  const tabs = [
    { id: 'drivers', label: 'Drivers', count: usersData.filter(u => u.type === 'driver').length },
    { id: 'caregivers', label: 'Caregivers', count: usersData.filter(u => u.type === 'caregiver').length },
    { id: 'schools', label: 'Schools', count: usersData.filter(u => u.type === 'school').length }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      verified: { bg: '#ecfdf5', text: '#10b981', label: 'Verified' },
      active: { bg: '#eff6ff', text: '#3b82f6', label: 'Active' },
      pending: { bg: '#fef3c7', text: '#f59e0b', label: 'Pending' },
      suspended: { bg: '#fee2e2', text: '#ef4444', label: 'Suspended' }
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

  const getUserIcon = (type: string) => {
    switch (type) {
      case 'driver': return UserCheck;
      case 'school': return UserX;
      default: return Users;
    }
  };

  return (
    <div className="h-screen bg-gray-50 pb-24 overflow-y-auto">
      <ConfirmDialog
        isOpen={confirmDialog.show}
        title={`${confirmDialog.action} User`}
        message={`Are you sure you want to ${confirmDialog.action.toLowerCase()} ${confirmDialog.userName}?`}
        confirmText={confirmDialog.action}
        cancelText="Cancel"
        onConfirm={() => {
          if (confirmDialog.action === 'Approve') handleApprove(confirmDialog.userId);
          else if (confirmDialog.action === 'Reject') handleReject(confirmDialog.userId);
          else if (confirmDialog.action === 'Suspend') handleSuspend(confirmDialog.userId);
        }}
        onCancel={() => setConfirmDialog({ show: false, action: '', userId: 0, userName: '' })}
        variant={confirmDialog.action === 'Reject' || confirmDialog.action === 'Suspend' ? 'danger' : 'info'}
      />

      {/* Header */}
      <PageHeader
        title="User Management"
        subtitle="Manage drivers, caregivers, and schools"
        onBack={onBack}
      />

      {/* Search Bar */}
      <div className="px-5 pt-4 pb-2 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-5 py-3">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* User List */}
      <div className="px-5 py-5 space-y-3">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No users found</p>
          </div>
        ) : (
          filteredUsers.map((user) => {
            const UserIcon = getUserIcon(user.type);
            return (
              <div 
                key={user.id} 
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900 font-semibold truncate">
                        {user.name}
                      </h3>
                      {getStatusBadge(user.status)}
                    </div>
                    <p className="text-gray-500 text-xs truncate">{user.phone}</p>
                    {user.type === 'caregiver' && 'children' in user && (
                      <div className="mt-1.5 space-y-0.5">
                        <p className="text-gray-700 text-xs font-medium">
                          {(user as any).children.join(', ')}
                        </p>
                        <p className="text-blue-600 text-xs">
                          {(user as any).school}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {user.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmDialog({ 
                        show: true, 
                        action: 'Approve', 
                        userId: user.id, 
                        userName: user.name 
                      })}
                      className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-green-700 transition-colors active:scale-95"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => setConfirmDialog({ 
                        show: true, 
                        action: 'Reject', 
                        userId: user.id, 
                        userName: user.name 
                      })}
                      className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-red-700 transition-colors active:scale-95"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDialog({ 
                      show: true, 
                      action: 'Suspend', 
                      userId: user.id, 
                      userName: user.name 
                    })}
                    className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors active:scale-95"
                  >
                    Suspend
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}