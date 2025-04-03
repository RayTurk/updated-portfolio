import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";

import "@fortawesome/fontawesome-free/css/all.min.css";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <BrowserRouter>
      <ThemeProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </BrowserRouter>
  );
} else {
  createRoot(rootElement).render(
    <BrowserRouter>
      <ThemeProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </BrowserRouter>
  );
}