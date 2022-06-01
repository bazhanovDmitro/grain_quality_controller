export default function retrieveCultures(reports) {
  const cultures = [];

  reports.forEach((report) => {
    if (!cultures.find((cult) => cult.cultureName === report.cultureName))
      cultures.push({ cultureName: report.cultureName });
  });

  return cultures;
}
