
import * as Disk from '../../images/disk.png';
import * as Logo from '../../images/PONG-logo.png';
import './HomeDisplay.css';

function HomeDisplay() {

  return (
    <>
      <div className='container'>
        <img className='disk' src={Disk.default} alt="Disquete Illustration" />
        <img className='logo' src={Logo.default} alt="Logo Pong" />
        <div className="play-button">
					<span style={{ fontSize: "50px" }}>PLAY</span>
				</div>
      </div>
    </>
  );
};

export default HomeDisplay;