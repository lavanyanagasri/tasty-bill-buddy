
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend ? (
          <p className={`text-xs ${trend.isPositive ? 'text-accent' : 'text-destructive'}`}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% from last month
          </p>
        ) : (
          <CardDescription>{description}</CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
