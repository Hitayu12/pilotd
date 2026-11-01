"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateProfileAction, updateResidencyAction } from "@/app/app/settings/actions";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from "@/types";

export function SettingsPanel({ user }: { user: UserProfile }) {
  const router = useRouter();

  const [fullName, setFullName] = useState(user.fullName);
  const [homeBase, setHomeBase] = useState(user.homeBase);
  const [email, setEmail] = useState(user.email);
  const [residency, setResidency] = useState(user.taxResidency[0] ?? "United States");
  const [citizenships, setCitizenships] = useState(user.citizenships.join(", "));

  const [profileState, profileFormAction, profilePending] = useActionState(updateProfileAction, null);
  const [residencyState, residencyFormAction, residencyPending] = useActionState(updateResidencyAction, null);

  useEffect(() => {
    if (profileState?.success) {
      toast.success(profileState.success);
      router.refresh();
    }
    if (profileState?.error) {
      toast.error(profileState.error);
    }
  }, [profileState, router]);

  useEffect(() => {
    if (residencyState?.success) {
      toast.success(residencyState.success);
      router.refresh();
    }
    if (residencyState?.error) {
      toast.error(residencyState.error);
    }
  }, [residencyState, router]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage profile, residency context, linked accounts, and operational preferences."
      />

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="surface">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={profileFormAction} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="homeBase">Home base</Label>
                <Input
                  id="homeBase"
                  name="homeBase"
                  value={homeBase}
                  onChange={(event) => setHomeBase(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={profilePending}>
                {profilePending ? "Saving..." : "Save profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="surface">
          <CardHeader>
            <CardTitle>Citizenship and tax residency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={residencyFormAction} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="citizenships">Citizenships</Label>
                <Textarea
                  id="citizenships"
                  name="citizenships"
                  value={citizenships}
                  onChange={(event) => setCitizenships(event.target.value)}
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Primary tax residency</Label>
                <Select value={residency} onValueChange={setResidency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Portugal">Portugal</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="taxResidency" value={residency} />
              </div>
              <Button type="submit" disabled={residencyPending}>
                {residencyPending ? "Saving..." : "Save residency profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="surface">
          <CardHeader>
            <CardTitle>Linked accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg border p-3">
              <p className="font-medium">Banking connections</p>
              <p className="text-xs text-muted-foreground">Connected operating and reserve accounts</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="font-medium">Payments rails</p>
              <p className="text-xs text-muted-foreground">SEPA + ACH configured for scheduled obligations</p>
            </div>
            <Button variant="outline" onClick={() => toast.info("Integration management is coming soon.")}>Manage connections</Button>
          </CardContent>
        </Card>

        <Card className="surface">
          <CardHeader>
            <CardTitle>Notification preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <label className="flex items-center justify-between rounded-lg border p-3">
              <span>Email alerts for high-risk compliance deadlines</span>
              <input type="checkbox" defaultChecked className="size-4" />
            </label>
            <label className="flex items-center justify-between rounded-lg border p-3">
              <span>SMS for payment failures and dormancy risk</span>
              <input type="checkbox" defaultChecked className="size-4" />
            </label>
            <label className="flex items-center justify-between rounded-lg border p-3">
              <span>Daily Scottie briefing at 8:30 AM</span>
              <input type="checkbox" defaultChecked className="size-4" />
            </label>
            <Button onClick={() => toast.info("Notification preference syncing is coming soon.")}>Save notification settings</Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="surface">
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              MFA status: <Badge variant="success">Enabled</Badge>
            </p>
            <p>Last sign-in: March 7, 2026</p>
            <Button variant="outline" onClick={() => toast.info("Security management is coming soon.")}>Rotate credentials</Button>
          </CardContent>
        </Card>

        <Card className="surface">
          <CardHeader>
            <CardTitle>Smart integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Camera platform: connected</p>
            <p>HVAC telemetry: connected</p>
            <p>Smart locks: pending one property</p>
            <Button variant="outline" onClick={() => toast.info("Integration controls are coming soon.")}>Manage integrations</Button>
          </CardContent>
        </Card>

        <Card className="surface">
          <CardHeader>
            <CardTitle>Billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Current plan: {user.plan}</p>
            <p>Cycle: Monthly</p>
            <p>Next invoice: March 20, 2026</p>
            <Button variant="outline" onClick={() => toast.info("Billing portal integration is coming soon.")}>Open billing portal</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
