import { useState, useEffect } from "react";
import "./index.css";
import "./styles/globals.css";
import { Toaster } from "sonner@2.0.3";
import SplashScreen from "./components/SplashScreen";
import LandingPage from "./components/LandingPage";
import LoginRegister from "./components/LoginRegister";
import EasyBottomNav from "./components/EasyBottomNav";
import SimpleEasyHome from "./components/caregiver/SimpleEasyHome";
import SimpleEasyBookRide from "./components/caregiver/SimpleEasyBookRide";
import RealisticLiveTracking from "./components/caregiver/RealisticLiveTracking";
import SimpleEasyProfile from "./components/caregiver/SimpleEasyProfile";
import NotificationSettings from "./components/caregiver/NotificationSettings";
import PrivacySafety from "./components/caregiver/PrivacySafety";
import AppPreferences from "./components/caregiver/AppPreferences";
import ManageChildren from "./components/caregiver/ManageChildren";
import ParentCheckIn from "./components/caregiver/ParentCheckIn";
import HistoryFeedbackPage from "./components/caregiver/HistoryFeedbackPage";
import CaregiverNotifications from "./components/caregiver/CaregiverNotifications";
import FeedbackPage from "./components/FeedbackPage";
import AdminDashboard from "./components/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import RideManagement from "./components/admin/RideManagement";
import SafetyOversight from "./components/admin/SafetyOversight";
import ChildCaregiverManagement from "./components/admin/ChildCaregiverManagement";
import SettingsPermissions from "./components/admin/SettingsPermissions";
import FeedbackManagement from "./components/admin/FeedbackManagement";
import InstallPrompt from "./components/InstallPrompt";
import NotificationsPage from "./components/NotificationsPage";
import DriverDashboard from "./components/driver/DriverDashboard";
import DriverStudentRoster from "./components/driver/DriverStudentRoster";
import DriverLogin from "./components/driver/DriverLogin";
import RideNotificationBanner from "./components/RideNotificationBanner";
import { FeedbackProvider } from "./contexts/FeedbackContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { COLORS, NOTIFICATION, TYPOGRAPHY } from "./constants/designSystem";

