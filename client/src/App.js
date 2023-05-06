import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import DriverLoginPage from "scenes/driverLoginPage";
import AdminLoginPage from "scenes/adminLoginPage";
import LandingPage from "scenes/landingPage";
import DriverProfileCompletion from "scenes/driverProfileCompletion";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/auth" element={<AdminLoginPage />} />
            <Route path="/profile/auth" element={<DriverProfileCompletion />} />
            <Route path="/driver/auth" element={<DriverLoginPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
