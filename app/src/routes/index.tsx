import { createFileRoute } from "@tanstack/react-router";
import { useWallet } from "@/contexts/near";
import { useTheme } from "@/components/ui/theme-provider";
import { PoolDashboard } from "@/components/PoolDashboard";
import { Loader } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage
});

export default function HomePage() {
  const { signedAccountId } = useWallet();
  const { theme } = useTheme();

  if (!signedAccountId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Welcome to Poolarize</h1>
          <p className="mb-8 text-gray-600">Please sign in to continue</p>
          {/* Add your sign-in component here */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PoolDashboard />
    </div>
  );
}
