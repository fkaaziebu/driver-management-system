import { Button, Typography } from "@mui/material";
import React from "react";

function LoginForm({ register, errors }) {
  return (
    <div>
      <div className="mb-3">
        <Typography
          sx={{ fontSize: 40, fontFamily: "Poppins", fontWeight: "600" }}
        >
          Login
        </Typography>
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

export default LoginForm;
