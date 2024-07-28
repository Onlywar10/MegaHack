import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabase";
import "./bossList.css";
import { buttonBackground } from "../assets";

const BossList = () => {
  const warningList = [
    "Be cautious Traveler, many have fallen here.",
    "Tread carefully. Watch your step.",
    "This is now the real deal.",
    "A test for your skills... if you are ready.",
    "There is no turning back now.",
    "Stand strong, never surrender",
  ];

  const [userSouls, setUserSouls] = useState(0);
  const [error, setError] = useState(false);

  // for fun
  const [warning, setWarning] = useState("");

  let navigate = useNavigate();

  const fetchUserSoulCount = async () => {
    let { data: Users, error } = await supabase
      .from("Users")
      .select("*")
      .eq("userID", localStorage.getItem("userID"));

    setUserSouls(Users[0].souls);
  };

  const checkBasic = () => {
    if (Number(userSouls) >= 20) {
      navigate("/gauntlet/basic_math");
    } else {
      setError(true);
    }
  };

  const checkAlgebra = () => {
    if (Number(userSouls) >= 40) {
      navigate("/gauntlet/algebra");
    } else {
      setError(true);
    }
  };

  const checkGeo = () => {
    if (Number(userSouls) >= 60) {
      navigate("/gauntlet/geometry");
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    fetchUserSoulCount();

    // select a random warning
    setWarning(warningList[Math.floor(Math.random() * warningList.length)]);
  }, []);

  return (
    <div className="boss-list-container">
      <div className="boss-title">Boss Selection:</div>
      <div className="boss-list-warning">{warning}</div>
      <div className="boss-buttons">
        <div className="bossButton-title-container">
          <div className="bossButton-title">The Fundamental Fury</div>
          <div
            style={{
              color: "gray",
            }}
          >
            Souls Required: 20
          </div>
          <button className="login-button" onClick={checkBasic}>
            <img
              src={buttonBackground}
              alt="button"
              className="login-button-image"
            />
            <div className="login-button-text">Enter</div>
          </button>
        </div>
        <div className="bossButton-title-container">
          <div className="bossButton-title">Lord Algebra, The Unknown</div>
          <div
            style={{
              color: "gray",
            }}
          >
            Souls Required: 40
          </div>
          <button className="login-button" onClick={checkAlgebra}>
            <img
              src={buttonBackground}
              alt="button"
              className="login-button-image"
            />
            <div className="login-button-text">Enter</div>
          </button>
        </div>
        <div className="bossButton-title-container">
          <div
            className="bossButton-title"
            style={{
              fontSize: "24px",
            }}
          >
            Lucious Cube, The Man With the Six Faces
          </div>
          <div
            style={{
              color: "gray",
            }}
          >
            Souls Required: 60
          </div>
          <button className="login-button" onClick={checkGeo}>
            <img
              src={buttonBackground}
              alt="button"
              className="login-button-image"
            />
            <div className="login-button-text">Enter</div>
          </button>
        </div>
      </div>
      {error && (
        <div
          style={{
            color: "red",
            fontSize: "40px",
          }}
        >
          NOT ENOUGH SOULS.
        </div>
      )}
    </div>
  );
};

export default BossList;
