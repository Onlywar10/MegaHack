import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import QuestionPage from "./pages/QuestionPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;