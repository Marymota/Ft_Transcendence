// import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import io from "socket.io-client";
import Home from './pages/Home';
import Sidebar from './pages/Sidebar'
// import { getCookies } from './utils/getCookies';
// import { GET_MY_OPT_CONFIG } from './UI/organisms/TwoFactorAuthBox/TwoFactorAuthBoxQueries';

export const socket = io("http://localhost:3000");

export default function App() {
  // const accessToken = getCookies('access_token');
  // const { error } = useQuery(GET_MY_OPT_CONFIG);
  // if (!accessToken) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sidebar" element={<Sidebar />} />
        </Routes>
      </Router>
      // if (error) {
      //   return<>Error</>;
      // }
    );
  // } 
}
