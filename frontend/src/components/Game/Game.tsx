import "./Game.css";

const Game: React.FC = () => {

	let height = 60;
	let width = 85;

	let p1_pos_x = 5;
	let p1_pos_y = (height / 2);

	let p2_pos_x = 5;
	let p2_pos_y = (height / 2);

	let ball_pos_x = (width / 2);
	let ball_pos_y = (height / 2);

	let ball_x_dir = 1;
	let ball_y_dir = 1;

	let p1_dir = 0;
	let p2_dir = 0;

	document.addEventListener('keydown', (e) => {
		if (e.key == 'w')
		{
			p1_dir = -1;
		}
		if (e.key == 's')
		{
			p1_dir = 1;
		}
		if (e.key == 'ArrowUp')
		{
			p2_dir = -1;
		}
		if (e.key == 'ArrowDown')
		{
			p2_dir = 1;
		}
	});

	document.addEventListener('keyup', (e) => {
		if (e.key == 'w' || e.key == 's')
		{
			p1_dir = 0;
		}
		if (e.key == 'ArrowUp' || e.key == 'ArrowDown')
		{
			p2_dir = 0;
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
			element.style.left = x_pos+'vh';
			element.style.top = y_pos+'vh';
		}
	}

	setInterval(updategame, 50);
	function updategame(){
		if (p1_dir < 0)
		{
			if (p1_pos_y > 0)
				p1_move(p1_pos_x, --p1_pos_y)
		}
		if (p1_dir > 0)
		{
			if (p1_pos_y < height)
				p1_move(p1_pos_x, ++p1_pos_y)
		}
		if (p2_dir < 0)
		{
			if (p2_pos_y > 0)
				p2_move(p2_pos_x, --p2_pos_y)
		}
		if (p2_dir > 0)
		{
			if (p2_pos_y < height)
				p2_move(p2_pos_x, ++p2_pos_y)
		}
		if (ball_pos_x < 0 || ball_pos_x > width)
		{
			ball_pos_x = (width / 2);
			ball_pos_y = (height / 2);
		}
		if (ball_pos_y > height)
			ball_y_dir = -1
		else if (ball_pos_y < 0)
			ball_y_dir = 1;
		if (ball_pos_x > width - 5 && ball_pos_y <= p2_pos_y + 5 && ball_pos_y >= p2_pos_y - 5)
			ball_x_dir = -1
		else if (ball_pos_x < 0 + 5 && ball_pos_y <= p1_pos_y + 5 && ball_pos_y >= p1_pos_y - 5)
			ball_x_dir = 1;
		ball_pos_y = ball_pos_y + ball_y_dir;
		ball_pos_x = ball_pos_x + ball_x_dir;
		ball_move(ball_pos_x, ball_pos_y);
	 }
	
	return (
		<div className="game">
			<div id="pong" className="pong">
				<div id="lp" className="leftplayer"></div>
				<div id="rp" className="rightplayer"></div>
				<div id="ball" className="ball"></div>
			</div>
		</div>
	);
}

export default Game;