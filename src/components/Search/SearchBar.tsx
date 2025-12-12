import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import StoreFilter from "./StoreFilter";

type Props = {
  city: string;
  province: string;
  onSearch: (query: string, store?: string) => void;
};

const SearchBar: React.FC<Props> = ({ city, province, onSearch }) => {
  const [query, setQuery] = useState("");
  const [store, setStore] = useState<string | undefined>(undefined);

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 4 }}>
      <TextField
        label="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ minWidth: 240 }}
      />
      <StoreFilter city={city} province={province} onSelect={(s) => setStore(s)} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSearch(query, store)}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
