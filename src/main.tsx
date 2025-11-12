import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "keyrune/css/keyrune.css";
import "mana-font/css/mana.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
