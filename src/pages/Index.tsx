
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Utensils } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Utensils className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-primary">Tasty Bill</h1>
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight">
          Simple Restaurant Billing System
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Manage your restaurant operations with ease. Create orders, generate bills, 
          and track your business performance all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate("/login")} size="lg">
            Log In
          </Button>
          <Button onClick={() => navigate("/signup")} variant="outline" size="lg">
            Sign Up
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-2">Menu Management</h3>
            <p className="text-muted-foreground">
              Easily add, edit and organize your restaurant menu items by categories.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-2">Bill Generation</h3>
            <p className="text-muted-foreground">
              Create and print professional bills for your customers with just a few clicks.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-2">Sales Analytics</h3>
            <p className="text-muted-foreground">
              Track your restaurant's performance with detailed reports and analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
