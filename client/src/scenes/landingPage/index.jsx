// Importing React and various components from the Material-UI library
import React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// Importing a custom component called "FlexBetween"
import FlexBetween from "components/FlexBetween";
// Importing an image to be displayed on the landing page
import AdvertizingImage from "../../assets/image-removebg-preview.png";

// Defining the "LandingPage" component
function LandingPage() {
  // Getting the current theme and screen size using React hooks
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmScreen = useMediaQuery(theme.breakpoints.only("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.only("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.only("lg"));
  const isXlScreen = useMediaQuery(theme.breakpoints.only("xl"));

  // Returning the JSX for the landing page
  return (
    <Box sx={{ width: "100%", backgroundColor: "rgba(183, 183, 183, 0.1)" }}>
      {/* Using the "FlexBetween" component to create a responsive layout */}
      <FlexBetween
        padding={isXsScreen ? "1rem" : isSmScreen ? "1.5rem" : "2rem"}
        flexDirection={isXsScreen ? "column-reverse" : "row"}
        gap={isXsScreen ? "1rem" : isSmScreen ? "1.5rem" : "2.5rem"}
      >
        {/* Displaying the advertising image */}
        <Box
          component="img"
          src={AdvertizingImage}
          alt="Advertising Image"
          sx={{
            width: isXsScreen ? "100%" : isSmScreen ? "80%" : "65vw",
            height: isXsScreen ? "40vh" : isSmScreen ? "50vh" : "70vh",
            borderBottomRightRadius: isXsScreen ? "0" : "50%",
            border: isXsScreen ? "none" : "5px solid #19A7CE",
          }}
        />
        {/* Displaying a heading and some text */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: isXsScreen ? "1rem" : "2rem",
          }}
        >
          <Typography variant={isXsScreen ? "h2" : "h1"}>
            What we do.
          </Typography>
          <Box sx={{ fontSize: isXsScreen ? "1rem" : "1.5rem" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            consectetur velit. A tempora laboriosam perferendis?
          </Box>
        </Box>
      </FlexBetween>
      
    </Box>
    
  );
}

export default LandingPage;
