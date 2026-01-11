import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'warning'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantColors = {
    danger: {
      bg: '#FEE2E2',
      text: '#DC2626',
      button: 'bg-red-600 hover:bg-red-700'
    },
    warning: {
      bg: '#FEF3C7',
      text: '#D97706',
      button: 'bg-amber-600 hover:bg-amber-700'
    },
    info: {
      bg: '#E0F7FA',
      text: '#2F6F9F',
      button: 'bg-blue-600 hover:bg-blue-700'
    }
  };

  const colors = variantColors[variant];

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onCancel || (() => {})}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.bg }}
            >
              <AlertTriangle className="w-8 h-8" style={{ color: colors.text }} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-gray-900 text-center mb-2">{title}</h3>

          {/* Message */}
          <p className="text-gray-600 text-center mb-6">{message}</p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel || (() => {})}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors active:scale-[0.98]"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                if (onCancel) {
                  onCancel();
                }
              }}
              className={`flex-1 px-4 py-3 text-white rounded-xl transition-colors active:scale-[0.98] ${colors.button}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}