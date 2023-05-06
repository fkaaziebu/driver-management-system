import React from "react";
import { Box, Button, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import AdvertizingImage from "../../assets/image-removebg-preview.png";

function LandingPage() {
  return (
    <Box sx={{ width: "100%", backgroundColor: "rgba(183, 183, 183, 0.1)" }}>
      <FlexBetween padding="2rem" gap="2.5rem">
        <Box
          component="img"
          src={AdvertizingImage}
          alt="Advertising Image"
          sx={{
            width: "65vw",
            height: "70vh",
            borderBottomRightRadius: "50%",
            border: "5px solid #19A7CE",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <Typography variant="h1">What we do.</Typography>
          <Box sx={{ fontSize: "1.5rem" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            consectetur velit. A tempora laboriosam perferendis? Esse quaerat
            ipsam illo fuga velit dolorum vitae veritatis aspernatur! Vel
            dignissimos quia, a nulla dolor dicta nemo saepe, facere mollitia ut
            magnam voluptate! Tenetur sed ipsam, dolorem distinctio unde quidem
            sapiente quia quae totam?
          </Box>
        </Box>
      </FlexBetween>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 0 1.5rem 0",
        }}
      >
        <Typography variant="h1" sx={{ fontStyle: "italic" }}>
          Register as:
        </Typography>
        <FlexBetween gap="2rem" padding="0 1.5rem">
          <Button
            size="large"
            variant="contained"
            sx={{
              fontSize: 20,
              fontFamily: "Poppins",
              fontWeight: "500",
              backgroundColor: "#19A7CE",
              boxShadow: "none",
            }}
          >
            Administrator
          </Button>
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
          >
            Driver
          </Button>
        </FlexBetween>
      </Box>
    </Box>
  );
}

export default LandingPage;
