import './Home.css';
import { Button } from '@material-ui/core';
import * as Disk from '../images/disk.png';
import * as Logo from '../images/PONG-logo.png';

function Home() {

  return (
    <div className='container'>
      <img className='disk' src={Disk.default} alt="Disquete Illustration" />
      <img className='logo' src={Logo.default} alt="Logo Pong" />
      <p>Play Old Nice Games</p>
      <form>
        <Button
          type="button"
          style={{
            width: '350px',
            height: '48px',
            background: '#5CB9BD',
            color: 'white',
          }}
        >
          42 Intra
        </Button>
      </form>
    </div>
  );
};

export default Home;