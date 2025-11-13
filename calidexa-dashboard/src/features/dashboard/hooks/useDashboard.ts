import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../../../api/dashboard';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getKPIs,
    staleTime: 30 * 1000,
  });
};