import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import io from "socket.io-client";
import Login from './pages/Login';
import Home from './pages/Home';
import Play from './pages/Play'

export const socket = io("http://localhost:3000");

export default function App() {

   return (
     <Router>
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/Home" element={<Home />} />
         <Route path="/Play" element={<Play />} />
       </Routes>
     </Router>
   );
}
