import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { supabase } from "../supabase";
import { knightPFP } from "../assets/index";
import "./Navbar.css";

const Navbar = ({ setAuth }) => {
  const [userData, setUserData] = useState({});
  const [toggleSignOut, setToggleSignOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let { data: user, error } = await supabase
      .from("Users")
      .select("*")
      .eq("userID", localStorage.getItem("userID"));

    // console.log(user[0]);
    setUserData(user[0]);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem("userID");
    setAuth(false);
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-top-container">
        <div className="navbar-souls-container">Souls: {userData.souls}</div>
        <div className="username-pfp-container">
          <div>{userData.username}</div>
          <img
            src={knightPFP}
            alt="knightPFP"
            className="navbar-pfp"
            onClick={() => setToggleSignOut(!toggleSignOut)}
          />
        </div>
      </div>
      {toggleSignOut && (
        <div className="navbar-bottom-container">
          <div onClick={handleSignOut} className="navbar-signout-text">
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
