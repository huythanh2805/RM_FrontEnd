import { Toaster } from "@/components/ui/toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import io from 'socket.io-client';
import "./app.css";
import { CartProvider } from "./contexts/CartProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import "./index.css";
import router from "./routers/RootRoute";
import { ServerUrl } from "./utilities/utils";
export const socket = io.connect(ServerUrl);

const clientID = "1034244549008-5hm8ddao395soh8ebcgpcj3q1tl9q83f.apps.googleusercontent.com";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>

    <GoogleOAuthProvider clientId={clientID}>
      <CartProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </CartProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);
