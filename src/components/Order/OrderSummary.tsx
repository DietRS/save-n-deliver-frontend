import React from "react";
import { Typography, Box } from "@mui/material";
import { BasketItem } from "../../types/Product";

type Props = { items: BasketItem[] };

const OrderSummary: React.FC<Props> = ({ items }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6">Order Summary</Typography>
      <Typography variant="body1">Items: {totalItems}</Typography>
      <Typography variant="body1">Total: ${totalPrice.toFixed(2)}</Typography>
    </Box>
  );
};

export default OrderSummary;
