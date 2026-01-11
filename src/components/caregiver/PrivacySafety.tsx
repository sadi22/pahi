import { ArrowLeft, Shield, Lock, Eye, UserCheck, FileText, AlertTriangle } from 'lucide-react';

interface PrivacySafetyProps {
  onBack: () => void;
}

export default function PrivacySafety({ onBack }: PrivacySafetyProps) {
  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(to bottom, #F0F9FF 0%, #ffffff 100%)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-6" style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-4 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span style={{ fontSize: '16px', fontWeight: 600 }}>Back</span>
        </button>

        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-white mb-1" style={{ fontSize: '24px', fontWeight: 700 }}>
              Privacy & Safety
            </h1>
            <p className="text-white/90" style={{ fontSize: '14px' }}>
              Your data protection and safety
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-5">
        {/* Data Protection */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <Lock className="w-6 h-6" style={{ color: '#2F6F9F' }} />
            </div>
            <h2 className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
              Data Protection
            </h2>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-900 mb-2" style={{ fontSize: '15px', fontWeight: 500 }}>
                Secure Data Storage
              </p>
              <p className="text-gray-600" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                All your personal information is encrypted and securely stored. We use industry-standard security measures to protect your data.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-900 mb-2" style={{ fontSize: '15px', fontWeight: 500 }}>
                Limited Data Sharing
              </p>
              <p className="text-gray-600" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                Your information is only shared with verified drivers for active rides. No third-party marketing or data selling.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-gray-900 mb-2" style={{ fontSize: '15px', fontWeight: 500 }}>
                Data Control
              </p>
              <p className="text-gray-600" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                You can request to view, update, or delete your personal data at any time. Contact support for data requests.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Features */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FEE2E2' }}
            >
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
              Safety Features
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <UserCheck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2F6F9F' }} />
              <div>
                <p className="text-gray-900 mb-1" style={{ fontSize: '15px', fontWeight: 500 }}>
                  Verified Drivers Only
                </p>
                <p className="text-gray-600" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  All drivers undergo background checks and vehicle safety inspections. Mike Kereama is our verified community driver.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <Eye className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2F6F9F' }} />
              <div>
                <p className="text-gray-900 mb-1" style={{ fontSize: '15px', fontWeight: 500 }}>
                  Live Ride Tracking
                </p>
                <p className="text-gray-600" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  Track every ride in real-time on the map. You always know where your child is during transport.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2F6F9F' }} />
              <div>
                <p className="text-gray-900 mb-1" style={{ fontSize: '15px', fontWeight: 500 }}>
                  Safety Monitoring
                </p>
                <p className="text-gray-600" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  All rides are monitored for safety. Unusual activity triggers automatic alerts to caregivers and administrators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E0F7FA' }}
            >
              <FileText className="w-6 h-6" style={{ color: '#2F6F9F' }} />
            </div>
            <h2 className="text-gray-900" style={{ fontSize: '18px', fontWeight: 600 }}>
              Policies & Terms
            </h2>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl active:scale-95 transition-all">
              <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                Privacy Policy
              </span>
              <span className="text-gray-400" style={{ fontSize: '20px' }}>›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl active:scale-95 transition-all">
              <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                Terms of Service
              </span>
              <span className="text-gray-400" style={{ fontSize: '20px' }}>›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl active:scale-95 transition-all">
              <span className="text-gray-900" style={{ fontSize: '15px', fontWeight: 500 }}>
                Community Guidelines
              </span>
              <span className="text-gray-400" style={{ fontSize: '20px' }}>›</span>
            </button>
          </div>
        </div>

        {/* Contact for Privacy Questions */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border-2 border-blue-100">
          <h3 className="text-gray-900 mb-2" style={{ fontSize: '16px', fontWeight: 600 }}>
            Privacy Questions?
          </h3>
          <p className="text-gray-700 mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
            If you have any questions about how we protect your data or our safety measures, please contact us.
          </p>
          <a
            href="tel:06838800"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, #2F6F9F 0%, #5699D2 100%)' }}
          >
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Contact Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
