import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignInPage from "../pages/sign-in-page";
import RegisterPage from "../pages/register-page";
import HomePage from "../pages/Home/home-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
