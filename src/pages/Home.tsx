import React, { useEffect, useMemo, useState } from "react";
import ItemSearch from "../components/Results/ItemSearch";
import SaverList from "../components/Order/SaverList";
import { Product, BasketItem } from "../types/Product";   // <-- FIXED IMPORT
import { searchCompetitive } from "../api/stores";

type Props = {
  saverList: BasketItem[];
  setSaverList: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  onCheckout: () => void;
  onNewOrder: () => void;
};

const Home: React.FC<Props> = ({ saverList, setSaverList, onCheckout, onNewOrder }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(async () => {
      const q = searchQuery.trim();
      if (q.length < 2) {
        setResults([]);
        return;
      }
      try {
        const competitive = await searchCompetitive(q);
        setResults(competitive.sort((a, b) => a.price - b.price));
      } catch {
        setResults([]);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Add item (always starts at quantity 1)
  const handleAdd = (item: Product) => {
    setSaverList((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.chain === item.chain);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.chain === item.chain
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleIncrease = (id: string) =>
    setSaverList((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );

  const handleDecrease = (id: string) =>
    setSaverList((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      )
    );

  const handleRemove = (id: string) =>
    setSaverList((prev) => prev.filter((i) => i.id !== id));

  return (
    <div style={{ padding: 24 }}>
      {/* Search input */}
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Search for an item (e.g., Apple, Milk, Bread)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "#101111ff",
            padding: "12px 14px",
            fontSize: 16,
          }}
        />
      </div>

      {/* Results + SaverList */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
        <ItemSearch query={searchQuery} results={results} onAdd={handleAdd} />
        <div>
          <SaverList
            items={saverList}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
          {saverList.length > 0 && (
            <button style={btnCheckout} onClick={onCheckout}>
              Proceed to checkout
            </button>
          )}
        </div>
      </div>

      {/* Start New Order button */}
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <button style={btnNewOrder} onClick={onNewOrder}>
          Start New Order
        </button>
      </div>
    </div>
  );
};

const btnCheckout: React.CSSProperties = {
  marginTop: 12,
  width: "100%",
  background: "#8a2be2",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 14px",
  fontWeight: 800,
  cursor: "pointer",
};
const btnNewOrder: React.CSSProperties = {
  background: "#00d9ffff",
  color: "#02181d",
  border: "none",
  borderRadius: 10,
  padding: "14px 18px",
  fontWeight: 900,
  cursor: "pointer",
};

export default Home;
