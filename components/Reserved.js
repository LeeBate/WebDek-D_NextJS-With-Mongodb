import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Reserved() {
  return (
    <footer >
      <Box sx={{ p: 1, textAlign: "center", background: "#1a237e" }}>
        <Typography className="text-white">
          © {new Date().getFullYear()} All rights reserved by {""}
          <Link href="/">
            <a className=" hover:text-gray-300">CALLLAB</a>
          </Link>
        </Typography>
      </Box>
    </footer>
  );
}