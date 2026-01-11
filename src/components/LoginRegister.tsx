import { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Shield,
  Car,
  UserPlus,
  Lock,
  Mail,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import wairoaBridge from "figma:asset/7116c7c2ae216ef1cb1e7f07902b181c1eb24364.png";
import { GRADIENTS } from "../constants/designSystem";

interface LoginRegisterProps {
  onLogin: (userData: any) => void;
  onDriverLogin: () => void;
  onBack: () => void;
}

export default function LoginRegister({
  onLogin,
  onDriverLogin,
  onBack,
}: LoginRegisterProps) {
  const [userType, setUserType] = useState<
    "caregiver" | "admin"
  >("caregiver");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for registration
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      if (!formData.name.trim()) {
        toast.error("Please enter your name");
        return;
      }
      if (!formData.phone.trim()) {
        toast.error("Please enter your phone number");
        return;
      }

      // Show success message for registration
      toast.success("Account created successfully!", {
        description: "Welcome to Pahi App",
      });
    }

    // Different user data based on role
    const userData =
      userType === "admin"
        ? {
            name: isLogin ? "Admin User" : formData.name,
            email: formData.email,
            role: userType,
          }
        : {
            name: isLogin ? "Rachel Mitchell" : formData.name,
            email: formData.email,
            phone: isLogin ? "021 234 5678" : formData.phone,
            address: "123 Main St, Wairoa",
            role: userType,
          };

    onLogin(userData);
  };

  const handleGoogleSignIn = () => {
    // Simulate Google Sign In with very brief notification
    const toastId = toast.success("Signing in with Google...", {
      duration: 500,
    });

    // Simulate successful Google login after a brief delay
    setTimeout(() => {
      // Dismiss the toast immediately before navigation
      toast.dismiss(toastId);
      
      const userData =
        userType === "admin"
          ? {
              name: "Admin User",
              email: "admin@gmail.com",
              role: userType,
            }
          : {
              name: "Rachel Mitchell",
              email: "rachel.mitchell@gmail.com",
              phone: "021 234 5678",
              address: "123 Main St, Wairoa",
              role: userType,
            };

      onLogin(userData);
    }, 500);
  };

  return (
    <div className="w-full h-full fixed inset-0 overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="min-h-full flex items-start justify-center p-4 py-6">
        <div className="w-full max-w-md">
          {/* Back Button - Top Left */}
          <button
            onClick={onBack}
            className="mb-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-all shadow-md hover:bg-white"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#2F6F9F' }} />
          </button>

          <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
            {/* Logo */}
            <div className="text-center mb-6">
              {/* Wairoa Bridge Landscape */}
              <div className="w-full h-28 rounded-2xl overflow-hidden mb-3 shadow-lg">
                <img
                  src={wairoaBridge}
                  alt="Beautiful Wairoa landscape"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h2 className="mb-2" style={{ color: "#1F2937" }}>
                Welcome to Pahi
              </h2>
              <p className="text-slate-600">
                Safe transportation for your children
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="flex gap-2 mb-5 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setUserType("caregiver")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all font-semibold text-sm ${
                  userType === "caregiver"
                    ? "text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={
                  userType === "caregiver"
                    ? {
                        background:
                          "linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)",
                      }
                    : {}
                }
              >
                <User className="w-4 h-4" />
                Caregiver
              </button>
              <button
                type="button"
                onClick={() => setUserType("admin")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all font-semibold text-sm ${
                  userType === "admin"
                    ? "text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={
                  userType === "admin"
                    ? {
                        background:
                          "linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)",
                      }
                    : {}
                }
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            </div>

            {/* Driver Login Link */}
            <div className="mb-5 p-3.5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Car className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-blue-900 font-semibold text-sm leading-tight">
                      Certified Driver?
                    </p>
                    <p className="text-blue-600 text-xs leading-tight mt-0.5">
                      Login with your driver credentials
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onDriverLogin}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all text-sm font-semibold whitespace-nowrap flex-shrink-0"
                >
                  Driver Login
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name Field - Only for Register */}
              {!isLogin && (
                <div>
                  <label className="block text-slate-700 mb-1.5 font-medium text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 transition-all"
                    placeholder="John Smith"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 mb-1.5 font-medium text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Phone Field - Only for Register */}
              {!isLogin && (
                <div>
                  <label className="block text-slate-700 mb-1.5 font-medium text-sm">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 transition-all"
                    placeholder="021 123 4567"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 mb-1.5 font-medium text-sm">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Confirm Password - Only for Register */}
              {!isLogin && (
                <div>
                  <label className="block text-slate-700 mb-1.5 font-medium text-sm">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white py-3 rounded-xl transition-all active:scale-[0.98] shadow-md font-semibold mt-4"
                style={{
                  background:
                    "linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)",
                }}
              >
                {isLogin
                  ? `Sign In as ${userType === "caregiver" ? "Caregiver" : "Admin"}`
                  : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In Button - Big & Simple */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white border-2 border-slate-300 hover:border-blue-400 py-4 rounded-xl transition-all active:scale-[0.98] shadow-sm hover:shadow-md flex items-center justify-center gap-3"
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
              <span
                className="text-slate-700 font-semibold"
                style={{ fontSize: "16px" }}
              >
                Sign in with Google
              </span>
            </button>

            {/* Login/Register Toggle Text */}
            <div className="text-center mt-6">
              {isLogin ? (
                <p className="text-slate-600">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-slate-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}