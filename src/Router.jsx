import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";


export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
    },
    {
      path: "/register",
      Component: RegisterForm,
    },
      {
      path: "/login",
      Component: LoginForm,
    },
  ]);

  return <RouterProvider router={router} />;
};
