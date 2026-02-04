import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import InstructorPage from "./pages/InstructorPage";
import App from "./App";


export const Router = () => {
  const router = createBrowserRouter([
    // עמוד התחברות – בלי Layout
    {
      path: "/auth",
      element: <AuthPage />,
    },

    // כל שאר האתר – עם Layout
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/courses",
          element: <CoursesPage />,
        },
        {
          path: "/instructors",
          element: <InstructorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
