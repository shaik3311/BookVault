import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Bookmarks from "./pages/Bookmarks";
import { useDispatch } from "react-redux";
import { loadCurrentUser } from "./redux/features/authThunk";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(loadCurrentUser());
    }
  }, [dispatch]);

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