import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/CALLLAB.png";

const LogoIcon = () => {
  return (
    <Link href="/">
      <div className="flex items-center">
      <img className="w-20 h-20" src="/favicon.ico" />
      <p className="text-black">CALLLAB</p>
      </div>
    </Link>
  );
};

export default LogoIcon;
