import * as React from "react";
import "./bootswatch/css/bootstrap.css";
import App from "./components/App";
import "./main.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (container !== null) {
  createRoot(container).render(<App />);
}
