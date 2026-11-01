import { Camera, DoorClosed, Fan, RadioTower } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SmartDevice } from "@/types";

const iconMap = {
  camera: Camera,
  lock: DoorClosed,
  hvac: Fan,
  sensor: RadioTower
};

export function DeviceStatusCard({ device }: { device: SmartDevice }) {
  const Icon = iconMap[device.type];
  const variant = device.status === "online" ? "success" : device.status === "degraded" ? "warning" : "danger";

  return (
    <Card className="border-white/10 bg-card/70">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="rounded-lg border bg-muted/40 p-2">
              <Icon className="size-4" />
            </span>
            <div>
              <p className="font-medium">{device.label}</p>
              <p className="text-xs text-muted-foreground capitalize">{device.type}</p>
            </div>
          </div>
          <Badge variant={variant} className="capitalize">
            {device.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">Last heartbeat: {new Date(device.lastHeartbeat).toLocaleString("en-US")}</p>
        {device.anomalyNote ? <p className="text-sm text-amber-500">{device.anomalyNote}</p> : null}
      </CardContent>
    </Card>
  );
}
