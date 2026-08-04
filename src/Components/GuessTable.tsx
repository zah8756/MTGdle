import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Card } from "../App";
import { compareCardTypes } from "../utils/parseCardType";
import mtgCardBack from "../assets/mtgCardBack.jpg";

const getYear = (releasedAt?: string): number => {
	if (!releasedAt) return 0;
	const year = parseInt(releasedAt.slice(0, 4), 10);
	return isNaN(year) ? 0 : year;
};

interface FlipCellProps {
	colIndex: number;
	isFlipped: boolean;
	front: React.ReactNode;
	className?: string;
}

const FLIP_DELAY = 150;

const FlipCell = ({ colIndex, isFlipped, front, className }: FlipCellProps) => (
	<div className={`perspective-normal [overflow:clip] ${className ?? ""}`}>
		<div
			style={{
				transitionDelay: isFlipped ? `${colIndex * FLIP_DELAY}ms` : "0ms",
			}}
			className={`relative transform-3d w-full h-full transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""}`}>
			<div className='absolute inset-0 backface-hidden flex items-center justify-center'>
				<img
					src={mtgCardBack}
					alt='mtg card back'
					className='w-full h-full object-cover rounded-lg'
				/>
			</div>
			<div className='backface-hidden rotate-y-180 w-full h-full'>{front}</div>
		</div>
	</div>
);

