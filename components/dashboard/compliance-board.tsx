"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";

import { ComplianceTimeline } from "@/components/dashboard/compliance-timeline";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComplianceItem, Property } from "@/types";

export function ComplianceBoard({
  items,
  properties
}: {
  items: ComplianceItem[];
  properties: Property[];
}) {
  const [countryFilter, setCountryFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const countries = useMemo(() => Array.from(new Set(properties.map((property) => property.country))), [properties]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const property = properties.find((entry) => entry.id === item.propertyId);
      const countryMatch = countryFilter === "all" || property?.country === countryFilter;
      const propertyMatch = propertyFilter === "all" || item.propertyId === propertyFilter;
      const urgencyMatch = urgencyFilter === "all" || item.risk === urgencyFilter;
      return countryMatch && propertyMatch && urgencyMatch;
    });
  }, [items, properties, countryFilter, propertyFilter, urgencyFilter]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-xl border bg-card/60 p-4 md:grid-cols-3">
        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={propertyFilter} onValueChange={setPropertyFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All properties</SelectItem>
            {properties.map((property) => (
              <SelectItem key={property.id} value={property.id}>
                {property.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All urgency</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <ComplianceTimeline items={filtered} />

        <div className="space-y-4">
          <Card className="border-white/10 bg-card/70">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-base">
                <Filter className="size-4" /> Citizenship-to-property map
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-lg border p-3">
                <p className="font-medium">U.S. residency</p>
                <p className="text-xs text-muted-foreground">
                  Triggers foreign rental income alignment for Portugal and India assets.
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="font-medium">Portugal jurisdiction</p>
                <p className="text-xs text-muted-foreground">Requires local rental tax and municipal registration continuity.</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="font-medium">India jurisdiction</p>
                <p className="text-xs text-muted-foreground">
                  Municipal occupancy and utility standing must stay current for vacant holdings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/70">
            <CardHeader>
              <CardTitle className="text-base">AI explanation cards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-lg border p-3">
                <p className="font-medium">Why Lisbon is high priority</p>
                <p className="text-xs text-muted-foreground">
                  Cross-border tax linkage means missing local filing increases U.S. reporting variance risk.
                </p>
                <Badge variant="warning" className="mt-2">
                  Escalate this week
                </Badge>
              </div>
              <div className="rounded-lg border p-3">
                <p className="font-medium">How Scottie reduced manual review</p>
                <p className="text-xs text-muted-foreground">
                  3 obligations were auto-grouped into one checklist aligned by due date and jurisdiction.
                </p>
                <Badge variant="success" className="mt-2">
                  Workflow optimized
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
