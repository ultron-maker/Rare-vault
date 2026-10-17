import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast, dismissToast } = useAuth();

  if (!toast) return null;

  const isAlert = toast.type === 'alert';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-fadeIn pointer-events-auto">
      <div 
        className={`p-4 rounded-2xl border shadow-2xl flex items-center justify-between gap-3 text-xs backdrop-blur-xl ${
          isAlert
            ? 'bg-[#181116]/95 border-amber-500/50 text-amber-200'
            : isInfo
            ? 'bg-[#0e1422]/95 border-blue-500/50 text-blue-200'
            : 'bg-[#091717]/95 border-emerald-500/50 text-emerald-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-xl shrink-0 ${
            isAlert ? 'bg-amber-950/80 text-amber-400' : isInfo ? 'bg-blue-950/80 text-cyan-400' : 'bg-emerald-950/80 text-emerald-400'
          }`}>
            <Bell className="w-4 h-4 fill-current" />
          </div>
          <span className="font-medium leading-relaxed">{toast.message}</span>
        </div>

        <button
          onClick={dismissToast}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
