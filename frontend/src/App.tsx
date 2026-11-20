import React, { useState, useEffect } from 'react';
import { 
  User, UserRole, PortalType, Membership, Lead, 
  CheckInLog, PtBooking, InBodyMetric, SystemAccount, ZaloZnsMessage 
} from './types';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LandingPage } from './pages/public/LandingPage';
import { CheckinScanner } from './pages/reception/CheckinScanner';
import { ContractsManager } from './pages/reception/ContractsManager';
import { LeadCRM } from './pages/sales/LeadCRM';
import { MemberPortal } from './pages/member/MemberPortal';
import { TrainerPortal } from './pages/trainer/TrainerPortal';
import { AnalyticsDashboard } from './pages/admin/AnalyticsDashboard';
import { AccountManagement, INITIAL_ACCOUNTS } from './pages/admin/AccountManagement';
import { SmartNutritionPlanner } from './components/nutrition/SmartNutritionPlanner';
import { CityAICoachModal } from './components/ai/CityAICoachModal';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { ToastNotification } from './components/common/ToastNotification';
import { ZaloNotificationModal } from './components/modals/ZaloNotificationModal';

// Dữ liệu ban đầu mặc định cho hệ thống (Khi chưa có cache trong localStorage)
const INITIAL_MEMBERSHIPS: Membership[] = [
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
];

const INITIAL_LEADS: Lead[] = [
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
];

const INITIAL_CHECKIN_LOGS: CheckInLog[] = [
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
];

const INITIAL_PT_BOOKINGS: PtBooking[] = [
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
];

