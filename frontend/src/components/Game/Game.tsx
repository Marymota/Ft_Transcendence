import "./Game.css";

const Game: React.FC = () => {

	let p1_pos_x = 5;
	let p1_pos_y = 40;

	let p2_pos_x = 5;
	let p2_pos_y = 40;

	let ball_pos_x = 40;
	let ball_pos_y = 40;

	let test = 1;

	document.addEventListener('keydown', (e) => {
		if (e.key == 'w')
		{
			if (p1_pos_y > 0)
				p1_move(p1_pos_x, --p1_pos_y)
		}
		if (e.key == 's')
		{
			if (p1_pos_y < 80)
				p1_move(p1_pos_x, ++p1_pos_y)
		}
		if (e.key == 'ArrowUp')
		{
			if (p2_pos_y > 0)
				p2_move(p2_pos_x, --p2_pos_y)
		}
		if (e.key == 'ArrowDown')
		{
			if (p2_pos_y < 80)
				p2_move(p2_pos_x, ++p2_pos_y)
		}
	}); 

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
	
	function ball_move(x_pos : number, y_pos : number)
	{
		var element = document.getElementById("ball");
		if (element)
		{
			element.style.position = "absolute";
			element.style.right = x_pos+'vh';
			element.style.top = y_pos+'vh';
		}
	}

	setInterval(update, 50);
	function update(){
		if (ball_pos_y > 80)
			test = -1
		else if (ball_pos_y < 0)
			test = 1;
		ball_pos_y = ball_pos_y + test;
		ball_move(ball_pos_x, ball_pos_y);
	 }
	
	return (
		<div className="game">
			<div className="pong">
				<div id="lp" className="leftplayer"></div>
				<div id="rp" className="rightplayer"></div>
				<div id="ball" className="ball"></div>
			</div>
		</div>
	);
}

export default Game;