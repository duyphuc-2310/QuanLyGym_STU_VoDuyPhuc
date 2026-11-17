import React from 'react';
import { 
  QrCode, Users, CreditCard, BarChart3, UserCheck, 
  Dumbbell, Home, ShieldCheck, ChevronRight
} from 'lucide-react';
import { PortalType } from '../../types';

interface PortalSwitcherProps {
  currentTab: PortalType;
  onChangeTab: (tab: PortalType) => void;
}

export const PortalSwitcher: React.FC<PortalSwitcherProps> = ({ currentTab, onChangeTab }) => {
  const portals: { id: PortalType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: '1. Khách Vãng Lai (Landing)', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'checkin', label: '2. Lễ Tân Check-in Realtime', icon: <QrCode className="w-3.5 h-3.5" />, badge: 'Live' },
    { id: 'memberships', label: '3. Hợp Đồng & Bảo Lưu', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'leads', label: '4. CRM Lead Khách Tập Thử', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'member_portal', label: '5. Cổng Hội Viên (QR Động)', icon: <ShieldCheck className="w-3.5 h-3.5" />, badge: '60s' },
    { id: 'pt_portal', label: '6. Cổng Huấn Luyện Viên', icon: <UserCheck className="w-3.5 h-3.5" /> },
    { id: 'analytics', label: '7. Dashboard BI Admin', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  ];

  return (
    <aside className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Brand identity */}
        <div className="flex items-center gap-2 font-bold">
          <div className="w-6 h-6 rounded-lg bg-city-red flex items-center justify-center text-white font-black text-xs shadow-sm">
            <Dumbbell className="w-3.5 h-3.5" />
          </div>
          <span className="text-city-red font-black text-sm tracking-wider">CITYGYM</span>
          <span className="text-slate-400 hidden md:inline">|</span>
          <span className="text-slate-400 text-[11px] hidden md:inline">Hệ Thống Quản Lý Toàn Diện Phòng Tập STU</span>
        </div>

        {/* Portal Switching Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {portals.map((p) => {
            const isActive = currentTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onChangeTab(p.id)}
                className={`px-2.5 py-1.5 rounded-lg font-bold text-[11px] sm:text-xs transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-city-red text-white shadow-md shadow-city-red/30 scale-[1.02]'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {p.icon}
                <span>{p.label}</span>
                {p.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? 'bg-white text-city-red' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {p.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

