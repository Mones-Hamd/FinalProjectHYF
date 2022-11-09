import React from "react";
import ReactDOM from "react-dom";

import AppWrapper from "./AppWrapper";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <AppWrapper>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </AppWrapper>,
  document.getElementById("root")
);
