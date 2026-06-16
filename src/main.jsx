import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AdminProvider>
          <CartProvider>
            <WishlistProvider>

              <App />

              <Toaster
                position="top-right"
                containerStyle={{ top: 72, right: 16 }}
                toastOptions={{
                  duration: 2500,
                  style: {
                    borderRadius: "12px",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontWeight: "500",
                    padding: "12px 16px",
                    fontSize: "14px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  },
                }}
              />

            </WishlistProvider>
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((err) => {
      console.error("Service worker registration failed:", err);
    });
  });
}
