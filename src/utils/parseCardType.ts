// Examples:
// "Artifact Creature — Myr Construct" -> { supertypes: ["Artifact"], types: ["Creature"], subtypes: ["Myr", "Construct"] }
// "Instant" -> { supertypes: [], types: ["Instant"], subtypes: [] }
// "Legendary Creature — Human Wizard" -> { supertypes: ["Legendary"], types: ["Creature"], subtypes: ["Human", "Wizard"] }

export interface CardTypeComponents {
	supertypes: string[];
	types: string[];
	subtypes: string[];
}

const SUPERTYPES: string[] = ["Basic", "Legendary", "Snow", "World"];

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

const normalize = (arr: string[]) => arr.map((s) => s.toLowerCase());
const matchDetail = (guessArr: string[], goalArr: string[]) => {
	const g = normalize(guessArr);
	const t = normalize(goalArr);
	const overlap = g.filter((x) => t.includes(x));
	const exact =
		g.length > 0 && g.length === t.length && overlap.length === t.length;
	const partial = overlap.length > 0 && !exact;
	return { partial, exact, overlapCount: overlap.length };
};

export function compareCardTypes(
	guessType: string,
	goalType: string
): {
	guessTypes: CardTypeComponents;
	goalTypes: CardTypeComponents;
	supertypeMatch: boolean;
	typeMatch: boolean;
	subtypeMatch: boolean;
	supertypeDetail: { partial: boolean; exact: boolean; overlapCount: number };
	typeDetail: { partial: boolean; exact: boolean; overlapCount: number };
	subtypeDetail: { partial: boolean; exact: boolean; overlapCount: number };
} {
	const guess = parseCardType(guessType);
	const goal = parseCardType(goalType);

	const supertypeDetail = matchDetail(guess.supertypes, goal.supertypes);
	const typeDetail = matchDetail(guess.types, goal.types);
	const subtypeDetail = matchDetail(guess.subtypes, goal.subtypes);

	return {
		guessTypes: guess,
		goalTypes: goal,
		supertypeMatch: supertypeDetail.partial || supertypeDetail.exact,
		typeMatch: typeDetail.partial || typeDetail.exact,
		subtypeMatch: subtypeDetail.partial || subtypeDetail.exact,
		supertypeDetail,
		typeDetail,
		subtypeDetail,
	};
}
