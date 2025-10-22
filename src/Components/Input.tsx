import { useState } from "react";

interface InputProps {
	onGuess: (guess: string) => void;
}

const Input = ({ onGuess }: InputProps) => {
	const [input, setInput] = useState("");
	const [autoList, setAutoList] = useState([]);

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

	return (
		<div>
			<input
				type='text'
				value={input}
				placeholder='Type out a card'
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyPress}
			/>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
};

export default Input;
