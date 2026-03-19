import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "12px",
          background: "linear-gradient(135deg, #0E5DA8, #3FA9F5)",
          color: "#fff",
          fontWeight: "500",
        },
      }}
    />
  </StrictMode>,
);
