import React from "react";
import "../Footer/footer.css";
import logo from "../Footer/ourlogo.png";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="col">
          <Link to="/">
            <img src={logo} className="logo" />
          </Link>
        </div>
        <div className="col">
          <h3 className="text">
            Follow Us
            <div className="underline">
              <p className="underline-span"></p>
            </div>
          </h3>

          <div className="social-icons">
            <ul className="sci">
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaIcons.FaFacebook className="icons" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaIcons.FaInstagram className="icons" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaIcons.FaLinkedin className="icons" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaIcons.FaTwitter className="icons" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col">
          <div>
            <h3 className="text">
              Contact Us
              <div className="underline">
                <p className="underline-span"></p>
              </div>
            </h3>
          </div>
          <p className="mail">
            <a className="mailp" href="mailto:komje-app@outlook.com">
              komje-app@outlook.com
            </a>
          </p>
        </div>
      </div>
      <div className="copyrightText">
        <p>@{new Date().getFullYear()} KOMJE. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
