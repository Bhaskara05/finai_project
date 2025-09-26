import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize i18n here to catch any initialization errors
import "./i18n";

createRoot(document.getElementById("root")!).render(<App />);
