import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthPage from "./pages/AuthPage";
import CoursesPage from "./pages/CoursesPage";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
    },
    {
      path: "/auth",
      Component: AuthPage,
    },
    {
      path: "/courses",
      Component: CoursesPage,
    },
  ]);

  return <RouterProvider router={router} />;
};
