import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Chatbox from "./Component/Chatbox/Chatbox";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Login from "./Component/Auth/Login";
import Registerd from "./Component/Auth/Registerd";

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/test" element={<Chatbox />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Registerd />}></Route>
      </Routes>
    </>
  );
}

export default App;
