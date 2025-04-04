
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data for the chart
const data = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 1500 },
  { name: "Wed", sales: 2000 },
  { name: "Thu", sales: 1800 },
  { name: "Fri", sales: 2400 },
  { name: "Sat", sales: 2800 },
  { name: "Sun", sales: 2200 },
];

export function SalesChart() {
  return (
    <Card className="col-span-2 h-[350px]">
      <CardHeader>
        <CardTitle>Weekly Sales</CardTitle>
        <CardDescription>Sales data for the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis dataKey="name" tickLine={false} />
            <YAxis 
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Sales']}
              contentStyle={{ 
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
            <Bar 
              dataKey="sales" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
