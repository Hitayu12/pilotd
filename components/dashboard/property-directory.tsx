"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { PropertyTable } from "@/components/dashboard/property-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Property } from "@/types";

export function PropertyDirectory({ properties }: { properties: Property[] }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [status, setStatus] = useState("all");

  const countries = useMemo(() => Array.from(new Set(properties.map((property) => property.country))), [properties]);

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const searchTarget = `${property.name} ${property.city} ${property.country} ${property.type}`.toLowerCase();
      const queryMatch = searchTarget.includes(query.toLowerCase());
      const countryMatch = country === "all" || property.country === country;
      const statusMatch = status === "all" || property.status === status;
      return queryMatch && countryMatch && statusMatch;
    });
  }, [properties, query, country, status]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-xl border bg-card/60 p-4 md:grid-cols-[1fr_200px_200px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by property, location, or type"
            className="pl-9"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All countries</SelectItem>
            {countries.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Risk status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="stable">Stable</SelectItem>
            <SelectItem value="attention">Attention</SelectItem>
            <SelectItem value="at_risk">At risk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border bg-card/60 p-2">
        <PropertyTable properties={filtered} />
      </div>
    </div>
  );
}
