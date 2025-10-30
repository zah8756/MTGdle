// Examples:
// "Artifact Creature — Myr Construct" -> { supertypes: ["Artifact"], types: ["Creature"], subtypes: ["Myr", "Construct"] }
// "Instant" -> { supertypes: [], types: ["Instant"], subtypes: [] }
// "Legendary Creature — Human Wizard" -> { supertypes: ["Legendary"], types: ["Creature"], subtypes: ["Human", "Wizard"] }

export interface CardTypeComponents {
	supertypes: string[];
	types: string[];
	subtypes: string[];
}

const SUPERTYPES: string[] = [
	"Basic",
	"Legendary",
	"Snow",
	"World",
];

const CARD_TYPES: string[] = [
	"Artifact",
	"Battle",
	"Creature",
	"Enchantment",
	"Instant",
	"Land",
	"Planeswalker",
	"Sorcery",
];

export function parseCardType(type_line?: string): CardTypeComponents {
	if (!type_line) {
		return { supertypes: [], types: [], subtypes: [] };
	}

	const result: CardTypeComponents = {
		supertypes: [],
		types: [],
		subtypes: [],
	};

	const parts = type_line.split(/—|–|-/).map((s) => s.trim());
	const left = parts[0] ?? "";
	const right = parts[1] ?? "";

	for (const value of left.split(/\s+/).filter(Boolean)) {
		if (SUPERTYPES.includes(value)) {
			result.supertypes.push(value);
		} else if (CARD_TYPES.includes(value)) {
			result.types.push(value);
		} else {
			result.subtypes.push(value);
		}
	}

	for (const value of right.split(/\s+/).filter(Boolean)) {
		result.subtypes.push(value);
	}

	return result;
}

export function compareCardTypes(
	guessType: string,
	goalType: string
): {
	supertypeMatch: boolean;
	typeMatch: boolean;
	subtypeMatch: boolean;
} {
	const guess = parseCardType(guessType);
	const goal = parseCardType(goalType);

	// TODO: Implement comparison logic
	// Check if any supertypes from guess match any supertypes in goal
	// Check if any types from guess match any types in goal
	// Check if any subtypes from guess match any subtypes in goal

	return {
		supertypeMatch: false, // TODO
		typeMatch: false, // TODO
		subtypeMatch: false, // TODO
	};
}
