// Currency conversion rates (you can update these or fetch from an API)
const EXCHANGE_RATES = {
  USD_TO_ILS: 3.65, // 1 USD = 3.65 ILS (approximate)
  ILS_TO_USD: 0.27  // 1 ILS = 0.27 USD (approximate)
};

// Currency symbols and formatting
const CURRENCY_CONFIG = {
  USD: {
    symbol: '$',
    position: 'before',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.'
  },
  ILS: {
    symbol: '₪',
    position: 'after',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.'
  }
};

/**
 * Convert amount from one currency to another
 * @param {number} amount - The amount to convert
 * @param {string} fromCurrency - Source currency (USD or ILS)
 * @param {string} toCurrency - Target currency (USD or ILS)
 * @returns {number} - Converted amount
 */
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  if (fromCurrency === 'USD' && toCurrency === 'ILS') {
    return amount * EXCHANGE_RATES.USD_TO_ILS;
  }

  if (fromCurrency === 'ILS' && toCurrency === 'USD') {
    return amount * EXCHANGE_RATES.ILS_TO_USD;
  }

  return amount; // Fallback
};

/**
 * Format currency amount with proper symbol and formatting
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (USD or ILS)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency) => {
  const config = CURRENCY_CONFIG[currency];
  if (!config) {
    return `${amount}`;
  }

  // Format number with proper decimal places
  const formattedNumber = amount.toFixed(config.decimalPlaces);
  
  // Add thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator);
  const formattedAmount = parts.join(config.decimalSeparator);

  // Add currency symbol
  if (config.position === 'before') {
    return `${config.symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount} ${config.symbol}`;
  }
};

/**
 * Get currency symbol
 * @param {string} currency - Currency code (USD or ILS)
 * @returns {string} - Currency symbol
 */
export const getCurrencySymbol = (currency) => {
  return CURRENCY_CONFIG[currency]?.symbol || currency;
};

/**
 * Get exchange rate between currencies
 * @param {string} fromCurrency - Source currency
 * @param {string} toCurrency - Target currency
 * @returns {number} - Exchange rate
 */
export const getExchangeRate = (fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) {
    return 1;
  }

  if (fromCurrency === 'USD' && toCurrency === 'ILS') {
    return EXCHANGE_RATES.USD_TO_ILS;
  }

  if (fromCurrency === 'ILS' && toCurrency === 'USD') {
    return EXCHANGE_RATES.ILS_TO_USD;
  }

  return 1; // Fallback
}; 