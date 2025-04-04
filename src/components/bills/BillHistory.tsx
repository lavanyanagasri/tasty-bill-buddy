
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample bill data
const sampleBills = [
  {
    id: "B001",
    table: "Table 5",
    server: "John Doe",
    total: 75.85,
    status: "paid",
    items: 6,
    datetime: "2025-04-04T18:35:00",
  },
  {
    id: "B002",
    table: "Table 3",
    server: "Jane Smith",
    total: 42.50,
    status: "paid",
    items: 3,
    datetime: "2025-04-04T17:20:00",
  },
  {
    id: "B003",
    table: "Table 8",
    server: "John Doe",
    total: 128.90,
    status: "pending",
    items: 9,
    datetime: "2025-04-04T19:05:00",
  },
  {
    id: "B004",
    table: "Table 2",
    server: "Emma Johnson",
    total: 35.25,
    status: "paid",
    items: 2,
    datetime: "2025-04-03T20:15:00",
  },
  {
    id: "B005",
    table: "Table 7",
    server: "Michael Brown",
    total: 92.40,
    status: "void",
    items: 5,
    datetime: "2025-04-03T19:30:00",
  },
  {
    id: "B006",
    table: "Table 1",
    server: "Jane Smith",
    total: 67.20,
    status: "paid",
    items: 4,
    datetime: "2025-04-03T18:45:00",
  },
  {
    id: "B007",
    table: "Table 6",
    server: "Emma Johnson",
    total: 51.80,
    status: "paid",
    items: 3,
    datetime: "2025-04-02T19:10:00",
  },
  {
    id: "B008",
    table: "Table 4",
    server: "Michael Brown",
    total: 84.30,
    status: "void",
    items: 6,
    datetime: "2025-04-02T20:30:00",
  },
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

// Helper function to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-accent text-accent-foreground";
    case "pending":
      return "bg-primary text-primary-foreground";
    case "void":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function BillHistory() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter bills based on search term
  const filteredBills = sampleBills.filter(
    (bill) =>
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.table.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.server.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill History</CardTitle>
        <CardDescription>View and search past bills</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Search bills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredBills.length > 0 ? (
                filteredBills.map((bill) => (
                  <div
                    key={bill.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1 mb-2 md:mb-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{bill.table}</p>
                        <Badge className={getStatusColor(bill.status)}>
                          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <p>{bill.id}</p>
                        <p>•</p>
                        <p>{formatDate(bill.datetime)}</p>
                      </div>
                      <p className="text-sm">Server: {bill.server}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <p className="text-sm">{bill.items} items</p>
                      <p className="font-bold">${bill.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No bills found
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
