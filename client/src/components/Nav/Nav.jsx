import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Nav/ourlogo.png";
import { IconContext } from "react-icons";
import "./nav.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiHome, BiLogIn, BiLogOut } from "react-icons/bi";
import { useAuth } from "../../hooks/useAuth";
import { IoCreateOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { MdAppRegistration } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
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
    <div className="nav-container">
      <IconContext.Provider value={{ color: "#000000" }}>
        <div className="nav-bar">
          <div className="navbar-links">
            {!isAuthenticated && (
              <>
                <Link to="/" className="links">
                  <BiHome color="#bc9ec1" className="nav-icons" />
                  Home
                </Link>
                <Link to="/aboutUs" className="links">
                  <BsInfoCircle color="#bc9ec1" className="nav-icons" />
                  About Us
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link to="/homePage" className="links">
                  <BiHome color="#bc9ec1" className="nav-icons" />
                  Home
                </Link>
                <Link to="/createForm" className="links">
                  <IoCreateOutline color="#bc9ec1" className="nav-icons" />
                  Create Form
                </Link>
                <Link to="/aboutUs" className="links">
                  <BsInfoCircle color="#bc9ec1" className="nav-icons" />
                  About Us
                </Link>
              </>
            )}
          </div>
          <Link to="#" className="menu">
            <FaBars className="hamburger" onClick={showSidebar} />
          </Link>
          <Link to="/">
            <img className="logo-text" src={logo} />
          </Link>

          <ul className="navbar-buttons">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="links">
                  <BiLogIn color="#bc9ec1" className="nav-icons" />
                  Log in
                </Link>
                <Link to="/register" className="links">
                  <MdAppRegistration color="#bc9ec1" className="nav-icons" />
                  Sign up
                </Link>
              </>
            ) : (
              <>
                {user && user.username && (
                  <div className="user-name-nav">
                    <CgProfile color="#bc9ec1" className="nav-icons" />
                    {user.username}
                  </div>
                )}
                <Link to="/login" className="right-links">
                  {user ? (
                    <span className="links " onClick={logout}>
                      {" "}
                      <BiLogOut color="#bc9ec1" className="nav-icons" />
                      Log Out
                    </span>
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
                  <span className="links-hamburger " onClick={logout}>
                    {" "}
                    <BiLogOut color="#bc9ec1" className="nav-icons" />
                    Log Out
                  </span>
                </>
              ) : (
                <>
                  <Link to="/login" className="links-hamburger">
                    <BiLogIn color="#bc9ec1" className="nav-icons" />
                    Log in
                  </Link>
                  <Link to="/register" className="links-hamburger">
                    <MdAppRegistration color="#bc9ec1" className="nav-icons" />
                    Sign up
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
