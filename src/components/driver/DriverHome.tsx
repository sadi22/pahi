import {
  MapPin,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface DriverHomeProps {
  onNavigate: (page: string) => void;
}

export default function DriverHome({
  onNavigate,
}: DriverHomeProps) {
  const upcomingRides = [
    {
      id: 1,
      time: "08:00 AM",
      child: "Emma Johnson",
      pickup: "123 Main St",
      dropoff: "Wairoa Primary School",
      status: "upcoming",
    },
    {
      id: 2,
      time: "08:15 AM",
      child: "Liam Johnson",
      pickup: "123 Main St",
      dropoff: "Lincoln Middle School",
      status: "upcoming",
    },
    {
      id: 3,
      time: "03:00 PM",
      child: "Sophie Chen",
      pickup: "Wairoa Primary School",
      dropoff: "456 Oak Ave",
      status: "upcoming",
    },
  ];

  const todayStats = {
    totalRides: 8,
    completed: 3,
    remaining: 5,
    children: 12,
    distance: "45 km",
  };

  return (
    <div className="p-5 space-y-5 bg-gray-50">
      {/* Welcome Section */}
      <div
        className="rounded-2xl p-5 text-white shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)",
        }}
      >
        <h2 className="text-white mb-2">
          Welcome Back, Mike!{" "}
        </h2>
        <p className="text-white mb-5">
          Ready to make today's rides safe and smooth
        </p>

        {/* Today's Overview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-white mb-1">Total Rides</p>
            <p className="text-white mb-0 text-2xl">
              {todayStats.totalRides}
            </p>
            <p className="text-white text-xs">today</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-white mb-1">Completed</p>
            <p className="text-white mb-0 text-2xl">
              {todayStats.completed}
            </p>
            <p className="text-white text-xs">rides</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-white mb-1">Remaining</p>
            <p className="text-white mb-0 text-2xl">
              {todayStats.remaining}
            </p>
            <p className="text-white text-xs">rides</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-3 text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate("tracking")}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98] text-left"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
              style={{
                background:
                  "linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)",
              }}
            >
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-900 mb-1">Live Map</p>
            <p className="text-gray-500 text-sm">
              Track current rides
            </p>
          </button>

          <button
            onClick={() => onNavigate("schedule")}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98] text-left"
          >
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-900 mb-1">Schedule</p>
            <p className="text-gray-500 text-sm">
              View your roster
            </p>
          </button>

          <button
            onClick={() => onNavigate("details")}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98] text-left"
          >
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-900 mb-1">Child Details</p>
            <p className="text-gray-500 text-sm">
              View all children
            </p>
          </button>

          <button
            onClick={() => onNavigate("checkin")}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98] text-left"
          >
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-900 mb-1">Check-In</p>
            <p className="text-gray-500 text-sm">
              Mark attendance
            </p>
          </button>
        </div>
      </div>

      {/* Upcoming Rides */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="mb-0 text-gray-900">Upcoming Rides</h3>
          <button
            onClick={() => onNavigate("schedule")}
            style={{ color: "#2F6F9F" }}
            className="text-sm"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {upcomingRides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#E0F7FA" }}
                  >
                    <Clock
                      className="w-6 h-6"
                      style={{ color: "#2F6F9F" }}
                    />
                  </div>
                  <div>
                    <p className="text-gray-900 mb-0">
                      {ride.time}
                    </p>
                    <p
                      className="text-sm mb-0"
                      style={{ color: "#2F6F9F" }}
                    >
                      {ride.child}
                    </p>
                  </div>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: "#E0F7FA",
                    color: "#2F6F9F",
                  }}
                >
                  Upcoming
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs mb-0">
                      Pickup
                    </p>
                    <p className="text-gray-900 text-sm">
                      {ride.pickup}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs mb-0">
                      Drop-off
                    </p>
                    <p className="text-gray-900 text-sm">
                      {ride.dropoff}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}