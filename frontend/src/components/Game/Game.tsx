import "./Game.css";

const Game: React.FC = () => {
  return (
    <div className="game">
      <div className="pong">
        <div className="leftplayer"></div>
        <div className="rightplayer"></div>
        <div className="ball"></div>
      </div>
    </div>
  );
};

export default Game;
