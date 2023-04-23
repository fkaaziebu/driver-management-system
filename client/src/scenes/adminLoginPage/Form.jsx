import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // This line imports the Formik component from the "formik" library
import * as yup from "yup"; // Importing yup for form validation
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for programmatic navigation
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux to dispatch actions
import { setLogin } from "state"; // Importing setLogin action from the state slice
import FlexBetween from "components/FlexBetween"; // Importing a custom FlexBetween component

// Defining the registration form schema using Yup validation library
const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  contact: yup.string().required("required"),
  housenumber: yup.string().required("required"),
  streetname: yup.string().required("required"),
  city: yup.string().required("required"),
  country: yup.string().required("required"),
});
// Defining the login form schema using Yup validation library
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
// Array of objects representing countries and their codes
export const COUNTRIES = [
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "United Kingdom", code: "UK" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
];
//defines the initial values for a registration form
const initialValuesRegister = {
  username: "",
  email: "",
  contact: "",
  password: "",
  housenumber: "",
  streetname: "",
  city: "",
  country: "",
};
//defines the initial values for a login form
const initialValuesLogin = {
  email: "",
  password: "",
};

// Define a functional component called "Form"
const Form = ({pageType, setPageType}) => { // Define state variables: "pageType" and "setPageType" using the "useState" hook
  const { palette } = useTheme(); // Define a constant variable called "palette" using the "useTheme" hook
  const isNonMobile = useMediaQuery("(min-width:600px)"); // Define a constant variable called "isNonMobile" using the "useMediaQuery" hook with a query string
  const isLogin = pageType === "login"; // Define constant variables "isLogin" and "isRegister" based on "pageType"
  const isRegister = pageType === "register";

  // Define an asynchronous function called "register" that accepts two parameters: "values" and "onSubmitProps"
  const register = async (values, onSubmitProps) => {
    // Send a POST request to a URL with form values in the request body
    const loggedInResponse = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    // Parse the response JSON from the server and reset the form upon successful registration or login.
    const savedUser = await loggedInResponse.json();
    onSubmitProps.resetForm();
    // Check if saved user exists, log the response and set pageType to "login"
    if (savedUser) {
      console.log(savedUser);
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    // const loggedInResponse = await fetch(
    //   "https://driver-management-backend.onrender.com/api/1.0/drivers/auth",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(values),
    //   }
    // );
    // const loggedIn = await loggedInResponse.json();
    // onSubmitProps.resetForm();
    // if (loggedIn) {
    //   dispatch(
    //     setLogin({
    //       user: loggedIn.user,
    //       token: loggedIn.token,
    //     })
    //   );
    //   navigate("/home");
    // }
  };
  // This function handles the submission of the form and calls either the login or register function based on the current pageType.
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    //rendering a Formik component with onSubmit, initialValues, and validationSchema props
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        //The input fields have validation logic attached, and the form adjusts its layout based on whether the user is registering or not.
        //with a form control for selecting a country with error handling and helper text.
        //the email and password fields are grouped together and span four columns, to emphasize 
        //their importance and to make them more prominent on the form.
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Contact"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={Boolean(touched.contact) && Boolean(errors.contact)}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="House-number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.housenumber}
                  name="housenumber"
                  error={
                    Boolean(touched.housenumber) && Boolean(errors.housenumber)
                  }
                  helperText={touched.housenumber && errors.housenumber}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Street-name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.streetname}
                  name="streetname"
                  error={
                    Boolean(touched.streetname) && Boolean(errors.streetname)
                  }
                  helperText={touched.streetname && errors.streetname}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  error={Boolean(touched.city) && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl
                  sx={{ gridColumn: "span 2" }}
                  error={Boolean(touched.country) && Boolean(errors.country)}
                >
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country"
                    name="country"
                    value={values.country}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select a country</MenuItem>
                    {COUNTRIES.map((country) => (
                      <MenuItem key={country.code} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.country && errors.country && (
                    <FormHelperText>{errors.country}</FormHelperText>
                  )}
                </FormControl>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here"
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
