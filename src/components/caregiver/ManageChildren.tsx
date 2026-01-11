import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Plus, Edit2, Trash2, User, Calendar, School, Camera, X, Book, Circle, Guitar, Palette, Star, Rocket, Heart, Music, Camera as CameraIcon, Trophy } from 'lucide-react';
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

interface ManageChildrenProps {
  onNavigate: (page: string) => void;
  children: Child[];
  setChildren: (children: Child[]) => void;
}

export default function ManageChildren({ onNavigate, children, setChildren }: ManageChildrenProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [isEmojiAvatar, setIsEmojiAvatar] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    year: '',
    school: 'Wairoa Primary School',
    photoUrl: ''
  });

  // Gender-neutral child-friendly avatars - using non-living objects
  const childAvatars = [
    { icon: 'book', label: 'Books', color: '#8B4513' },
    { icon: 'ball', label: 'Ball', color: '#4CAF50' },
    { icon: 'guitar', label: 'Guitar', color: '#FF6B35' },
    { icon: 'palette', label: 'Art', color: '#FF6B9D' },
    { icon: 'star', label: 'Star', color: '#FFD700' },
    { icon: 'rocket', label: 'Rocket', color: '#E53935' },
    { icon: 'heart', label: 'Heart', color: '#EF5350' },
    { icon: 'music', label: 'Music', color: '#9B7EBD' },
    { icon: 'camera', label: 'Camera', color: '#455A64' },
    { icon: 'trophy', label: 'Trophy', color: '#FFC107' },
  ];

  // Map icon names to components
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      book: Book,
      ball: Circle,
      guitar: Guitar,
      palette: Palette,
      star: Star,
      rocket: Rocket,
      heart: Heart,
      music: Music,
      camera: CameraIcon,
      trophy: Trophy,
    };
    return icons[iconName];
  };

  const handleAdd = () => {
    if (!formData.name || !formData.age || !formData.year) {
      toast.error('Please fill in all fields');
      return;
    }

    const nameParts = formData.name.trim().split(' ');
    const initials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : formData.name.substring(0, 2);

    const newChild: Child = {
      id: Date.now().toString(),
      name: formData.name,
      age: parseInt(formData.age),
      year: formData.year,
      school: formData.school,
      initials: initials.toUpperCase(),
      photoUrl: formData.photoUrl || 'book',
      isEmojiAvatar: isEmojiAvatar || !formData.photoUrl || formData.photoUrl.length <= 10,
      status: 'pending',
      caregiverName: 'Rachel Mitchell',
      caregiverEmail: 'rachel.mitchell@example.com'
    };

    setChildren([...children, newChild]);
    setFormData({ name: '', age: '', year: '', school: 'Wairoa Primary School', photoUrl: '' });
    setPhotoPreview('');
    setIsEmojiAvatar(false);
    setIsAdding(false);
    toast.success('Registration Submitted!', {
      description: `${newChild.name}'s registration is pending admin approval`
    });
  };

  const handleEdit = (id: string) => {
    const child = children.find(c => c.id === id);
    if (child) {
      setFormData({
        name: child.name,
        age: child.age.toString(),
        year: child.year,
        school: child.school,
        photoUrl: child.photoUrl || ''
      });
      setEditingId(id);
      setIsAdding(true);
    }
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.age || !formData.year) {
      toast.error('Please fill in all fields');
      return;
    }

    const nameParts = formData.name.trim().split(' ');
    const initials = nameParts.length > 1 
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : formData.name.substring(0, 2);

    setChildren(children.map(child => 
      child.id === editingId 
        ? { ...child, name: formData.name, age: parseInt(formData.age), year: formData.year, school: formData.school, initials: initials.toUpperCase(), photoUrl: formData.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name.replace(/\s/g, '')}&skinColor=brown&hairColor=black` }
        : child
    ));

    setFormData({ name: '', age: '', year: '', school: 'Wairoa Primary School', photoUrl: '' });
    setPhotoPreview('');
    setIsAdding(false);
    setEditingId(null);
    toast.success('Child Updated Successfully!')
  };

  const handleDelete = () => {
    setChildren(children.filter(child => child.id !== deleteId));
    setDeleteId(null);
    toast.success('Child Removed Successfully!');
  };

  const handleCancel = () => {
    setFormData({ name: '', age: '', year: '', school: 'Wairoa Primary School', photoUrl: '' });
    setPhotoPreview('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setFormData({ ...formData, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (emoji: string) => {
    setFormData({ ...formData, photoUrl: emoji });
    setPhotoPreview(emoji);
    setIsEmojiAvatar(true);
    setShowAvatarPicker(false);
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(to bottom, #F0F9FF 0%, #ffffff 100%)' }}>
      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Remove Child"
        message="Are you sure you want to remove this child from your account?"
        confirmText="Yes, Remove"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        variant="danger"
      />

      {/* Header */}
      <div className="px-5 pt-6 pb-5" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <button
          onClick={() => {
            // Hierarchical navigation: if adding or editing, go back to list view
            if (isAdding || editingId) {
              setIsAdding(false);
              setEditingId(null);
              setFormData({ name: '', age: '', year: '', school: 'Wairoa Primary School', photoUrl: '' });
              setPhotoPreview('');
              setShowAvatarPicker(false);
              setIsEmojiAvatar(false);
            } else {
              // If on list view, go back to home
              onNavigate('home');
            }
          }}
          className="flex items-center gap-2 text-white mb-6 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span style={{ fontSize: '16px', fontWeight: 600 }}>Back</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-1" style={{ fontSize: '26px', fontWeight: 700 }}>
              {isAdding ? 'Add New Child' : editingId ? 'Edit Child' : 'Manage Children'}
            </h1>
            <p className="text-white/90" style={{ fontSize: '15px' }}>
              {isAdding || editingId 
                ? 'Fill in the details below' 
                : `${children.length} ${children.length === 1 ? 'child' : 'children'} registered`
              }
            </p>
          </div>
          
          {!isAdding && !editingId && (
            <button
              onClick={() => setIsAdding(true)}
              className="w-12 h-12 bg-white rounded-xl flex items-center justify-center active:scale-95 transition-all shadow-lg"
            >
              <Plus className="w-6 h-6" style={{ color: '#2F6F9F' }} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      <div className="px-5 py-6 space-y-5">
        {/* Pending Children Notice */}
        {children.filter(c => c.status === 'pending').length > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-yellow-900 mb-1" style={{ fontSize: '15px', fontWeight: 600 }}>
                  Pending Approval
                </h3>
                <p className="text-yellow-800" style={{ fontSize: '13px' }}>
                  {children.filter(c => c.status === 'pending').length} {children.filter(c => c.status === 'pending').length === 1 ? 'child is' : 'children are'} waiting for admin approval. You'll be able to book rides once approved.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Form */}
        {isAdding && (
          <div className="bg-white rounded-2xl p-5 shadow-lg border-2" style={{ borderColor: '#2F6F9F' }}>
            <h3 className="text-gray-900 mb-5" style={{ fontSize: '18px', fontWeight: 600 }}>
              {editingId ? 'Edit Child' : 'Add New Child'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Full Name
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl focus-within:border-blue-500">
                  <User className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter child's full name"
                    className="flex-1 outline-none"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Age
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl focus-within:border-blue-500">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Enter age"
                    className="flex-1 outline-none"
                    style={{ fontSize: '16px' }}
                    min="3"
                    max="18"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Year
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl focus-within:border-blue-500">
                  <School className="w-5 h-5 text-gray-400" />
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="flex-1 outline-none"
                    style={{ fontSize: '16px' }}
                  >
                    <option value="">Select Year</option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Year 1">Year 1 (Primary)</option>
                    <option value="Year 2">Year 2 (Primary)</option>
                    <option value="Year 3">Year 3 (Primary)</option>
                    <option value="Year 4">Year 4 (Primary)</option>
                    <option value="Year 5">Year 5 (Primary)</option>
                    <option value="Year 6">Year 6 (Primary)</option>
                    <option value="Year 7">Year 7 (Intermediate)</option>
                    <option value="Year 8">Year 8 (Intermediate)</option>
                    <option value="Year 9">Year 9 (Secondary)</option>
                    <option value="Year 10">Year 10 (Secondary)</option>
                    <option value="Year 11">Year 11 (Secondary)</option>
                    <option value="Year 12">Year 12 (Secondary)</option>
                    <option value="Year 13">Year 13 (Secondary)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  School
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl focus-within:border-blue-500">
                  <School className="w-5 h-5 text-gray-400" />
                  <select
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="flex-1 outline-none"
                    style={{ fontSize: '16px' }}
                  >
                    <option value="Wairoa Primary School">Wairoa Primary School</option>
                    <option value="Wairoa College">Wairoa College</option>
                    <option value="St Joseph's School">St Joseph's School</option>
                    <option value="Te Kura Kaupapa Māori o Te Whānau a Apanui">Te Kura Kaupapa Māori o Te Whānau a Apanui</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  Photo
                </label>
                
                {/* Photo Preview or Avatar Selection */}
                {photoPreview && (
                  <div className="mb-3 flex justify-center">
                    <ChildAvatar
                      photoUrl={photoPreview}
                      initials="PR"
                      name="Preview"
                      size="lg"
                    />
                  </div>
                )}

                {/* Choose Avatar Button */}
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(true)}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 rounded-xl active:scale-95 transition-all mb-3"
                  style={{ borderColor: '#2F6F9F', backgroundColor: '#F0F9FF' }}
                >
                  <span className="text-2xl">🎨</span>
                  <span style={{ color: '#2F6F9F', fontSize: '16px', fontWeight: 600 }}>
                    Choose Avatar
                  </span>
                </button>

                {/* Upload Photo */}
                <div className="flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl focus-within:border-blue-500">
                  <CameraIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="flex-1 outline-none"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-4 rounded-xl border-2 border-gray-300 active:scale-95 transition-all"
                  style={{ fontSize: '16px', fontWeight: 600, color: '#6B7280' }}
                >
                  Cancel
                </button>
                <button
                  onClick={editingId ? handleUpdate : handleAdd}
                  className="flex-1 py-4 rounded-xl text-white active:scale-95 transition-all"
                  style={{ 
                    background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)',
                    fontSize: '16px',
                    fontWeight: 600
                  }}
                >
                  {editingId ? 'Update' : 'Add Child'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Children List */}
        {children.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-md">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>
              No Children Added
            </h3>
            <p className="text-gray-600 mb-5" style={{ fontSize: '14px' }}>
              Add your first child to start booking rides
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-3 rounded-xl text-white active:scale-95 transition-all"
              style={{ 
                background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)',
                fontSize: '15px',
                fontWeight: 600
              }}
            >
              Add Child
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {children.map((child, index) => (
              <div key={child.id} className="bg-white rounded-2xl p-5 shadow-md">
                <div className="flex items-start gap-4">
                  <ChildAvatar
                    photoUrl={child.photoUrl}
                    initials={child.initials}
                    name={child.name}
                    size="md"
                    backgroundColor={index % 2 === 0 ? '#2F6F9F' : '#5699D2'}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-900" style={{ fontSize: '17px', fontWeight: 600 }}>
                        {child.name}
                      </h4>
                      {child.status === 'pending' && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs" style={{ fontWeight: 600 }}>
                          Pending
                        </span>
                      )}
                      {child.status === 'approved' && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs" style={{ fontWeight: 600 }}>
                          Approved
                        </span>
                      )}
                      {child.status === 'rejected' && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs" style={{ fontWeight: 600 }}>
                          Rejected
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2" style={{ fontSize: '14px' }}>
                      {child.age} years old • {child.year}
                    </p>
                    <div className="flex items-center gap-2">
                      <School className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-600" style={{ fontSize: '13px' }}>
                        {child.school}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(child.id)}
                      className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center active:scale-95 transition-all"
                    >
                      <Edit2 className="w-5 h-5" style={{ color: '#2F6F9F' }} />
                    </button>
                    <button
                      onClick={() => setDeleteId(child.id)}
                      className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center active:scale-95 transition-all"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add Another Child Button */}
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full py-5 rounded-2xl border-2 border-dashed active:scale-95 transition-all flex items-center justify-center gap-3"
                style={{ 
                  borderColor: '#2F6F9F',
                  backgroundColor: '#F0F9FF'
                }}
              >
                <Plus className="w-6 h-6" style={{ color: '#2F6F9F' }} strokeWidth={2.5} />
                <span style={{ color: '#2F6F9F', fontSize: '17px', fontWeight: 600 }}>
                  Add Another Child
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fadeIn" onClick={() => setShowAvatarPicker(false)}>
          <div 
            className="bg-white w-full rounded-t-3xl p-6 animate-slideUp max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-gray-900" style={{ fontSize: '20px', fontWeight: 600 }}>
                Choose Avatar
              </h3>
              <button
                onClick={() => setShowAvatarPicker(false)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Avatar Grid */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {childAvatars.map((avatar) => {
                const IconComponent = getIconComponent(avatar.icon);
                return (
                  <button
                    key={avatar.label}
                    onClick={() => handleAvatarSelect(avatar.icon)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 active:scale-95 transition-all hover:bg-blue-50"
                  >
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: '#E0F7FA' }}
                    >
                      {IconComponent && (
                        <IconComponent 
                          size={28} 
                          style={{ color: avatar.color }} 
                          strokeWidth={2.5}
                          fill={avatar.icon === 'star' ? avatar.color : 'none'}
                        />
                      )}
                    </div>
                    <span className="text-xs text-gray-600">{avatar.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => setShowAvatarPicker(false)}
              className="w-full py-4 rounded-xl border-2 border-gray-200 active:scale-95 transition-all"
            >
              <span className="text-gray-700" style={{ fontSize: '16px', fontWeight: 600 }}>
                Cancel
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}