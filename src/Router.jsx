import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import RegisterForm from "./components/RegisterForm";
import AuthPage from "./pages/AuthPage";

import LoginForm from "./components/LoginForm";
import CoursesPage from "./pages/CoursesPage";
import InstructorPage from "./pages/InstructorPage";


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
       {
      path: "/instructors",
      Component: InstructorPage,
    },
  ]);

  return <RouterProvider router={router} />;
};
