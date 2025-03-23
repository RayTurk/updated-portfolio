import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";

import "@fortawesome/fontawesome-free/css/all.min.css";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProvider>
  </BrowserRouter>
);