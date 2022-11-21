import React from "react";
import { SocialIcon } from "react-social-icons";

//Bootstrap/css section
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "../AboutUs/aboutUs.css";

import beyzaPic from "./teamImg/beyza.jpg";
import baraahPic from "./teamImg/baraah.jpg";
import monesPic from "./teamImg/mones.jpg";
import abdullaPic from "./teamImg/abdulla.jpg";

const AboutUs = () => {
  return (
    <div>
      <div className="home-container">
        <h2 className="meet-team">Meet our team</h2>
        <br />

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
              use my educational background and specialised training to add
              value to the firm and team. I enjoy (and consider myself good at)
              solving problem, communicating with others and working with people
              from different backgrounds, professions and skills. I look forward
              to meeting you!”
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
            <img
              src="https://avatars.githubusercontent.com/u/82180752?v=4"
              alt="teamPic1"
              className="team-pic"
            />
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
        <div className="teamIntro-container welcoming-section">
          <h3 className="first-team-title">Making A Difference</h3>
          <p className="aboutUs-paragraph">
            Founded with the mission to create digital invitations that would
            provide all of the elegance of traditional invites without any of
            the waste, helping event hosts be more eco-friendly is at the core
            of what we do. Through partnerships with the National Forest
            Foundation, Mountains to Sound, the National Park Foundation, and 1%
            for the Planet, our online invitations will continue to do more than
            just save paper. Together we can invite a greener future.
          </p>
        </div>

        <div className="accordion accordion-flush" id="accordionFlushExample">
          <h2>F&Q</h2>
          <div className="accordion-item">
            <h3 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                How to write invitation card?
              </button>
            </h3>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Writing an invitation card is simple. Address your card to the
                person you’re inviting; name the event you’re inviting them to;
                spell out the date, time and location; and provide contact
                details so they can RSVP. Be sure to note if you want to mention
                any thing in your invitation.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h3 className="accordion-header" id="flush-headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                What do you include on an invitation?
              </button>
            </h3>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                An invitation card should include text that describes the basic
                wedding details, images or illustrations to make the card stand
                out and white space to balance it all out.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h3 className="accordion-header" id="flush-headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Canceling the invitation
              </button>
            </h3>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                Using Komje it will be easy to cancel you invitation, just click
                on <code>Cancel invitation button</code>
                and we will send an email for all guests to inform them.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
