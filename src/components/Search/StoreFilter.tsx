import React, { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";

type Props = {
  city: string;
  province: string;
  onSelect: (store?: string) => void;
};

const StoreFilter: React.FC<Props> = ({ city, province, onSelect }) => {
  const [stores, setStores] = useState<string[]>([]);

  useEffect(() => {
    // For now, hardcoded stores — later we’ll fetch from backend
    setStores(["Safeway", "Walmart", "Superstore", "Costco"]);
  }, [city, province]);

  return (
    <TextField
      select
      label="Filter by store"
      onChange={(e) => onSelect(e.target.value || undefined)}
      sx={{ minWidth: 200 }}
    >
      <MenuItem value="">All stores</MenuItem>
      {stores.map((s) => (
        <MenuItem key={s} value={s}>
          {s}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default StoreFilter;
