import React from 'react';
import { ShieldCheck, Dumbbell, UserCheck, Users, Home, Lock, ArrowRight } from 'lucide-react';
import { User, UserRole } from '../../types';

interface RoleSwitcherProps {
  currentUser: User | null;
  onSelectRole: (role: UserRole) => void;
  onGoLanding: () => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  currentUser,
  onSelectRole,
  onGoLanding,
}) => {
  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 text-xs px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 z-50">
      
      {/* Current State indicator */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-black text-city-red tracking-wider">CITYGYM</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-300 font-medium hidden sm:inline">
          {currentUser ? (
            <>
              Đang ở hệ thống nội bộ: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})
            </>
          ) : (
            'Giao diện công khai: Trang Chủ Giới Thiệu (Landing Page)'
          )}
        </span>
      </div>

      {/* Quick Role Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
        <button
          onClick={onGoLanding}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
            !currentUser ? 'bg-city-red text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Home className="w-3 h-3" />
          <span>Trang Chủ</span>
        </button>

        <span className="text-slate-600 hidden md:inline">|</span>
        <span className="text-slate-400 text-[10px] hidden md:inline font-bold">Chuyển Phân Hệ:</span>

        <button
          onClick={() => onSelectRole('RECEPTION')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
            currentUser?.role === 'RECEPTION' ? 'bg-city-red text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3 h-3" />
          <span>1. Lễ Tân</span>
        </button>

        <button
          onClick={() => onSelectRole('TRAINER')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
            currentUser?.role === 'TRAINER' ? 'bg-city-red text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Dumbbell className="w-3 h-3" />
          <span>2. Huấn Luyện Viên PT</span>
        </button>

        <button
          onClick={() => onSelectRole('MEMBER')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
            currentUser?.role === 'MEMBER' ? 'bg-city-red text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <UserCheck className="w-3 h-3" />
          <span>3. Hội Viên (QR 60s)</span>
        </button>

        <button
          onClick={() => onSelectRole('ADMIN')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
            currentUser?.role === 'ADMIN' ? 'bg-city-red text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Users className="w-3 h-3" />
          <span>4. Admin (Toàn Quyền)</span>
        </button>
      </div>

    </div>
  );
};

