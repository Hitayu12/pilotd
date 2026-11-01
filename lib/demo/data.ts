import {
  AIAction,
  AIConversation,
  Alert,
  BankAccount,
  Bill,
  ComplianceItem,
  MaintenanceEvent,
  Notification,
  Property,
  SmartDevice,
  Transaction,
  UserProfile
} from "@/types";

export const demoUser: UserProfile = {
  id: "user-demo-1",
  fullName: "Ariana Shah",
  email: "ariana@example.com",
  homeBase: "Jersey City, New Jersey",
  citizenships: ["United States", "India"],
  taxResidency: ["United States"],
  plan: "Portfolio"
};

export const properties: Property[] = [
  {
    id: "prop-austin",
    name: "South Congress Townhome",
    city: "Austin",
    region: "Texas",
    country: "United States",
    jurisdictionCode: "US-TX",
    type: "Townhome",
    occupancy: "occupied",
    status: "attention",
    monthlyCashFlow: 3200,
    currency: "USD",
    nextDueItem: "Camera 2 offline remediation",
    activeAlerts: 2,
    linkedBankAccountId: "bank-austin",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "prop-lisbon",
    name: "Alfama River View Flat",
    city: "Lisbon",
    region: "Lisbon",
    country: "Portugal",
    jurisdictionCode: "PT-LIS",
    type: "Apartment",
    occupancy: "short_term",
    status: "at_risk",
    monthlyCashFlow: 2680,
    currency: "EUR",
    nextDueItem: "Rental tax filing due in 12 days",
    activeAlerts: 4,
    linkedBankAccountId: "bank-lisbon",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "prop-mumbai",
    name: "Bandra Seaview Residence",
    city: "Mumbai",
    region: "Maharashtra",
    country: "India",
    jurisdictionCode: "IN-MH",
    type: "Condo",
    occupancy: "vacant",
    status: "attention",
    monthlyCashFlow: 1510,
    currency: "USD",
    nextDueItem: "Water utility bill overdue",
    activeAlerts: 3,
    linkedBankAccountId: "bank-mumbai",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"
  }
];

export const complianceItems: ComplianceItem[] = [
  {
    id: "comp-1",
    propertyId: "prop-lisbon",
    jurisdiction: "Portugal",
    title: "Portuguese rental tax filing",
    dueDate: "2026-03-19",
    status: "due_soon",
    risk: "high",
    description:
      "Estimated rental tax of €1,240 is due. Foreign income may also require disclosure under U.S. reporting rules."
  },
  {
    id: "comp-2",
    propertyId: "prop-lisbon",
    jurisdiction: "United States",
    title: "Foreign rental income reporting (Schedule E / FBAR review)",
    dueDate: "2026-04-15",
    status: "upcoming",
    risk: "medium",
    description: "Cross-check Lisbon rental income and linked account data before U.S. annual filing cutoff."
  },
  {
    id: "comp-3",
    propertyId: "prop-mumbai",
    jurisdiction: "India",
    title: "Municipal occupancy declaration",
    dueDate: "2026-03-28",
    status: "upcoming",
    risk: "medium",
    description: "Vacant status requires a municipal declaration update to maintain compliance."
  },
  {
    id: "comp-4",
    propertyId: "prop-austin",
    jurisdiction: "Texas",
    title: "County property tax prepayment window",
    dueDate: "2026-03-24",
    status: "upcoming",
    risk: "low",
    description: "Early payment keeps annual liability discounted by 1.5%."
  }
];

export const bankAccounts: BankAccount[] = [
  {
    id: "bank-lisbon",
    propertyId: "prop-lisbon",
    bankName: "Banco Atlântico",
    accountNickname: "Lisbon Operations",
    currency: "EUR",
    balance: 4680,
    status: "dormant_risk",
    monthsInactive: 10,
    lastTransactionDate: "2025-05-08"
  },
  {
    id: "bank-mumbai",
    propertyId: "prop-mumbai",
    bankName: "Axis Bank",
    accountNickname: "Mumbai Reserve",
    currency: "INR",
    balance: 109200,
    status: "warning",
    monthsInactive: 7,
    lastTransactionDate: "2025-08-26"
  },
  {
    id: "bank-austin",
    propertyId: "prop-austin",
    bankName: "Chase",
    accountNickname: "Austin Operating",
    currency: "USD",
    balance: 7310,
    status: "healthy",
    monthsInactive: 1,
    lastTransactionDate: "2026-02-27"
  }
];

