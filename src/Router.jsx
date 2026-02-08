import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import AuthPage from "./pages/AuthPage";
import CoursesPage from "./pages/CoursesPage";
import InstructorPage from "./pages/InstructorPage";
import SchoolPage from "./pages/SchoolPage";
import SingleSchoolPage from "./pages/SingleSchoolPage";


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
        {
          path: "/schools",
          element: <SchoolPage />,
        },
               {
          path: "/school/:id",
          element: <SingleSchoolPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
