// src/components/Layout/Navbar.tsx
import React from "react";
import LogoBurst from "./LogoBurst";

type Props = {
  onNav: (route: "home" | "checkout" | "login") => void;
  email: string | null;
};

const Navbar: React.FC<Props> = ({ onNav, email }) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px",
      position: "sticky",
      top: 0,
      background: "rgba(5, 20, 25, 0.7)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      zIndex: 10
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <LogoBurst size={40} />
        <div style={{ fontWeight: 800, letterSpacing: 0.5 }}>SavenDeliver</div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => onNav("home")} style={btn}>Home</button>
        <button onClick={() => onNav("checkout")} style={btn}>Checkout</button>
        <button onClick={() => onNav("login")} style={btnOutline}>{email ? email : "Login"}
        </button>
      </div>
    </div>
  );
};

const btn: React.CSSProperties = {
  background: "#25e6ecff",
  color: "#02181d",
  border: "none",
  borderRadius: 8,
  padding: "8px 12px",
  fontWeight: 700,
  cursor: "pointer",
};
const btnOutline: React.CSSProperties = {
  background: "transparent",
  color: "#00d7ff",
  border: "1px solid #00d7ff",
  borderRadius: 8,
  padding: "8px 12px",
  fontWeight: 700,
  cursor: "pointer",
};

export default Navbar;
