import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { bootstrapTheme } from "./lib/theme";
import "./theme.css";

// Apply the saved theme synchronously before React boots so the first
// paint is already correct (no light-to-dark flicker).
bootstrapTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
