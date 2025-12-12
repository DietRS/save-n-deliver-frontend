import React from "react";
import { Product } from "../../types/Product";

const ItemSearch: React.FC<{
  query: string;
  results: Product[];
  onAdd: (item: Product) => void;
}> = ({ query, results, onAdd }) => {
  return (
    <div style={{ padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
      <h3 style={{ marginTop: 0 }}>Results {query ? `for "${query}"` : ""}</h3>
      {results.length === 0 ? (
        <p style={{ opacity: 0.8 }}>No results yet. Search above.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {results.map((p) => (
            <div key={`${p.id}-${p.chain}`} style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{p.name}</div>
                  <div style={{ opacity: 0.9 }}>{p.chain}</div>
                </div>
                <div style={{ fontWeight: 900, color: "#00f5a0" }}>${p.price.toFixed(2)}</div>
              </div>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => onAdd(p)} style={btnAdd}>Add</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const card: React.CSSProperties = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid rgba(230, 59, 59, 0.1)",
  background: "rgba(255,255,255,0.04)"
};
const btnAdd: React.CSSProperties = {
  background: "#00d7ff",
  color: "#02181d",
  border: "none",
  borderRadius: 8,
  padding: "8px 10px",
  fontWeight: 800,
  cursor: "pointer",
};

export default ItemSearch;
