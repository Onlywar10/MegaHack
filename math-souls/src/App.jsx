import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import QuestionPage from "./pages/QuestionPage";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Gauntlet from "./pages/Gauntlet";
import Endless from "./pages/endless";

function App() {
  const [auth, setAuth] = useState(false);
  // This state is here for the purpose of updating the navbar
  const [userUpdate, setUserUpdate] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("userID") == null) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {auth && <Navbar setAuth={setAuth} userUpdate={userUpdate} />}
      <Routes>
        <Route path="/" element={<Home setAuth={setAuth} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/endless" element={<Endless />} />
        <Route
          path="/question/:category"
          element={<QuestionPage setUserUpdate={setUserUpdate} />}
        />
        <Route
          path="/gauntlet/:category"
          element={<Gauntlet setUserUpdate={setUserUpdate} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
