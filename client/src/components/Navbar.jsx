import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import CarRentalIcon from "@mui/icons-material/CarRental";
import SignupRegisterModal from "../components/SignupRegisterModal";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#19A7CE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FlexBetween width="90%" padding="1rem">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <CarRentalIcon sx={{ fontSize: 40 }} />{" "}
          <Box>
            <Typography
              variant="h4"
              sx={{ color: "#fff", fontFamily: "Poppins", fontWeight: "600" }}
            >
              Driver
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "#fff", fontFamily: "Poppins", fontWeight: "600" }}
            >
              Management
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "#fff", fontFamily: "Poppins", fontWeight: "600" }}
            >
              System
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="large"
          sx={{
            fontSize: 20,
            fontFamily: "Poppins",
            fontWeight: "500",
            backgroundColor: "#19A7CE",
            boxShadow: "none",
          }}
          onClick={() => setOpen(true)}
        >
          Login
        </Button>
        <SignupRegisterModal
          open={open}
          setOpen={setOpen}
        />
      </FlexBetween>
    </Box>
  );
}

export default Navbar;
