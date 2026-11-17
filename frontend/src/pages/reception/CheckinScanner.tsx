import React, { useState } from 'react';
import { 
  QrCode, ShieldCheck, CheckCircle2, XCircle, Search, 
  Volume2, VolumeX, RefreshCw, Clock, UserCheck, Flame, Dumbbell
} from 'lucide-react';
import { CheckInLog, CheckInStatus, Lead, Membership } from '../../types';

interface CheckinScannerProps {
  memberships: Membership[];
  leads: Lead[];
  checkinLogs: CheckInLog[];
  onCheckinSuccess: (log: CheckInLog) => void;
  onUpdateLeadStatus: (ticketCode: string, status: any) => void;
}

export const CheckinScanner: React.FC<CheckinScannerProps> = ({
  memberships,
  leads,
  checkinLogs,
  onCheckinSuccess,
  onUpdateLeadStatus,
}) => {
  const [scanInput, setScanInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filterType, setFilterType] = useState<'ALL' | 'SUCCESS' | 'DENIED'>('ALL');
  const [activeResult, setActiveResult] = useState<{
    status: CheckInStatus;
    name: string;
    phone?: string;
    title: string;
    detail: string;
    subDetail?: string;
  } | null>(null);

  // Play audio sound simulation
  const playSound = (status: CheckInStatus) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (status === 'SUCCESS') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else {
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3 error buzz
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      }
    } catch (e) {
      // AudioContext fallback
    }
  };

  const handleExecuteScan = (rawVal?: string) => {
    const val = (rawVal || scanInput).trim();
    if (!val) return;

    const timeStr = new Date().toLocaleTimeString();

    // 1. Kiểm tra nếu là Vé tập thử E-Pass (TRIAL-...)
    if (val.toUpperCase().includes('TRIAL-') || val.toUpperCase().startsWith('TRIAL')) {
      const lead = leads.find((l) => l.ticketCode.toUpperCase() === val.toUpperCase());
      if (lead) {
        const result = {
          status: 'SUCCESS' as CheckInStatus,
          name: lead.fullName,
          phone: lead.phone,
          title: 'VÉ TẬP THỬ 03 NGÀY HỢP LỆ',
          detail: `Khách hàng tiềm năng đăng ký qua Landing Page. Dịch vụ: ${lead.service}.`,
          subDetail: 'Đã cập nhật trạng thái phễu CRM: Đã check-in tập thử.',
        };
        setActiveResult(result);
        playSound('SUCCESS');
        onUpdateLeadStatus(lead.ticketCode, 'TRIAL_CHECKED_IN');
        onCheckinSuccess({
          id: Date.now(),
          name: lead.fullName,
          type: 'TẬP THỬ',
          status: 'SUCCESS',
          note: `Vé ${lead.ticketCode} check-in hợp lệ`,
          time: timeStr,
        });
      } else {
        const result = {
          status: 'DENIED' as CheckInStatus,
          name: 'Khách Vãng Lai',
          title: 'TỪ CHỐI CHECK-IN TẬP THỬ',
          detail: 'Mã vé tập thử không tồn tại trên hệ thống hoặc đã hết hạn 03 ngày.',
        };
        setActiveResult(result);
        playSound('DENIED');
        onCheckinSuccess({
          id: Date.now(),
          name: 'Khách vãng lai',
          type: 'TẬP THỬ',
          status: 'DENIED',
          note: `Từ chối: Mã vé ${val} không tồn tại`,
          time: timeStr,
        });
      }
      setScanInput('');
      return;
    }

    // 2. Kiểm tra nếu là Hội viên (quét QR Token hoặc nhập SĐT / Mã HĐ)
    const member = memberships.find(
      (m) =>
        m.memberPhone === val ||
        m.contractCode.toUpperCase() === val.toUpperCase() ||
        val.toLowerCase() === 'member' ||
        val.includes('CITYGYM-MEMBER-PHUC')
    );

    if (member) {
      if (member.status === 'FROZEN') {
        const result = {
          status: 'DENIED' as CheckInStatus,
          name: member.memberName,
          phone: member.memberPhone,
          title: 'HỢP ĐỒNG ĐANG BẢO LƯU',
          detail: `Hợp đồng ${member.contractCode} đang trong thời gian đóng băng bảo lưu (${member.frozenDaysUsed} ngày).`,
          subDetail: 'Vui lòng đến quầy mở lại hợp đồng trước khi vào tập!',
        };
        setActiveResult(result);
        playSound('DENIED');
        onCheckinSuccess({
          id: Date.now(),
          name: member.memberName,
          type: 'HỘI VIÊN',
          status: 'DENIED',
          note: 'Từ chối: Gói tập đang đóng băng bảo lưu',
          time: timeStr,
          contractCode: member.contractCode,
        });
      } else if (member.status === 'EXPIRED') {
        const result = {
          status: 'DENIED' as CheckInStatus,
          name: member.memberName,
          phone: member.memberPhone,
          title: 'GÓI TẬP ĐÃ HẾT HẠN HIỆU LỰC',
          detail: `Hợp đồng ${member.contractCode} đã hết hạn vào ngày ${member.endDate}.`,
          subDetail: 'Nhân viên lễ tân vui lòng hỗ trợ hội viên tư vấn gia hạn gói mới.',
        };
        setActiveResult(result);
        playSound('DENIED');
        onCheckinSuccess({
          id: Date.now(),
          name: member.memberName,
          type: 'HỘI VIÊN',
          status: 'DENIED',
          note: 'Từ chối: Gói tập đã quá hạn sử dụng',
          time: timeStr,
          contractCode: member.contractCode,
        });
      } else {
        // Hợp lệ ACTIVE
        const result = {
          status: 'SUCCESS' as CheckInStatus,
          name: member.memberName,
          phone: member.memberPhone,
          title: 'CHECK-IN THÀNH CÔNG (HỢP LỆ)',
          detail: `Gói tập: ${member.packageName} (Hiệu lực đến ${member.endDate}).`,
          subDetail: `Số buổi PT 1-1 còn lại: ${member.remainingSessions} buổi (HLV: ${member.assignedPtName || 'Chưa phân công'}).`,
        };
        setActiveResult(result);
        playSound('SUCCESS');
        onCheckinSuccess({
          id: Date.now(),
          name: member.memberName,
          type: 'HỘI VIÊN',
          status: 'SUCCESS',
          note: `${member.packageName} check-in hợp lệ`,
          time: timeStr,
          contractCode: member.contractCode,
        });
      }
    } else {
      const result = {
        status: 'DENIED' as CheckInStatus,
        name: 'Mã không xác định',
        title: 'MÃ QR KHÔNG HỢP LỆ',
        detail: 'Không tìm thấy thông tin hội viên hoặc mã QR bảo mật đã quá 60 giây.',
      };
      setActiveResult(result);
      playSound('DENIED');
      onCheckinSuccess({
        id: Date.now(),
        name: 'Mã không xác định',
        type: 'VÃNG LAI',
        status: 'DENIED',
        note: `Mã không hợp lệ: ${val}`,
        time: timeStr,
      });
    }

    setScanInput('');
  };

  const filteredLogs = checkinLogs.filter((log) => {
    if (filterType === 'SUCCESS') return log.status === 'SUCCESS';
    if (filterType === 'DENIED') return log.status === 'DENIED';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-city-red font-black text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-city-red animate-ping" />
            <span>Phân Hệ Vận Hành Cửa Khẩu</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Kiểm Soát Check-in Ra Vào Realtime
          </h1>
          <p className="text-xs text-slate-500">
            Quét mã QR động từ Cổng Hội Viên hoặc vé tập thử E-Pass từ Landing Page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              soundEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 text-slate-500 border-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>Âm thanh: {soundEnabled ? 'Bật' : 'Tắt'}</span>
          </button>
          
          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Cổng Turnstile: Sẵn sàng</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Camera & Test Buttons */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          
          {/* Simulated Scanner Viewport */}
          <div className="aspect-video bg-slate-950 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-white border-2 border-dashed border-city-red/40 p-4 text-center shadow-inner">
            <div className="relative">
              <QrCode className="w-16 h-16 text-city-red animate-pulse" />
              <div className="absolute inset-0 bg-city-red/10 rounded-full blur-md" />
            </div>
            <p className="font-bold text-sm text-white mt-2">Mô Phỏng Đầu Đọc Mã QR Tại Cửa</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Tự động nhận diện token QR và mở cổng Turnstile</p>

            {/* Scanning Laser Beam */}
            <div className="absolute inset-x-8 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-city-red to-transparent shadow-[0_0_12px_#DC2626] animate-bounce" />
          </div>

          {/* Manual Input Field */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Nhập mã QR hoặc Số Điện Thoại kiểm tra:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="vd: 0901234567 hoặc TRIAL-882910"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExecuteScan()}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:border-city-red"
              />
              <button
                onClick={() => handleExecuteScan()}
                className="px-5 py-2.5 bg-city-red hover:bg-city-darkred text-white font-bold rounded-xl text-xs shadow-md shadow-city-red/30 transition-all"
              >
                Quét
              </button>
            </div>
          </div>

          {/* Quick Click Scenario Buttons */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
                Kịch bản thử nghiệm Luận Văn:
              </span>
              <span className="text-[10px] text-slate-400">Click để chạy thử</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleExecuteScan('0901234567')}
                className="p-3 text-left rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <p className="font-black flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>1. Hợp Lệ (Võ Duy Phúc)</span>
                </p>
                <p className="text-[10px] text-emerald-600 mt-0.5">Gói VIP 12T - Cho phép mở cổng</p>
              </button>

              <button
                onClick={() => handleExecuteScan('0912333444')}
                className="p-3 text-left rounded-xl bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <p className="font-black flex items-center gap-1">
                  <span className="text-blue-600">❄</span>
                  <span>2. Đang Bảo Lưu</span>
                </p>
                <p className="text-[10px] text-blue-600 mt-0.5">Nguyễn Thị Bích - Khóa cửa</p>
              </button>

              <button
                onClick={() => handleExecuteScan('0988777666')}
                className="p-3 text-left rounded-xl bg-red-50 text-red-800 border border-red-200 hover:bg-red-100 transition-colors"
              >
                <p className="font-black flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                  <span>3. Hết Hạn Gói</span>
                </p>
                <p className="text-[10px] text-red-600 mt-0.5">Lê Hoàng Nam - Từ chối check-in</p>
              </button>

              <button
                onClick={() => handleExecuteScan('TRIAL-882910')}
                className="p-3 text-left rounded-xl bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 transition-colors"
              >
                <p className="font-black flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-purple-600" />
                  <span>4. Vé Tập Thử E-Pass</span>
                </p>
                <p className="text-[10px] text-purple-600 mt-0.5">Khách từ Landing - Hợp lệ</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Instant Verification Card & Check-in Log Table */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Instant Verification Banner */}
          {activeResult ? (
            <div
              className={`p-6 rounded-3xl border-2 shadow-xl transition-all animate-in fade-in zoom-in-95 duration-200 ${
                activeResult.status === 'SUCCESS'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                  : 'bg-red-50 border-red-500 text-red-950'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {activeResult.status === 'SUCCESS' ? (
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30">
                      <XCircle className="w-7 h-7 stroke-[2.5]" />
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/70">
                      {activeResult.title}
                    </span>
                    <h3 className="text-2xl font-black mt-1">{activeResult.name}</h3>
                    {activeResult.phone && (
                      <p className="text-xs font-semibold opacity-75">{activeResult.phone}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActiveResult(null)}
                  className="text-xs font-bold px-3 py-1 rounded-lg bg-white/60 hover:bg-white text-slate-700 transition-colors"
                >
                  Đóng
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-300/40 text-xs space-y-1">
                <p className="font-semibold">{activeResult.detail}</p>
                {activeResult.subDetail && (
                  <p className="opacity-80 text-[11px]">{activeResult.subDetail}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl border border-slate-200 bg-white text-center text-slate-400 space-y-2">
              <QrCode className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
              <p className="font-bold text-sm text-slate-600">Đang chờ lượt quét tiếp theo...</p>
              <p className="text-xs text-slate-400">Kết quả xác thực hợp lệ hay từ chối sẽ hiển thị tức thì tại đây.</p>
            </div>
          )}

          {/* History Log Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-3">
              <div>
                <h3 className="font-black text-sm text-slate-900">Nhật Ký Quét Check-in Hôm Nay</h3>
                <p className="text-[11px] text-slate-400">Tự động đồng bộ với máy chủ Socket.io</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1 text-xs">
                {(['ALL', 'SUCCESS', 'DENIED'] as const).map((ft) => (
                  <button
                    key={ft}
                    onClick={() => setFilterType(ft)}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all ${
                      filterType === ft
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {ft === 'ALL' ? 'Tất cả' : ft === 'SUCCESS' ? '✓ Hợp lệ' : '✕ Từ chối'}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs max-h-96 overflow-y-auto">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        log.status === 'SUCCESS' ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-red-500 ring-4 ring-red-100'
                      }`}
                    />
                    <div>
                      <p className="font-black text-slate-900 text-sm">{log.name}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{log.note}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        log.type === 'HỘI VIÊN'
                          ? 'bg-slate-100 text-slate-800'
                          : log.type === 'TẬP THỬ'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {log.type}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

