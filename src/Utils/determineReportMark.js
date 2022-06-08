import { NEGATIVE, POSSITIVE } from "../Constants/sortTags";

export default function determineReportMark(reportResults) {
  const fields = Object.keys(reportResults);
  const resultArrayLength = fields.length;
  const passedFields = fields.filter((key) => reportResults[key] === "Passed");

  const admissibleDeviation = Math.round((resultArrayLength / 100) * 30);

  return passedFields.length >= resultArrayLength - admissibleDeviation
    ? POSSITIVE
    : NEGATIVE;
}
