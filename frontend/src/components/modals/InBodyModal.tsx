import React, { useState } from 'react';
import { X, Activity, Scale, HeartPulse, CheckCircle2 } from 'lucide-react';
import { InBodyMetric } from '../../types';

interface InBodyModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  onSaveMetric: (metric: InBodyMetric) => void;
}

export const InBodyModal: React.FC<InBodyModalProps> = ({
  isOpen,
  onClose,
  memberName,
  onSaveMetric,
}) => {
  const [weight, setWeight] = useState<number>(68.5);
  const [height, setHeight] = useState<number>(172);
  const [bodyFat, setBodyFat] = useState<number>(16.2);
  const [muscleMass, setMuscleMass] = useState<number>(33.8);
  const [visceralFat, setVisceralFat] = useState<number>(4);

  if (!isOpen) return null;

  // Realtime BMI calculation
  const hm = height / 100;
  const bmi = Number((weight / (hm * hm)).toFixed(1));
  
  // Realtime BMR estimate (Mifflin-St Jeor formula)
  const bmr = Math.round(10 * weight + 6.25 * height - 5 * 24 + 5);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newMetric: InBodyMetric = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      weight,
      height,
      bodyFatPercent: bodyFat,
      muscleMass,
      visceralFat,
      bmr,
      bmi,
    };
    onSaveMetric(newMetric);
    alert(`Đã cập nhật chỉ số InBody cho học viên ${memberName} thành công!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-city-red flex items-center justify-center text-white">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Cập Nhật Đo InBody 270</h3>
              <p className="text-[11px] text-slate-400">Học viên: {memberName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Cân Nặng (kg):</label>
              <input
                type="number"
                step="0.1"
                required
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold focus:border-city-red"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Chiều Cao (cm):</label>
              <input
                type="number"
                required
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold focus:border-city-red"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Tỷ Lệ Mỡ Cơ Thể (%):</label>
              <input
                type="number"
                step="0.1"
                required
                value={bodyFat}
                onChange={(e) => setBodyFat(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold focus:border-city-red"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Khối Lượng Cơ (kg):</label>
              <input
                type="number"
                step="0.1"
                required
                value={muscleMass}
                onChange={(e) => setMuscleMass(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold focus:border-city-red"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Cấp Độ Mỡ Nội Tạng (1-12):</label>
            <input
              type="number"
              min="1"
              max="15"
              value={visceralFat}
              onChange={(e) => setVisceralFat(parseInt(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold focus:border-city-red"
            />
          </div>

          {/* Computed Summary Preview */}
          <div className="p-3 bg-red-50/60 rounded-xl border border-city-red/20 space-y-2">
            <span className="font-bold text-[11px] text-city-red uppercase">Kết Quả Phân Tích Tự Động:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500">Chỉ số BMI:</span>
                <p className="font-black text-slate-900">{bmi} (Chuẩn thể thao)</p>
              </div>
              <div>
                <span className="text-slate-500">Năng lượng BMR:</span>
                <p className="font-black text-slate-900">{bmr} kcal / ngày</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-xl bg-city-red hover:bg-city-darkred text-white font-bold shadow flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Lưu Chỉ Số</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

