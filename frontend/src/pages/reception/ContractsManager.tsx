import React, { useState } from 'react';
import { 
  CreditCard, Search, Plus, Snowflake, Play, Printer, 
  CheckCircle2, XCircle, Clock, AlertTriangle, Filter, Sparkles
} from 'lucide-react';
import { Membership, MembershipStatus } from '../../types';
import { NewContractModal } from '../../components/modals/NewContractModal';
import { PrintContractModal } from '../../components/modals/PrintContractModal';

interface ContractsManagerProps {
  memberships: Membership[];
  onAddMembership: (membership: Membership) => void;
  onUpdateMembership: (updated: Membership) => void;
}

export const ContractsManager: React.FC<ContractsManagerProps> = ({
  memberships,
  onAddMembership,
  onUpdateMembership,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | MembershipStatus>('ALL');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Membership | null>(null);

  // Freeze action logic
  const handleFreeze = (m: Membership) => {
    if (m.status !== 'ACTIVE') {
      alert('Chỉ có thể đóng băng bảo lưu cho hợp đồng đang hoạt động (ACTIVE).');
      return;
    }

    const availableDays = m.maxFreezeDays - m.frozenDaysUsed;
    if (availableDays <= 0) {
      alert(`Hợp đồng ${m.contractCode} đã dùng hết toàn bộ ${m.maxFreezeDays} ngày hạn mức bảo lưu!`);
      return;
    }

    const inputDays = prompt(
      `Hợp đồng còn được bảo lưu tối đa ${availableDays} ngày.\nNhập số ngày bạn muốn bảo lưu:`,
      '15'
    );
    if (!inputDays) return;

    const days = parseInt(inputDays);
    if (isNaN(days) || days <= 0 || days > availableDays) {
      alert(`Số ngày không hợp lệ! Vui lòng nhập từ 1 đến ${availableDays} ngày.`);
      return;
    }

    const updated: Membership = {
      ...m,
      status: 'FROZEN',
      frozenDaysUsed: m.frozenDaysUsed + days,
    };
    onUpdateMembership(updated);
    alert(`Đã bảo lưu thành công hợp đồng ${m.contractCode} trong ${days} ngày.\nThẻ tạm thời bị khóa check-in cho đến khi mở lại.`);
  };

  // Unfreeze action logic (Auto-extend end date)
  const handleUnfreeze = (m: Membership) => {
    if (m.status !== 'FROZEN') return;

    const extendDays = m.frozenDaysUsed || 15;
    const oldEnd = new Date(m.endDate);
    oldEnd.setDate(oldEnd.getDate() + extendDays);
    const newEndDateStr = oldEnd.toISOString().split('T')[0];

    const updated: Membership = {
      ...m,
      status: 'ACTIVE',
      endDate: newEndDateStr,
    };
    onUpdateMembership(updated);
    alert(
      `Mở lại hợp đồng ${m.contractCode} thành công!\n` +
      `Hệ thống đã tự động cộng bù ${extendDays} ngày vào hạn thẻ.\n` +
      `Hạn thẻ mới: ${newEndDateStr}`
    );
  };

  const handleOpenPrint = (m: Membership) => {
    setSelectedContract(m);
    setIsPrintModalOpen(true);
  };

  // Filtered list
  const filtered = memberships.filter((m) => {
    const matchesSearch =
      m.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.memberPhone.includes(searchTerm) ||
      m.contractCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = memberships.filter((m) => m.status === 'ACTIVE').length;
  const frozenCount = memberships.filter((m) => m.status === 'FROZEN').length;
  const expiredCount = memberships.filter((m) => m.status === 'EXPIRED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-city-red font-black text-xs uppercase tracking-wider">
            <CreditCard className="w-4 h-4" />
            <span>Phân Hệ Quản Lý Hợp Đồng</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Gói Tập & Nghiệp Vụ Bảo Lưu Thẻ
          </h1>
          <p className="text-xs text-slate-500">
            Kích hoạt hợp đồng mới, đóng băng bảo lưu tự động cộng bù ngày hết hạn và in biểu mẫu STU.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-city-red to-city-accent hover:from-city-darkred hover:to-city-red text-white font-bold text-xs shadow-lg shadow-city-red/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Lập Hợp Đồng Mới</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Đang Hoạt Động (Active)</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">{activeCount}</p>
            <p className="text-[10px] text-slate-500">Check-in tự do qua cửa</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Đang Bảo Lưu (Frozen)</span>
            <p className="text-2xl font-black text-blue-600 mt-1">{frozenCount}</p>
            <p className="text-[10px] text-slate-500">Tạm ngưng quyền ra vào</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Snowflake className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-slate-400">Đã Hết Hạn (Expired)</span>
            <p className="text-2xl font-black text-red-600 mt-1">{expiredCount}</p>
            <p className="text-[10px] text-slate-500">Cần tư vấn gia hạn</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center justify-between">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hội viên, số điện thoại hoặc mã HĐ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-city-red"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-bold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Lọc:
          </span>
          {(['ALL', 'ACTIVE', 'FROZEN', 'EXPIRED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' ? 'Tất cả' : st === 'ACTIVE' ? 'Đang tập' : st === 'FROZEN' ? 'Bảo lưu' : 'Hết hạn'}
            </button>
          ))}
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
              <tr>
                <th className="p-4">Mã Hợp Đồng</th>
                <th className="p-4">Hội Viên</th>
                <th className="p-4">Gói Dịch Vụ</th>
                <th className="p-4">Thời Hạn Thẻ</th>
                <th className="p-4">Số Buổi PT</th>
                <th className="p-4">Hạn Mức Bảo Lưu</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-right">Nghiệp Vụ Quầy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-city-red">{m.contractCode}</td>
                  
                  <td className="p-4">
                    <p className="font-bold text-slate-900 text-sm">{m.memberName}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{m.memberPhone}</p>
                  </td>

                  <td className="p-4">
                    <p className="font-bold text-slate-900">{m.packageName}</p>
                    {m.assignedPtName && (
                      <p className="text-[10px] text-slate-400">PT: {m.assignedPtName}</p>
                    )}
                  </td>

                  <td className="p-4">
                    <p className="font-semibold text-slate-800">Đến: {m.endDate}</p>
                    <p className="text-[10px] text-slate-400">Từ {m.startDate}</p>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {m.remainingSessions} / {m.totalSessions || m.remainingSessions} buổi
                    </span>
                  </td>

                  <td className="p-4">
                    <p className="font-medium text-slate-800">
                      Đã dùng: <strong className="text-city-red">{m.frozenDaysUsed}</strong> / {m.maxFreezeDays} ngày
                    </p>
                  </td>

                  <td className="p-4">
                    {m.status === 'ACTIVE' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200">
                        Đang Hoạt Động
                      </span>
                    )}
                    {m.status === 'FROZEN' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-100 text-blue-700 border border-blue-200">
                        Đang Bảo Lưu ({m.frozenDaysUsed}d)
                      </span>
                    )}
                    {m.status === 'EXPIRED' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-red-100 text-red-700 border border-red-200">
                        Đã Hết Hạn
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right space-x-1.5">
                    {m.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleFreeze(m)}
                        className="px-3 py-1.5 rounded-xl font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors inline-flex items-center gap-1"
                      >
                        <Snowflake className="w-3.5 h-3.5" />
                        <span>Bảo Lưu</span>
                      </button>
                    )}

                    {m.status === 'FROZEN' && (
                      <button
                        onClick={() => handleUnfreeze(m)}
                        className="px-3 py-1.5 rounded-xl font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors inline-flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Mở Lại (Cộng Bù)</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenPrint(m)}
                      className="px-3 py-1.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors inline-flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>In HĐ</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Contract Modal */}
      <NewContractModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSave={(newM) => {
          onAddMembership(newM);
          alert(`Đã lập thành công hợp đồng ${newM.contractCode} cho hội viên ${newM.memberName}!`);
        }}
      />

      {/* Print Contract Modal */}
      <PrintContractModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        membership={selectedContract}
      />

    </div>
  );
};

