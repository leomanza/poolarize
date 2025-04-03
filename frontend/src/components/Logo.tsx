import { CircleDollarSign, Orbit } from "lucide-react";

interface LogoProps {
  variant?: "icon" | "full";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ variant = "full", size = "lg", className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const centerSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Orbit - Thin for balance */}
        <Orbit
          className={`${sizeClasses[size]} text-poolarize-primary`}
          strokeWidth={1.5}
        />

        {/* Dollar Sign - Filled with accent color and white stroke */}
        <CircleDollarSign
          className={`absolute inset-0 m-auto ${centerSize[size]}`}
          fill="url(#gold-gradient)" // Custom gold gradient
          stroke="white"
          strokeWidth={1.5}
        />
        {/* SVG Gradient for a gold-like effect */}
        <svg width="0" height="0">
          <linearGradient
            id="gold-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop stopColor="#FFD700" offset="0%" /> {/* Gold */}
            <stop stopColor="#FFB800" offset="50%" />
            <stop stopColor="#FFA500" offset="100%" /> {/* Deep golden */}
          </linearGradient>
        </svg>
      </div>

      {/* Poolarize Text */}
      {variant === "full" && (
        <span
          className={`font-bold ${size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"} gradient-text`}
        >
          Poolarize
        </span>
      )}
    </div>
  );
};

export default Logo;
