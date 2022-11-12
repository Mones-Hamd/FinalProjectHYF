import React from "react";

import Nav from "./components/Nav/Nav";

import Footer from "./components/Footer/Footer";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <>
      <Nav />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;
