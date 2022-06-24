export const getFormattedDate = (date) =>
  `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
