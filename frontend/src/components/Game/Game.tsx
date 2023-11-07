import "./Game.css";


document.addEventListener('keydown', function(event) {
	let rightplayer = document.getElementById('.rightplayer');

	// Get the current position of the rightplayer.
	if (rightplayer != null)
	{
			let style = window.getComputedStyle(rightplayer);
			let top = parseInt(style.getPropertyValue('top'));

			
			// Update the position based on the key pressed.
			switch (event.key) {
					case 'ArrowUp':
							rightplayer.style.top = `${top - 10}px`;
							break;
					case 'ArrowDown':
							rightplayer.style.top = `${top + 10}px`;
							break;
				}
	}
});

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