export const transactions: Transaction[] = [
  {
    id: "txn-1",
    propertyId: "prop-austin",
    accountId: "bank-austin",
    amount: 3900,
    currency: "USD",
    date: "2026-03-01",
    direction: "inflow",
    category: "rent",
    description: "March rent received"
  },
  {
    id: "txn-2",
    propertyId: "prop-lisbon",
    accountId: "bank-lisbon",
    amount: 125,
    currency: "EUR",
    date: "2026-02-18",
    direction: "outflow",
    category: "utility",
    description: "Water utility payment"
  },
  {
    id: "txn-3",
    propertyId: "prop-mumbai",
    accountId: "bank-mumbai",
    amount: 2880,
    currency: "INR",
    date: "2026-01-10",
    direction: "outflow",
    category: "maintenance",
    description: "Security system servicing"
  },
  {
    id: "txn-4",
    propertyId: "prop-lisbon",
    accountId: "bank-lisbon",
    amount: 3100,
    currency: "EUR",
    date: "2026-03-05",
    direction: "inflow",
    category: "rent",
    description: "Short-term rental payout"
  }
];

export const bills: Bill[] = [
  {
    id: "bill-1",
    propertyId: "prop-mumbai",
    type: "utility",
    vendor: "Mumbai Water Board",
    amount: 9800,
    currency: "INR",
    dueDate: "2026-03-04",
    status: "overdue",
    autopayEnabled: false
  },
  {
    id: "bill-2",
    propertyId: "prop-lisbon",
    type: "tax",
    vendor: "Autoridade Tributária",
    amount: 1240,
    currency: "EUR",
    dueDate: "2026-03-19",
    status: "unpaid",
    autopayEnabled: false
  },
  {
    id: "bill-3",
    propertyId: "prop-austin",
    type: "utility",
    vendor: "Austin Energy",
    amount: 260,
    currency: "USD",
    dueDate: "2026-03-12",
    status: "scheduled",
    autopayEnabled: true
  }
];

export const smartDevices: SmartDevice[] = [
  {
    id: "dev-1",
    propertyId: "prop-austin",
    type: "camera",
    label: "Front Gate Camera 2",
    status: "offline",
    lastHeartbeat: "2026-03-06T02:14:00Z",
    anomalyNote: "No heartbeat for 14 hours"
  },
  {
    id: "dev-2",
    propertyId: "prop-austin",
    type: "hvac",
    label: "Main HVAC Controller",
    status: "degraded",
    lastHeartbeat: "2026-03-07T10:00:00Z",
    anomalyNote: "Energy usage up 34% week-over-week"
  },
  {
    id: "dev-3",
    propertyId: "prop-lisbon",
    type: "lock",
    label: "Unit Entry Lock",
    status: "online",
    lastHeartbeat: "2026-03-07T13:20:00Z"
  },
  {
    id: "dev-4",
    propertyId: "prop-mumbai",
    type: "camera",
    label: "Lobby Camera",
    status: "online",
    lastHeartbeat: "2026-03-07T13:08:00Z"
  }
];

export const maintenanceEvents: MaintenanceEvent[] = [
  {
    id: "mnt-1",
    propertyId: "prop-austin",
    category: "hvac",
    title: "Diagnose HVAC energy anomaly",
    priority: "high",
    status: "in_progress",
    loggedAt: "2026-03-06",
    eta: "2026-03-09"
  },
  {
    id: "mnt-2",
    propertyId: "prop-mumbai",
    category: "plumbing",
    title: "Leak reported in utility closet",
    priority: "medium",
    status: "open",
    loggedAt: "2026-03-05",
    eta: "2026-03-10"
  },
  {
    id: "mnt-3",
    propertyId: "prop-lisbon",
    category: "general",
    title: "Quarterly fire safety inspection",
    priority: "low",
    status: "resolved",
    loggedAt: "2026-02-25"
  }
];

export const alerts: Alert[] = [
  {
    id: "alert-1",
    propertyId: "prop-lisbon",
    type: "compliance",
    title: "Lisbon rental tax filing due in 12 days",
    description: "Scottie marked this as high priority due to cross-border reporting impact.",
    severity: "high",
    createdAt: "2026-03-07T09:00:00Z",
    read: false
  },
  {
    id: "alert-2",
    propertyId: "prop-lisbon",
    type: "banking",
    title: "Operating account inactivity detected",
    description: "10 months since last qualifying activity. Dormancy risk is rising.",
    severity: "critical",
    createdAt: "2026-03-07T08:10:00Z",
    read: false
  },
  {
    id: "alert-3",
    propertyId: "prop-mumbai",
    type: "billing",
    title: "Water utility bill is overdue",
    description: "Payment missed on March 4. Late fees may apply.",
    severity: "high",
    createdAt: "2026-03-06T15:00:00Z",
    read: false
  },
  {
    id: "alert-4",
    propertyId: "prop-austin",
    type: "monitoring",
    title: "Camera 2 offline",
    description: "No heartbeat for 14 hours. Security coverage gap detected.",
    severity: "medium",
    createdAt: "2026-03-07T04:00:00Z",
    read: true
  },
  {
    id: "alert-5",
    propertyId: "prop-austin",
    type: "monitoring",
    title: "HVAC usage anomaly",
    description: "Consumption increased 34% week-over-week.",
    severity: "medium",
    createdAt: "2026-03-07T06:40:00Z",
    read: true
  }
];

