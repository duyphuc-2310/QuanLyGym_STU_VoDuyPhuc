import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, RefreshCw, Calendar, Clock, User, 
  ShieldCheck, Activity, Award, Flame, CheckCircle2, ChevronRight
} from 'lucide-react';
import { Membership, PtBooking, InBodyMetric } from '../../types';

interface MemberPortalProps {
  member: Membership;
  onBookPtSession: (newBooking: PtBooking) => void;
  ptBookings: PtBooking[];
}

export const MemberPortal: React.FC<MemberPortalProps> = ({
  member,
  onBookPtSession,
  ptBookings,
}) => {
  // 60-second dynamic QR code rotation state
  const [countdown, setCountdown] = useState(60);
  const [qrTokenKey, setQrTokenKey] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setQrTokenKey(Date.now());
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // PT Booking state
  const [selectedTrainer, setSelectedTrainer] = useState('Nguyễn Minh Tuấn (PT)');
  const [bookingDate, setBookingDate] = useState('2026-11-15');
  const [bookingTime, setBookingTime] = useState('18:00 - 19:00');
  const [bookingGoal, setBookingGoal] = useState('Tăng cơ - Hypertrophy vai & ngực');

  // InBody biometrics sample
  const [inbody] = useState<InBodyMetric>({
    id: 1,
    date: '2026-11-10',
    weight: 68.2,
    height: 172,
    bodyFatPercent: 15.8,
    muscleMass: 33.9,
    visceralFat: 4,
    bmr: 1675,
    bmi: 23.1,
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (member.remainingSessions <= 0) {
      alert('Bạn đã sử dụng hết số buổi tập cùng Huấn luyện viên (PT). Vui lòng mua thêm gói!');
      return;
    }

    // Check conflict
    const hasConflict = ptBookings.some(
      (b) =>
        b.trainerName === selectedTrainer &&
        b.date === bookingDate &&
        b.time === bookingTime &&
        b.status === 'SCHEDULED'
    );

    if (hasConflict) {
      alert(
        `Huấn luyện viên ${selectedTrainer} đã kín lịch vào khung giờ ${bookingTime} ngày ${bookingDate}!\nVui lòng chọn khung giờ khác.`
      );
      return;
    }

    const newBooking: PtBooking = {
      id: Date.now(),
      memberName: member.memberName,
      memberPhone: member.memberPhone,
      trainerName: selectedTrainer,
      date: bookingDate,
      time: bookingTime,
      status: 'SCHEDULED',
      goal: bookingGoal,
    };

    onBookPtSession(newBooking);
    alert(`Đặt lịch tập 1-1 với ${selectedTrainer} thành công!\nThời gian: ${bookingTime} (${bookingDate})`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs uppercase font-black text-city-red tracking-wider">Cổng Dịch Vụ Cá Nhân</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Xin Chào, {member.memberName}!
          </h1>
          <p className="text-xs text-slate-500">
            Hợp đồng {member.contractCode} ({member.packageName}) • Trạng thái: {member.status}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Mã bảo mật: 60s rotating</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Dynamic QR E-Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-city-dark text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-city-red font-black px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                THẺ HỘI VIÊN CHÍNH THỨC
              </span>
              <h2 className="text-2xl font-black mt-3 text-white">{member.memberName}</h2>
              <p className="text-xs text-slate-300 font-medium">{member.packageName}</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-city-red/20 border border-city-red/40 flex items-center justify-center text-city-red">
              <Dumbbell className="w-5 h-5" />
            </div>
          </div>

          {/* Dynamic Rotating QR Code */}
          <div className="bg-white p-5 rounded-2xl text-center space-y-3 max-w-[220px] mx-auto shadow-2xl z-10">
            <img
              key={qrTokenKey}
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=CITYGYM-MEMBER-PHUC-${qrTokenKey}`}
              alt="Dynamic QR Member"
              className="w-44 h-44 object-contain mx-auto"
            />
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700 font-black">
                <RefreshCw className="w-3.5 h-3.5 text-city-red animate-spin" />
                <span>Tự đổi sau: <strong className="text-city-red">{countdown}s</strong></span>
              </div>
              <p className="text-[9px] text-slate-400">Chống chụp màn hình chia sẻ cho người khác</p>
            </div>

            {/* Countdown progress bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-city-red h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(countdown / 60) * 100}%` }}
              />
            </div>
          </div>

          {/* Card Benefits Summary */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs z-10">
            <div>
              <span className="text-slate-400">Thời hạn gói:</span>
              <p className="text-emerald-400 font-bold text-sm">Còn đến {member.endDate}</p>
            </div>
            <div>
              <span className="text-slate-400">Số buổi PT 1-1:</span>
              <p className="text-amber-400 font-bold text-sm">{member.remainingSessions} buổi</p>
            </div>
          </div>

        </div>

        {/* Right: PT Booking & InBody Progress */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* PT Booking Form */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-city-red flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">Đặt Lịch Kèm 1-1 Với Huấn Luyện Viên</h3>
                <p className="text-xs text-slate-500">Tự động chống trùng lịch theo thời gian thực</p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Chọn Huấn Luyện Viên (PT):</label>
                  <select
                    value={selectedTrainer}
                    onChange={(e) => setSelectedTrainer(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:border-city-red"
                  >
                    <option value="Nguyễn Minh Tuấn (PT)">Nguyễn Minh Tuấn (Tăng cơ - NASM)</option>
                    <option value="Trần Hoàng Yến (PT)">Trần Hoàng Yến (Siết mỡ - ACE)</option>
                    <option value="Lê Văn Hùng (PT)">Lê Văn Hùng (Functional & Phục hồi)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Mục Tiêu Tập Luyện:</label>
                  <input
                    type="text"
                    value={bookingGoal}
                    onChange={(e) => setBookingGoal(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:border-city-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Ngày Tập:</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:border-city-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Khung Giờ Rảnh:</label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:border-city-red"
                  >
                    <option value="17:00 - 18:00">17:00 - 18:00 (Trống)</option>
                    <option value="18:00 - 19:00">18:00 - 19:00 (Khuyên dùng)</option>
                    <option value="19:15 - 20:15">19:15 - 20:15 (Trống)</option>
                    <option value="20:30 - 21:30">20:30 - 21:30 (Trống)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-city-red to-city-accent hover:from-city-darkred hover:to-city-red text-white font-black rounded-xl text-xs shadow-md shadow-city-red/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Xác Nhận Đặt Lịch Huấn Luyện Viên</span>
              </button>
            </form>
          </div>

          {/* InBody Biometric Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Hồ Sơ Chỉ Số Thể Hình InBody</h3>
                  <p className="text-xs text-slate-500">Lần đo gần nhất: {inbody.date}</p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700">
                BMI: {inbody.bmi} (Chuẩn)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Cân Nặng</span>
                <p className="text-lg font-black text-slate-900 mt-0.5">{inbody.weight} kg</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Tỷ Lệ Mỡ Body</span>
                <p className="text-lg font-black text-city-red mt-0.5">{inbody.bodyFatPercent}%</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Khối Lượng Cơ</span>
                <p className="text-lg font-black text-emerald-600 mt-0.5">{inbody.muscleMass} kg</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Năng Lượng BMR</span>
                <p className="text-lg font-black text-slate-900 mt-0.5">{inbody.bmr} kcal</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

