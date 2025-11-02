/**
 * Currency Formatting Utilities
 * Handles CAD, USD, CNY with proper symbols and formatting
 */

export type Currency = 'CAD' | 'USD' | 'CNY';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  CAD: 'C$',
  USD: '$',
  CNY: '¥',
};

export const CURRENCY_NAMES: Record<Currency, string> = {
  CAD: 'Canadian Dollar',
  USD: 'US Dollar',
  CNY: 'Chinese Yuan',
};

/**
 * Format amount with currency symbol
 */
export function formatCurrency(amount: number, currency: Currency = 'CAD'): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  const formatted = amount.toFixed(2);

  // Format with thousands separator
  const [integer, decimal] = formatted.split('.');
  const withCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${symbol}${withCommas}.${decimal}`;
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number | null {
  // Remove all currency symbols and whitespace
  const cleaned = value
    .replace(/[C$¥$CAD USD CNY RMB,\s]/gi, '')
    .trim();

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

/**
 * Get currency from user preference or locale
 */
export function detectCurrency(): Currency {
  if (typeof window === 'undefined') return 'CAD';

  // Check locale
  const locale = navigator.language;

  if (locale.startsWith('zh')) return 'CNY';
  if (locale.startsWith('en-CA')) return 'CAD';
  if (locale.startsWith('en-US')) return 'USD';

  return 'CAD'; // Default
}

/**
 * Format for input (no thousands separator, just raw number)
 */
export function formatForInput(amount: number): string {
  return amount.toFixed(2);
}

/**
 * Validate currency amount
 */
export function isValidAmount(amount: number): boolean {
  return (
    !isNaN(amount) &&
    isFinite(amount) &&
    amount > 0 &&
    amount < 1000000 && // Max 1 million
    amount.toFixed(2) === amount.toFixed(2) // No more than 2 decimals
  );
}

