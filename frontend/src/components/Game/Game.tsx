import "./Game.css";

const Game: React.FC = () => {

	let p1_pos_x = 5;
	let p1_pos_y = 40;

	let p2_pos_x = 5;
	let p2_pos_y = 40;


	function p1_move(x_pos : number, y_pos : number)
	{
		var element = document.getElementById("lp");
		if (element)
		{
			element.style.position = "absolute";
			element.style.left = x_pos+'vh';
			element.style.top = y_pos+'vh';
		}
	}

	function p2_move(x_pos : number, y_pos : number)
	{
		var element = document.getElementById("rp");
		if (element)
		{
			element.style.position = "absolute";
			element.style.right = x_pos+'vh';
			element.style.top = y_pos+'vh';
		}
	}
	
	
	return (
		<div className="game">
			<div className="pong">
				<div id="lp" className="leftplayer"></div>
				<div id="rp" className="rightplayer"></div>
				<div className="ball"></div>
			</div>
			<button onClick={() => {p1_move(p1_pos_x, --p1_pos_y)}}>P1 Up</button>
			<button onClick={() => {p1_move(p1_pos_x, ++p1_pos_y)}}>P1 Down</button>
			<button onClick={() => {p2_move(p2_pos_x, --p2_pos_y)}}>P2 Up</button>
			<button onClick={() => {p2_move(p2_pos_x, ++p2_pos_y)}}>P2 Down</button>
		</div>
	);
}

export default Game;