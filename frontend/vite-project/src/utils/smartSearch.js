// Smart Search Utility
// Matches products using name, description, category, and synonym/typo-tolerant search

const SYNONYMS = {
  shaal: "shawl",
  shawl: "shawl",
  pashmina: "shawl",
  wrap: "shawl",
  stole: "shawl",

  rug: "carpet",
  carpet: "carpet",
  galeecha: "carpet",
                                                                            
  kesar: "saffron",
  saffron: "saffron",
  spice: "saffron",

  meva: "dry fruits",
  dryfruit: "dry fruits",
  "dry fruit": "dry fruits",
  nuts: "dry fruits",
  walnut: "dry fruits",
  almond: "dry fruits",
  badam: "dry fruits",
  akhroat: "dry fruits",

  jewellery: "jewelry",
  jewelry: "jewelry",
  necklace: "jewelry",
  earring: "jewelry",

  wood: "handicrafts",
  carving: "handicrafts",
  papier: "handicrafts",
  handicraft: "handicrafts",
};

function expandTerm(term) {
  const lower = term.toLowerCase().trim();
  return SYNONYMS[lower] || lower;
}

function fuzzyIncludes(text, term) {
  if (!text || !term) return false;
  const t = text.toLowerCase();
  const q = term.toLowerCase();

  if (t.includes(q)) return true;

  const words = t.split(/\s+/);
  for (const word of words) {
    if (levenshteinDistance(word, q) <= 1 && q.length > 3) {
      return true;
    }
  }
  return false;
}

function levenshteinDistance(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

export function smartSearchScore(product, query) {
  if (!query || !query.trim()) return 1;

  const expandedQuery = expandTerm(query);
  const rawQuery = query.toLowerCase().trim();

  const name = (product.name || "").toLowerCase();
  const description = (product.description || "").toLowerCase();
  const category = (product.category || "").toLowerCase();

  let score = 0;

  if (name === rawQuery) score += 100;
  if (fuzzyIncludes(name, rawQuery)) score += 50;
  if (fuzzyIncludes(name, expandedQuery)) score += 40;
  if (fuzzyIncludes(category, rawQuery) || fuzzyIncludes(category, expandedQuery)) score += 25;
  if (fuzzyIncludes(description, rawQuery) || fuzzyIncludes(description, expandedQuery)) score += 10;

  return score;
}

export function smartSearchFilter(products, query) {
  if (!query || !query.trim()) return products;

  return products
    .map((p) => ({ product: p, score: smartSearchScore(p, query) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
}