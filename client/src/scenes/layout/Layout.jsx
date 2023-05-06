import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { Box } from "@mui/material";

function Layout() {
  return (
    <Box sx={{ position: "relative" }}>
      <Navbar />
      <Box sx={{ display: "flex", alignItems: "flex-end", padding: "0 5rem", height: "100vh" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
