import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { chain } = require("stream-chain");
const { parser } = require("stream-json");
const { streamArray } = require("stream-json/streamers/stream-array.js");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Essential fields for a Wordle-style MTG game
const ESSENTIAL_FIELDS = [
	"name",
	"mana_cost",
	"cmc",
	"type_line",
	"power",
	"toughness",
	"colors",
	"color_identity",
	"rarity",
	"set",
	"set_name",
	"released_at",
	"image_uris",
];

// MTG sets we want to skip (all the joke/Un-sets and placeholder sets)
const EXCLUDED_SETS = ["ugl", "unh", "ust", "und", "unf", "unk", "fjmp"];

// Layouts to skip (you can expand this if needed)
const EXCLUDED_LAYOUTS = [
	"token",
	"double_faced_token",
	"emblem",
	"art_series",
	"planar",
	"scheme",
	"vanguard",
];

async function optimizeCards() {
	console.log("Reading default-cards-new.json...");
	const cardsPath = path.join(__dirname, "../src/default-cards-new.json");

	const cardsData = await new Promise((resolve, reject) => {
		const cards = [];
		const pipeline = chain([
			fs.createReadStream(cardsPath),
			parser(),
			streamArray(),
		]);
		pipeline.on("data", ({ value }) => cards.push(value));
		pipeline.on("end", () => resolve(cards));
		pipeline.on("error", reject);
	});

	console.log(`Original cards count: ${cardsData.length}`);

	// Filter out stuff we don't want
	const filteredCards = cardsData.filter((card) => {
		// Skip tokens or weird layouts
		if (EXCLUDED_LAYOUTS.includes(card.layout?.toLowerCase())) return false;
		// Skip Un-sets
		if (EXCLUDED_SETS.includes(card.set)) return false;
		// Skip MTG Arena exclusive cards (only include cards available in paper)
		if (card.games && !card.games.includes("paper")) return false;
		// Skip oversized cards
		if (card.oversized === true) return false;
		// Skip funny promo-only things without oracle_text
		if (!card.oracle_text && !card.type_line) return false;

		return true;
	});

	console.log(`Filtered cards count: ${filteredCards.length}`);

	// Create optimized cards with only essential fields
	const optimizedCards = filteredCards.map((card) => {
		const optimized = {};
		ESSENTIAL_FIELDS.forEach((field) => {
			if (card[field] !== undefined) {
				optimized[field] = card[field];
			}
		});
		// Keep oracle_id for deduplication if available
		if (card.oracle_id) {
			optimized.oracle_id = card.oracle_id;
		}
		return optimized;
	});

	// Group by oracle_id (or name if no oracle_id) and keep only the oldest printing
	console.log("Deduplicating cards and selecting oldest printing...");
	const cardMap = new Map();

	optimizedCards.forEach((card) => {
		// Use oracle_id for grouping (groups all printings of same card)
		// Fallback to name if oracle_id doesn't exist
		const groupKey = card.oracle_id || card.name;
		const existing = cardMap.get(groupKey);

		if (!existing) {
			// First time seeing this card
			cardMap.set(groupKey, card);
		} else {
			// Compare release dates to find the oldest printing
			const existingDate = existing.released_at;
			const currentDate = card.released_at;

			// Parse dates for comparison (format: "YYYY-MM-DD")
			const existingTimestamp = existingDate
				? new Date(existingDate).getTime()
				: Infinity;
			const currentTimestamp = currentDate
				? new Date(currentDate).getTime()
				: Infinity;

			// Keep the card with the earliest date (or keep existing if current has no date)
			if (currentTimestamp < existingTimestamp) {
				cardMap.set(groupKey, card);
			}
		}
	});

	// Convert map back to array and remove oracle_id (not needed in final output)
	const uniqueCards = Array.from(cardMap.values()).map((card) => {
		const { oracle_id, ...cardWithoutOracleId } = card;
		return cardWithoutOracleId;
	});

	console.log(
		`After deduplication: ${uniqueCards.length} unique cards (removed ${
			optimizedCards.length - uniqueCards.length
		} duplicate printings)`,
	);

	// Write optimized cards to both src/ and public/
	const optimizedPath = path.join(__dirname, "../src/CardsMinimal.json");
	const publicPath = path.join(__dirname, "../public/CardsMinimal.json");
	const outputJson = JSON.stringify(uniqueCards);
	fs.writeFileSync(optimizedPath, outputJson);
	fs.writeFileSync(publicPath, outputJson);

	// Get file sizes
	const originalSize = fs.statSync(cardsPath).size;
	const optimizedSize = fs.statSync(optimizedPath).size;

	console.log(
		`Original file size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`,
	);
	console.log(
		`Optimized file size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`,
	);
	console.log(
		`Size reduction: ${((1 - optimizedSize / originalSize) * 100).toFixed(1)}%`,
	);

	console.log("Optimization complete!");
	console.log(
		"You can now replace Cards.json with CardsMinimal.json to reduce load time.",
	);
}

optimizeCards().catch((err) => {
	console.error("Error during card optimization:", err.message);
	process.exit(1);
});
