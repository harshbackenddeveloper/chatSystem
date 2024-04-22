import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbox from "./Component/Chatbox/Chatbox";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Login from "./Component/Auth/Login";
import Registerd from "./Component/Auth/Registerd";
import Home from "./Component/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chat" element={<Chatbox />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Registerd />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
