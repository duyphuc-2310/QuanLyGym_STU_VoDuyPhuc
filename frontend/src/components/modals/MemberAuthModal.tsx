import React, { useState } from 'react';
import { 
  X, User, Phone, Lock, Calendar, ArrowRight, 
  ShieldCheck, Sparkles, UserPlus, LogIn, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { User as UserType } from '../../types';

interface MemberAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (newUser: UserType, rawPassword?: string) => void;
  onLoginSuccess: (user: UserType) => void;
  pendingActionNotice?: string;
  initialTab?: 'REGISTER' | 'LOGIN';
}

export const MemberAuthModal: React.FC<MemberAuthModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  onLoginSuccess,
  pendingActionNotice = 'Khách vãng lai cần tạo tài khoản hoặc đăng nhập để hoàn tất đăng ký tập.',
  initialTab = 'REGISTER',
}) => {
  const [tab, setTab] = useState<'REGISTER' | 'LOGIN'>(initialTab);

  // Register form fields (SĐT, tên đăng nhập, mật khẩu, tên, tuổi)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<string>('22');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Login form fields
  const [loginAccount, setLoginAccount] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (!name.trim()) {
      setRegisterError('Vui lòng nhập Họ và tên.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 9) {
      setRegisterError('Vui lòng nhập Số điện thoại hợp lệ (từ 10 chữ số).');
      return;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 12 || ageNum > 90) {
      setRegisterError('Vui lòng nhập Tuổi hợp lệ (từ 12 đến 90 tuổi).');
      return;
    }
    if (!username.trim() || username.trim().length < 3) {
      setRegisterError('Tên đăng nhập phải có ít nhất 3 ký tự.');
      return;
    }
    if (!password.trim() || password.trim().length < 6) {
      setRegisterError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    const newUser: UserType = {
      id: Date.now(),
      name: name.trim(),
      email: username.includes('@') ? username.trim() : `${username.trim().toLowerCase()}@citygym.vn`,
      phone: phone.trim(),
      role: 'MEMBER',
      department: `Hội Viên Mới (${ageNum} tuổi)`,
      age: ageNum,
      username: username.trim().toLowerCase(),
    };

    onRegisterSuccess(newUser, password);
    onClose();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginAccount.trim() || !loginPassword.trim()) {
      setLoginError('Vui lòng nhập Tên đăng nhập/SĐT và Mật khẩu.');
      return;
    }

    // Default user for member login
    const loggedUser: UserType = {
      id: Date.now(),
      name: loginAccount.includes('09') ? 'Hội Viên CITYGYM' : loginAccount,
      email: `${loginAccount.toLowerCase()}@citygym.vn`,
      phone: loginAccount.startsWith('0') ? loginAccount : '0901234567',
      role: 'MEMBER',
      department: 'Hội Viên Cá Nhân 24/7',
      age: 23,
      username: loginAccount.toLowerCase(),
    };

    onLoginSuccess(loggedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-city-red to-city-accent flex items-center justify-center text-white font-black text-sm shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide">
                {tab === 'REGISTER' ? 'Tạo Tài Khoản Hội Viên Mới' : 'Đăng Nhập Hội Viên'}
              </h3>
              <p className="text-[11px] text-slate-400">CITYGYM 24/7 Fitness Club</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notice for Guest */}
        {pendingActionNotice && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-start gap-2 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Yêu cầu hệ thống:</strong> {pendingActionNotice}
            </p>
          </div>
        )}

        {/* Tab switchers */}
        <div className="grid grid-cols-2 p-2 bg-slate-100 m-4 rounded-2xl gap-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setTab('REGISTER')}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              tab === 'REGISTER'
                ? 'bg-white text-city-red shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>1. Tạo Tài Khoản</span>
          </button>

          <button
            type="button"
            onClick={() => setTab('LOGIN')}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              tab === 'LOGIN'
                ? 'bg-white text-city-red shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>2. Đã Có Tài Khoản</span>
          </button>
        </div>

        {/* TAB 1: REGISTER FORM */}
        {tab === 'REGISTER' && (
          <form onSubmit={handleRegisterSubmit} className="px-6 pb-6 space-y-3.5 text-xs">
            {registerError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium">
                {registerError}
              </div>
            )}

            {/* Họ và tên */}
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Họ và Tên <span className="text-city-red">*</span>:
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn Nam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                />
              </div>
            </div>

            {/* SĐT & Tuổi */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Số Điện Thoại <span className="text-city-red">*</span>:
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="0901234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Tuổi <span className="text-city-red">*</span>:
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    required
                    min={12}
                    max={99}
                    placeholder="22"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                  />
                </div>
              </div>
            </div>

            {/* Tên đăng nhập */}
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Tên Đăng Nhập (Username) <span className="text-city-red">*</span>:
              </label>
              <div className="relative">
                <span className="text-slate-400 font-bold text-xs absolute left-3.5 top-1/2 -translate-y-1/2">@</span>
                <input
                  type="text"
                  required
                  placeholder="namnguyen22"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Dùng để đăng nhập vào Cổng Hội Viên sau này</p>
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Mật Khẩu <span className="text-city-red">*</span>:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Tối thiểu 6 ký tự"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-city-red to-city-accent hover:from-city-darkred hover:to-city-red text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-city-red/30 hover:scale-[1.01] transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Xác Nhận Tạo Tài Khoản & Kích Hoạt Đăng Ký</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-center pt-1">
              Bằng việc đăng ký, bạn đồng ý với Quy chế hoạt động & Quyền lợi tập luyện 24/7 của CITYGYM.
            </p>
          </form>
        )}

        {/* TAB 2: LOGIN FORM */}
        {tab === 'LOGIN' && (
          <form onSubmit={handleLoginSubmit} className="px-6 pb-6 space-y-4 text-xs">
            {loginError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium">
                {loginError}
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Tên Đăng Nhập hoặc Số Điện Thoại:
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="namnguyen22 hoặc 0901234567"
                  value={loginAccount}
                  onChange={(e) => setLoginAccount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Mật Khẩu:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập Hội Viên & Tiếp Tục</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setTab('REGISTER')}
                className="text-city-red font-bold hover:underline"
              >
                Chưa có tài khoản? Nhấp vào đây để tạo tài khoản mới
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