export const notifications: Notification[] = [
  {
    id: "note-1",
    alertId: "alert-1",
    title: "Compliance deadline approaching",
    body: "Portuguese rental tax filing is due March 19.",
    category: "compliance",
    severity: "high",
    createdAt: "2026-03-07T09:00:00Z",
    read: false
  },
  {
    id: "note-2",
    alertId: "alert-2",
    title: "Dormancy risk elevated",
    body: "Lisbon operations account has 10 months inactivity.",
    category: "finance",
    severity: "critical",
    createdAt: "2026-03-07T08:10:00Z",
    read: false
  },
  {
    id: "note-3",
    alertId: "alert-4",
    title: "Monitoring incident",
    body: "Austin gate camera is offline.",
    category: "monitoring",
    severity: "medium",
    createdAt: "2026-03-07T04:00:00Z",
    read: true
  },
  {
    id: "note-4",
    alertId: "alert-3",
    title: "Overdue bill",
    body: "Mumbai water utility bill is unpaid past due date.",
    category: "finance",
    severity: "high",
    createdAt: "2026-03-06T15:00:00Z",
    read: false
  }
];

export const aiConversations: AIConversation[] = [
  {
    id: "conv-1",
    title: "Portfolio morning review",
    messages: [
      {
        id: "msg-1",
        role: "assistant",
        content:
          "Morning update: Lisbon has a tax filing due in 12 days, Mumbai has one overdue utility bill, and Austin has one monitoring outage. I recommend prioritizing Lisbon compliance and restoring Austin camera coverage today.",
        createdAt: "2026-03-07T09:01:00Z"
      }
    ]
  },
  {
    id: "conv-2",
    title: "Lisbon risk check",
    propertyId: "prop-lisbon",
    messages: [
      {
        id: "msg-2",
        role: "user",
        content: "Do I have any tax obligations coming up for Lisbon?",
        createdAt: "2026-03-07T10:01:00Z"
      },
      {
        id: "msg-3",
        role: "assistant",
        content:
          "Yes. Portuguese rental tax is estimated at €1,240 due in 12 days, and this income likely flows into your U.S. foreign income reporting package. I can queue a pre-check list now.",
        createdAt: "2026-03-07T10:01:06Z"
      }
    ]
  }
];

export const aiActions: AIAction[] = [
  {
    id: "action-1",
    title: "Prepared Lisbon tax filing checklist",
    status: "completed",
    propertyId: "prop-lisbon",
    createdAt: "2026-03-07T09:08:00Z"
  },
  {
    id: "action-2",
    title: "Drafted reminder for Mumbai overdue utility",
    status: "needs_review",
    propertyId: "prop-mumbai",
    createdAt: "2026-03-07T09:20:00Z"
  },
  {
    id: "action-3",
    title: "Created incident ticket for Austin camera outage",
    status: "queued",
    propertyId: "prop-austin",
    createdAt: "2026-03-07T09:34:00Z"
  }
];

export const dailyScottieSummary = {
  greeting: "Good morning, Ariana.",
  overview:
    "You have 3 portfolio priorities: Lisbon compliance due soon, Mumbai utility payment overdue, and Austin monitoring risk. Cash reserves remain stable across all properties.",
  actions: [
    "Review Lisbon filing packet",
    "Release Mumbai utility payment",
    "Restore Austin camera coverage"
  ]
};

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id);
}

export function getDashboardMetrics() {
  const totalCashFlow = properties.reduce((sum, property) => sum + property.monthlyCashFlow, 0);
  const highRiskAlerts = alerts.filter((alert) => ["high", "critical"].includes(alert.severity)).length;
  const dueSoonCompliance = complianceItems.filter((item) => item.status === "due_soon" || item.status === "overdue").length;
  const overdueBills = bills.filter((bill) => bill.status === "overdue").length;

  return {
    properties: properties.length,
    totalCashFlow,
    highRiskAlerts,
    dueSoonCompliance,
    overdueBills
  };
}

export function getPropertyContext(propertyId: string) {
  return {
    property: getPropertyById(propertyId),
    compliance: complianceItems.filter((item) => item.propertyId === propertyId),
    bills: bills.filter((item) => item.propertyId === propertyId),
    devices: smartDevices.filter((item) => item.propertyId === propertyId),
    maintenance: maintenanceEvents.filter((item) => item.propertyId === propertyId),
    alerts: alerts.filter((item) => item.propertyId === propertyId),
    account: bankAccounts.find((item) => item.propertyId === propertyId)
  };
}
