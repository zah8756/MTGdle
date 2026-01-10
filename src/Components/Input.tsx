import { useState, useEffect, useRef } from "react";
import type { Card } from "../App";

interface InputProps {
	onGuess: (card: Card) => void;
	cards: Card[];
}

const Input = ({ onGuess, cards }: InputProps) => {
	const [input, setInput] = useState("");
	const [autoList, setAutoList] = useState<Card[]>([]);
	const [guessCard, setGuessCard] = useState<Card>();
	const [invalid, setInvalid] = useState(false);
	const [autoListActive, setAutoListActive] = useState(-1);
	const [isKeyboardActive, setIsKeyboardActive] = useState(false);

	const activeItem = useRef<HTMLLIElement | null>(null);

	useEffect(() => {
		if (isKeyboardActive) {
			activeItem.current?.scrollIntoView({
				behavior: "auto",
				block: "center",
				inline: "nearest",
			});
		}
	}, [autoListActive, isKeyboardActive]);

	const handleSubmit = () => {
		if (guessCard) {
			onGuess(guessCard);
			setGuessCard(undefined);
			setInput("");
		} else if (autoListActive >= 0) {
			onGuess(autoList[autoListActive]);
			setInput("");
		} else if (input.trim()) {
			const exactMatch = cards.find(
				(card) => card.name.toLowerCase() === input.toLowerCase()
			);
			if (exactMatch) {
				onGuess(exactMatch);
				setInput("");
			} else {
				console.log("no cards match that descripon ");
				setInvalid(true);
			}
		}
		setAutoList([]);
		setAutoListActive(-1);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
		if (e.key === "ArrowUp") {
			setIsKeyboardActive(true);
			setAutoListActive((prev) => (prev -= prev > 0 ? 1 : 0));
		}
		if (e.key === "ArrowDown") {
			setIsKeyboardActive(true);
			setAutoListActive((prev) => (prev += prev < autoList.length - 1 ? 1 : 0));
		}
	};

	const handleAutoComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setInvalid(false);
		setInput(newValue);
		setGuessCard(undefined); // Clear selected card when typing
		setAutoListActive(-1);

		if (newValue.length >= 3) {
			console.log("start auto complete");
			//filter the cards based on the card name
			const filterdCards = cards.filter((card) =>
				card.name.toLowerCase().includes(newValue.toLowerCase())
			);
			//sort the cards based on alabetic charters
			const alphaFiltredCards = filterdCards.sort((a, b) =>
				a.name > b.name ? 1 : b.name > a.name ? -1 : 0
			);
			console.log(alphaFiltredCards);
			setAutoList(alphaFiltredCards.map((card) => card));
		} else {
			setAutoList([]);
		}
	};

	const handleCardSelect = (card: Card) => {
		setGuessCard(card);
		setInput(card.name); // Update input to show selected card
		setAutoList([]); // Hide autocomplete list
	};

	return (
		<div className="relative">
			<input
				type='text'
				value={input}
				placeholder='Type Card name ...'
				onChange={handleAutoComplete}
				onKeyDown={handleKeyPress}
				className='bg-white text-black border-2 rounded-md text-1xl p-1 sm:text-3xl sm:p-2'
			/>
			<button
				onClick={handleSubmit}
				type='submit'
				className='text-white ml-3 bg-black box-border border-2  delay-20 duration-300 ease-in-out hover:bg-[#383838] focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-3xl px-4 py-2.5 focus:outline-none rounded-md'>
				Submit
			</button>
			{!invalid ? (
				<ul className='flex flex-col overflow-y-scroll max-h-80 absolute min-w-[20rem] z-20 top-16 bg-black left-1/2 -translate-x-1/2'>
					{autoList.map((listElement, index) => (
						<li
							className={
								index === autoListActive
									? "bg-green-300 text-black cursor-pointer"
									: "cursor-pointer"
							}
							ref={index === autoListActive ? activeItem : null}
							key={listElement.name}
							onClick={() => handleCardSelect(listElement)}
							onMouseEnter={() => {
								setAutoListActive(index);
								setIsKeyboardActive(false);
							}}>
							{listElement.name}
						</li>
					))}
				</ul>
			) : (
				<>
					<br />
					<span>no cards match that descripon</span>
				</>
			)}
		</div>
	);
};

export default Input;
