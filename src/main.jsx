import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { initTracking, trackEvent } from "./utils/tracking.js";

initTracking();
trackEvent("page_view_custom", { page: "home", brand: "MAPS - Medical Advanced Portfolio Solution" });

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
