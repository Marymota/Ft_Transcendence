import "./NavBar.css";
import Button from "../Button/Button";

interface Props {
  chatFunc: () => void;
  gameFunc: () => void;
  style: "white" | "black";
}

const NavBar = ({ chatFunc, gameFunc, style }: Props) => {
  return (
    <>
      <div className="navBar">
        <div className="button1">
          <Button style={style} onClick={chatFunc}>
            Open Chat Board
          </Button>
        </div>
        <div className="button2">
          <Button style={style} onClick={gameFunc}>
            Open Game Board
          </Button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
