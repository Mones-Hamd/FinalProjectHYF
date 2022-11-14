import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Nav/ourlogo.png";
import { IconContext } from "react-icons";
import "./nav.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const Nav = () => {
  const [sidebar, setSidebar] = useState(false);
  const { user, logout } = useAuth();
  const isAuthenticated = user != null;

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
            {!isAuthenticated && (
              <div className="links">
                <Link to="/" className="links">
                  Home
                </Link>
                <Link to="/aboutUs" className="links">
                  About Us
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <>
                <Link to="/homePage" className="links">
                  Home
                </Link>
                <Link to="/createForm" className="links">
                  Create Form
                </Link>
                <Link to="/aboutUs" className="links">
                  About Us
                </Link>
              </>
            )}
          </div>
          <Link to="#" className="menu">
            <FaBars className="hamburger" onClick={showSidebar} />
          </Link>
          <img className="logo-text" src={logo} />
          <ul className="navbar-buttons">
            {!isAuthenticated ? (
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
                {user && user.username && (
                  <div className="user-name-nav">
                    <p className="user-name-nav">Hello {user.username}</p>
                  </div>
                )}
                <Link to="/login">
                  {user ? (
                    <button className="button-hamburger" onClick={logout}>
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
              {isAuthenticated ? (
                <>
                  <Link to="/" className="user-name-hamburger">
                    {user.username}
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
                    <button className="button-hamburger">Signup</button>
                  </Link>
                </>
              )}
            </li>
            {!isAuthenticated && (
              <>
                <Link to="/" className="navbar-text-hamburger">
                  <li>Home</li>
                </Link>
                <Link to="/aboutUs" className="navbar-text-hamburger">
                  <li> About Us</li>
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link to="/homePage" className="navbar-text-hamburger">
                  <li>Home</li>
                </Link>
                <Link to="/createForm" className="navbar-text-hamburger">
                  <li>Create Form</li>
                </Link>
                <Link to="/aboutUs" className="navbar-text-hamburger">
                  <li> About Us</li>
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
