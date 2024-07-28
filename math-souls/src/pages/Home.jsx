import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { buttonBackground } from "../assets";

const Home = ({ setAuth }) => {
  const greetingList = [
    "Greetings Traveler. There is much to be done.",
    "Welcome Traveler. A new day dawns.",
    "Still standing I see. Many await you.",
    "A good day to you. The day has just begun.",
  ];

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setAuth(true);

    // Selecting a random greeting
    setGreeting(greetingList[Math.floor(Math.random() * greetingList.length)]);
  }, []);

  // hooks
  const navigate = useNavigate();

  function handleClick() {
    navigate("/question");
  }
  function toList() {
    navigate("/list");
  }

  return (
    <div className="homepage-container">
      <p className="titl">{greeting}</p>
      <div className="buttons">
        <a onClick={toList} className="image-container">
          <img
            src={buttonBackground}
            alt="Local Image"
            style={{ border: "none" }}
          />
          <div className="overlay-text">Tackle an enemy</div>
        </a>
        <a onClick={() => navigate("/bossList")} className="image-container">
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
