/**
 * Text Parser for Expense Entries
 * Supports bilingual (English/中文) input with multiple formats
 * Goal: ≥90% accuracy on PRD test cases
 */

export interface ParsedItem {
  name: string;
  amount: number;
}

export interface ParseResult {
  success: boolean;
  items: ParsedItem[];
  total: number;
  rawText: string;
  vendor?: string;
  error?: string;
  candidates?: number[]; // Multiple possible totals when ambiguous
}

// Currency symbols and keywords (EN/中文)
const CURRENCY_SYMBOLS = ['$', '¥', 'C$', 'CAD', 'USD', 'CNY', 'RMB', 'CAD$', 'US$'];
const TOTAL_KEYWORDS_ZH = ['合计', '总计', '应付', '金额', '小计', '总额', '实付'];

// Common delimiters for splitting items
const DELIMITERS = /[,，;；\n]/;

/**
 * Normalize currency symbols and whitespace
 */
function normalizeCurrency(text: string): string {
  let normalized = text;

  // Remove currency symbols at start/end for cleaner parsing
  CURRENCY_SYMBOLS.forEach((symbol) => {
    const regex = new RegExp(`\\b${symbol.replace('$', '\\$')}\\s*`, 'gi');
    normalized = normalized.replace(regex, '');
  });

  // Normalize whitespace
  normalized = normalized.replace(/\s+/g, ' ').trim();

  return normalized;
}

/**
 * Extract all numbers from text (handles decimals)
 */
function extractNumbers(text: string): number[] {
  // Match numbers with optional decimal: 12, 12.9, 12.90, .99
  const numberRegex = /\d+\.?\d*|\.\d+/g;
  const matches = text.match(numberRegex);

  if (!matches) return [];

  return matches.map((m) => parseFloat(m)).filter((n) => !isNaN(n) && n > 0);
}

/**
 * Detect if text contains Chinese total keywords
 */
function detectChineseTotalKeyword(text: string): boolean {
  return TOTAL_KEYWORDS_ZH.some((keyword) => text.includes(keyword));
}

/**
 * Try to detect vendor name from common patterns
 */
function detectVendor(text: string): string | undefined {
  const lowerText = text.toLowerCase();

  // Common vendors (EN)
  const vendors = [
    'costco',
    'walmart',
    'no frills',
    'loblaws',
    'metro',
    'uber',
    'lyft',
    'starbucks',
    'tim hortons',
    'mcdonald',
    'amazon',
  ];

  // Common vendors (中文)
  const vendorsZh = ['星巴克', '麦当劳', '肯德基', '淘宝', '京东', '美团', '滴滴'];

  for (const vendor of vendors) {
    if (lowerText.includes(vendor)) {
      return vendor.charAt(0).toUpperCase() + vendor.slice(1);
    }
  }

  for (const vendor of vendorsZh) {
    if (text.includes(vendor)) {
      return vendor;
    }
  }

  return undefined;
}

/**
 * Parse a single item string into name and amount
 * Handles both "amount name" and "name amount" formats
 */
function parseItem(itemText: string): ParsedItem | null {
  const trimmed = normalizeCurrency(itemText.trim());
  if (!trimmed) return null;

  const numbers = extractNumbers(trimmed);
  if (numbers.length === 0) return null;

  // Pattern 1: "12.9 carrot" or "12.9 胡萝卜" (amount first)
  const pattern1 = /^([\d.]+)\s+(.+)$/;
  const match1 = trimmed.match(pattern1);
  if (match1) {
    const amount = parseFloat(match1[1]);
    const name = match1[2].trim();
    if (!isNaN(amount) && name) {
      return { name, amount };
    }
  }

  // Pattern 2: "carrot 12.9" or "牛肉 15" (amount last)
  const pattern2 = /^(.+?)\s+([\d.]+)$/;
  const match2 = trimmed.match(pattern2);
  if (match2) {
    const name = match2[1].trim();
    const amount = parseFloat(match2[2]);
    if (!isNaN(amount) && name) {
      return { name, amount };
    }
  }

  // Fallback: if only one number, use entire text as name
  if (numbers.length === 1) {
    const amount = numbers[0];
    const name = trimmed.replace(/[\d.]+/, '').trim() || 'Item';
    return { name, amount };
  }

  return null;
}

/**
 * Main parsing function
 */
