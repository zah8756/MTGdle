import { useState } from "react";
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

	const handleSubmit = () => {
		if (guessCard) {
			onGuess(guessCard);
			setGuessCard(undefined);
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
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	const handleAutoComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setInvalid(false);
		setInput(newValue);
		setGuessCard(undefined); // Clear selected card when typing

		if (newValue.length >= 3) {
			console.log("start auto complete");
			const filterdCards = cards.filter((card) =>
				card.name.toLowerCase().includes(newValue.toLowerCase())
			);
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
		<div>
			<input
				type='text'
				value={input}
				placeholder='Type Card name ...'
				onChange={handleAutoComplete}
				onKeyDown={handleKeyPress}
				className='bg-white text-black border-2 rounded-md text-3xl p-2'
			/>
			<button
				onClick={handleSubmit}
				type='submit'
				className='text-white ml-3 bg-black box-border border-2  delay-20 duration-300 ease-in-out hover:bg-[#383838] focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-3xl px-4 py-2.5 focus:outline-none rounded-md'>
				Submit
			</button>
			{!invalid ? (
				<ul className='flex flex-col overflow-y-scroll max-h-80'>
					{autoList.map((listElement) => (
						<li
							className=' hover:bg-green-300 hover:text-black cursor-pointer'
							key={listElement.name}
							onClick={() => handleCardSelect(listElement)}>
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
