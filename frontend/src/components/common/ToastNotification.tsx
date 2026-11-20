import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';

export interface ToastProps {
  id: number;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({
  title,
  message,
  type = 'success',
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      bg: 'bg-slate-900 border-emerald-500/40 text-emerald-400',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      barColor: 'bg-emerald-500',
    },
    error: {
      bg: 'bg-slate-900 border-red-500/40 text-red-400',
      icon: AlertCircle,
      iconColor: 'text-red-400',
      barColor: 'bg-red-500',
    },
    warning: {
      bg: 'bg-slate-900 border-amber-500/40 text-amber-400',
      icon: AlertCircle,
      iconColor: 'text-amber-400',
      barColor: 'bg-amber-500',
    },
    info: {
      bg: 'bg-slate-900 border-cyan-500/40 text-cyan-400',
      icon: Info,
      iconColor: 'text-cyan-400',
      barColor: 'bg-cyan-500',
    },
  }[type];

  const Icon = config.icon;

  return (
    <div className="fixed top-6 right-6 z-[9999] max-w-md w-full animate-in slide-in-from-top-4 fade-in duration-300">
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-md flex items-start gap-3.5 relative overflow-hidden ${config.bg}`}>
        <div className={`w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 ${config.iconColor} shadow-inner`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0 pr-6">
          {title && (
            <h5 className="font-black text-xs uppercase tracking-wider text-white mb-0.5">
              {title}
            </h5>
          )}
          <p className="text-xs font-semibold text-slate-300 leading-snug break-words">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-6 h-6 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Animated Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
          <div
            className={`h-full ${config.barColor} animate-pulse`}
            style={{
              animation: `shrinkWidth ${duration}ms linear forwards`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

