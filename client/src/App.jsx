import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Nav from "./components/Nav/Nav";
import Home from "./pages/HomePage/Home";
import Welcome from "./pages/WelcomePage/Welcome";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateForm from "./pages/CreateForm/CreateForm";
import AboutUs from "./pages/User/AboutUs/AboutUs";
import Result from "./pages/ResultPage/Result";
import Footer from "./components/Footer/Footer";

const App = () => {
  const { user } = useAuthContext();
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route
          path="/homePage"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/createForm"
          element={user ? <CreateForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/homePage" />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/homePage" />}
        />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
