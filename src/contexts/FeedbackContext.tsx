import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Feedback {
  id: string;
  caregiverId: string;
  caregiverName: string;
  type: 'general' | 'driver' | 'ride' | 'app';
  subject: string;
  message: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
  reviewedAt?: string;
  adminNotes?: string;
  relatedRideId?: string;
  driverId?: string;
  driverName?: string;
}

interface FeedbackContextType {
  feedbacks: Feedback[];
  submitFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt' | 'status'>) => void;
  updateFeedbackStatus: (id: string, status: 'pending' | 'reviewed' | 'resolved', adminNotes?: string) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

const STORAGE_KEY = 'pahi_app_feedbacks';

// Initial dummy data
const initialFeedbacks: Feedback[] = [
  {
    id: 'fb1',
    caregiverId: 'cg1',
    caregiverName: 'Sarah Johnson',
    type: 'driver',
    subject: 'Great service from Mike',
    message: 'Mike was very helpful and patient with my daughter. She felt safe and comfortable during the ride.',
    status: 'reviewed',
    createdAt: '2025-12-08T09:30:00Z',
    reviewedAt: '2025-12-08T14:20:00Z',
    adminNotes: 'Positive feedback shared with driver',
    driverId: 'driver1',
    driverName: 'Mike Kereama'
  },
  {
    id: 'fb2',
    caregiverId: 'cg2',
    caregiverName: 'Tom Wilson',
    type: 'ride',
    subject: 'Late pickup yesterday',
    message: 'The pickup was about 15 minutes late yesterday morning. My son almost missed the school assembly.',
    status: 'resolved',
    createdAt: '2025-12-07T16:45:00Z',
    reviewedAt: '2025-12-07T18:30:00Z',
    relatedRideId: 'ride123',
    adminNotes: 'Investigated - traffic incident on Marine Parade. Driver notified to improve communication in such cases.'
  },
  {
    id: 'fb3',
    caregiverId: 'cg1',
    caregiverName: 'Sarah Johnson',
    type: 'app',
    subject: 'Suggestion for notification feature',
    message: 'Would be great to get a notification when the driver is 5 minutes away from pickup location.',
    status: 'pending',
    createdAt: '2025-12-09T11:20:00Z'
  },
  {
    id: 'fb4',
    caregiverId: 'cg3',
    caregiverName: 'Mary Smith',
    type: 'general',
    subject: 'Thank you for this service',
    message: 'This app has made our lives so much easier. Really appreciate the Wairoa community coming together for our kids.',
    status: 'reviewed',
    createdAt: '2025-12-06T10:15:00Z',
    reviewedAt: '2025-12-06T15:45:00Z',
    adminNotes: 'Positive feedback - shared with team'
  }
];

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return initialFeedbacks;
      }
    }
    return initialFeedbacks;
  });

  // Persist to localStorage whenever feedbacks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
  }, [feedbacks]);

  const submitFeedback = (feedback: Omit<Feedback, 'id' | 'createdAt' | 'status'>) => {
    const newFeedback: Feedback = {
      ...feedback,
      id: `fb${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  const updateFeedbackStatus = (id: string, status: 'pending' | 'reviewed' | 'resolved', adminNotes?: string) => {
    setFeedbacks(prev => prev.map(fb => {
      if (fb.id === id) {
        return {
          ...fb,
          status,
          reviewedAt: status !== 'pending' ? new Date().toISOString() : fb.reviewedAt,
          adminNotes: adminNotes || fb.adminNotes
        };
      }
      return fb;
    }));
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, submitFeedback, updateFeedbackStatus }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
