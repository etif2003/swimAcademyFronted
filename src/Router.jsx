import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";


export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: App,
    },
  ]);

  return <RouterProvider router={router} />;
};
