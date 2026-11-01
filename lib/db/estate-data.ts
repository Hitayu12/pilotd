import {
  aiActions as demoAiActions,
  aiConversations as demoAiConversations,
  alerts as demoAlerts,
  bankAccounts as demoBankAccounts,
  bills as demoBills,
  complianceItems as demoComplianceItems,
  demoUser,
  maintenanceEvents as demoMaintenanceEvents,
  notifications as demoNotifications,
  properties as demoProperties,
  smartDevices as demoSmartDevices,
  transactions as demoTransactions
} from "@/lib/demo/data";
import { createSupabaseServerClient } from "@/lib/db/supabase/server";
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

interface DailyScottieSummary {
  greeting: string;
  overview: string;
  actions: string[];
}

export interface EstateData {
  user: UserProfile;
  properties: Property[];
  complianceItems: ComplianceItem[];
  bankAccounts: BankAccount[];
  transactions: Transaction[];
  bills: Bill[];
  maintenanceEvents: MaintenanceEvent[];
  smartDevices: SmartDevice[];
  alerts: Alert[];
  notifications: Notification[];
  aiConversations: AIConversation[];
  aiActions: AIAction[];
  dailyScottieSummary: DailyScottieSummary;
}

type Row = Record<string, unknown>;

function getDemoEstateData(): EstateData {
  const summary = buildScottieSummary(demoUser, demoAlerts, demoComplianceItems, demoBills);

  return {
    user: demoUser,
    properties: demoProperties,
    complianceItems: demoComplianceItems,
    bankAccounts: demoBankAccounts,
    transactions: demoTransactions,
    bills: demoBills,
    maintenanceEvents: demoMaintenanceEvents,
    smartDevices: demoSmartDevices,
    alerts: demoAlerts,
    notifications: demoNotifications,
    aiConversations: demoAiConversations,
    aiActions: demoAiActions,
    dailyScottieSummary: summary
  };
}

function getFirstName(fullName: string) {
  return fullName.split(" ")[0] || fullName;
}

function buildScottieSummary(user: UserProfile, alerts: Alert[], complianceItems: ComplianceItem[], bills: Bill[]) {
  const highRisk = alerts.filter((alert) => alert.severity === "high" || alert.severity === "critical").length;
  const overdueBills = bills.filter((bill) => bill.status === "overdue").length;
  const dueSoonCompliance = complianceItems.filter(
    (item) => item.status === "due_soon" || item.status === "overdue"
  ).length;

  const actions: string[] = [];
  if (dueSoonCompliance > 0) actions.push("Review high-priority compliance items");
  if (overdueBills > 0) actions.push("Release overdue payment queue");
  if (highRisk > 0) actions.push("Resolve critical operational alerts");

  return {
    greeting: `Good morning, ${getFirstName(user.fullName)}.`,
    overview: `You have ${highRisk} high-risk alerts, ${dueSoonCompliance} compliance items due soon, and ${overdueBills} overdue bills across your portfolio.`,
    actions: actions.length > 0 ? actions : ["Portfolio currently stable. Continue routine monitoring."]
  };
}

