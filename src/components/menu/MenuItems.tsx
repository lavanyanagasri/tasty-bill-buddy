
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Sample menu categories and items
const initialMenuItems = [
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

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

export function MenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [newMenuItem, setNewMenuItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    category: "mains",
    description: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newItem: MenuItem = {
      ...newMenuItem,
      id: Math.random().toString(36).substring(2, 9),
    };

    setMenuItems([...menuItems, newItem]);
    setNewMenuItem({
      name: "",
      price: 0,
      category: "mains",
      description: "",
    });
    setIsDialogOpen(false);
    toast.success("Menu item added successfully");
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    toast.success("Menu item deleted");
  };

  const categories = ["starters", "mains", "sides", "desserts", "drinks"];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
              <DialogDescription>
                Create a new item for your restaurant menu
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMenuItem.name}
                  onChange={(e) =>
                    setNewMenuItem({ ...newMenuItem, name: e.target.value })
                  }
                  placeholder="Item name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newMenuItem.price || ""}
                  onChange={(e) =>
                    setNewMenuItem({
                      ...newMenuItem,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0.00"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newMenuItem.category}
                  onChange={(e) =>
                    setNewMenuItem({ ...newMenuItem, category: e.target.value })
                  }
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newMenuItem.description}
                  onChange={(e) =>
                    setNewMenuItem({
                      ...newMenuItem,
                      description: e.target.value,
                    })
                  }
                  placeholder="Brief description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddMenuItem}>
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Menu Items</CardTitle>
              <CardDescription>
                Manage all items across categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="menu-item"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">${item.price.toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMenuItem(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </CardTitle>
                <CardDescription>
                  Manage {category} menu items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="menu-item"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${item.price.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMenuItem(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  {menuItems.filter((item) => item.category === category).length === 0 && (
                    <p className="text-center py-4 text-muted-foreground">
                      No items in this category
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
