import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./Router";
import TanstackProvider from "./QueryClientProvider.jsx";

createRoot(document.getElementById("root")).render(
  <TanstackProvider>
    <Router />
  </TanstackProvider>,
);
