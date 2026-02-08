import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./Router";
import TanstackProvider from "./QueryClientProvider.jsx";
import { AuthProvider } from "./context/AuthContext";


createRoot(document.getElementById("root")).render(
  <AuthProvider>
      <TanstackProvider>
        <Router />
      </TanstackProvider>
    </AuthProvider>
);
