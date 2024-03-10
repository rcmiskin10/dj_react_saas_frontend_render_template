import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2c387e",
    },
    secondary: {
      main: "#ffcf33",
    },
  },
});

// Initialize React Ga with your tracking ID
ReactGA.initialize(process.env.REACT_APP_GA_ID);
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

serviceWorker.unregister();
