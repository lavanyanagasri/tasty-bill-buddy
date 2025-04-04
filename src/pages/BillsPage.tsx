
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillCreator } from "@/components/bills/BillCreator";
import { BillHistory } from "@/components/bills/BillHistory";

export function BillsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bills</h1>
        <p className="text-muted-foreground">
          Manage customer bills and payments
        </p>
      </div>

      <Tabs defaultValue="create">
        <TabsList className="mb-4">
          <TabsTrigger value="create">Create Bill</TabsTrigger>
          <TabsTrigger value="history">Bill History</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <BillCreator />
        </TabsContent>
        <TabsContent value="history">
          <BillHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
