export type Severity = "low" | "medium" | "high" | "critical";
export type OccupancyStatus = "occupied" | "vacant" | "short_term";
export type AccountStatus = "healthy" | "warning" | "dormant_risk";
export type DeviceStatus = "online" | "offline" | "degraded";
export type ComplianceStatus = "upcoming" | "due_soon" | "overdue" | "completed";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  homeBase: string;
  citizenships: string[];
  taxResidency: string[];
  plan: "Starter" | "Pro" | "Portfolio";
}

export interface Property {
  id: string;
  name: string;
  city: string;
  region: string;
  country: string;
  jurisdictionCode: string;
  type: "Apartment" | "Condo" | "Villa" | "Townhome";
  occupancy: OccupancyStatus;
  status: "stable" | "at_risk" | "attention";
  monthlyCashFlow: number;
  currency: string;
  nextDueItem: string;
  activeAlerts: number;
  linkedBankAccountId: string;
  image: string;
}

export interface ComplianceItem {
  id: string;
  propertyId: string;
  jurisdiction: string;
  title: string;
  dueDate: string;
  status: ComplianceStatus;
  risk: Severity;
  description: string;
}

export interface BankAccount {
  id: string;
  propertyId: string;
  bankName: string;
  accountNickname: string;
  currency: string;
  balance: number;
  status: AccountStatus;
  monthsInactive: number;
  lastTransactionDate: string;
}

export interface Transaction {
  id: string;
  propertyId: string;
  accountId: string;
  amount: number;
  currency: string;
  date: string;
  direction: "inflow" | "outflow";
  category: "rent" | "tax" | "utility" | "maintenance" | "insurance" | "other";
  description: string;
}

export interface Bill {
  id: string;
  propertyId: string;
  type: "utility" | "tax" | "maintenance" | "insurance";
  vendor: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: "scheduled" | "unpaid" | "paid" | "overdue";
  autopayEnabled: boolean;
}

export interface SmartDevice {
  id: string;
  propertyId: string;
  type: "camera" | "hvac" | "lock" | "sensor";
  label: string;
  status: DeviceStatus;
  lastHeartbeat: string;
  anomalyNote?: string;
}

export interface MaintenanceEvent {
  id: string;
  propertyId: string;
  category: "plumbing" | "electrical" | "hvac" | "general";
  title: string;
  priority: Severity;
  status: "open" | "in_progress" | "resolved";
  loggedAt: string;
  eta?: string;
}

export interface Alert {
  id: string;
  propertyId: string;
  type: "compliance" | "banking" | "billing" | "monitoring" | "maintenance";
  title: string;
  description: string;
  severity: Severity;
  createdAt: string;
  read: boolean;
}

export interface Notification {
  id: string;
  alertId: string;
  title: string;
  body: string;
  category: "compliance" | "finance" | "monitoring" | "ai";
  severity: Severity;
  createdAt: string;
  read: boolean;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface AIConversation {
  id: string;
  title: string;
  propertyId?: string;
  messages: AIMessage[];
}

export interface AIAction {
  id: string;
  title: string;
  status: "queued" | "completed" | "needs_review";
  createdAt: string;
  propertyId?: string;
}
