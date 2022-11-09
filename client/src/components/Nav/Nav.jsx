import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/images/ourlogo.png";
import { IconContext } from "react-icons";
import "./nav.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const Nav = () => {
  const [sidebar, setSidebar] = useState(false);
  const { user, logout } = useAuth();
  const isUser = true;

  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: "#000000" }}>
        <div className="nav-bar">
          <div className="links">
            {!isUser && (
              <Link to="/" className="navbar-text">
                Home
              </Link>
            )}

            {isUser && (
              <>
                <Link to="/homePage" className="navbar-text">
                  Home
                </Link>

                <Link to="/createForm" className="navbar-text">
                  <li>Create Form</li>
                </Link>
                <Link to="/register" className="navbar-text">
                  <li>Register</li>
                </Link>
                <Link to="/login" className="navbar-text">
                  <li>Login</li>
                </Link>
                <Link to="/aboutUs" className="navbar-text">
                  About Us
                </Link>
              </>
            )}
          </div>
          <Link to="#" className="menu">
            <FaBars className="hamburger" onClick={showSidebar} />
          </Link>
          <img className="logo-text" onClick={() => navigate("/")} src={logo} />
          <ul className="navbar-buttons">
            {!isUser ? (
              <>
                <Link to="/login">
                  <button className="navbar-button">Log in</button>
                </Link>
                <Link to="/register">
                  <button className="navbar-button">Sign up</button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="user-name-nav">
                  {user && user.username && (
                    <div>
                      <p>Hello {user.username}</p>
                      <p>{user.email}</p>
                    </div>
                  )}
                </Link>
                <Link to="/login">
                  {user ? (
                    <button className="navbar-button" onClick={logout}>
                      Log Out
                    </button>
                  ) : (
                    <button className="navbar-button" onClick={goLogin}>
                      {" "}
                      Profile{" "}
                    </button>
                  )}
                </Link>
              </>
            )}
          </ul>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="nav-bar-toggle">
              <Link to="#" className="menu-close">
                <AiOutlineClose />
              </Link>
            </li>
            <li className="buttons-hamburger">
              {isUser ? (
                <>
                  <Link to="/" className="user-name-hamburger">
                    <p>Hello Beyza</p>
                  </Link>
                  <button className="button-hamburger" onClick={logout}>
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="button-hamburger">Log in</button>
                  </Link>
                  <Link to="/register">
                    <button className="button-hamburger">Sign up</button>
                  </Link>
                </>
              )}
            </li>
            {!isUser && (
              <Link to="/" className="navbar-text-hamburger">
                <li>Home</li>
              </Link>
            )}

            {isUser && (
              <>
                <Link to="/homePage" className="navbar-text-hamburger">
                  <li>Home</li>
                </Link>
                <Link to="/createForm" className="navbar-text-hamburger">
                  <li>Create Form</li>
                </Link>
                <Link to="/aboutUs" className="navbar-text">
                  About Us
                </Link>
                <Link to="/register" className="navbar-text">
                  Register
                </Link>
                <Link to="/login" className="navbar-text">
                  Login
                </Link>
              </>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default Nav;
