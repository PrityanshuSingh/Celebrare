// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cards from "./pages/Cards";
import Actions from "./pages/Actions";
import "./index.css";

const App = () => {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/actions" element={<Actions />} />
      </Routes>
    </div>
  );
};

export default App;
