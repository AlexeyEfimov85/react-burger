import { Navigate } from "react-router-dom";

export const ProtectedRouteElement = ({ element }) => {
  const token = localStorage.getItem("refreshToken");
  return token ? element : <Navigate to="/login" replace />;
};
