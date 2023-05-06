import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import CarRentalIcon from "@mui/icons-material/CarRental";
import axios from "axios";
import { useForm } from "react-hook-form";

const SignupRegisterModal = ({ open, setOpen, submitLoginData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={handleSubmit(submitLoginData)}>
          <div className="mb-3">
            <label for="email" className="form-label">
              <Typography sx={{ fontSize: 20 }}>Email address</Typography>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              style={{ height: "60px" }}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              <Typography sx={{ fontSize: 20 }}>Password</Typography>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
              style={{ height: "60px" }}
            />
            <p>{errors.password?.message}</p>
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{ fontSize: 20, fontFamily: "Poppins", fontWeight: "600" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

function Navbar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const submitLoginData = async (values) => {
    const res = await axios.post(
      "http://localhost:5001/api/1.0/drivers",
      values
    );
    console.log(res);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#19A7CE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
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
          submitLoginData={submitLoginData}
        />
      </FlexBetween>
    </Box>
  );
}

export default Navbar;