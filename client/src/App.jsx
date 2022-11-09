import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./pages/HomePage/Home";
import Welcome from "./pages/WelcomePage/Welcome";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateForm from "./pages/CreateForm/CreateForm";
import AboutUs from "./pages/User/AboutUs/AboutUs";
import Result from "./pages/ResultPage/Result";
import { UserProvider } from "./contexts/userContext";
import Footer from "./components/Footer/Footer";
const App = () => {
  return (
    <>
      <UserProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/homePage" element={<Home />} />
          <Route path="/createForm" element={<CreateForm />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </UserProvider>
    </>
  );
};

export default App;
