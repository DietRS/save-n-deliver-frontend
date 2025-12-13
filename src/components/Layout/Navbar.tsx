import React from "react";
import type { Route } from "../../App";
//import LogoBurst from "../Layout/LogoBurst";

//<LogoBurst size={40} />

type Props = {
  onNav: (route: Route) => void;
  email: string | null;
};

const Navbar: React.FC<Props> = ({ onNav, email }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontWeight: 800 }}>SavenDeliver</div>
    </div>
    <div style={{ display: "flex", gap: 10 }}>
      <button onClick={() => onNav("home")}>Home</button>
      <button onClick={() => onNav("checkout")}>Checkout</button>
      <button onClick={() => onNav("login")}>{email ? email : "Login"}</button>
    </div>
  </div>
);

export default Navbar;
