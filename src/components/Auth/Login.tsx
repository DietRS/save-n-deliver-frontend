import React, { useState } from "react";
import client from "../../api/client";
import { LoginResponse } from "../../types/Auth";

type Props = {
  onSuccess: (token: string, email: string) => void;
  onCancel: () => void;
};

const Login: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // ✅ Typed response
      const { data } = await client.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      if (data.ok && data.token && data.email) {
        onSuccess(data.token, data.email);
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={form}>
        <h2 style={{ marginBottom: 16 }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
          required
        />

        {error && <div style={errorBox}>{error}</div>}

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button type="submit" style={btnPrimary} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button type="button" style={btnSecondary} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Styles ---
const container: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
};

const form: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  padding: 24,
  borderRadius: 12,
  width: 320,
  display: "flex",
  flexDirection: "column",
};

const input: React.CSSProperties = {
  marginBottom: 12,
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.1)",
  color: "#eaf7fb",
  fontSize: 14,
};

const btnPrimary: React.CSSProperties = {
  flex: 1,
  background: "#00d7ff",
  color: "#02181d",
  border: "none",
  borderRadius: 8,
  padding: "10px 12px",
  fontWeight: 700,
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  flex: 1,
  background: "transparent",
  color: "#00d7ff",
  border: "1px solid #00d7ff",
  borderRadius: 8,
  padding: "10px 12px",
  fontWeight: 700,
  cursor: "pointer",
};

const errorBox: React.CSSProperties = {
  background: "rgba(255,0,0,0.2)",
  color: "#ff8080",
  padding: "8px 10px",
  borderRadius: 6,
  marginBottom: 12,
  fontSize: 13,
};

export default Login;
