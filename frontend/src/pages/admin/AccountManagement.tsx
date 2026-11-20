import React, { useState } from 'react';
import { 
  UserCheck, ShieldAlert, KeyRound, UserPlus, Search, 
  Lock, Unlock, RefreshCw, CheckCircle2, XCircle, 
  Shield, Users, Dumbbell, User, Filter, AlertCircle, Sparkles,
  History, FileText, Check, Activity
} from 'lucide-react';
import { SystemAccount, UserRole, AuditLog } from '../../types';

interface AccountManagementProps {
  onAccountCreated?: (newAccount: SystemAccount) => void;
}

const INITIAL_ACCOUNTS: SystemAccount[] = [
  {
    id: 1,
    name: 'ThS. Bùi Nhật Bằng & Võ Duy Phúc',
    email: 'admin@citygym.vn',
    phone: '0901234567',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2026-01-01',
    department: 'Ban Quản Trị Cấp Cao (Toàn Quyền)',
    permissions: [
      'Toàn quyền hệ thống',
      'Cấp & phân quyền tài khoản',
      'Xem BI Doanh thu',
      'Quản lý nhân sự & hợp đồng'
    ],
  },
  {
    id: 2,
    name: 'Nguyễn Minh Tuấn',
    email: 'pt.tuan@citygym.vn',
    phone: '0911223344',
    role: 'TRAINER',
    status: 'ACTIVE',
    createdAt: '2026-01-10',
    department: 'Bộ Phận Huấn Luyện Viên PT (NASM)',
    permissions: [
      'Xem học viên phụ trách',
      'Đặt lịch dạy 1-1',
      'Xác nhận trừ buổi dạy',
      'Đo & lưu InBody 270',
      'Nhận hoa hồng buổi dạy'
    ],
  },
  {
    id: 3,
    name: 'Trần Hoàng Yến',
    email: 'pt.yen@citygym.vn',
    phone: '0933445566',
    role: 'TRAINER',
    status: 'ACTIVE',
    createdAt: '2026-02-01',
    department: 'Bộ Phận Huấn Luyện Viên Yoga (ACE)',
    permissions: [
      'Xem học viên phụ trách',
      'Đặt lịch dạy 1-1',
      'Xác nhận trừ buổi dạy',
      'Đo & lưu InBody 270',
      'Nhận hoa hồng buổi dạy'
    ],
  },
  {
    id: 4,
    name: 'Nguyễn Thị Thu',
    email: 'letan@citygym.vn',
    phone: '0977889900',
    role: 'RECEPTION',
    status: 'ACTIVE',
    createdAt: '2026-01-15',
    department: 'Quầy Tiếp Đón & Quản Lý Cửa Khẩu',
    permissions: [
      'Quét Check-in QR cửa xoay',
      'Lập hợp đồng hội viên mới',
      'Bảo lưu thẻ & gia hạn',
      'CRM phễu khách tập thử'
    ],
  },
  {
    id: 5,
    name: 'Võ Duy Phúc',
    email: 'phuc.vo@stu.edu.vn',
    phone: '0901234567',
    role: 'MEMBER',
    status: 'ACTIVE',
    createdAt: '2026-01-10',
    department: 'Hội Viên Thẻ VIP (CityVIP 12 Tháng)',
    permissions: [
      'Mã QR thẻ tập động 60s',
      'Đặt lịch tập 1-1 với PT',
      'Xem hồ sơ InBody cá nhân',
      'AI Food Scanner & Thực đơn'
    ],
  },
  {
    id: 6,
    name: 'Lê Thùy Dung',
    email: 'dung.le@gmail.com',
    phone: '0909112233',
    role: 'MEMBER',
    status: 'ACTIVE',
    createdAt: '2026-11-20',
    department: 'Hội Viên Mới Kích Hoạt (CityVIP 12 Tháng)',
    permissions: [
      'Mã QR thẻ tập động 60s',
      'Đặt lịch tập 1-1 với PT',
      'Xem hồ sơ InBody cá nhân',
      'AI Food Scanner & Thực đơn'
    ],
  },
];

