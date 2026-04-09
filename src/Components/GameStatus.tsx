import type { JSX } from "react";
import Modal from "./Modal";
import type { Card } from "../App";

type GameStatusProps = {
	isGameWon: boolean;
	isGameLost: boolean;
	isGameOver: boolean;
	guessCountLeft: number;
	lastGuessWrong: boolean;
	goal: Card;
	onPlayAgain: () => void;
};

const GameStatus = ({
	isGameWon,
	isGameLost,
	isGameOver,
	guessCountLeft,
	lastGuessWrong,
	goal,
	onPlayAgain,
}: GameStatusProps): JSX.Element => {
	return (
		<>
			<section className='text-center p-4'>
				<p className='text-lg font-bold text-gray-200 tracking-wide'>
					Guesses remaining: {guessCountLeft}
				</p>
				{lastGuessWrong && (
					<p className='text-red-500 text-lg mt-1 tracking-wide font-bold'>
						Last guess was incorrect
					</p>
				)}
			</section>
			{isGameOver && (
				<Modal isModalOpen={true} onClose={() => {}}>
					{isGameWon && (
						<h2 className='text-2xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-300'>
							Congratulations! You won!
						</h2>
					)}
					{isGameLost && (
						<h2 className='text-2xl font-bold after:content-["_"] after:block after:w-full after:h-[1px] after:bg-gray-300'>
							Game Over! You ran out of guesses.
						</h2>
					)}
					<div className='flex flex-col items-center justify-center gap-2'>
						<img
							src={goal.image_uris?.normal}
							alt={goal.name}
							className='w-full h-full object-cover'
						/>
						<p className='text-gray-500'>The card was: {goal.name}</p>
					</div>
					<button
						className='mt-4 bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200'
						onClick={onPlayAgain}>
						Random Card Mode - Play again
					</button>
				</Modal>
			)}
		</>
	);
};

export default GameStatus;
