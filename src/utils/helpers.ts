/**
 * Formats a number string as currency with specified precision
 * @param value - The number as string to format
 * @param precision - Number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export function formatCurrency(value: string, precision: number = 2): string {
  if (!value || value === '') return '0.00'
  
  const num = parseFloat(value)
  if (isNaN(num)) return '0.00'
  
  return num.toLocaleString('en-EN', {
    maximumFractionDigits: precision
  });
}

/**
 * Formats a number string as amount with specified precision
 * @param value - The number as string to format
 * @param precision - Number of decimal places (default: 4)
 * @returns Formatted amount string
 */
export function formatAmount(value: string, precision: number = 4): string {
  if (!value || value === '') return '0.0000'
  
  const num = parseFloat(value)
  if (isNaN(num)) return '0.0000'
  
  return num.toFixed(precision)
}
