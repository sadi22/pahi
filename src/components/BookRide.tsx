import { useState } from 'react';
import { Calendar, Clock, MapPin, User, ArrowRight, CheckCircle, ChevronRight, Shield, Star } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';

interface BookRideProps {
  onNavigate: (page: string) => void;
  children: Array<{
    id: string;
    name: string;
    age: number;
    school: string;
    year: string;
    emergencyContact: string;
    status: 'approved' | 'pending';
  }>;
}

export default function BookRide({ onNavigate, children }: BookRideProps) {
  const [formData, setFormData] = useState({
    child: '',
    childId: 0,
    date: '',
    time: '',
    type: 'pickup',
    pickupAddress: '123 Main St, Wairoa',
    dropoffAddress: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.child || !formData.date || !formData.time) {
      // Form validation is already handled by disabled state
      return;
    }
    
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('track');
    }, 2500);
  };

  if (submitted) {
    return (
      <div className="min-h-full bg-[#f8fafc] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-card">
            <CheckCircle className="w-14 h-14 text-emerald-600" />
          </div>
          <h2 className="text-slate-900 mb-3 text-2xl">Ride Confirmed!</h2>
          <p className="text-slate-600 mb-2">
            {formData.child} is scheduled for pickup
          </p>
          <p className="text-blue-600 font-semibold text-lg mb-8">
            {formData.time} • {formatDate(formData.date)}
          </p>
          <div className="flex gap-3">
            <button 
              onClick={() => onNavigate('home')}
              className="flex-1 bg-slate-100 text-slate-900 py-3.5 rounded-xl font-medium active:scale-[0.98] transition-all"
            >
              Done
            </button>
            <button 
              onClick={() => onNavigate('track')}
              className="flex-1 text-white py-3.5 rounded-xl font-medium active:scale-[0.98] transition-all shadow-card"
              style={{ background: 'linear-gradient(135deg, #84AE45 0%, #4A90A4 100%)' }}
            >
              Track Ride
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#f8fafc] pb-24">
      <form onSubmit={handleSubmit} className="p-4 space-y-5">
        {/* Select Child */}
        <div>
          <label className="block text-slate-900 font-semibold mb-3 px-1">Select Child</label>
          {children.filter(c => c.status === 'approved').length > 0 ? (
            <div className="space-y-3">
              {children.filter(c => c.status === 'approved').map((child) => (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => {
                    setFormData({ 
                      ...formData, 
                      child: child.name,
                      childId: parseInt(child.id),
                      dropoffAddress: child.school 
                    });
                  }}
                  className={`w-full p-4 rounded-2xl bg-white text-left flex items-center justify-between shadow-card transition-all active:scale-[0.98] border-2 ${
                    formData.childId === parseInt(child.id)
                      ? 'bg-blue-50'
                      : ''
                  }`}
                  style={formData.childId === parseInt(child.id) ? { borderColor: '#2F6F9F' } : { borderColor: 'transparent' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-card" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
                      <span className="text-xl font-semibold">{child.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-semibold mb-0.5">{child.name}</h4>
                      <p className="text-slate-500 text-sm">{child.school}</p>
                      <p className="text-slate-400 text-xs mt-0.5">Grade {child.year}</p>
                    </div>
                  </div>
                  {formData.childId === parseInt(child.id) && (
                    <CheckCircle className="w-6 h-6" style={{ color: '#2F6F9F' }} />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center shadow-card">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-slate-400" />
              </div>
              <h4 className="text-slate-900 mb-2">No Approved Children</h4>
              <p className="text-slate-500 text-sm mb-4">
                {children.filter(c => c.status === 'pending').length > 0 
                  ? 'Your children are waiting for admin approval. You\'ll be able to book rides once approved.'
                  : 'Add a child to book a ride'}
              </p>
              <button
                type="button"
                onClick={() => onNavigate('children')}
                className="text-white px-6 py-2.5 rounded-xl text-sm font-medium active:scale-[0.98] transition-all"
                style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
              >
                {children.length > 0 ? 'View Children' : 'Add Child'}
              </button>
            </div>
          )}
        </div>

        {/* Route */}
        {formData.child && (
          <div>
            <label className="block text-slate-900 font-semibold mb-3 px-1">Trip Details</label>
            <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
              <div className="grid grid-cols-2 gap-2 mb-5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'pickup', time: '' })}
                  className={`p-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                    formData.type === 'pickup'
                      ? 'text-white shadow-card'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                  style={formData.type === 'pickup' ? { background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' } : {}}
                >
                  To School
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'dropoff', time: '' })}
                  className={`p-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                    formData.type === 'dropoff'
                      ? 'text-white shadow-card'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                  style={formData.type === 'dropoff' ? { background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' } : {}}
                >
                  From School
                </button>
              </div>

              <div className="space-y-3 pl-1">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: '#2F6F9F' }}></div>
                    <div className="w-0.5 h-8 bg-slate-200"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1 font-medium">Pickup Location</p>
                    <p className="text-slate-900 font-medium">
                      {formData.type === 'pickup' ? formData.pickupAddress : formData.dropoffAddress}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1 font-medium">Dropoff Location</p>
                    <p className="text-slate-900 font-medium">
                      {formData.type === 'pickup' ? formData.dropoffAddress : formData.pickupAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Date and Time */}
        <div>
          <label className="block text-slate-900 font-semibold mb-3 px-1">Schedule</label>
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <label className="text-sm text-slate-600 font-medium">Select Date</label>
              </div>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full text-slate-900 font-medium bg-transparent border-none outline-none text-base"
                required
              />
            </div>
            
            <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <label className="text-sm text-slate-600 font-medium">Select Time</label>
              </div>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full text-slate-900 font-medium bg-transparent border-none outline-none text-base appearance-none"
                required
              >
                {formData.type === 'pickup' ? (
                  <>
                    <option value="">Choose pickup time</option>
                    <option value="7:00 AM">7:00 AM</option>
                    <option value="7:30 AM">7:30 AM</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="8:30 AM">8:30 AM</option>
                  </>
                ) : (
                  <>
                    <option value="">Choose drop-off time</option>
                    <option value="2:50 PM">2:50 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="3:10 PM">3:10 PM</option>
                    <option value="3:20 PM">3:20 PM</option>
                    <option value="3:30 PM">3:30 PM</option>
                    <option value="3:40 PM">3:40 PM</option>
                    <option value="3:50 PM">3:50 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <div>
          <label className="block text-slate-900 font-semibold mb-3 px-1">Assigned Driver</label>
          <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-card" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
                <span className="text-xl font-semibold">MK</span>
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-semibold mb-1">Mike Kereama</h4>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 text-xs font-medium">Verified Driver</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-slate-900 text-sm font-medium">5.0</span>
                  <span className="text-slate-500 text-xs">• 147 rides</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!formData.child || !formData.date || !formData.time}
            className="w-full text-white py-4 rounded-2xl font-semibold active:scale-[0.98] transition-all disabled:bg-slate-300 disabled:text-slate-500 shadow-card"
            style={!formData.child || !formData.date || !formData.time ? {} : { background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}