interface Child {
  id: string;
  name: string;
  age: number;
  year: string;
  school: string;
  schoolAddress: string;
  pickupAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  photo: string;
  emergencyContact: string;
  medicalInfo: string;
  initials: string;
  photoUrl?: string;
  isEmojiAvatar?: boolean;
  caregiverName?: string;
  caregiverEmail?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("splash");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isDriverMode, setIsDriverMode] = useState(false);
  const [activeRide, setActiveRide] = useState<any>(null);
  const [showRideNotification, setShowRideNotification] =
    useState(false);
  const [selectedRideId, setSelectedRideId] = useState<number | null>(null);

  // Shared state for children across all components
  const [children, setChildren] = useState<Child[]>([
    {
      id: "1",
      name: "Ciara Mitchell",
      age: 9,
      year: "Year 4",
      school: "Wairoa Primary School",
      schoolAddress: "North Clyde Street, Wairoa 4108",
      pickupAddress: "123 Main St, Wairoa",
      status: "approved",
      photo: "star",
      emergencyContact: "021 456 7890",
      medicalInfo: "None",
      initials: "CM",
      photoUrl: "star",
      isEmojiAvatar: true,
      caregiverName: "Rachel Mitchell",
      caregiverEmail: "rachel.mitchell@example.com",
    },
    {
      id: "2",
      name: "Liam Mitchell",
      age: 11,
      year: "Year 6",
      school: "Wairoa Primary School",
      schoolAddress: "North Clyde Street, Wairoa 4108",
      pickupAddress: "123 Main St, Wairoa",
      status: "approved",
      photo: "music",
      emergencyContact: "021 456 7890",
      medicalInfo: "None",
      initials: "LM",
      photoUrl: "music",
      isEmojiAvatar: true,
      caregiverName: "Rachel Mitchell",
      caregiverEmail: "rachel.mitchell@example.com",
    },
  ]);

  const handleLogin = (userData: any) => {
    setIsLoggedIn(true);
    setUser(userData);
    // Route based on role: admin, driver, or caregiver
    if (userData.role === "admin") {
      setCurrentPage("admin");
    } else if (userData.role === "driver") {
      setIsDriverMode(true);
      setCurrentPage("driver-dashboard");
    } else {
      setCurrentPage("home");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsDriverMode(false);
    setCurrentPage("landing");
  };

  const handleNavigate = (page: string, params?: { rideId?: number }) => {
    setCurrentPage(page);
    if (params?.rideId) {
      setSelectedRideId(params.rideId);
    }
  };

  const handleRideBooked = (rideData: any) => {
    // Store the active ride
    setActiveRide({ ...rideData, status: "scheduled" });

    // Simulate ride starting after 5 seconds (for demo purposes)
    setTimeout(() => {
      setActiveRide((prev: any) => {
        if (prev && prev.status === "scheduled") {
          const updatedRide = { ...prev, status: "started" };

          // No notification needed - the home page shows active ride card
          // Only show banner if user is not on home page
          if (currentPage !== "home") {
            setShowRideNotification(true);
          }

          return updatedRide;
        }
        return prev;
      });
    }, 5000); // 5 seconds for demo - in production this would come from the driver/backend
  };

  const handleTrackRide = () => {
    setShowRideNotification(false);
    handleNavigate("track");
  };

  const renderPage = () => {
    if (
      !isLoggedIn &&
      currentPage !== "splash" &&
      currentPage !== "landing" &&
      currentPage !== "login" &&
      currentPage !== "driver-login"
    ) {
      return (
        <LandingPage
          onGetStarted={() => setCurrentPage("login")}
        />
      );
    }

    switch (currentPage) {
      case "splash":
        return (
          <SplashScreen
            onComplete={() => setCurrentPage("landing")}
          />
        );
      case "landing":
        return (
          <LandingPage
            onGetStarted={() => setCurrentPage("login")}
            onBack={() => setCurrentPage("splash")}
          />
        );
      case "login":
        return (
          <LoginRegister
            onLogin={handleLogin}
            onDriverLogin={() => setCurrentPage("driver-login")}
            onBack={() => setCurrentPage("landing")}
          />
        );
      case "home":
        return (
          <SimpleEasyHome
            onNavigate={handleNavigate}
            children={children}
            activeRide={activeRide}
            onLogout={handleLogout}
          />
        );
      case "book":
        return (
          <SimpleEasyBookRide
            onNavigate={handleNavigate}
            onRideBooked={handleRideBooked}
            children={children}
          />
        );
      case "track":
        // Show tracking page - if no active ride, show demo tracking
        return (
          <RealisticLiveTracking
            onNavigate={handleNavigate}
            activeRide={activeRide}
          />
        );
      case "check-in":
        return (
          <ParentCheckIn
            onBack={() => handleNavigate("home")}
            children={children}
          />
        );
      case "history-feedback":
        return (
          <HistoryFeedbackPage onNavigate={handleNavigate} />
        );
      case "feedback":
        return (
          <FeedbackPage onBack={() => handleNavigate("home")} />
        );
      case "manage-children":
        return (
          <ManageChildren
            onNavigate={handleNavigate}
            children={children}
            setChildren={setChildren}
          />
        );
      case "profile":
        return (
          <SimpleEasyProfile
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            children={children}
          />
        );
      case "notifications-settings":
        return (
          <NotificationSettings
            onBack={() => handleNavigate("profile")}
          />
        );
      case "privacy-safety":
        return (
          <PrivacySafety
            onBack={() => handleNavigate("profile")}
          />
        );
      case "app-preferences":
        return (
          <AppPreferences
            onBack={() => handleNavigate("profile")}
          />
        );
      case "admin":
        return (
          <AdminDashboard
            user={user}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "admin-users":
        return (
          <UserManagement
            onBack={() => handleNavigate("admin")}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "admin-notifications":
        return (
          <NotificationsPage
            onBack={() => handleNavigate("admin")}
            isAdminMode={true}
          />
        );
      case "admin-rides":
        return (
          <RideManagement
            onBack={() => handleNavigate("admin")}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            initialRideId={selectedRideId}
            onRideSelected={() => setSelectedRideId(null)}
          />
        );
      case "admin-safety":
        return (
          <SafetyOversight
            onBack={() => handleNavigate("admin")}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "admin-children":
        return (
          <ChildCaregiverManagement
            onBack={() => handleNavigate("admin")}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            children={children}
            setChildren={setChildren}
          />
        );
      case "admin-settings":
        return (
          <SettingsPermissions
            onBack={() => handleNavigate("admin")}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "admin-track":
        return (
          <RealisticLiveTracking
            onNavigate={handleNavigate}
            activeRide={activeRide}
            onBack={() => handleNavigate("admin")}
          />
        );
      case "admin-feedback":
        return (
          <FeedbackManagement
            onNavigate={handleNavigate}
          />
        );
      case "notifications":
        return (
          <CaregiverNotifications
            onBack={() => handleNavigate("home")}
            caregiverId="parent-1"
          />
        );
      case "driver-login":
        return (
          <DriverLogin
            onLogin={handleLogin}
            onBack={() => setCurrentPage("login")}
          />
        );
      case "driver-dashboard":
        return (
          <DriverDashboard
            user={user}
            onNavigate={handleNavigate}
          />
        );
      case "driver-track":
        return (
          <RealisticLiveTracking
            onNavigate={handleNavigate}
            activeRide={activeRide}
          />
        );
      default:
        return (
          <SimpleEasyHome
            onNavigate={handleNavigate}
            children={children}
            activeRide={activeRide}
          />
        );
    }
  };

  // Show bottom nav on these pages (but not for driver mode or admin mode)
  const showBottomNav =
    isLoggedIn &&
    !isDriverMode &&
    currentPage !== "splash" &&
    currentPage !== "landing" &&
    currentPage !== "login" &&
    currentPage !== "driver-login" &&
    currentPage !== "driver-dashboard" &&
    currentPage !== "manage-children" &&
    currentPage !== "check-in" &&
    currentPage !== "history-feedback" &&
    currentPage !== "feedback" &&
    currentPage !== "notifications" &&
    currentPage !== "notifications-settings" &&
    currentPage !== "privacy-safety" &&
    currentPage !== "app-preferences" &&
    !currentPage.startsWith("admin");

  return (
    <FeedbackProvider>
      <NotificationProvider>
        <div className="w-full h-full overflow-hidden bg-white flex flex-col">
          {/* Toast Notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: COLORS.white,
                color: COLORS.textPrimary,
                border: `${NOTIFICATION.borderWidth} solid ${COLORS.primary}`,
                padding: NOTIFICATION.padding,
                fontSize: TYPOGRAPHY.body.size,
                fontWeight: TYPOGRAPHY.button.weight,
                borderRadius: NOTIFICATION.borderRadius,
                minHeight: NOTIFICATION.minHeight,
              },
              className: "toast-notification",
            }}
          />

          {/* PWA Install Prompt */}
          <InstallPrompt />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            {renderPage()}
          </main>

          {/* Bottom Navigation - Not shown in driver mode or admin mode */}
          {showBottomNav && (
            <EasyBottomNav
              currentPage={currentPage}
              onNavigate={handleNavigate}
            />
          )}

          {/* Ride Notification Banner */}
          {showRideNotification && activeRide && (
            <RideNotificationBanner
              childName={activeRide.childName}
              onTrack={handleTrackRide}
              onDismiss={() => setShowRideNotification(false)}
            />
          )}
        </div>
      </NotificationProvider>
    </FeedbackProvider>
  );
}