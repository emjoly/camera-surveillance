import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import Appli from "./composants/Appli.jsx";
import "./index.css";

// Create a root and render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Appli />
  </React.StrictMode>
);
