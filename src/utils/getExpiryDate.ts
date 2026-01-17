/**
 * Generate a future expiry timestamp
 * @param days Number of days until expiry (default 7)
 * @param hours Optional hours offset
 * @param minutes Optional minutes offset
 * @returns Date object representing expiry
 */
export function getExpiryDate(days = 7, hours = 0, minutes = 0): Date {
  const now = new Date();
  now.setDate(now.getDate() + days);
  now.setHours(now.getHours() + hours);
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}
