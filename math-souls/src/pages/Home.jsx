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
    <body>
      <p className="titl">Welcome Traveler. A new day dawns.</p>
      <div className="buttons">
        <a onClick={toList} class="image-container">
          <img
            src={buttonBackground}
            alt="Local Image"
            style={{ border: "none" }}
          />
          <div class="overlay-text">Tackle an enemy</div>
        </a>
        <a onClick={handleClick} class="image-container">
          <img
            src={buttonBackground}
            alt="Local Image"
            style={{ border: "none" }}
          />
          <div class="overlay-text">Tackle the boss</div>
        </a>
      </div>
    </body>
  );
};

const button2 = () => {
  return (
    <div>
      <button>button2</button>
    </div>
  );
};

export default Home;
