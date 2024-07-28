import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import QuestionPage from "./pages/QuestionPage";
import QuestionList from "./pages/QuestionList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/list" element={<QuestionList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;