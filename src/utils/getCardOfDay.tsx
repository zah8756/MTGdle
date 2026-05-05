// utils/getCardOfTheDay.js
export function getCardOfTheDay(cardCount: number) {
	const msInDay = 86400000;
	const epochMs = new Date(2025, 10, 20).valueOf(); // base date
	const dayNumber = Math.floor((Date.now() - epochMs) / msInDay);

	// Simple deterministic pseudo-random generator
	const randomValue = seededRandom(dayNumber);

	return Math.floor(randomValue * cardCount);
}

// helper: simple seeded RNG
function seededRandom(seed: number) {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x); // gives 0 ≤ result < 1
}

