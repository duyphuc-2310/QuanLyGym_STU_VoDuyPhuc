import React, { useState, useEffect } from 'react';
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
import { AccountManagement } from './pages/admin/AccountManagement';
import { SmartNutritionPlanner } from './components/nutrition/SmartNutritionPlanner';

export default function App() {
  // Current Authenticated User (null = Public Guest on Landing Page)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Active Management Tab when inside the internal dashboard
  const [currentTab, setCurrentTab] = useState<PortalType>('checkin');

  // Support separate URL routing via hash (#admin, #login, #portal)
  useEffect(() => {
    const checkHashRoute = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#login' || hash === '#portal') {
        setIsLoginModalOpen(true);
      }
    };
    checkHashRoute();
    window.addEventListener('hashchange', checkHashRoute);
    return () => window.removeEventListener('hashchange', checkHashRoute);
  }, []);

  // Shared State for Entire Gym Operations (Theo chuẩn Luận văn STU)
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
      name: 'Nguyễn Thị Bích',
      type: 'HỘI VIÊN',
      status: 'DENIED',
      note: 'Từ chối: Gói tập đang đóng băng bảo lưu',
      time: '09:40:11',
      contractCode: 'HD-2026-0002',
    },
    {
      id: 4,
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
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.hash = '';
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
    // Tự động lên lịch hẹn buổi đầu tiên cho HLV phụ trách nếu hợp đồng có buổi PT
    if (newM.remainingSessions > 0 && newM.assignedPtName) {
      const newBooking: PtBooking = {
        id: Date.now() + 10,
        memberName: newM.memberName,
        memberPhone: newM.memberPhone,
        trainerName: newM.assignedPtName,
        date: 'Hôm nay',
        time: '19:15 - 20:15 (Buổi 1)',
        status: 'SCHEDULED',
        goal: `Kèm 1-1 (${newM.packageName})`,
      };
      setPtBookings((prev) => [newBooking, ...prev]);
    }
  };

  const handleUpdateMembership = (updated: Membership) => {
    setMemberships((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const handleBookPtSession = (newBooking: PtBooking) => {
    setPtBookings((prev) => [newBooking, ...prev]);
  };

  const handleCompleteBooking = (bookingId: number) => {
    const booking = ptBookings.find((b) => b.id === bookingId);
    setPtBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'COMPLETED' } : b))
    );
    if (booking) {
      setMemberships((prev) =>
        prev.map((m) =>
          m.memberName === booking.memberName
            ? { ...m, remainingSessions: Math.max(0, m.remainingSessions - 1) }
            : m
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* 1. Thanh Role Switcher: CHỈ HIỂN THỊ KHI ĐÃ ĐĂNG NHẬP VÀO HỆ THỐNG NỘI BỘ */}
      {currentUser !== null && (
        <RoleSwitcher
          currentUser={currentUser}
          onSelectRole={handleSelectRole}
          onGoLanding={handleLogout}
        />
      )}

      {/* 2. Main Viewport */}
      {currentUser === null ? (
        /* ==================== 100% PURE PUBLIC LANDING PAGE ==================== */
        <LandingPage
          onRegisterTrial={handleRegisterTrial}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />
      ) : (
        /* ==================== INTERNAL MANAGEMENT DASHBOARD (PORTALS) ==================== */
        <DashboardLayout
          currentUser={currentUser}
          currentTab={currentTab}
          onChangeTab={setCurrentTab}
          onLogout={handleLogout}
          onGoHome={handleLogout}
        >
          {/* Phân hệ 1: Lễ tân Check-in Realtime */}
          {currentTab === 'checkin' && (
            <CheckinScanner
              memberships={memberships}
              leads={leads}
              checkinLogs={checkinLogs}
              onCheckinSuccess={handleCheckinSuccess}
              onUpdateLeadStatus={handleUpdateLeadStatus}
            />
          )}

          {/* Phân hệ 2: Quản lý Hợp đồng & Bảo lưu bù ngày */}
          {currentTab === 'memberships' && (
            <ContractsManager
              memberships={memberships}
              onAddMembership={handleAddMembership}
              onUpdateMembership={handleUpdateMembership}
            />
          )}

          {/* Phân hệ 3: CRM Phễu Lead khách tập thử */}
          {currentTab === 'leads' && (
            <LeadCRM
              leads={leads}
              onConvertLead={handleConvertLead}
              onAddMembership={handleAddMembership}
            />
          )}

          {/* Phân hệ 4: Cổng Huấn Luyện Viên PT */}
          {currentTab === 'pt_portal' && (
            <TrainerPortal
              memberships={memberships}
              ptBookings={ptBookings}
              onCompleteBooking={handleCompleteBooking}
              onSaveInBodyMetric={(m) => console.log('InBody:', m)}
              onAddBooking={handleBookPtSession}
            />
          )}

          {/* Phân hệ 5: Cổng Hội Viên (QR động 60s) */}
          {currentTab === 'member_portal' && (
            <MemberPortal
              member={memberships[0]}
              onBookPtSession={handleBookPtSession}
              ptBookings={ptBookings}
            />
          )}

          {/* Phân hệ 7: Trợ lý Dinh Dưỡng & AI Food Scanner */}
          {currentTab === 'nutrition' && (
            <div className="max-w-6xl mx-auto px-4 py-8">
              <SmartNutritionPlanner
                memberWeight={68.2}
                memberHeight={172}
                memberBmr={1675}
              />
            </div>
          )}

          {/* Phân hệ 6: Quản Trị Cấp Cao BI Dashboard */}
          {currentTab === 'analytics' && <AnalyticsDashboard />}

          {/* Phân hệ Quản Trị RBAC: Cấp Tài Khoản & Phân Quyền (Chỉ Admin) */}
          {currentTab === 'users' && <AccountManagement />}
        </DashboardLayout>
      )}

      {/* 3. Modal Đăng nhập an toàn */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          if (window.location.hash) {
            history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
