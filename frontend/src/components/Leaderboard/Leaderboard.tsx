import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Leaderboard.css";

import * as Profile from "../../images/perfil-icon.png";
import * as Leaderboard from "../../images/leaderboard-icon.png";

const LeaderBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const changeTab = (tab: string) => {
    console.log(tab);
    setActiveTab(tab);
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-logo">
        <img className="ileaderboard" src={Leaderboard.default} alt="leaderboard icon image" />
        <span>Leaderboard</span>
      </div>
      <div className="menu">
        <Link
          className={`menu-item ${activeTab === "tab1" ? "active" : ""}`}
          to="/Play"
          onClick={() => changeTab("tab1")}
        >
          <span className="number"> 1 </span>
          <img className="profile" src={Profile.default} alt="profile image" />
          <div className="linkDiv">CRAIG</div>
          <span className="points"> 1609XP</span>
        </Link>

        <Link
          className={`menu-item ${activeTab === "tab2" ? "active" : ""}`}
          to="/Home"
          onClick={() => changeTab("tab2")}
        >
          <span className="number"> 2 </span>
          <img className="ileaderboard"
            src={Profile.default}
            alt="Logo Pong"
          />
          <div className="linkDiv">JULIO</div>
          <span className="points"> 989XP</span>
        </Link>

        <Link
          className={`menu-item ${activeTab === "tab3" ? "active" : ""}`}
          to="/Chat"
          onClick={() => changeTab("tab3")}
        >
          <span className="number"> 3 </span>
          <img className="ichat" src={Profile.default} alt="Chat icon" />
          <div className="linkDiv">MAR</div>
          <span className="points"> 471XP</span>
        </Link>

        <Link
          className={`menu-item ${activeTab === "tab4" ? "active" : ""}`}
          to="/Home"
          onClick={() => changeTab("tab4")}
        >
          <span className="number"> 4 </span>
          <img className="iprofile" src={Profile.default} alt="Profile icon" />
          <div className="linkDiv">VITORIA</div>
          <span className="points"> 270XP</span>
        </Link>

        <Link
          className={`menu-item ${activeTab === "tab5" ? "active" : ""}`}
          to="/Home"
          onClick={() => changeTab("tab5")}
        >
          <span className="number"> 5 </span>
          <img className="iexit" src={Profile.default} alt="Exit icon" />
          <div className="linkDiv">EDDO</div>
          <span className="points"> 260XP</span>
        </Link>
      </div>
      <script src="sidebar.js"></script>
    </div>
  );
};

export default LeaderBoard;