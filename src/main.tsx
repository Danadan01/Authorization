import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="507033468959-jf40qctcnj4hk44lprvfthlhooecdppo.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
       <App />
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
