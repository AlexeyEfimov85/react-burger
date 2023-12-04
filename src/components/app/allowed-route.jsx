import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AllowedRouteElement = ({ element }) => {
  const user = useSelector((store) => store.signInReducer.user);
  const token = localStorage.getItem("refreshToken");
  return !token || !user ? element : <Navigate to="/" replace />;
};
