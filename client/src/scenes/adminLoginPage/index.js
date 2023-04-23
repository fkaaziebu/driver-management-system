import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"; // Importing necessary MUI components and hooks
import Form from "./Form"; // Importing the Form component
import { useState } from "react";

const AdminLoginPage = () => {
  // Defining a functional component named AdminLoginPage
  const theme = useTheme(); // Getting the current theme object
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Setting a boolean variable based on the media query
  const [pageType, setPageType] = useState("login");

  return (
    // Returning JSX elements
    // A MUI Box component
    <Box>
      {" "}
      <Box
        width="100%" // Setting the width to 100%
        backgroundColor={theme.palette.background.alt} // Setting the background color using the theme object
        p="1rem 6%" // Setting padding
        textAlign="center" // Centering the text
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Admin Login/Signup
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"} // Setting width based on screen size
        p="2rem" // Setting padding
        m="2rem auto" // Setting margin
        borderRadius="1.5rem" // Setting border radius
        backgroundColor={theme.palette.background.alt} // Setting background color using the theme object
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Sign-in
        </Typography>
        <Form pageType={pageT} setPageType={setPageType}/>
      </Box>
    </Box>
  );
};

export default AdminLoginPage; // Exporting the AdminLoginPage component
