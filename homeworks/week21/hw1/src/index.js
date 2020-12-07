import React from "react";
import ReactDOM from "react-dom";
import { ResetStyle, GlobalStyle } from "./constants/globalStyle";
import App from "./App";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    blue: "#004D95",
    yellow: "#FABE00",
    yellowLight: "#FEFAE0",
    brown: "#592D00",
    gray: "#565656",
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
