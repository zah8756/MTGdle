import { useState } from "react";
import type { Card } from "../App";

interface InputProps {
	onGuess: (guess: string) => void;
	cards: Card[];
}

const Input = ({ onGuess, cards }: InputProps) => {
	const [input, setInput] = useState("");
	const [autoList, setAutoList] = useState<Card[]>([]);

	const handleSubmit = () => {
		if (!input.trim()) return;
		onGuess(input.trim());
		setInput("");
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	const handleAutoComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setInput(newValue);

		if (newValue.length >= 3) {
			console.log("start auto complete");
			const filterdCards = cards.filter((card) =>
				card.name.toLocaleLowerCase().includes(newValue.toLocaleLowerCase())
			);
			setAutoList(filterdCards.map((card) => card));
		} else {
			setAutoList([]);
		}
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
			<ul className="flex flex-col overflow-y-scroll max-h-80">
				{autoList.map((listElement) => (
					<li key={listElement.name}>{listElement.name}</li>
				))}
			</ul>
		</div>
	);
};

export default Input;
