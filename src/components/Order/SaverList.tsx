import React, { useMemo } from "react";
import { BasketItem } from "../../types/Product";

const SaverList: React.FC<{
  items: BasketItem[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}> = ({ items, onIncrease, onDecrease, onRemove }) => {
  // Group by store
  const grouped = useMemo(() => {
    const map = new Map<string, BasketItem[]>();
    items.forEach((i) => {
      const arr = map.get(i.chain) || [];
      arr.push(i);
      map.set(i.chain, arr);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  return (
    <div style={{ padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.06)" }}>
      <h3 style={{ marginTop: 0 }}>SaverList</h3>
      {items.length === 0 ? (
        <p style={{ opacity: 0.8 }}>No items yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {grouped.map(([chain, list]) => (
            <div key={chain}>
              <h4 style={{ margin: "8px 0" }}>{chain}</h4>
              {list.map((i) => (
                <div key={`${i.id}-${i.chain}`} style={row}>
                  <div style={{ fontWeight: 700 }}>{i.name}</div>
                  <div>${(i.price * i.quantity).toFixed(2)}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onDecrease(i.id)} style={btnSm}>-</button>
                    <div style={{ minWidth: 24, textAlign: "center" }}>{i.quantity}</div>
                    <button onClick={() => onIncrease(i.id)} style={btnSm}>+</button>
                    <button onClick={() => onRemove(i.id)} style={btnDel}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const row: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 0.6fr auto",
  alignItems: "center",
  gap: 8,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.1)"
};
const btnSm: React.CSSProperties = {
  background: "#00f5a0",
  color: "#09d6ffff",
  border: "none",
  borderRadius: 6,
  padding: "6px 8px",
  fontWeight: 800,
  cursor: "pointer",
};
const btnDel: React.CSSProperties = {
  background: "transparent",
  color: "#ff597a",
  border: "1px solid #ff597a",
  borderRadius: 6,
  padding: "6px 8px",
  cursor: "pointer",
};

export default SaverList;
