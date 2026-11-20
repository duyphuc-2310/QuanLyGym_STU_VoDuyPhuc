import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck, Dumbbell, UserCheck, Users, ArrowRight } from 'lucide-react';
import { User, UserRole } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  accounts?: any[];
}

const PRESET_ACCOUNTS: { role: UserRole; name: string; email: string; title: string; desc: string; icon: any }[] = [
  {
    role: 'RECEPTION',
    name: 'Nguyễn Thị Thu (Lễ Tân)',
    email: 'letan@citygym.vn',
    title: 'Phân Hệ Lễ Tân & Quầy Cửa Khẩu',
    desc: 'Quét check-in mã QR Turnstile, quản lý hợp đồng, bảo lưu thẻ & CRM',
    icon: ShieldCheck,
  },
  {
    role: 'TRAINER',
    name: 'Nguyễn Minh Tuấn (HLV PT)',
    email: 'pt.tuan@citygym.vn',
    title: 'Phân Hệ Huấn Luyện Viên (PT)',
    desc: 'Xem lịch dạy 1-1, xác nhận trừ buổi tập, đo InBody 270 & tính hoa hồng',
    icon: Dumbbell,
  },
  {
    role: 'MEMBER',
    name: 'Võ Duy Phúc (Hội Viên VIP)',
    email: 'phuc.vo@stu.edu.vn',
    title: 'Phân Hệ Hội Viên Cá Nhân',
    desc: 'Thẻ điện tử QR động tự đổi mỗi 60 giây, đặt lịch tập 1-1 không trùng giờ',
    icon: UserCheck,
  },
  {
    role: 'ADMIN',
    name: 'ThS. Bùi Nhật Bằng & Phúc (Admin)',
    email: 'admin@citygym.vn',
    title: 'Phân Hệ Quản Trị Cấp Cao (Admin)',
    desc: 'Toàn quyền kiểm soát, xem BI Analytics, biểu đồ nhiệt & báo cáo doanh thu',
    icon: Users,
  },
];

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess, accounts }) => {
  const [email, setEmail] = useState('letan@citygym.vn');
  const [password, setPassword] = useState('Staff@123');

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = email.trim();

    // 1. Kiểm tra trong danh sách tài khoản hệ thống (systemAccounts)
    if (accounts && accounts.length > 0) {
      const foundInAccounts = accounts.find(
        (a) =>
          a.email.toLowerCase() === cleanInput.toLowerCase() ||
          a.phone === cleanInput ||
          (a.username && a.username.toLowerCase() === cleanInput.toLowerCase())
      );

      if (foundInAccounts) {
        if (foundInAccounts.status === 'LOCKED') {
          alert('⚠️ Tài khoản này đang ở trạng thái CHỜ ADMIN DUYỆT KÍCH HOẠT sau khi thanh toán gói tập.\n\nVui lòng đợi Admin kiểm tra kích hoạt hoặc liên hệ Hotline 1900 8899!');
          return;
        }

        onLoginSuccess({
          id: foundInAccounts.id,
          name: foundInAccounts.name,
          email: foundInAccounts.email,
          phone: foundInAccounts.phone,
          role: foundInAccounts.role,
          department: foundInAccounts.department,
          age: foundInAccounts.age,
          username: foundInAccounts.username,
        });
        onClose();
        return;
      }
    }

    // 2. Kiểm tra danh sách tài khoản mặc định
    const matched = PRESET_ACCOUNTS.find((a) => a.email.toLowerCase() === cleanInput.toLowerCase());
    if (matched) {
      onLoginSuccess({
        id: Date.now(),
        name: matched.name,
        email: matched.email,
        phone: '0901234567',
        role: matched.role,
        department: matched.title,
      });
      onClose();
    } else {
      // Default fallback
      onLoginSuccess({
        id: Date.now(),
        name: cleanInput.includes('@') ? cleanInput.split('@')[0] : cleanInput,
        email: cleanInput.includes('@') ? cleanInput : `${cleanInput}@citygym.vn`,
        phone: '0901234567',
        role: 'MEMBER',
        department: 'Hội Viên Cá Nhân',
      });
      onClose();
    }
  };

  const handleQuickLogin = (acc: typeof PRESET_ACCOUNTS[0]) => {
    onLoginSuccess({
      id: Date.now(),
      name: acc.name,
      email: acc.email,
      phone: '0901234567',
      role: acc.role,
      department: acc.title,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-city-red flex items-center justify-center text-white font-black text-sm">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base">Đăng Nhập Cổng Quản Trị Nội Bộ</h3>
              <p className="text-[11px] text-slate-400">Chọn vai trò hoặc đăng nhập bằng tài khoản được cấp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          
          {/* Quick 1-Click Role Login Cards */}
          <div className="space-y-2">
            <span className="font-black text-slate-500 uppercase tracking-wider text-[10px]">
              Chọn nhanh vai trò để kiểm tra phân quyền (Dành cho Hội đồng / Demo):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_ACCOUNTS.map((acc) => {
                const IconComponent = acc.icon;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleQuickLogin(acc)}
                    className="p-3 text-left rounded-2xl border border-slate-200 hover:border-city-red hover:bg-red-50/50 transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-city-red group-hover:text-white text-slate-700 flex items-center justify-center transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-xs">{acc.name}</p>
                        <span className="text-[10px] font-bold text-city-red">{acc.role}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{acc.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute">
              Hoặc đăng nhập thủ công
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleManualLogin} className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Email / Tài Khoản:</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@citygym.vn"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2 text-xs font-semibold focus:border-city-red focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Mật Khẩu:</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2 text-xs font-semibold focus:border-city-red focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-all"
            >
              <span>Vào Phân Hệ Quản Trị</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

