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
	if (isGameWon) {
		return (
			<section className='text-center p-4'>
				<p className='text-green-500 text-xl font-bold'>
					Congratulations! You won!
				</p>
			</section>
		);
	}

	if (isGameLost) {
		return (
			<section className='text-center p-4'>
				<p className='text-red-500 text-xl font-bold'>
					Game Over! You ran out of guesses.
				</p>
			</section>
		);
	}

	if (isGameOver) {
		return (
			<section className='text-center p-4'>
				<p className='text-gray-500'>Game Over</p>
			</section>
		);
	}

	return (
		<section className='text-center p-4'>
			<p className='text-gray-600'>Guesses remaining: {guessCountLeft}</p>
			{lastGuessWrong && (
				<p className='text-red-500 text-sm mt-2'>Last guess was incorrect</p>
			)}
		</section>
	);
};

export default GameStatus;
