import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { ResetStyle, GlobalStyle } from "./constants/globalStyle";

ReactDOM.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
