export function formatDate(date: Date): string {
  const pad = (num: number): string => (num < 10 ? `0${num}` : num.toString());

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