export async function getEstateData(): Promise<EstateData> {
  const hasSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!hasSupabase) {
    return getDemoEstateData();
  }

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user: authUser }
    } = await supabase.auth.getUser();

    if (!authUser) {
      return getDemoEstateData();
    }

    const { data: profileRow } = await supabase
      .from("profiles")
      .select("id, full_name, email, home_base, citizenships, tax_residency, plan")
      .eq("auth_user_id", authUser.id)
      .maybeSingle();

    if (!profileRow) {
      const metadata = authUser.user_metadata ?? {};
      const demo = getDemoEstateData();
      const mergedUser: UserProfile = {
        ...demo.user,
        email: authUser.email ?? demo.user.email,
        fullName:
          (metadata.full_name as string | undefined) ??
          (metadata.name as string | undefined) ??
          demo.user.fullName,
        homeBase: (metadata.home_base as string | undefined) ?? demo.user.homeBase,
        citizenships: (metadata.citizenships as string[] | undefined) ?? demo.user.citizenships,
        taxResidency: (metadata.tax_residency as string[] | undefined) ?? demo.user.taxResidency
      };

      return {
        ...demo,
        user: mergedUser,
        dailyScottieSummary: buildScottieSummary(
          mergedUser,
          demo.alerts,
          demo.complianceItems,
          demo.bills
        )
      };
    }

    const [
      propertiesRes,
      complianceRes,
      bankAccountsRes,
      transactionsRes,
      billsRes,
      maintenanceRes,
      devicesRes,
      alertsRes,
      notificationsRes,
      conversationsRes,
      messagesRes,
      aiActionsRes
    ] = await Promise.all([
      supabase
        .from("properties")
        .select("id, name, city, region, country, property_type, occupancy, status, monthly_cash_flow, currency, next_due_item, image_url, jurisdictions(code)")
        .eq("user_id", profileRow.id),
      supabase
        .from("property_compliance_items")
        .select("id, property_id, title, due_date, status, risk, description, properties(country)")
        .eq("user_id", profileRow.id),
      supabase
        .from("bank_accounts")
        .select("id, property_id, bank_name, account_nickname, currency, balance, status, months_inactive, last_transaction_at")
        .eq("user_id", profileRow.id),
      supabase
        .from("transactions")
        .select("id, property_id, account_id, amount, currency, transaction_date, direction, category, description")
        .eq("user_id", profileRow.id)
        .order("transaction_date", { ascending: false }),
      supabase
        .from("bills")
        .select("id, property_id, bill_type, vendor, amount, currency, due_date, status, autopay_enabled")
        .eq("user_id", profileRow.id),
      supabase
        .from("maintenance_events")
        .select("id, property_id, category, title, priority, status, logged_at, eta")
        .eq("user_id", profileRow.id),
      supabase
        .from("smart_devices")
        .select("id, property_id, device_type, label, status, last_heartbeat, anomaly_note")
        .eq("user_id", profileRow.id),
      supabase
        .from("alerts")
        .select("id, property_id, alert_type, title, description, severity, created_at, read")
        .eq("user_id", profileRow.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("notifications")
        .select("id, alert_id, title, body, category, severity, created_at, read")
        .eq("user_id", profileRow.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("ai_conversations")
        .select("id, title, property_id")
        .eq("user_id", profileRow.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("ai_messages")
        .select("id, conversation_id, role, content, created_at")
        .eq("user_id", profileRow.id)
        .order("created_at", { ascending: true }),
      supabase
        .from("ai_actions")
        .select("id, title, status, property_id, created_at")
        .eq("user_id", profileRow.id)
        .order("created_at", { ascending: false })
    ]);

    const properties: Property[] = ((propertiesRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      name: String(row.name ?? ""),
      city: String(row.city ?? ""),
      region: String(row.region ?? ""),
      country: String(row.country ?? ""),
      jurisdictionCode: String((row.jurisdictions as Row | null)?.code ?? ""),
      type: String(row.property_type ?? "Apartment") as Property["type"],
      occupancy: String(row.occupancy ?? "occupied") as Property["occupancy"],
      status: String(row.status ?? "stable") as Property["status"],
      monthlyCashFlow: Number(row.monthly_cash_flow ?? 0),
      currency: String(row.currency ?? "USD"),
      nextDueItem: String(row.next_due_item ?? "No due items"),
      activeAlerts: 0,
      linkedBankAccountId: "",
      image: String(row.image_url ?? "")
    }));

    const alerts: Alert[] = ((alertsRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      propertyId: String(row.property_id ?? ""),
      type: String(row.alert_type ?? "compliance") as Alert["type"],
      title: String(row.title ?? ""),
      description: String(row.description ?? ""),
      severity: String(row.severity ?? "low") as Alert["severity"],
      createdAt: String(row.created_at ?? new Date().toISOString()),
      read: Boolean(row.read)
    }));

    const bankAccounts: BankAccount[] = ((bankAccountsRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      propertyId: String(row.property_id ?? ""),
      bankName: String(row.bank_name ?? ""),
      accountNickname: String(row.account_nickname ?? ""),
      currency: String(row.currency ?? "USD"),
      balance: Number(row.balance ?? 0),
      status: String(row.status ?? "healthy") as BankAccount["status"],
      monthsInactive: Number(row.months_inactive ?? 0),
      lastTransactionDate: String(row.last_transaction_at ?? new Date().toISOString().slice(0, 10))
    }));

    const propertyById = new Map(properties.map((property) => [property.id, property]));
    const accountByPropertyId = new Map(bankAccounts.map((account) => [account.propertyId, account]));
    const alertCounts = alerts.reduce<Record<string, number>>((acc, alert) => {
      acc[alert.propertyId] = (acc[alert.propertyId] ?? 0) + 1;
      return acc;
    }, {});

    const enrichedProperties = properties.map((property) => ({
      ...property,
      activeAlerts: alertCounts[property.id] ?? 0,
      linkedBankAccountId: accountByPropertyId.get(property.id)?.id ?? ""
    }));

    const complianceItems: ComplianceItem[] = ((complianceRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      propertyId: String(row.property_id ?? ""),
      jurisdiction:
        String((row.properties as Row | null)?.country ?? "") ||
        propertyById.get(String(row.property_id ?? ""))?.country ||
        "Jurisdiction",
      title: String(row.title ?? ""),
      dueDate: String(row.due_date ?? new Date().toISOString().slice(0, 10)),
      status: String(row.status ?? "upcoming") as ComplianceItem["status"],
      risk: String(row.risk ?? "low") as ComplianceItem["risk"],
      description: String(row.description ?? "")
    }));

    const transactions: Transaction[] = ((transactionsRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      propertyId: String(row.property_id ?? ""),
      accountId: String(row.account_id ?? ""),
      amount: Number(row.amount ?? 0),
      currency: String(row.currency ?? "USD"),
      date: String(row.transaction_date ?? new Date().toISOString().slice(0, 10)),
      direction: String(row.direction ?? "outflow") as Transaction["direction"],
      category: String(row.category ?? "other") as Transaction["category"],
      description: String(row.description ?? "")
    }));

    const bills: Bill[] = ((billsRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      propertyId: String(row.property_id ?? ""),
      type: String(row.bill_type ?? "utility") as Bill["type"],
      vendor: String(row.vendor ?? ""),
      amount: Number(row.amount ?? 0),
      currency: String(row.currency ?? "USD"),
      dueDate: String(row.due_date ?? new Date().toISOString().slice(0, 10)),
      status: String(row.status ?? "unpaid") as Bill["status"],
      autopayEnabled: Boolean(row.autopay_enabled)
    }));

    const maintenanceEvents: MaintenanceEvent[] = ((maintenanceRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      propertyId: String(row.property_id ?? ""),
      category: String(row.category ?? "general") as MaintenanceEvent["category"],
      title: String(row.title ?? ""),
      priority: String(row.priority ?? "low") as MaintenanceEvent["priority"],
      status: String(row.status ?? "open") as MaintenanceEvent["status"],
      loggedAt: String(row.logged_at ?? new Date().toISOString().slice(0, 10)),
      eta: row.eta ? String(row.eta) : undefined
    }));

    const smartDevices: SmartDevice[] = ((devicesRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      propertyId: String(row.property_id ?? ""),
      type: String(row.device_type ?? "sensor") as SmartDevice["type"],
      label: String(row.label ?? ""),
      status: String(row.status ?? "online") as SmartDevice["status"],
      lastHeartbeat: String(row.last_heartbeat ?? new Date().toISOString()),
      anomalyNote: row.anomaly_note ? String(row.anomaly_note) : undefined
    }));

    const notifications: Notification[] = ((notificationsRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      alertId: String(row.alert_id ?? ""),
      title: String(row.title ?? ""),
      body: String(row.body ?? ""),
      category: String(row.category ?? "ai") as Notification["category"],
      severity: String(row.severity ?? "low") as Notification["severity"],
      createdAt: String(row.created_at ?? new Date().toISOString()),
      read: Boolean(row.read)
    }));

    const messagesByConversation = (messagesRes.data ?? []).reduce<Record<string, AIConversation["messages"]>>(
      (acc, row) => {
        const typed = row as Row;
        const conversationId = String(typed.conversation_id ?? "");
        const current = acc[conversationId] ?? [];
        acc[conversationId] = [
          ...current,
          {
            id: String(typed.id ?? ""),
            role: String(typed.role ?? "assistant") as AIConversation["messages"][number]["role"],
            content: String(typed.content ?? ""),
            createdAt: String(typed.created_at ?? new Date().toISOString())
          }
        ];
        return acc;
      },
      {}
    );

    const aiConversations: AIConversation[] = ((conversationsRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      title: String(row.title ?? ""),
      propertyId: row.property_id ? String(row.property_id) : undefined,
      messages: messagesByConversation[String(row.id ?? "")] ?? []
    }));

    const aiActions: AIAction[] = ((aiActionsRes.data ?? []) as Row[]).map((row) => ({
      id: String(row.id ?? ""),
      title: String(row.title ?? ""),
      status: String(row.status ?? "queued") as AIAction["status"],
      propertyId: row.property_id ? String(row.property_id) : undefined,
      createdAt: String(row.created_at ?? new Date().toISOString())
    }));

    const user: UserProfile = {
      id: profileRow.id,
      fullName: profileRow.full_name,
      email: profileRow.email,
      homeBase: profileRow.home_base ?? "",
      citizenships: profileRow.citizenships ?? [],
      taxResidency: profileRow.tax_residency ?? [],
      plan: profileRow.plan as UserProfile["plan"]
    };

    return {
      user,
      properties: enrichedProperties,
      complianceItems,
      bankAccounts,
      transactions,
      bills,
      maintenanceEvents,
      smartDevices,
      alerts,
      notifications,
      aiConversations,
      aiActions,
      dailyScottieSummary: buildScottieSummary(user, alerts, complianceItems, bills)
    };
  } catch {
    return getDemoEstateData();
  }
}

export function getDashboardMetrics(data: EstateData) {
  const totalCashFlow = data.properties.reduce((sum, property) => sum + property.monthlyCashFlow, 0);
  const highRiskAlerts = data.alerts.filter((alert) => ["high", "critical"].includes(alert.severity)).length;
  const dueSoonCompliance = data.complianceItems.filter(
    (item) => item.status === "due_soon" || item.status === "overdue"
  ).length;
  const overdueBills = data.bills.filter((bill) => bill.status === "overdue").length;

  return {
    properties: data.properties.length,
    totalCashFlow,
    highRiskAlerts,
    dueSoonCompliance,
    overdueBills
  };
}
