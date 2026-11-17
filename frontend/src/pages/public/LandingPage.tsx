import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Flame, UserCheck, Smartphone, Sparkles, 
  Calculator, QrCode, CheckCircle2, ArrowRight, ShieldCheck, 
  Check, X, Clock, User, Star, Gift, Ticket, Scan, Quote, Zap, 
  TrendingDown, Crown, Award, Phone, Calendar, HeartPulse, Lock,
  CreditCard, RefreshCw, AlertCircle, Users, ChevronRight, Activity
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

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Gym & Thể Hình Chuẩn 5 Sao',
    date: '2026-11-15',
    time: 'Buổi chiều tối (17h - 20h)',
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

  // Calculations for BMI & TDEE
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
    if (!bookingForm.name || !bookingForm.phone) {
      alert('Vui lòng điền đầy đủ họ tên và số điện thoại.');
      return;
    }

    const code = 'TRIAL-' + Math.floor(100000 + Math.random() * 900000);
    const newTicket = {
      code,
      name: bookingForm.name,
      phone: bookingForm.phone,
      service: bookingForm.service,
      date: bookingForm.date || 'Hôm nay',
    };

    setTicketData(newTicket);
    setShowTicketModal(true);

    if (onRegisterTrial) {
      const newLead: Lead = {
        id: Date.now(),
        ticketCode: code,
        fullName: bookingForm.name,
        phone: bookingForm.phone,
        email: bookingForm.email,
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

  const handleSimulateWebhook = () => {
    setIsPaidSuccess(true);
  };

  // GroupX Classes Data
  const groupClasses = [
    {
      id: 1,
      name: 'Yoga Vinyasa Thải Độc & Cân Bằng Thân Tâm',
      type: 'Yoga Vinyasa',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      days: ['t2', 't4', 't6'],
      daysLabel: 'Thứ 2, 4, 6',
      time: '06:30 - 07:30',
      trainer: 'HLV Hoàng Yến (ACE)',
      desc: 'Thư giãn tâm trí, giải tỏa stress sau giờ học/làm và tăng độ dẻo dai toàn diện cho cột sống.',
      room: 'Studio Yoga Lầu 2',
    },
    {
      id: 2,
      name: 'HIIT Burn Fat Cực Hạn (No Pain No Gain)',
      type: 'HIIT Cường Độ Cao',
      color: 'bg-red-50 text-[#DC2626] border-red-200',
      days: ['t3', 't5', 't7-cn'],
      daysLabel: 'Thứ 3, 5, CN',
      time: '18:00 - 19:00',
      trainer: 'HLV Quốc Bảo (HIIT Master)',
      desc: 'Tập ngắt quãng cường độ cao, kích hoạt cơ chế đốt mỡ EPOC lên đến 600 - 800 kcal mỗi buổi.',
      room: 'Khu Functional Fitness',
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
      room: 'Studio Aerobic Lầu 1',
    },
    {
      id: 4,
      name: 'LesMills BodyPump Săn Chắc Toàn Thân',
      type: 'Tập Tạ Với Nhạc',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      days: ['t3', 't5', 't7-cn'],
      daysLabel: 'Thứ 3, 5, Thứ 7',
      time: '17:30 - 18:30',
      trainer: 'HLV Minh Tuấn (NASM-CPT)',
      desc: 'Tập kháng lực với tạ đòn thông minh theo nhịp điệu, tăng mật độ xương và siết thon gọn cơ thể.',
      room: 'Phòng Tập Đa Năng STU',
    },
    {
      id: 5,
      name: 'RPM Cycling Đua Xe Đạp Trong Nhà',
      type: 'Cycling Cardio',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      days: ['t2', 't4', 't7-cn'],
      daysLabel: 'Thứ 2, 4, Chủ Nhật',
      time: '18:15 - 19:15',
      trainer: 'HLV Văn Hùng (CSCS)',
      desc: 'Đạp xe leo dốc trên nền nhạc điện tử EDM, tối ưu hóa hệ tim mạch và đôi chân săn chắc.',
      room: 'Cycling Studio Hi-Tech',
    },
    {
      id: 6,
      name: 'Pilates Phục Hồi Cột Sống & Cổ Vai Gáy',
      type: 'Pilates Posture',
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      days: ['t3', 't6', 't7-cn'],
      daysLabel: 'Thứ 3, 6, Thứ 7',
      time: '08:00 - 09:00',
      trainer: 'HLV Thùy Trang (Polestar)',
      desc: 'Chỉnh sửa tư thế gù lưng, đau mỏi thắt lưng cho sinh viên và nhân viên văn phòng.',
      room: 'Studio Yoga Lầu 2',
    },
  ];

  const filteredClasses = groupClasses.filter((c) => {
    if (activeDayFilter === 'all') return true;
    return c.days.includes(activeDayFilter);
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#DC2626] selection:text-white">
      
      {/* ==================== NAVIGATION BAR ==================== */}
      <header className="fixed top-10 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#DC2626] to-[#EF4444] flex items-center justify-center text-white shadow-lg shadow-[#DC2626]/30">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-xl uppercase tracking-wider text-slate-900">
                CITY<span className="text-[#DC2626]">GYM</span>
              </span>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Fitness & Yoga Club STU</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700">
            <a href="#about" className="hover:text-[#DC2626] transition-colors">Giới thiệu</a>
            <a href="#motivation" className="hover:text-[#DC2626] transition-colors text-[#DC2626] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>No Pain No Gain</span>
            </a>
            <a href="#packages" className="hover:text-[#DC2626] transition-colors">Bảng giá gói</a>
            <a href="#classes" className="hover:text-[#DC2626] transition-colors">Lịch lớp GroupX</a>
            <a href="#trainers" className="hover:text-[#DC2626] transition-colors">Đội ngũ PT</a>
            <a href="#bmi-tool" className="hover:text-[#DC2626] transition-colors text-slate-900 flex items-center gap-1.5 font-bold">
              <Calculator className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Tính BMI/TDEE</span>
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-full text-xs font-black bg-slate-900 hover:bg-slate-800 text-white shadow-sm flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              title="Truy cập các Cổng nội bộ: Lễ tân, PT, Hội viên, Admin"
            >
              <Lock className="w-3.5 h-3.5 text-[#EF4444]" />
              <span>Cổng Quản Trị</span>
            </button>

            <a 
              href="#trial-section" 
              className="px-5 py-2 rounded-full text-xs font-black bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-lg shadow-[#DC2626]/30 hover:scale-[1.02] transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tập Thử 0Đ (E-Pass)</span>
            </a>
          </div>
        </div>
      </header>

      {/* ==================== HERO SECTION (Hình 3-21) ==================== */}
      <section id="about" className="pt-36 pb-16 px-4 max-w-7xl mx-auto text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
            Hệ thống phòng tập thể hình chuẩn 5 sao diện tích 1.500m², thiết bị Olympic hiện đại cùng đội ngũ HLV cá nhân chuyên nghiệp. Kiểm soát check-in bằng mã QR động và đồng hành cùng bạn trên từng nấc thang thay đổi vóc dáng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
            <a 
              href="#trial-section" 
              className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-xl shadow-[#DC2626]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              <span>Nhận Vé Tập Thử 03 Ngày 0Đ</span>
            </a>
            <a 
              href="#bmi-tool" 
              className="px-7 py-4 rounded-xl font-bold bg-white border-2 border-[#DC2626]/30 text-[#DC2626] hover:border-[#DC2626] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Calculator className="w-5 h-5" />
              <span>Đo Thể Trạng BMI / TDEE</span>
            </a>
          </div>

          {/* Quick Stats Badges */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">1.500<span className="text-[#DC2626]">m²</span></p>
              <p className="text-xs text-slate-500 font-medium mt-1">Không gian máy chuẩn Olympic</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">100<span className="text-[#DC2626]">%</span></p>
              <p className="text-xs text-slate-500 font-medium mt-1">PT chứng chỉ NASM/ACE</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">60<span className="text-[#DC2626]">s</span></p>
              <p className="text-xs text-slate-500 font-medium mt-1">QR Check-in bảo mật Realtime</p>
            </div>
          </div>
        </div>

        {/* Hero Card Preview (Thẻ Hội Viên Realtime) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-[#DC2626]/30 flex items-center justify-center text-[#DC2626]">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <h3 className="font-black text-slate-900 text-sm">Check-in Điện Tử CITYGYM</h3>
                <p className="text-[11px] text-slate-500">Mã QR động bảo mật tự làm mới 60 giây</p>
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444] bg-white/10 px-2 py-0.5 rounded">Hội viên chính thức</span>
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
              <span>Chống chụp màn hình gian lận dùng chung thẻ bằng mã động 60s</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>Tự động khóa check-in khi thẻ bảo lưu, tự động bù hạn khi mở lại</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MOTIVATION & SLOGAN SECTION ==================== */}
      <section id="motivation" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-[#DC2626] text-xs font-black tracking-widest uppercase border border-red-200 shadow-sm">
              <Flame className="w-4 h-4 text-[#DC2626] stroke-[2.5]" />
              <span>TRIẾT LÝ RÈN LUYỆN Ý CHÍ</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-slate-900 leading-none">
              "NO PAIN - <span className="bg-gradient-to-r from-[#DC2626] to-[#991B1B] bg-clip-text text-transparent">NO GAIN</span>"
            </h2>
            <p className="text-slate-500 text-sm">
              Mỗi giọt mồ hôi rơi xuống là một bước tiến đến phiên bản mạnh mẽ, tự tin và quyến rũ hơn của chính bạn.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
            
            {/* Top Quote */}
            <div className="px-6 py-12 sm:px-12 sm:py-16 text-center border-b border-slate-100 bg-gradient-to-b from-white to-slate-50/60">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] mx-auto mb-6 shadow-sm border border-red-200">
                <Quote className="w-6 h-6 stroke-[2.5]" />
              </div>

              <div className="space-y-4 max-w-3xl mx-auto">
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                  “Mất <span className="text-[#DC2626] bg-red-50 px-2.5 py-0.5 rounded-lg border border-red-200">1 THÁNG</span> để bạn tự nhận ra sự thay đổi của cơ thể.
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                  Mất <span className="text-[#DC2626] bg-red-50 px-2.5 py-0.5 rounded-lg border border-red-200">2 THÁNG</span> để bạn bè và gia đình nhận ra.
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                  Và mất <span className="text-white bg-gradient-to-r from-[#DC2626] to-[#EF4444] px-3 py-1 rounded-xl shadow-md">3 THÁNG</span> để cả thế giới nhìn thấy điều đó.”
                </p>
              </div>

              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase mt-6">
                — Lộ trình chuyển hóa vóc dáng 90 ngày tại CITYGYM —
              </p>
            </div>

            {/* Middle: 3-Stage Progress Timeline Cards */}
            <div className="p-6 sm:p-10 bg-slate-50/70">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Stage 1 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-[#DC2626] transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-black text-sm flex items-center justify-center border border-slate-200">
                      01
                    </span>
                    <span className="text-[11px] font-black uppercase text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                      MỐC 30 NGÀY
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">Bản Thân Cảm Nhận</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Hình thành thói quen rèn luyện kỷ luật, tăng năng lượng tích cực, cải thiện giấc ngủ và giải phóng sức nặng cơ thể.
                  </p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-bold">
                    <span className="text-[#DC2626] flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> +40% Thể lực</span>
                    <span>Thích nghi</span>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-[#DC2626] transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-black text-sm flex items-center justify-center border border-slate-200">
                      02
                    </span>
                    <span className="text-[11px] font-black uppercase text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                      MỐC 60 NGÀY
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">Người Thân Nhận Ra</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Cơ bắp bắt đầu săn chắc, mỡ thừa thu gọn rõ rệt. Gia đình và bạn bè bất ngờ trước sự thay đổi vóc dáng của bạn.
                  </p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-bold">
                    <span className="text-[#DC2626] flex items-center gap-1"><TrendingDown className="w-3.5 h-3.5" /> -5 đến 8cm Eo</span>
                    <span>Chuyển biến</span>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="bg-gradient-to-b from-red-50/60 to-white rounded-2xl p-6 border-2 border-[#DC2626] shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#DC2626] text-white font-black text-sm flex items-center justify-center shadow-md">
                      03
                    </span>
                    <span className="text-[11px] font-black uppercase text-white bg-[#DC2626] px-2.5 py-1 rounded-full">
                      CỘT MỐC ĐỘT PHÁ
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-[#DC2626] mb-2 flex items-center gap-2">
                    <span>Cả Thế Giới Nhìn Thấy</span>
                    <Crown className="w-4 h-4 text-[#DC2626]" />
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
                    Tự tin lột xác hoàn toàn! Vóc dáng mơ ước được khắc họa sắc nét, thần thái đỉnh cao và bản lĩnh không lùi bước.
                  </p>
                  <div className="pt-3 border-t border-red-200 flex items-center justify-between text-[11px] font-black">
                    <span className="text-[#DC2626] flex items-center gap-1"><Award className="w-3.5 h-3.5" /> 100% Tự Tin</span>
                    <span>Chinh phục đỉnh cao</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Callout */}
            <div className="bg-slate-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#EF4444] px-3 py-1 bg-white/10 rounded-full">
                  CAM KẾT CỦA BẠN VỚI CHÍNH MÌNH
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                  "HÃY Ở LẠI ĐÂY LÂU NHẤT CÓ THỂ ĐỂ ĐẠT ĐƯỢC MỤC TIÊU CỦA MÌNH. VÌ VẬY, ĐỪNG BAO GIỜ BỎ CUỘC!"
                </h3>
              </div>
              <a 
                href="#trial-section" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-sm bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white shadow-xl hover:scale-105 transition-all shrink-0"
              >
                <span>Bắt Đầu Hành Trình 90 Ngày</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE BMI & TDEE TOOL (Hình 3-22) ==================== */}
      <section id="bmi-tool" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">CÔNG CỤ ĐO LƯỜNG THỂ TRẠNG Y KHOA</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              TÍNH TOÁN BMI, BMR & TDEE CHUẨN KHOA HỌC
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Áp dụng công thức Mifflin-St Jeor được khuyến nghị trong Luận văn tốt nghiệp STU.
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
                <label className="block font-bold text-slate-700 uppercase mb-1">Mục tiêu hiện tại:</label>
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
                <span className="text-[11px] font-black uppercase text-[#DC2626]">Kết Quả Phân Tích Thể Hình</span>
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
                  <span className="text-xs font-bold text-slate-700">Mức Calo Đề Xuất Mỗi Ngày:</span>
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
                Nhận Lộ Trình Tập Phù Hợp Với Chỉ Số Này
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PACKAGES PRICING SECTION (Hình 3-23A) ==================== */}
      <section id="packages" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">BẢNG GIÁ MINH BẠCH</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              GÓI HỘI VIÊN CHÍNH THỨC CITYGYM
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Đầy đủ quyền lợi bảo lưu linh hoạt, đo InBody định kỳ và huấn luyện viên kèm 1-1 chuyên sâu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Basic */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between hover:border-slate-400 transition-all">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Khởi động</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">CityBasic 1 Tháng</h3>
                <p className="text-3xl font-black text-slate-900 mt-3">650.000 đ</p>
                <p className="text-xs text-slate-400">Thời hạn: 30 ngày tập luyện</p>

                <div className="space-y-2.5 pt-5 text-xs text-slate-600">
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tự do tập Gym toàn khung giờ</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tủ locker & Tắm nóng lạnh</p>
                  <p className="flex items-center gap-2 text-slate-400"><X className="w-4 h-4 text-slate-300" /> Không tặng kèm buổi PT</p>
                  <p className="flex items-center gap-2 text-slate-400"><X className="w-4 h-4 text-slate-300" /> Không hỗ trợ bảo lưu thẻ</p>
                </div>
              </div>
              <button 
                onClick={() => handleOpenCheckout({ name: 'CityBasic 1 Tháng', price: 650000, priceStr: '650.000 đ', duration: '30 ngày', ptSessions: 0 })}
                className="w-full py-3 rounded-xl border-2 border-slate-300 font-bold text-xs text-slate-800 text-center hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Thanh Toán VietQR Ngay</span>
              </button>
            </div>

            {/* VIP 12 Months */}
            <div className="bg-white p-7 rounded-3xl border-2 border-[#DC2626] shadow-xl space-y-5 flex flex-col justify-between relative hover:scale-[1.01] transition-all">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#DC2626] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
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
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] hover:from-red-700 hover:to-red-600 text-white font-black text-xs text-center shadow-lg shadow-[#DC2626]/30 flex items-center justify-center gap-2 transition-all"
              >
                <QrCode className="w-4 h-4" />
                <span>Đăng Ký & Quét VietQR</span>
              </button>
            </div>

            {/* Pro 6 Months */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between hover:border-slate-400 transition-all">
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
                className="w-full py-3 rounded-xl border-2 border-slate-300 font-bold text-xs text-slate-800 text-center hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Thanh Toán VietQR Ngay</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== GROUP CLASSES SCHEDULE SECTION (Hình 3-23B) ==================== */}
      <section id="classes" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">THỜI KHÓA BIỂU GROUPX</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              LỊCH LỚP TẬP NHÓM TRONG TUẦN
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Được tổ chức liên tục từ sáng sớm đến tối muộn với âm nhạc sống động và HLV truyền lửa.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[
                { id: 'all', label: 'Tất cả các ngày' },
                { id: 't2', label: 'Thứ 2' },
                { id: 't3', label: 'Thứ 3' },
                { id: 't4', label: 'Thứ 4' },
                { id: 't5', label: 'Thứ 5' },
                { id: 't6', label: 'Thứ 6' },
                { id: 't7-cn', label: 'Thứ 7 & Chủ Nhật' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDayFilter(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeDayFilter === tab.id
                      ? 'bg-[#DC2626] text-white shadow-md shadow-[#DC2626]/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Classes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredClasses.map((item) => (
              <div 
                key={item.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-[#DC2626] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.color}`}>
                      {item.type}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{item.daysLabel}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">{item.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-bold text-slate-900">
                    <Clock className="w-3.5 h-3.5 text-[#DC2626]" />
                    {item.time}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-slate-500">
                    <User className="w-3.5 h-3.5 text-[#DC2626]" />
                    {item.trainer}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs text-slate-500">
              * Hội viên chính thức (gói CityPro và CityVIP) được tham gia miễn phí không giới hạn tất cả các lớp GroupX trên.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== TRAINERS SECTION ==================== */}
      <section id="trainers" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#DC2626]">CHUYÊN NGHIỆP & TẬN TÂM</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              ĐỘI NGŨ HUẤN LUYỆN VIÊN CÁ NHÂN (PT)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              100% sở hữu chứng chỉ quốc tế uy tín, thiết kế bài tập bám sát mục tiêu của từng học viên.
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

      {/* ==================== TRIAL FORM WITH INSTANT QR E-PASS (Hình 3-24) ==================== */}
      <section id="trial-section" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#EF4444] px-3 py-1 bg-white/10 rounded-full">
              ƯU ĐÃI ĐẶC BIỆT THÁNG NÀY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              NHẬN VÉ TẬP THỬ 03 NGÀY 0Đ (E-PASS QR)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Trải nghiệm toàn bộ tiện ích 5 sao và nhận 01 buổi đo InBody tư vấn dinh dưỡng cùng PT miễn phí!
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="bg-white text-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Họ và Tên (*):</label>
                <input
                  type="text"
                  required
                  placeholder="vd: Trần Văn An"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:border-[#DC2626] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Số Điện Thoại Nhận Mã QR (*):</label>
                <input
                  type="tel"
                  required
                  placeholder="vd: 0912345678"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:border-[#DC2626] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Dịch Vụ Bạn Muốn Trải Nghiệm:</label>
                <select
                  value={bookingForm.service}
                  onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#DC2626]"
                >
                  <option>Gym & Thể Hình Chuẩn 5 Sao</option>
                  <option>Tập 1-1 Cùng Huấn Luyện Viên PT</option>
                  <option>Lớp Yoga Vinyasa Thư Giãn</option>
                  <option>Lớp GroupX & HIIT Đốt Mỡ</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Khung Giờ Bạn Dự Kiến Đến:</label>
                <select
                  value={bookingForm.time}
                  onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#DC2626]"
                >
                  <option>Buổi sáng sớm (06h - 08h)</option>
                  <option>Buổi trưa (11h30 - 13h30)</option>
                  <option>Buổi chiều tối (17h - 20h)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 bg-gradient-to-r from-[#DC2626] to-[#EF4444] hover:from-red-700 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-[#DC2626]/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Ticket className="w-5 h-5" />
              <span>Nhận Ngay Mã Vé E-Pass Điện Tử</span>
            </button>
          </form>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-black text-lg">
              <Dumbbell className="w-5 h-5 text-[#DC2626]" />
              <span>CITYGYM FITNESS</span>
            </div>
            <p className="mt-2 text-slate-500">
              Đề tài Luận văn tốt nghiệp: Xây dựng hệ thống website quản lý phòng gym tích hợp đặt lịch PT, thanh toán trực tuyến và cổng khách hàng.
            </p>
            <p className="text-[11px] text-[#DC2626] mt-2 font-bold">Sinh viên: Võ Duy Phúc | GVHD: ThS. Bùi Nhật Bằng - STU 2026</p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase mb-2">Thông Tin Liên Hệ</h5>
            <p>Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, TP.HCM (STU Campus)</p>
            <p className="mt-1">Hotline: 1900 8899 - 028 3850 5520</p>
            <p className="mt-1">Giờ mở cửa: 06:00 - 22:00 (Thứ 2 - Chủ Nhật)</p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase mb-2">Quy Định & Hỗ Trợ</h5>
            <p>• Chính sách bảo mật mã QR động 60 giây</p>
            <p className="mt-1">• Hướng dẫn kích hoạt & mở lại thẻ bảo lưu</p>
            <p className="mt-1">• Quy chuẩn an toàn phòng tập STU 2026</p>
          </div>
        </div>
      </footer>

      {/* ==================== TICKET MODAL (Vé E-Pass) ==================== */}
      {showTicketModal && ticketData && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-[#DC2626] tracking-wider">VÉ TẬP THỬ 03 NGÀY HỢP LỆ</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">{ticketData.name}</h3>
              <p className="text-xs text-slate-500">{ticketData.service}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${ticketData.code}`}
                alt="Ticket QR"
                className="w-36 h-36 mx-auto object-contain"
              />
              <p className="font-mono font-black text-sm text-[#DC2626]">{ticketData.code}</p>
              <p className="text-[10px] text-slate-400">Đưa mã QR này cho lễ tân quầy để check-in mở cổng Turnstile.</p>
            </div>

            <button
              onClick={() => setShowTicketModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
            >
              Đóng & Hoàn Tất
            </button>
          </div>
        </div>
      )}

      {/* ==================== VIETQR PAYMENT MODAL (Hình 3-29) ==================== */}
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

                {/* VietQR Dynamic Code */}
                <div className="bg-white p-4 rounded-2xl border-2 border-red-100 shadow-inner space-y-2">
                  <div className="relative inline-block">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=VIETQR-CITYGYM-${selectedPackage.name.replace(/\s+/g, '')}-${selectedPackage.price}`}
                      alt="VietQR"
                      className="w-44 h-44 mx-auto object-contain"
                    />
                    <div className="absolute inset-x-0 bottom-0 py-0.5 bg-slate-900/80 text-white text-[9px] font-bold rounded-b">
                      Napas247 • Quét bằng App Ngân Hàng
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-0.5">
                    <p>Ngân hàng: <strong>MB Bank (Ngân hàng Quân Đội)</strong></p>
                    <p>Số tài khoản: <strong className="font-mono text-slate-900">0901234567</strong></p>
                    <p>Chủ tài khoản: <strong>CITYGYM FITNESS STU</strong></p>
                    <p>Nội dung CK: <strong className="font-mono text-[#DC2626]">CG {Math.floor(100000 + Math.random() * 900000)}</strong></p>
                  </div>
                </div>

                {/* Countdown */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mã QR hết hạn sau:</span>
                  <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    {formatCountdown(countdown)}
                  </span>
                </div>

                {/* Demo Webhook Button for Defense */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={handleSimulateWebhook}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                  >
                    <Zap className="w-4 h-4" />
                    <span>[DEMO] Giả Lập Webhook Gạch Nợ Thành Công</span>
                  </button>
                  <p className="text-[10px] text-slate-400">
                    (Nút dùng để demo trực tiếp trước Hội đồng chấm thi: mô phỏng phản hồi từ ngân hàng)
                  </p>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Thanh Toán Thành Công!</h3>
                  <p className="text-xs text-slate-500">Hệ thống đã nhận Webhook xác thực và tự động kích hoạt gói tập.</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-slate-700 text-left space-y-1">
                  <p>• Hợp đồng: <strong className="text-emerald-700 font-mono">HD-2026-{(Math.floor(1000 + Math.random() * 9000))}</strong></p>
                  <p>• Gói tập: <strong>{selectedPackage.name}</strong></p>
                  <p>• Trạng thái: <strong className="text-emerald-600">ACTIVE (Đang hoạt động)</strong></p>
                  <p>• Mã QR Check-in đã sẵn sàng trên Cổng Hội Viên!</p>
                </div>
                <button
                  onClick={() => {
                    setShowCheckoutModal(false);
                    if (onOpenLogin) onOpenLogin();
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-lg"
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
