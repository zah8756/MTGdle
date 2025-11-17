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
				<div className='py-3 border border-gray-700'>Release Date/Set</div>
				<div className='py-3 border border-gray-700'>Type/Super Type</div>
				<div className='py-3 border border-gray-700'>Subtype</div>
			</div>

			<div className='space-y-2'>
				{guess.map((guessCard, i) => {
					const { guessTypes, supertypeDetail, typeDetail, subtypeDetail } =
						compareCardTypes(guessCard.type_line ?? "", goal.type_line ?? "");

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
						const guessColors = guessCard.colors ?? [];
						const goalColors = goal.colors ?? [];
						const overlap = guessColors.filter((x) => goalColors.includes(x));
						const exact =
							guessColors.length === goalColors.length &&
							overlap.length === goalColors.length;
						if (exact) {
							classes += "bg-green-700";
						} else if (overlap.length > 0) {
							classes += "bg-yellow-700";
						} else {
							classes += "bg-red-700";
						}
						return classes;
					};

					const capitalizeFirstLetter = (string?: string) => {
						if (!string) return "";
						return string.charAt(0).toUpperCase() + string.slice(1);
					};

					return (
						<div
							key={i}
							className='grid grid-cols-8 text-center text-white rounded-lg overflow-hidden'>
							<div className='bg-black py-2 border border-gray-700 flex justify-center items-center'>
								{i + 1}
							</div>
							<div
								className={`py-2 border border-gray-700 ${
									guessCard.name === goal.name ? "bg-green-700" : "bg-red-700"
								}`}>
								{guessCard.name}
							</div>
							{guessCard.cmc === goal.cmc ? (
								<div className={"py-2 border border-gray-700 bg-green-700"}>
									<i
										className={`ms ms-${guessCard.cmc} ms-cost ms-2x ms-shadow`}></i>
								</div>
							) : (
								<>
									{guessCard?.cmc && goal?.cmc && guessCard.cmc > goal.cmc ? (
										<div className="py-2 border border-gray-700 bg-red-700 flex justify-center gap-5 after:content-[''] after:clip-down-arrow relative items-center ">
											<i
												className={`ms ms-${guessCard.cmc} ms-cost ms-2x ms-shadow relative z-10 `}></i>
										</div>
									) : (
										<div className="py-2 border border-gray-700 bg-red-700 flex justify-center gap-5 after:content-[''] after:clip-up-arrow relative items-center">
											<i
												className={`ms ms-${guessCard.cmc} ms-cost ms-2x ms-shadow relative z-10`}></i>
										</div>
									)}
								</>
							)}
							<div className={colorHelper()}>
								{guessCard.colors?.map((color) => (
									<i
										key={color}
										className={`ms ms-${color.toLowerCase()}  ms-cost ms-shadow`}></i>
								))}
							</div>
							<div
								className={`py-2 border border-gray-700 ${
									guessCard.rarity === goal.rarity
										? "bg-green-700"
										: "bg-red-700"
								}`}>
								{capitalizeFirstLetter(guessCard?.rarity)}
							</div>
							<div
								className={`py-2 border border-gray-700 ${
									guessCard.released_at === goal.released_at
										? "bg-green-700"
										: "bg-red-700"
								}`}>
								{
									<div className='flex justify-center flex-col'>
										<i
											className={`ss ss-${guessCard.set} ss-${guessCard.rarity} ss-grad ss-2x`}
											title={guessCard.set_name}></i>
										<span>{guessCard.released_at?.slice(0, 4)}</span>
									</div>
								}
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
