export default function transformMilisecondsToDate(miliseconds) {
  const date = new Date(miliseconds);
  const dateString = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  return dateString;
}
