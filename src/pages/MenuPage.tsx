
import { MenuItems } from "@/components/menu/MenuItems";

export function MenuPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
        <p className="text-muted-foreground">
          Add, edit, and organize your restaurant menu
        </p>
      </div>

      <MenuItems />
    </div>
  );
}