const SAMPLE_AUDIT_LOGS: AuditLog[] = [
  {
    id: 1,
    timestamp: '2026-11-20 10:35:12',
    actorName: 'ThS. Bùi Nhật Bằng & Võ Duy Phúc',
    actorRole: 'ADMIN',
    action: 'Cấp tài khoản & phân quyền mới',
    target: 'Hội viên: Lê Thùy Dung (dung.le@gmail.com)',
    ipAddress: '192.168.1.10 (Máy Quản Trị)',
    severity: 'SUCCESS',
  },
  {
    id: 2,
    timestamp: '2026-11-20 10:30:25',
    actorName: 'Nguyễn Thị Thu (Lễ Tân)',
    actorRole: 'RECEPTION',
    action: 'Kích hoạt hợp đồng mới CityVIP 12 Tháng (20 Buổi PT)',
    target: 'HD-2026-0003 (Lê Thùy Dung)',
    ipAddress: '192.168.1.25 (Quầy Tiếp Đón STU)',
    severity: 'SUCCESS',
  },
  {
    id: 3,
    timestamp: '2026-11-20 10:15:40',
    actorName: 'Hệ Thống Tự Động (Zalo ZNS Webhook)',
    actorRole: 'ADMIN',
    action: 'Bắn tin nhắn Zalo xác nhận vé tập thử E-Pass 0Đ',
    target: 'Khách hàng: 0909112233 (Mã: TRIAL-884912)',
    ipAddress: 'API Gateway (Zalo Official)',
    severity: 'INFO',
  },
  {
    id: 4,
    timestamp: '2026-11-20 09:45:10',
    actorName: 'Nguyễn Minh Tuấn (HLV PT)',
    actorRole: 'TRAINER',
    action: 'Xác nhận hoàn thành ca tập kèm 1-1 & ghi nhận hoa hồng 150.000đ',
    target: 'Học viên: Võ Duy Phúc (Buổi 2/20)',
    ipAddress: '192.168.1.42 (Thiết Bị HLV)',
    severity: 'SUCCESS',
  },
  {
    id: 5,
    timestamp: '2026-11-20 09:12:00',
    actorName: 'Nguyễn Thị Thu (Lễ Tân)',
    actorRole: 'RECEPTION',
    action: 'Quét QR Cửa Xoay Tự Động - Check-in thành công',
    target: 'Hội viên: Võ Duy Phúc (HD-2026-0001)',
    ipAddress: '192.168.1.15 (Cổng Cửa 1)',
    severity: 'SUCCESS',
  },
  {
    id: 6,
    timestamp: '2026-11-19 16:20:00',
    actorName: 'Nguyễn Thị Thu (Lễ Tân)',
    actorRole: 'RECEPTION',
    action: 'Đóng băng bảo lưu thẻ 15 ngày',
    target: 'Hợp đồng: HD-2026-0002 (Nguyễn Thị Bích)',
    ipAddress: '192.168.1.25 (Quầy Tiếp Đón STU)',
    severity: 'WARNING',
  },
];

