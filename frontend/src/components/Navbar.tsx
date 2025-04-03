import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-poolarize-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/swap"
            className="text-sm font-medium hover:text-poolarize-primary transition-colors"
          >
            Swap
          </Link>
          <Link
            to="/pools"
            className="text-sm font-medium hover:text-poolarize-primary transition-colors"
          >
            Pools
          </Link>
          <Link
            to="/create-pool"
            className="text-sm font-medium hover:text-poolarize-primary transition-colors"
          >
            <div className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>New Pool</span>
            </div>
          </Link>
          <Button
            variant="default"
            size="sm"
            className="bg-poolarize-primary hover:bg-poolarize-secondary"
          >
            Connect Wallet
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-6 space-y-4 bg-white dark:bg-gray-900 shadow-md">
          <Link
            to="/"
            className="block py-2 text-sm font-medium hover:text-poolarize-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/swap"
            className="block py-2 text-sm font-medium hover:text-poolarize-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Swap
          </Link>
          <Link
            to="/pools"
            className="block py-2 text-sm font-medium hover:text-poolarize-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pools
          </Link>
          <Link
            to="/create-pool"
            className="block py-2 text-sm font-medium hover:text-poolarize-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>New Pool</span>
            </div>
          </Link>
          <Link
            to="/about"
            className="block py-2 text-sm font-medium hover:text-poolarize-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Button
            variant="default"
            size="sm"
            className="w-full bg-poolarize-primary hover:bg-poolarize-secondary"
          >
            Connect Wallet
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
