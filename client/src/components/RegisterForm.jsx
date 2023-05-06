import { Button, Typography } from "@mui/material";
import React from "react";

function RegisterForm({ register, errors }) {
  return (
    <div>
      <div className="mb-3"><Typography sx={{fontSize: 40, fontFamily: "Poppins", fontWeight: "600"}}>Register</Typography></div>
      <div className="mb-3">
        <label for="username" className="form-label">
          <Typography sx={{ fontSize: 20 }}>Username</Typography>
        </label>
        <input
          {...register("username", {
            required: "username is required",
          })}
          type="username"
          className="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter Your Username"
          style={{ height: "60px" }}
        />
        <p>{errors.username?.message}</p>
      </div>

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
        <label for="contact" className="form-label">
          <Typography sx={{ fontSize: 20 }}>Contact Number</Typography>
        </label>
        <input
          {...register("contact", {
            required: "contact is required",
          })}
          type="contact"
          className="form-control"
          id="contact"
          aria-describedby="contactHelp"
          placeholder="Enter Your Phone Number"
          style={{ height: "60px" }}
        />
        <p>{errors.contact?.message}</p>
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
    </div>
  );
}

export default RegisterForm;
