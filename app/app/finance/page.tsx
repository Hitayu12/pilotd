import { AlertTriangle, Landmark, WalletCards } from "lucide-react";

import { KPIChart } from "@/components/dashboard/kpi-chart";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getEstateData } from "@/lib/db/estate-data";
import { formatDate } from "@/lib/utils";

export default async function FinancePage() {
  const data = await getEstateData();
  const inflowData = [
    ...data.properties.map((property) => ({
      label: property.city,
      value: data.transactions
        .filter((transaction) => transaction.propertyId === property.id && transaction.direction === "inflow")
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    }))
  ];

  const expenseData = [
    {
      label: "Tax",
      value: data.bills.filter((bill) => bill.type === "tax").reduce((sum, bill) => sum + bill.amount, 0)
    },
    {
      label: "Utility",
      value: data.bills.filter((bill) => bill.type === "utility").reduce((sum, bill) => sum + bill.amount, 0)
    },
    {
      label: "Maintenance",
      value: data.bills.filter((bill) => bill.type === "maintenance").reduce((sum, bill) => sum + bill.amount, 0)
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance Operations"
        description="Track inflows, recurring expenses, taxes, and operating account risk across all properties."
      />

      <section className="grid gap-4 xl:grid-cols-2">
        <KPIChart title="Rent inflows" subtitle="Projected this month" data={inflowData} formatter={(value) => `$${value.toLocaleString()}`} />
        <KPIChart title="Recurring expenses" subtitle="Bills and maintenance" data={expenseData} formatter={(value) => `$${value.toLocaleString()}`} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border-white/10 bg-card/70">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <WalletCards className="size-4" /> Autopay status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {data.bills.map((bill) => (
              <div key={bill.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{bill.vendor}</p>
                  <Badge variant={bill.autopayEnabled ? "success" : "secondary"}>
                    {bill.autopayEnabled ? "Autopay on" : "Manual"}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {bill.currency} {bill.amount.toLocaleString()} • Due {formatDate(bill.dueDate)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/70">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <Landmark className="size-4" /> Operating accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {data.bankAccounts.map((account) => (
              <div key={account.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{account.accountNickname}</p>
                  <Badge
                    variant={
                      account.status === "healthy" ? "success" : account.status === "dormant_risk" ? "danger" : "warning"
                    }
                    className="capitalize"
                  >
                    {account.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {account.currency} {account.balance.toLocaleString()} • Inactive {account.monthsInactive} months
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/70">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-base">
              <AlertTriangle className="size-4" /> Payment failures and risks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-lg border p-3">
              <p className="font-medium">Mumbai water utility overdue</p>
              <p className="mt-1 text-xs text-muted-foreground">Late fee exposure started March 5.</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="font-medium">Lisbon account dormancy risk</p>
              <p className="mt-1 text-xs text-muted-foreground">No qualifying transactions in 10 months.</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="font-medium">Reserve balance watchlist</p>
              <p className="mt-1 text-xs text-muted-foreground">Mumbai reserve may dip below threshold after utility + plumbing work.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl border bg-card/70 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{data.properties.find((property) => property.id === transaction.propertyId)?.name}</TableCell>
                <TableCell className="capitalize">{transaction.category}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <Badge variant={transaction.direction === "inflow" ? "success" : "secondary"}>{transaction.direction}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {transaction.currency} {transaction.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
