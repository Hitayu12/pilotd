import { addDays, differenceInCalendarDays, format } from "date-fns";

import {
  alerts,
  bankAccounts,
  bills,
  complianceItems,
  dailyScottieSummary,
  getPropertyById,
  properties as demoProperties
} from "@/lib/demo/data";
import { Alert, BankAccount, Bill, ComplianceItem, Property } from "@/types";

interface ScottieContext {
  propertyId?: string;
  userName?: string;
}

export interface ScottieData {
  properties: Property[];
  alerts: Alert[];
  bankAccounts: BankAccount[];
  bills: Bill[];
  complianceItems: ComplianceItem[];
  dailyScottieSummary: {
    greeting: string;
    overview: string;
    actions: string[];
  };
}

export interface ScottieResponse {
  answer: string;
  actions: string[];
  highlights: Array<{
    label: string;
    value: string;
    tone: "neutral" | "good" | "warning" | "critical";
  }>;
}

const today = new Date("2026-03-07");

export function generateScottieResponse(
  query: string,
  context: ScottieContext = {},
  providedData?: ScottieData
): ScottieResponse {
  const data = providedData ?? {
    properties: demoProperties,
    alerts,
    bankAccounts,
    bills,
    complianceItems,
    dailyScottieSummary
  };
  const propertyById = new Map(data.properties.map((property) => [property.id, property]));
  const normalized = query.toLowerCase();

  if (normalized.includes("tax") || normalized.includes("compliance")) {
    const dueSoon = data.complianceItems
      .filter((item) => ["due_soon", "upcoming"].includes(item.status))
      .sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));

    const next = dueSoon[0];
    const days = next ? differenceInCalendarDays(new Date(next.dueDate), today) : 0;

    return {
      answer: next
        ? `Next priority is ${next.title} for ${(propertyById.get(next.propertyId) ?? getPropertyById(next.propertyId))?.name} due ${format(new Date(next.dueDate), "MMM d")}. I estimate ${days} days remaining and recommend preparing documents this week.`
        : "I do not see near-term compliance deadlines in the current window.",
      actions: ["Review compliance timeline", "Generate filing checklist", "Assign advisor review"],
      highlights: [
        {
          label: "Due soon",
          value: `${dueSoon.length} items`,
          tone: dueSoon.length > 2 ? "warning" : "neutral"
        },
        {
          label: "Highest risk",
          value: dueSoon.find((x) => x.risk === "high")?.title ?? "No high-risk item",
          tone: dueSoon.some((x) => x.risk === "high") ? "critical" : "good"
        }
      ]
    };
  }

  if (normalized.includes("risk") || normalized.includes("at risk")) {
    const critical = data.alerts.filter((alert) => alert.severity === "critical");
    const high = data.alerts.filter((alert) => alert.severity === "high");
    const top = critical[0] ?? high[0];

    return {
      answer: top
        ? `Most urgent portfolio risk is ${top.title}. ${top.description} I recommend actioning this within 24 hours to avoid operational disruption.`
        : "Current portfolio risk level appears stable with no high-severity events.",
      actions: ["Open related property", "Create mitigation task", "Notify operations contact"],
      highlights: [
        {
          label: "Critical alerts",
          value: String(critical.length),
          tone: critical.length > 0 ? "critical" : "good"
        },
        {
          label: "High alerts",
          value: String(high.length),
          tone: high.length > 0 ? "warning" : "good"
        }
      ]
    };
  }

  if (normalized.includes("dormancy") || normalized.includes("inactive account") || normalized.includes("bank")) {
    const risky = data.bankAccounts.filter((account) => account.status === "dormant_risk");
    const warning = data.bankAccounts.filter((account) => account.status === "warning");

    return {
      answer:
        risky.length > 0
          ? `${risky[0].accountNickname} is at dormancy risk with ${risky[0].monthsInactive} months inactivity. Triggering a qualifying transaction before ${format(addDays(today, 18), "MMM d")} should reduce closure risk.`
          : "No accounts are currently near dormancy thresholds.",
      actions: ["Schedule qualifying transfer", "Review reserve policy", "Alert finance agent"],
      highlights: [
        {
          label: "Dormancy risk",
          value: `${risky.length} account`,
          tone: risky.length > 0 ? "critical" : "good"
        },
        {
          label: "Watchlist",
          value: `${warning.length} accounts`,
          tone: warning.length > 0 ? "warning" : "neutral"
        }
      ]
    };
  }

  if (context.propertyId) {
    const property = propertyById.get(context.propertyId) ?? getPropertyById(context.propertyId);
    const propertyBills = data.bills.filter((bill) => bill.propertyId === context.propertyId);
    const overdue = propertyBills.filter((bill) => bill.status === "overdue");

    return {
      answer: property
        ? `${property.name} is currently ${property.status === "stable" ? "stable" : "in attention mode"}. Next due item: ${property.nextDueItem}. ${
            overdue.length > 0 ? `There are ${overdue.length} overdue bills requiring immediate action.` : "No overdue bills detected."
          }`
        : "I could not resolve the property context from this request.",
      actions: ["Open property intelligence", "Review local compliance", "Run risk simulation"],
      highlights: [
        {
          label: "Property",
          value: property?.name ?? "Unknown",
          tone: "neutral"
        },
        {
          label: "Overdue bills",
          value: `${overdue.length}`,
          tone: overdue.length > 0 ? "critical" : "good"
        }
      ]
    };
  }

  return {
    answer: `${data.dailyScottieSummary.greeting} ${data.dailyScottieSummary.overview}`,
    actions: ["View full dashboard", "Review alerts", "Open compliance calendar"],
    highlights: [
      {
        label: "Portfolio priorities",
        value: "3",
        tone: "warning"
      },
      {
        label: "System status",
        value: "Monitoring active",
        tone: "good"
      }
    ]
  };
}
