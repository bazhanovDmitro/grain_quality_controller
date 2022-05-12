export default function retrieveCultures(reports) {
  const cultures = [];

  reports.forEach((report) => {
    if (!cultures.find((cult) => cult.name === report.culture))
      cultures.push({ name: report.culture });
  });

  return cultures;
}
