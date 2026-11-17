import React, { useState } from 'react';
import { 
  UserCheck, Calendar, Clock, CheckCircle2, Award, 
  Activity, Dumbbell, DollarSign, User, ChevronRight, Sparkles
} from 'lucide-react';
import { PtBooking, InBodyMetric } from '../../types';
import { InBodyModal } from '../../components/modals/InBodyModal';

interface TrainerPortalProps {
  ptBookings: PtBooking[];
  onCompleteBooking: (bookingId: number) => void;
  onSaveInBodyMetric: (metric: InBodyMetric) => void;
}

export const TrainerPortal: React.FC<TrainerPortalProps> = ({
  ptBookings,
  onCompleteBooking,
  onSaveInBodyMetric,
}) => {
  const [isInBodyModalOpen, setIsInBodyModalOpen] = useState(false);
  const [selectedMemberName, setSelectedMemberName] = useState('Võ Duy Phúc');

  const trainerName = 'Nguyễn Minh Tuấn (PT)';
  const trainerBookings = ptBookings.filter((b) => b.trainerName.includes('Tuấn'));

  const completedSessions = trainerBookings.filter((b) => b.status === 'COMPLETED').length;
  const commissionPerSession = 150000; // 150.000 đ/buổi
  const totalCommission = completedSessions * commissionPerSession;

  const handleOpenInBody = (memberName: string) => {
    setSelectedMemberName(memberName);
    setIsInBodyModalOpen(true);
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

      {/* Schedule Agenda */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <h3 className="font-black text-base text-slate-900">Lịch Dạy Kèm 1-1 Trong Ngày</h3>
            <p className="text-xs text-slate-500">
              Xác nhận hoàn thành sau mỗi buổi tập để hệ thống tự động trừ buổi học viên và ghi nhận hoa hồng.
            </p>
          </div>
          <span className="text-xs font-bold text-city-red px-3 py-1 rounded-full bg-red-50 border border-red-200">
            {trainerBookings.length} lịch hẹn hôm nay
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

