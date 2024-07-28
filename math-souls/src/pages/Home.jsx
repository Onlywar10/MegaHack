import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { buttonBackground } from "../assets";

const Home = ({ setAuth }) => {
  useEffect(() => {
    setAuth(true);
  }, []);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/question");
  }
  function toList() {
    navigate("/list");
  }

  return (
    <div className="homepage-container">
      <p className="titl">Welcome Traveler. A new day dawns.</p>
      <div className="buttons">
        <a onClick={toList} className="image-container">
          <img
            src={buttonBackground}
            alt="Local Image"
            style={{ border: "none" }}
          />
          <div className="overlay-text">Tackle an enemy</div>
        </a>
        <a onClick={handleClick} className="image-container">
          <img
            src={buttonBackground}
            alt="Local Image"
            style={{ border: "none" }}
          />
          <div className="overlay-text">Tackle the boss</div>
        </a>
      </div>
    </div>
  );
};

export default Home;
