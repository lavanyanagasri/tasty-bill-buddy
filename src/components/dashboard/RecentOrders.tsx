
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample data for recent orders
const recentOrders = [
  { id: 'ORD-001', table: 'Table 5', status: 'completed', total: '$45.80', time: '5 mins ago' },
  { id: 'ORD-002', table: 'Table 3', status: 'in-progress', total: '$32.50', time: '12 mins ago' },
  { id: 'ORD-003', table: 'Table 8', status: 'completed', total: '$76.20', time: '25 mins ago' },
  { id: 'ORD-004', table: 'Table 2', status: 'completed', total: '$21.30', time: '45 mins ago' },
];

// Helper function to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-accent text-accent-foreground';
    case 'in-progress':
      return 'bg-primary text-primary-foreground';
    case 'pending':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export function RecentOrders() {
  return (
    <Card className="col-span-2 md:col-span-1">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{order.table}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">•</p>
                  <p className="text-xs text-muted-foreground">{order.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{order.total}</p>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
