import { Box, Typography } from "@mui/material";
import React from "react";

function DriverProfile() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Box sx={{ width: "45%" }}>
        <Box
          component="img"
          alt="Passport Picture"
          //   src = { }
          sx={{
            width: "10%",
            height: "10vh",
          }}
        />
        <div className="mb-3">
          <label for="address" className="form-label">
            <Typography sx={{ fontSize: 20 }}>Driver address</Typography>
          </label>
          <input
            disabled
            type="address"
            className="form-control"
            id="address"
            aria-describedby="AddressHelp"
            style={{ height: "60px", width: "100%" }}
          />
        </div>
        <div className="mb-3">
          <label for="contact" className="form-label">
            <Typography sx={{ fontSize: 20 }}>Phone Number</Typography>
          </label>
          <input
            disabled
            type="contact"
            className="form-control"
            id="contact"
            aria-describedby="ContactHelp"
            style={{ height: "60px" }}
          />
        </div>
        <div className="mb-3">
          <label for="ownership" className="form-label">
            <Typography sx={{ fontSize: 20 }}>Ownership Type</Typography>
          </label>
          <input
            disabled
            type="ownership"
            className="form-control"
            id="ownership"
            aria-describedby="OwnershipHelp"
            style={{ height: "60px" }}
          />
        </div>
        <div className="mb-3">
          <label for="license" className="form-label">
            <Typography sx={{ fontSize: 20 }}>Driving License</Typography>
          </label>
          <input
            disabled
            type="license"
            className="form-control"
            id="license"
            aria-describedby="LicenseHelp"
            style={{ height: "60px" }}
          />
        </div>
      </Box>
      <Box sx={{ width: "45%" }}>
        <div className="mb-3">
          <label for="insurance" className="form-label">
            <Typography sx={{ fontSize: 20 }}>Car Insurance</Typography>
          </label>
          <input
            disabled
            type="insurance"
            className="form-control"
            id="insurance"
            aria-describedby="InsuranceHelp"
            style={{ height: "60px" }}
          />
        </div>
        <div className="mb-3">
          <label for="carType" className="form-label">
            <Typography sx={{ fontSize: 20 }}>Car Type</Typography>
          </label>
          <input
            disabled
            type="carType"
            className="form-control"
            id="carType"
            aria-describedby="CarTypeHelp"
            style={{ height: "60px" }}
          />
        </div>
        <div className="mb-3">
          <label for="yearModel" className="form-label">
            <Typography sx={{ fontSize: 20 }}>Year Model</Typography>
          </label>
          <input
            disabled
            type="yearModel"
            className="form-control"
            id="license"
            aria-describedby="YearHelp"
            style={{ height: "60px" }}
          />
        </div>
        <div className="mb-3">
          <label for="carColor" className="form-label">
            <Typography sx={{ fontSize: 20 }}>Car Color</Typography>
          </label>
          <input
            disabled
            type="CarColor"
            className="form-control"
            id="CarColor"
            aria-describedby="CarColorHelp"
            style={{ height: "60px" }}
          />
        </div>
        <div className="mb-3">
          <label for="roadworthy" className="form-label">
            <Typography sx={{ fontSize: 20 }}>Car Roadworthy</Typography>
          </label>
          <input
            disabled
            type="roadworthy"
            className="form-control"
            id="roadworthy"
            aria-describedby="roadworthyHelp"
            style={{ height: "60px" }}
          />
        </div>
        <Box
          component="img"
          alt="Passport Picture"
          //   src = { }
          sx={{
            width: "10%",
            height: "10vh",
          }}
        />
      </Box>
    </Box>
  );
}

export default DriverProfile;
