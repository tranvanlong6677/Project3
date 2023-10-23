import { Navigate, Outlet } from "react-router-dom";
import { routesObj } from "../utils/routes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoutes = (): any => {
  const user: string | null = localStorage.getItem("access_token");
  return user === null ? <Navigate to={routesObj.login} /> : <Outlet />;
};

export default ProtectedRoutes;
