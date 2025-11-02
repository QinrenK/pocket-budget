/**
 * Categorization Engine
 * Matches transactions to categories using vendor rules and keyword matching
 * Supports bilingual (EN/中文) keyword arrays
 */

export interface Category {
  id: number;
  name: string;
  keywords_en: string[];
  keywords_zh: string[];
  icon: string;
  color: string;
  is_system: boolean;
}

export interface VendorRule {
  id: number;
  vendor: string;
  category_id: number;
}

export interface CategorizationResult {
  categoryId: number | null;
  categoryName: string;
  confidence: 'high' | 'medium' | 'low';
  matchedBy: 'vendor' | 'keyword-en' | 'keyword-zh' | 'fallback';
  matchedKeywords?: string[];
}

/**
 * Normalize text for matching (lowercase, trim)
 */
function normalizeForMatching(text: string): string {
  return text.toLowerCase().trim();
}

/**
 * Check if text contains Chinese characters
 */
function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text);
}

/**
 * Match against vendor rules (exact and substring matching)
 * Priority: Exact match > Substring match
 */
function matchVendorRules(
  text: string,
  items: Array<{ name: string }>,
  vendorRules: VendorRule[],
  categories: Category[]
): CategorizationResult | null {
  const normalizedText = normalizeForMatching(text);
  const allText = [text, ...items.map((i) => i.name)].join(' ').toLowerCase();

  // Try exact match first
  for (const rule of vendorRules) {
    const normalizedVendor = normalizeForMatching(rule.vendor);

    if (normalizedText.includes(normalizedVendor)) {
      const category = categories.find((c) => c.id === rule.category_id);
      if (category) {
        return {
          categoryId: category.id,
          categoryName: category.name,
          confidence: 'high',
          matchedBy: 'vendor',
          matchedKeywords: [rule.vendor],
        };
      }
    }
  }

  // Try substring match in all text
  for (const rule of vendorRules) {
    const normalizedVendor = normalizeForMatching(rule.vendor);

    if (allText.includes(normalizedVendor)) {
      const category = categories.find((c) => c.id === rule.category_id);
      if (category) {
        return {
          categoryId: category.id,
          categoryName: category.name,
          confidence: 'medium',
          matchedBy: 'vendor',
          matchedKeywords: [rule.vendor],
        };
      }
    }
  }

  return null;
}

/**
 * Match against category keywords (EN and 中文)
 * Returns categories with match counts for tie-breaking
 */
function matchKeywords(
  text: string,
  items: Array<{ name: string }>,
  categories: Category[]
): Array<{ category: Category; matchCount: number; matchedKeywords: string[]; language: 'en' | 'zh' }> {
  const normalizedText = normalizeForMatching(text);
  const allText = [text, ...items.map((i) => i.name)].join(' ');
  const allTextNormalized = normalizeForMatching(allText);
  const isChinese = containsChinese(allText);

  const matches: Array<{
    category: Category;
    matchCount: number;
    matchedKeywords: string[];
    language: 'en' | 'zh';
  }> = [];

  for (const category of categories) {
    const matchedKeywordsEn: string[] = [];
    const matchedKeywordsZh: string[] = [];

    // Match English keywords
    for (const keyword of category.keywords_en) {
      const normalizedKeyword = normalizeForMatching(keyword);
      if (allTextNormalized.includes(normalizedKeyword)) {
        matchedKeywordsEn.push(keyword);
      }
    }

    // Match Chinese keywords
    for (const keyword of category.keywords_zh) {
      if (allText.includes(keyword)) {
        matchedKeywordsZh.push(keyword);
      }
    }

    const totalMatches = matchedKeywordsEn.length + matchedKeywordsZh.length;

    if (totalMatches > 0) {
      // Prefer language-specific matches
      const language = isChinese && matchedKeywordsZh.length > 0 ? 'zh' : 'en';
      const matchedKeywords =
        language === 'zh' ? matchedKeywordsZh : [...matchedKeywordsEn, ...matchedKeywordsZh];

      matches.push({
        category,
        matchCount: totalMatches,
        matchedKeywords,
        language,
      });
    }
  }

  // Sort by match count (descending)
  matches.sort((a, b) => b.matchCount - a.matchCount);

  return matches;
}

