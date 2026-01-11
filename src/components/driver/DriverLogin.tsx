import { useState } from "react";
import {
  Car,
  Shield,
  Lock,
  User,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface DriverLoginProps {
  onLogin: (userData: any) => void;
  onBack?: () => void;
}

export default function DriverLogin({
  onLogin,
  onBack,
}: DriverLoginProps) {
  const [driverId, setDriverId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation for demo (driver ID: MIKE001, password: driver123)
    if (driverId === "MIKE001" && password === "driver123") {
      onLogin({
        role: "driver",
        name: "Mike Kereama",
        driverId: "MIKE001",
      });
    } else {
      setError("Invalid driver ID or password");
    }
  };

  const handleGoogleSignIn = () => {
    // Simulate Google Sign In with very brief notification
    const toastId = toast.success("Signing in with Google...", { duration: 500 });
    
    // Simulate successful Google login after a brief delay
    setTimeout(() => {
      // Dismiss the toast immediately before navigation
      toast.dismiss(toastId);
      
      onLogin({
        role: "driver",
        name: "Mike Kereama",
        driverId: "MIKE001",
      });
    }, 500);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)",
      }}
    >
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Header */}
      <div className="px-6 pt-12 pb-8 text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border-2 border-white/20">
          <Car className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-white mb-2">Pahi App Driver</h1>
        <p className="text-blue-100">Wairoa Community</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 pt-8 pb-12">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Driver Login</h2>
          <p className="text-gray-600">
            Sign in to manage your rides
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Driver ID */}
          <div>
            <label className="block text-gray-700 mb-2">
              Driver ID
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={driverId}
                onChange={(e) => {
                  setDriverId(e.target.value);
                  setError("");
                }}
                placeholder="Enter your driver ID"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-900 mb-1">
                  Demo Credentials:
                </p>
                <p className="text-blue-700 text-sm">
                  ID: <span className="font-mono">MIKE001</span>
                </p>
                <p className="text-blue-700 text-sm">
                  Password:{" "}
                  <span className="font-mono">driver123</span>
                </p>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full text-white py-4 rounded-xl font-medium shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)",
            }}
          >
            Sign In as Driver
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In Button - Big & Simple */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-white border-2 border-gray-300 hover:border-blue-400 py-4 rounded-xl transition-all active:scale-[0.98] shadow-sm hover:shadow-md flex items-center justify-center gap-3 mb-8"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-gray-700 font-semibold" style={{ fontSize: '16px' }}>Sign in with Google</span>
        </button>

        {/* Verified Badge */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-green-900">Certified Driver</p>
              <p className="text-green-700 text-sm">
                Verified by Wairoa Community
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}