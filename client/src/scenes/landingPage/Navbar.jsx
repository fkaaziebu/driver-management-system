import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="flex justify-between items-center h-24 px-7 max-w-[1240px] mx-auto text-green">
      <h1 className="w-full text-3xl font-bold text-[#0f261f]">DMS-Sys</h1>
      <ul className="hidden md:flex">
        <li className="p-4">Home</li>
        <li className="p-4">Login</li>
      </ul>
      <div onClick={handleNav} className='"block md:hidden"'>
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed top-0 left-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#0f261f] m-8">
          DMS-Sys
        </h1>
        <ul className="uppercase p-4 ">
          <li className="p-4 border-b">Home</li>
          <li className="p-4 border-b">Login</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
