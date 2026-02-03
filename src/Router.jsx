import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import RegisterForm from "./components/RegisterForm";


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
  ]);

  return <RouterProvider router={router} />;
};
