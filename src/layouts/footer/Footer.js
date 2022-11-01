import React from "react";
import { Box, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center",bgcolor: 'primary.main',}}>
      <Typography>
        © 2022 All rights reserved by{" "}
 
          <a>CALLLAB</a>
      </Typography>
    </Box>
  );
};

export default Footer;