const GuessTable = ({ guess, goal }: { guess: Card[]; goal: Card }) => {
	console.log(goal);
	const lastRowRef = useRef<HTMLDivElement>(null);
	const rowsContainerRef = useRef<HTMLDivElement>(null);
	const [flippedRows, setFlippedRows] = useState<Set<number>>(new Set());

	useLayoutEffect(() => {
		if (guess.length === 0) return;
		const container = rowsContainerRef.current;
		if (!container) return;

		const scrollToBottom = () =>
			container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

		scrollToBottom(); // best-effort immediately
		document.fonts.ready.then(scrollToBottom); // correct once icon fonts settle
	}, [guess.length]);

	useEffect(() => {
		if (guess.length === 0) return;
		const timer = setTimeout(() => {
			setFlippedRows((prev) => new Set([...prev, guess.length - 1]));
		}, 50);
		return () => clearTimeout(timer);
	}, [guess.length]);

	return (
		<div className='mt-5 w-full min-w-0 overflow-x-auto overscroll-x-contain pb-48 rounded-lg'>
			<div className='grid grid-cols-9 text-center text-white font-bold bg-black/60 rounded-lg mb-4 min-w-[800px]'>
				<div className='p-3 justify-center items-center border flex border-gray-700 rounded-tl-lg rounded-bl-lg'>
					Guess #
				</div>
				<div className='p-3 justify-center items-center border flex border-gray-700'>
					Card{" "}
				</div>
				<div className='p-3 justify-center items-center border flex border-gray-700'>
					Card Name
				</div>
				<div className='p-3 justify-center items-center border flex border-gray-700'>
					Mana Cost
				</div>
				<div className='p-3 justify-center items-center border flex border-gray-700'>
					Colors
				</div>
				<div className='p-3 justify-center items-center border flex border-gray-700'>
					Rarity
				</div>
				<div className='p-3 justify-center items-center border flex border-gray-700'>
					Release Date/Set
				</div>
				<div className='p-3 justify-center items-center border flex border-gray-700'>
					Type/Super Type
				</div>
				<div className='p-3 justify-center items-center border flex border-gray-700 rounded-br-lg rounded-tr-lg'>
					Subtype
				</div>
			</div>

			<div
				ref={rowsContainerRef}
				className='space-y-2 min-w-[800px] max-h-160 overflow-y-auto pb-4'>
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
							ref={i === guess.length - 1 ? lastRowRef : null}
							className='grid grid-cols-9 text-center text-white rounded-lg wrap-anywhere-auto gap-2 min-h-24'>
							<div className='bg-black py-2 border border-gray-700 flex justify-center items-center font-bold rounded-lg'>
								{i + 1}
							</div>

							<FlipCell
								colIndex={1}
								isFlipped={flippedRows.has(i)}
								front={
									<img
										src={guessCard.image_uris?.normal}
										alt={guessCard.name}
										onLoad={() => {
											rowsContainerRef.current?.scrollTo({
												top: rowsContainerRef.current.scrollHeight,
												behavior: "smooth",
											});
										}}
										className='w-full h-full object-cover block backface-hidden rounded-lg'
									/>
								}
								className='rounded-lg'
							/>

							<FlipCell
								colIndex={2}
								isFlipped={flippedRows.has(i)}
								front={
									<div
										className={`py-2 border border-gray-700 content-center w-full h-full line-clamp-3 px-2 rounded-lg ${
											guessCard.name === goal.name
												? "bg-green-700"
												: "bg-red-700"
										}`}
										aria-label={
											guessCard.name === goal.name
												? "Card name correct"
												: `Card name incorrect: guessed ${guessCard.name}`
										}>
										{guessCard.name}
									</div>
								}
								className='rounded-lg'
							/>

							{guessCard.cmc === goal.cmc ? (
								<FlipCell
									colIndex={3}
									isFlipped={flippedRows.has(i)}
									front={
										<div
											className={
												"py-2 border border-gray-700 bg-green-700 flex justify-center relative items-center rounded-lg"
											}
											aria-label='Mana cost correct'>
											<i
												className={`ms ms-${guessCard.cmc} ms-cost ms-2x ms-shadow `}></i>
										</div>
									}
									className='rounded-lg'
								/>
							) : (
								<>
									{guessCard?.cmc !== undefined &&
									goal?.cmc !== undefined &&
									guessCard.cmc > goal.cmc ? (
										<FlipCell
											colIndex={3}
											isFlipped={flippedRows.has(i)}
											front={
												<div
													className="py-2 border border-gray-700 bg-red-700 flex justify-center w-full h-full gap-5 after:content-[''] after:clip-down-arrow relative items-center rounded-lg"
													aria-label={`Mana cost incorrect: ${guessCard.cmc} is too high, should be lower`}>
													<i
														className={`ms ms-${guessCard.cmc} ms-cost ms-2x ms-shadow relative z-10 `}></i>
												</div>
											}
											className='rounded-lg'
										/>
									) : (
										<FlipCell
											colIndex={3}
											isFlipped={flippedRows.has(i)}
											front={
												<div
													className="py-2 border border-gray-700 bg-red-700 flex justify-center w-full h-full gap-5 after:content-[''] after:clip-up-arrow relative items-center rounded-lg"
													aria-label={`Mana cost incorrect: ${guessCard.cmc} is too low, should be higher`}>
													<i
														className={`ms ms-${guessCard.cmc} ms-cost ms-2x ms-shadow relative z-10`}></i>
												</div>
											}
											className='rounded-lg'
										/>
									)}
								</>
							)}
							<FlipCell
								colIndex={4}
								isFlipped={flippedRows.has(i)}
								front={
									<div
										className={colorHelper() + " rounded-lg w-full h-full"}
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
													className={`ms ms-${color.toLowerCase()} ms-cost ms-shadow`}
													aria-hidden='true'></i>
											))
										) : (
											<i
												key={"c"}
												className={`ms ms-c ms-cost ms-shadow`}
												aria-hidden='true'></i>
										)}
									</div>
								}
								className='rounded-lg'
							/>
							<FlipCell
								colIndex={5}
								isFlipped={flippedRows.has(i)}
								front={
									<div
										className={`py-2 border border-gray-700 justify-center items-center content-center rounded-lg w-full h-full ${
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
								}
								className='rounded-lg'
							/>

							{getYear(guessCard.released_at) === getYear(goal.released_at) ? (
								<FlipCell
									colIndex={6}
									isFlipped={flippedRows.has(i)}
									front={
										<div
											className={`py-2 border border-gray-700 bg-green-700 flex justify-center items-center rounded-lg w-full h-full`}
											aria-label='Release date correct'>
											<div className='flex justify-center items-center flex-col'>
												<i
													className={`ss ss-${guessCard.set} ss-${guessCard.rarity} ss-grad ss-2x`}
													title={guessCard.set_name}
													aria-hidden='true'></i>
												<span>{getYear(guessCard.released_at) || "N/A"}</span>
											</div>
										</div>
									}
									className='rounded-lg'
								/>
							) : (
								<>
									{getYear(guessCard.released_at) >
									getYear(goal.released_at) ? (
										<FlipCell
											colIndex={6}
											isFlipped={flippedRows.has(i)}
											front={
												<div
													className={`py-2 border border-gray-700 bg-red-700 relative after:content-[''] after:clip-down-arrow flex justify-center items-center rounded-lg w-full h-full`}
													aria-label={`Release date incorrect: ${getYear(
														guessCard.released_at,
													)} is too recent, should be earlier`}>
													<div className='flex justify-center items-center flex-col'>
														<i
															className={`ss ss-${guessCard.set} ss-${guessCard.rarity}  ss-grad ss-2x z-10 relative`}
															title={guessCard.set_name}
															aria-hidden='true'></i>
														<span className='z-10 relative'>
															{getYear(guessCard.released_at) || "N/A"}
														</span>
													</div>
												</div>
											}
											className='rounded-lg'
										/>
									) : (
										<FlipCell
											colIndex={6}
											isFlipped={flippedRows.has(i)}
											front={
												<div
													className={`py-2 border border-gray-700 bg-red-700 relative after:content-[''] after:clip-up-arrow flex justify-center items-center rounded-lg w-full h-full`}
													aria-label={`Release date incorrect: ${getYear(
														guessCard.released_at,
													)} is too old, should be more recent`}>
													<div className='flex justify-center items-center flex-col'>
														<i
															className={`ss ss-${guessCard.set} ss-${guessCard.rarity} ss-grad ss-2x z-10 relative`}
															title={guessCard.set_name}
															aria-hidden='true'></i>
														<span className='z-10 relative'>
															{getYear(guessCard.released_at) || "N/A"}
														</span>
													</div>
												</div>
											}
											className='rounded-lg'
										/>
									)}
								</>
							)}
							<FlipCell
								colIndex={7}
								isFlipped={flippedRows.has(i)}
								front={
									<div
										className={`py-2 border border-gray-700 ${typeHelper()} rounded-lg w-full h-full`}
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
								}
								className='rounded-lg'
							/>
							<FlipCell
								colIndex={8}
								isFlipped={flippedRows.has(i)}
								front={
									<div
										className={`py-2 border border-gray-700 ${subHelper()} rounded-lg w-full h-full`}
										aria-label={(() => {
											if (subtypeDetail.exact === true)
												return "Subtype correct";
											if (subtypeDetail.partial === true)
												return "Subtype partially correct";
											return "Subtype incorrect";
										})()}>
										{guessTypes.subtypes.join(" ")}
									</div>
								}
								className='rounded-lg'
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default GuessTable;
