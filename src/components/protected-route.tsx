import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { Preloader } from './ui/preloader/preloader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);
  const location = useLocation();

  // пока идет проверка авторизации, показывать прелоадер
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // если роут только для неавторизованных, а пользователь авторизован
  if (onlyUnAuth && user) {
    // Перенаправляем откуда пришел или на главную
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  // Еесли роут защищенный и пользователь не авторизован
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};
