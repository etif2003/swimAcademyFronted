import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import CoursesPage from "./pages/CoursesPage";
// import InstructorCard from "./components/Instructors/InstructorCard";


export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
    },
    {
      path: "/auth?mode=signup",//"/register",
      Component: RegisterForm,
    },
    {
      path: "/auth",// "/login",
      Component: LoginForm,
    },
    {
      path: "/courses",
      Component: CoursesPage,
    },
  ]);

  return <RouterProvider router={router} />;
};
