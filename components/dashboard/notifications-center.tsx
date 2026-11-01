"use client";

import { useMemo, useState } from "react";

import { RiskBadge } from "@/components/dashboard/risk-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Notification, Property } from "@/types";

export function NotificationsCenter({
  notifications,
  properties,
  alertPropertyMap
}: {
  notifications: Notification[];
  properties: Property[];
  alertPropertyMap: Record<string, string>;
}) {
  const [severity, setSeverity] = useState("all");
  const [category, setCategory] = useState("all");
  const [readState, setReadState] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");

  const filtered = useMemo(() => {
    return notifications.filter((item) => {
      const severityMatch = severity === "all" || item.severity === severity;
      const categoryMatch = category === "all" || item.category === category;
      const readMatch = readState === "all" || (readState === "read" ? item.read : !item.read);
      const propertyMatch =
        propertyFilter === "all" || alertPropertyMap[item.alertId] === propertyFilter;
      return severityMatch && categoryMatch && readMatch && propertyMatch;
    });
  }, [notifications, severity, category, readState, propertyFilter, alertPropertyMap]);

  const grouped = useMemo(() => {
    const map = new Map<string, Notification[]>();
    filtered.forEach((notification) => {
      const key = notification.category;
      map.set(key, [...(map.get(key) ?? []), notification]);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-xl border bg-card/60 p-4 md:grid-cols-4">
        <Select value={propertyFilter} onValueChange={setPropertyFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Property" />
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

        <Select value={severity} onValueChange={setSeverity}>
          <SelectTrigger>
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All severity</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="monitoring">Monitoring</SelectItem>
            <SelectItem value="ai">AI</SelectItem>
          </SelectContent>
        </Select>

        <Select value={readState} onValueChange={setReadState}>
          <SelectTrigger>
            <SelectValue placeholder="Read state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {grouped.map(([group, items]) => (
        <section key={group} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{group}</h2>
          {items.map((item) => {
            const property = properties.find((entry) => entry.id === alertPropertyMap[item.alertId]);
            return (
              <Card key={item.id} className="border-white/10 bg-card/70">
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{item.title}</p>
                      {!item.read ? <Badge variant="secondary">Unread</Badge> : null}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString("en-US")}
                      {property ? ` • ${property.name}` : ""}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <RiskBadge severity={item.severity} />
                    <Button variant="outline" size="sm">
                      Mark {item.read ? "unread" : "read"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      ))}
    </div>
  );
}
