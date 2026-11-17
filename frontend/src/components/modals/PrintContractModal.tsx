import React from 'react';
import { X, Printer, ShieldCheck, Dumbbell, Award, CheckCircle } from 'lucide-react';
import { Membership } from '../../types';

interface PrintContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  membership: Membership | null;
}

export const PrintContractModal: React.FC<PrintContractModalProps> = ({ isOpen, onClose, membership }) => {
  if (!isOpen || !membership) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl border border-slate-300 animate-in fade-in zoom-in-95">
        
        {/* Modal Top Toolbar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-city-red" />
            <h3 className="font-bold text-sm">Xem & In Hợp Đồng Hội Viên (Biểu Mẫu 01 - STU)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-city-red hover:bg-city-darkred text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In Hợp Đồng</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Contract Document */}
        <div className="p-8 sm:p-12 text-slate-900 font-sans space-y-6 text-xs sm:text-sm leading-relaxed bg-white">
          
          {/* Header Quốc hiệu / Tiêu ngữ */}
          <div className="text-center space-y-1 pb-4 border-b-2 border-slate-800">
            <p className="font-bold uppercase tracking-wider text-xs">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
            <p className="font-bold text-xs">Độc lập - Tự do - Hạnh phúc</p>
            <p className="text-slate-400 text-[10px]">---o0o---</p>
            <h1 className="text-lg sm:text-2xl font-black uppercase text-city-dark pt-2">
              HỢP ĐỒNG DỊCH VỤ TẬP LUYỆN THỂ HÌNH CITYGYM
            </h1>
            <p className="font-mono font-bold text-city-red text-xs">
              Mã số hợp đồng: {membership.contractCode}
            </p>
          </div>

          {/* Bên A: Đơn vị cung cấp dịch vụ */}
          <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="font-bold text-slate-900 uppercase text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-city-red"></span>
              BÊN A: TRUNG TÂM THỂ HÌNH & FITNESS CITYGYM (STU PARTNER)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700">
              <p>• Địa chỉ: Số 180 Cao Lỗ, Phường 4, Quận 8, TP. Hồ Chí Minh</p>
              <p>• Hotline vận hành: 1900 8899 - 028 3850 5520</p>
              <p>• Đại diện phụ trách: ThS. Bùi Nhật Bằng & Võ Duy Phúc</p>
              <p>• Mã số thuế / ĐKKD: 03188992026</p>
            </div>
          </div>

          {/* Bên B: Hội viên */}
          <div className="space-y-1.5 bg-red-50/50 p-4 rounded-xl border border-city-red/20">
            <p className="font-bold text-slate-900 uppercase text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-city-red"></span>
              BÊN B: HỘI VIÊN ĐĂNG KÝ
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700">
              <p>• Họ và tên hội viên: <strong className="text-slate-900">{membership.memberName}</strong></p>
              <p>• Số điện thoại: <strong className="text-slate-900">{membership.memberPhone}</strong></p>
              <p>• Trạng thái hợp đồng: <strong className="text-city-red font-bold">{membership.status}</strong></p>
              <p>• HLV cá nhân phân công: <strong>{membership.assignedPtName || 'Chưa chỉ định'}</strong></p>
            </div>
          </div>

          {/* Chi tiết điều khoản gói */}
          <div className="space-y-2">
            <p className="font-bold text-slate-900 uppercase text-xs">CHI TIẾT GÓI TẬP VÀ QUYỀN LỢI HỘI VIÊN:</p>
            <table className="w-full border-collapse border border-slate-300 text-xs">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 p-2 text-left">Gói Dịch Vụ</th>
                  <th className="border border-slate-300 p-2 text-center">Thời Hạn Hiệu Lực</th>
                  <th className="border border-slate-300 p-2 text-center">Số Buổi PT</th>
                  <th className="border border-slate-300 p-2 text-center">Hạn Mức Bảo Lưu</th>
                  <th className="border border-slate-300 p-2 text-right">Giá Trị Hợp Đồng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold">{membership.packageName}</td>
                  <td className="border border-slate-300 p-2 text-center">
                    {membership.startDate} đến {membership.endDate}
                  </td>
                  <td className="border border-slate-300 p-2 text-center font-bold text-emerald-600">
                    {membership.remainingSessions} / {membership.totalSessions || membership.remainingSessions} buổi
                  </td>
                  <td className="border border-slate-300 p-2 text-center">
                    Tối đa {membership.maxFreezeDays} ngày (Đã dùng: {membership.frozenDaysUsed} ngày)
                  </td>
                  <td className="border border-slate-300 p-2 text-right font-black text-city-red">
                    {membership.packagePrice ? membership.packagePrice.toLocaleString('vi-VN') + ' đ' : '5.800.000 đ'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quy định & Cam kết */}
          <div className="text-[11px] text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <p className="font-bold text-slate-800">ĐIỀU KHOẢN VÀ CAM KẾT CHÍNH CỦA CITYGYM:</p>
            <p>1. Check-in hợp lệ: Hội viên sử dụng mã QR động trên ứng dụng hoặc Cổng Hội Viên để quét tại cổng kiểm soát.</p>
            <p>2. Quy định bảo lưu: Hội viên có thể tạm ngưng hợp đồng trong hạn mức ngày tối đa. Hệ thống tự động cộng bù số ngày đóng băng vào ngày kết thúc mới khi mở lại thẻ.</p>
            <p>3. Quy định HLV cá nhân (PT): Buổi tập PT phải được hủy trước ít nhất 02 giờ. Khi xác nhận hoàn tất, hệ thống tự động trừ 01 buổi trên hồ sơ.</p>
          </div>

          {/* Chữ ký hai bên */}
          <div className="grid grid-cols-2 pt-6 text-center text-xs">
            <div className="space-y-16">
              <p className="font-bold uppercase">ĐẠI DIỆN HỘI VIÊN (BÊN B)</p>
              <p className="font-bold text-slate-800">{membership.memberName}</p>
            </div>
            <div className="space-y-16">
              <div>
                <p className="font-bold uppercase">ĐẠI DIỆN TRUNG TÂM CITYGYM (BÊN A)</p>
                <p className="text-[10px] text-slate-500">(Ký, ghi rõ họ tên và đóng dấu)</p>
              </div>
              <p className="font-bold text-city-red">Võ Duy Phúc - Ban Giám Đốc</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

