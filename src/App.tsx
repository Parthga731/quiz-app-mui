import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Question } from "./page/Question";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Online MCQ App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:language/:id" element={<Question />} />
      </Routes>
    </div>
  );
}

export default App;
