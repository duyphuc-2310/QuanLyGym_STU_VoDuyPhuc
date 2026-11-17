import React, { useState } from 'react';
import { 
  User, UserRole, PortalType, Membership, Lead, 
  CheckInLog, PtBooking, InBodyMetric 
} from './types';
import { RoleSwitcher } from './components/layout/RoleSwitcher';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginModal } from './components/modals/LoginModal';
import { LandingPage } from './pages/public/LandingPage';
import { CheckinScanner } from './pages/reception/CheckinScanner';
import { ContractsManager } from './pages/reception/ContractsManager';
import { LeadCRM } from './pages/sales/LeadCRM';
import { MemberPortal } from './pages/member/MemberPortal';
import { TrainerPortal } from './pages/trainer/TrainerPortal';
import { AnalyticsDashboard } from './pages/admin/AnalyticsDashboard';

export default function App() {
  // Current Authenticated User (null = Public Guest on Landing Page)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Active Management Tab when inside the internal dashboard
  const [currentTab, setCurrentTab] = useState<PortalType>('checkin');

  // Shared State for Entire Gym Operations
  const [memberships, setMemberships] = useState<Membership[]>([
    {
      id: 1,
      contractCode: 'HD-2026-0001',
      memberName: 'Võ Duy Phúc',
      memberPhone: '0901234567',
      packageName: 'CityVIP 12 Tháng',
      packagePrice: 5800000,
      startDate: '2026-01-10',
      endDate: '2027-01-10',
      remainingSessions: 18,
      totalSessions: 20,
      status: 'ACTIVE',
      maxFreezeDays: 60,
      frozenDaysUsed: 0,
      assignedPtName: 'Nguyễn Minh Tuấn (PT)',
    },
    {
      id: 2,
      contractCode: 'HD-2026-0002',
      memberName: 'Nguyễn Thị Bích',
      memberPhone: '0912333444',
      packageName: 'CityPro 6 Tháng',
      packagePrice: 3200000,
      startDate: '2026-03-01',
      endDate: '2026-09-01',
      remainingSessions: 2,
      totalSessions: 5,
      status: 'FROZEN',
      maxFreezeDays: 30,
      frozenDaysUsed: 15,
      assignedPtName: 'Trần Hoàng Yến (PT)',
    },
    {
      id: 3,
      contractCode: 'HD-2025-0899',
      memberName: 'Lê Hoàng Nam',
      memberPhone: '0988777666',
      packageName: 'CityBasic 1 Tháng',
      packagePrice: 650000,
      startDate: '2026-01-01',
      endDate: '2026-02-01',
      remainingSessions: 0,
      totalSessions: 0,
      status: 'EXPIRED',
      maxFreezeDays: 0,
      frozenDaysUsed: 0,
    },
  ]);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      ticketCode: 'TRIAL-882910',
      fullName: 'Trần Văn Nam',
      phone: '0912345678',
      service: 'Tập cùng PT',
      status: 'NEW',
      date: '2026-11-14',
    },
    {
      id: 2,
      ticketCode: 'TRIAL-554219',
      fullName: 'Lê Thùy Dung',
      phone: '0909112233',
      service: 'Lớp Yoga Vinyasa',
      status: 'TRIAL_CHECKED_IN',
      date: '2026-11-13',
    },
  ]);

  const [checkinLogs, setCheckinLogs] = useState<CheckInLog[]>([
    {
      id: 1,
      name: 'Võ Duy Phúc',
      type: 'HỘI VIÊN',
      status: 'SUCCESS',
      note: 'Gói CityVIP 12 Tháng (Còn 286 ngày)',
      time: '10:45:12',
      contractCode: 'HD-2026-0001',
    },
    {
      id: 2,
      name: 'Lê Thùy Dung',
      type: 'TẬP THỬ',
      status: 'SUCCESS',
      note: 'Vé tập thử QR (TRIAL-554219)',
      time: '10:30:05',
    },
    {
      id: 3,
      name: 'Lê Hoàng Nam',
      type: 'HỘI VIÊN',
      status: 'DENIED',
      note: 'Từ chối: Gói tập đã hết hạn sử dụng',
      time: '09:15:20',
      contractCode: 'HD-2025-0899',
    },
  ]);

  const [ptBookings, setPtBookings] = useState<PtBooking[]>([
    {
      id: 1,
      memberName: 'Võ Duy Phúc',
      memberPhone: '0901234567',
      trainerName: 'Nguyễn Minh Tuấn (PT)',
      date: 'Hôm nay',
      time: '18:00 - 19:00',
      status: 'SCHEDULED',
      goal: 'Hypertrophy Tăng cơ vai & ngực',
    },
    {
      id: 2,
      memberName: 'Nguyễn Thị Bích',
      memberPhone: '0912333444',
      trainerName: 'Trần Hoàng Yến (PT)',
      date: 'Hôm nay',
      time: '19:15 - 20:15',
      status: 'COMPLETED',
      goal: 'Siết mỡ Body Tone',
    },
  ]);

  // Handle Login Role Switch
  const handleSelectRole = (role: UserRole) => {
    let name = 'Quản Trị Viên';
    let email = 'admin@citygym.vn';
    let dept = 'Ban Giám Đốc';
    let defaultTab: PortalType = 'analytics';

    if (role === 'RECEPTION') {
      name = 'Nguyễn Thị Thu (Lễ Tân)';
      email = 'letan@citygym.vn';
      dept = 'Quầy Tiếp Đón & Check-in';
      defaultTab = 'checkin';
    } else if (role === 'TRAINER') {
      name = 'Nguyễn Minh Tuấn (HLV PT)';
      email = 'pt.tuan@citygym.vn';
      dept = 'Bộ Phận Huấn Luyện Viên';
      defaultTab = 'pt_portal';
    } else if (role === 'MEMBER') {
      name = 'Võ Duy Phúc (Hội Viên VIP)';
      email = 'phuc.vo@stu.edu.vn';
      dept = 'Cổng Dịch Vụ Hội Viên';
      defaultTab = 'member_portal';
    } else if (role === 'ADMIN') {
      name = 'ThS. Bùi Nhật Bằng & Võ Duy Phúc';
      email = 'admin@citygym.vn';
      dept = 'Quản Trị Cấp Cao BI';
      defaultTab = 'analytics';
    }

    setCurrentUser({
      id: Date.now(),
      name,
      email,
      phone: '0901234567',
      role,
      department: dept,
    });
    setCurrentTab(defaultTab);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'RECEPTION') setCurrentTab('checkin');
    else if (user.role === 'TRAINER') setCurrentTab('pt_portal');
    else if (user.role === 'MEMBER') setCurrentTab('member_portal');
    else setCurrentTab('analytics');
  };

  // Cross-portal Handlers
  const handleRegisterTrial = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleCheckinSuccess = (log: CheckInLog) => {
    setCheckinLogs((prev) => [log, ...prev]);
  };

  const handleUpdateLeadStatus = (ticketCode: string, status: any) => {
    setLeads((prev) =>
      prev.map((l) => (l.ticketCode.toUpperCase() === ticketCode.toUpperCase() ? { ...l, status } : l))
    );
  };

  const handleConvertLead = (leadId: number) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: 'CONVERTED' } : l)));
  };

  const handleAddMembership = (newM: Membership) => {
    setMemberships((prev) => [newM, ...prev]);
  };

  const handleUpdateMembership = (updated: Membership) => {
    setMemberships((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const handleBookPtSession = (newBooking: PtBooking) => {
    setPtBookings((prev) => [newBooking, ...prev]);
  };

  const handleCompleteBooking = (bookingId: number) => {
    setPtBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'COMPLETED' } : b))
    );
    setMemberships((prev) =>
      prev.map((m) =>
        m.id === 1 ? { ...m, remainingSessions: Math.max(0, m.remainingSessions - 1) } : m
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* 1. Quick Role & Portal Switcher Bar */}
      <RoleSwitcher
        currentUser={currentUser}
        onSelectRole={handleSelectRole}
        onGoLanding={() => setCurrentUser(null)}
      />

      {/* 2. Main Viewport */}
      {currentUser === null ? (
        /* ==================== PUBLIC LANDING PAGE ==================== */
        <LandingPage
          onRegisterTrial={handleRegisterTrial}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />
      ) : (
        /* ==================== INTERNAL MANAGEMENT DASHBOARD (RBAC) ==================== */
        <DashboardLayout
          currentUser={currentUser}
          currentTab={currentTab}
          onChangeTab={setCurrentTab}
          onLogout={() => setCurrentUser(null)}
          onGoHome={() => setCurrentUser(null)}
        >
          {/* Phân hệ Lễ tân Check-in */}
          {currentTab === 'checkin' && (
            <CheckinScanner
              memberships={memberships}
              leads={leads}
              checkinLogs={checkinLogs}
              onCheckinSuccess={handleCheckinSuccess}
              onUpdateLeadStatus={handleUpdateLeadStatus}
            />
          )}

          {/* Phân hệ Lễ tân Quản lý Hợp đồng & Bảo lưu */}
          {currentTab === 'memberships' && (
            <ContractsManager
              memberships={memberships}
              onAddMembership={handleAddMembership}
              onUpdateMembership={handleUpdateMembership}
            />
          )}

          {/* Phân hệ Lễ tân CRM Khách tập thử */}
          {currentTab === 'leads' && (
            <LeadCRM
              leads={leads}
              onConvertLead={handleConvertLead}
              onAddMembership={handleAddMembership}
            />
          )}

          {/* Phân hệ Cổng Huấn Luyện Viên PT */}
          {currentTab === 'pt_portal' && (
            <TrainerPortal
              ptBookings={ptBookings}
              onCompleteBooking={handleCompleteBooking}
              onSaveInBodyMetric={(m) => console.log('InBody:', m)}
            />
          )}

          {/* Phân hệ Cổng Hội Viên (QR động 60s) */}
          {currentTab === 'member_portal' && (
            <MemberPortal
              member={memberships[0]}
              onBookPtSession={handleBookPtSession}
              ptBookings={ptBookings}
            />
          )}

          {/* Phân hệ Quản Trị Cấp Cao BI Dashboard */}
          {currentTab === 'analytics' && <AnalyticsDashboard />}
        </DashboardLayout>
      )}

      {/* 3. Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
