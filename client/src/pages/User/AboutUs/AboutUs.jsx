import React from "react";
import ReactDOM from "react-dom";
import { SocialIcon } from "react-social-icons";

//Bootstrap/css section
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../AboutUs/aboutUs.css";

import beyzaPic from "./teamImg/beyza.jpg";
import baraahPic from "./teamImg/baraah.jpg";
import monesPic from "./teamImg/mones.jpg";
import akinPic from "./teamImg/akin.jpg";
import abdullaPic from "./teamImg/abdulla.jpg";

const AboutUs = () => {
  return (
    <div className="home-container">
      {/* <div className="teamIntro-container welcoming-section">
        <p className="first-team-title">
          Special Invitation for Your Special Day
        </p>
        <p className="aboutUs-paragraph">
          You will know exactly the number of attendees or the amount of
          preparations for the wedding if you are using our app{" "}
        </p>
      </div> */}

      <div className="team-member-box">
        <div>
          <img src={monesPic} alt="teamPic1" className="team-pic" />
          <hr />
          <div className="data-box">
            <p className="team-member-name">Mones Hamad</p>
            <div className="icon-social-box">
              <SocialIcon
                className="icon-social"
                url="https://www.linkedin.com/in/mones-hamd-313ba722b/"
                style={{ height: 30, width: 30 }}
              />
              <SocialIcon
                className="icon-social"
                url="https://github.com/Mones-Hamd"
                style={{ height: 30, width: 30 }}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="paragraph">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            eligendi tempora tenetur commodi exercitationem corporis facere
            perspiciatis excepturi quidem fugiat? Fugit asperiores saepe,
            molestias velit quis id deleniti et non!
          </p>
        </div>
      </div>

      <div className="team-member-box">
        <div>
          <img src={beyzaPic} alt="teamPic2" className="team-pic" />
          <hr />
          <div className="data-box">
            <p className="team-member-name">Beyza Gok</p>
            <div className="icon-social-box">
              <SocialIcon
                className="icon-social"
                url="https://www.linkedin.com/in/beyza-g%C3%B6k-b7a218246/"
                style={{ height: 30, width: 30 }}
              />
              <SocialIcon
                className="icon-social"
                url="https://github.com/beyzagoknl"
                style={{ height: 30, width: 30 }}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="paragraph">
            “Looking for a challenging software engineer position where I can
            use my educational background and specialised training to add value
            to the firm and team. I enjoy (and consider myself good at) solving
            problem, communicating with others and working with people from
            different backgrounds, professions and skills. I look forward to
            meeting you!”
          </p>
        </div>
      </div>

      <div className="team-member-box">
        <div>
          <img src={abdullaPic} alt="teamPic1" className="team-pic" />
          <hr />
          <div className="data-box">
            <p className="team-member-name">Abdullah Samur</p>
            <div className="icon-social-box">
              <SocialIcon
                className="icon-social"
                url="https://www.linkedin.com/in/abdullah-samur-282424241/"
                style={{ height: 30, width: 30 }}
              />
              <SocialIcon
                className="icon-social"
                url="https://github.com/B1gB4dB4ng"
                style={{ height: 30, width: 30 }}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="paragraph">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            eligendi tempora tenetur commodi exercitationem corporis facere
            perspiciatis excepturi quidem fugiat? Fugit asperiores saepe,
            molestias velit quis id deleniti et non!
          </p>
        </div>
      </div>

      <div className="team-member-box">
        <div>
          <img src={baraahPic} alt="teamPic1" className="team-pic" />
          <hr />
          <div className="data-box">
            <p className="team-member-name">Baraah Ranneh</p>
            <div className="icon-social-box">
              <SocialIcon
                className="icon-social"
                url="https://www.linkedin.com/in/baraah-ranneh/"
                style={{ height: 30, width: 30 }}
              />
              <SocialIcon
                className="icon-social"
                url="https://github.com/Baraah-Rn"
                style={{ height: 30, width: 30 }}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="paragraph">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            eligendi tempora tenetur commodi exercitationem corporis facere
            perspiciatis excepturi quidem fugiat? Fugit asperiores saepe,
            molestias velit quis id deleniti et non!
          </p>
        </div>
      </div>

      <div className="team-member-box">
        <div>
          <img src={akinPic} alt="teamPic1" className="team-pic" />
          <hr />
          <div className="data-box">
            <p className="team-member-name">Akın Tanış</p>
            <div className="icon-social-box">
              <SocialIcon
                className="icon-social"
                url="https://www.linkedin.com/in/akin-tanis/"
                style={{ height: 30, width: 30 }}
              />
              <SocialIcon
                className="icon-social"
                url="https://github.com/rakin-tanis"
                style={{ height: 30, width: 30 }}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="paragraph">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            eligendi tempora tenetur commodi exercitationem corporis facere
            perspiciatis excepturi quidem fugiat? Fugit asperiores saepe,
            molestias velit quis id deleniti et non!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
