import './Login.css';
/*  npm install @mui/styled-engine-sc \
    @mui/styled-engine @emotion/styled @emotion/react */
import Button from '@mui/material/Button';
import * as Disk from '../images/disk.png';
import * as Logo from '../images/PONG-logo.png';

function Login() {

  const login = () => {
    window.location.href = 'https://api.intra.42.fr/oauth/authorize';
  };

  return (
    <>
      <div className='container'>
        <img className='disk' src={Disk.default} alt="Disquete Illustration" />
        <img className='logo' src={Logo.default} alt="Logo Pong" />
        <p className='slogan'>Play Old Nice Games</p>
        <form>
          <Button
            onClick= { login }
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
    </>
  );
};

export default Login;