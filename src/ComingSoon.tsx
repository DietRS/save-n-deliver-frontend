import React from "react";
import { Box, Typography } from "@mui/material";

const ComingSoon: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Typography variant="h2" color="primary" gutterBottom>
        🚀 Coming Soon
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        We are working hard to bring you something amazing. Stay tuned!
      </Typography>
    </Box>
  );
};

export default ComingSoon;
