import HomeDisplay from '../components/Sidebar/HomeDisplay';
import Sidebar from '../components/Sidebar/Sidebar';

const Home: React.FC = () => {

	return (
		<>
		  <div className='container-row'>
			< Sidebar/>
			< HomeDisplay/>
		  </div>
		</>
	);
};

export default Home;