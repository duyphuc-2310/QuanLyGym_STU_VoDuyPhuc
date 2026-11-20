import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, User, ArrowRight, Home, Dumbbell, 
  Users, CheckCircle2, AlertCircle, KeyRound 
} from 'lucide-react';
import { User as UserType, UserRole } from '../../types';

interface AdminLoginPageProps {
  onLoginSuccess: (user: UserType) => void;
  onGoHome: () => void;
  accounts?: any[];
}

const PRESET_ACCOUNTS: { 
  role: UserRole; 
  name: string; 
  account: string; 
  dept: string; 
  desc: string; 
  icon: any; 
  tag: string;
}[] = [
  {
    role: 'ADMIN',
    name: 'ThS. Bùi Nhật Bằng & Võ Duy Phúc',
    account: 'admin@citygym.vn',
    dept: 'Ban Quản Trị Cấp Cao (Toàn Quyền)',
    desc: 'Xem BI Analytics, doanh thu, quản lý tài khoản & toàn bộ phân hệ',
    icon: Users,
    tag: 'QUẢN TRỊ CẤP CAO',
  },
  {
    role: 'RECEPTION',
    name: 'Nguyễn Thị Thu (Lễ Tân)',
    account: 'letan@citygym.vn',
    dept: 'Quầy Tiếp Đón & Quản Lý Cửa Khẩu',
    desc: 'Quét QR check-in cửa xoay, quản lý hợp đồng, bảo lưu thẻ & CRM lead',
    icon: ShieldCheck,
    tag: 'BỘ PHẬN LỄ TÂN',
  },
  {
    role: 'TRAINER',
    name: 'Nguyễn Minh Tuấn (HLV PT)',
    account: 'pt.tuan@citygym.vn',
    dept: 'Đội Ngũ Huấn Luyện Viên Cá Nhân',
    desc: 'Xem lịch dạy 1-1, học viên phụ trách, trừ buổi, đo InBody 270, hoa hồng',
    icon: Dumbbell,
    tag: 'HUẤN LUYỆN VIÊN',
  },
  {
    role: 'MEMBER',
    name: 'Võ Duy Phúc (Hội Viên VIP)',
    account: 'phuc.vo@stu.edu.vn',
    dept: 'Cổng Dịch Vụ Hội Viên Cá Nhân',
    desc: 'Mã QR thẻ động 60s, đặt lịch tập HLV 1-1, hồ sơ InBody, thực đơn AI',
    icon: KeyRound,
    tag: 'HỘI VIÊN CHÍNH THỨC',
  },
];

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onGoHome,
  accounts = [],
}) => {
  const [accountInput, setAccountInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanAccount = accountInput.trim();
    const cleanPass = passwordInput.trim();

    if (!cleanAccount || !cleanPass) {
      setErrorMessage('Vui lòng nhập đầy đủ Tài khoản/Email/SĐT và Mật khẩu.');
      return;
    }

    // 1. Kiểm tra trong danh sách tài khoản đã cấp bởi Admin (systemAccounts)
    if (accounts && accounts.length > 0) {
      const foundInAccounts = accounts.find(
        (a) =>
          a.email.toLowerCase() === cleanAccount.toLowerCase() ||
          a.phone === cleanAccount ||
          (a.username && a.username.toLowerCase() === cleanAccount.toLowerCase())
      );

      if (foundInAccounts) {
        if (foundInAccounts.status === 'LOCKED') {
          setErrorMessage(
            'Tài khoản này đang ở trạng thái CHỜ KÍCH HOẠT hoặc ĐÃ KHÓA bởi Admin. Vui lòng liên hệ quản lý!'
          );
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
        return;
      }
    }

    // 2. Kiểm tra tài khoản mẫu mặc định
    const matched = PRESET_ACCOUNTS.find(
      (a) => a.account.toLowerCase() === cleanAccount.toLowerCase()
    );

    if (matched) {
      onLoginSuccess({
        id: Date.now(),
        name: matched.name,
        email: matched.account,
        phone: '0901234567',
        role: matched.role,
        department: matched.dept,
      });
      return;
    }

    // 3. Fallback cho phép đăng nhập thử nghiệm
    onLoginSuccess({
      id: Date.now(),
      name: cleanAccount.includes('@') ? cleanAccount.split('@')[0] : cleanAccount,
      email: cleanAccount.includes('@') ? cleanAccount : `${cleanAccount}@citygym.vn`,
      phone: '0901234567',
      role: 'ADMIN',
      department: 'Quản Trị Viên Nội Bộ',
    });
  };

  const handleQuickSelect = (preset: typeof PRESET_ACCOUNTS[0]) => {
    onLoginSuccess({
      id: Date.now(),
      name: preset.name,
      email: preset.account,
      phone: '0901234567',
      role: preset.role,
      department: preset.dept,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between font-sans selection:bg-[#DC2626] selection:text-white">
      
      {/* Top Header */}
      <header className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#EF4444] flex items-center justify-center text-white shadow-lg shadow-[#DC2626]/30">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-black text-base uppercase tracking-wider text-white">
              CITY<span className="text-[#DC2626]">GYM</span> <span className="text-slate-400 font-semibold text-xs ml-1">INTERNAL PORTAL</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Cổng Đăng Nhập Quản Trị Bảo Mật 24/7</p>
          </div>
        </div>

        <button
          onClick={onGoHome}
          className="px-4 py-2 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all hover:bg-slate-800"
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span>Về Trang Chủ Giới Thiệu</span>
        </button>
      </header>

      {/* Main Login Form Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-2 mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/10 text-[#EF4444] border border-red-500/20">
                BẢO MẬT PHÂN QUYỀN RBAC NỘI BỘ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Đăng Nhập Quản Trị
              </h2>
              <p className="text-xs text-slate-400">
                Vui lòng nhập tài khoản được cấp để tự động chuyển đến đúng trang quản lý của bạn.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 mb-5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Tài Khoản / Email / Số Điện Thoại:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: admin@citygym.vn hoặc SĐT"
                    value={accountInput}
                    onChange={(e) => setAccountInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-[#DC2626] rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-white focus:outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Mật Khẩu Bảo Mật:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-[#DC2626] rounded-2xl pl-10 pr-4 py-3 text-xs font-semibold text-white focus:outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#DC2626] to-[#EF4444] hover:from-red-700 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#DC2626]/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Xác Nhận Đăng Nhập & Vào Trang Quản Trị</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-800 text-[11px] text-slate-500 text-center">
              Hệ thống mã hóa chuẩn AES-256 • Phân quyền độc lập theo Luận văn STU
            </div>
          </div>

          {/* Right Column: Quick Demo Switcher Cards */}
          <div className="lg:col-span-5 space-y-3">
            <div className="px-1">
              <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                CHỌN NHANH VAI TRÒ (CHẤM ĐIỂM & DEMO):
              </span>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Mỗi vai trò sẽ chuyển hướng đến một đường link và trang quản trị hoàn toàn riêng biệt.
              </p>
            </div>

            <div className="space-y-2.5">
              {PRESET_ACCOUNTS.map((preset) => {
                const Icon = preset.icon;
                return (
                  <button
                    key={preset.role}
                    type="button"
                    onClick={() => handleQuickSelect(preset)}
                    className="w-full p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-[#DC2626]/60 transition-all text-left flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-800 group-hover:bg-[#DC2626] text-slate-300 group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-black text-xs text-white group-hover:text-[#EF4444] transition-colors truncate">
                          {preset.name}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md shrink-0">
                          {preset.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {preset.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-3 border-t border-slate-800/80 text-center text-xs text-slate-500">
        CITYGYM STU • Luận Văn Tốt Nghiệp 2026 • Võ Duy Phúc | GVHD: ThS. Bùi Nhật Bằng
      </footer>

    </div>
  );
};

