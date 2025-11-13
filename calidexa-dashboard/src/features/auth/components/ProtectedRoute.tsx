import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../store/AuthContext';
import { Loading } from '../../../components/common/Loading';


export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};