import { Droplets, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-poolarize-primary" />
              <span className="font-bold text-lg gradient-text">Poolarize</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A Virtual Liquidity AMM Protocol for Capital-Efficient Token Swaps
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-poolarize-primary"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-poolarize-primary"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Protocol</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/swap"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-poolarize-primary"
                >
                  Swap
                </Link>
              </li>
              <li>
                <Link
                  to="/pools"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-poolarize-primary"
                >
                  Pools
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-poolarize-primary"
                >
                  Statistics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-poolarize-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-poolarize-primary"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-poolarize-primary"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-poolarize-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-poolarize-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Poolarize. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
