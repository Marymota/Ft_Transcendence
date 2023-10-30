import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import io from "socket.io-client";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Play from "./pages/Play/Play";
import Chat from "./pages/Chat/Chat";
import { useEffect } from "react";

export const socket = io("http://localhost:3000");

export default function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connection ID : ", socket.id);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Play" element={<Play />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}
