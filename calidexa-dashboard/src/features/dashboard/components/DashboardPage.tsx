import { Building2, Newspaper, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { KPICard } from './KPICard';
import { RecentList } from './RecentList';
import { Loading } from '../../../components/common';


export const DashboardPage = () => {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error al cargar el dashboard</p>
          <p className="text-sm text-gray-500 mt-2">
            {error instanceof Error ? error.message : 'Error desconocido'}
          </p>
        </div>
      </div>
    );
  }

  const kpis = [
    {
      title: 'Total Empresas',
      value: data?.kpis.total_empresas || 0,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Noticias Publicadas',
      value: data?.kpis.total_noticias || 0,
      icon: Newspaper,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Tickets Pendientes',
      value: data?.kpis.tickets_pendientes || 0,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Tickets Ocupados',
      value: data?.kpis.tickets_ocupados || 0,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Tickets Anulados',
      value: data?.kpis.tickets_anulados || 0,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  // Transformar datos para RecentList
  const recentEmpresas = data?.ultimos_registros.empresas.slice(0, 5).map((empresa) => ({
    id: empresa.id,
    title: empresa.nombre,
    subtitle: `${empresa.nivel} - ${empresa.estado}`,
    date: empresa.created_at,
  })) || [];

  const recentNoticias = data?.ultimos_registros.noticias.slice(0, 5).map((noticia) => ({
    id: noticia.id,
    title: noticia.titulo,
    subtitle: noticia.categoria,
    date: noticia.created_at,
  })) || [];

  const recentTickets = data?.ultimos_registros.tickets.slice(0, 5).map((ticket) => ({
    id: ticket.id,
    title: ticket.codigo_ticket,
    subtitle: `${ticket.empresa?.nombre} - ${ticket.estado}`,
    date: ticket.created_at,
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Resumen general de CalidexA
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Recent Records */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RecentList
          title="Últimas Empresas"
          items={recentEmpresas}
          emptyMessage="No hay empresas registradas"
        />
        <RecentList
          title="Últimas Noticias"
          items={recentNoticias}
          emptyMessage="No hay noticias publicadas"
        />
        <RecentList
          title="Últimos Tickets"
          items={recentTickets}
          emptyMessage="No hay tickets generados"
        />
      </div>
    </div>
  );
};