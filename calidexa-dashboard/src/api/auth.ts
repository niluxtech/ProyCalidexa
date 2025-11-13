import type { LoginCredentials, LoginResponse, User } from '../types';
import axios from './axios';


export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await axios.post<LoginResponse>('/login', credentials);
    return data;
  },

  logout: async (): Promise<{ message: string }> => {
    const { data } = await axios.post<{ message: string }>('/logout');
    return data;
  },

  me: async (): Promise<{ user: User }> => {
    const { data } = await axios.get<{ user: User }>('/me');
    return data;
  },
};
