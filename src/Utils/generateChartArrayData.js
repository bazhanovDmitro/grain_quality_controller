import { POSSITIVE } from "../Constants/sortTags";
import determineReportMark from "./determineReportMark";

const millisecondsToDate = (milliseconds) => {
  const checkDate = new Date(milliseconds);
  return new Date(
    checkDate.getFullYear(),
    checkDate.getMonth(),
    checkDate.getDate()
  );
};

const extractCultureNames = (reports) => {
  const cultures = [];

  reports.forEach((report) => {
    if (
      !cultures.find((cult) => cult.cultureName === report.standart.cultureName)
    )
      cultures.push({
        cultureName: report.standart.cultureName,
        statistics: [],
      });
  });

  return cultures;
};

export default function generateChartArrayData(reports) {
  const cultures = extractCultureNames(reports);

  reports.forEach((report) => {
    const checkDate = new Date(report.checkDate);
    const date = millisecondsToDate(checkDate.getTime());

    const currentCulture = cultures.find(
      (culture) => culture.cultureName === report.standart.cultureName
    );

    const currentDateIndexInCultureStatistics =
      currentCulture.statistics.findIndex((time) => +time.date === +date);

    const mark = determineReportMark(report.result.resultSet);
    const cultureName = report.standart.cultureName;

    if (currentDateIndexInCultureStatistics === -1) {
      cultures
        .find((culture) => culture.cultureName === cultureName)
        .statistics.push({
          date: date,
          negative: mark !== POSSITIVE ? 1 : 0,
          possitive: mark === POSSITIVE ? 1 : 0,
        });
    } else {
      if (mark === POSSITIVE) {
        cultures.find((culture) => culture.cultureName === cultureName)
          .statistics[currentDateIndexInCultureStatistics].possitive++;
      } else
        cultures.find((culture) => culture.cultureName === cultureName)
          .statistics[currentDateIndexInCultureStatistics].negative++;
    }
  });

  return cultures;
}
