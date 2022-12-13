import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import LoginPage from "./LoginPage";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Operator from "./pages/Operator";
import Admin from "./pages/Admin";
import { Pages } from "./services/constants";

const THEME = createTheme({
  typography: {
    "fontFamily": `"Exo", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700
  }
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <BrowserRouter>
        <Routes>
          <Route path={Pages.Dashboard.path} element={<Dashboard />} />
          <Route path={Pages.Login.path} element={<LoginPage />} />
          <Route path={Pages.Operator.path}  element={<Operator />} />
          <Route path={Pages.Admin.path}  element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
