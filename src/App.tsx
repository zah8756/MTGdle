import { useState, useEffect } from "react";
import "./App.css";
import { getCardOfTheDay } from "./utils/getCardOfDay";
import Input from "./Components/Input";
import GuessTable from "./Components/GuessTable";
import GameStatus from "./Components/GameStatus";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

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

// URL to fetch cards data from (can be overridden via environment variable)
// For local development, use local file. For production, use GitHub release.
const CARDS_DATA_URL =
	import.meta.env.VITE_CARDS_DATA_URL ||
	(import.meta.env.DEV
		? "/CardsMinimal.json" // Local development: use file in public folder
		: "https://github.com/zah8756/MTGdle/releases/download/V0.1-alpha/CardsMinimal.json"); // Production: GitHub release

function App() {
	//state values
	const [cards, setCards] = useState<Card[]>([]);
	const [goal, setGoal] = useState<Card>({ name: "test" });
	const [guess, setGuess] = useState<Card[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	//derived values
	const guessCount: number = 20;
	const GuessesLeft: number = guessCount - guess.length;
	const isGameLost: boolean = GuessesLeft <= 0 && guess.length > 0;
	const lastGussedCard: Card | undefined = guess[guess.length - 1];
	const gameWon: boolean = lastGussedCard?.name === goal.name;
	const isGameOver: boolean = isGameLost || gameWon;
	const isLastGuessIncorrect: boolean =
		lastGussedCard !== undefined && lastGussedCard.name !== goal.name;

	const cardOfDay = (cards: Card[]): Card => {
		const index = getCardOfTheDay() - 1; // Convert from 1-35750 to 0-35749
		return cards[index % cards.length];
	};

	// Load cards data asynchronously
	useEffect(() => {
		const loadCards = async () => {
			try {
				const response = await fetch(CARDS_DATA_URL);
				if (!response.ok) {
					throw new Error(
						`Failed to load cards data: ${response.status} ${response.statusText}`
					);
				}
				const cardData = (await response.json()) as Card[];
				setCards(cardData);
				setIsLoading(false);
			} catch (error: unknown) {
				const errorMessage =
					error instanceof Error
						? error.message
						: "Unknown error loading cards data";
				console.error("Error loading cards:", errorMessage);
				setError(errorMessage);
				setIsLoading(false);
			}
		};

		loadCards();
	}, []);

	// Set goal card once cards are loaded
	useEffect(() => {
		if (cards.length > 0) {
			setGoal(cardOfDay(cards));
		}
	}, [cards]);

	if (isLoading) {
		return (
			<div className='flex flex-col min-h-screen items-center justify-center'>
				<Header />
				<main className='flex-grow flex items-center justify-center'>
					<p>Loading cards...</p>
				</main>
				<Footer />
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex flex-col min-h-screen items-center justify-center'>
				<Header />
				<main className='flex-grow flex flex-col items-center justify-center gap-4'>
					<p className='text-red-500'>Error loading cards data</p>
					<p className='text-sm text-gray-500'>{error}</p>
					<p className='text-sm text-gray-500'>
						Please check that the cards data file is available.
					</p>
				</main>
				<Footer />
			</div>
		);
	}

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
