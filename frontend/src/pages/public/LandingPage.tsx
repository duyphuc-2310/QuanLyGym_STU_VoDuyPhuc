import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Flame, Sparkles, Calculator, QrCode, CheckCircle2, 
  ArrowRight, ShieldCheck, Check, X, Clock, User, Star, Ticket, 
  Zap, TrendingDown, Crown, Award, Phone, Lock, CreditCard, ChevronRight
} from 'lucide-react';
import { Lead } from '../../types';

interface LandingPageProps {
  onRegisterTrial?: (lead: Lead) => void;
  onOpenLogin?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onRegisterTrial, onOpenLogin }) => {
  // Calculator State
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<number>(172);
  const [weight, setWeight] = useState<number>(68);
  const [age, setAge] = useState<number>(23);
  const [activity, setActivity] = useState<number>(1.375);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');

  // Simple Clean Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    service: 'Gym & Thể Hình Chuẩn 5 Sao',
  });

  // Ticket Modal State
  const [showTicketModal, setShowTicketModal] = useState<boolean>(false);
  const [ticketData, setTicketData] = useState<{
    code: string;
    name: string;
    phone: string;
    service: string;
    date: string;
  } | null>(null);

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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name.trim() || !bookingForm.phone.trim()) {
      alert('Vui lòng nhập Họ tên và Số điện thoại để nhận mã vé tập thử.');
      return;
    }

    const code = 'TRIAL-' + Math.floor(100000 + Math.random() * 900000);
    const newTicket = {
      code,
      name: bookingForm.name,
      phone: bookingForm.phone,
      service: bookingForm.service,
      date: new Date().toLocaleDateString('vi-VN'),
    };

    setTicketData(newTicket);
    setShowTicketModal(true);

    if (onRegisterTrial) {
      const newLead: Lead = {
        id: Date.now(),
        ticketCode: code,
        fullName: bookingForm.name,
        phone: bookingForm.phone,
        service: bookingForm.service,
        status: 'NEW',
        date: new Date().toISOString().split('T')[0],
      };
      onRegisterTrial(newLead);
    }
  };

  const handleOpenCheckout = (pkg: { name: string; price: number; priceStr: string; duration: string; ptSessions: number }) => {
    setSelectedPackage(pkg);
    setCountdown(900);
    setIsPaidSuccess(false);
    setShowCheckoutModal(true);
  };

  // GroupX Classes Data
  const groupClasses = [
    {
      id: 1,
      name: 'Yoga Vinyasa Cân Bằng Thân Tâm',
      type: 'Yoga',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      days: ['t2', 't4', 't6'],
      daysLabel: 'Thứ 2, 4, 6',
      time: '06:30 - 07:30',
      trainer: 'HLV Hoàng Yến (ACE)',
      desc: 'Thư giãn tâm trí, giải tỏa stress sau giờ làm việc và tăng độ dẻo dai toàn diện cho cột sống.',
    },
    {
      id: 2,
      name: 'HIIT Burn Fat (No Pain No Gain)',
      type: 'HIIT Cardio',
      color: 'bg-red-50 text-[#DC2626] border-red-200',
      days: ['t3', 't5', 't7-cn'],
      daysLabel: 'Thứ 3, 5, CN',
      time: '18:00 - 19:00',
      trainer: 'HLV Quốc Bảo (HIIT Coach)',
      desc: 'Tập ngắt quãng cường độ cao, kích hoạt cơ chế đốt mỡ EPOC lên đến 600 - 800 kcal mỗi buổi.',
    },
    {
      id: 3,
      name: 'Zumba Vũ Điệu Năng Lượng Đốt Mỡ',
      type: 'Zumba Dance',
      color: 'bg-pink-50 text-pink-700 border-pink-200',
      days: ['t2', 't4', 't6', 't7-cn'],
      daysLabel: 'Thứ 2, 4, 6, Thứ 7',
      time: '19:15 - 20:15',
      trainer: 'HLV Minh Thư (Zumba Pro)',
      desc: 'Hòa mình vào âm nhạc Latin sôi động, đốt cháy năng lượng sảng khoái và gắn kết hội viên.',
    },
    {
      id: 4,
      name: 'BodyPump Săn Chắc Toàn Thân',
      type: 'Tập Tạ Với Nhạc',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      days: ['t3', 't5', 't7-cn'],
      daysLabel: 'Thứ 3, 5, Thứ 7',
      time: '17:30 - 18:30',
      trainer: 'HLV Minh Tuấn (NASM)',
      desc: 'Tập kháng lực với tạ đòn thông minh theo nhịp điệu, tăng mật độ xương và siết thon gọn cơ thể.',
    },
  ];

  const filteredClasses = groupClasses.filter((c) => {
    if (activeDayFilter === 'all') return true;
    return c.days.includes(activeDayFilter);
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#DC2626] selection:text-white">
      
      {/* ==================== 1. HEADER CHUẨN THƯƠNG MẠI (ĐÃ ẨN HOÀN TOÀN QUẢN TRỊ) ==================== */}
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
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Fitness & Yoga Club</p>
            </div>
          </a>

          {/* Public Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-700">
            <a href="#about" className="hover:text-[#DC2626] transition-colors">Giới thiệu</a>
            <a href="#motivation" className="hover:text-[#DC2626] transition-colors text-[#DC2626] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>No Pain No Gain</span>
            </a>
            <a href="#packages" className="hover:text-[#DC2626] transition-colors">Bảng giá gói</a>
            <a href="#classes" className="hover:text-[#DC2626] transition-colors">Lịch lớp GroupX</a>
            <a href="#trainers" className="hover:text-[#DC2626] transition-colors">Đội ngũ PT</a>
            <a href="#bmi-tool" className="hover:text-[#DC2626] transition-colors flex items-center gap-1.5 font-bold">
              <Calculator className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Đo BMI / TDEE</span>
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <a 
              href="#trial-section" 
              className="px-6 py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-[#DC2626]/30 hover:shadow-[#DC2626]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tập Thử 0Đ (E-Pass)</span>
            </a>

            {/* Nút đăng nhập thanh lịch, kín đáo */}
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-2.5 rounded-full text-xs font-bold border border-slate-300 hover:border-[#DC2626] hover:text-[#DC2626] text-slate-700 transition-all flex items-center gap-1.5"
              title="Đăng nhập cổng quản lý hoặc truy cập URL riêng: #admin"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng Nhập</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==================== 2. HERO SECTION ==================== */}
      <section id="about" className="pt-32 pb-16 px-4 max-w-7xl mx-auto text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-[#DC2626]/30 text-[#DC2626] text-xs font-black uppercase tracking-wider shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-ping" />
            <span>SLOGAN: NO PAIN - NO GAIN</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 leading-tight">
            CHÀO MỪNG ĐẾN VỚI <br />
            <span className="bg-gradient-to-r from-[#DC2626] to-[#991B1B] bg-clip-text text-transparent">CITYGYM FITNESS</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            Không gian thể hình đẳng cấp 1.500m², thiết bị Olympic hiện đại cùng đội ngũ HLV cá nhân chuyên sâu. Số hóa quản lý thẻ, check-in bằng mã QR động và đồng hành cùng bạn trên từng nấc thang chuyển biến vóc dáng.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
            <a 
              href="#trial-section" 
              className="px-8 py-4 rounded-2xl font-bold bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-xl shadow-[#DC2626]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              <span>Đăng Ký Vé Tập Thử 03 Ngày 0Đ</span>
            </a>
            <a 
              href="#bmi-tool" 
              className="px-7 py-4 rounded-2xl font-bold bg-white border-2 border-slate-200 text-slate-700 hover:border-[#DC2626] hover:text-[#DC2626] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Calculator className="w-5 h-5" />
              <span>Đo Thể Trạng BMI / TDEE</span>
            </a>
          </div>

          {/* Quick Stats */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">1.500<span className="text-[#DC2626]">m²</span></p>
              <p className="text-xs text-slate-500 font-medium mt-1">Diện tích chuẩn Olympic</p>
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

        {/* Hero Card Visual Preview */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-[#DC2626]/30 flex items-center justify-center text-[#DC2626]">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <h3 className="font-black text-slate-900 text-sm">Thẻ Hội Viên Điện Tử</h3>
                <p className="text-[11px] text-slate-500">Mã QR động tự động làm mới 60 giây</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Realtime
            </span>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-3 text-left">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444] bg-white/10 px-2 py-0.5 rounded">Hội viên VIP</span>
                <p className="text-base font-black text-white mt-1">Võ Duy Phúc</p>
                <p className="text-xs text-slate-300">Gói CityVIP 12 Tháng + PT 1-1</p>
              </div>
              <div className="w-14 h-14 bg-white p-1 rounded-lg shadow">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=CITYGYM-STU-VODUYPHUC" 
                  alt="QR" 
                  className="w-full h-full object-contain" 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700 text-xs">
              <div>
                <span className="text-slate-400">Thời hạn gói:</span>
                <p className="text-emerald-400 font-bold">Còn 286 ngày (Active)</p>
              </div>
              <div>
                <span className="text-slate-400">Số buổi PT:</span>
                <p className="text-amber-400 font-bold">18 / 20 buổi</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 text-left">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>Chống chụp màn hình dùng chung thẻ bằng mã động 60s</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>Bảo lưu linh hoạt, tự động cộng bù hạn thẻ khi mở lại</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. MOTIVATION SECTION ==================== */}
      <section id="motivation" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#DC2626] text-xs font-black tracking-widest uppercase border border-red-200">
              <Flame className="w-4 h-4 text-[#DC2626]" />
              <span>TRIẾT LÝ RÈN LUYỆN Ý CHÍ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-slate-900 leading-tight">
              "NO PAIN - <span className="bg-gradient-to-r from-[#DC2626] to-[#991B1B] bg-clip-text text-transparent">NO GAIN</span>"
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              “Mất 1 tháng để bạn nhận ra, 2 tháng để người thân nhận ra, và 3 tháng để cả thế giới nhìn thấy sự lột xác của bạn.”
            </p>
          </div>

          {/* 3 Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-[#DC2626] transition-all">
              <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 font-black text-sm flex items-center justify-center">01</span>
              <h4 className="text-lg font-black text-slate-900">Mốc 30 Ngày</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tạo lập thói quen kỷ luật, tăng năng lượng tích cực, cải thiện giấc ngủ và giải phóng sức nặng cơ thể.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-[#DC2626] transition-all">
              <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 font-black text-sm flex items-center justify-center">02</span>
              <h4 className="text-lg font-black text-slate-900">Mốc 60 Ngày</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Cơ bắp bắt đầu săn chắc, mỡ thừa thu gọn rõ rệt. Bạn bè và gia đình bất ngờ trước sự thay đổi vóc dáng của bạn.
              </p>
            </div>

            <div className="bg-gradient-to-b from-red-50 to-white p-7 rounded-3xl border-2 border-[#DC2626] shadow-lg space-y-3">
              <span className="w-9 h-9 rounded-xl bg-[#DC2626] text-white font-black text-sm flex items-center justify-center">03</span>
              <h4 className="text-lg font-black text-[#DC2626]">Mốc 90 Ngày Lột Xác</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Tự tin với vóc dáng mơ ước! Sức khỏe bứt phá, thần thái đỉnh cao và bản lĩnh kiên định trong cuộc sống.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. FORM ĐĂNG KÝ VÉ TẬP THỬ (ĐÃ THIẾT KẾ ĐƠN GIẢN, SIÊU ĐẸP) ==================== */}
      <section id="trial-section" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-10 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626] px-3.5 py-1.5 bg-red-50 rounded-full border border-red-200">
              TRẢI NGHIỆM MIỄN PHÍ 100%
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900">
              ĐĂNG KÝ VÉ TẬP THỬ 03 NGÀY 0Đ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Chỉ cần nhập tên và số điện thoại để nhận ngay mã vé điện tử <strong className="text-slate-800">E-Pass QR</strong> mở cổng phòng tập tức thì!
            </p>
          </div>

          {/* Form thiết kế tinh giản, sang trọng */}
          <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto relative">
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              
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
                  Dịch vụ bạn muốn trải nghiệm:
                </label>
                <select
                  value={bookingForm.service}
                  onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-2xl px-4 py-3.5 text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 transition-all shadow-sm"
                >
                  <option>Gym & Thể Hình Chuẩn 5 Sao</option>
                  <option>Tập 1-1 Cùng Huấn Luyện Viên Cá Nhân (PT)</option>
                  <option>Lớp Yoga Vinyasa Thư Giãn</option>
                  <option>Lớp GroupX & HIIT Đốt Mỡ</option>
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

      {/* ==================== 5. PACKAGES PRICING SECTION ==================== */}
      <section id="packages" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">BẢNG GIÁ MINH BẠCH</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              CÁC GÓI TẬP HỘI VIÊN CHÍNH THỨC
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Bảo lưu thẻ linh hoạt, đo InBody định kỳ và huấn luyện viên kèm 1-1 chuyên sâu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Basic */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Khởi động</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">CityBasic 1 Tháng</h3>
                <p className="text-3xl font-black text-slate-900 mt-3">650.000 đ</p>
                <p className="text-xs text-slate-400">Thời hạn: 30 ngày tập luyện</p>

                <div className="space-y-2.5 pt-5 text-xs text-slate-600">
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tập Gym không giới hạn giờ</p>
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
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626]">VIP Toàn Diện 365 Ngày</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">CityVIP 12 Tháng</h3>
                <p className="text-3xl font-black text-[#DC2626] mt-3">5.800.000 đ</p>
                <p className="text-xs text-slate-400">Chỉ ~480.000 đ / tháng</p>

                <div className="space-y-2.5 pt-5 text-xs text-slate-600">
                  <p className="flex items-center gap-2 font-bold text-slate-900"><Check className="w-4 h-4 text-emerald-600" /> Tặng 20 buổi kèm 1-1 với PT cá nhân</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Bảo lưu tối đa 60 ngày tự cộng bù hạn</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Check-in điện tử bằng QR động 60s</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Toàn quyền Gym + Yoga + Xông hơi</p>
                </div>
              </div>
              <button 
                onClick={() => handleOpenCheckout({ name: 'CityVIP 12 Tháng', price: 5800000, priceStr: '5.800.000 đ', duration: '365 ngày', ptSessions: 20 })}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white font-black text-xs shadow-lg shadow-[#DC2626]/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>Đăng Ký & Quét VietQR</span>
              </button>
            </div>

            {/* Pro 6 Months */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Bán chạy</span>
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

      {/* ==================== 6. GROUP CLASSES SCHEDULE ==================== */}
      <section id="classes" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">THỜI KHÓA BIỂU GROUPX</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              LỊCH LỚP TẬP NHÓM NĂNG ĐỘNG
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Được tổ chức liên tục từ sáng sớm đến tối muộn cùng HLV truyền lửa.
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
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {filteredClasses.map((item) => (
              <div key={item.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
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

      {/* ==================== 7. TRAINERS SECTION ==================== */}
      <section id="trainers" className="py-20 bg-slate-50 border-t border-slate-200">
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
                spec: 'Tăng cơ Hypertrophy & Dinh dưỡng',
                exp: '6 năm kinh nghiệm',
              },
              {
                name: 'Trần Hoàng Yến',
                cert: 'ACE Certified Personal Trainer',
                spec: 'Siết mỡ Body Tone & Yoga Vinyasa',
                exp: '5 năm kinh nghiệm',
              },
              {
                name: 'Lê Văn Hùng',
                cert: 'CSCS & Functional Movement',
                spec: 'Sức mạnh Athletic & Phục hồi cơ',
                exp: '7 năm kinh nghiệm',
              },
            ].map((t) => (
              <div key={t.name} className="p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-3 shadow-sm hover:border-[#DC2626] transition-all">
                <div className="w-20 h-20 rounded-full bg-red-50 text-[#DC2626] flex items-center justify-center mx-auto font-black text-2xl border-2 border-[#DC2626]">
                  {t.name.split(' ').pop()?.[0]}
                </div>
                <h4 className="text-lg font-black text-slate-900">{t.name}</h4>
                <p className="text-xs font-bold text-[#DC2626]">{t.cert}</p>
                <p className="text-xs text-slate-500">{t.spec}</p>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-600">
                  {t.exp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 8. INTERACTIVE BMI & TDEE TOOL ==================== */}
      <section id="bmi-tool" className="py-20 bg-white border-t border-slate-200">
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

          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Giới tính:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      gender === 'male' ? 'bg-[#DC2626] text-white border-[#DC2626]' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    Nam
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      gender === 'female' ? 'bg-[#DC2626] text-white border-[#DC2626]' : 'bg-white text-slate-700 border-slate-200'
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
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Cân nặng (kg):</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
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
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Cường độ vận động:</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
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
                        goal === g.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-black uppercase text-[#DC2626]">Kết Quả Phân Tích</span>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Chỉ số BMI</span>
                    <p className="text-2xl font-black text-slate-900 mt-1">{bmi}</p>
                    <span className="text-[10px] font-bold text-emerald-600">
                      {bmiNum < 18.5 ? 'Thiếu cân' : bmiNum <= 24.9 ? 'Cân đối chuẩn' : 'Thừa cân nhẹ'}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
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
                className="w-full py-3 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl text-xs text-center shadow"
              >
                Nhận Lộ Trình Tập Miễn Phí
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 9. FOOTER ==================== */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <Dumbbell className="w-5 h-5 text-[#DC2626]" />
              <span>CITYGYM FITNESS</span>
            </div>
            <p className="mt-2 text-slate-500">
              Đề tài Luận văn tốt nghiệp: Xây dựng hệ thống website quản lý phòng gym và hỗ trợ hội viên theo dõi dinh dưỡng, luyện tập thông minh.
            </p>
            <p className="text-[11px] text-[#DC2626] mt-2 font-bold">Sinh viên: Võ Duy Phúc | GVHD: ThS. Bùi Nhật Bằng - STU 2026</p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase mb-2">Thông Tin Phòng Tập</h5>
            <p>Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, TP.HCM (STU Campus)</p>
            <p className="mt-1">Hotline: 1900 8899 - 028 3850 5520</p>
            <p className="mt-1">Giờ mở cửa: 06:00 - 22:00 (Thứ 2 - Chủ Nhật)</p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase mb-2">Truy Cập Quản Trị Hệ Thống</h5>
            <p>Dành riêng cho Lễ tân, Huấn luyện viên (PT) và Ban quản trị:</p>
            <div className="mt-3">
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Vào Cổng Đăng Nhập Quản Trị (#admin)</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== 10. MODAL VÉ E-PASS VIP (SANG TRỌNG, ĐƠN GIẢN) ==================== */}
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
            </div>

            {/* White QR Container */}
            <div className="bg-white p-4 rounded-2xl shadow-inner space-y-2 text-slate-900">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${ticketData.code}`}
                alt="Ticket QR"
                className="w-40 h-40 mx-auto object-contain"
              />
              <p className="font-mono font-black text-base text-[#DC2626] tracking-wider">{ticketData.code}</p>
              <p className="text-[10px] text-slate-500">Xuất trình mã này tại quầy Lễ tân để check-in vào tập.</p>
            </div>

            <button
              onClick={() => setShowTicketModal(false)}
              className="w-full py-3 bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white font-bold rounded-2xl text-xs shadow-lg shadow-[#DC2626]/30 hover:scale-[1.01] transition-all"
            >
              Lưu & Đóng
            </button>
          </div>
        </div>
      )}

      {/* ==================== 11. VIETQR CHECKOUT MODAL ==================== */}
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
                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    <p>Ngân hàng: <strong>MB Bank (Ngân hàng Quân Đội)</strong></p>
                    <p>Số tài khoản: <strong className="font-mono text-slate-900">0901234567</strong></p>
                    <p>Chủ tài khoản: <strong>CITYGYM FITNESS STU</strong></p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mã QR hết hạn sau:</span>
                  <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    {formatCountdown(countdown)}
                  </span>
                </div>

                <button
                  onClick={() => setIsPaidSuccess(true)}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                >
                  <Zap className="w-4 h-4" />
                  <span>[DEMO] Giả Lập Webhook Gạch Nợ Thành Công</span>
                </button>
              </>
            ) : (
              <div className="py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Thanh Toán Thành Công!</h3>
                  <p className="text-xs text-slate-500">Hệ thống đã nhận Webhook xác thực và tự động kích hoạt gói tập.</p>
                </div>
                <button
                  onClick={() => {
                    setShowCheckoutModal(false);
                    if (onOpenLogin) onOpenLogin();
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-lg"
                >
                  Đăng Nhập Cổng Hội Viên Để Lấy Mã QR
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
