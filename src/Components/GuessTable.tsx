import type { Card } from "../App";
import { compareCardTypes } from "../utils/parseCardType";

const getYear = (releasedAt?: string): number => {
	if (!releasedAt) return 0;
	const year = parseInt(releasedAt.slice(0, 4), 10);
	return isNaN(year) ? 0 : year;
};

const GuessTable = ({ guess, goal }: { guess: Card[]; goal: Card }) => {
	console.log(goal);
	return (
		<div className='mt-5 overflow-x-auto mx-auto pb-10 max-w-full rounded-lg'>
			<div className='grid grid-cols-8 text-center text-white font-bold bg-black/60 rounded-t-lg mb-4 min-w-[800px] rounded-lg'>
				<div className='py-3 border border-gray-700 rounded-tl-lg rounded-bl-lg'>
					Guess #
				</div>
				<div className='py-3 border border-gray-700'>Card Name</div>
				<div className='py-3 border border-gray-700'>Mana Cost</div>
				<div className='py-3 border border-gray-700'>Colors</div>
				<div className='py-3 border border-gray-700'>Rarity</div>
				<div className='py-3 border border-gray-700 px-2'>Release Date/Set</div>
				<div className='py-3 border border-gray-700'>Type/Super Type</div>
				<div className='py-3 border border-gray-700 rounded-br-lg'>Subtype</div>
			</div>

			<div className='space-y-2 min-w-[800px] max-h-160 overflow-y-auto'>
				{guess.map((guessCard, i) => {
					const { guessTypes, supertypeDetail, typeDetail, subtypeDetail } =
						compareCardTypes(guessCard.type_line ?? "", goal.type_line ?? "");

					const typeHelper = () => {
						let classes = "py-2 border border-gray-700 content-center px-2  ";

						if (supertypeDetail.exact === true && typeDetail.exact === true) {
							classes += "bg-green-700";
						} else if (
							typeDetail.exact === true ||
							supertypeDetail.partial === true ||
							typeDetail.partial === true
						) {
							classes += "bg-yellow-700";
						} else {
							classes += "bg-red-700";
						}
						return classes;
					};

					const subHelper = () => {
						let classes = "py-2 border border-gray-700  content-center ";
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
						let classes = "py-2 border border-gray-700 content-center ";
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
							className='grid grid-cols-8 text-center text-white rounded-lg wrap-anywhere'>
							<div className='bg-black py-2 border border-gray-700 flex justify-center items-center font-bold rounded-tl-lg rounded-bl-lg'>
								{i + 1}
							</div>
							<div
								className={`py-2 border border-gray-700 content-center line-clamp-3 px-2 ${
									guessCard.name === goal.name ? "bg-green-700" : "bg-red-700"
								}`}
								aria-label={
									guessCard.name === goal.name
										? "Card name correct"
										: `Card name incorrect: guessed ${guessCard.name}`
								}>
								{guessCard.name}
							</div>
							{guessCard.cmc === goal.cmc ? (
								<div
									className={
										"py-2 border border-gray-700 bg-green-700 flex justify-center relative items-center"
									}
									aria-label='Mana cost correct'>
									<i
										className={`ms ms-${guessCard.cmc} ms-cost ms-2x ms-shadow `}></i>
								</div>
							) : (
								<>
									{guessCard?.cmc !== undefined &&
									goal?.cmc !== undefined &&
									guessCard.cmc > goal.cmc ? (
										<div
											className="py-2 border border-gray-700 bg-red-700 flex justify-center gap-5 after:content-[''] after:clip-down-arrow relative items-center "
											aria-label={`Mana cost incorrect: ${guessCard.cmc} is too high, should be lower`}>
											<i
												className={`ms ms-${guessCard.cmc} ms-cost ms-2x ms-shadow relative z-10 `}></i>
										</div>
									) : (
										<div
											className="py-2 border border-gray-700 bg-red-700 flex justify-center gap-5 after:content-[''] after:clip-up-arrow relative items-center"
											aria-label={`Mana cost incorrect: ${guessCard.cmc} is too low, should be higher`}>
											<i
												className={`ms ms-${guessCard.cmc} ms-cost ms-2x ms-shadow relative z-10`}></i>
										</div>
									)}
								</>
							)}
							<div
								className={colorHelper()}
								aria-label={(() => {
									const guessColors = guessCard.colors ?? [];
									const goalColors = goal.colors ?? [];
									const overlap = guessColors.filter((x) =>
										goalColors.includes(x),
									);
									const exact =
										guessColors.length === goalColors.length &&
										overlap.length === goalColors.length;
									if (exact) return "Colors correct";
									if (overlap.length > 0)
										return `Colors partially correct: some colors match but not all`;
									return `Colors incorrect: no matching colors`;
								})()}>
								{guessCard.colors?.length ? (
									guessCard.colors?.map((color) => (
										<i
											key={color}
											className={`ms ms-${color.toLowerCase()}  ms-cost ms-shadow`}
											aria-hidden='true'></i>
									))
								) : (
									<i
										key={"c"}
										className={`ms ms-c ms-cost ms-shadow`}
										aria-hidden='true'></i>
								)}
							</div>
							<div
								className={`py-2 border border-gray-700  content-center ${
									guessCard.rarity === goal.rarity
										? "bg-green-700"
										: "bg-red-700"
								}`}
								aria-label={
									guessCard.rarity === goal.rarity
										? "Rarity correct"
										: `Rarity incorrect: guessed ${capitalizeFirstLetter(
												guessCard?.rarity,
											)}`
								}>
								{capitalizeFirstLetter(guessCard?.rarity)}
							</div>

							{guessCard.released_at === goal.released_at ? (
								<div
									className={`py-2 border border-gray-700 bg-green-700`}
									aria-label='Release date correct'>
									<div className='flex justify-center flex-col'>
										<i
											className={`ss ss-${guessCard.set} ss-${guessCard.rarity} ss-grad ss-2x`}
											title={guessCard.set_name}
											aria-hidden='true'></i>
										<span>{getYear(guessCard.released_at) || "N/A"}</span>
									</div>
								</div>
							) : (
								<>
									{getYear(guessCard.released_at) >
									getYear(goal.released_at) ? (
										<div
											className={`py-2 border border-gray-700 bg-red-700 relative after:content-[''] after:clip-down-arrow`}
											aria-label={`Release date incorrect: ${getYear(
												guessCard.released_at,
											)} is too recent, should be earlier`}>
											<div className='flex justify-center flex-col'>
												<i
													className={`ss ss-${guessCard.set} ss-${guessCard.rarity}  ss-grad ss-2x z-10 relative`}
													title={guessCard.set_name}
													aria-hidden='true'></i>
												<span className='z-10 relative'>
													{getYear(guessCard.released_at) || "N/A"}
												</span>
											</div>
										</div>
									) : (
										<div
											className={`py-2 border border-gray-700 bg-red-700 relative after:content-[''] after:clip-up-arrow`}
											aria-label={`Release date incorrect: ${getYear(
												guessCard.released_at,
											)} is too old, should be more recent`}>
											<div className='flex justify-center flex-col'>
												<i
													className={`ss ss-${guessCard.set} ss-${guessCard.rarity} ss-grad ss-2x z-10 relative`}
													title={guessCard.set_name}
													aria-hidden='true'></i>
												<span className='z-10 relative'>
													{getYear(guessCard.released_at) || "N/A"}
												</span>
											</div>
										</div>
									)}
								</>
							)}
							<div
								className={typeHelper()}
								aria-label={(() => {
									if (
										supertypeDetail.exact === true &&
										typeDetail.exact === true
									)
										return "Type/Supertype correct";
									if (
										typeDetail.exact === true ||
										supertypeDetail.partial === true ||
										typeDetail.partial === true
									)
										return "Type/Supertype partially correct";
									return "Type/Supertype incorrect";
								})()}>
								{guessTypes.supertypes.concat(guessTypes.types).join(" ")}
							</div>
							<div
								className={`py-2 border border-gray-700 ${subHelper()} rounded-br-lg rounded-tr-lg`}
								aria-label={(() => {
									if (subtypeDetail.exact === true) return "Subtype correct";
									if (subtypeDetail.partial === true)
										return "Subtype partially correct";
									return "Subtype incorrect";
								})()}>
								{guessTypes.subtypes.join(" ")}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default GuessTable;
