import { useState, useEffect } from "react";
import "./App.css";
import cardData from "./CardsMinimal.json";
import { getCardOfTheDay } from "./utils/getCardOfDay";
import Input from "./Components/Input";

const cards = cardData as Card[];

export interface Card {
	name: string;
	mana_cost?: string;
	cmc?: number;
	type_line?: string;
	power?: string;
	toughness?: string;
	colors?: string[];
	color_identity?: string[];
	keywords?: string[];
	rarity?: string;
	set?: string;
	set_name?: string;
	released_at?: string;
}

function App() {
	const [goal, setGoal] = useState<Card>({ name: "test" });
	const [guess, setGuess] = useState<Card[]>([]);
	const [playing, setPlaying] = useState({ gameOver: false, gameWon: false });
	const guessCount = 20;

	const cardOfDay = (): Card => {
		const index = getCardOfTheDay() - 1; // Convert from 1-35750 to 0-35749
		return cards[index % cards.length];
	};

	const getCard = async () => {
		const url = "https://api.scryfall.com/cards/random";
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"User-Agent": "MTGdle/1.0",
					"Content-Type": "application/json",
					accept: "*/*",
				},
			});
			const result = await response.json();
			console.log(result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error(error);
			}
		}
	};

	const checkWin = (newGuess: Card) => {
		if (newGuess.name === goal.name) {
			setPlaying({ gameOver: true, gameWon: true });
		} else if (guess.length >= guessCount) {
			setPlaying({ gameOver: true, gameWon: false });
		}
	};

	useEffect(() => {
		console.log(getCard());
		setGoal(cardOfDay());
		console.log(goal);
	}, [goal]);

	return (
		<>
			<div className='flex'>
				<p>{goal?.name}</p>
			</div>
			<br />
			<Input
				onGuess={(guess: Card) => {
					setGuess((currentGuess) => [...currentGuess, guess]);
				}}
				cards={cards}
			/>
			<ul>
				{guess.map((guessCard) => (
					<li key={guessCard.name}>{guessCard.name}</li>
				))}
			</ul>
		</>
	);
}

export default App;
