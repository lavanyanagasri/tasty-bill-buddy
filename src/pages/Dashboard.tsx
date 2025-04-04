
import { useState, useEffect } from "react";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { ShoppingCart, Utensils, FileText, Users } from "lucide-react";

export function Dashboard() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [averageOrder, setAverageOrder] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    // This is just mock data for the demo
    setTotalSales(3425.50);
    setTotalOrders(42);
    setAverageOrder(81.56);
    setTotalCustomers(28);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your restaurant's performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          icon={<FileText className="h-5 w-5 text-muted-foreground" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Orders Today"
          value={totalOrders.toString()}
          icon={<ShoppingCart className="h-5 w-5 text-muted-foreground" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Average Order"
          value={`$${averageOrder.toFixed(2)}`}
          icon={<Utensils className="h-5 w-5 text-muted-foreground" />}
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title="Customers Served"
          value={totalCustomers.toString()}
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          trend={{ value: 5.1, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SalesChart />
        <RecentOrders />
      </div>
    </div>
  );
}
