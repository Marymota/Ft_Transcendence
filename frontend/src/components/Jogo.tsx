interface gameProps {
    player1: string;
    player2: string;
}


function Jogo(props: gameProps) {
    return (
        <>
            <div>Jogo</div>
            <div>{props.player1}</div>
            <div>{props.player2}</div>
        </>
    );
}

export default Jogo;