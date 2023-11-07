import Profile from "../../components/Profile/Profile";
import Sidebar from "../../components/Sidebar/Sidebar";

const _Profile: React.FC = () => {

  return (
    <>
      <div className="container-row">
        <Sidebar />
        <Profile />
      </div>
    </>
  );
};

export default _Profile;
