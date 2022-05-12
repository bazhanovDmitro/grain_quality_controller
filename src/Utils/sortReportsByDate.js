export default function sortReportsByDate(reports, asc = true) {
  if (!asc) {
    return reports.sort((first, second) => +first.date - +second.date);
  }
  return reports.sort((first, second) => +second.date - +first.date);
}
