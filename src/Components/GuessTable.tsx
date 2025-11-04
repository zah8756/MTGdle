import type { Card } from "../App";
import { compareCardTypes } from "../utils/parseCardType";

const GuessTable = ({ guess, goal }: { guess: Card[]; goal: Card }) => {
	return (
		<div className='mt-5'>
			<div className='grid grid-cols-8 text-center text-white font-bold bg-black/60 rounded-t-lg mb-4'>
				<div className='py-3 border border-gray-700'>Guess #</div>
				<div className='py-3 border border-gray-700'>Card Name</div>
				<div className='py-3 border border-gray-700'>Mana Cost</div>
				<div className='py-3 border border-gray-700'>Colors</div>
				<div className='py-3 border border-gray-700'>Rarity</div>
				<div className='py-3 border border-gray-700'>Release Date</div>
				<div className='py-3 border border-gray-700'>Type/Super Type</div>
				<div className='py-3 border border-gray-700'>Subtype</div>
			</div>

			<div className='space-y-2'>
				{guess.map((guessCard, i) => {
					const {
						guessTypes,
						goalTypes,
						supertypeDetail,
						typeDetail,
						subtypeDetail,
					} = compareCardTypes(guessCard.type_line ?? "", goal.type_line ?? "");

					console.log(supertypeDetail, typeDetail);

					const typeHelper = () => {
						let classes = "py-2 border border-gray-700 ";
						if (
							supertypeDetail.partial === true ||
							typeDetail.partial === true
						) {
							classes += "bg-yellow-700";
						} else if (
							supertypeDetail.exact === true &&
							typeDetail.exact === true
						) {
							classes += "bg-green-700";
						} else {
							classes += "bg-red-700";
						}
						return classes;
					};

					const subHelper = () => {
						let classes = "py-2 border border-gray-700 ";
						if (subtypeDetail.partial === true) {
							classes += "bg-yellow-700";
						} else if (subtypeDetail.exact === true) {
							classes += "bg-green-700";
						} else {
							classes += "bg-red-700";
						}
						return classes;
					};

					const colorHelper = () => {
						let classes = "py-2 border border-gray-700 ";
						const overlap = guessCard.colors?.filter((x) =>
							goal.colors?.includes(x)
						);
						if (guessCard.colors?.length === goal.colors?.length) {
							classes += "bg-green-700";
						} else if (overlap && overlap?.length > 0) {
							classes += "bg-yellow-700";
						} else {
							classes += "bg-red-700";
						}
						return classes;
					};

					console.log(guessTypes, goalTypes);

					return (
						<div
							key={i}
							className='grid grid-cols-8 text-center text-white rounded-lg overflow-hidden'>
							<div className='bg-black py-2 border border-gray-700'>
								{i + 1}
							</div>
							<div
								className={`py-2 border border-gray-700 ${
									guessCard.name === goal.name ? "bg-green-700" : "bg-red-700"
								}`}>
								{guessCard.name}
							</div>
							<div
								className={`py-2 border border-gray-700 ${
									guessCard.cmc === goal.cmc ? "bg-green-700" : "bg-red-700"
								}`}>
								{guessCard.cmc}
							</div>
							<div className={colorHelper()}>{guessCard.colors?.join()}</div>
							<div
								className={`py-2 border border-gray-700 ${
									guessCard.rarity === goal.rarity
										? "bg-green-700"
										: "bg-red-700"
								}`}>
								{guessCard.rarity}
							</div>
							<div
								className={`py-2 border border-gray-700 ${
									guessCard.released_at === goal.released_at
										? "bg-green-700"
										: "bg-red-700"
								}`}>
								{guessCard.released_at}
							</div>
							<div className={typeHelper()}>
								{guessTypes.supertypes.concat(guessTypes.types).join(" ")}
							</div>
							<div className={subHelper()}>{guessTypes.subtypes.join(" ")}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default GuessTable;
