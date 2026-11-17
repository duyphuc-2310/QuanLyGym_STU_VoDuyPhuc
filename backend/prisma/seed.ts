import { PrismaClient, Role, PackageType, MembershipStatus, PaymentMethod, PaymentStatus, CheckinStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Đang khởi tạo dữ liệu mẫu (Seed Data) cho CITYGYM...');

  // 1. Xóa dữ liệu cũ nếu có
  await prisma.checkIn.deleteMany();
  await prisma.pTBooking.deleteMany();
  await prisma.classEnrollment.deleteMany();
  await prisma.groupClass.deleteMany();
  await prisma.bodyMetric.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.membershipFreeze.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.trialBooking.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.package.deleteMany();
  await prisma.memberProfile.deleteMany();
  await prisma.pTProfile.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.user.deleteMany();

  const saltRounds = 10;
  const commonPassword = await bcrypt.hash('123456', saltRounds);

  // 2. Tạo Tài khoản Quản trị viên (Admin)
  const admin = await prisma.user.create({
    data: {
      phone: '0900000001',
      email: 'admin@citygym.vn',
      passwordHash: commonPassword,
      fullName: 'Quản Trị Viên Hệ Thống',
      role: Role.ADMIN,
    },
  });

  // 3. Tạo Nhân viên Lễ tân (Staff)
  const staff = await prisma.user.create({
    data: {
      phone: '0900000002',
      email: 'staff@citygym.vn',
      passwordHash: commonPassword,
      fullName: 'Lễ Tân Nguyễn Thị Mai',
      role: Role.STAFF,
    },
  });

  // 4. Tạo các Huấn luyện viên cá nhân (PT)
  const pt1 = await prisma.user.create({
    data: {
      phone: '0900000003',
      email: 'pt.tuan@citygym.vn',
      passwordHash: commonPassword,
      fullName: 'Nguyễn Minh Tuấn',
      role: Role.PT,
      ptProfile: {
        create: {
          specialty: 'Tăng cơ Hypertrophy, Phục hồi vận động',
          experienceYears: 6,
          certNames: 'NASM-CPT, Precision Nutrition',
          ratingAvg: 4.9,
          commissionRate: 0.25,
        },
      },
    },
  });

  const pt2 = await prisma.user.create({
    data: {
      phone: '0900000004',
      email: 'pt.yen@citygym.vn',
      passwordHash: commonPassword,
      fullName: 'Trần Hoàng Yến',
      role: Role.PT,
      ptProfile: {
        create: {
          specialty: 'Siết mỡ nữ, Yoga Vinyasa, Thể lực đa năng',
          experienceYears: 5,
          certNames: 'ACE-CPT, Yoga Alliance 200h',
          ratingAvg: 5.0,
          commissionRate: 0.25,
        },
      },
    },
  });

  // 5. Tạo Hội viên tiêu biểu (Member)
  const member = await prisma.user.create({
    data: {
      phone: '0901234567',
      email: 'phuc.voduy@stu.edu.vn',
      passwordHash: commonPassword,
      fullName: 'Võ Duy Phúc',
      role: Role.MEMBER,
      memberProfile: {
        create: {
          gender: 'male',
          dob: new Date('2003-05-15'),
          address: 'Quận 8, TP. Hồ Chí Minh',
          emergencyContact: '0909888999 (Phụ huynh)',
          qrSecret: 'CITYGYM-SECRET-PHUC-2026',
        },
      },
    },
  });

  // 6. Tạo Gói tập đa dạng
  const pkgBasic = await prisma.package.create({
    data: {
      code: 'CITY_BASIC_1M',
      name: 'CityBasic 1 Tháng',
      packageType: PackageType.TIME_BASED,
      durationDays: 30,
      price: 650000,
      maxFreezeDays: 0,
      description: 'Tập luyện không giới hạn khung giờ, miễn phí tủ locker & nước uống.',
    },
  });

  const pkgPro = await prisma.package.create({
    data: {
      code: 'CITY_PRO_6M',
      name: 'CityPro 6 Tháng',
      packageType: PackageType.TIME_BASED,
      durationDays: 180,
      price: 2890000,
      maxFreezeDays: 30,
      description: 'Toàn quyền Gym, Yoga, GroupX, tặng 02 buổi PT, được bảo lưu 30 ngày.',
    },
  });

  const pkgVIP = await prisma.package.create({
    data: {
      code: 'CITY_VIP_12M',
      name: 'CityVIP 12 Tháng',
      packageType: PackageType.TIME_BASED,
      durationDays: 365,
      price: 4990000,
      maxFreezeDays: 60,
      description: 'Full dịch vụ, tặng 05 buổi kèm PT, bảo lưu 60 ngày, hỗ trợ chuyển nhượng.',
    },
  });

  const pkgPT12 = await prisma.package.create({
    data: {
      code: 'PT_12_SESSIONS',
      name: 'Gói PT Kèm Riêng 12 Buổi',
      packageType: PackageType.PT_SESSION,
      durationDays: 60,
      ptSessions: 12,
      price: 4200000,
      description: 'Huấn luyện 1-1 chuyên sâu 60 phút/buổi, thiết kế thực đơn riêng.',
    },
  });

  // 7. Tạo Hợp đồng đang hoạt động cho hội viên Võ Duy Phúc
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 286);

  const membership = await prisma.membership.create({
    data: {
      contractCode: 'HD-2026-0001',
      memberId: member.id,
      packageId: pkgVIP.id,
      assignedPtId: pt1.id,
      startDate: today,
      endDate: endDate,
      remainingSessions: 18,
      status: MembershipStatus.ACTIVE,
      totalAmount: 4990000,
      paidAmount: 4990000,
      createdBy: staff.id,
    },
  });

  // 8. Tạo hóa đơn thanh toán tương ứng
  await prisma.payment.create({
    data: {
      membershipId: membership.id,
      paymentCode: 'PAY-2026-0001',
      amount: 4990000,
      paymentMethod: PaymentMethod.VIETQR,
      gatewayTransId: 'MBB_TRANS_882910',
      status: PaymentStatus.PAID,
      paidAt: today,
      note: 'Thanh toán chuyển khoản VietQR thành công',
      processedBy: staff.id,
    },
  });

  // 9. Tạo lượt check-in mẫu
  await prisma.checkIn.create({
    data: {
      memberId: member.id,
      membershipId: membership.id,
      status: CheckinStatus.SUCCESS,
      staffId: staff.id,
    },
  });

  // 10. Tạo Chỉ số thể trạng ban đầu (InBody)
  await prisma.bodyMetric.create({
    data: {
      memberId: member.id,
      ptId: pt1.id,
      height: 172,
      weight: 68,
      bodyFatPct: 18.5,
      muscleMassKg: 32.4,
      bmi: 23.0,
      bmr: 1625,
      tdee: 2234,
      recommendations: 'Thể trạng tốt, tập trung tăng cơ Hypertrophy 4 buổi/tuần, nạp 140g protein/ngày.',
    },
  });

  // 11. Tạo Khách tiềm năng (Lead) từ Landing Page
  const lead1 = await prisma.lead.create({
    data: {
      fullName: 'Trần Văn Nam',
      phone: '0912345678',
      email: 'nam.tran@gmail.com',
      interestService: 'pt',
      goal: 'Giảm mỡ bụng, cải thiện đau lưng',
      initialBmi: 26.2,
      initialTdee: 2450,
      assignedStaffId: staff.id,
      trialBookings: {
        create: {
          ticketCode: 'TRIAL-882910',
          scheduledDate: today,
          timeSlot: 'evening',
          status: 'VALID',
        },
      },
    },
  });

  console.log('✅ Khởi tạo CSDL hoàn tất!');
  console.log('----------------------------------------------------');
  console.log('Tài khoản Admin:    phone: 0900000001 / pass: 123456');
  console.log('Tài khoản Lễ tân:   phone: 0900000002 / pass: 123456');
  console.log('Tài khoản PT:       phone: 0900000003 / pass: 123456');
  console.log('Tài khoản Hội viên: phone: 0901234567 / pass: 123456');
  console.log('----------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

