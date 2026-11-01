import { Bell } from "lucide-react";

import { NotificationsCenter } from "@/components/dashboard/notifications-center";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { getEstateData } from "@/lib/db/estate-data";

export default async function NotificationsPage() {
  const data = await getEstateData();
  const unreadCount = data.notifications.filter((notification) => !notification.read).length;
  const alertPropertyMap = Object.fromEntries(data.alerts.map((alert) => [alert.id, alert.propertyId]));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Centralized alert feed grouped by category with severity-level prioritization."
        actions={
          <Badge variant="secondary" className="gap-1">
            <Bell className="size-3" /> {unreadCount} unread
          </Badge>
        }
      />
      <NotificationsCenter
        notifications={data.notifications}
        properties={data.properties}
        alertPropertyMap={alertPropertyMap}
      />
    </div>
  );
}