export const AccountManagement: React.FC<AccountManagementProps> = ({ onAccountCreated }) => {
  const [accounts, setAccounts] = useState<SystemAccount[]>(INITIAL_ACCOUNTS);
  const [auditLogs] = useState<AuditLog[]>(SAMPLE_AUDIT_LOGS);
  const [activeSubTab, setActiveSubTab] = useState<'ACCOUNTS' | 'RBAC_MATRIX' | 'AUDIT_LOGS'>('ACCOUNTS');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | UserRole>('ALL');

  // Modal State for issuing new account
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newAccountForm, setNewAccountForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: 'CityGym@2026',
    role: 'TRAINER' as UserRole,
    department: 'Bộ Phận Huấn Luyện Viên Cá Nhân',
  });

  // Filter accounts
  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.phone.includes(searchTerm) ||
      acc.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || acc.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Toggle account status
  const handleToggleStatus = (accountId: number) => {
    const target = accounts.find((a) => a.id === accountId);
    if (!target) return;
    if (target.role === 'ADMIN') {
      alert('Không thể khóa tài khoản Quản trị viên cấp cao (Admin)!');
      return;
    }

    const nextStatus = target.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    setAccounts((prev) =>
      prev.map((a) => (a.id === accountId ? { ...a, status: nextStatus } : a))
    );
    alert(`Đã ${nextStatus === 'LOCKED' ? 'TẠM KHÓA' : 'KÍCH HOẠT LẠI'} tài khoản của ${target.name}!`);
  };

  // Reset password
  const handleResetPassword = (acc: SystemAccount) => {
    const tempPass = 'CityGym@' + Math.floor(100 + Math.random() * 900);
    alert(
      `Đã đặt lại mật khẩu thành công cho ${acc.name} (${acc.email})!\n` +
      `Mật khẩu tạm thời mới là: ${tempPass}\n` +
      `Hệ thống đã gửi thông báo mật khẩu qua SMS / Email cho người dùng.`
    );
  };

  // Create new account submit
  const handleCreateAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountForm.name.trim() || !newAccountForm.email.trim() || !newAccountForm.phone.trim()) {
      alert('Vui lòng nhập đầy đủ Họ tên, Email và Số điện thoại.');
      return;
    }

    // Default permissions based on role
    let permissions: string[] = [];
    if (newAccountForm.role === 'TRAINER') {
      permissions = [
        'Xem học viên phụ trách',
        'Đặt lịch dạy 1-1',
        'Xác nhận trừ buổi dạy',
        'Đo & lưu InBody 270',
        'Nhận hoa hồng buổi dạy'
      ];
    } else if (newAccountForm.role === 'MEMBER') {
      permissions = [
        'Mã QR thẻ tập động 60s',
        'Đặt lịch tập 1-1 với PT',
        'Xem hồ sơ InBody cá nhân',
        'AI Food Scanner & Thực đơn'
      ];
    } else if (newAccountForm.role === 'RECEPTION') {
      permissions = [
        'Quét Check-in QR cửa xoay',
        'Lập hợp đồng hội viên mới',
        'Bảo lưu thẻ & gia hạn',
        'CRM phễu khách tập thử'
      ];
    } else {
      permissions = ['Toàn quyền hệ thống', 'Cấp & phân quyền tài khoản', 'Xem BI Doanh thu'];
    }

    const created: SystemAccount = {
      id: Date.now(),
      name: newAccountForm.name.trim(),
      email: newAccountForm.email.trim(),
      phone: newAccountForm.phone.trim(),
      role: newAccountForm.role,
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
      department: newAccountForm.department.trim() || (newAccountForm.role === 'TRAINER' ? 'Huấn Luyện Viên' : 'Hội Viên'),
      permissions,
    };

    setAccounts([created, ...accounts]);
    if (onAccountCreated) onAccountCreated(created);

    alert(
      `CẤP TÀI KHOẢN THÀNH CÔNG!\n` +
      `• Họ tên: ${created.name}\n` +
      `• Vai trò: ${created.role}\n` +
      `• Email đăng nhập: ${created.email}\n` +
      `• Mật khẩu khởi tạo: ${newAccountForm.password}`
    );

    setIsCreateModalOpen(false);
    setNewAccountForm({
      name: '',
      email: '',
      phone: '',
      password: 'CityGym@2026',
      role: 'TRAINER',
      department: 'Bộ Phận Huấn Luyện Viên Cá Nhân',
    });
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 border border-purple-200">👑 QUẢN TRỊ VIÊN (ADMIN)</span>;
      case 'TRAINER':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">🏋️ HUẤN LUYỆN VIÊN (PT)</span>;
      case 'RECEPTION':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200">🛡️ LỄ TÂN QUẦY</span>;
      case 'MEMBER':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">👤 HỘI VIÊN CHÍNH THỨC</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-100 text-slate-700">KHÁCH HÀNG</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-city-red font-black text-xs uppercase tracking-wider">
            <KeyRound className="w-4 h-4" />
            <span>Phân Hệ Quản Trị Cấp Cao (RBAC Security)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Phân Quyền & Cấp Tài Khoản Hệ Thống
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-1">
            Chỉ Quản trị viên (Admin) mới có quyền cấp tài khoản đăng nhập cho <strong>Huấn luyện viên (PT)</strong>, <strong>Hội viên (Member)</strong> và <strong>Lễ tân</strong>.
          </p>
        </div>

        {/* Nút Cấp Tài Khoản Mới */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-city-red to-city-accent hover:from-city-darkred hover:to-city-red text-white font-bold text-xs shadow-lg shadow-city-red/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <UserPlus className="w-4 h-4" />
          <span>Cấp Tài Khoản Mới (HLV / Hội Viên)</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-slate-400">Tổng Tài Khoản Đã Cấp</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{accounts.length}</p>
          <span className="text-[10px] text-emerald-600 font-bold">100% bảo mật phân quyền</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-amber-600">Huấn Luyện Viên (PT)</span>
          <p className="text-2xl font-black text-amber-700 mt-1">
            {accounts.filter((a) => a.role === 'TRAINER').length}
          </p>
          <span className="text-[10px] text-slate-400">Có quyền quản lý học viên</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-emerald-600">Hội Viên Đã Cấp Quyền</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">
            {accounts.filter((a) => a.role === 'MEMBER').length}
          </p>
          <span className="text-[10px] text-slate-400">Có mã QR động & AI Scanner</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase text-blue-600">Nhân Sự Lễ Tân</span>
          <p className="text-2xl font-black text-blue-700 mt-1">
            {accounts.filter((a) => a.role === 'RECEPTION').length}
          </p>
          <span className="text-[10px] text-slate-400">Có quyền Check-in cửa xoay</span>
        </div>
      </div>

      {/* 3 Sub-View Navigation Tabs */}
      <div className="flex flex-wrap gap-2 pb-1 border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab('ACCOUNTS')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeSubTab === 'ACCOUNTS'
              ? 'bg-city-red text-white shadow-md shadow-city-red/30'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Danh Sách Tài Khoản & Cấp Quyền ({accounts.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('RBAC_MATRIX')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeSubTab === 'RBAC_MATRIX'
              ? 'bg-city-red text-white shadow-md shadow-city-red/30'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Ma Trận Phân Quyền RBAC (Báo Cáo Luận Văn)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('AUDIT_LOGS')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeSubTab === 'AUDIT_LOGS'
              ? 'bg-city-red text-white shadow-md shadow-city-red/30'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Nhật Ký Kiểm Toán Hệ Thống (Audit Logs)</span>
        </button>
      </div>

      {activeSubTab === 'ACCOUNTS' && (
        <>
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-3 items-center justify-between">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo họ tên, email, số điện thoại, bộ phận..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-city-red"
          />
        </div>

        {/* Filter Role */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-bold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Lọc vai trò:
          </span>
          {[
            { id: 'ALL', label: 'Tất cả' },
            { id: 'TRAINER', label: 'HLV (PT)' },
            { id: 'MEMBER', label: 'Hội Viên' },
            { id: 'RECEPTION', label: 'Lễ Tân' },
            { id: 'ADMIN', label: 'Admin' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setRoleFilter(item.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                roleFilter === item.id
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
              <tr>
                <th className="p-4">Tài Khoản / Người Dùng</th>
                <th className="p-4">Số Điện Thoại</th>
                <th className="p-4">Vai Trò Hệ Thống</th>
                <th className="p-4">Phòng Ban / Gói Tập</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4">Quyền Hạn Lõi</th>
                <th className="p-4 text-right">Hành Động Của Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAccounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Name & Email */}
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-800 text-sm">
                        {acc.name.split(' ').pop()?.[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{acc.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{acc.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="p-4 font-mono font-semibold text-slate-800">{acc.phone}</td>

                  {/* Role Badge */}
                  <td className="p-4">{getRoleBadge(acc.role)}</td>

                  {/* Department */}
                  <td className="p-4 text-xs font-medium text-slate-700">{acc.department}</td>

                  {/* Status */}
                  <td className="p-4">
                    {acc.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Đang Hoạt Động
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                        <XCircle className="w-3 h-3 text-red-500" />
                        Tạm Khóa
                      </span>
                    )}
                  </td>

                  {/* Permissions count */}
                  <td className="p-4">
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {acc.permissions.length} đặc quyền
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleResetPassword(acc)}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-700 text-[11px] font-bold transition-all"
                      title="Đặt lại mật khẩu tạm thời"
                    >
                      <RefreshCw className="w-3 h-3 inline mr-1" />
                      Reset Pass
                    </button>

                    {acc.role !== 'ADMIN' && (
                      <button
                        onClick={() => handleToggleStatus(acc.id)}
                        className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                          acc.status === 'ACTIVE'
                            ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {acc.status === 'ACTIVE' ? (
                          <>
                            <Lock className="w-3 h-3 inline mr-1 text-red-600" />
                            Khóa
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3 h-3 inline mr-1 text-emerald-600" />
                            Mở
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

      {/* ==================== VIEW 2: BẢNG MA TRẬN PHÂN QUYỀN RBAC (CHUẨN LUẬN VĂN STU) ==================== */}
      {activeSubTab === 'RBAC_MATRIX' && (
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="font-black text-slate-900 text-base">Ma Trận Phân Quyền Vai Trò (RBAC Matrix)</h3>
            <p className="text-xs text-slate-500">
              Mô hình kiểm soát truy cập phân tầng theo chức năng nghiệp vụ quy định trong Luận văn tốt nghiệp STU 2026.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-900 text-white font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Chức Năng Hệ Thống</th>
                  <th className="p-3 text-center">Quản Trị Viên (Admin)</th>
                  <th className="p-3 text-center">Nhân Sự Lễ Tân</th>
                  <th className="p-3 text-center">Huấn Luyện Viên (PT)</th>
                  <th className="p-3 text-center">Hội Viên (Member)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Quản lý & Cấp tài khoản (RBAC)</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Toàn quyền</td>
                  <td className="p-3 text-center text-slate-300">✕ Không quyền</td>
                  <td className="p-3 text-center text-slate-300">✕ Không quyền</td>
                  <td className="p-3 text-center text-slate-300">✕ Không quyền</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Xem Báo cáo Doanh thu & BI Analytics</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Xem đầy đủ</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Quét Check-in QR Cửa Xoay Realtime</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Xem & Quét</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Chuyên trách</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Quản lý Hợp đồng & Bảo lưu bù ngày</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Toàn quyền</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Lập & Đóng băng</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Lịch dạy 1-1, Trừ buổi & Hoa hồng</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Giám sát</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Chuyên trách</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Thẻ điện tử QR 60s & Đặt lịch PT</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Demo</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Sử dụng cá nhân</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Trợ lý Dinh dưỡng & AI Food Scanner</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Toàn quyền</td>
                  <td className="p-3 text-center text-slate-300">✕ Bị ẩn</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Tư vấn học viên</td>
                  <td className="p-3 text-center text-emerald-600 font-black">✓ Chụp & Theo dõi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== VIEW 3: AUDIT LOGS TRUY VẾT ==================== */}
      {activeSubTab === 'AUDIT_LOGS' && (
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-red-50 text-city-red">
                  <History className="w-4 h-4" />
                </span>
                <h3 className="font-black text-slate-900 text-base">Nhật Ký Kiểm Toán & Truy Vết Hệ Thống (Audit Logs)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Ghi vết chi tiết mọi tác vụ nghiệp vụ, thay đổi trạng thái và sự kiện bảo mật theo chuẩn Enterprise ERP.
              </p>
            </div>

            <span className="text-[11px] font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Ghi vết thời gian thực (Realtime Logging)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-900 text-white font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Thời Gian</th>
                  <th className="p-3.5">Người Thực Hiện</th>
                  <th className="p-3.5">Vai Trò</th>
                  <th className="p-3.5">Hành Động / Nghiệp Vụ</th>
                  <th className="p-3.5">Đối Tượng Tác Động</th>
                  <th className="p-3.5">IP & Cổng Thiết Bị</th>
                  <th className="p-3.5 text-center">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="p-3.5 font-black text-slate-900 whitespace-nowrap">
                      {log.actorName}
                    </td>
                    <td className="p-3.5">
                      {getRoleBadge(log.actorRole)}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">
                      {log.action}
                    </td>
                    <td className="p-3.5 font-medium text-slate-600">
                      {log.target}
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-500">
                      {log.ipAddress}
                    </td>
                    <td className="p-3.5 text-center">
                      {log.severity === 'SUCCESS' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Thành Công
                        </span>
                      )}
                      {log.severity === 'INFO' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200">
                          Thông Tin
                        </span>
                      )}
                      {log.severity === 'WARNING' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">
                          Cảnh Báo
                        </span>
                      )}
                      {log.severity === 'DANGER' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-100 text-red-800 border border-red-200">
                          Nguy Hiểm
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== MODAL CẤP TÀI KHOẢN MỚI ==================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-city-red flex items-center justify-center text-white">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-black text-sm">Cấp Tài Khoản Hệ Thống Mới</h4>
                  <p className="text-[10px] text-slate-400">Chỉ dành riêng cho quyền Admin</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateAccountSubmit} className="p-6 space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Chọn Vai Trò Cần Cấp Quyền:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'TRAINER', label: 'HLV (PT)', icon: Dumbbell },
                    { id: 'MEMBER', label: 'Hội Viên', icon: User },
                    { id: 'RECEPTION', label: 'Lễ Tân', icon: Shield },
                  ].map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => {
                        setNewAccountForm({
                          ...newAccountForm,
                          role: r.id as UserRole,
                          department:
                            r.id === 'TRAINER'
                              ? 'Bộ Phận Huấn Luyện Viên PT'
                              : r.id === 'MEMBER'
                              ? 'Hội Viên Thẻ VIP'
                              : 'Quầy Lễ Tân & Check-in',
                        });
                      }}
                      className={`py-2.5 rounded-xl font-bold border transition-all flex flex-col items-center justify-center gap-1 ${
                        newAccountForm.role === r.id
                          ? 'bg-city-red text-white border-city-red shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <r.icon className="w-4 h-4" />
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Họ Và Tên Người Dùng:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Lê Văn Nam"
                  value={newAccountForm.name}
                  onChange={(e) => setNewAccountForm({ ...newAccountForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Email Đăng Nhập:</label>
                  <input
                    type="email"
                    required
                    placeholder="nam.le@citygym.vn"
                    value={newAccountForm.email}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Số Điện Thoại:</label>
                  <input
                    type="tel"
                    required
                    placeholder="0912345678"
                    value={newAccountForm.phone}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Mật Khẩu Khởi Tạo:</label>
                  <input
                    type="text"
                    required
                    value={newAccountForm.password}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, password: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-mono font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Phòng Ban / Gói Tập:</label>
                  <input
                    type="text"
                    required
                    value={newAccountForm.department}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, department: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-semibold text-slate-900 focus:outline-none focus:border-city-red"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-city-red to-city-accent hover:from-city-darkred hover:to-city-red text-white font-black text-xs shadow-lg shadow-city-red/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Xác Nhận Cấp Tài Khoản & Kích Hoạt Quyền</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

