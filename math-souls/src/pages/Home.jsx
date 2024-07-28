import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import devil from "../assets/Devil_Fruits_10.png";

const Home = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/question");
  }
  function toList() {
    navigate("/list");
  }

  return (
    <body>
      <p className="titl">Welcome player! What would you like to do?</p>
      <div className="buttons">
        <a onClick={toList} class="image-container">
          <img src={devil} alt="Local Image" style={{ border: "none" }} />
          <div class="overlay-text">Tackle an enemy</div>
        </a>
        <a onClick={handleClick} class="image-container">
          <img src={devil} alt="Local Image" style={{ border: "none" }} />
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
