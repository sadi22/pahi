import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RideNotification {
  id: string;
  type: 'ride_request' | 'dropoff_complete' | 'ride_confirmed';
  caregiverId: string;
  caregiverName: string;
  childName: string;
  childId: string;
  rideType: 'pickup' | 'dropoff';
  date: string;
  time: string;
  school: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  status: 'unread' | 'read';
  confirmed?: boolean; // Track if ride request is confirmed by admin
  createdAt: string;
}

interface NotificationContextType {
  notifications: RideNotification[];
  addNotification: (notification: Omit<RideNotification, 'id' | 'createdAt' | 'status' | 'type'>) => void;
  addDropoffNotification: (notification: Omit<RideNotification, 'id' | 'createdAt' | 'status' | 'type'>) => void;
  confirmRide: (notificationId: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
  clearNotifications: () => void;
  getCaregiverNotifications: (caregiverId: string) => RideNotification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const STORAGE_KEY = 'pahi_app_notifications_v2'; // Changed to force refresh with new data

// Initial dummy data
const initialNotifications: RideNotification[] = [
  {
    id: 'notif1',
    type: 'ride_request',
    caregiverId: 'cg1',
    caregiverName: 'Tom Whaanga',
    childName: 'Johnny Whaanga',
    childId: 'child1',
    rideType: 'pickup',
    date: '2025-12-16',
    time: '08:00 AM',
    school: 'Wairoa College',
    pickupAddress: '45 Beach Rd, Wairoa',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 47).toISOString() // 47 minutes ago
  },
  {
    id: 'notif2',
    type: 'ride_request',
    caregiverId: 'cg2',
    caregiverName: 'Maria Kahukura',
    childName: 'Blu Kahukura',
    childId: 'child2',
    rideType: 'pickup',
    date: '2025-12-16',
    time: '08:10 AM',
    school: 'Wairoa Primary School',
    pickupAddress: '78 Marine Parade, Wairoa',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 57).toISOString() // 57 minutes ago
  },
  {
    id: 'notif3',
    type: 'dropoff_complete',
    caregiverId: 'parent-1',
    caregiverName: 'Rachel Mitchell',
    childName: 'Ciara Mitchell',
    childId: '1',
    rideType: 'dropoff',
    date: '2025-12-15',
    time: '08:35 AM',
    school: 'Wairoa Primary School',
    dropoffAddress: 'Wairoa Primary School',
    pickupAddress: '123 Main St, Wairoa',
    status: 'unread',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 minutes ago
  }
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<RideNotification[]>(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return initialNotifications;
      }
    }
    return initialNotifications;
  });

  // Persist to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<RideNotification, 'id' | 'createdAt' | 'status' | 'type'>) => {
    const newNotification: RideNotification = {
      ...notification,
      id: `notif${Date.now()}`,
      type: 'ride_request',
      status: 'unread',
      createdAt: new Date().toISOString()
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const addDropoffNotification = (notification: Omit<RideNotification, 'id' | 'createdAt' | 'status' | 'type'>) => {
    const newNotification: RideNotification = {
      ...notification,
      id: `notif${Date.now()}`,
      type: 'dropoff_complete',
      status: 'unread',
      createdAt: new Date().toISOString()
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const confirmRide = (notificationId: string) => {
    // Find the notification to get caregiver details
    const rideNotification = notifications.find(n => n.id === notificationId);
    
    if (rideNotification) {
      // Mark the original request as confirmed
      setNotifications(prev => prev.map(notif => {
        if (notif.id === notificationId) {
          return { ...notif, confirmed: true };
        }
        return notif;
      }));
      
      // Create a confirmation notification for the caregiver
      const confirmationNotification: RideNotification = {
        id: `notif${Date.now()}`,
        type: 'ride_confirmed',
        caregiverId: rideNotification.caregiverId,
        caregiverName: rideNotification.caregiverName,
        childName: rideNotification.childName,
        childId: rideNotification.childId,
        rideType: rideNotification.rideType,
        date: rideNotification.date,
        time: rideNotification.time,
        school: rideNotification.school,
        pickupAddress: rideNotification.pickupAddress,
        dropoffAddress: rideNotification.dropoffAddress,
        status: 'unread',
        createdAt: new Date().toISOString()
      };
      
      setNotifications(prev => [confirmationNotification, ...prev]);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => {
      if (notif.id === id) {
        return { ...notif, status: 'read' as const };
      }
      return notif;
    }));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({
      ...notif,
      status: 'read' as const
    })));
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getCaregiverNotifications = (caregiverId: string) => {
    return notifications.filter(n => n.caregiverId === caregiverId);
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      addDropoffNotification,
      confirmRide,
      markAsRead, 
      markAllAsRead,
      unreadCount,
      clearNotifications,
      getCaregiverNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};