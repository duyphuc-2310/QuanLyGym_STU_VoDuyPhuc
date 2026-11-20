import React, { useEffect } from 'react';
import {
  X, CheckCircle2, ShieldCheck, MapPin, QrCode, Phone,
  ExternalLink, Bell, Smartphone, Share2, Sparkles
} from 'lucide-react';
import { ZaloZnsMessage } from '../../types';
import { playZaloNotificationSound } from '../../utils/audio';

interface ZaloNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: ZaloZnsMessage | null;
  onOpenCheckin?: (code: string) => void;
}

export const ZaloNotificationModal: React.FC<ZaloNotificationModalProps> = ({
  isOpen,
  onClose,
  message,
  onOpenCheckin,
}) => {
  useEffect(() => {
    if (isOpen) {
      playZaloNotificationSound();
    }
  }, [isOpen]);

  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">

      {/* Smartphone frame container */}
      <div className="bg-slate-900 border-2 border-slate-700 rounded-[2.5rem] p-3 max-w-sm w-full shadow-2xl relative">

        {/* Phone Speaker Notch */}
        <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
          <div className="w-10 h-1 bg-slate-600 rounded-full"></div>
        </div>

        {/* Smartphone Screen Inner */}
        <div className="bg-[#f2f4f7] rounded-[2rem] overflow-hidden text-slate-800 shadow-inner flex flex-col max-h-[85vh]">

          {/* Zalo Top App Bar */}
          <div className="bg-[#0068ff] text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-[#0068ff] flex items-center justify-center font-black text-xs shadow-sm">
                Z
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs tracking-wide">Zalo Official Account</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                </div>
                <p className="text-[10px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  CITYGYM STU Official • Tích Xanh
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Stream */}
          <div className="p-3.5 overflow-y-auto space-y-3 flex-1 text-xs">

            {/* Timestamp pill */}
            <div className="text-center">
              <span className="bg-slate-200/80 text-slate-500 text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                Hôm nay, {message.sentAt || new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Official ZNS Card */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 overflow-hidden">

              {/* Header banner */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-black tracking-widest text-red-200 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    Zalo Notification Service (ZNS)
                  </span>
                  <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded text-white font-mono">
                    Hệ Thống STU
                  </span>
                </div>
                <h4 className="text-sm font-black mt-1 uppercase tracking-tight">
                  {message.templateType === 'TRIAL_EPASS'
                    ? '🎉 Xác Nhận Vé Tập Thử E-Pass 0Đ'
                    : message.templateType === 'ACCOUNT_CREDENTIALS'
                      ? '🔐 Cấp Tài Khoản & Kích Hoạt Hội Viên'
                      : '💳 Thông Báo Kích Hoạt Hợp Đồng Hội Viên'}
                </h4>
              </div>

              {/* Message Content */}
              <div className="p-3.5 space-y-2.5 text-slate-700 text-[11px]">
                <p className="leading-relaxed">
                  Kính gửi anh/chị <strong className="text-slate-900 font-bold">{message.recipientName}</strong>,
                </p>

                {message.templateType === 'ACCOUNT_CREDENTIALS' ? (
                  <>
                    <p className="leading-relaxed">
                      Chúc mừng anh/chị đã hoàn tất thanh toán và chính thức trở thành <strong>Hội Viên CITYGYM STU Campus</strong>! Dưới đây là thông tin tài khoản đăng nhập Cổng Hội Viên:
                    </p>

                    {/* Account Box */}
                    <div className="bg-red-50/70 rounded-2xl p-3.5 border-2 border-[#DC2626]/30 space-y-2 text-slate-800 shadow-sm">
                      <div className="flex items-center justify-between pb-2 border-b border-red-200">
                        <span className="font-bold text-xs uppercase text-[#DC2626]">Thông Tin Đăng Nhập:</span>
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded-full font-bold text-slate-700 border border-red-200">
                          {message.customData?.packageName || 'CityVIP 12 Tháng'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 font-semibold">Tên đăng nhập / SĐT:</span>
                        <strong className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 font-black">
                          {message.username || message.recipientPhone}
                        </strong>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 font-semibold">Mật khẩu khởi tạo:</span>
                        <strong className="font-mono text-[#DC2626] bg-white px-2 py-0.5 rounded border border-red-200 font-black">
                          {message.password || '123456'}
                        </strong>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600">Mã hợp đồng:</span>
                        <span className="font-mono font-bold text-slate-800">{message.contractCode || 'HD-2026-STU'}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-[10px] text-slate-600">
                      <p className="font-bold text-slate-800">📌 Hướng dẫn sử dụng:</p>
                      <p>1. Truy cập link <strong>/#admin</strong> hoặc bấm nút bên dưới.</p>
                      <p>2. Nhập SĐT và Mật khẩu để vào thẳng <strong>Cổng Hội Viên Cá Nhân</strong>.</p>
                      <p>3. Sử dụng mã QR 60s trên điện thoại để mở cửa phòng tập 24/7 và đặt lịch PT 1-1.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="leading-relaxed">
                      Cảm ơn anh/chị đã tin chọn <strong>CITYGYM</strong>. Hệ thống xin gửi thông tin vé tập thử 24/7 trải nghiệm không gian thể hình Olympic và đo chỉ số InBody miễn phí:
                    </p>

                    {/* Key-Value Ticket Grid */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
                      <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                        <span className="text-slate-500">Mã vé Check-in:</span>
                        <span className="font-mono font-black text-red-600 text-xs bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          {message.ticketCode || message.contractCode || 'EPASS-2026'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Số điện thoại:</span>
                        <strong className="text-slate-900">{message.recipientPhone}</strong>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Chi nhánh đăng ký:</span>
                        <strong className="text-slate-900 text-right">{message.branchName || 'CITYGYM STU Campus (Trụ Sở Chính)'}</strong>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Địa chỉ:</span>
                        <span className="text-slate-700 text-right font-medium">180 Cao Lỗ, Phường 4, Quận 8, TP.HCM</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Thời gian mở cửa:</span>
                        <strong className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">24/7 quanh năm</strong>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Quyền lợi kèm theo:</span>
                        <span className="text-slate-800 font-semibold text-right">Đo InBody 270 & PT kèm 1-1</span>
                      </div>
                    </div>

                    {/* QR Code Preview for Scanning */}
                    <div className="bg-red-50/60 rounded-xl p-3 border border-red-200 flex items-center gap-3">
                      <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center shrink-0 shadow-sm">
                        <div className="w-full h-full bg-slate-900 rounded p-1 flex flex-col justify-between">
                          <div className="flex justify-between">
                            <div className="w-3.5 h-3.5 bg-white border-2 border-slate-900"></div>
                            <div className="w-3.5 h-3.5 bg-white border-2 border-slate-900"></div>
                          </div>
                          <div className="w-2 h-2 bg-red-500 mx-auto rounded-full"></div>
                          <div className="flex justify-between">
                            <div className="w-3.5 h-3.5 bg-white border-2 border-slate-900"></div>
                            <div className="w-2 h-2 bg-white"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs">Mã QR Mở Cửa 24/7</p>
                        <p className="text-[10px] text-slate-600 mt-0.5 leading-tight">
                          Đưa mã này tại cửa xoay tự động hoặc cho Lễ tân quầy để vào tập.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-1 text-[10px] text-slate-400 italic">
                  * Tin nhắn này được gửi tự động từ hệ thống quản lý CityGym STU Luận Văn Tốt Nghiệp 2026.
                </div>
              </div>

              {/* Action Buttons inside Card */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
                {message.templateType === 'ACCOUNT_CREDENTIALS' ? (
                  <button
                    onClick={() => {
                      onClose();
                      window.location.hash = '#admin';
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
                  >
                    <span>Vào Cổng Đăng Nhập Hội Viên (#admin)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  onOpenCheckin && message.ticketCode && (
                    <button
                      onClick={() => {
                        onOpenCheckin(message.ticketCode || '');
                        onClose();
                      }}
                      className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Mô Phỏng Quét Check-in Tại Cửa Xoay</span>
                    </button>
                  )
                )}

                <a
                  href="https://maps.google.com/?q=180+Cao+Lo+Phuong+4+Quan+8+TPHCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>Xem Chỉ Đường Google Maps (180 Cao Lỗ, Q8)</span>
                </a>
              </div>

            </div>

          </div>

          {/* Bottom simulated phone bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-slate-400 text-xs shrink-0">
            <span className="text-[10px]">Đã nhận lúc {message.sentAt || 'Vừa xong'}</span>
            <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã chuyển qua Zalo ZNS</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

