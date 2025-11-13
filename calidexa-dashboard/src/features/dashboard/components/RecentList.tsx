import { es } from "date-fns/locale/es";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";


interface RecentItem {
  id: number;
  title: string;
  subtitle?: string;
  date: string;
}

interface RecentListProps {
  title: string;
  items: RecentItem[];
  emptyMessage?: string;
}

export const RecentList = ({ title, items, emptyMessage = 'No hay registros' }: RecentListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-4">{emptyMessage}</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  {item.subtitle && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                    locale: es,
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};