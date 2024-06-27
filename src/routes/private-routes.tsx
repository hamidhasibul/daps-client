import useStore from "@/store";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useStore();
  const location = useLocation();
  return accessToken ? (
    <>{children}</>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
