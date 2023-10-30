import ChatBox from "../../components/ChatBox/ChatBox";
import Sidebar from "../../components/Sidebar/Sidebar";

const Chat: React.FC = () => {
  return (
    <>
      <div className="container-row">
        <Sidebar />
        <ChatBox />
      </div>
    </>
  );
};

export default Chat;
