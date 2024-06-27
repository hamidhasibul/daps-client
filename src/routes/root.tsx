import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignInPage from "../pages/sign-in-page";
import RegisterPage from "../pages/register-page";
import HomePage from "../pages/Home/home-page";
import PrivateRoutes from "./private-routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <App />
      </PrivateRoutes>
    ),
    children: [{ path: "", element: <HomePage /> }],
  },
  {
    path: "/login",
    element: <SignInPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
