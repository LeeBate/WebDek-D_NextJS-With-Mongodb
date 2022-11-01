import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/CALLLAB.png";

const LogoIcon = () => {
  return (
    <Link href="/">
      <div className="flex items-center">
      <img className="w-10 h-10 " src="/favicon.ico"/>
      <div className="text-black ml-2">CALLLAB</div>
      </div>
    </Link>
  );
};

export default LogoIcon;
