import React, { useEffect } from "react";

const Home = ({ setAuth }) => {
  useEffect(() => {
    setAuth(true);
  }, []);

  return <div>Home</div>;
};

export default Home;
