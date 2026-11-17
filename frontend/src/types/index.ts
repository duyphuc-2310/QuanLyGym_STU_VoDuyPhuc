// CITYGYM - System Type Definitions (TypeScript)

export type UserRole = 'GUEST' | 'RECEPTION' | 'TRAINER' | 'MEMBER' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export type PortalType = 
  | 'landing' 
  | 'checkin' 
  | 'memberships' 
  | 'leads' 
  | 'member_portal' 
  | 'pt_portal' 
  | 'analytics';

export type MembershipStatus = 'ACTIVE' | 'FROZEN' | 'EXPIRED' | 'CANCELLED';

export interface Membership {
  id: number;
  contractCode: string;
  memberName: string;
  memberPhone: string;
  memberEmail?: string;
  packageName: string;
  packagePrice: number;
  startDate: string;
  endDate: string;
  remainingSessions: number;
  totalSessions: number;
  status: MembershipStatus;
  maxFreezeDays: number;
  frozenDaysUsed: number;
  assignedPtName?: string;
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'TRIAL_CHECKED_IN' | 'CONVERTED' | 'CANCELLED';

export interface Lead {
  id: number;
  ticketCode: string;
  fullName: string;
  phone: string;
  email?: string;
  service: string;
  notes?: string;
  status: LeadStatus;
  date: string;
}

export type CheckInStatus = 'SUCCESS' | 'DENIED';
export type CheckInType = 'HỘI VIÊN' | 'TẬP THỬ' | 'VÃNG LAI';

export interface CheckInLog {
  id: number;
  name: string;
  type: CheckInType;
  status: CheckInStatus;
  note: string;
  time: string;
  contractCode?: string;
}

export type BookingStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export interface PtBooking {
  id: number;
  memberName: string;
  memberPhone?: string;
  trainerName: string;
  date: string;
  time: string;
  status: BookingStatus;
  goal: string;
  notes?: string;
}

export interface InBodyMetric {
  id: number;
  date: string;
  weight: number; // kg
  height: number; // cm
  bodyFatPercent: number; // %
  muscleMass: number; // kg
  visceralFat: number; // level 1-12
  bmr: number; // kcal
  bmi: number;
}

export interface GymPackage {
  id: number;
  name: string;
  price: number;
  durationMonths: number;
  ptSessions: number;
  maxFreezeDays: number;
  features: string[];
  isPopular?: boolean;
}
