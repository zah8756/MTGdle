import type { JSX } from "react";

type GameStatusProps = {
	isGameWon: boolean;
	isGameLost: boolean;
	isGameOver: boolean;
	guessCountLeft: number;
	lastGuessWrong: boolean;
};

const GameStatus = ({
	isGameWon,
	isGameLost,
	isGameOver,
	guessCountLeft,
	lastGuessWrong,
}: GameStatusProps): JSX.Element => {
	return <section></section>;
};

export default GameStatus;
