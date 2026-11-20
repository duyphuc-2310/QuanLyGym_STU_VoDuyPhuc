import React, { useState } from 'react';
import { 
  Users, Search, UserCheck, Flame, Phone, Calendar, 
  ArrowRight, CheckCircle2, QrCode, Filter, Sparkles, Zap
} from 'lucide-react';
import { Lead, Membership } from '../../types';
import { NewContractModal } from '../../components/modals/NewContractModal';

interface LeadCRMProps {
  leads: Lead[];
  onConvertLead: (leadId: number) => void;
  onAddMembership: (newM: Membership) => void;
  onApprovePaidLead?: (lead: Lead) => void;
}

export const LeadCRM: React.FC<LeadCRMProps> = ({
  leads,
  onConvertLead,
  onAddMembership,
  onApprovePaidLead,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | string>('ALL');
  const [selectedLeadForConvert, setSelectedLeadForConvert] = useState<Lead | null>(null);

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      l.ticketCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalLeads = leads.length;
  const checkedInLeads = leads.filter((l) => l.status === 'TRIAL_CHECKED_IN').length;
  const convertedLeads = leads.filter((l) => l.status === 'CONVERTED').length;
  const pendingApprovalLeads = leads.filter((l) => l.status === 'PAID_PENDING_APPROVAL').length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-city-red font-black text-xs uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Phân Hệ Phễu Bán Hàng & Chăm Sóc Khách Hàng</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            CRM Khách Vãng Lai & Vé Tập Thử E-Pass
          </h1>
          <p className="text-xs text-slate-500">
            Khách hàng đăng ký từ Landing Page được tự động đồng bộ theo thời gian thực về phễu CRM này.
          </p>
        </div>

        <div className="px-4 py-2 bg-red-50 border border-city-red/30 rounded-2xl flex items-center gap-2 text-city-red font-black text-xs">
          <Sparkles className="w-4 h-4" />
          <span>Tỷ lệ chuyển đổi: {conversionRate}%</span>
        </div>
      </div>

      {/* KPI Funnel */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase text-slate-400">1. Đăng Ký Mới Từ Landing</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{totalLeads}</p>
          <p className="text-[10px] text-slate-500">Khách gửi thông tin qua web</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-sm">
          <span className="text-[11px] font-bold uppercase text-amber-700">2. Chờ Duyệt VietQR</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{pendingApprovalLeads}</p>
          <p className="text-[10px] text-amber-800">Đã thanh toán - Cần cấp TK</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase text-slate-400">3. Đã Quét Đến Tập Thử</span>
          <p className="text-2xl font-black text-purple-600 mt-1">{checkedInLeads}</p>
          <p className="text-[10px] text-slate-500">Đã trải nghiệm phòng tập</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold uppercase text-slate-400">4. Đã Chốt Gói Hội Viên</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{convertedLeads}</p>
          <p className="text-[10px] text-slate-500">Đã chuyển thành hội viên chính thức</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center justify-between">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên khách hàng, số điện thoại, mã vé E-Pass..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-city-red"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-bold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Trạng thái:
          </span>
          {[
            { id: 'ALL', label: 'Tất cả' },
            { id: 'NEW', label: 'Mới đăng ký' },
            { id: 'PAID_PENDING_APPROVAL', label: `Chờ duyệt VietQR (${pendingApprovalLeads})` },
            { id: 'TRIAL_CHECKED_IN', label: 'Đã check-in tập' },
            { id: 'CONVERTED', label: 'Đã mua gói' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                statusFilter === st.id
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
              <tr>
                <th className="p-4">Mã Vé E-Pass</th>
                <th className="p-4">Khách Hàng</th>
                <th className="p-4">Số Điện Thoại</th>
                <th className="p-4">Dịch Vụ Quan Tâm</th>
                <th className="p-4">Ngày Đăng Ký</th>
                <th className="p-4">Trạng Thái Lead</th>
                <th className="p-4 text-right">Hành Động Chăm Sóc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-city-red flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-city-red" />
                    <span>{lead.ticketCode}</span>
                  </td>

                  <td className="p-4 font-bold text-slate-900 text-sm">{lead.fullName}</td>

                  <td className="p-4">
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-slate-700 hover:text-city-red font-semibold flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{lead.phone}</span>
                    </a>
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-slate-800">{lead.service}</span>
                  </td>

                  <td className="p-4 text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{lead.date}</span>
                  </td>

                  <td className="p-4">
                    {lead.status === 'NEW' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-700 border border-amber-200">
                        Mới Đăng Ký
                      </span>
                    )}
                    {lead.status === 'PAID_PENDING_APPROVAL' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm flex items-center gap-1 w-fit animate-pulse">
                        ⚡ Đã Trả VietQR (Chờ Duyệt)
                      </span>
                    )}
                    {lead.status === 'TRIAL_CHECKED_IN' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-purple-100 text-purple-700 border border-purple-200">
                        Đã Quét Đến Tập Thử
                      </span>
                    )}
                    {lead.status === 'CONVERTED' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200">
                        Đã Mua Gói Hội Viên
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    {lead.status === 'PAID_PENDING_APPROVAL' ? (
                      <button
                        onClick={() => {
                          if (onApprovePaidLead) {
                            onApprovePaidLead(lead);
                          } else {
                            setSelectedLeadForConvert(lead);
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-md flex items-center gap-1.5 ml-auto text-xs hover:scale-105 active:scale-95 transition-all"
                        title="Duyệt thanh toán, cấp tài khoản & tự động gửi Zalo cho khách"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                        <span>⚡ Cấp TK, MK & Gửi Zalo</span>
                      </button>
                    ) : lead.status !== 'CONVERTED' ? (
                      <button
                        onClick={() => setSelectedLeadForConvert(lead)}
                        className="px-3 py-1.5 rounded-xl font-bold bg-gradient-to-r from-city-red to-city-accent hover:from-city-darkred hover:to-city-red text-white shadow-sm flex items-center gap-1.5 ml-auto text-xs"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Chốt Gói Hội Viên</span>
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-bold text-xs inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đã kích hoạt HĐ
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Convert to Contract Modal */}
      {selectedLeadForConvert && (
        <NewContractModal
          isOpen={true}
          onClose={() => setSelectedLeadForConvert(null)}
          prefillName={selectedLeadForConvert.fullName}
          prefillPhone={selectedLeadForConvert.phone}
          onSave={(newM) => {
            onAddMembership(newM);
            onConvertLead(selectedLeadForConvert.id);
            alert(`Đã chốt gói và tạo hợp đồng thành công cho khách hàng ${selectedLeadForConvert.fullName}!`);
            setSelectedLeadForConvert(null);
          }}
        />
      )}

    </div>
  );
};

