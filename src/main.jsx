import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";  // global css
// import "./App.css";    // component css

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
