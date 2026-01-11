import { useState } from 'react';
import { Star, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useFeedback } from '../contexts/FeedbackContext';

interface FeedbackPageProps {
  onBack?: () => void;
}

export default function FeedbackPage({ onBack }: FeedbackPageProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('general');
  const [submitted, setSubmitted] = useState(false);
  const { submitFeedback } = useFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit feedback to context
    submitFeedback({
      caregiverId: 'cg1', // In a real app, this would come from auth context
      caregiverName: 'Sarah Johnson', // In a real app, this would come from auth context
      type: category as 'general' | 'driver' | 'ride' | 'app',
      subject: subject || `${category.charAt(0).toUpperCase() + category.slice(1)} Feedback`,
      message: feedback,
      // Add driver info if it's driver feedback
      ...(category === 'driver' && {
        driverId: 'driver1',
        driverName: 'Mike Kereama'
      })
    });
    
    setSubmitted(true);
    toast.success('Thank you! Your feedback has been submitted.');
    setTimeout(() => {
      if (onBack) {
        onBack();
      }
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" strokeWidth={2.5} />
          </div>
          <h2 className="text-gray-900 mb-3" style={{ fontSize: '24px', fontWeight: 700 }}>
            Thank You!
          </h2>
          <p className="text-gray-600" style={{ fontSize: '16px' }}>
            Your feedback has been submitted successfully. We appreciate your input to help improve Pahi App.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-8">
      {/* Header */}
      <div className="px-5 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <div className="flex items-center gap-3 mb-2">
          {onBack && (
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center active:scale-95 transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          )}
          <h1 className="text-white" style={{ fontSize: '28px', fontWeight: 700 }}>
            Share Feedback
          </h1>
        </div>
        <p className="text-white/90" style={{ fontSize: '16px' }}>Help us improve your experience</p>
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-6 space-y-5">
        {/* Rating */}
        <div className="bg-white rounded-2xl shadow-md p-5 border-2" style={{ borderColor: '#E0F7FA' }}>
          <h3 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Rate Your Experience
          </h3>
          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-transform active:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-gray-700" style={{ fontSize: '16px', fontWeight: 500 }}>
              {rating === 5 && 'Excellent!'}
              {rating === 4 && 'Very Good!'}
              {rating === 3 && 'Good'}
              {rating === 2 && 'Fair'}
              {rating === 1 && 'Needs Improvement'}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="bg-white rounded-2xl shadow-md p-5 border-2" style={{ borderColor: '#E0F7FA' }}>
          <h3 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Feedback Category
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {['General', 'Driver', 'App', 'Ride'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat.toLowerCase())}
                className={`p-4 rounded-xl border-2 transition-all active:scale-95 ${
                  category === cat.toLowerCase()
                    ? 'bg-blue-50'
                    : 'border-gray-200 text-gray-700'
                }`}
                style={category === cat.toLowerCase() ? { 
                  borderColor: '#2F6F9F', 
                  color: '#2F6F9F',
                  fontWeight: 600,
                  fontSize: '16px'
                } : { fontSize: '16px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subject */}
        <div className="bg-white rounded-2xl shadow-md p-5 border-2" style={{ borderColor: '#E0F7FA' }}>
          <h3 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Subject
          </h3>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            style={{ fontSize: '16px' }}
            placeholder="Brief subject line..."
            required
          />
        </div>

        {/* Feedback Text */}
        <div className="bg-white rounded-2xl shadow-md p-5 border-2" style={{ borderColor: '#E0F7FA' }}>
          <h3 className="text-gray-900 mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Your Feedback
          </h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
            style={{ fontSize: '16px' }}
            rows={8}
            placeholder="Share your experience or suggestions..."
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!feedback || !subject || rating === 0}
          className="w-full text-white py-5 rounded-2xl shadow-lg transition-all active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          style={!feedback || !subject || rating === 0 ? {} : { 
            background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)',
            fontSize: '18px',
            fontWeight: 600
          }}
        >
          <Send className="w-6 h-6" />
          Submit Feedback
        </button>
      </form>
    </div>
  );
}