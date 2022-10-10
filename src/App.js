import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import LoginPage from "./LoginPage";

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
      <LoginPage />
    </ThemeProvider>
  );
}

export default App;
