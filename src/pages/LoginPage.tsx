
import { LoginForm } from "@/components/auth/LoginForm";
import { Utensils } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
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
      <div className="flex items-center gap-2 mb-8">
        <Utensils className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Tasty Bill</h1>
      </div>
      <LoginForm />
      <p className="mt-8 text-sm text-muted-foreground">
        Demo account: use any email with password "password"
      </p>
    </div>
  );
}
