import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, User, ArrowRight, Home, Dumbbell, 
  AlertCircle, KeyRound, CheckCircle2, Eye, EyeOff, HelpCircle, X, Info
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
  aliases: string[];
  dept: string; 
  desc: string;
}[] = [
  {
    role: 'ADMIN',
    name: 'ThS. Bùi Nhật Bằng & Võ Duy Phúc',
    account: 'admin@citygym.vn',
    aliases: ['admin', 'admin@citygym.vn', '0901234567'],
    dept: 'Ban Quản Trị Cấp Cao (Toàn Quyền)',
    desc: 'BI Analytics, Doanh thu, Cấp tài khoản RBAC & Toàn bộ 8 phân hệ',
  },
  {
    role: 'RECEPTION',
    name: 'Nguyễn Thị Thu (Lễ Tân)',
    account: 'letan@citygym.vn',
    aliases: ['letan', 'letan@citygym.vn', '0977889900'],
    dept: 'Quầy Tiếp Đón & Quản Lý Cửa Khẩu',
    desc: 'Quét QR Check-in cửa xoay, Hợp đồng & Bảo lưu, CRM Lead phễu',
  },
  {
    role: 'TRAINER',
    name: 'Nguyễn Minh Tuấn (HLV PT)',
    account: 'pt.tuan@citygym.vn',
    aliases: ['pt', 'pt.tuan', 'pt.tuan@citygym.vn', '0911223344'],
    dept: 'Bộ Phận Huấn Luyện Viên Cá Nhân',
    desc: 'Lịch dạy 1-1, Trừ buổi, Đo chỉ số InBody 270, AI Dinh dưỡng',
  },
  {
    role: 'MEMBER',
    name: 'Võ Duy Phúc (Hội Viên VIP)',
    account: 'phuc.vo@stu.edu.vn',
    aliases: ['member', 'phuc.vo@stu.edu.vn', '0901234567'],
    dept: 'Cổng Dịch Vụ Hội Viên Cá Nhân',
    desc: 'Thẻ QR động 60s mở cửa, Đặt lịch PT 1-1, InBody, AI Scanner',
  },
];

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onGoHome,
  accounts = [],
}) => {
  const [accountInput, setAccountInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAccountHints, setShowAccountHints] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanAccount = accountInput.trim();
    const cleanPass = passwordInput.trim();

    if (!cleanAccount || !cleanPass) {
      setErrorMessage('Vui lòng nhập đầy đủ Tài khoản/Email/SĐT và Mật khẩu.');
      return;
    }

    const lowerAccount = cleanAccount.toLowerCase();

    // 1. Kiểm tra trong danh sách tài khoản đã cấp bởi Admin (systemAccounts)
    if (accounts && accounts.length > 0) {
      const foundInAccounts = accounts.find(
        (a) =>
          (a.email && a.email.toLowerCase() === lowerAccount) ||
          a.phone === cleanAccount ||
          (a.username && a.username.toLowerCase() === lowerAccount)
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

    // 2. Kiểm tra tài khoản mẫu chuẩn hệ thống (Admin, Lễ tân, HLV, Hội viên)
    const matched = PRESET_ACCOUNTS.find(
      (a) =>
        a.account.toLowerCase() === lowerAccount ||
        a.aliases.some((alias) => alias.toLowerCase() === lowerAccount)
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

    // 3. Báo lỗi nếu thông tin không đúng
    setErrorMessage('Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại tài khoản do Admin cấp!');
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

      {/* Main Login Form Area (Centered Clean Enterprise Style) */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="space-y-2 mb-7 text-center sm:text-left">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/10 text-[#EF4444] border border-red-500/20">
              BẢO MẬT PHÂN QUYỀN RBAC NỘI BỘ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Đăng Nhập Quản Trị
            </h2>
            <p className="text-xs text-slate-400">
              Vui lòng nhập tài khoản do Admin cấp. Hệ thống sẽ tự động xác thực và chuyển hướng đến trang quản lý tương ứng với vai trò của bạn.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 mb-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-xs flex items-center gap-2.5">
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
                  placeholder="Ví dụ: admin@citygym.vn, letan, pt, SĐT..."
                  value={accountInput}
                  onChange={(e) => setAccountInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#DC2626] rounded-2xl pl-10 pr-4 py-3.5 text-xs font-semibold text-white focus:outline-none transition-all shadow-inner"
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#DC2626] rounded-2xl pl-10 pr-11 py-3.5 text-xs font-semibold text-white focus:outline-none transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#DC2626] to-[#EF4444] hover:from-red-700 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-[#DC2626]/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Lock className="w-4 h-4" />
                <span>Xác Nhận Đăng Nhập & Vào Phân Hệ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Discreet Help Button for Defense & Testing */}
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setShowAccountHints(true)}
              className="text-slate-500 hover:text-slate-300 text-[11px] font-semibold inline-flex items-center gap-1.5 transition-colors underline decoration-slate-700 hover:decoration-slate-400 underline-offset-4"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tra cứu tài khoản mẫu kiểm thử hệ thống</span>
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800 text-[11px] text-slate-500 text-center">
            Hệ thống mã hóa chuẩn AES-256 • Phân quyền độc lập theo Luận văn STU
          </div>
        </div>
      </main>

      {/* Modal Tra Cứu Tài Khoản Mẫu (Phục vụ Chấm điểm / Báo cáo) */}
      {showAccountHints && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Info className="w-5 h-5 text-emerald-400" />
                <h4 className="font-black text-sm uppercase text-white">Danh Sách Tài Khoản Kiểm Thử</h4>
              </div>
              <button
                onClick={() => setShowAccountHints(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 my-3">
              Nhập bất kỳ tài khoản nào dưới đây (Mật khẩu: <code className="text-emerald-400 font-mono">123456</code>) để hệ thống tự động nhận diện và chuyển hướng vào trang quản lý tương ứng:
            </p>

            <div className="space-y-2.5">
              {PRESET_ACCOUNTS.map((acc) => (
                <div
                  key={acc.role}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-white">{acc.name}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-slate-800 text-slate-300">
                        {acc.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Tài khoản: <strong className="text-emerald-400">{acc.account}</strong> (hoặc gõ: {acc.aliases.slice(0, 2).join(', ')})
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{acc.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountInput(acc.account);
                      setPasswordInput('123456');
                      setShowAccountHints(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-[#DC2626] text-slate-300 hover:text-white text-[11px] font-bold shrink-0 transition-colors"
                  >
                    Điền
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setShowAccountHints(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="px-6 py-3 border-t border-slate-800/80 text-center text-xs text-slate-500">
        CITYGYM STU • Luận Văn Tốt Nghiệp 2026 • Võ Duy Phúc | GVHD: ThS. Bùi Nhật Bằng
      </footer>

    </div>
  );
};
