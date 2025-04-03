import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  virtualValue?: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

const StatCard = ({
  title,
  value,
  virtualValue,
  description,
  icon,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {virtualValue ? (
            <>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs bg-ocean-blue/10 text-ocean-blue px-2 py-0.5 rounded-full">
                  Actual
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-medium text-muted-foreground">
                  {virtualValue}
                </div>
                <div className="text-xs bg-magenta-pink/10 text-magenta-pink px-2 py-0.5 rounded-full">
                  Virtual
                </div>
              </div>
            </>
          ) : (
            <div className="text-2xl font-bold">{value}</div>
          )}
          {description && (
            <p
              className={cn(
                "text-xs text-muted-foreground mt-1",
                trend === "up" && "text-green-500",
                trend === "down" && "text-red-500",
              )}
            >
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
