import React, { useState } from "react";

import './Sidebar.css';
import * as Logo from '../../images/PONG-logo.png';
import * as Play from '../../images/play-icon.png';
import * as Leaderboard from '../../images/leaderboard-icon.png';
import * as Chat from '../../images/chat-icon.png';
import * as Profile from '../../images/perfil-icon.png';
import * as Exit from '../../images/exit-icon.png';


const Sidebar: React.FC = () => {

	const [activeTab, setActiveTab] = useState<string>("tab1");
	const changeTab = (tab: string) => { setActiveTab(tab); };

	return (
		<div className="sidebar">
			<div className="logo">
				<img className='ilogo' src={Logo.default} alt="Logo Pong" />
			</div>
			<div className="menu">

				<div className={`menu-item ${activeTab === "tab1" ? "active" : ""}`}
					onClick={() => changeTab("tab1")} >
					<img className='iplay' src={Play.default} alt="Play icon" />
					<span>PLAY</span>
				</div>
	
	
				<div className={`menu-item ${activeTab === "tab2" ? "active" : ""}`}
					onClick={() => changeTab("tab2")} >
					<img className='ileaderboard' src={Leaderboard.default} alt="Logo Pong" />
					<span>LEADERBOARD</span>
				</div>
				
				<div className={`menu-item ${activeTab === "tab3" ? "active" : ""}`}
					onClick={() => changeTab("tab3")} >
					<img className='ichat' src={Chat.default} alt="Chat icon" />
					<span>CHAT</span>
				</div>

				<div className={`menu-item ${activeTab === "tab4" ? "active" : ""}`}
					onClick={() => changeTab("tab4")} >
					<img className='iprofile' src={Profile.default} alt="Profile icon" />
					<span>PROFILE</span>
				</div>

				<div className={`menu-item ${activeTab === "tab5" ? "active" : ""}`}
					onClick={() => changeTab("tab5")} >
					<img className='iexit' src={Exit.default} alt="Exit icon" />
					<span>EXIT</span>
				</div>
				
			</div>
			<script src="sidebar.js"></script>
		</div>
	);
};

export default Sidebar;