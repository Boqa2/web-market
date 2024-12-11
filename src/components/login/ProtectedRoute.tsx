import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "../../app/store";
import { ReactNode } from "react";
 type prop = {
    children?: ReactNode
 }

const ProtectedRoute = ({children}:prop) => {
  // Проверяем авторизацию через Redux
  const isAuthenticated = useSelector((state: StoreState) => state.auth.isAuthenticated);

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Если авторизован, рендерим дочерние элементы
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
