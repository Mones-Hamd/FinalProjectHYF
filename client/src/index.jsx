import React from "react";
import ReactDOM from "react-dom";

import AppWrapper from "./AppWrapper";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { EventContextProvider } from "./contexts/EventContext";

ReactDOM.render(
  <AppWrapper>
    <AuthContextProvider>
      <EventContextProvider>
        <App />
      </EventContextProvider>
    </AuthContextProvider>
  </AppWrapper>,
  document.getElementById("root")
);
