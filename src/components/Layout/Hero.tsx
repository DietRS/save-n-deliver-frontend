import React from "react";
//import LogoBurst from "./LogoBurst";

//<LogoBurst size={80} style={{ marginBottom: 16 }} />

const Hero: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px 24px",
        background:
          "linear-gradient(135deg, rgba(0,215,255,0.15), rgba(138,43,226,0.15))",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Left side: animated logo + tagline */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div>
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: 1,
              color: "#00d7ff",
              textShadow: "0 0 12px rgba(0,215,255,0.6)",
              }}
          >
            Compare. Save. Deliver.
          </h1>
          <p style={{ marginTop: 8, opacity: 0.85,  }}>
            Real‑time prices from your favorite stores —
            all in one place.
          </p>
        </div>
      </div>

      {/* Right side: playful gradient block */}
      <div
        style={{
          width: 180,
          height: 120,
          borderRadius: 16,
          background:
            "radial-gradient(circle at 30% 30%, #00f5d4ff, #7a2be2ff, #00d7ff)",
          boxShadow: "0 0 24px rgba(138,43,226,0.4)",
          animation: "pulse 2s ease-in-out infinite",
        }}
      />
    </div>
  );
};

export default Hero;
