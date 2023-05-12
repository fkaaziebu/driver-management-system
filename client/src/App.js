import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import LandingPage from "scenes/landingPage/index";
import Layout from "scenes/layout/Layout";
import DriverProfile from "scenes/driverProfile/DriverProfile";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/drivers/:id/profile" element={<DriverProfile />} />
              {/* <Route path="/admin/auth" element={<AdminLoginPage />} /> */}
              {/* <Route
                path="/profile/auth"
                element={<DriverProfileCompletion />}
              /> */}
              {/* <Route path="/driver/auth" element={<DriverLoginPage />} /> */}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
