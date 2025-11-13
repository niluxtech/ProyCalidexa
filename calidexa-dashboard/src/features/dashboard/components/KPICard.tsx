import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../../../components/ui";

interface KPICardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const KPICard = ({ title, value, icon: Icon, color, bgColor }: KPICardProps) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`rounded-full ${bgColor} p-3`}>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );
};