import reactLogo from "@/assets/react.svg";
import GuestbookSigner from "@/components/guestbook/signer";
import Messages from "@/components/guestbook/messages";
import SignIn from "@/components/sign-in";
import { useWallet } from "@/contexts/near";
import { createFileRoute } from "@tanstack/react-router";
import nearLogo from "/near-logo.svg";
import nearLogoWhite from "/near-logo-white.svg";
import viteLogo from "/vite.svg";
import { useTheme } from "@/components/ui/theme-provider";
import Swapper from "@/components/swapper";

export const Route = createFileRoute("/")({
  component: HomePage
});

export default function HomePage() {
  const { signedAccountId } = useWallet();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen">
   
       <Swapper />

    </div>
  );
}
