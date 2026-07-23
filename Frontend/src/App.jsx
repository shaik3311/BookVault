import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";

const App = () => {
  return (
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
  );
};

export default App;