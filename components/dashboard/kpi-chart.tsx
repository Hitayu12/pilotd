import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KPIChartProps {
  title: string;
  subtitle: string;
  data: Array<{ label: string; value: number }>;
  formatter?: (value: number) => string;
}

export function KPIChart({ title, subtitle, data, formatter = (value) => String(value) }: KPIChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <Card className="border-white/10 bg-card/70">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((point) => (
          <div key={point.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{point.label}</span>
              <span>{formatter(point.value)}</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${(point.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
