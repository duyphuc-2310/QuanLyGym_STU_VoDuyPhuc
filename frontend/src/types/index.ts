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
  age?: number;
  username?: string;
}

export type PortalType = 
  | 'landing' 
  | 'checkin' 
  | 'memberships' 
  | 'leads' 
  | 'member_portal' 
  | 'nutrition'
  | 'pt_portal' 
  | 'analytics'
  | 'users';

export interface SystemAccount {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: 'ACTIVE' | 'LOCKED';
  createdAt: string;
  department: string;
  permissions: string[];
  age?: number;
  username?: string;
}

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

// ==================== SMART NUTRITION & AI FOOD SCANNER TYPES ====================

export interface FoodNutritionItem {
  id: string;
  foodName: string;
  portionGrams: number;
  calories: number; // kcal
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
  sodium?: number; // mg
  imageUrl: string;
  healthScore: number; // 1 - 10
  tags: string[];
  analysisNotes: string;
  coachAdvice: string;
  detectedAt?: string;
}

export interface MealRecommendation {
  mealType: 'SÁNG' | 'TRƯA' | 'PHỤ (PRE-WORKOUT)' | 'TỐI';
  timeSlot: string;
  dishName: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tips: string;
}

export interface DailyMealPlan {
  goal: 'LOSE_FAT' | 'GAIN_MUSCLE' | 'MAINTAIN';
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  waterIntakeLiters: number;
  meals: MealRecommendation[];
}

// ==================== ZALO ZNS & NOTIFICATION TYPES ====================
export interface ZaloZnsMessage {
  id: string;
  recipientName: string;
  recipientPhone: string;
  templateType: 'TRIAL_EPASS' | 'CONTRACT_ACTIVATED' | 'PT_REMINDER';
  ticketCode?: string;
  contractCode?: string;
  branchName?: string;
  sentAt: string;
  status: 'DELIVERED' | 'READ';
  customData?: Record<string, string>;
}

// ==================== SYSTEM AUDIT LOG TYPES ====================
export interface AuditLog {
  id: number;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  target: string;
  ipAddress: string;
  severity: 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER';
}

// ==================== INBODY PROGRESSION RECORD ====================
export interface InBodyHistoricalRecord {
  date: string;
  monthLabel: string;
  weight: number;
  bodyFatPercent: number;
  skeletalMuscleKg: number;
  bmi: number;
  bmr: number;
  inbodyScore: number;
  coachNote: string;
}
