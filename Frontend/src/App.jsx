import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Bookmarks from "./pages/Bookmarks";

const App = () => {
  return (
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/bookmarks" element={<Bookmarks/>} />
      </Routes>
  );
};

export default App;