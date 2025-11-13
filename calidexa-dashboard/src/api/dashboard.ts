import type { DashboardKPIs } from '../types';
import axios from './axios';


export const dashboardService = {
  getKPIs: async (): Promise<DashboardKPIs> => {
    const { data } = await axios.get<DashboardKPIs>('/dashboard');
    return data;
  },
};