import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
<<<<<<< HEAD
=======
import Login from "./pages/Login";
>>>>>>> f06c9f1631d93611d776ecf3400197dc07315b4e

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
=======
        <Route path="/login" element={<Login />} />
>>>>>>> f06c9f1631d93611d776ecf3400197dc07315b4e
      </Routes>
    </BrowserRouter>
  );
}

export default App;
