import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ResetStyle, GlobalStyle } from "./constants/globalStyle";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux/store";

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
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ResetStyle />
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
