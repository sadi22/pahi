import { useState } from 'react';
import { Plus, Edit, Trash2, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import ConfirmDialog from './ConfirmDialog';

interface Child {
  id: number;
  name: string;
  age: number;
  school: string;
  year: string;
  emergencyContact: string;
}

interface ManageChildrenProps {
  children: Child[];
  setChildren: (children: Child[]) => void;
  onBack?: () => void;
}

export default function ManageChildren({ children, setChildren, onBack }: ManageChildrenProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; childId: number | null; childName: string }>({
    show: false,
    childId: null,
    childName: ''
  });
  const [newChild, setNewChild] = useState({
    name: '',
    age: '',
    school: '',
    year: '',
    emergencyContact: ''
  });

  const handleAddChild = () => {
    if (isEditing !== null) {
      // Editing existing child
      if (newChild.name && newChild.age && newChild.school) {
        setChildren(children.map(child => 
          child.id === isEditing
            ? {
                ...child,
                name: newChild.name,
                age: parseInt(newChild.age),
                school: newChild.school,
                year: newChild.year,
                emergencyContact: newChild.emergencyContact
              }
            : child
        ));
        setNewChild({ name: '', age: '', school: '', year: '', emergencyContact: '' });
        setIsAdding(false);
        setIsEditing(null);
      }
    } else {
      // Adding new child
      if (newChild.name && newChild.age && newChild.school) {
        const childToAdd = {
          id: children.length > 0 ? Math.max(...children.map(c => c.id)) + 1 : 1,
          name: newChild.name,
          age: parseInt(newChild.age),
          school: newChild.school,
          year: newChild.year,
          emergencyContact: newChild.emergencyContact
        };
        
        setChildren([...children, childToAdd]);
        setNewChild({ name: '', age: '', school: '', year: '', emergencyContact: '' });
        setIsAdding(false);
      }
    }
  };

  const handleDelete = (id: number) => {
    const child = children.find(c => c.id === id);
    if (child) {
      setDeleteConfirm({
        show: true,
        childId: id,
        childName: child.name
      });
    }
  };

  const confirmDelete = () => {
    if (deleteConfirm.childId) {
      setChildren(children.filter(child => child.id !== deleteConfirm.childId));
      toast.success(`${deleteConfirm.childName}'s profile has been removed`);
      setDeleteConfirm({ show: false, childId: null, childName: '' });
    }
  };

  const handleEdit = (child: Child) => {
    setIsEditing(child.id);
    setNewChild({
      name: child.name,
      age: child.age.toString(),
      school: child.school,
      year: child.year,
      emergencyContact: child.emergencyContact
    });
    setIsAdding(true);
  };

  const handleCancelEdit = () => {
    setNewChild({ name: '', age: '', school: '', year: '', emergencyContact: '' });
    setIsAdding(false);
    setIsEditing(null);
  };

  return (
    <div className="p-4 pb-24">
      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.show}
        title="Remove Child Profile?"
        message={`Are you sure you want to remove ${deleteConfirm.childName}'s profile? This action cannot be undone.`}
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ show: false, childId: null, childName: '' })}
        variant="danger"
      />

      {/* Add Child Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl shadow-md mb-6 active:scale-95 transition-all"
        style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
      >
        <Plus className="w-5 h-5" />
        Add New Child
      </button>

      {/* Add/Edit Child Form */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-gray-900 text-lg">{isEditing ? 'Edit Child' : 'Add New Child'}</h3>
              <button
                onClick={handleCancelEdit}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">Child's Name</label>
                <input
                  type="text"
                  value={newChild.name}
                  onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Age</label>
                <input
                  type="number"
                  value={newChild.age}
                  onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter age"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">School</label>
                <input
                  type="text"
                  value={newChild.school}
                  onChange={(e) => setNewChild({ ...newChild, school: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter school name"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Year</label>
                <input
                  type="text"
                  value={newChild.year}
                  onChange={(e) => setNewChild({ ...newChild, year: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 3rd Grade"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">Emergency Contact</label>
                <input
                  type="tel"
                  value={newChild.emergencyContact}
                  onChange={(e) => setNewChild({ ...newChild, emergencyContact: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <button
                onClick={handleAddChild}
                className="w-full text-white py-3 rounded-lg transition-colors active:scale-95"
                style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
              >
                {isEditing ? 'Save Changes' : 'Add Child'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Children List */}
      <div className="space-y-4">
        {children.map((child) => (
          <div key={child.id} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
                  <span className="text-lg">{child.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-gray-800">{child.name}</h4>
                  <p className="text-gray-600 text-sm">{child.age} years old</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(child)}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors active:scale-95"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(child.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-95"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">School</span>
                <p className="text-gray-700 text-right">{child.school}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Year</span>
                <p style={{ color: '#2F6F9F' }}>{child.year}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Emergency Contact</span>
                <p className="text-gray-700">{child.emergencyContact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 rounded-xl shadow-md mt-6 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      )}
    </div>
  );
}