import './Sidebar.css';
import * as Logo from '../images/PONG-logo.png';
import * as Play from '../images/play-icon.png';
import * as Leaderboard from '../images/leaderboard-icon.png';
import * as Chat from '../images/chat-icon.png';
import * as Profile from '../images/perfil-icon.png';
import * as Exit from '../images/exit-icon.png';


function Sidebar() {

  return (
	<div className="sidebar">
		<div className="logo">
			<img className='ilogo' src={Logo.default} alt="Logo Pong" />
		</div>
		<div className="menu">
			<div className="menu-item">
				<img className='iplay' src={Play.default} alt="Play icon" />
				<span>PLAY</span>
			</div>
			<div className="menu-item">
				<img className='ileaderboard' src={Leaderboard.default} alt="Logo Pong" />
				<span>LEADERBOARD</span>
			</div>
			<div className="menu-item">
				<img className='ichat' src={Chat.default} alt="Chat icon" />
				<span>CHAT</span>
			</div>
			<div className="menu-item">
				<img className='iprofile' src={Profile.default} alt="Profile icon" />
				<span>PROFILE</span>
			</div>
			<div className="menu-item">
				<img className='iexit' src={Exit.default} alt="Exit icon" />
				<span>EXIT</span>
			</div>
		</div>
		<div className="pong">
			<div className="leftplayer"></div>
			<div className="rightplayer"></div>
			<div className="ball"></div>
		</div>
	</div>
  );
};

export default Sidebar;