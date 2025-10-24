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
		setInput(newValue);
		setGuessCard(undefined); // Clear selected card when typing

		if (newValue.length >= 3) {
			console.log("start auto complete");
			const filterdCards = cards.filter((card) =>
				card.name.toLowerCase().includes(newValue.toLowerCase())
			);
			setAutoList(filterdCards.map((card) => card));
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
				placeholder='Type out a card'
				onChange={handleAutoComplete}
				onKeyDown={handleKeyPress}
			/>
			<button onClick={handleSubmit}>Submit</button>
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
		</div>
	);
};

export default Input;
