export function calculatePercentage(randomValue: number, maxValue: number): number {
  const percentage = Math.round((randomValue / maxValue) * 100);

  return percentage;
}
export function formatNumberWithCommas(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function generateRandomNumber(maxValue: number): number {
  const randomMultiplier = Math.floor(Math.random() * (maxValue / 1000 + 1));

  const randomNumber = randomMultiplier * 1000;

  return randomNumber;
}
