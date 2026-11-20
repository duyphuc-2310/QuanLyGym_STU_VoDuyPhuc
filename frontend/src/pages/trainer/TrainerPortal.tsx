import React, { useState } from 'react';
import { 
  UserCheck, Calendar, Clock, CheckCircle2, Award, 
  Activity, Dumbbell, DollarSign, User, ChevronRight, Sparkles,
  Phone, PlusCircle, Shield
} from 'lucide-react';
import { PtBooking, InBodyMetric, Membership } from '../../types';
import { InBodyModal } from '../../components/modals/InBodyModal';

interface TrainerPortalProps {
  memberships?: Membership[];
  ptBookings: PtBooking[];
  onCompleteBooking: (bookingId: number) => void;
  onSaveInBodyMetric: (metric: InBodyMetric) => void;
  onAddBooking?: (booking: PtBooking) => void;
}

export const TrainerPortal: React.FC<TrainerPortalProps> = ({
  memberships = [],
  ptBookings,
  onCompleteBooking,
  onSaveInBodyMetric,
  onAddBooking,
}) => {
  const [isInBodyModalOpen, setIsInBodyModalOpen] = useState(false);
  const [selectedMemberName, setSelectedMemberName] = useState('Lê Thùy Dung');

  const trainerName = 'Nguyễn Minh Tuấn (PT)';

  // 1. Lọc lịch dạy hẹn của HLV Tuấn
  const trainerBookings = ptBookings.filter((b) => b.trainerName.includes('Tuấn'));

  // 2. Lọc danh sách học viên được phân công cho HLV Tuấn
  const assignedMembers = memberships.filter(
    (m) => m.assignedPtName?.includes('Tuấn') || m.remainingSessions > 0
  );

  const completedSessions = trainerBookings.filter((b) => b.status === 'COMPLETED').length;
  const commissionPerSession = 150000; // 150.000 đ/buổi
  const totalCommission = completedSessions * commissionPerSession;

  const handleOpenInBody = (memberName: string) => {
    setSelectedMemberName(memberName);
    setIsInBodyModalOpen(true);
  };

  const handleQuickSchedule = (member: Membership) => {
    const newBooking: PtBooking = {
      id: Date.now(),
      memberName: member.memberName,
      memberPhone: member.memberPhone,
      trainerName: trainerName,
      date: 'Hôm nay',
      time: '19:15 - 20:15 (Buổi tiếp theo)',
      status: 'SCHEDULED',
      goal: `Kèm 1-1 gói ${member.packageName}`,
    };
    if (onAddBooking) {
      onAddBooking(newBooking);
    }
    alert(`Đã lên lịch tập 1-1 mới cho học viên ${member.memberName} vào 19:15 hôm nay!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-city-red font-black text-xs uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>Cổng Huấn Luyện Viên Cá Nhân (PT)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {trainerName}
          </h1>
          <p className="text-xs text-slate-500">
            Chứng chỉ NASM CPT • Chuyên môn: Tăng cơ Hypertrophy & Dinh dưỡng thể hình STU
          </p>
        </div>

        {/* Realtime Commission Card */}
        <div className="px-5 py-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/30">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-700">Hoa Hồng Tháng Này</span>
            <p className="text-lg font-black text-amber-900">
              {totalCommission.toLocaleString('vi-VN')} đ
            </p>
            <p className="text-[10px] text-amber-600">({completedSessions} buổi dạy hoàn thành)</p>
          </div>
        </div>
      </div>

      {/* ==================== PHẦN 1: HỌC VIÊN ĐƯỢC PHÂN CÔNG PHỤ TRÁCH ==================== */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="font-black text-base text-slate-900">
                Danh Sách Học Viên Được Phân Công Kèm 1-1 ({assignedMembers.length})
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Học viên vừa chốt hợp đồng từ quầy Lễ tân / CRM tự động đổ về danh sách phụ trách của bạn.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            Đang hoạt động
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignedMembers.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-city-red/40 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-base">{m.memberName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      {m.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{m.memberPhone}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-slate-700">{m.packageName}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Số buổi PT</span>
                  <span className="text-base font-black text-city-red">
                    {m.remainingSessions} / {m.totalSessions} buổi
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  Hạn thẻ: <strong className="text-slate-800">{m.endDate}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenInBody(m.memberName)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-city-red text-slate-700 font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                  >
                    <Activity className="w-3.5 h-3.5 text-city-red" />
                    <span>Đo InBody</span>
                  </button>

                  <button
                    onClick={() => handleQuickSchedule(m)}
                    className="px-3 py-1.5 rounded-xl bg-city-red hover:bg-city-darkred text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Lên Lịch Tập</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== PHẦN 2: LỊCH DẠY KÈM 1-1 TRONG NGÀY ==================== */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <h3 className="font-black text-base text-slate-900">Lịch Dạy Kèm 1-1 Trong Ngày</h3>
            <p className="text-xs text-slate-500">
              Xác nhận hoàn thành sau mỗi buổi tập để hệ thống tự động trừ buổi học viên và ghi nhận hoa hồng.
            </p>
          </div>
          <span className="text-xs font-bold text-city-red px-3 py-1 rounded-full bg-red-50 border border-red-200">
            {trainerBookings.length} lịch hẹn
          </span>
        </div>

        <div className="space-y-3">
          {trainerBookings.map((b) => (
            <div
              key={b.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                b.status === 'COMPLETED'
                  ? 'bg-slate-50/70 border-slate-200 opacity-80'
                  : 'bg-white border-slate-200 shadow-sm hover:border-city-red/40'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-base">{b.memberName}</span>
                  {b.status === 'COMPLETED' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                      ✓ Đã Hoàn Thành
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 animate-pulse">
                      Sắp Diễn Ra
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-slate-600 flex items-center gap-2">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-city-red" />
                    {b.time} ({b.date})
                  </span>
                  <span>•</span>
                  <span className="text-city-red font-medium">{b.goal}</span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleOpenInBody(b.memberName)}
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5 text-slate-600" />
                  <span>Đo InBody</span>
                </button>

                {b.status === 'SCHEDULED' ? (
                  <button
                    onClick={() => {
                      onCompleteBooking(b.id);
                      alert(
                        `Đã xác nhận hoàn thành buổi tập với ${b.memberName}!\n` +
                        `• Đã trừ 01 buổi trên hợp đồng học viên.\n` +
                        `• Đã cộng +150.000 đ hoa hồng cho HLV ${trainerName}.`
                      );
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác Nhận Hoàn Thành</span>
                  </button>
                ) : (
                  <span className="text-xs text-emerald-600 font-bold px-3 py-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Đã ghi nhận hoa hồng
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* InBody Modal */}
      <InBodyModal
        isOpen={isInBodyModalOpen}
        onClose={() => setIsInBodyModalOpen(false)}
        memberName={selectedMemberName}
        onSaveMetric={(metric) => {
          onSaveInBodyMetric(metric);
        }}
      />

    </div>
  );
};
