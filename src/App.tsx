import { useState, useEffect } from "react";
import "./App.css";
import cardData from "./CardsMinimal.json";
import { getCardOfTheDay } from "./utils/getCardOfDay";
import Input from "./Components/Input";
import GuessTable from "./Components/GuessTable";
import GameStatus from "./Components/GameStatus";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

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
	//state values
	const [goal, setGoal] = useState<Card>({ name: "test" });
	const [guess, setGuess] = useState<Card[]>([]);

	//derived values
	const guessCount: number = 20;
	const GuessesLeft: number = guessCount - guess.length;
	const isGameLost: boolean = GuessesLeft <= 0 && guess.length > 0;
	const lastGussedCard: Card | undefined = guess[guess.length - 1];
	const gameWon: boolean = lastGussedCard?.name === goal.name;
	const isGameOver: boolean = isGameLost || gameWon;
	const isLastGuessIncorrect: boolean =
		lastGussedCard !== undefined && lastGussedCard.name !== goal.name;

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

	useEffect(() => {
		console.log(getCard());
		setGoal(cardOfDay());
		console.log(goal);
	}, [goal]);

	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className='flex-grow'>
				<GameStatus
					isGameWon={gameWon}
					isGameLost={isGameLost}
					isGameOver={isGameOver}
					guessCountLeft={GuessesLeft}
					lastGuessWrong={isLastGuessIncorrect}
				/>
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
				<GuessTable guess={guess} goal={goal} />
			</main>
			<Footer />
		</div>
	);
}

export default App;
