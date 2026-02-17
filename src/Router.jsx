import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import AuthPage from "./pages/AuthPage";
import CoursesPage from "./pages/CoursesPage";
import InstructorPage from "./pages/InstructorPage";
import SchoolPage from "./pages/SchoolPage";
import SingleSchoolPage from "./pages/SingleSchoolPage";

import App from "./App";
import ProfilePage from "./pages/ProfilePage";
import SingleInstructorPage from "./pages/SingleInstructorPage";
import SingleCoursePage from "./pages/SingleCoursePage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import AboutPage from "./pages/AboutPage";

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
          path: "/dashboard",
          element: <ProfilePage />,
        },

        {
          path: "/school/:id",
          element: <SingleSchoolPage />,
        },

        {
          path: "/instructor/:id",
          element: <SingleInstructorPage />,
        },

        {
          path: "/course/:id",
          element: <SingleCoursePage />,
        },

        {
          path: "/about",
          element: <AboutPage />,
        },

        {
          path: "/terms",
          element: <TermsPage />,
        },

        {
          path: "/privacy",
          element: <PrivacyPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
