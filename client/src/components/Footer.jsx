import { Box } from "@mui/material";
import React from "react";
import MinOfTransport from "../assets/min-of-transport.png";
import ToyotaLogo from "../assets/toyota.png";

function Footer() {
  return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "200px" }}>
    <Box 
    component="img"
    src={MinOfTransport}
    alt="Ministry of transport"
    sx={{width: "10rem", height: "5rem"}}
    />
    <Box 
    component="img"
    src={ToyotaLogo}
    alt="Ministry of transport"
    sx={{width: "10rem", height: "5rem"}}
    />
  </Box>;
}

export default Footer;
