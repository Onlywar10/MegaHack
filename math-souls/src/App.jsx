import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import QuestionPage from "./pages/QuestionPage";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userID") == null) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {auth && <Navbar setAuth={setAuth} />}
      <Routes>
        <Route path="/" element={<Home setAuth={setAuth} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
