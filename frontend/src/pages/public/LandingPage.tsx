import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Sparkles, Calculator, QrCode, CheckCircle2, 
  ArrowRight, ShieldCheck, Check, X, Clock, User, Star, Ticket, 
  Zap, Award, Phone, Lock, CreditCard, ChevronRight,
  MapPin, Heart, Smartphone, Calendar, Search, Activity, Users, 
  Shield, Timer, RefreshCw, Camera, Utensils, Apple, UserPlus, LogIn, AlertCircle, LogOut,
  Layers, HeartPulse, Sparkle, Target, Flame
} from 'lucide-react';
import { Lead, ZaloZnsMessage, User as UserType } from '../../types';
import { ZaloNotificationModal } from '../../components/modals/ZaloNotificationModal';
import { MemberAuthModal } from '../../components/modals/MemberAuthModal';

interface LandingPageProps {
  currentUser?: UserType | null;
  isAccountActive?: boolean;
  accounts?: any[];
  onRegisterTrial?: (lead: Lead) => void;
  onOpenLogin?: () => void;
  onMemberAuthSuccess?: (newUser: UserType, rawPassword?: string) => void;
  onPackagePurchased?: (purchaseData: {
    buyerName: string;
    buyerPhone: string;
    buyerUsername: string;
    buyerAge: number;
    package: {
      name: string;
      price: number;
      priceStr: string;
      duration: string;
      ptSessions: number;
    };
  }) => void;
  onGoToPortal?: () => void;
  onLogout?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  currentUser,
  isAccountActive = false,
  accounts = [],
  onRegisterTrial, 
  onOpenLogin,
  onMemberAuthSuccess,
  onPackagePurchased,
  onGoToPortal,
  onLogout,
}) => {
  // Calculator State (Mifflin-St Jeor)
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<number>(172);
  const [weight, setWeight] = useState<number>(68);
  const [age, setAge] = useState<number>(23);
  const [activity, setActivity] = useState<number>(1.375);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');

  // Branch Selector State (Inspired by Anytime Fitness Gym Locator)
  const [selectedBranch, setSelectedBranch] = useState<string>('stu-campus');

  // Simple Clean Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    branch: 'STU Campus - 180 Cao Lỗ, Quận 8',
    service: 'Gym & Thể Hình Chuẩn Quốc Tế 24/7',
  });

  // Ticket Modal State
  const [showTicketModal, setShowTicketModal] = useState<boolean>(false);
  const [showZaloModal, setShowZaloModal] = useState<boolean>(false);
  const [zaloMessage, setZaloMessage] = useState<ZaloZnsMessage | null>(null);
  const [ticketData, setTicketData] = useState<{
    code: string;
    name: string;
    phone: string;
    branch: string;
    service: string;
    date: string;
  } | null>(null);

  // Member Auth Modal State (Chặn khách vãng lai, yêu cầu tạo tài khoản để đăng ký tập)
  const [showMemberAuthModal, setShowMemberAuthModal] = useState<boolean>(false);
  const [authActionNotice, setAuthActionNotice] = useState<string>(
    'Khách vãng lai cần tạo tài khoản (SĐT, Tên đăng nhập, Mật khẩu, Tên, Tuổi) để đăng ký tập.'
  );
  const [pendingBookingType, setPendingBookingType] = useState<'TRIAL' | 'PACKAGE' | null>(null);
  const [pendingPackage, setPendingPackage] = useState<{
    name: string;
    price: number;
    priceStr: string;
    duration: string;
    ptSessions: number;
  } | null>(null);

  // Auto fill form when user is logged in
  useEffect(() => {
    if (currentUser) {
      setBookingForm((prev) => ({
        ...prev,
        name: currentUser.name,
        phone: currentUser.phone,
      }));
    }
  }, [currentUser]);

  // VietQR Checkout Modal State
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    price: number;
    priceStr: string;
    duration: string;
    ptSessions: number;
  } | null>(null);
  const [countdown, setCountdown] = useState<number>(900); // 15 minutes
  const [isPaidSuccess, setIsPaidSuccess] = useState<boolean>(false);

  // GroupX Day Filter State
  const [activeDayFilter, setActiveDayFilter] = useState<string>('all');

  // Calculations for BMI & TDEE (Mifflin-St Jeor formula)
  const hm = height / 100;
  const bmi = (weight / (hm * hm)).toFixed(1);
  const bmiNum = parseFloat(bmi);

  let bmr = 10 * weight + 6.25 * height - 5 * age;
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  const tdee = Math.round(bmr * activity);
  
  let targetCalo = tdee;
  if (goal === 'lose') targetCalo = tdee - 500;
  if (goal === 'gain') targetCalo = tdee + 400;

  // Countdown timer for VietQR modal
  useEffect(() => {
    let timer: any;
    if (showCheckoutModal && countdown > 0 && !isPaidSuccess) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showCheckoutModal, countdown, isPaidSuccess]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Xác nhận thanh toán VietQR và đồng bộ ngay về CRM Admin
  const handleConfirmPayment = () => {
    setIsPaidSuccess(true);
    if (selectedPackage && onPackagePurchased) {
      const buyerName = (currentUser?.name || bookingForm.name).trim() || 'Hội Viên Mới';
      const buyerPhone = (currentUser?.phone || bookingForm.phone).trim() || '0901234567';
      const buyerUsername = currentUser?.username || buyerPhone;
      const buyerAge = currentUser?.age || 23;

      onPackagePurchased({
        buyerName,
        buyerPhone,
        buyerUsername,
        buyerAge,
        package: selectedPackage,
      });
    }
  };

  // Cấp vé và gửi thông báo Zalo ZNS mô phỏng
  const executeBooking = (userName: string, userPhone: string) => {
    const code = 'TRIAL-' + Math.floor(100000 + Math.random() * 900000);
    const newTicket = {
      code,
      name: userName,
      phone: userPhone,
      branch: bookingForm.branch,
      service: bookingForm.service,
      date: new Date().toLocaleDateString('vi-VN'),
    };

    setTicketData(newTicket);
    setShowTicketModal(true);

    const newZns: ZaloZnsMessage = {
      id: 'ZNS-' + Date.now(),
      recipientName: userName,
      recipientPhone: userPhone,
      templateType: 'TRIAL_EPASS',
      ticketCode: code,
      branchName: bookingForm.branch,
      sentAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      status: 'DELIVERED',
    };
    setZaloMessage(newZns);
    setTimeout(() => {
      setShowZaloModal(true);
    }, 600);

    if (onRegisterTrial) {
      const newLead: Lead = {
        id: Date.now(),
        ticketCode: code,
        fullName: userName,
        phone: userPhone,
        service: `${bookingForm.service} (${bookingForm.branch})`,
        status: 'NEW',
        date: new Date().toISOString().split('T')[0],
      };
      onRegisterTrial(newLead);
    }
  };

  // Xử lý nộp form nhận vé tập thử
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setAuthActionNotice(
        'Vui lòng đăng nhập hoặc tạo tài khoản (SĐT, Tên đăng nhập, Mật khẩu, Họ tên, Tuổi) để hệ thống xác thực và cấp mã vé tập thử E-Pass 0Đ!'
      );
      setPendingBookingType('TRIAL');
      setShowMemberAuthModal(true);
      return;
    }

    const userName = (currentUser.name || bookingForm.name).trim();
    const userPhone = (currentUser.phone || bookingForm.phone).trim();

    if (!userName || !userPhone) {
      alert('Vui lòng nhập đầy đủ Họ tên và Số điện thoại để nhận vé E-Pass.');
      return;
    }

    executeBooking(userName, userPhone);
  };

  // Xử lý khi bấm Đăng ký gói tập ở Bảng giá
  const handleOpenCheckout = (pkg: { name: string; price: number; priceStr: string; duration: string; ptSessions: number }) => {
    if (!currentUser) {
      setPendingPackage(pkg);
      setPendingBookingType('PACKAGE');
      setAuthActionNotice(
        `Bạn đang là khách vãng lai. Vui lòng tạo tài khoản hội viên (gồm: SĐT, Tên đăng nhập, Mật khẩu, Họ tên, Tuổi) để đăng ký gói ${pkg.name}!`
      );
      setShowMemberAuthModal(true);
      return;
    }

    setSelectedPackage(pkg);
    setCountdown(900);
    setIsPaidSuccess(false);
    setShowCheckoutModal(true);
  };

  // Callback sau khi khách tạo tài khoản hoặc đăng nhập thành công
  const handleAuthCompleted = (authenticatedUser: UserType, rawPassword?: string) => {
    if (onMemberAuthSuccess) {
      onMemberAuthSuccess(authenticatedUser, rawPassword);
    }

    setBookingForm((prev) => ({
      ...prev,
      name: authenticatedUser.name,
      phone: authenticatedUser.phone,
    }));

    if (pendingBookingType === 'TRIAL') {
      executeBooking(authenticatedUser.name, authenticatedUser.phone);
      setPendingBookingType(null);
    } else if (pendingBookingType === 'PACKAGE' && pendingPackage) {
      setSelectedPackage(pendingPackage);
      setCountdown(900);
      setIsPaidSuccess(false);
      setShowCheckoutModal(true);
      setPendingBookingType(null);
      setPendingPackage(null);
    }
  };

  // Dữ liệu chi nhánh câu lạc bộ (Chuẩn Anytime Fitness)
  const branches = [
    {
      id: 'stu-campus',
      name: 'CITYGYM STU Campus (Trụ Sở Chính)',
      address: '180 Cao Lỗ, Phường 4, Quận 8, TP.HCM',
      openHours: 'Mở cửa 24/7/365 ngày',
      hotline: '1900 8899 - 028 3850 5520',
      amenities: ['1.500m² chuẩn Olympic', 'Máy InBody 270', 'Cửa xoay QR 60s', 'Studio GroupX & Yoga', 'Locker điện tử'],
      badge: 'CƠ SỞ CHÍNH',
    },
    {
      id: 'district-1',
      name: 'CITYGYM Central Garden (Quận 1)',
      address: '328 Võ Văn Kiệt, Phường Cô Giang, Quận 1, TP.HCM',
      openHours: 'Mở cửa 24/7/365 ngày',
      hotline: '1900 8899 - Máy lẻ 101',
      amenities: ['Dàn tạ Eleiko Thụy Điển', 'HLV NASM 1-1', 'Phòng tắm cá nhân riêng biệt', 'Bãi đỗ xe ô tô'],
      badge: 'PREMIUM CLUB',
    },
    {
      id: 'district-7',
      name: 'CITYGYM Sunrise Elite (Quận 7)',
      address: '27 Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, TP.HCM',
      openHours: 'Mở cửa 24/7/365 ngày',
      hotline: '1900 8899 - Máy lẻ 102',
      amenities: ['Khu Functional Turf', 'Studio Cycling ngắm view', 'Tủ Locker FaceID', 'Phòng xông hơi khô'],
      badge: 'ELITE CLUB',
    },
  ];

  // Dữ liệu lớp học GroupX & Yoga
  const groupClasses = [
    {
      id: 1,
      name: 'Yoga Vinyasa Cân Bằng Thân Tâm',
      type: 'Yoga & Phục Hồi',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      days: ['t2', 't4', 't6'],
      daysLabel: 'Thứ 2, 4, 6',
      time: '06:30 - 07:30',
      trainer: 'HLV Hoàng Yến (ACE)',
      desc: 'Giải tỏa áp lực cổ vai gáy dân văn phòng, kéo giãn cơ toàn diện và thư thái tinh thần khởi đầu ngày mới.',
    },
    {
      id: 2,
      name: 'HIIT Metabolic Burn (Đốt Mỡ Năng Động)',
      type: 'HIIT & Tim Mạch',
      color: 'bg-red-50 text-[#DC2626] border-red-200',
      days: ['t3', 't5', 't7-cn'],
      daysLabel: 'Thứ 3, 5, CN',
      time: '18:00 - 19:00',
      trainer: 'HLV Quốc Bảo (HIIT Master)',
      desc: 'Tập ngắt quãng cường độ cao khoa học, kích hoạt trao đổi chất EPOC tiêu hao đến 600 - 800 kcal.',
    },
    {
      id: 3,
      name: 'Zumba Vũ Điệu Năng Lượng Tươi Trẻ',
      type: 'Zumba Fitness',
      color: 'bg-pink-50 text-pink-700 border-pink-200',
      days: ['t2', 't4', 't6', 't7-cn'],
      daysLabel: 'Thứ 2, 4, 6, Thứ 7',
      time: '19:15 - 20:15',
      trainer: 'HLV Minh Thư (Zumba Pro)',
      desc: 'Hòa mình vào giai điệu Latin sôi động, giải phóng endorphin vui vẻ và đốt cháy mỡ thừa tự nhiên.',
    },
    {
      id: 4,
      name: 'BodyPump Săn Chắc Định Hình Cơ',
      type: 'Kháng Lực Với Nhạc',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      days: ['t3', 't5', 't7-cn'],
      daysLabel: 'Thứ 3, 5, Thứ 7',
      time: '17:30 - 18:30',
      trainer: 'HLV Minh Tuấn (NASM)',
      desc: 'Bài tập tạ thanh đòn thông minh phối hợp âm nhạc nhịp điệu, gia tăng mật độ xương và siết thon vóc dáng.',
    },
  ];

  const filteredClasses = groupClasses.filter((c) => {
    if (activeDayFilter === 'all') return true;
    return c.days.includes(activeDayFilter);
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#DC2626] selection:text-white">
      
      {/* ==================== 1. HEADER CHUẨN THƯƠNG MẠI QUỐC TẾ (INSPIRED BY ANYTIME FITNESS) ==================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#EF4444] flex items-center justify-center text-white shadow-lg shadow-[#DC2626]/30 group-hover:scale-105 transition-all">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-xl uppercase tracking-wider text-slate-900">
                CITY<span className="text-[#DC2626]">GYM</span>
              </span>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">24/7 Fitness & Yoga Club</p>
            </div>
          </a>

          {/* Marketing Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-bold text-slate-700">
            <a href="#about" className="hover:text-[#DC2626] transition-colors">Giới Thiệu 24/7</a>
            <a href="#branches" className="hover:text-[#DC2626] transition-colors flex items-center gap-1 text-[#DC2626]">
              <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Tìm Phòng Tập</span>
            </a>
            <a href="#pillars" className="hover:text-[#DC2626] transition-colors">Lợi Thế 24/7</a>
            <a href="#amenities" className="hover:text-[#DC2626] transition-colors">Dịch Vụ & Tiện Ích</a>
            <a href="#coaching" className="hover:text-[#DC2626] transition-colors">HLV Đồng Hành</a>
            <a href="#packages" className="hover:text-[#DC2626] transition-colors">Bảng Giá Gói</a>
            <a href="#classes" className="hover:text-[#DC2626] transition-colors">Lịch GroupX</a>
            <a href="#ai-nutrition" className="hover:text-[#DC2626] transition-colors flex items-center gap-1 font-bold text-[#DC2626]">
              <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>AI Dinh Dưỡng</span>
            </a>
            <a href="#bmi-tool" className="hover:text-[#DC2626] transition-colors flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-slate-500" />
              <span>Đo BMI/TDEE</span>
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <a 
              href="#trial-section" 
              className="px-4 py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-[#DC2626]/30 hover:shadow-[#DC2626]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Tập Thử 0Đ (E-Pass)</span>
            </a>

            {/* Trạng thái tài khoản người dùng */}
            {!currentUser ? (
              <button
                onClick={() => {
                  setAuthActionNotice('Vui lòng tạo tài khoản hội viên (Họ tên, SĐT, Tuổi, Tên đăng nhập, Mật khẩu) hoặc đăng nhập để đăng ký tập.');
                  setShowMemberAuthModal(true);
                }}
                className="px-4 py-2.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:border-[#DC2626] hover:text-[#DC2626] transition-all flex items-center gap-1.5 shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#DC2626]" />
                <span className="hidden sm:inline">Đăng Ký / Đăng Nhập</span>
              </button>
            ) : isAccountActive ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] font-semibold text-slate-500">
                    {currentUser.username ? `@${currentUser.username}` : currentUser.phone}
                  </p>
                </div>

                {onGoToPortal && (
                  <button
                    onClick={onGoToPortal}
                    className="px-4 py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Vào Cổng Hội Viên</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Đăng xuất tài khoản"
                    className="px-3 py-2.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-[#DC2626] border border-slate-200 hover:border-red-200 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Đăng Xuất</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-900">{currentUser.name}</p>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    ⏳ Chờ Admin kích hoạt
                  </span>
                </div>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Đăng xuất"
                    className="px-3 py-2.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-[#DC2626] border border-slate-200 hover:border-red-200 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Đăng Xuất</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ==================== 2. HERO SECTION (ANYTIME FITNESS REAL AF MARKETING STYLE) ==================== */}
      <section id="about" className="pt-32 pb-20 px-4 max-w-7xl mx-auto text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-[#DC2626]/30 text-[#DC2626] text-xs font-black uppercase tracking-wider shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-ping" />
            <span>LET'S MAKE HEALTHY HAPPEN • 24/7 FITNESS & COACHING CLUB</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 leading-tight">
            GET TO A HEALTHIER PLACE. <br />
            <span className="bg-gradient-to-r from-[#DC2626] to-[#991B1B] bg-clip-text text-transparent">PHÒNG TẬP 24/7 CHUẨN MỰC.</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            Chào mừng bạn đến với <strong>CITYGYM</strong> — Không gian rèn luyện thể chất văn minh, không phán xét và hoàn toàn không áp lực. Tự do tập luyện bất kỳ lúc nào với thẻ số thông minh 60s, hệ thống thiết bị chuẩn Olympic và đội ngũ huấn luyện viên đồng hành tận tâm.
          </p>

          {/* Anytime Fitness Interactive Club Finder Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-[#DC2626]" />
              <span>Tìm câu lạc bộ CITYGYM gần bạn nhất để bắt đầu:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="flex-1 bg-white border border-slate-300 rounded-2xl px-4 py-3.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#DC2626] shadow-sm"
              >
                <option value="stu-campus">📍 Trụ sở chính: STU Campus (180 Cao Lỗ, Quận 8)</option>
                <option value="district-1">📍 Chi nhánh: Central Garden (Võ Văn Kiệt, Quận 1)</option>
                <option value="district-7">📍 Chi nhánh: Sunrise Elite (Nguyễn Hữu Thọ, Quận 7)</option>
              </select>

              <a
                href="#trial-section"
                className="px-6 py-3.5 rounded-2xl font-black text-xs bg-[#DC2626] hover:bg-red-700 text-white flex items-center justify-center gap-2 shadow-md transition-all whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>Nhận Vé Tập Thử Tại Đây</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-semibold pt-1">
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-600" /> Mở cửa 24/7 suốt 365 ngày</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-600" /> Đo chỉ số InBody 270 miễn phí</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-600" /> Phòng tắm nóng lạnh & Locker riêng tư</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-1 justify-center lg:justify-start">
            <a 
              href="#trial-section" 
              className="px-8 py-4 rounded-2xl font-bold bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-xl shadow-[#DC2626]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5" />
              <span>Đăng Ký Vé E-Pass 03 Ngày 0Đ</span>
            </a>
            <a 
              href="#packages" 
              className="px-7 py-4 rounded-2xl font-bold bg-white border-2 border-slate-200 text-slate-700 hover:border-[#DC2626] hover:text-[#DC2626] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <CreditCard className="w-5 h-5" />
              <span>Xem Bảng Giá Gói Tập</span>
            </a>
          </div>

          {/* Quick Marketing Counters */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">24/7</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Mở cửa quanh năm</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">100<span className="text-[#DC2626]">%</span></p>
              <p className="text-xs text-slate-500 font-medium mt-1">HLV bằng cấp quốc tế</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">60<span className="text-[#DC2626]">s</span></p>
              <p className="text-xs text-slate-500 font-medium mt-1">Mã QR động bảo mật</p>
            </div>
          </div>
        </div>

        {/* Hero Card Visual Preview (Digital Membership & 24/7 Access Pass) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-[#DC2626]/30 flex items-center justify-center text-[#DC2626]">
                <Smartphone className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <h3 className="font-black text-slate-900 text-sm">Thẻ Hội Viên Số 24/7</h3>
                <p className="text-[11px] text-slate-500">Mã QR động tự động làm mới sau 60 giây</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              24/7 Realtime
            </span>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-3 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#DC2626]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444] bg-white/10 px-2.5 py-0.5 rounded-full">
                  ALL-ACCESS PASS
                </span>
                <p className="text-lg font-black text-white mt-1.5">Võ Duy Phúc</p>
                <p className="text-xs text-slate-300">Gói CityVIP 12 Tháng + PT 1-1</p>
              </div>
              <div className="w-16 h-16 bg-white p-1.5 rounded-xl shadow">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=CITYGYM-STU-VODUYPHUC" 
                  alt="QR" 
                  className="w-full h-full object-contain" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400">Thời hạn gói:</span>
                <p className="text-emerald-400 font-bold">Còn 286 ngày (Active)</p>
              </div>
              <div>
                <span className="text-slate-400">Số buổi PT 1-1:</span>
                <p className="text-amber-400 font-bold">18 / 20 buổi</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
              <span className="flex items-center gap-1 font-mono">
                <RefreshCw className="w-3 h-3 text-[#DC2626] animate-spin" />
                Mã làm mới sau: 42s
              </span>
              <span className="text-slate-400">Cơ sở: STU Campus (Q8)</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 text-left">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>Chống chụp màn hình dùng chung thẻ bằng mã động tự hủy 60s</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>Tự do mở cửa phòng tập 24/7 tại toàn bộ chi nhánh thuộc hệ thống</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>Bảo lưu linh hoạt, tự động cộng bù hạn thẻ khi kết thúc bảo lưu</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. 4 TRỤ CỘT ĐỘT PHÁ (INSPIRED BY ANYTIME FITNESS PILLARS) ==================== */}
      <section id="pillars" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] px-3.5 py-1.5 bg-red-50 rounded-full border border-red-200">
              GIÁ TRỊ KHÁC BIỆT CỦA CITYGYM
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              4 TRỤ CỘT RÈN LUYỆN TOÀN DIỆN
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              Thiết kế dựa trên trải nghiệm hội viên toàn diện: từ sự tự do về thời gian, huấn luyện cá nhân chuyên sâu cho đến môi trường văn minh, tích cực.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1: 24/7 Access */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-[#DC2626] transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Timer className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Tự Do Tập Luyện 24/7</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Không bao giờ trễ giờ tập! Phòng tập mở cửa suốt 24 giờ mỗi ngày, 365 ngày mỗi năm. Thích hợp cho sinh viên, dân văn phòng hoặc người làm việc theo ca kíp.
              </p>
              <div className="pt-2 text-[11px] font-bold text-[#DC2626] flex items-center gap-1">
                <span>Check-in QR Cửa Cổng 24/7</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Pillar 2: 360 Coaching */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-[#DC2626] transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Huấn Luyện Viên 360°</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                HLV không chỉ đếm số lần nâng tạ. Chúng tôi đo chỉ số InBody 270 định kỳ, thiết kế bài tập kháng lực và thực đơn dinh dưỡng cá nhân bám sát mục tiêu.
              </p>
              <div className="pt-2 text-[11px] font-bold text-[#DC2626] flex items-center gap-1">
                <span>Đội ngũ chứng chỉ NASM & ACE</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Pillar 3: Digital Ecosystem */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-[#DC2626] transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Hệ Sinh Thái Số</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tất cả gói gọn trong một cổng hội viên: lấy mã QR động bảo mật, đặt lịch tập 1-1 với PT chống trùng giờ, xem lịch GroupX và thanh toán VietQR tự động.
              </p>
              <div className="pt-2 text-[11px] font-bold text-[#DC2626] flex items-center gap-1">
                <span>Công nghệ Web App Realtime</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Pillar 4: Supportive Community */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-[#DC2626] transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Không Gian Thân Thiện</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Xóa tan mọi áp lực tự ti của người mới bắt đầu! CITYGYM chào đón mọi lứa tuổi, vóc dáng và thể trạng bằng sự tôn trọng, văn minh và tận tâm hỗ trợ.
              </p>
              <div className="pt-2 text-[11px] font-bold text-[#DC2626] flex items-center gap-1">
                <span>Môi trường tập luyện văn minh</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 4. DỊCH VỤ & TIỆN ÍCH TIÊU CHUẨN 5 SAO (AMENITIES - CHUẨN ANYTIME FITNESS) ==================== */}
      <section id="amenities" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] px-3.5 py-1.5 bg-red-50 rounded-full border border-red-200">
              TRẢI NGHIỆM TIÊU CHUẨN 5 SAO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              TRANG THIẾT BỊ & TIỆN ÍCH ĐỈNH CAO
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              Không gian được phân chia khoa học thành 6 chuyên khu tập luyện biệt lập, đáp ứng mọi cấp độ từ người mới bắt đầu đến vận động viên chuyên nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Amenity 1 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 hover:border-[#DC2626] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#DC2626] flex items-center justify-center shadow-sm">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Khu Tạ Tự Do (Free Weights)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trang bị đầy đủ dàn tạ tay Dumbbell từ 2.5kg đến 50kg, ghế Bench đa góc độ, khung Power Rack và thanh đòn chuẩn Olympic Eleiko.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Không giới hạn thời gian tập</span>
              </div>
            </div>

            {/* Amenity 2 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 hover:border-[#DC2626] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#DC2626] flex items-center justify-center shadow-sm">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Máy Kháng Lực Khối (Pin-Loaded)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dàn máy khối cao cấp nhập khẩu (LifeFitness, Hammer Strength) với quỹ đạo chuẩn xác, giúp cô lập cơ bắp an toàn, giảm nguy cơ chấn thương.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Có sơ đồ hướng dẫn trên từng máy</span>
              </div>
            </div>

            {/* Amenity 3 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 hover:border-[#DC2626] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#DC2626] flex items-center justify-center shadow-sm">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Cardio Deck View Toàn Cảnh</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Máy chạy bộ đệm khí chống đau khớp, xe đạp Spinning và cầu thang Stepmill tích hợp màn hình cảm ứng giải trí đa phương tiện.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Đo nhịp tim và calo đốt cháy liên tục</span>
              </div>
            </div>

            {/* Amenity 4 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 hover:border-[#DC2626] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#DC2626] flex items-center justify-center shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Khu Chức Năng (Functional Turf)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đường băng thảm cỏ nhân tạo, dây kháng lực TRX, tạ chuông Kettlebell, bóng tạ Slam Ball cho các bài tập vận động dẻo dai toàn diện.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Luyện sức bền và tốc độ bứt phá</span>
              </div>
            </div>

            {/* Amenity 5 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 hover:border-[#DC2626] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#DC2626] flex items-center justify-center shadow-sm">
                <Sparkle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Studio GroupX & Yoga Cách Âm</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sàn gỗ cao cấp đàn hồi bảo vệ khớp gối, hệ thống ánh sáng trị liệu và dàn âm thanh truyền cảm hứng cho các lớp Yoga, Zumba, HIIT.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Miễn phí vé tham gia cho hội viên VIP</span>
              </div>
            </div>

            {/* Amenity 6 */}
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 hover:border-[#DC2626] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#DC2626] flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Phòng Tắm & Locker Riêng Biệt</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buồng tắm nước nóng riêng tư, máy sấy tóc hiện đại và tủ locker mã số điện tử bảo mật cao, đảm bảo sự an tâm và thoải mái tối đa.
              </p>
              <div className="pt-2 text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Vệ sinh kháng khuẩn liên tục 24/7</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== 5. REAL COACHING FOR REAL PEOPLE (THAY THẾ HOÀN TOÀN NO PAIN NO GAIN) ==================== */}
      <section id="coaching" className="py-20 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#DC2626]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#EF4444] px-3.5 py-1.5 bg-red-500/10 rounded-full border border-red-500/20">
              REAL COACHING FOR REAL PEOPLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              HUẤN LUYỆN VIÊN ĐỒNG HÀNH, KẾT QUẢ THẬT
            </h2>
            <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Đi một mình không bao giờ là định nghĩa của sức mạnh. Tại CITYGYM, bạn không bao giờ phải bơ vơ giữa phòng tập. Đội ngũ HLV chứng chỉ quốc tế sẽ đồng hành cùng bạn trên từng bước tiến bộ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4 hover:border-[#DC2626] transition-all">
              <span className="w-10 h-10 rounded-2xl bg-red-500/20 text-[#EF4444] font-black text-sm flex items-center justify-center border border-red-500/30">
                01
              </span>
              <h3 className="text-xl font-black text-white">Khảo Sát & Đo InBody 270</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Đánh giá chính xác tỷ lệ mỡ dưới da, mỡ nội tạng, khối lượng cơ từng chi và tốc độ trao đổi chất cơ bản (BMR) để làm cơ sở khoa học ban đầu.
              </p>
              <div className="pt-2 text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Không phỏng đoán mơ hồ</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4 hover:border-[#DC2626] transition-all">
              <span className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-500/30">
                02
              </span>
              <h3 className="text-xl font-black text-white">Lộ Trình Cá Nhân Hóa 100%</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Thiết kế giáo án tập luyện riêng bám sát mục tiêu: giảm mỡ, tăng cơ, cải thiện đau lưng mỏi gáy văn phòng hay nâng cao sức bền thể lực.
              </p>
              <div className="pt-2 text-[11px] text-blue-400 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-400" />
                <span>Phù hợp thời gian biểu của bạn</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4 hover:border-[#DC2626] transition-all">
              <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 font-black text-sm flex items-center justify-center border border-emerald-500/30">
                03
              </span>
              <h3 className="text-xl font-black text-white">Đồng Hành & Dinh Dưỡng AI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                HLV chỉnh sửa chuẩn từng động tác tránh chấn thương, kết hợp AI Food Scanner gợi ý thực đơn lành mạnh, theo dõi tiến độ mỗi 2 tuần.
              </p>
              <div className="pt-2 text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Động viên kiên trì mỗi ngày</span>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <a
              href="#trial-section"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white font-bold text-xs shadow-xl shadow-[#DC2626]/30 inline-flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Ticket className="w-4 h-4" />
              <span>Đăng Ký Buổi Trải Nghiệm Cùng Huấn Luyện Viên 0Đ</span>
            </a>
          </div>

        </div>
      </section>

      {/* ==================== 6. HỆ THỐNG CÂU LẠC BỘ (ANYTIME FITNESS CLUB LOCATOR) ==================== */}
      <section id="branches" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">HỆ THỐNG CÂU LẠC BỘ</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              DANH SÁCH CHI NHÁNH CITYGYM
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Một thẻ hội viên — Tự do mở cửa tập luyện tại tất cả các cơ sở trong hệ thống.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {branches.map((b) => (
              <div 
                key={b.id} 
                className={`p-7 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                  selectedBranch === b.id 
                    ? 'border-[#DC2626] shadow-xl bg-gradient-to-b from-red-50/40 to-white' 
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-[#DC2626] text-white">
                      {b.badge}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      24/7 Open
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">{b.name}</h3>
                  <p className="text-xs text-slate-600 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{b.openHours}</span>
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    {b.amenities.map((a, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="#trial-section"
                    onClick={() => {
                      setSelectedBranch(b.id);
                      setBookingForm({ ...bookingForm, branch: b.name });
                    }}
                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-[#DC2626] text-white flex items-center justify-center gap-1.5 transition-all shadow"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Chọn Tập Thử Tại Đây</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== 7. FORM ĐĂNG KÝ VÉ TẬP THỬ 03 NGÀY 0Đ (E-PASS LEAD MAGNET) ==================== */}
      <section id="trial-section" className="py-24 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-10 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] px-3.5 py-1.5 bg-red-50 rounded-full border border-red-200">
              TRẢI NGHIỆM MIỄN PHÍ 100%
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              ĐĂNG KÝ VÉ TẬP THỬ 03 NGÀY 0Đ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Nhập tên và số điện thoại để nhận ngay mã vé điện tử <strong className="text-slate-800">E-Pass QR</strong> mở cổng tự do trải nghiệm tại phòng tập!
            </p>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto relative">
            <form onSubmit={handleBookingSubmit} className="space-y-5">

              {!currentUser ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs text-left">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <p className="font-bold text-xs uppercase tracking-wide text-amber-900">
                      🔐 Yêu Cầu Xác Thực Tài Khoản:
                    </p>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Để đăng ký vé tập thử E-Pass 0Đ hoặc mua gói, bạn cần <strong>Tạo tài khoản hoặc Đăng nhập</strong> (SĐT, Tên đăng nhập, Mật khẩu, Họ tên, Tuổi).
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthActionNotice('Vui lòng tạo tài khoản hoặc đăng nhập để tiếp tục nhận vé tập thử E-Pass 0Đ.');
                        setPendingBookingType('TRIAL');
                        setShowMemberAuthModal(true);
                      }}
                      className="mt-1 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] inline-flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Đăng Nhập / Tạo Tài Khoản Để Nhận Vé</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 text-xs text-left">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wide">Đã Xác Thực Thông Tin:</p>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      Khách hàng: <strong>{currentUser.name}</strong> {currentUser.age ? `(${currentUser.age} tuổi)` : ''} • SĐT: <strong>{currentUser.phone}</strong> • Tài khoản: <strong>@{currentUser.username || 'member'}</strong>.
                    </p>
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Họ và tên của bạn:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Võ Duy Phúc"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-2xl px-4 py-3.5 text-slate-900 text-sm font-semibold focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Số điện thoại nhận mã QR:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0901234567"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-2xl px-4 py-3.5 text-slate-900 text-sm font-semibold focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Chọn câu lạc bộ muốn trải nghiệm:
                </label>
                <select
                  value={bookingForm.branch}
                  onChange={(e) => setBookingForm({ ...bookingForm, branch: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-2xl px-4 py-3.5 text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 transition-all shadow-sm"
                >
                  <option>STU Campus - 180 Cao Lỗ, Quận 8</option>
                  <option>Central Garden - Võ Văn Kiệt, Quận 1</option>
                  <option>Sunrise Elite - Nguyễn Hữu Thọ, Quận 7</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Dịch vụ bạn quan tâm nhất:
                </label>
                <select
                  value={bookingForm.service}
                  onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-2xl px-4 py-3.5 text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 transition-all shadow-sm"
                >
                  <option>Gym & Thể Hình Chuẩn Quốc Tế (24/7 Access)</option>
                  <option>Tập 1-1 Cùng Huấn Luyện Viên Cá Nhân (PT)</option>
                  <option>Lớp Yoga Vinyasa Cân Bằng Thân Tâm</option>
                  <option>Lớp GroupX & HIIT Đốt Mỡ Năng Động</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-[#DC2626] to-[#EF4444] hover:from-red-700 hover:to-red-600 text-white shadow-xl shadow-[#DC2626]/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Ticket className="w-5 h-5" />
                  <span>Nhận Ngay Mã Vé E-Pass 0Đ</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Miễn phí 100%</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Có hiệu lực 03 ngày</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tặng 01 buổi đo InBody</span>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* ==================== 8. BẢNG GIÁ MINH BẠCH (MEMBERSHIP PLANS) ==================== */}
      <section id="packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">BẢNG GIÁ MINH BẠCH</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              CÁC GÓI HỘI VIÊN CHÍNH THỨC
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Tự do vào tập 24/7, bảo lưu thẻ linh hoạt, đo InBody định kỳ và HLV kèm 1-1 chuyên sâu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Basic */}
            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Khởi động</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">CityBasic 1 Tháng</h3>
                <p className="text-3xl font-black text-slate-900 mt-3">650.000 đ</p>
                <p className="text-xs text-slate-400">Thời hạn: 30 ngày tập luyện</p>

                <div className="space-y-2.5 pt-5 text-xs text-slate-600">
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tập Gym 24/7 không giới hạn giờ</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tủ locker & Tắm nóng lạnh</p>
                  <p className="flex items-center gap-2 text-slate-400"><X className="w-4 h-4 text-slate-300" /> Không tặng buổi PT</p>
                  <p className="flex items-center gap-2 text-slate-400"><X className="w-4 h-4 text-slate-300" /> Không hỗ trợ bảo lưu</p>
                </div>
              </div>
              <button 
                onClick={() => handleOpenCheckout({ name: 'CityBasic 1 Tháng', price: 650000, priceStr: '650.000 đ', duration: '30 ngày', ptSessions: 0 })}
                className="w-full py-3 rounded-2xl border-2 border-slate-200 font-bold text-xs text-slate-700 hover:border-[#DC2626] hover:text-[#DC2626] transition-all flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-4 h-4" />
                <span>Thanh Toán VietQR Ngay</span>
              </button>
            </div>

            {/* VIP 12 Months */}
            <div className="bg-white p-7 rounded-3xl border-2 border-[#DC2626] shadow-xl space-y-5 flex flex-col justify-between relative hover:scale-[1.01] transition-all">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#DC2626] text-white px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                KHUYÊN DÙNG NHẤT
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626]">Đẳng cấp toàn diện</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">CityVIP 12 Tháng</h3>
                <p className="text-3xl font-black text-[#DC2626] mt-3">5.800.000 đ</p>
                <p className="text-xs text-slate-400">Thời hạn: 365 ngày (Chỉ 483k/tháng)</p>

                <div className="space-y-2.5 pt-5 text-xs text-slate-600">
                  <p className="flex items-center gap-2 font-bold text-slate-900"><Check className="w-4 h-4 text-emerald-600" /> Tặng 20 buổi kèm PT cá nhân (Trị giá 5 triệu)</p>
                  <p className="flex items-center gap-2 font-bold text-slate-900"><Check className="w-4 h-4 text-emerald-600" /> Tập 24/7 TOÀN BỘ chi nhánh trong hệ thống</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Bảo lưu tối đa 60 ngày linh hoạt</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Đo chỉ số InBody 270 mỗi 2 tuần</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tự do tham gia mọi lớp GroupX & Yoga</p>
                </div>
              </div>
              <button 
                onClick={() => handleOpenCheckout({ name: 'CityVIP 12 Tháng', price: 5800000, priceStr: '5.800.000 đ', duration: '365 ngày', ptSessions: 20 })}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white font-black text-xs shadow-lg shadow-[#DC2626]/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-4 h-4" />
                <span>Thanh Toán VietQR Nhận Ưu Đãi</span>
              </button>
            </div>

            {/* Pro 6 Months */}
            <div className="bg-slate-50 p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phổ biến</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">CityPro 6 Tháng</h3>
                <p className="text-3xl font-black text-slate-900 mt-3">3.200.000 đ</p>
                <p className="text-xs text-slate-400">Thời hạn: 180 ngày tập luyện</p>

                <div className="space-y-2.5 pt-5 text-xs text-slate-600">
                  <p className="flex items-center gap-2 font-bold text-slate-900"><Check className="w-4 h-4 text-emerald-600" /> Tặng 05 buổi kèm PT cá nhân</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Bảo lưu tối đa 30 ngày linh hoạt</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Đo chỉ số InBody định kỳ</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Lớp GroupX & Cycling cuối tuần</p>
                </div>
              </div>
              <button 
                onClick={() => handleOpenCheckout({ name: 'CityPro 6 Tháng', price: 3200000, priceStr: '3.200.000 đ', duration: '180 ngày', ptSessions: 5 })}
                className="w-full py-3 rounded-2xl border-2 border-slate-200 font-bold text-xs text-slate-700 hover:border-[#DC2626] hover:text-[#DC2626] transition-all flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-4 h-4" />
                <span>Thanh Toán VietQR Ngay</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 9. GROUP CLASSES SCHEDULE ==================== */}
      <section id="classes" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">THỜI KHÓA BIỂU GROUPX</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              LỊCH LỚP TẬP NHÓM NĂNG ĐỘNG
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Được tổ chức liên tục từ sáng sớm đến tối muộn cùng HLV truyền cảm hứng.
            </p>

            <div className="flex flex-wrap justify-center gap-2 pt-3">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 't2', label: 'Thứ 2' },
                { id: 't3', label: 'Thứ 3' },
                { id: 't4', label: 'Thứ 4' },
                { id: 't5', label: 'Thứ 5' },
                { id: 't6', label: 'Thứ 6' },
                { id: 't7-cn', label: 'Cuối tuần' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDayFilter(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeDayFilter === tab.id
                      ? 'bg-[#DC2626] text-white shadow-md'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {filteredClasses.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${item.color}`}>
                    {item.type}
                  </span>
                  <h3 className="text-base font-black text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1 font-bold text-slate-900"><Clock className="w-3.5 h-3.5 text-[#DC2626]" /> {item.time}</span>
                  <span>{item.daysLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 10. HUẤN LUYỆN VIÊN (PT) CHỨNG CHỈ QUỐC TẾ ==================== */}
      <section id="trainers" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">CHUYÊN NGHIỆP & TẬN TÂM</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              ĐỘI NGŨ HUẤN LUYỆN VIÊN (PT)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              100% sở hữu chứng chỉ quốc tế uy tín, thiết kế bài tập bám sát từng thể trạng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Nguyễn Minh Tuấn',
                cert: 'NASM Certified CPT',
                spec: 'Tăng cơ Hypertrophy & Dinh dưỡng thể hình',
                exp: '6 năm kinh nghiệm',
              },
              {
                name: 'Trần Hoàng Yến',
                cert: 'ACE Certified Personal Trainer',
                spec: 'Siết mỡ Body Tone & Yoga Vinyasa phục hồi',
                exp: '5 năm kinh nghiệm',
              },
              {
                name: 'Lê Văn Hùng',
                cert: 'CSCS & Functional Movement',
                spec: 'Sức mạnh Athletic & Phục hồi cơ xương khớp',
                exp: '7 năm kinh nghiệm',
              },
            ].map((t) => (
              <div key={t.name} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3 shadow-sm hover:border-[#DC2626] transition-all">
                <div className="w-20 h-20 rounded-full bg-red-50 text-[#DC2626] flex items-center justify-center mx-auto font-black text-2xl border-2 border-[#DC2626]">
                  {t.name.split(' ').pop()?.[0]}
                </div>
                <h4 className="text-lg font-black text-slate-900">{t.name}</h4>
                <p className="text-xs font-bold text-[#DC2626]">{t.cert}</p>
                <p className="text-xs text-slate-500">{t.spec}</p>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-white border border-slate-200 text-slate-600">
                  {t.exp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 11. CÔNG CỤ ĐO BMI & TDEE Y KHOA ==================== */}
      <section id="bmi-tool" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">CÔNG CỤ PHÂN TÍCH Y KHOA</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              TÍNH CHỈ SỐ BMI, BMR & TDEE MIỄN PHÍ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Công thức khoa học Mifflin-St Jeor được ứng dụng trong Luận văn STU.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Giới tính:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      gender === 'male' ? 'bg-[#DC2626] text-white border-[#DC2626]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Nam
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      gender === 'female' ? 'bg-[#DC2626] text-white border-[#DC2626]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Nữ
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Chiều cao (cm):</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Cân nặng (kg):</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Tuổi:</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Cường độ vận động:</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value={1.2}>Ít vận động (1.2)</option>
                    <option value={1.375}>Vừa phải 3-5 buổi/tuần (1.375)</option>
                    <option value={1.55}>Chăm chỉ 6-7 buổi/tuần (1.55)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Mục tiêu:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'lose', label: 'Giảm mỡ' },
                    { id: 'maintain', label: 'Duy trì' },
                    { id: 'gain', label: 'Tăng cơ' },
                  ].map((g) => (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => setGoal(g.id as any)}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        goal === g.id ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-black uppercase text-[#DC2626]">Kết Quả Phân Tích</span>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Chỉ số BMI</span>
                    <p className="text-2xl font-black text-slate-900 mt-1">{bmi}</p>
                    <span className="text-[10px] font-bold text-emerald-600">
                      {bmiNum < 18.5 ? 'Thiếu cân' : bmiNum <= 24.9 ? 'Cân đối chuẩn' : 'Thừa cân nhẹ'}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Năng lượng BMR</span>
                    <p className="text-2xl font-black text-slate-900 mt-1">{Math.round(bmr)}</p>
                    <span className="text-[10px] text-slate-400">kcal tiêu hao cơ bản</span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-red-50/70 border border-red-200">
                  <span className="text-xs font-bold text-slate-700">Mức Calo Đề Xuất Hàng Ngày:</span>
                  <p className="text-3xl font-black text-[#DC2626] mt-1">{targetCalo} kcal</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {goal === 'lose'
                      ? 'Thâm hụt calo an toàn 500 kcal/ngày để giảm mỡ hiệu quả.'
                      : goal === 'gain'
                      ? 'Dư thừa calo nhẹ 400 kcal/ngày kết hợp tập kháng lực tăng cơ.'
                      : 'Mức calo cân bằng duy trì vóc dáng và sức bền.'}
                  </p>
                </div>
              </div>

              <a
                href="#trial-section"
                className="w-full py-3 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl text-xs text-center shadow flex items-center justify-center gap-1.5"
              >
                <span>Nhận Lộ Trình Tập 1-1 Theo Thể Trạng Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 12. AI VISION NUTRITION & FOOD SCANNER (STU 2026 INNOVATION) ==================== */}
      <section id="ai-nutrition" className="py-24 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DC2626]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 px-3.5 py-1.5 bg-white/10 rounded-full border border-amber-400/30 flex items-center justify-center gap-1.5 w-max mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CÔNG NGHỆ ĐỘT PHÁ LUẬN VĂN STU 2026</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              AI FOOD SCANNER & THEO DÕI DINH DƯỠNG
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Chỉ cần chụp ảnh món ăn bằng điện thoại — Hệ thống AI Vision tự động nhận diện thành phần, bóc tách Calo và Macro (Đạm, Tinh bột, Béo) trong 2 giây!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            
            {/* Left: 3 Process Steps */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2 hover:border-[#DC2626] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 text-[#DC2626] flex items-center justify-center font-black">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-base">1. Chụp Ảnh Món Ăn Bất Kỳ</h4>
                    <p className="text-xs text-slate-400">Không cần cân đo thủ công hay tìm kiếm tên nguyên liệu phức tạp.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2 hover:border-[#DC2626] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-base">2. AI Vision Phân Tách Macro Tức Thì</h4>
                    <p className="text-xs text-slate-400">Mạng nơ-ron nhận diện món ăn Việt & Gymer, ước tính khối lượng, Calo, Protein, Carbs, Fat.</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2 hover:border-[#DC2626] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-base">3. Đề Xuất Thực Đơn 4 Bữa Cá Nhân Hóa</h4>
                    <p className="text-xs text-slate-400">Đồng bộ về Cổng Hội Viên để HLV theo dõi và đề xuất thực đơn tăng cơ / giảm mỡ bám sát mục tiêu.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenLogin}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white font-bold text-xs shadow-lg shadow-[#DC2626]/30 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>Đăng Nhập Cổng Hội Viên Để Trải Nghiệm AI</span>
                </button>
                <a
                  href="#trial-section"
                  className="px-6 py-3.5 rounded-2xl border border-white/20 hover:border-white text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Nhận Vé Tập Thử 0Đ</span>
                </a>
              </div>

            </div>

            {/* Right: Mockup Card of AI Food Vision */}
            <div className="lg:col-span-6 bg-slate-950 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl space-y-5">
              
              <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs">
                <span className="font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  AI Vision: Ức Gà Áp Chảo + Khoai Lang
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white/10 text-slate-300">
                  Điểm: 9.8 / 10
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
                  alt="AI Food Scan Sample"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                  🎯 AI Bounding Box: 180g Ức gà nạc + 150g Khoai lang
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-lg bg-[#DC2626] text-white text-xs font-black shadow">
                  465 kcal
                </div>
              </div>

              {/* 4 Macro Bars */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 font-bold block">Calo</span>
                  <strong className="text-white text-sm">465</strong>
                </div>
                <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <span className="text-[10px] text-blue-400 font-bold block">Đạm</span>
                  <strong className="text-blue-300 text-sm">48g</strong>
                </div>
                <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <span className="text-[10px] text-amber-400 font-bold block">Carb</span>
                  <strong className="text-amber-300 text-sm">52g</strong>
                </div>
                <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <span className="text-[10px] text-purple-400 font-bold block">Fat</span>
                  <strong className="text-purple-300 text-sm">6g</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5 italic">
                💬 <strong>AI Coach:</strong> Bữa ăn chuẩn mẫu mực! Giàu đạm nạc giúp hồi phục sợi cơ sau tập, tinh bột hấp thu chậm từ khoai lang duy trì năng lượng bền bỉ.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ==================== 13. BANNER KÊU GỌI HÀNH ĐỘNG (CTA BANNER) ==================== */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white text-center relative overflow-hidden border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 space-y-6 relative z-10">
          <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-red-500/10 text-[#EF4444] border border-red-500/20">
            BẮT ĐẦU NGAY HÔM NAY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            SẴN SÀNG CHO HÀNH TRÌNH SỐNG KHỎE CÙNG CITYGYM?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Hàng ngàn hội viên đã thay đổi vóc dáng và nâng cao chất lượng cuộc sống cùng CITYGYM. Hãy nhận ngay vé trải nghiệm 03 ngày 0Đ và cảm nhận sự khác biệt!
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#trial-section"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] hover:from-red-700 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#DC2626]/30 flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <Ticket className="w-4 h-4" />
              <span>Đăng Ký Vé E-Pass 03 Ngày 0Đ</span>
            </a>
            <a
              href="#packages"
              className="px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 flex items-center justify-center gap-2 transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>Xem Các Gói Hội Viên Ưu Đãi</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==================== 14. FOOTER CHUẨN DOANH NGHIỆP ==================== */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <Dumbbell className="w-5 h-5 text-[#DC2626]" />
              <span>CITYGYM 24/7 FITNESS</span>
            </div>
            <p className="mt-2 text-slate-500 leading-relaxed">
              Đề tài Luận văn tốt nghiệp: Xây dựng hệ thống website quản lý phòng gym và hỗ trợ hội viên theo dõi dinh dưỡng, luyện tập thông minh.
            </p>
            <p className="text-[11px] text-[#DC2626] mt-2 font-bold">Sinh viên: Võ Duy Phúc | GVHD: ThS. Bùi Nhật Bằng - STU 2026</p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase mb-2">Hệ Thống Câu Lạc Bộ</h5>
            <p className="font-semibold text-slate-300">Cơ sở 1: STU Campus - 180 Cao Lỗ, Q8, TP.HCM</p>
            <p className="mt-1">Cơ sở 2: Central Garden - 328 Võ Văn Kiệt, Q1, TP.HCM</p>
            <p className="mt-1">Cơ sở 3: Sunrise Elite - 27 Nguyễn Hữu Thọ, Q7, TP.HCM</p>
            <p className="mt-2 text-[#EF4444] font-bold">Hotline: 1900 8899 - Giờ mở cửa: 24/7 (365 ngày)</p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase mb-2">Truy Cập Quản Trị Hệ Thống</h5>
            <p className="text-slate-500">Dành riêng cho Ban quản trị, Lễ tân và Huấn luyện viên (PT):</p>
            <div className="mt-3">
              <button
                onClick={onOpenLogin}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Vào Cổng Đăng Nhập Quản Trị (#admin)</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== 15. MODAL VÉ E-PASS VIP (TẬP THỬ) ==================== */}
      {showTicketModal && ticketData && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 text-center p-6 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-[#DC2626] flex items-center justify-center mx-auto border border-[#DC2626]/20">
              <Ticket className="w-6 h-6 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-[#EF4444] tracking-widest px-2.5 py-0.5 bg-white/10 rounded-full">
                VÉ TẬP THỬ 03 NGÀY HỢP LỆ
              </span>
              <h3 className="text-xl font-black text-white mt-2">{ticketData.name}</h3>
              <p className="text-xs text-slate-400">{ticketData.service}</p>
              <p className="text-[11px] text-emerald-400 font-semibold mt-1">📍 {ticketData.branch}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-inner space-y-2 text-slate-900">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${ticketData.code}`}
                alt="Ticket QR"
                className="w-40 h-40 mx-auto object-contain"
              />
              <p className="font-mono font-black text-base text-[#DC2626] tracking-wider">{ticketData.code}</p>
              <p className="text-[10px] text-slate-500">Xuất trình mã này tại quầy Lễ tân hoặc cổng xoay để quét vào tập.</p>
            </div>

            <div className="p-2.5 bg-white/5 border border-white/10 rounded-2xl text-[11px] text-slate-300 space-y-1">
              <p className="font-semibold text-emerald-400">✓ Đã gửi thông tin đăng ký tập thử về hệ thống CRM</p>
              <p className="text-[10px] text-slate-400">
                Vé chỉ dùng quét tại cổng hoặc quầy Lễ tân. Khi chọn mua gói tập chính thức, Admin sẽ kích hoạt tài khoản truy cập Cổng Hội Viên.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setShowZaloModal(true)}
                className="w-full py-2.5 bg-[#0068ff] hover:bg-[#0052cc] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow transition-all"
              >
                <Smartphone className="w-4 h-4" />
                <span>📱 Mở Tin Nhắn Zalo ZNS Tự Động (Tích Xanh)</span>
              </button>

              <button
                onClick={() => setShowTicketModal(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-2xl text-xs transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 16. ZALO ZNS NOTIFICATION MODAL ==================== */}
      <ZaloNotificationModal
        isOpen={showZaloModal}
        onClose={() => setShowZaloModal(false)}
        message={zaloMessage}
      />

      {/* ==================== 17. VIETQR CHECKOUT MODAL ==================== */}
      {showCheckoutModal && selectedPackage && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 p-6 space-y-4 text-center">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-sm text-slate-900">Cổng Thanh Toán VietQR</h4>
                  <p className="text-[10px] text-slate-500">Chuẩn NAPAS247 liên ngân hàng</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {!isPaidSuccess ? (
              <>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gói đăng ký:</span>
                    <span className="font-bold text-slate-900">{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thời hạn:</span>
                    <span className="font-semibold text-slate-700">{selectedPackage.duration}</span>
                  </div>
                  {selectedPackage.ptSessions > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Buổi tập kèm PT:</span>
                      <span className="font-bold text-emerald-600">Tặng {selectedPackage.ptSessions} buổi</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 border-t border-slate-200 text-sm">
                    <span className="font-bold text-slate-700">Số tiền thanh toán:</span>
                    <span className="font-black text-[#DC2626]">{selectedPackage.priceStr}</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border-2 border-red-100 shadow-inner space-y-2">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=VIETQR-CITYGYM-${selectedPackage.name.replace(/\s+/g, '')}-${selectedPackage.price}`}
                    alt="VietQR"
                    className="w-44 h-44 mx-auto object-contain"
                  />
                  <div className="text-xs text-slate-500">
                    <p className="font-bold text-slate-800">NGÂN HÀNG QUÂN ĐỘI (MB BANK)</p>
                    <p>Số tài khoản: <strong className="font-mono text-slate-900">0901234567</strong></p>
                    <p>Chủ TK: <strong className="text-slate-900">VO DUY PHUC</strong></p>
                    <p className="font-mono text-[11px] text-[#DC2626] font-bold">Nội dung: CITYGYM {selectedPackage.name}</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-800">
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                    Mã QR hết hạn sau:
                  </span>
                  <span className="font-mono font-black text-sm text-[#DC2626]">{formatCountdown(countdown)}</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleConfirmPayment}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mô Phỏng Ngân Hàng Bắn Webhook (Đã Thanh Toán)</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900">Thanh Toán Thành Công! 🎉</h4>
                  <p className="text-xs text-slate-500">Hệ thống đã nhận được xác nhận thanh toán từ NAPAS247.</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-1.5">
                  <p className="text-xs font-black text-amber-900 uppercase tracking-wide">⏳ Admin Đang Xử Lý Kích Hoạt</p>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Tài khoản hội viên của bạn sẽ được <strong>Admin kích hoạt trong vòng 24 giờ</strong> sau khi xác minh thanh toán. Bạn sẽ nhận thông báo qua <strong>Zalo</strong> kèm mật khẩu đăng nhập vào Cổng Hội Viên.
                  </p>
                  <p className="text-[11px] text-amber-700 font-semibold mt-1">
                    📞 Liên hệ hỗ trợ: <strong>1900 8899</strong> (8:00 – 22:00 hàng ngày)
                  </p>
                </div>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                >
                  Đóng — Chờ Admin Kích Hoạt
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==================== 18. MODAL XÁC THỰC / TẠO TÀI KHOẢN HỘI VIÊN MỚI ==================== */}
      <MemberAuthModal
        isOpen={showMemberAuthModal}
        onClose={() => setShowMemberAuthModal(false)}
        onRegisterSuccess={handleAuthCompleted}
        onLoginSuccess={(u) => handleAuthCompleted(u)}
        pendingActionNotice={authActionNotice}
        accounts={accounts}
      />

    </div>
  );
};
