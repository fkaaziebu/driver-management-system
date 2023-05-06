import React from 'react'
import { useForm } from "react-hook-form";
import { Box, Button, Modal, Typography } from "@mui/material";


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

export default SignupRegisterModal
