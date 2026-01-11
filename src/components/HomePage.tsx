import {
  Calendar,
  Users,
  MapPin,
  History as HistoryIcon,
  Phone,
  Mail,
  Star,
  Shield,
  ArrowRight,
  Clock,
  TrendingUp,
  Baby,
} from "lucide-react";

interface HomePageProps {
  user: any;
  onNavigate: (page: string) => void;
}

export default function HomePage({
  user,
  onNavigate,
}: HomePageProps) {
  const upcomingRides = [
    {
      id: 1,
      child: "Ciara Mitchell",
      time: "8:00 AM",
      date: "Today",
      pickup: "123 Main St",
      dropoff: "Wairoa Primary School",
      driver: "Mike Kereama",
      status: "confirmed",
    },
    {
      id: 2,
      child: "Johnny Whaanga",
      time: "3:15 PM",
      date: "Today",
      pickup: "Lincoln Middle School",
      dropoff: "123 Main St",
      driver: "Mike Kereama",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-full bg-[#f8fafc] pb-24">
      {/* Welcome Section */}
      <div className="px-6 pt-8 pb-10 rounded-b-[32px] shadow-card mb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <h2 className="text-white mb-2">
          Welcome back, {user?.name?.split(" ")[0] || "Sarah"}! 👋
        </h2>
        <p className="text-white/90">Safe rides for your family in Wairoa</p>
      </div>

      <div className="px-4 space-y-6">
        {/* Quick Actions */}
        <div className="px-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate("manage-children")}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#2F6F9F' }}>
                <Baby className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-gray-900 mb-1">Children</h4>
                <p className="text-gray-500 text-sm">Manage profiles</p>
              </div>
            </button>
            <button
              onClick={() => onNavigate("history")}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#5699D2' }}>
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-gray-900 mb-1">History</h4>
                <p className="text-gray-500 text-sm">Past rides</p>
              </div>
            </button>
          </div>
        </div>

        {/* Upcoming Rides */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-slate-900">Today's Rides</h3>
            <button
              onClick={() => onNavigate("history")}
              className="text-sm"
              style={{ color: '#2F6F9F' }}
            >
              See all
            </button>
          </div>

          {upcomingRides.length > 0 ? (
            <div className="space-y-3">
              {upcomingRides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-white rounded-2xl p-5 shadow-card border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
                        <span className="text-base font-semibold">
                          {ride.child.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-slate-900">
                          {ride.child}
                        </h4>
                        <p className="text-slate-500 text-sm flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {ride.time}
                        </p>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-medium">
                      {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-2.5 pl-1 mb-4">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#2F6F9F' }}></div>
                        <div className="w-0.5 h-6 bg-slate-200"></div>
                      </div>
                      <div className="flex-1 -mt-1">
                        <p className="text-slate-900 text-sm font-medium">
                          {ride.pickup}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 -mt-1">
                        <p className="text-slate-900 text-sm font-medium">
                          {ride.dropoff}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate("track")}
                    className="w-full text-white py-3 rounded-xl text-sm font-medium active:scale-[0.98] transition-all"
                    style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
                  >
                    Track ride
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center shadow-card">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <h4 className="text-slate-900 mb-2">
                No upcoming rides
              </h4>
              <p className="text-slate-500 text-sm mb-5">
                Book a ride for your children
              </p>
              <button
                onClick={() => onNavigate("book")}
                className="text-white px-6 py-3 rounded-xl text-sm font-medium active:scale-[0.98] transition-all"
                style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
              >
                Book a ride
              </button>
            </div>
          )}
        </div>

        {/* Driver Card */}
        <div>
          <h3 className="text-slate-900 mb-4 px-1">
            Community Driver
          </h3>
          <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
                <span className="text-xl font-semibold">
                  MK
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 mb-1">
                  Mike Kereama
                </h4>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 text-xs font-medium">
                    Verified Community Driver
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-slate-900 text-sm font-medium">
                    5.0
                  </span>
                  <span className="text-slate-500 text-xs ml-1">
                    (147 rides)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <a
                href="tel:0214567890"
                className="flex-1 text-white py-3 rounded-xl text-sm font-medium text-center active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href="mailto:mike@wairoa.nz"
                className="flex-1 bg-slate-100 text-slate-900 py-3 rounded-xl text-sm font-medium text-center active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5" style={{ color: '#2F6F9F' }} />
            <h4 className="text-slate-900">Your Activity</h4>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            <div className="text-center">
              <div className="text-3xl mb-1" style={{ color: '#2F6F9F', fontWeight: 'bold' }}>
                2
              </div>
              <p className="text-slate-500 text-xs">Children</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                15
              </div>
              <p className="text-slate-500 text-xs">
                Total Rides
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">
                8
              </div>
              <p className="text-slate-500 text-xs">
                This Month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}