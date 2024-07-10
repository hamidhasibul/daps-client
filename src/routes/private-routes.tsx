import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  return accessToken ? (
    <>{children}</>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
