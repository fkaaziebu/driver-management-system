import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const DriverRegisterForm = ({
  username,
  setUsername,
  email,
  setEmail,
  contact,
  setContact,
  password,
  setPassword,
}) => {
  return (
    <>
      <div className="mb-3">
        <Typography
          sx={{ fontSize: 40, fontFamily: "Poppins", fontWeight: "600" }}
        >
          Register
        </Typography>
      </div>
      <div className="mb-3">
        <label for="username" className="form-label">
          <Typography sx={{ fontSize: 20 }}>Username</Typography>
        </label>
        <input
          type="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter Your Username"
          style={{ height: "60px" }}
        />
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
        <label for="contact" className="form-label">
          <Typography sx={{ fontSize: 20 }}>Contact Number</Typography>
        </label>
        <input
          type="contact"
          className="form-control"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          aria-describedby="contactHelp"
          placeholder="Enter Your Phone Number"
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
    </>
  );
};

const AdminRegisterForm = ({
  username,
  setUsername,
  email,
  setEmail,
  contact,
  setContact,
  houseNumber,
  setHouseNumber,
  streetName,
  setStreetName,
  city,
  setCity,
  country,
  setCountry,
  password,
  setPassword,
}) => {
  return (
    <>
      <div className="mb-3">
        <Typography
          sx={{ fontSize: 40, fontFamily: "Poppins", fontWeight: "600" }}
        >
          Register
        </Typography>
      </div>
      <div className="mb-3">
        <label for="username" className="form-label">
          <Typography sx={{ fontSize: 20 }}>Username</Typography>
        </label>
        <input
          type="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter Your Username"
          style={{ height: "60px" }}
        />
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
        <label for="contact" className="form-label">
          <Typography sx={{ fontSize: 20 }}>Contact Number</Typography>
        </label>
        <input
          type="contact"
          className="form-control"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          aria-describedby="contactHelp"
          placeholder="Enter Your Phone Number"
          style={{ height: "60px" }}
        />
      </div>

      <div className="mb-3">
        <label for="houseNumber" className="form-label">
          <Typography sx={{ fontSize: 20 }}>House Number</Typography>
        </label>
        <input
          type="houseNumber"
          className="form-control"
          id="houseNumber"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          aria-describedby="contactHelp"
          placeholder="Enter Your House Number"
          style={{ height: "60px" }}
        />
      </div>

      <div className="mb-3">
        <label for="streetName" className="form-label">
          <Typography sx={{ fontSize: 20 }}>Street Name</Typography>
        </label>
        <input
          type="streetName"
          className="form-control"
          id="streetName"
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
          aria-describedby="contactHelp"
          placeholder="Enter Your Street Name"
          style={{ height: "60px" }}
        />
      </div>

      <div className="mb-3">
        <label for="country" className="form-label">
          <Typography sx={{ fontSize: 20 }}>Country</Typography>
        </label>
        <input
          type="country"
          className="form-control"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          aria-describedby="contactHelp"
          placeholder="Enter Your Country Name"
          style={{ height: "60px" }}
        />
      </div>

      <div className="mb-3">
        <label for="city" className="form-label">
          <Typography sx={{ fontSize: 20 }}>City</Typography>
        </label>
        <input
          type="city"
          className="form-control"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-describedby="contactHelp"
          placeholder="Enter Your City"
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
    </>
  );
};

function RegisterForm({ register, errors }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isDriver, setIsDriver] = useState(false);

  const driverRegister = async (data) => {
    const res = await axios.post("http://localhost:5001/api/1.0/drivers", data);
    console.log(res);
  };

  const adminRegister = async (data) => {
    const res = await axios.post("http://localhost:5001/api/1.0/admins", data);
    console.log(res);
  };

  const handleSubmit = async (event) => {
    const data = isDriver
      ? { username, email, contact, password }
      : {
          username,
          email,
          contact,
          houseNumber,
          streetName,
          city,
          country,
          password,
        };
    event.preventDefault();
    !isDriver ? adminRegister(data) : driverRegister(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {isDriver ? (
          <DriverRegisterForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            contact={contact}
            setContact={setContact}
            password={password}
            setPassword={setPassword}
          />
        ) : (
          <AdminRegisterForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            contact={contact}
            setContact={setContact}
            houseNumber={houseNumber}
            setHouseNumber={setHouseNumber}
            streetName={streetName}
            setStreetName={setStreetName}
            city={city}
            setCity={setCity}
            country={country}
            setCountry={setCountry}
            password={password}
            setPassword={setPassword}
          />
        )}
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
                Signup as Admin
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
                Signup as Driver
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

export default RegisterForm;
