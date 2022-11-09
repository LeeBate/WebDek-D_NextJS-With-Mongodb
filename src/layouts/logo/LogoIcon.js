import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/CALLLAB.png";

const LogoIcon = () => {
  return (
    <Link href="/">
      <div className="items-center">
      <img className="w-36 h-15 " src="/images/LOGO.png"/>
     
      </div>
    </Link>
  );
};

export default LogoIcon;