export default function App() {
  // 1. Quản lý Router Hash điều hướng độc lập chuẩn doanh nghiệp
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.hash.toLowerCase() || '#/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.toLowerCase() || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 2. Current Authenticated User (null = Khách vãng lai trên Landing Page)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('citygym_current_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  // Tài khoản khách vãng lai vừa đăng ký từ Landing Page (Lưu localStorage)
  const [pendingMemberUser, setPendingMemberUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('citygym_pending_member');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  // Hệ Thống Quản Lý Tài Khoản Toàn Cục RBAC (Lưu localStorage)
  const [systemAccounts, setSystemAccounts] = useState<SystemAccount[]>(() => {
    try {
      const saved = localStorage.getItem('citygym_system_accounts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ACCOUNTS;
  });

  // Active Management Tab
  const [currentTab, setCurrentTab] = useState<PortalType>('analytics');

  // Toast Notification System
  const [toast, setToast] = useState<{
    id: number;
    message: string;
    title?: string;
    type?: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  // Zalo ZNS Preview khi Admin cấp tài khoản
  const [approvalZaloMessage, setApprovalZaloMessage] = useState<ZaloZnsMessage | null>(null);
  const [showApprovalZaloModal, setShowApprovalZaloModal] = useState<boolean>(false);

  const showToast = (
    message: string,
    title?: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'success'
  ) => {
    setToast({ id: Date.now(), message, title, type });
  };

  // Shared Data States (Lưu localStorage)
  const [memberships, setMemberships] = useState<Membership[]>(() => {
    try {
      const saved = localStorage.getItem('citygym_memberships');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_MEMBERSHIPS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem('citygym_leads');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_LEADS;
  });

  const [checkinLogs, setCheckinLogs] = useState<CheckInLog[]>(INITIAL_CHECKIN_LOGS);

  const [ptBookings, setPtBookings] = useState<PtBooking[]>(() => {
    try {
      const saved = localStorage.getItem('citygym_pt_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_PT_BOOKINGS;
  });

  // TỰ ĐỘNG LƯU VÀO LOCALSTORAGE
  useEffect(() => {
    try {
      localStorage.setItem('citygym_system_accounts', JSON.stringify(systemAccounts));
    } catch (e) {}
  }, [systemAccounts]);

  useEffect(() => {
    try {
      localStorage.setItem('citygym_memberships', JSON.stringify(memberships));
    } catch (e) {}
  }, [memberships]);

  useEffect(() => {
    try {
      localStorage.setItem('citygym_leads', JSON.stringify(leads));
    } catch (e) {}
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem('citygym_pt_bookings', JSON.stringify(ptBookings));
    } catch (e) {}
  }, [ptBookings]);

  useEffect(() => {
    try {
      if (pendingMemberUser) {
        localStorage.setItem('citygym_pending_member', JSON.stringify(pendingMemberUser));
      } else {
        localStorage.removeItem('citygym_pending_member');
      }
    } catch (e) {}
  }, [pendingMemberUser]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('citygym_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('citygym_current_user');
      }
    } catch (e) {}
  }, [currentUser]);

  // Kiểm tra tài khoản khách đăng ký web đã được Admin kích hoạt chưa
  const isPendingMemberActive = pendingMemberUser
    ? systemAccounts.some(
        (a) =>
          (a.phone === pendingMemberUser.phone ||
            (pendingMemberUser.username && a.username === pendingMemberUser.username)) &&
          a.status === 'ACTIVE'
      )
    : false;

  // Lắng nghe sự kiện Storage để đồng bộ dữ liệu Realtime tức thì giữa các Tab trình duyệt
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'citygym_system_accounts' && e.newValue) {
        try {
          const updatedAccounts: SystemAccount[] = JSON.parse(e.newValue);
          setSystemAccounts(updatedAccounts);
          if (pendingMemberUser) {
            const isApproved = updatedAccounts.some(
              (a) =>
                (a.phone === pendingMemberUser.phone ||
                  (pendingMemberUser.username && a.username === pendingMemberUser.username)) &&
                a.status === 'ACTIVE'
            );
            if (isApproved && !isPendingMemberActive) {
              showToast(
                'Tài khoản của bạn đã được Admin kích hoạt thành công! Bạn có thể bấm "Vào Cổng Hội Viên" ngay.',
                'Kích Hoạt Tài Khoản Thành Công',
                'success'
              );
            }
          }
        } catch (err) {}
      }
      if (e.key === 'citygym_memberships' && e.newValue) {
        try {
          setMemberships(JSON.parse(e.newValue));
        } catch (err) {}
      }
      if (e.key === 'citygym_leads' && e.newValue) {
        try {
          setLeads(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pendingMemberUser, isPendingMemberActive]);

  // Xử lý Đăng Nhập Thành Công: Tự động điều hướng đến URL riêng của từng vai trò
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('citygym_current_user', JSON.stringify(user));
    } catch (e) {}

    showToast(`Chào mừng ${user.name} đã quay trở lại hệ thống!`, 'Đăng Nhập Thành Công', 'success');

    if (user.role === 'ADMIN') {
      setCurrentTab('analytics');
      window.location.hash = '#admin-dashboard';
    } else if (user.role === 'RECEPTION') {
      setCurrentTab('checkin');
      window.location.hash = '#reception';
    } else if (user.role === 'TRAINER') {
      setCurrentTab('pt_portal');
      window.location.hash = '#trainer';
    } else if (user.role === 'MEMBER') {
      setCurrentTab('member_portal');
      window.location.hash = '#member';
    }
  };

  // Xử lý Đăng Xuất: Xóa phiên và trở về Landing Page
  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('citygym_current_user');
    } catch (e) {}
    showToast('Bạn đã đăng xuất khỏi hệ thống an toàn.', 'Đăng Xuất', 'info');
    window.location.hash = '#/';
  };

  // Đồng bộ tab mặc định phù hợp khi route thay đổi
  useEffect(() => {
    const hash = currentRoute;
    if (hash.startsWith('#member')) {
      if (currentTab !== 'member_portal' && currentTab !== 'nutrition') {
        setCurrentTab('member_portal');
      }
    } else if (hash.startsWith('#reception')) {
      if (currentTab !== 'checkin' && currentTab !== 'memberships' && currentTab !== 'leads') {
        setCurrentTab('checkin');
      }
    } else if (hash.startsWith('#trainer')) {
      if (currentTab !== 'pt_portal' && currentTab !== 'nutrition') {
        setCurrentTab('pt_portal');
      }
    } else if (hash.startsWith('#admin-dashboard')) {
      if (currentTab === 'member_portal' || currentTab === 'pt_portal') {
        setCurrentTab('analytics');
      }
    }
  }, [currentRoute, currentTab]);

  // Xử lý khi khách vãng lai Đăng Ký / Tạo Tài Khoản thành công từ Landing Page
  const handleMemberAuthSuccess = (newUser: User, _rawPassword?: string) => {
    setPendingMemberUser(newUser);

    // 1. Thêm vào danh sách tài khoản hệ thống (LOCKED - Chờ Admin kích hoạt sau khi mua gói)
    const newAccount: SystemAccount = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: 'MEMBER',
      status: 'LOCKED',
      createdAt: new Date().toISOString().split('T')[0],
      department: `Đăng ký từ Web (${newUser.age ? newUser.age + ' tuổi' : 'Hội viên mới'})`,
      permissions: [
        'Mã QR thẻ tập động 60s',
        'Đặt lịch tập 1-1 với PT',
        'Xem hồ sơ InBody cá nhân',
        'AI Food Scanner & Thực đơn',
      ],
      age: newUser.age,
      username: newUser.username,
    };

    setSystemAccounts((prev) => {
      const exists = prev.some((a) => a.phone === newUser.phone || (newUser.username && a.username === newUser.username));
      if (exists) return prev;
      return [newAccount, ...prev];
    });

    // 2. Thêm vào Lead CRM để bộ phận tư vấn & Admin nhìn thấy khách hàng vừa đăng ký
    setLeads((prev) => {
      const exists = prev.some((l) => l.phone === newUser.phone);
      if (exists) return prev;
      const newLead: Lead = {
        id: Date.now(),
        ticketCode: 'WEB-' + Math.floor(100000 + Math.random() * 900000),
        fullName: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        service: 'Đăng ký tài khoản từ Landing Page (Chưa thanh toán)',
        notes: `Tài khoản: @${newUser.username || 'member'} - Tuổi: ${newUser.age || 22}`,
        status: 'NEW',
        date: new Date().toISOString().split('T')[0],
        username: newUser.username,
        age: newUser.age,
      };
      return [newLead, ...prev];
    });

    showToast(
      `Đã tạo tài khoản cho ${newUser.name}. Vui lòng chọn gói tập để hoàn tất!`,
      'Tạo Tài Khoản Thành Công',
      'success'
    );
  };

  // Xử lý khi khách hàng hoàn tất thanh toán gói tập qua VietQR trên Landing Page
  const handlePackagePurchased = (data: {
    buyerName: string;
    buyerPhone: string;
    buyerUsername: string;
    buyerAge: number;
    package: {
      name: string;
      price: number;
      priceStr: string;
      duration: string;
      ptSessions: number;
    };
  }) => {
    const ticketCode = 'PAY-' + Math.floor(100000 + Math.random() * 900000);

    // 1. Đồng bộ vào CRM Lead ở trạng thái PAID_PENDING_APPROVAL (Chờ Admin duyệt)
    const newLead: Lead = {
      id: Date.now(),
      ticketCode,
      fullName: data.buyerName,
      phone: data.buyerPhone,
      email: `${data.buyerUsername.toLowerCase()}@citygym.vn`,
      service: `${data.package.name} (${data.package.priceStr})`,
      notes: `Đã thanh toán qua VietQR NAPAS247. Gói: ${data.package.name} (Tặng ${data.package.ptSessions} buổi PT). Username: @${data.buyerUsername}`,
      status: 'PAID_PENDING_APPROVAL',
      date: new Date().toISOString().split('T')[0],
      packagePrice: data.package.price,
      packageName: data.package.name,
      username: data.buyerUsername,
      age: data.buyerAge,
      ptSessions: data.package.ptSessions,
      duration: data.package.duration,
    };

    setLeads((prev) => {
      const existingIdx = prev.findIndex((l) => l.phone === data.buyerPhone);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = { ...copy[existingIdx], ...newLead };
        return copy;
      }
      return [newLead, ...prev];
    });

    // 2. Cập nhật hoặc thêm tài khoản vào danh sách RBAC (LOCKED chờ duyệt)
    setSystemAccounts((prev) => {
      const exists = prev.some((a) => a.phone === data.buyerPhone || a.username === data.buyerUsername);
      if (exists) {
        return prev.map((a) =>
          a.phone === data.buyerPhone
            ? { ...a, department: `Chờ duyệt kích hoạt (${data.package.name})` }
            : a
        );
      }
      const newAcc: SystemAccount = {
        id: Date.now(),
        name: data.buyerName,
        email: `${data.buyerUsername.toLowerCase()}@citygym.vn`,
        phone: data.buyerPhone,
        role: 'MEMBER',
        status: 'LOCKED',
        createdAt: new Date().toISOString().split('T')[0],
        department: `Chờ duyệt kích hoạt (${data.package.name})`,
        permissions: [
          'Mã QR thẻ tập động 60s',
          'Đặt lịch tập 1-1 với PT',
          'Xem hồ sơ InBody cá nhân',
          'AI Food Scanner & Thực đơn',
        ],
        age: data.buyerAge,
        username: data.buyerUsername,
      };
      return [newAcc, ...prev];
    });

    showToast(
      `Đã nhận giao dịch ${data.package.name}. Thông tin đã gửi đến CRM Admin để duyệt!`,
      'Thanh Toán VietQR Thành Công',
      'success'
    );
  };

  // Xử lý khi Admin hoặc Lễ tân Duyệt & Kích Hoạt gói đã thanh toán từ CRM
  const handleApprovePaidLead = (lead: Lead) => {
    const durationDays = lead.duration?.includes('365') ? 365 : lead.duration?.includes('180') ? 180 : 30;
    const ptSessions = lead.ptSessions !== undefined ? lead.ptSessions : (lead.packageName?.includes('VIP') ? 20 : lead.packageName?.includes('Pro') ? 5 : 0);
    const assignedPt = ptSessions > 0 ? 'Nguyễn Minh Tuấn (PT)' : undefined;

    // 1. Tạo Hợp đồng hội viên chính thức
    const newM: Membership = {
      id: Date.now(),
      contractCode: 'HD-2026-' + Math.floor(1000 + Math.random() * 9000),
      memberName: lead.fullName,
      memberPhone: lead.phone,
      memberEmail: lead.email || `${lead.username || 'member'}@citygym.vn`,
      packageName: lead.packageName || lead.service || 'CityVIP 12 Tháng',
      packagePrice: lead.packagePrice || 5800000,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + durationDays * 86400000).toISOString().split('T')[0],
      remainingSessions: ptSessions,
      totalSessions: ptSessions,
      status: 'ACTIVE',
      maxFreezeDays: durationDays > 100 ? 60 : 30,
      frozenDaysUsed: 0,
      assignedPtName: assignedPt,
    };
    setMemberships((prev) => [newM, ...prev]);

    // 2. Kích hoạt tài khoản người dùng sang ACTIVE trong RBAC
    setSystemAccounts((prev) => {
      const found = prev.find((a) => a.phone === lead.phone || (lead.username && a.username === lead.username));
      if (found) {
        return prev.map((a) =>
          a.id === found.id
            ? { ...a, status: 'ACTIVE', department: `Hội Viên Chính Thức (${newM.packageName})` }
            : a
        );
      }
      const created: SystemAccount = {
        id: Date.now() + 1,
        name: lead.fullName,
        email: `${(lead.username || 'member').toLowerCase()}@citygym.vn`,
        phone: lead.phone,
        role: 'MEMBER',
        status: 'ACTIVE',
        createdAt: new Date().toISOString().split('T')[0],
        department: `Hội Viên Chính Thức (${newM.packageName})`,
        permissions: [
          'Mã QR thẻ tập động 60s',
          'Đặt lịch tập 1-1 với PT',
          'Xem hồ sơ InBody cá nhân',
          'AI Food Scanner & Thực đơn',
        ],
        age: lead.age,
        username: lead.username,
      };
      return [created, ...prev];
    });

    // 3. Tự động lên lịch 1 buổi PT đầu tiên nếu có buổi PT
    if (ptSessions > 0) {
      const newBooking: PtBooking = {
        id: Date.now() + 2,
        memberName: lead.fullName,
        memberPhone: lead.phone,
        trainerName: 'Nguyễn Minh Tuấn (PT)',
        date: 'Hôm nay',
        time: '19:15 - 20:15 (Buổi 1)',
        status: 'SCHEDULED',
        goal: `Kèm 1-1 (${newM.packageName})`,
      };
      setPtBookings((prev) => [newBooking, ...prev]);
    }

    // 4. Cập nhật Lead thành CONVERTED
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, status: 'CONVERTED' } : l))
    );

    // 5. Cập nhật pendingMemberUser nếu trùng khớp
    if (pendingMemberUser && (pendingMemberUser.phone === lead.phone || pendingMemberUser.username === lead.username)) {
      setPendingMemberUser({
        ...pendingMemberUser,
        department: `Hội Viên Chính Thức (${newM.packageName})`,
      });
    }

    // 6. Tự động sinh thông báo Zalo ZNS kèm TK & MK gửi đến số điện thoại khách hàng
    const zaloMsg: ZaloZnsMessage = {
      id: 'ZNS-ACC-' + Date.now(),
      recipientName: lead.fullName,
      recipientPhone: lead.phone,
      templateType: 'ACCOUNT_CREDENTIALS',
      ticketCode: newM.contractCode,
      contractCode: newM.contractCode,
      branchName: 'CITYGYM STU Campus (180 Cao Lỗ, Q8)',
      sentAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      status: 'DELIVERED',
      username: lead.username || lead.phone,
      password: '123456',
      customData: {
        packageName: newM.packageName,
        price: (lead.packagePrice || 5800000).toLocaleString('vi-VN') + ' đ',
      },
    };
    setApprovalZaloMessage(zaloMsg);
    setShowApprovalZaloModal(true);

    showToast(
      `Đã duyệt hợp đồng ${newM.contractCode} (${newM.packageName}) và gửi tin nhắn Zalo kèm TK/MK đến ${lead.phone}!`,
      '⚡ Đã Cấp Tài Khoản & Gửi Zalo',
      'success'
    );
  };

  // Toggle trạng thái tài khoản trong RBAC (Mở khóa / Kích hoạt hội viên)
  const handleToggleAccountStatus = (accountId: number) => {
    const target = systemAccounts.find((a) => a.id === accountId);
    if (!target) return;
    if (target.role === 'ADMIN') {
      showToast('Không thể khóa tài khoản Quản trị viên cấp cao (Admin)!', 'Thao Tác Bị Từ Chối', 'error');
      return;
    }
    const nextStatus = target.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    
    // 1. Cập nhật systemAccounts
    setSystemAccounts((prev) =>
      prev.map((a) => (a.id === accountId ? { ...a, status: nextStatus } : a))
    );

    // 2. NẾU MỞ KHÓA / KÍCH HOẠT HỘI VIÊN (ACTIVE):
    if (nextStatus === 'ACTIVE') {
      const relatedLead = leads.find((l) => l.phone === target.phone || (target.username && l.username === target.username));
      const pkgName = relatedLead?.packageName || (target.department.includes('VIP') ? 'CityVIP 12 Tháng' : target.department.includes('Pro') ? 'CityPro 6 Tháng' : 'CityBasic 1 Tháng');
      const ptSessions = pkgName.includes('VIP') ? 20 : pkgName.includes('Pro') ? 5 : 0;
      const pkgPrice = pkgName.includes('VIP') ? 5800000 : pkgName.includes('Pro') ? 3200000 : 650000;
      const durationDays = pkgName.includes('12') ? 365 : pkgName.includes('6') ? 180 : 30;

      // Tạo Hợp đồng nếu chưa có
      setMemberships((prev) => {
        const existingIdx = prev.findIndex((m) => m.memberPhone === target.phone || m.memberName === target.name);
        if (existingIdx >= 0) {
          const copy = [...prev];
          copy[existingIdx] = { ...copy[existingIdx], status: 'ACTIVE' };
          return copy;
        }
        const newM: Membership = {
          id: Date.now(),
          contractCode: 'HD-2026-' + Math.floor(1000 + Math.random() * 9000),
          memberName: target.name,
          memberPhone: target.phone,
          memberEmail: target.email,
          packageName: pkgName,
          packagePrice: pkgPrice,
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + durationDays * 86400000).toISOString().split('T')[0],
          remainingSessions: ptSessions,
          totalSessions: ptSessions,
          status: 'ACTIVE',
          maxFreezeDays: durationDays > 100 ? 60 : 30,
          frozenDaysUsed: 0,
          assignedPtName: ptSessions > 0 ? 'Nguyễn Minh Tuấn (PT)' : undefined,
        };
        return [newM, ...prev];
      });

      // Lên lịch PT buổi đầu tiên
      if (ptSessions > 0) {
        setPtBookings((prev) => {
          const exists = prev.some((b) => b.memberPhone === target.phone);
          if (exists) return prev;
          return [
            {
              id: Date.now() + 10,
              memberName: target.name,
              memberPhone: target.phone,
              trainerName: 'Nguyễn Minh Tuấn (PT)',
              date: 'Hôm nay',
              time: '19:15 - 20:15 (Buổi 1)',
              status: 'SCHEDULED',
              goal: `Kèm 1-1 (${pkgName})`,
            },
            ...prev,
          ];
        });
      }

      // Cập nhật Lead thành CONVERTED
      setLeads((prev) =>
        prev.map((l) =>
          l.phone === target.phone || (target.username && l.username === target.username)
            ? { ...l, status: 'CONVERTED' }
            : l
        )
      );

      // Cập nhật pendingMemberUser
      if (pendingMemberUser && (pendingMemberUser.phone === target.phone || pendingMemberUser.username === target.username)) {
        setPendingMemberUser({
          ...pendingMemberUser,
          department: `Hội Viên Chính Thức (${pkgName})`,
        });
      }

      showToast(
        `Đã kích hoạt tài khoản của ${target.name} (${target.phone}) thành công!`,
        'Kích Hoạt Tài Khoản',
        'success'
      );
    } else {
      showToast(
        `Đã tạm khóa tài khoản của ${target.name}!`,
        'Tạm Khóa Tài Khoản',
        'warning'
      );
    }
  };

  const handleAccountCreated = (newAcc: SystemAccount) => {
    setSystemAccounts((prev) => [newAcc, ...prev]);
    showToast(`Đã tạo tài khoản ${newAcc.name} (${newAcc.role}) thành công!`, 'Tạo Tài Khoản', 'success');
  };

  const handleRegisterTrial = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
    showToast(`Đăng ký vé tập thử thành công! Mã vé: ${newLead.ticketCode}`, 'Đăng Ký Tập Thử', 'success');
  };

  const handleCheckinSuccess = (log: CheckInLog) => {
    setCheckinLogs((prev) => [log, ...prev]);
    if (log.status === 'SUCCESS') {
      showToast(`Check-in thành công: ${log.name} (${log.note})`, 'Cửa Khẩu Check-in', 'success');
    } else {
      showToast(`Từ chối check-in: ${log.name} (${log.note})`, 'Cảnh Báo Check-in', 'error');
    }
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
    showToast(`Đã lập hợp đồng mới ${newM.contractCode} cho ${newM.memberName}!`, 'Hợp Đồng Mới', 'success');
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
    showToast(`Đã cập nhật hợp đồng ${updated.contractCode}!`, 'Cập Nhật Hợp Đồng', 'info');
  };

  const handleBookPtSession = (newBooking: PtBooking) => {
    setPtBookings((prev) => [newBooking, ...prev]);
    showToast(
      `Đặt lịch tập 1-1 với ${newBooking.trainerName} lúc ${newBooking.time} (${newBooking.date}) thành công!`,
      'Đặt Lịch Huấn Luyện Viên',
      'success'
    );
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
      showToast(`Đã xác nhận hoàn thành buổi tập và trừ 1 buổi cho ${booking.memberName}!`, 'Trừ Buổi PT', 'info');
    }
  };

  // Dữ liệu hội viên phục vụ hiển thị thẻ Cổng Hội Viên
  const currentMemberData: Membership = memberships.find(
    (m) =>
      (currentUser && m.memberName.toLowerCase() === currentUser.name.toLowerCase()) ||
      (currentUser && m.memberPhone === currentUser.phone)
  ) || {
    id: currentUser ? currentUser.id : Date.now(),
    contractCode: 'HD-2026-MEMBER',
    memberName: currentUser ? currentUser.name : (pendingMemberUser?.name || 'Võ Duy Phúc'),
    memberPhone: currentUser ? currentUser.phone : (pendingMemberUser?.phone || '0901234567'),
    packageName: 'CityVIP 12 Tháng',
    packagePrice: 5800000,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
    remainingSessions: 20,
    totalSessions: 20,
    status: 'ACTIVE',
    maxFreezeDays: 60,
    frozenDaysUsed: 0,
    assignedPtName: 'Nguyễn Minh Tuấn (PT)',
  };

  // ==================== ĐỊNH TUYẾN URL HASH BẢO MẬT DOANH NGHIỆP ====================
  const isAuthAdminRoute = 
    currentRoute === '#admin' || 
    currentRoute === '#quan-tri' || 
    currentRoute === '#login' || 
    currentRoute === '#admin-portal';

  const isMemberRoute = currentRoute.startsWith('#member');
  const isReceptionRoute = currentRoute.startsWith('#reception');
  const isTrainerRoute = currentRoute.startsWith('#trainer');
  const isAdminDashboardRoute = 
    currentRoute.startsWith('#admin-dashboard') || 
    currentRoute.startsWith('#admin-bi') || 
    currentRoute.startsWith('#dashboard');

  return (
    <>
      {/* ==================== 1. CỔNG ĐĂNG NHẬP QUẢN TRỊ BẢO MẬT (#admin) ==================== */}
      {isAuthAdminRoute ? (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
          <AdminLoginPage
            onLoginSuccess={handleLoginSuccess}
            onGoHome={() => { window.location.hash = '#/'; }}
            accounts={systemAccounts}
          />
          <CityAICoachModal
            memberName={currentUser ? currentUser.name : 'Quản Trị Viên'}
            memberWeight={68.2}
            memberBmr={1675}
            memberBmi={23.1}
          />
        </div>
      ) : isMemberRoute ? (
        /* ==================== 2. CỔNG HỘI VIÊN RIÊNG BIỆT (#member) ==================== */
        (() => {
          const authorizedUser = (currentUser && (currentUser.role === 'MEMBER' || currentUser.role === 'ADMIN'))
            ? currentUser
            : (pendingMemberUser && isPendingMemberActive)
            ? {
                ...pendingMemberUser,
                role: 'MEMBER' as UserRole,
              }
            : null;

          if (!authorizedUser) {
            return (
              <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
                <AdminLoginPage
                  onLoginSuccess={handleLoginSuccess}
                  onGoHome={() => { window.location.hash = '#/'; }}
                  accounts={systemAccounts}
                />
              </div>
            );
          }

          return (
            <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
              <DashboardLayout
                currentUser={authorizedUser}
                currentTab={currentTab}
                onChangeTab={setCurrentTab}
                onLogout={handleLogout}
                onGoHome={() => { window.location.hash = '#/'; }}
              >
                {currentTab === 'member_portal' && (
                  <MemberPortal
                    member={currentMemberData}
                    onBookPtSession={handleBookPtSession}
                    ptBookings={ptBookings}
                  />
                )}
                {currentTab === 'nutrition' && (
                  <div className="max-w-6xl mx-auto px-4 py-8">
                    <SmartNutritionPlanner
                      memberWeight={68.2}
                      memberHeight={172}
                      memberBmr={1675}
                    />
                  </div>
                )}
              </DashboardLayout>
              <CityAICoachModal
                memberName={authorizedUser.name}
                memberWeight={68.2}
                memberBmr={1675}
                memberBmi={23.1}
              />
            </div>
          );
        })()
      ) : isReceptionRoute ? (
        /* ==================== 3. CỔNG LỄ TÂN RIÊNG BIỆT (#reception) ==================== */
        (() => {
          const authorizedUser = (currentUser && (currentUser.role === 'RECEPTION' || currentUser.role === 'ADMIN'))
            ? currentUser
            : null;

          if (!authorizedUser) {
            if (currentUser?.role === 'MEMBER') {
              window.location.hash = '#member';
              return null;
            }
            if (currentUser?.role === 'TRAINER') {
              window.location.hash = '#trainer';
              return null;
            }
            return (
              <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
                <AdminLoginPage
                  onLoginSuccess={handleLoginSuccess}
                  onGoHome={() => { window.location.hash = '#/'; }}
                  accounts={systemAccounts}
                />
              </div>
            );
          }

          return (
            <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
              <DashboardLayout
                currentUser={authorizedUser}
                currentTab={currentTab}
                onChangeTab={setCurrentTab}
                onLogout={handleLogout}
                onGoHome={() => { window.location.hash = '#/'; }}
              >
                {currentTab === 'checkin' && (
                  <CheckinScanner
                    memberships={memberships}
                    leads={leads}
                    checkinLogs={checkinLogs}
                    onCheckinSuccess={handleCheckinSuccess}
                    onUpdateLeadStatus={handleUpdateLeadStatus}
                  />
                )}
                {currentTab === 'memberships' && (
                  <ContractsManager
                    memberships={memberships}
                    onAddMembership={handleAddMembership}
                    onUpdateMembership={handleUpdateMembership}
                  />
                )}
                {currentTab === 'leads' && (
                  <LeadCRM
                    leads={leads}
                    onConvertLead={handleConvertLead}
                    onAddMembership={handleAddMembership}
                    onApprovePaidLead={handleApprovePaidLead}
                  />
                )}
              </DashboardLayout>
              <CityAICoachModal
                memberName={authorizedUser.name}
                memberWeight={68.2}
                memberBmr={1675}
                memberBmi={23.1}
              />
            </div>
          );
        })()
      ) : isTrainerRoute ? (
        /* ==================== 4. CỔNG HUẤN LUYỆN VIÊN PT RIÊNG BIỆT (#trainer) ==================== */
        (() => {
          const authorizedUser = (currentUser && (currentUser.role === 'TRAINER' || currentUser.role === 'ADMIN'))
            ? currentUser
            : null;

          if (!authorizedUser) {
            if (currentUser?.role === 'MEMBER') {
              window.location.hash = '#member';
              return null;
            }
            if (currentUser?.role === 'RECEPTION') {
              window.location.hash = '#reception';
              return null;
            }
            return (
              <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
                <AdminLoginPage
                  onLoginSuccess={handleLoginSuccess}
                  onGoHome={() => { window.location.hash = '#/'; }}
                  accounts={systemAccounts}
                />
              </div>
            );
          }

          return (
            <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
              <DashboardLayout
                currentUser={authorizedUser}
                currentTab={currentTab}
                onChangeTab={setCurrentTab}
                onLogout={handleLogout}
                onGoHome={() => { window.location.hash = '#/'; }}
              >
                {currentTab === 'pt_portal' && (
                  <TrainerPortal
                    memberships={memberships}
                    ptBookings={ptBookings}
                    onCompleteBooking={handleCompleteBooking}
                    onSaveInBodyMetric={(m) => console.log('InBody:', m)}
                    onAddBooking={handleBookPtSession}
                  />
                )}
                {currentTab === 'nutrition' && (
                  <div className="max-w-6xl mx-auto px-4 py-8">
                    <SmartNutritionPlanner
                      memberWeight={68.2}
                      memberHeight={172}
                      memberBmr={1675}
                    />
                  </div>
                )}
              </DashboardLayout>
              <CityAICoachModal
                memberName={authorizedUser.name}
                memberWeight={68.2}
                memberBmr={1675}
                memberBmi={23.1}
              />
            </div>
          );
        })()
      ) : isAdminDashboardRoute ? (
        /* ==================== 5. CỔNG QUẢN TRỊ CẤP CAO ADMIN (#admin-dashboard) ==================== */
        (() => {
          const authorizedUser = (currentUser && currentUser.role === 'ADMIN')
            ? currentUser
            : null;

          if (!authorizedUser) {
            if (currentUser?.role === 'MEMBER') {
              window.location.hash = '#member';
              return null;
            }
            if (currentUser?.role === 'RECEPTION') {
              window.location.hash = '#reception';
              return null;
            }
            if (currentUser?.role === 'TRAINER') {
              window.location.hash = '#trainer';
              return null;
            }
            return (
              <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
                <AdminLoginPage
                  onLoginSuccess={handleLoginSuccess}
                  onGoHome={() => { window.location.hash = '#/'; }}
                  accounts={systemAccounts}
                />
              </div>
            );
          }

          return (
            <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
              <DashboardLayout
                currentUser={authorizedUser}
                currentTab={currentTab}
                onChangeTab={setCurrentTab}
                onLogout={handleLogout}
                onGoHome={() => { window.location.hash = '#/'; }}
              >
                {currentTab === 'analytics' && <AnalyticsDashboard />}
                {currentTab === 'users' && (
                  <AccountManagement
                    accounts={systemAccounts}
                    onToggleStatus={handleToggleAccountStatus}
                    onAccountCreated={handleAccountCreated}
                  />
                )}
                {currentTab === 'checkin' && (
                  <CheckinScanner
                    memberships={memberships}
                    leads={leads}
                    checkinLogs={checkinLogs}
                    onCheckinSuccess={handleCheckinSuccess}
                    onUpdateLeadStatus={handleUpdateLeadStatus}
                  />
                )}
                {currentTab === 'memberships' && (
                  <ContractsManager
                    memberships={memberships}
                    onAddMembership={handleAddMembership}
                    onUpdateMembership={handleUpdateMembership}
                  />
                )}
                {currentTab === 'leads' && (
                  <LeadCRM
                    leads={leads}
                    onConvertLead={handleConvertLead}
                    onAddMembership={handleAddMembership}
                    onApprovePaidLead={handleApprovePaidLead}
                  />
                )}
                {currentTab === 'pt_portal' && (
                  <TrainerPortal
                    memberships={memberships}
                    ptBookings={ptBookings}
                    onCompleteBooking={handleCompleteBooking}
                    onSaveInBodyMetric={(m) => console.log('InBody:', m)}
                    onAddBooking={handleBookPtSession}
                  />
                )}
                {currentTab === 'member_portal' && (
                  <MemberPortal
                    member={currentMemberData}
                    onBookPtSession={handleBookPtSession}
                    ptBookings={ptBookings}
                  />
                )}
                {currentTab === 'nutrition' && (
                  <div className="max-w-6xl mx-auto px-4 py-8">
                    <SmartNutritionPlanner
                      memberWeight={68.2}
                      memberHeight={172}
                      memberBmr={1675}
                    />
                  </div>
                )}
              </DashboardLayout>
              <CityAICoachModal
                memberName={authorizedUser.name}
                memberWeight={68.2}
                memberBmr={1675}
                memberBmi={23.1}
              />
            </div>
          );
        })()
      ) : (
        /* ==================== 6. MẶC ĐỊNH: TRANG CHỦ LANDING PAGE DÀNH CHO KHÁCH VÃNG LAI ==================== */
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          <LandingPage
            currentUser={pendingMemberUser}
            isAccountActive={isPendingMemberActive}
            accounts={systemAccounts}
            onRegisterTrial={handleRegisterTrial}
            onOpenLogin={() => { window.location.hash = '#admin'; }}
            onMemberAuthSuccess={handleMemberAuthSuccess}
            onPackagePurchased={handlePackagePurchased}
            onGoToPortal={() => {
              if (pendingMemberUser) {
                const fullUser = systemAccounts.find(
                  (a) =>
                    a.phone === pendingMemberUser.phone ||
                    (pendingMemberUser.username && a.username === pendingMemberUser.username)
                );
                const memberUser: User = fullUser
                  ? {
                      id: fullUser.id,
                      name: fullUser.name,
                      email: fullUser.email,
                      phone: fullUser.phone,
                      role: 'MEMBER',
                      department: fullUser.department,
                      age: fullUser.age,
                      username: fullUser.username,
                    }
                  : { ...pendingMemberUser, role: 'MEMBER' };
                setCurrentUser(memberUser);
                try {
                  localStorage.setItem('citygym_current_user', JSON.stringify(memberUser));
                } catch (e) {}
              }
              setCurrentTab('member_portal');
              window.location.hash = '#member';
            }}
            onLogout={() => {
              setPendingMemberUser(null);
              setCurrentUser(null);
              try {
                localStorage.removeItem('citygym_pending_member');
                localStorage.removeItem('citygym_current_user');
              } catch (e) {}
              showToast('Bạn đã đăng xuất tài khoản hội viên.', 'Đăng Xuất', 'info');
            }}
          />
          <CityAICoachModal
            memberName={pendingMemberUser ? pendingMemberUser.name : 'Khách Vãng Lai'}
            memberWeight={68.2}
            memberBmr={1675}
            memberBmi={23.1}
          />
        </div>
      )}

      {/* ==================== ZALO ZNS MODAL THÔNG BÁO CẤP TÀI KHOẢN ==================== */}
      <ZaloNotificationModal
        isOpen={showApprovalZaloModal}
        onClose={() => setShowApprovalZaloModal(false)}
        message={approvalZaloMessage}
      />

      {/* ==================== TOAST NOTIFICATION HỆ THỐNG TOÀN CỤC ==================== */}
      {toast && (
        <ToastNotification
          key={toast.id}
          id={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
