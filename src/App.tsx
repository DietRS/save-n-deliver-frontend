import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import Login from "./components/Auth/Login";
import Navbar from "./components/Layout/Navbar";
import Hero from "./components/Layout/Hero";
import { BasketItem } from "./types/Product";

// Define available routes
export type Route = "home" | "checkout" | "login";

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>("home");
  const [saverList, setSaverList] = useState<BasketItem[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Load persisted state once on mount
  useEffect(() => {
    const savedBasket = localStorage.getItem("saverList");
    if (savedBasket) {
      try {
        setSaverList(JSON.parse(savedBasket));
      } catch {
        console.error("Invalid basket data in localStorage");
        localStorage.removeItem("saverList");
      }
    }

    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) setUserEmail(savedEmail);

    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // Persist basket whenever it changes
  useEffect(() => {
    localStorage.setItem("saverList", JSON.stringify(saverList));
  }, [saverList]);

  // Clear basket + reset route
  const handleNewOrder = () => {
    setSaverList([]);
    localStorage.removeItem("saverList");
    setRoute("home");
  };

  // Handle login success
  const handleLoginSuccess = (newToken: string, email: string) => {
    setToken(newToken);
    setUserEmail(email);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userEmail", email);
    setRoute("home");
  };

  return (
    <div>
      <Navbar onNav={setRoute} email={userEmail} />
      <Hero />

      {route === "home" && (
        <Home
          saverList={saverList}
          setSaverList={setSaverList}
          onCheckout={() => setRoute("checkout")}
          onNewOrder={handleNewOrder}
        />
      )}

      {route === "checkout" && (
        <CheckoutPage
          items={saverList}
          userEmail={userEmail}
          onBack={() => setRoute("home")}
          onNewOrder={handleNewOrder}
        />
      )}

      {route === "login" && (
        <Login
          onSuccess={handleLoginSuccess}
          onCancel={() => setRoute("home")}
        />
      )}
    </div>
  );
};

export default App;
