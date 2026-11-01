import Link from "next/link";

import { RiskBadge } from "@/components/dashboard/risk-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Property } from "@/types";

const statusSeverity = {
  stable: "low",
  attention: "medium",
  at_risk: "high"
} as const;

export function PropertyTable({ properties }: { properties: Property[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Occupancy</TableHead>
          <TableHead>Monthly cash flow</TableHead>
          <TableHead>Active alerts</TableHead>
          <TableHead>Next due item</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell className="font-medium">{property.name}</TableCell>
            <TableCell>
              {property.city}, {property.country}
            </TableCell>
            <TableCell>{property.type}</TableCell>
            <TableCell className="capitalize">{property.occupancy.replace("_", " ")}</TableCell>
            <TableCell>
              {property.currency} {property.monthlyCashFlow.toLocaleString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Badge variant={property.activeAlerts > 2 ? "warning" : "secondary"}>{property.activeAlerts}</Badge>
                <RiskBadge severity={statusSeverity[property.status]} />
              </div>
            </TableCell>
            <TableCell>{property.nextDueItem}</TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="outline" asChild>
                <Link href={`/app/properties/${property.id}`}>Quick view</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
