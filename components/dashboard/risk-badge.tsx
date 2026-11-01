import { AlertTriangle, CircleCheckBig, ShieldAlert, Siren } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Severity } from "@/types";

export function RiskBadge({ severity }: { severity: Severity }) {
  if (severity === "critical") {
    return (
      <Badge variant="danger" className="gap-1">
        <Siren className="size-3" /> Critical
      </Badge>
    );
  }

  if (severity === "high") {
    return (
      <Badge variant="warning" className="gap-1">
        <ShieldAlert className="size-3" /> High
      </Badge>
    );
  }

  if (severity === "medium") {
    return (
      <Badge variant="secondary" className="gap-1">
        <AlertTriangle className="size-3" /> Medium
      </Badge>
    );
  }

  return (
    <Badge variant="success" className="gap-1">
      <CircleCheckBig className="size-3" /> Low
    </Badge>
  );
}
