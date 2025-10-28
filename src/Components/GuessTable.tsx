import type { Card } from "../App";

const GuessTable = ({ guess, goal }: { guess: Card[]; goal: Card }) => {
	return (
		<div className='mt-5'>
			<div className='grid grid-cols-6 text-center text-white font-bold bg-black/60 rounded-t-lg mb-4'>
				<div className='py-3 border border-gray-700'>Guess #</div>
				<div className='py-3 border border-gray-700'>Card Name</div>
				<div className='py-3 border border-gray-700'>Mana Cost</div>
				<div className='py-3 border border-gray-700'>Rarity</div>
				<div className='py-3 border border-gray-700'>Release Date</div>
				<div className='py-3 border border-gray-700'>Card Type</div>
			</div>

			<div className='space-y-2'>
				{guess.map((guessCard, i) => (
					<div
						key={i}
						className='grid grid-cols-6 text-center text-white rounded-lg overflow-hidden'>
						<div className={`bg-red-700 py-2 border border-gray-700`}>
							{i + 1}
						</div>
						<div className={`bg-red-700 py-2 border border-gray-700`}>
							{guessCard.name}
						</div>
						<div className={`bg-red-700 py-2 border border-gray-700`}>
							{guessCard.cmc}
						</div>
						<div
							className={`bg-red-700 py-2 border border-gray-700 ${
								guessCard.rarity === goal.type_line
									? "bg-green-700"
									: "bg-red-700"
							}`}>
							{guessCard.rarity}
						</div>
						<div className={`bg-red-700 py-2 border border-gray-700`}>
							{guessCard.released_at}
						</div>
						<div
							className={`py-2 border border-gray-700 ${
								guessCard.type_line === goal.type_line
									? "bg-green-700"
									: "bg-red-700"
							}`}>
							{guessCard.type_line}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default GuessTable;
