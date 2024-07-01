import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignInPage from "../pages/sign-in-page";
import RegisterPage from "../pages/register-page";
import HomePage from "../pages/Home/home-page";
import PrivateRoutes from "./private-routes";
import SettingsPage from "@/pages/Settings/settings-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <App />
      </PrivateRoutes>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
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
