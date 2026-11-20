import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Award, Calendar, 
  Dumbbell, Flame, Activity, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { InBodyHistoricalRecord } from '../../types';

const SAMPLE_INBODY_HISTORY: InBodyHistoricalRecord[] = [
  {
    date: '2026-09-10',
    monthLabel: 'Tháng 09/2026 (Khởi Đầu)',
    weight: 73.5,
    bodyFatPercent: 22.5,
    skeletalMuscleKg: 31.2,
    bmi: 24.8,
    bmr: 1610,
    inbodyScore: 72,
    coachNote: 'Giai đoạn bắt đầu thích nghi khối lượng tạ, ưu tiên kỹ thuật bài tập cơ bản.',
  },
  {
    date: '2026-10-15',
    monthLabel: 'Tháng 10/2026 (Tháng 2)',
    weight: 70.8,
    bodyFatPercent: 19.8,
    skeletalMuscleKg: 32.5,
    bmi: 23.9,
    bmr: 1645,
    inbodyScore: 81,
    coachNote: 'Bắt đầu siết mỡ tốt, sức bền tim mạch tăng rõ rệt sau 15 buổi PT.',
  },
  {
    date: '2026-11-15',
    monthLabel: 'Tháng 11/2026 (Hiện Tại)',
    weight: 68.2,
    bodyFatPercent: 17.2,
    skeletalMuscleKg: 33.8,
    bmi: 23.1,
    bmr: 1675,
    inbodyScore: 89,
    coachNote: 'Cơ bụng và vai lộ nét rõ rệt (Body Recomposition hoàn hảo). Duy trì mức ăn hiện tại!',
  },
];

export const InBodyProgression: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<InBodyHistoricalRecord>(
    SAMPLE_INBODY_HISTORY[SAMPLE_INBODY_HISTORY.length - 1]
  );

  const initialRecord = SAMPLE_INBODY_HISTORY[0];
  const weightDiff = (selectedRecord.weight - initialRecord.weight).toFixed(1);
  const fatDiff = (selectedRecord.bodyFatPercent - initialRecord.bodyFatPercent).toFixed(1);
  const muscleDiff = (selectedRecord.skeletalMuscleKg - initialRecord.skeletalMuscleKg).toFixed(1);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      
      {/* Title & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-50 text-city-red">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h3 className="text-base font-black uppercase tracking-tight text-slate-900">
              Biểu Đồ Tiến Trình Thể Hình InBody 270 (3 Tháng Gần Nhất)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dữ liệu đối chiếu chuẩn phân tích trở kháng sinh học BIA đa tần số (STU InBody Lab)
          </p>
        </div>

        {/* InBody Score Tag */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-emerald-100/80 px-4 py-2 rounded-2xl border border-emerald-200">
          <Award className="w-6 h-6 text-emerald-600" />
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">Điểm Thể Chất InBody</span>
            <p className="text-xl font-black text-emerald-700">{selectedRecord.inbodyScore} / 100 <span className="text-xs font-bold text-emerald-600">(Rất Tốt)</span></p>
          </div>
        </div>
      </div>

      {/* KPI Comparison Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Weight Change */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Cân Nặng Biến Động</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" />
              {weightDiff} kg
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{selectedRecord.weight} <span className="text-sm font-semibold text-slate-400">kg</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Từ 73.5 kg $\rightarrow$ 68.2 kg (Giảm mỡ chuẩn)</p>
        </div>

        {/* Body Fat Change */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Tỷ Lệ Mỡ Cơ Thể (Body Fat)</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" />
              {fatDiff}%
            </span>
          </div>
          <p className="text-2xl font-black text-city-red mt-2">{selectedRecord.bodyFatPercent}%</p>
          <p className="text-[11px] text-slate-500 mt-1">Từ 22.5% $\rightarrow$ 17.2% (Rãnh bụng 4 múi)</p>
        </div>

        {/* Skeletal Muscle Mass Change */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Khối Lượng Cơ Bắp (SMM)</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              +{muscleDiff} kg
            </span>
          </div>
          <p className="text-2xl font-black text-blue-600 mt-2">{selectedRecord.skeletalMuscleKg} <span className="text-sm font-semibold text-slate-400">kg</span></p>
          <p className="text-[11px] text-slate-500 mt-1">Tăng cơ nạc liên tục qua từng tháng</p>
        </div>

      </div>

      {/* Month-by-Month Visual Progress Bars */}
      <div className="space-y-4">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
          Lịch Sử 3 Lần Đo & Đánh Giá Chi Tiết:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_INBODY_HISTORY.map((rec, idx) => {
            const isSelected = selectedRecord.date === rec.date;
            return (
              <div
                key={rec.date}
                onClick={() => setSelectedRecord(rec)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-city-red bg-red-50/30 shadow-md scale-[1.01]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-black text-slate-900">{rec.monthLabel}</span>
                  <span className="text-[10px] text-slate-500">{rec.date}</span>
                </div>

                <div className="space-y-2.5 mt-3 text-xs">
                  {/* Weight bar */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">Cân nặng:</span>
                      <strong className="text-slate-900">{rec.weight} kg</strong>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-700 rounded-full"
                        style={{ width: `${(rec.weight / 90) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Body Fat bar */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">Tỷ lệ mỡ:</span>
                      <strong className="text-city-red">{rec.bodyFatPercent}%</strong>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-city-red rounded-full"
                        style={{ width: `${(rec.bodyFatPercent / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Muscle bar */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">Cơ xương:</span>
                      <strong className="text-blue-600">{rec.skeletalMuscleKg} kg</strong>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(rec.skeletalMuscleKg / 45) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Coach Note preview */}
                <p className="text-[11px] text-slate-600 italic mt-3 bg-white p-2 rounded-xl border border-slate-100">
                  "{rec.coachNote}"
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

