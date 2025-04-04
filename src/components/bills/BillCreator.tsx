
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { MenuItem } from "../menu/MenuItems";

// Sample menu items from the menu
const sampleMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    price: 12.99,
    category: "mains",
    description: "Beef patty with cheese, lettuce, tomato, and special sauce",
  },
  {
    id: "2",
    name: "Caesar Salad",
    price: 9.99,
    category: "starters",
    description: "Romaine lettuce, croutons, parmesan, and Caesar dressing",
  },
  {
    id: "3",
    name: "Margherita Pizza",
    price: 14.99,
    category: "mains",
    description: "Tomato sauce, mozzarella, and fresh basil",
  },
  {
    id: "4",
    name: "Tiramisu",
    price: 7.99,
    category: "desserts",
    description: "Coffee-flavored Italian dessert",
  },
  {
    id: "5",
    name: "French Fries",
    price: 4.99,
    category: "sides",
    description: "Crispy golden fries with sea salt",
  },
  {
    id: "6",
    name: "Chocolate Cake",
    price: 6.99,
    category: "desserts",
    description: "Rich chocolate cake with ganache",
  },
];

interface BillItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
}

export function BillCreator() {
  const [tableNumber, setTableNumber] = useState("1");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState(1);
  
  // Calculate bill totals
  const subtotal = billItems.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + tax;

  const handleAddItem = () => {
    if (!selectedMenuItem) {
      toast.error("Please select a menu item");
      return;
    }

    if (itemQuantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    const menuItem = sampleMenuItems.find(
      (item) => item.id === selectedMenuItem
    );

    if (!menuItem) {
      toast.error("Menu item not found");
      return;
    }

    // Check if item already exists in bill
    const existingItemIndex = billItems.findIndex(
      (item) => item.menuItem.id === selectedMenuItem
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item already exists
      const updatedItems = [...billItems];
      updatedItems[existingItemIndex].quantity += itemQuantity;
      setBillItems(updatedItems);
    } else {
      // Add new item if it doesn't exist
      setBillItems([
        ...billItems,
        {
          id: Math.random().toString(36).substring(2, 9),
          menuItem,
          quantity: itemQuantity,
        },
      ]);
    }

    // Reset selection
    setSelectedMenuItem("");
    setItemQuantity(1);
    toast.success("Item added to bill");
  };

  const handleRemoveItem = (id: string) => {
    setBillItems(billItems.filter((item) => item.id !== id));
  };

  const handleCreateBill = () => {
    if (billItems.length === 0) {
      toast.error("Please add items to the bill");
      return;
    }

    // In a real app, you would save the bill to your backend
    toast.success(`Bill for Table ${tableNumber} created successfully`);
    
    // Reset bill state
    setBillItems([]);
    setTableNumber("1");
  };

  const handlePrintBill = () => {
    if (billItems.length === 0) {
      toast.error("Please add items to the bill");
      return;
    }

    toast.success("Printing bill...");
    // In a real app, you would implement print functionality
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Bill</CardTitle>
          <CardDescription>Add items to customer bill</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="table">Table Number</Label>
            <Input
              id="table"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Table number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="menuItem">Menu Item</Label>
            <select
              id="menuItem"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedMenuItem}
              onChange={(e) => setSelectedMenuItem(e.target.value)}
            >
              <option value="">Select an item</option>
              {sampleMenuItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - ${item.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          <Button onClick={handleAddItem} className="w-full">
            Add to Bill
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bill Summary</CardTitle>
          <CardDescription>Table {tableNumber}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {billItems.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No items added to bill yet
            </p>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                {billItems.map((item) => (
                  <div key={item.id} className="bill-item">
                    <div className="col-span-2">{item.menuItem.name}</div>
                    <div className="text-center">{item.quantity}</div>
                    <div className="text-right flex justify-between items-center">
                      <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            onClick={handleCreateBill}
            className="flex-1"
            disabled={billItems.length === 0}
          >
            Create Bill
          </Button>
          <Button
            variant="outline"
            onClick={handlePrintBill}
            className="flex-1"
            disabled={billItems.length === 0}
          >
            Print
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
