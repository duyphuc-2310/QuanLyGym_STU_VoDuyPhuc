import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Calendar, User, Dumbbell } from 'lucide-react';
import { GymPackage, Membership } from '../../types';

interface NewContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newMembership: Membership) => void;
  prefillName?: string;
  prefillPhone?: string;
}

const AVAILABLE_PACKAGES: GymPackage[] = [
  {
    id: 1,
    name: 'CityBasic 1 Tháng',
    price: 650000,
    durationMonths: 1,
    ptSessions: 0,
    maxFreezeDays: 0,
    features: ['Toàn quyền tập luyện Gym', 'Tủ đồ locker & Tắm nóng lạnh', 'Không có bảo lưu'],
  },
  {
    id: 2,
    name: 'CityPro 6 Tháng',
    price: 3200000,
    durationMonths: 6,
    ptSessions: 5,
    maxFreezeDays: 30,
    features: ['Toàn quyền tập Gym + GroupX/Yoga', 'Tặng 05 buổi PT 1-1', 'Bảo lưu tối đa 30 ngày', 'Đo InBody định kỳ'],
  },
  {
    id: 3,
    name: 'CityVIP 12 Tháng',
    price: 5800000,
    durationMonths: 12,
    ptSessions: 20,
    maxFreezeDays: 60,
    features: ['VIP Full Access 365 ngày', 'Tặng 20 buổi PT 1-1 chuyên sâu', 'Bảo lưu tối đa 60 ngày', 'Khăn tập & Nước uống miễn phí'],
    isPopular: true,
  },
];

export const NewContractModal: React.FC<NewContractModalProps> = ({
  isOpen,
  onClose,
  onSave,
  prefillName = '',
  prefillPhone = '',
}) => {
  const [name, setName] = useState(prefillName);
  const [phone, setPhone] = useState(prefillPhone);
  const [selectedPkgId, setSelectedPkgId] = useState<number>(3);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'VIETQR' | 'POS'>('VIETQR');
  const [assignedPt, setAssignedPt] = useState('Nguyễn Minh Tuấn (PT)');

  if (!isOpen) return null;

  const selectedPkg = AVAILABLE_PACKAGES.find((p) => p.id === selectedPkgId) || AVAILABLE_PACKAGES[2];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại hội viên.');
      return;
    }

    const today = new Date();
    const startDateStr = today.toISOString().split('T')[0];
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + selectedPkg.durationMonths);
    const endDateStr = endDate.toISOString().split('T')[0];

    const newMembership: Membership = {
      id: Date.now(),
      contractCode: `HD-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      memberName: name.trim(),
      memberPhone: phone.trim(),
      packageName: selectedPkg.name,
      packagePrice: selectedPkg.price,
      startDate: startDateStr,
      endDate: endDateStr,
      remainingSessions: selectedPkg.ptSessions,
      totalSessions: selectedPkg.ptSessions,
      status: 'ACTIVE',
      maxFreezeDays: selectedPkg.maxFreezeDays,
      frozenDaysUsed: 0,
      assignedPtName: assignedPt,
    };

    onSave(newMembership);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-city-red flex items-center justify-center text-white font-bold">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base">Lập Hợp Đồng Hội Viên Mới</h3>
              <p className="text-[11px] text-slate-400">Kích hoạt quyền lợi & cấp mã QR thẻ tập</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Member info */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Họ và Tên Hội Viên:</label>
              <input
                type="text"
                required
                placeholder="vd: Trần Văn An"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:border-city-red"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Số Điện Thoại:</label>
              <input
                type="tel"
                required
                placeholder="vd: 0912345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:border-city-red"
              />
            </div>
          </div>

          {/* Select Package */}
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1.5">Chọn Gói Hội Viên:</label>
            <div className="space-y-2">
              {AVAILABLE_PACKAGES.map((pkg) => (
                <label
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`block p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedPkgId === pkg.id
                      ? 'border-city-red bg-red-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gym_package"
                        checked={selectedPkgId === pkg.id}
                        onChange={() => setSelectedPkgId(pkg.id)}
                        className="text-city-red focus:ring-city-red"
                      />
                      <span className="font-bold text-slate-900 text-sm">{pkg.name}</span>
                      {pkg.isPopular && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-city-red text-white">
                          VIP STU
                        </span>
                      )}
                    </div>
                    <span className="font-black text-city-red text-sm">
                      {pkg.price.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                  <div className="flex gap-4 mt-1 pl-5 text-[11px] text-slate-500">
                    <span>Thời hạn: {pkg.durationMonths} tháng</span>
                    <span>Buổi PT: {pkg.ptSessions} buổi</span>
                    <span>Bảo lưu: Tối đa {pkg.maxFreezeDays} ngày</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Trainer assignment if package has PT sessions */}
          {selectedPkg.ptSessions > 0 && (
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">HLV Cá Nhân (PT) Phụ Trách:</label>
              <select
                value={assignedPt}
                onChange={(e) => setAssignedPt(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium"
              >
                <option value="Nguyễn Minh Tuấn (PT)">Nguyễn Minh Tuấn (Tăng cơ - NASM)</option>
                <option value="Trần Hoàng Yến (PT)">Trần Hoàng Yến (Siết mỡ - ACE)</option>
                <option value="Lê Văn Hùng (PT)">Lê Văn Hùng (Sức bền & Functional)</option>
              </select>
            </div>
          )}

          {/* Payment Method */}
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Hình Thức Thanh Toán:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'VIETQR', label: 'VietQR Pro' },
                { id: 'POS', label: 'Cà Thẻ POS' },
                { id: 'CASH', label: 'Tiền Mặt' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`py-2 rounded-xl border font-bold text-center transition-all ${
                    paymentMethod === m.id
                      ? 'border-city-red bg-city-red text-white'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-city-red to-city-accent hover:from-city-darkred hover:to-city-red text-white font-bold shadow-lg shadow-city-red/30 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Xác Nhận & Kích Hoạt HĐ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

