import React, { useMemo, useState } from "react";
import { BasketItem } from "../../types/Product";
import { submitOrder } from "../../api/orders";

const CheckoutPage: React.FC<{
  items: BasketItem[];
  userEmail: string | null;
  onBack: () => void;
  onNewOrder: () => void;
}> = ({ items, userEmail, onBack, onNewOrder }) => {
  const [submitting, setSubmitting] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, BasketItem[]>();
    items.forEach((i) => {
      const arr = map.get(i.chain) || [];
      arr.push(i);
      map.set(i.chain, arr);
    });
    return Array.from(map.entries());
  }, [items]);

  const grandTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const handleSubmitOrder = async () => {
    try {
      if (!userEmail) {
        alert("Please login first.");
        return;
      }
      setSubmitting(true);
      await submitOrder(items, userEmail);
      alert("Order submitted! Confirmation email sent.");
      onNewOrder();
    } catch {
      alert("Error submitting order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginTop: 0 }}>Checkout</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {grouped.map(([chain, list]) => {
          const subtotal = list.reduce((s, i) => s + i.price * i.quantity, 0);
          return (
            <div key={chain} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 12 }}>
              <h3 style={{ marginTop: 0 }}>{chain} Receipt</h3>
              <div style={{ display: "grid", gap: 6 }}>
                {list.map((i) => (
                  <div key={`${i.id}-${i.chain}`} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{i.name} × {i.quantity}</span>
                    <span>${(i.price * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, fontWeight: 800 }}>Subtotal: ${subtotal.toFixed(2)}</div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 16, fontWeight: 900, fontSize: 18 }}>
        Final total: ${grandTotal.toFixed(2)}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button onClick={onBack} style={btnGhost}>Back to shopping</button>
        <button onClick={onNewOrder} style={btnDanger}>Start new order</button>
        <button onClick={handleSubmitOrder} disabled={submitting} style={btnPrimary}>
          {submitting ? "Submitting..." : "Submit Order"}
        </button>
      </div>
    </div>
  );
};

const btnPrimary: React.CSSProperties = {
  background: "#00d7ff",
  color: "#02181d",
  border: "none",
  borderRadius: 8,
  padding: "10px 12px",
  fontWeight: 800,
  cursor: "pointer",
};
const btnDanger: React.CSSProperties = {
  background: "#ff597a",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 12px",
  fontWeight: 800,
  cursor: "pointer",
};
const btnGhost: React.CSSProperties = {
  background: "transparent",
  color: "#eaf7fb",
  border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: 8,
  padding: "10px 12px",
  cursor: "pointer",
};

export default CheckoutPage;
