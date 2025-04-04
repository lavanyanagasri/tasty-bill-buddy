
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuthCheck } from "../auth/AuthCheck";

export function AppLayout() {
  const isMobile = useIsMobile();
  
  return (
    <AuthCheck>
      <div className="grid min-h-screen w-full md:grid-cols-[260px_1fr]">
        {!isMobile && <Sidebar />}
        <div className="flex flex-col">
          <AppHeader />
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthCheck>
  );
}
