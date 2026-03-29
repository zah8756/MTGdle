import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRYFALL_BULK_API = "https://api.scryfall.com/bulk-data";

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

const EXCLUDED_SETS = ["ugl", "unh", "ust", "und", "unf", "unk", "fjmp"];

const EXCLUDED_LAYOUTS = [
	"token",
	"art_series",
	"planar",
	"scheme",
	"vanguard",
];

function httpsGet(url) {
	return new Promise((resolve, reject) => {
		https.get(url, { headers: { "User-Agent": "MTGdle/1.0" } }, (res) => {
			// Follow redirects
			if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
				return resolve(httpsGet(res.headers.location));
			}
			if (res.statusCode !== 200) {
				return reject(new Error(`HTTP ${res.statusCode}: ${url}`));
			}
			let data = "";
			res.on("data", (chunk) => (data += chunk));
			res.on("end", () => resolve(data));
			res.on("error", reject);
		}).on("error", reject);
	});
}

function downloadFile(url, destPath) {
	return new Promise((resolve, reject) => {
		console.log(`Downloading from: ${url}`);
		const file = fs.createWriteStream(destPath);

		function doGet(currentUrl) {
			https.get(currentUrl, { headers: { "User-Agent": "MTGdle/1.0" } }, (res) => {
				// Follow redirects
				if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
					return doGet(res.headers.location);
				}
				if (res.statusCode !== 200) {
					file.close();
					fs.unlinkSync(destPath);
					return reject(new Error(`HTTP ${res.statusCode} downloading bulk data`));
				}

				const totalBytes = parseInt(res.headers["content-length"] || "0", 10);
				let downloadedBytes = 0;
				let lastLoggedPercent = -1;

				res.on("data", (chunk) => {
					downloadedBytes += chunk.length;
					if (totalBytes > 0) {
						const percent = Math.floor((downloadedBytes / totalBytes) * 100);
						if (percent !== lastLoggedPercent && percent % 10 === 0) {
							lastLoggedPercent = percent;
							const mb = (downloadedBytes / 1024 / 1024).toFixed(1);
							const totalMb = (totalBytes / 1024 / 1024).toFixed(1);
							console.log(`  Progress: ${percent}% (${mb} / ${totalMb} MB)`);
						}
					}
				});

				res.pipe(file);
				file.on("finish", () => {
					file.close();
					resolve();
				});
				file.on("error", (err) => {
					fs.unlinkSync(destPath);
					reject(err);
				});
				res.on("error", (err) => {
					fs.unlinkSync(destPath);
					reject(err);
				});
			}).on("error", reject);
		}

		doGet(url);
	});
}

function optimizeCards(cardsData) {
	console.log(`Total cards in bulk data: ${cardsData.length}`);

	const filteredCards = cardsData.filter((card) => {
		if (EXCLUDED_LAYOUTS.includes(card.layout)) return false;
		if (EXCLUDED_SETS.includes(card.set)) return false;
		if (card.games && !card.games.includes("paper")) return false;
		if (!card.oracle_text && !card.type_line) return false;
		return true;
	});

	console.log(`After filtering: ${filteredCards.length} cards`);

	const optimizedCards = filteredCards.map((card) => {
		const optimized = {};
		ESSENTIAL_FIELDS.forEach((field) => {
			if (card[field] !== undefined) {
				optimized[field] = card[field];
			}
		});
		if (card.oracle_id) optimized.oracle_id = card.oracle_id;
		return optimized;
	});

	console.log("Deduplicating — keeping oldest printing of each card...");
	const cardMap = new Map();

	optimizedCards.forEach((card) => {
		const groupKey = card.oracle_id || card.name;
		const existing = cardMap.get(groupKey);

		if (!existing) {
			cardMap.set(groupKey, card);
		} else {
			const existingTs = existing.released_at
				? new Date(existing.released_at).getTime()
				: Infinity;
			const currentTs = card.released_at
				? new Date(card.released_at).getTime()
				: Infinity;
			if (currentTs < existingTs) {
				cardMap.set(groupKey, card);
			}
		}
	});

	const uniqueCards = Array.from(cardMap.values()).map((card) => {
		const { oracle_id, ...rest } = card;
		return rest;
	});

	console.log(
		`After deduplication: ${uniqueCards.length} unique cards (removed ${
			optimizedCards.length - uniqueCards.length
		} duplicates)`
	);

	return uniqueCards;
}

async function main() {
	try {
		// Step 1: Get the download URL from the Scryfall bulk data API
		console.log("Fetching Scryfall bulk data index...");
		const apiResponse = JSON.parse(await httpsGet(SCRYFALL_BULK_API));
		const defaultCards = apiResponse.data.find(
			(entry) => entry.type === "default_cards"
		);
		if (!defaultCards) {
			throw new Error('Could not find "default_cards" entry in Scryfall bulk data API');
		}

		const downloadUrl = defaultCards.download_uri;
		const updatedAt = defaultCards.updated_at;
		console.log(`Scryfall bulk data last updated: ${updatedAt}`);
		console.log(
			`Bulk data size: ~${(defaultCards.compressed_size / 1024 / 1024).toFixed(0)} MB compressed`
		);

		// Step 2: Download the bulk data file
		const rawPath = path.join(__dirname, "../src/default-cards-new.json");
		console.log(`\nDownloading bulk data to ${rawPath} ...`);
		console.log("(This is a large file — ~500 MB — please be patient)\n");
		await downloadFile(downloadUrl, rawPath);
		console.log("\nDownload complete.");

		// Step 3: Parse and optimize
		console.log("\nParsing bulk data (this may take a moment)...");
		const cardsData = JSON.parse(fs.readFileSync(rawPath, "utf8"));
		const uniqueCards = optimizeCards(cardsData);

		// Step 4: Write to both src/ and public/
		const outputJson = JSON.stringify(uniqueCards);

		const srcPath = path.join(__dirname, "../src/CardsMinimal.json");
		const publicPath = path.join(__dirname, "../public/CardsMinimal.json");

		console.log("\nWriting CardsMinimal.json...");
		fs.writeFileSync(srcPath, outputJson);
		fs.writeFileSync(publicPath, outputJson);

		const rawSize = (fs.statSync(rawPath).size / 1024 / 1024).toFixed(1);
		const outSize = (fs.statSync(srcPath).size / 1024 / 1024).toFixed(1);

		console.log(`\nDone!`);
		console.log(`  Raw bulk data:       ${rawSize} MB`);
		console.log(`  CardsMinimal.json:   ${outSize} MB`);
		console.log(`  Written to: ${srcPath}`);
		console.log(`  Written to: ${publicPath}`);
	} catch (err) {
		console.error("\nError:", err.message);
		process.exit(1);
	}
}

main();
