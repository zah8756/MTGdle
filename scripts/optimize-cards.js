import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Essential fields for a Wordle-style MTG game
const ESSENTIAL_FIELDS = [
	"name",
	"mana_cost",
	"cmc",
	"type_line",
	"oracle_text",
	"power",
	"toughness",
	"colors",
	"color_identity",
	"keywords",
	"rarity",
	"set",
	"set_name",
	"released_at",
	"artist",
];

// MTG sets we want to skip (all the joke/Un-sets)
const EXCLUDED_SETS = ["ugl", "unh", "ust", "und", "unf"];

// Layouts to skip (you can expand this if needed)
const EXCLUDED_LAYOUTS = ["token", "art_series", "planar", "scheme", "vanguard"];

function optimizeCards() {
	console.log("Reading Cards.json...");
	const cardsPath = path.join(__dirname, "../src/Cards.json");
	const cardsData = JSON.parse(fs.readFileSync(cardsPath, "utf8"));

	console.log(`Original cards count: ${cardsData.length}`);

	// Filter out stuff we don’t want
	const filteredCards = cardsData.filter((card) => {
		// Skip tokens or weird layouts
		if (EXCLUDED_LAYOUTS.includes(card.layout)) return false;
		// Skip Un-sets
		if (EXCLUDED_SETS.includes(card.set)) return false;
		// Skip digital-only
		if (card.digital) return false;
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
		return optimized;
	});

	// Write optimized cards
	const optimizedPath = path.join(__dirname, "../src/CardsMinimal.json");
	fs.writeFileSync(optimizedPath, JSON.stringify(optimizedCards, null, 0));

	// Get file sizes
	const originalSize = fs.statSync(cardsPath).size;
	const optimizedSize = fs.statSync(optimizedPath).size;

	console.log(
		`Original file size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`
	);
	console.log(
		`Optimized file size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`
	);
	console.log(
		`Size reduction: ${((1 - optimizedSize / originalSize) * 100).toFixed(1)}%`
	);

	console.log("Optimization complete!");
	console.log(
		"You can now replace Cards.json with CardsMinimal.json to reduce load time."
	);
}

optimizeCards();