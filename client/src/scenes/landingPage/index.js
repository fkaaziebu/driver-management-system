import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import "App.css";
import AdminLoginPage from "scenes/adminLoginPage";
import DriverLoginPage from "scenes/driverLoginPage";
import { Link } from "react-router-dom"

function LandingPage() {
    const theme = useTheme(); // Getting the current theme object
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Setting a boolean variable based on the media query

  return (
    
    <div className="landing-page">
    <h1 className="heading">Driver Management System</h1>
    <p className="subheading">Please select your role:</p>
    <div className="button-container">
      <Link className="admin-button" to="/admin/auth">
        Administrator
      </Link>
      <Link className="driver-button" to="/driver/auth">
        Driver
      </Link>
    </div>
  </div>
  );
}

export default LandingPage;
