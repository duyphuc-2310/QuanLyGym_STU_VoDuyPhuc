import React from 'react';
import { 
  QrCode, CreditCard, Users, Dumbbell, ShieldCheck, 
  BarChart3, LogOut, Home, User, ChevronRight, Bell
} from 'lucide-react';
import { PortalType, User as UserType } from '../../types';

interface DashboardLayoutProps {
  currentUser: UserType;
  currentTab: PortalType;
  onChangeTab: (tab: PortalType) => void;
  onLogout: () => void;
  onGoHome: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentUser,
  currentTab,
  onChangeTab,
  onLogout,
  onGoHome,
  children,
}) => {
  // Navigation items definition with role authorization check
  const allNavItems: {
    id: PortalType;
    label: string;
    icon: any;
    allowedRoles: string[];
    badge?: string;
  }[] = [
    {
      id: 'analytics',
      label: 'Dashboard BI Admin',
      icon: BarChart3,
      allowedRoles: ['ADMIN'],
    },
    {
      id: 'checkin',
      label: 'Lễ Tân Check-in Realtime',
      icon: QrCode,
      allowedRoles: ['ADMIN', 'RECEPTION'],
      badge: 'Cửa 1',
    },
    {
      id: 'memberships',
      label: 'Quản Lý Hợp Đồng & Bảo Lưu',
      icon: CreditCard,
      allowedRoles: ['ADMIN', 'RECEPTION'],
    },
    {
      id: 'leads',
      label: 'CRM Lead Khách Tập Thử',
      icon: Users,
      allowedRoles: ['ADMIN', 'RECEPTION'],
      badge: 'Phễu',
    },
    {
      id: 'pt_portal',
      label: 'Cổng Huấn Luyện Viên PT',
      icon: Dumbbell,
      allowedRoles: ['ADMIN', 'TRAINER'],
    },
    {
      id: 'member_portal',
      label: 'Cổng Hội Viên (QR 60s)',
      icon: ShieldCheck,
      allowedRoles: ['ADMIN', 'MEMBER'],
      badge: 'Cá nhân',
    },
  ];

  // Filter items that current user has permission to see
  const authorizedNavItems = allNavItems.filter((item) =>
    item.allowedRoles.includes(currentUser.role)
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 text-white flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-city-red flex items-center justify-center text-white font-black text-sm shadow-md shadow-city-red/40">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-base uppercase tracking-wider text-white">
                  CITY<span className="text-city-red">GYM</span>
                </span>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Hệ Thống Nội Bộ</p>
              </div>
            </div>
          </div>

          {/* User Profile Card in Sidebar */}
          <div className="p-4 mx-3 my-4 bg-slate-900 rounded-2xl border border-slate-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-city-red to-city-accent flex items-center justify-center text-white font-black text-xs shrink-0 shadow">
              {currentUser.name.split(' ').pop()?.[0] || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="font-black text-white text-xs truncate">{currentUser.name}</p>
              <span className="inline-block px-2 py-0.5 mt-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-city-red text-white">
                {currentUser.role === 'ADMIN'
                  ? 'Quản Trị Viên'
                  : currentUser.role === 'RECEPTION'
                  ? 'Lễ Tân Quầy'
                  : currentUser.role === 'TRAINER'
                  ? 'Huấn Luyện Viên'
                  : 'Hội Viên VIP'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            <p className="px-3 py-1.5 text-[10px] uppercase font-black tracking-widest text-slate-500">
              Phân Hệ Quản Trị
            </p>

            {authorizedNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangeTab(item.id)}
                  className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-city-red text-white shadow-lg shadow-city-red/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                        isActive ? 'bg-white text-city-red' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800 space-y-1.5">
          <button
            onClick={onGoHome}
            className="w-full px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ Giới Thiệu</span>
          </button>
          
          <button
            onClick={onLogout}
            className="w-full px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng Xuất / Đổi Vai Trò</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar in Dashboard */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold">Hệ Thống Nội Bộ</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-bold text-slate-700 capitalize">
              {currentUser.department || 'Ban Điều Hành'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Đang trực tuyến: {currentUser.name}</span>
            </span>

            <button
              onClick={onGoHome}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Landing Page</span>
            </button>
          </div>
        </header>

        {/* Routed Component View */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </div>

      </div>

    </div>
  );
};

