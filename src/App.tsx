import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import cardData from "./Cards.json";

function App() {
	const [count, setCount] = useState(0);

	const cardOfDay = () => {
		const index = Date.now() * 35750;
		return cardData[index % cardData.length];
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
		console.log(cardOfDay());
	}, []);

	return (
		<>
			<div>
				<a href='https://vite.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
