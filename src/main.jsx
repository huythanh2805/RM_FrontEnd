import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./app.css";
import "./index.css";
import router from "./routers/RootRoute";
const clientID = "1034244549008-5hm8ddao395soh8ebcgpcj3q1tl9q83f.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientID}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
    ,
  </GoogleOAuthProvider>
);
