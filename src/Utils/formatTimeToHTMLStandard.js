export default function formatTimeToHTMLStandard(time) {
  const formatDate =
    time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
  const formatMonth =
    time.getMonth() < 10 ? `0${time.getMonth()}` : time.getMonth();
  const formattedDate = [time.getFullYear(), formatMonth, formatDate].join("-");
  return formattedDate;
}