export function parseExpenseText(rawText: string): ParseResult {
  if (!rawText || !rawText.trim()) {
    return {
      success: false,
      items: [],
      total: 0,
      rawText: '',
      error: "I couldn't find an amount. Try 'latte 4.50' 或 '拿铁 4.50'",
    };
  }

  const trimmed = rawText.trim();
  const vendor = detectVendor(trimmed);

  // Split by delimiters to handle multiple items
  const segments = trimmed.split(DELIMITERS).filter((s) => s.trim());

  // Try to parse each segment as an item
  const items: ParsedItem[] = [];
  const allNumbers: number[] = [];

  for (const segment of segments) {
    const item = parseItem(segment);
    if (item) {
      items.push(item);
      allNumbers.push(item.amount);
    } else {
      // Collect numbers even if we can't parse as item
      const nums = extractNumbers(segment);
      allNumbers.push(...nums);
    }
  }

  // If no items parsed, check if it's a single amount entry
  if (items.length === 0 && allNumbers.length > 0) {
    // Single number case: "uber 18.45" or "18.45"
    if (allNumbers.length === 1) {
      const amount = allNumbers[0];
      const name = normalizeCurrency(trimmed).replace(/[\d.]+/, '').trim() || vendor || 'Expense';
      items.push({ name, amount });
    } else {
      // Multiple numbers but couldn't parse - offer candidates
      return {
        success: false,
        items: [],
        total: 0,
        rawText: trimmed,
        vendor,
        error: 'Multiple amounts detected. Which is the total?',
        candidates: allNumbers.sort((a, b) => b - a), // Descending order
      };
    }
  }

  // No valid items or numbers found
  if (items.length === 0 && allNumbers.length === 0) {
    return {
      success: false,
      items: [],
      total: 0,
      rawText: trimmed,
      vendor,
      error: "I couldn't find an amount. Try 'latte 4.50' 或 '拿铁 4.50'",
    };
  }

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  // Check if there's a Chinese total keyword indicating this is a receipt
  const hasChineseTotalKeyword = detectChineseTotalKeyword(trimmed);
  if (hasChineseTotalKeyword && allNumbers.length > items.length) {
    // Likely a receipt, use largest number near total keyword
    const maxNumber = Math.max(...allNumbers);
    return {
      success: true,
      items: [{ name: vendor || 'Receipt', amount: maxNumber }],
      total: maxNumber,
      rawText: trimmed,
      vendor,
    };
  }

  return {
    success: true,
    items,
    total: parseFloat(total.toFixed(2)), // Round to 2 decimals
    rawText: trimmed,
    vendor,
  };
}

/**
 * Parse receipt OCR text (specialized for receipt format)
 */
export function parseReceiptText(ocrText: string): ParseResult {
  const lines = ocrText.split('\n').map((l) => l.trim());
  const allNumbers: number[] = [];
  let detectedTotal: number | null = null;

  // Look for total keywords (EN/中文)
  const totalKeywords = [...TOTAL_KEYWORDS_ZH, 'total', 'subtotal', 'amount', 'due'];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    // Check if line contains total keyword
    const hasTotalKeyword =
      totalKeywords.some((keyword) => lowerLine.includes(keyword.toLowerCase())) ||
      TOTAL_KEYWORDS_ZH.some((keyword) => line.includes(keyword));

    const numbers = extractNumbers(line);

    if (hasTotalKeyword && numbers.length > 0) {
      // Use the last/largest number on the total line
      detectedTotal = Math.max(...numbers);
      break;
    }

    allNumbers.push(...numbers);
  }

  // If no explicit total found, use largest number (common in receipts)
  if (!detectedTotal && allNumbers.length > 0) {
    detectedTotal = Math.max(...allNumbers);
  }

  if (!detectedTotal) {
    return {
      success: false,
      items: [],
      total: 0,
      rawText: ocrText,
      error: 'Could not detect total from receipt. Please enter manually.',
      candidates: allNumbers.length > 0 ? allNumbers.sort((a, b) => b - a) : undefined,
    };
  }

  const vendor = detectVendor(ocrText);

  return {
    success: true,
    items: [{ name: vendor || 'Receipt', amount: detectedTotal }],
    total: detectedTotal,
    rawText: ocrText,
    vendor,
  };
}

/**
 * Validate a parsed result
 */
export function validateParsedResult(result: ParseResult): boolean {
  if (!result.success) return false;
  if (result.items.length === 0) return false;
  if (result.total <= 0) return false;
  if (result.total > 1000000) return false; // Sanity check
  return true;
}

/**
 * Format amount for display with currency
 */
export function formatAmount(amount: number, currency: 'CAD' | 'USD' | 'CNY' = 'CAD'): string {
  const symbols = {
    CAD: 'C$',
    USD: '$',
    CNY: '¥',
  };

  return `${symbols[currency]}${amount.toFixed(2)}`;
}

/**
 * Test helper - run all PRD test cases
 */
interface TestResult {
  input: string;
  passed: boolean;
  result: ParseResult;
  expected: { total: number; items: number };
}

export function runTestCases(): { passed: number; failed: number; details: TestResult[] } {
  const testCases = [
    { input: '15 beef, 12.9 carrot', expectedTotal: 27.9, expectedItems: 2 },
    { input: '牛肉 15, 胡萝卜 12.9', expectedTotal: 27.9, expectedItems: 2 },
    { input: 'uber 18.45', expectedTotal: 18.45, expectedItems: 1 },
    { input: '$4.50', expectedTotal: 4.5, expectedItems: 1 },
    { input: 'C$4.50', expectedTotal: 4.5, expectedItems: 1 },
    { input: 'CAD 4.50', expectedTotal: 4.5, expectedItems: 1 },
    { input: '¥35.00', expectedTotal: 35.0, expectedItems: 1 },
    { input: 'RMB 35.00', expectedTotal: 35.0, expectedItems: 1 },
    { input: '15 beef, 12.9 carrot；牛奶 4.5', expectedTotal: 32.4, expectedItems: 3 },
    { input: 'coffee 4.50', expectedTotal: 4.5, expectedItems: 1 },
    { input: '星巴克 latte 6.50', expectedTotal: 6.5, expectedItems: 1 },
  ];

  const results = testCases.map((test) => {
    const result = parseExpenseText(test.input);
    const totalMatch = Math.abs(result.total - test.expectedTotal) < 0.01;
    const itemsMatch = result.items.length === test.expectedItems;
    const passed = result.success && totalMatch && itemsMatch;

    return {
      input: test.input,
      passed,
      result,
      expected: { total: test.expectedTotal, items: test.expectedItems },
    };
  });

  const passed = results.filter((r) => r.passed).length;
  const failed = results.length - passed;

  return { passed, failed, details: results };
}