/**
 * Main categorization function
 * Order of inference:
 * 1. Vendor rules (exact/substring match)
 * 2. Keyword rules (EN/中文)
 * 3. Fallback to "Other" or null
 */
export function categorizeTransaction(
  rawText: string,
  items: Array<{ name: string; amount: number }>,
  vendor: string | undefined,
  categories: Category[],
  vendorRules: VendorRule[]
): CategorizationResult {
  // Step 1: Try vendor rules
  const vendorText = vendor || rawText;
  const vendorMatch = matchVendorRules(vendorText, items, vendorRules, categories);
  if (vendorMatch) {
    return vendorMatch;
  }

  // Step 2: Try keyword matching
  const keywordMatches = matchKeywords(rawText, items, categories);
  if (keywordMatches.length > 0) {
    const bestMatch = keywordMatches[0];
    return {
      categoryId: bestMatch.category.id,
      categoryName: bestMatch.category.name,
      confidence: bestMatch.matchCount > 2 ? 'high' : 'medium',
      matchedBy: bestMatch.language === 'zh' ? 'keyword-zh' : 'keyword-en',
      matchedKeywords: bestMatch.matchedKeywords,
    };
  }

  // Step 3: Fallback to "Other" category
  const otherCategory = categories.find((c) => c.name === 'Other');
  if (otherCategory) {
    return {
      categoryId: otherCategory.id,
      categoryName: otherCategory.name,
      confidence: 'low',
      matchedBy: 'fallback',
    };
  }

  // No category found
  return {
    categoryId: null,
    categoryName: 'Uncategorized',
    confidence: 'low',
    matchedBy: 'fallback',
  };
}

/**
 * Learn from user override (create or update vendor rule)
 * This should be called when user manually changes category
 */
export function learnFromOverride(
  vendor: string | undefined,
  newCategoryId: number,
  existingVendorRules: VendorRule[]
): VendorRule | null {
  if (!vendor) return null;

  // Check if rule already exists
  const existingRule = existingVendorRules.find(
    (r) => normalizeForMatching(r.vendor) === normalizeForMatching(vendor)
  );

  if (existingRule) {
    // Update existing rule
    return {
      ...existingRule,
      category_id: newCategoryId,
    };
  }

  // Create new rule
  return {
    id: Date.now(), // Temporary ID, will be replaced by database
    vendor,
    category_id: newCategoryId,
  };
}

/**
 * Get category confidence level as percentage
 */
export function getConfidencePercentage(confidence: 'high' | 'medium' | 'low'): number {
  const map = {
    high: 90,
    medium: 70,
    low: 40,
  };
  return map[confidence];
}

/**
 * Suggest keywords to add to category based on common words
 */
export function suggestKeywords(
  transactionsInCategory: Array<{ rawText: string; items: Array<{ name: string }> }>,
  existingKeywords: string[]
): string[] {
  const wordCounts = new Map<string, number>();
  const existingSet = new Set(existingKeywords.map((k) => normalizeForMatching(k)));

  // Count word frequency
  for (const tx of transactionsInCategory) {
    const allText = [tx.rawText, ...tx.items.map((i) => i.name)].join(' ');
    const words = allText
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2); // Ignore very short words

    for (const word of words) {
      if (!existingSet.has(word)) {
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      }
    }
  }

  // Sort by frequency and return top suggestions
  const suggestions = Array.from(wordCounts.entries())
    .filter(([_, count]) => count >= 3) // At least 3 occurrences
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 10);

  return suggestions;
}

/**
 * Bulk categorize multiple transactions
 */
export function bulkCategorize(
  transactions: Array<{
    rawText: string;
    items: Array<{ name: string; amount: number }>;
    vendor?: string;
  }>,
  categories: Category[],
  vendorRules: VendorRule[]
): CategorizationResult[] {
  return transactions.map((tx) =>
    categorizeTransaction(tx.rawText, tx.items, tx.vendor, categories, vendorRules)
  );
}

