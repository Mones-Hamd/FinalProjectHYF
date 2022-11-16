import React from "react";
import "./SecondaryNav.css";
import PropTypes from "prop-types";
const SecondaryNav = ({ setValue }) => {
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <nav className="secondary-nav">
        <h1> Plane with us </h1>
        <div>
          <label htmlFor="events"> Choose your Event :</label>
          <select name="events" id="event" onChange={handleOnChange}>
            <option value="wedding">Wedding</option>
            <option value="party">Party</option>
            <option value="baby shower">Baby shower</option>
          </select>
        </div>
      </nav>
    </div>
  );
};
SecondaryNav.propTypes = {
  setValue: PropTypes.func.isRequired,
};

export default SecondaryNav;
