import React from "react";
import { Box, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box sx={{ p: 2, textAlign: "center"}}>
      <Typography>
        © {new Date().getFullYear()} All rights reserved by{" "}
 
          <a>CALLLAB</a>
      </Typography>
    </Box>
  );
};

export default Footer;
