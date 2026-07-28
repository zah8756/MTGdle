import { useState, useEffect, useRef } from "react";
import type { Card } from "../App";
import debounce from "../utils/debounce";

interface InputProps {
	onGuess: (card: Card) => void;
	cards: Card[];
	disabled?: boolean;
}

const Input = ({ onGuess, cards, disabled = false }: InputProps) => {
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
				(card) => card.name.toLowerCase() === input.toLowerCase(),
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

	const debouncedFilter = useRef(
			debounce((value: string) => {
			if (value.length >= 3) {
				const filteredCards = cards.filter((card) =>
					card.name.toLowerCase().includes(value.toLowerCase()),
				);
				const alphaFilteredCards = [...filteredCards].sort((a, b) =>
					a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
				);
				setAutoList(alphaFilteredCards);
			} else {
				setAutoList([]);
			}
		}, 150),
	);

	useEffect(() => {
		debouncedFilter.current = debounce((value: string) => {
			if (value.length >= 3) {
				const filteredCards = cards.filter((card) =>
					card.name.toLowerCase().includes(value.toLowerCase()),
				);
				const alphaFilteredCards = [...filteredCards].sort((a, b) =>
					a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
				);
				setAutoList(alphaFilteredCards);
			} else {
				setAutoList([]);
			}
		}, 150);
	}, [cards]);

	const handleAutoComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setInvalid(false);
		setInput(newValue);
		setGuessCard(undefined);
		setAutoListActive(-1);
		debouncedFilter.current(newValue);
	};

	const handleCardSelect = (card: Card) => {
		setGuessCard(card);
		setInput(card.name); // Update input to show selected card
		setAutoList([]); // Hide autocomplete list
	};

	return (
		<div className='w-full max-w-6xl mx-auto px-4 flex items-center justify-center gap-4 md:flex-row flex-col'>
			{/* Input wrapped in relative so dropdown positions from it */}
			<div className='relative'>
				<input
					type='text'
					value={input}
					placeholder={disabled ? "Game over" : "Type card name..."}
					onChange={handleAutoComplete}
					onKeyDown={handleKeyPress}
					disabled={disabled}
					className={`border-2 rounded-md p-1 sm:p-2 text-xl sm:text-3xl w-72 sm:w-96 transition-colors ${
						disabled
							? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
							: invalid
								? "bg-white text-black border-red-500"
								: "bg-white text-black border-gray-300"
					}`}
				/>
				{invalid && (
					<p className='absolute left-0 top-full mt-1 text-red-400 text-xs'>
						No cards match that name.
					</p>
				)}
				{autoList.length > 0 && (
					<ul className='absolute top-full left-0 w-full mt-1 flex flex-col overflow-y-auto max-h-72 z-20 bg-neutral-900 border border-gray-700 rounded-md shadow-xl'>
						{autoList.map((listElement, index) => (
							<li
								className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
									index === autoListActive
										? "bg-green-700 text-white"
										: "text-gray-200 hover:bg-white/10"
								}`}
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
				)}
			</div>
			<button
				onClick={handleSubmit}
				type='submit'
				disabled={disabled}
				className='cursor-pointer text-white bg-black border-2 border-gray-600 duration-200 ease-in-out font-medium text-xl sm:text-3xl px-6 py-1.5 sm:py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-neutral-800 hover:enabled:border-gray-400'>
				Submit
			</button>
		</div>
	);
};

export default Input;
