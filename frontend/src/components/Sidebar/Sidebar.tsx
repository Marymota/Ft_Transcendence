import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Sidebar.css";
import * as Logo from "../../images/PONG-logo.png";
import * as Play from "../../images/play-icon.png";
import * as Leaderboard from "../../images/leaderboard-icon.png";
import * as Chat from "../../images/chat-icon.png";
import * as Profile from "../../images/perfil-icon.png";
import * as Exit from "../../images/exit-icon.png";

function handleClick(page: string) {
  useNavigate()("/" + page);
}

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const changeTab = (tab: string) => {
    console.log(tab);
    setActiveTab(tab);
    if (tab == "Chat" || tab == "Home" || tab == "Play") handleClick(tab);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img className="ilogo" src={Logo.default} alt="Logo Pong" />
      </div>
      <div className="menu">
        <div
          className={`menu-item ${activeTab === "tab1" ? "active" : ""}`}
          onClick={() => changeTab("Play")}
        >
          <img className="iplay" src={Play.default} alt="Play icon" />
          <span>PLAY</span>
        </div>

        <div
          className={`menu-item ${activeTab === "tab2" ? "active" : ""}`}
          onClick={() => changeTab("Leaderboard")}
        >
          <img
            className="ileaderboard"
            src={Leaderboard.default}
            alt="Logo Pong"
          />
          <span>LEADERBOARD</span>
        </div>

        <div
          className={`menu-item ${activeTab === "tab3" ? "active" : ""}`}
          onClick={() => changeTab("Chat")}
        >
          <img className="ichat" src={Chat.default} alt="Chat icon" />
          <span>CHAT</span>
        </div>

        <div
          className={`menu-item ${activeTab === "tab4" ? "active" : ""}`}
          onClick={() => changeTab("Profile")}
        >
          <img className="iprofile" src={Profile.default} alt="Profile icon" />
          <span>PROFILE</span>
        </div>

        <div
          className={`menu-item ${activeTab === "tab5" ? "active" : ""}`}
          onClick={() => changeTab("Exit")}
        >
          <img className="iexit" src={Exit.default} alt="Exit icon" />
          <span>EXIT</span>
        </div>
      </div>
      <script src="sidebar.js"></script>
    </div>
  );
};

export default Sidebar;
