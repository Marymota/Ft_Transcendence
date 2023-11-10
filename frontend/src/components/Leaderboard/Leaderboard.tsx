import React from 'react'
import "./Leaderboard.css";

// import * as Profile from "../../images/perfil-icon.png";
import * as leaderboard from "../../images/leaderboard-icon.png";
import Profiles from "./Profiles"

import { DataBoard } from "./Database";

const LeaderBoard: React.FC = () => {

  const handleClick = (e: any) => {
    console.log(e.target)
  }

  return (
  
    <div className="leaderboard">
      <div className="header">
        <img className="icon" src={leaderboard.default} alt="leaderboard icon image" />
        <h1 className="title">Leaderboard</h1>
      </div>

      <div className="time">
        <button 
          onClick={handleClick}
          data-id='7'>7 Days</button>
        <button 
          onClick={handleClick}
          data-id='30'>30 Days</button>
        <button
          onClick={handleClick}
          data-id='0'>All time</button>
      </div>

      <Profiles DataBoard={DataBoard}></Profiles>

      {/* <div className="profiles">
        <div className="leaderboard-item">
          <span className="number"> 1 </span>
          <img className="profile" src={Profile.default} alt="profile image" />
          <div className="nickname">CRAIG</div>
          <p className="points"> 1609 XP</p>
        </div>
      <div className="leaderboard-item">
          <span className="number"> 2 </span>
          <img className="ileaderboard"
            src={Profile.default}
            alt="Logo Pong"
          />
          <div className="nickname">JULIO</div>
          <p className="points"> 989 XP</p>
      </div>
      <div className="leaderboard-item">
          <span className="number"> 3 </span>
          <img className="ichat" src={Profile.default} alt="Chat icon" />
          <div className="nickname">MAR</div>
          <p className="points"> 471 XP</p>
      </div>
      <div className="leaderboard-item">
          <span className="number"> 4 </span>
          <img className="iprofile" src={Profile.default} alt="Profile icon" />
          <div className="nickname">VITORIA</div>
          <p className="points"> 270 XP</p>
      </div>
      <div className="leaderboard-item">
          <span className="number"> 5 </span>
          <img className="iexit" src={Profile.default} alt="Exit icon" />
          <div className="nickname">EDDO</div>
          <p className="points"> 260 XP</p>
        </div>
      </div> */}
      <script src="sidebar.js"></script>
    </div>
  );
};

export default LeaderBoard;