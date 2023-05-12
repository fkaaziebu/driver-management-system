import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

function LoginForm({ register, errors }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isDriver, setIsDriver] = useState(false);

  const driverLogin = async (data) => {
    const res = await axios.post(
      "http://localhost:5001/api/1.0/auth/drivers",
      data
    );
    console.log(res);
  };

  const adminLogin = async (data) => {
    const res = await axios.post(
      "http://localhost:5001/api/1.0/auth/admins",
      data
    );
    console.log(res);
  };

  const handleSubmit = async (event) => {
    const data = { email, password };
    event.preventDefault();
    !isDriver ? adminLogin(data) : driverLogin(data);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
            placeholder="Enter Your Email"
            style={{ height: "60px" }}
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            <Typography sx={{ fontSize: 20 }}>Password</Typography>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            style={{ height: "60px" }}
          />
        </div>
        <Box sx={{ mt: 2, mb: 2 }}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onClick={() => setIsDriver(false)}
              name="driver-admin"
              id="admin"
              checked
            />
            <label className="form-check-label" for="admin">
              <Typography
                sx={{ fontSize: 20, fontFamily: "Poppins", fontWeight: "400" }}
              >
                Login as Admin
              </Typography>
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              onClick={() => setIsDriver(true)}
              name="driver-admin"
              id="driver"
            />
            <label className="form-check-label" for="driver">
              <Typography
                sx={{ fontSize: 20, fontFamily: "Poppins", fontWeight: "400" }}
              >
                Login as Driver
              </Typography>
            </label>
          </div>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{ fontSize: 20, fontFamily: "Poppins", fontWeight: "600" }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
